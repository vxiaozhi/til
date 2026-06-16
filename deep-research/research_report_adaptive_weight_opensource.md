# 自适应实时权重调整开源实现方案深度研究

## Executive Summary

自适应实时权重调整（Adaptive Real-time Weight Adjustment）是现代负载均衡的核心能力，其本质是让系统根据后端节点的运行时指标（延迟、错误率、并发数、资源利用率）自动调整流量分配，无需人工介入。当前开源领域的主流实现可分为四个层次：通用负载均衡器层（Envoy P2C+LeastRequest、Envoy ORCA/ClientSideWRR）、微服务框架层（go-kratos/go-zero P2C+EWMA、Dubbo P2C+HillClimbing）、LLM/AI 网关层（LiteLLM Cooldown+策略路由、one-api 健康检查+状态机）、以及反向代理层（Nginx/Tengine Smooth WRR+dyups 动态 API）。各方案在算法精度、状态维护开销、适用场景上差异显著。

---

## 一、核心算法体系

### 1.1 静态基础：Smooth WRR（Nginx 平滑加权轮询）

Nginx 在 2011 年提交的平滑加权轮询算法是所有动态权重方案的基础，解决了普通 WRR 连续分配同一节点的问题。

**算法逻辑**（每次请求执行一次）：

```go
// 来自 github.com/smallnest/weighted 库
type smoothWeighted struct {
    Item            interface{}
    Weight          int  // 配置权重（静态）
    CurrentWeight   int  // 动态当前权重（每次更新）
    EffectiveWeight int  // 有效权重（失败时可降低）
}

func nextSmoothWeighted(items []*smoothWeighted) (best *smoothWeighted) {
    total := 0
    for _, w := range items {
        w.CurrentWeight += w.EffectiveWeight   // 步骤1：每个节点累加自身权重
        total += w.EffectiveWeight
        if w.EffectiveWeight < w.Weight {
            w.EffectiveWeight++                // 失败后降权，此处逐步恢复
        }
        if best == nil || w.CurrentWeight > best.CurrentWeight {
            best = w
        }
    }
    best.CurrentWeight -= total               // 步骤2：被选中节点扣减总权重
    return best
}
```

以权重 {5,1,1} 为例，7 轮分配序列为 A,A,B,A,C,A,A，请求在时间轴上均匀分散，而非连续分配给 A。时间复杂度 O(N)，状态维护仅需每节点一个整数。

**动态扩展**：`EffectiveWeight` 字段天然支持动态降权——节点失败时调用 `w.EffectiveWeight--`（下限为 1），节点恢复时每次调用自动加 1 直至恢复配置权重。这是最轻量的自适应实现。

---

### 1.2 实时自适应核心：P2C + EWMA

P2C（Power of Two Choices，二选一随机）是自适应负载均衡领域最重要的算法创新。理论上，纯随机选择时最大节点负载为 O(ln N / ln ln N)，而 P2C 可将其降低到 O(ln ln N)——对于 100 万节点，前者约 20，后者约 3.8，是指数级改善，且时间复杂度仅 O(1)。

P2C 本身只解决"选哪两个"，真正体现自适应的是节点负载的度量方式。EWMA（指数加权移动平均）提供了一种无需历史数组、空间复杂度 O(1) 的实时延迟估算。

#### go-zero P2C+EWMA（生产级实现，gRPC 侧载负载均衡）

`zrpc/internal/balancer/p2c/p2c.go`：

```go
const (
    decayTime = int64(time.Second * 10) // τ 衰减时间常数（相当于半衰期约6.93s）
    forcePick = int64(time.Second)      // 超过1s未被选中，强制选一次
    initSuccess = 1000                  // 初始健康度
    throttleSuccess = initSuccess / 2   // 低于500视为不健康
    penalty = int64(math.MaxInt32)      // 无数据时的惩罚负载值
)

// 请求完成时的 EWMA 更新（Done 回调）
func (p *p2cPicker) buildDoneFunc(c *subConn) func(info balancer.DoneInfo) {
    start := int64(timex.Now())
    return func(info balancer.DoneInfo) {
        atomic.AddInt64(&c.inflight, -1)
        now := timex.Now()
        last := atomic.SwapInt64(&c.last, int64(now))
        td := int64(now) - last       // 距上次更新的时间间隔
        if td < 0 { td = 0 }

        // 衰减因子：间隔越长，w 越小，历史数据权重越低
        // y = e^(-x/τ)：短间隔时 w≈1（历史主导），长间隔时 w≈0（新数据主导）
        w := math.Exp(float64(-td) / float64(decayTime))

        lag := int64(now) - start     // 本次请求实际耗时
        if lag < 0 { lag = 0 }
        olag := atomic.LoadUint64(&c.lag)
        if olag == 0 { w = 0 }       // 首次请求直接赋值，无历史偏差

        // EWMA 核心：lag = old_lag * w + new_lag * (1-w)
        atomic.StoreUint64(&c.lag, uint64(float64(olag)*w+float64(lag)*(1-w)))

        // 成功率 EWMA：成功=1000，失败=0（二值信号）
        success := initSuccess
        if info.Err != nil && !codes.Acceptable(info.Err) {
            success = 0
        }
        osucc := atomic.LoadUint64(&c.success)
        atomic.StoreUint64(&c.success, uint64(float64(osucc)*w+float64(success)*(1-w)))
    }
}

// 节点负载评分 = sqrt(ewma_lag + 1) × (inflight + 1)
// sqrt 防止高延迟节点权重过低（过度惩罚），+1 避免零值异常
func (c *subConn) load() int64 {
    lag := int64(math.Sqrt(float64(atomic.LoadUint64(&c.lag) + 1)))
    load := lag * (atomic.LoadInt64(&c.inflight) + 1)
    if load == 0 { return penalty }  // 无数据时施加惩罚，防止冷启动吸引所有流量
    return load
}

// P2C 选择：3次随机尝试找到两个健康节点，选负载低的
func (p *p2cPicker) Pick(_ balancer.PickInfo) (balancer.PickResult, error) {
    var node1, node2 *subConn
    for i := 0; i < pickTimes; i++ {
        a := p.r.Intn(len(p.conns))
        b := p.r.Intn(len(p.conns) - 1)
        if b >= a { b++ }
        node1, node2 = p.conns[a], p.conns[b]
        if node1.healthy() && node2.healthy() { break }
    }
    chosen := p.choose(node1, node2) // 选 load() 更小的
    atomic.AddInt64(&chosen.inflight, 1)
    atomic.AddInt64(&chosen.requests, 1)
    return balancer.PickResult{SubConn: chosen.conn, Done: p.buildDoneFunc(chosen)}, nil
}

// 强制探活：超过 forcePick(1s) 未被选中的节点强制选一次，刷新统计数据
func (p *p2cPicker) choose(c1, c2 *subConn) *subConn {
    start := int64(timex.Now())
    if c1.load() > c2.load() { c1, c2 = c2, c1 }
    pick := atomic.LoadInt64(&c2.pick)
    if start-pick > forcePick && atomic.CompareAndSwapInt64(&c2.pick, pick, start) {
        return c2 // 被淘汰的节点超过1s未被选，强制探活
    }
    atomic.StoreInt64(&c1.pick, start)
    return c1
}
```

#### go-kratos P2C+EWMA（更细粒度的预测机制）

`selector/node/ewma/node.go` 在 go-zero 基础上增加了**慢请求预测**：

```go
const tau = int64(time.Millisecond * 600) // 半衰期约 416ms，响应更快

// 负载计算：EWMA延迟（含预测） × inflight，再开方
func (n *Node) load() (load uint64) {
    avgLag := n.lag.Load()
    predict := n.predict(avgLag, now)    // 预测当前正在进行的慢请求影响
    if predict > avgLag { avgLag = predict }
    avgLag += int64(time.Millisecond * 5) // +5ms 消除跨机房延迟差异
    avgLag = int64(math.Sqrt(float64(avgLag)))
    load = uint64(avgLag) * uint64(n.inflight.Load())
    return
}

// 慢请求预测：如果超半数 inflight 请求都超过 avgLag，用其均值作为预测延迟
// 通过 [200]atomic.Int64 记录每个 inflight 请求的开始时间，无锁检测慢请求
func (n *Node) predict(avgLag int64, now int64) (predict int64) {
    var total int64
    var slowNum, totalNum int
    for i := range n.inflights {
        start := n.inflights[i].Load()
        if start != 0 {
            totalNum++
            lag := now - start
            if lag > avgLag { slowNum++; total += lag }
        }
    }
    if slowNum >= (totalNum/2 + 1) { predict = total / int64(slowNum) }
    return
}

// 最终权重 = (success × 10μs) / load，success 范围 [0,1000]
func (n *Node) Weight() (weight float64) {
    health := n.health() // success EWMA
    load := n.load()
    weight = float64(health*uint64(time.Microsecond)*10) / float64(load)
    // 5ms 内缓存，避免每次 Pick 都重新计算
}
```

---

### 1.3 服务端驱动：Envoy ORCA ClientSideWRR

Envoy 的 `client_side_weighted_round_robin` 结合 ORCA（Open Request Cost Aggregation）协议，让后端服务通过响应 Trailer 主动上报利用率，客户端据此计算权重。

**权重计算公式**（`orca_weight_manager.cc`）：

```cpp
// weight = QPS / (utilization + error_penalty × EPS/QPS)
// QPS：后端上报的每秒请求量
// utilization：CPU/内存/自定义利用率（取最大值）
// EPS：每秒错误量；error_utilization_penalty：错误惩罚系数（默认1.0）
double calculateWeight(const OrcaLoadReport& report) {
    double qps = report.rps_fractional();
    double utilization = getUtilization(report);
    utilization += error_utilization_penalty * report.eps() / qps;
    return qps / utilization;
}
```

**更新机制**：每 `weight_update_period`（默认 1s）从各 host 的 ORCA 数据中拉取最新权重；若 host 在 `blackout_period`（默认 10s）内权重数据太新（EWMA 未稳定），或超过 `weight_expiration_period`（默认 180s）未更新，则使用所有有效 host 的**中位数权重**作为兜底。

**Envoy LeastRequest（P2C 变体）**（`least_request_lb.cc`）：

```cpp
// 节点有效权重 = static_weight / (active_requests + 1)^active_request_bias
double hostWeight(const Host& host) const {
    double weight = static_cast<double>(host.weight());
    uint64_t active = effectiveActiveRequests(host);
    if (active_request_bias_ == 1.0) {
        return weight / (active + 1);         // 线性惩罚（默认）
    }
    return weight / std::pow(active + 1, active_request_bias_); // 指数惩罚
}
// 配置参数：choice_count=2（P2C），active_request_bias=1.0（线性）
```

---

## 二、LLM/AI 网关的自适应实现

LLM 场景有其特殊性：请求延迟高（秒级）、Token 消耗大、Provider 有复杂的速率限制（RPM/TPM），因此自适应实现侧重**冷却隔离**和**策略路由**，而非毫秒级的 EWMA 调整。

### 2.1 LiteLLM：多策略分层实现

#### 冷却机制（Cooldown）—— 等效于动态权重归零

LiteLLM 的"动态降权"核心是把出问题的 deployment 从选择池临时移除（TTL 缓存），而非调整权重数值。

**触发逻辑**（`router_utils/cooldown_handlers.py`）：

```python
def _should_cooldown_deployment(percent_fails, total_requests, exception_status,
                                is_single_deployment_model_group) -> bool:
    # 速率限制：立即冷却（但单部署模型组不冷却，防止全挂）
    if exception_status == 429 and not is_single_deployment_model_group:
        return True
    # 100% 失败率且流量达到统计阈值
    if percent_fails == 1.0 and total_requests >= SINGLE_DEPLOYMENT_TRAFFIC_FAILURE_THRESHOLD:
        return True
    # 错误率超阈值（DEFAULT_FAILURE_THRESHOLD_PERCENT）且样本足够
    if (percent_fails > DEFAULT_FAILURE_THRESHOLD_PERCENT
            and total_requests >= DEFAULT_FAILURE_THRESHOLD_MINIMUM_REQUESTS
            and not is_single_deployment_model_group):
        return True
    # 不可重试的错误（401/404/账户欠费等）
    if litellm._should_retry(status_code=exception_status) is False:
        return True
    return False

# 允许失败次数策略（另一触发路径）
def should_cooldown_based_on_allowed_fails_policy(...) -> bool:
    current_fails = router.failed_calls.get_cache(key=deployment) or 0
    if current_fails + 1 > allowed_fails:
        return True
    router.failed_calls.set_cache(key=deployment, value=current_fails+1, ttl=cooldown_time)
    return False
```

**冷却存储**（TTL 自动到期 = 自动恢复）：

```python
# cooldown_cache.py
def add_deployment_to_cooldown(self, model_id, exception_status, cooldown_time):
    key = f"deployment:{model_id}:cooldown"
    self.cache.set_cache(
        key=key,
        value={"status_code": exception_status, "timestamp": time.time()},
        ttl=cooldown_time  # Redis TTL 过期后自动从冷却列表消失
    )
```

#### 基于延迟的路由策略（`router_strategy/lowest_latency.py`）

```python
# 维护每个 deployment 的延迟滑动窗口（最近10个请求，按 token 数归一化）
final_value = response_seconds / completion_tokens  # 秒/token

# 流式请求优先使用 TTFT（首 Token 时间），更能反映用户感知
if stream and len(item_ttft_latency) > 0:
    item_latency = sum(item_ttft_latency) / len(item_ttft_latency)
else:
    item_latency = sum(item_latency) / len(item_latency)

# 超时施加 1000 秒惩罚（确保超时节点排到最末）
if isinstance(exception, litellm.Timeout):
    latency_window.append(1000.0)

# 在最低延迟 + buffer 范围内随机选择（避免总选同一个）
sorted_deployments = sorted(potential_deployments, key=lambda x: x[1])
lowest = sorted_deployments[0][1]
valid = [d for d in sorted_deployments if d[1] <= lowest + buffer]
chosen = random.choice(valid)
```

**路由策略对比**：

| 策略 | 适用场景 | 权重更新方式 | 状态 |
|------|---------|------------|------|
| `simple-shuffle` | 通用，默认 | 按 RPM/TPM 配额加权随机 | 无状态（基于配置） |
| `latency-based-routing` | 延迟敏感 | 滑动窗口均值（最近10次） | 内存/Redis |
| `usage-based-routing-v2` | 避免超配额 | 按 TPM/RPM 剩余量加权 | 内存/Redis |
| `cost-based-routing` | 成本优化 | 按每次请求估算成本排序 | 无状态 |

**关键配置参数**：

```python
router = Router(
    model_list=model_list,
    routing_strategy="latency-based-routing",
    routing_strategy_args={"ttl": 3600},  # 延迟数据窗口（秒）
    allowed_fails=1,       # 冷却前允许失败次数（在 cooldown_time 窗口内）
    cooldown_time=5,       # 冷却时长（秒），默认5s
    num_retries=3,
    enable_weighted_failover=True,  # 同模型组加权重试后再切 fallback
)
```

---

### 2.2 one-api：优先级 + 健康状态机（二值权重）

one-api 不做连续权重调整，而是通过**优先级排序 + 健康检查自动 Disable/Enable** 实现等效的自适应路由。

**渠道选择**（`model/cache.go`）：

```go
// 初始化时按 priority 降序排列，最高优先级组内随机选
func CacheGetRandomSatisfiedChannel(group, model string, ignoreFirstPriority bool) (*Channel, error) {
    channels := group2model2channels[group][model]
    // 找到最高 priority 的边界
    endIdx := len(channels)
    for i := range channels {
        if channels[i].GetPriority() != channels[0].GetPriority() { endIdx = i; break }
    }
    idx := rand.Intn(endIdx)
    if ignoreFirstPriority && endIdx < len(channels) {
        idx = random.RandRange(endIdx, len(channels)) // 降级到次优先级
    }
    return channels[idx], nil
}
```

**基于成功率的自动禁用**（`monitor/metric.go`）：

```go
// 滑动窗口（MetricQueueSize 次请求）统计成功率
func consumeFail(channelId int) (bool, float64) {
    store[channelId] = append(store[channelId], false)
    // 超出窗口则移除最旧的
    if len(store[channelId]) > config.MetricQueueSize {
        store[channelId] = store[channelId][1:]
    }
    successRate := float64(successCount) / float64(len(store[channelId]))
    if len(store[channelId]) >= config.MetricQueueSize &&
       successRate < config.MetricSuccessRateThreshold {
        store[channelId] = make([]bool, 0) // 清空，重新观测
        return true, successRate            // 触发禁用
    }
    return false, successRate
}
```

**定时健康检查 + 自动 Enable**（`controller/channel-test.go`）：

```go
func testChannels(ctx context.Context, notify bool, scope string) error {
    for _, channel := range channels {
        _, err, openaiErr := testChannel(ctx, channel, testRequest)
        milliseconds := tok.Sub(tik).Milliseconds()

        // 响应超时 → 禁用
        if isChannelEnabled && milliseconds > disableThreshold {
            if config.AutomaticDisableChannelEnabled {
                monitor.DisableChannel(channel.Id, channel.Name, err.Error())
            }
        }
        // 特定错误（401/余额不足/账号停用）→ 禁用
        if isChannelEnabled && monitor.ShouldDisableChannel(openaiErr, -1) {
            monitor.DisableChannel(channel.Id, channel.Name, err.Error())
        }
        // 测试成功且当前被禁用 → 重新启用
        if !isChannelEnabled && monitor.ShouldEnableChannel(err, openaiErr) {
            monitor.EnableChannel(channel.Id, channel.Name)
        }
        channel.UpdateResponseTime(milliseconds) // 更新响应时间到数据库
    }
}

// 定时自动执行
func AutomaticallyTestChannels(frequency int) {
    for { time.Sleep(time.Duration(frequency) * time.Minute); testChannels(...) }
}
```

---

## 三、反向代理层：Nginx/Tengine 动态权重

标准 Nginx 开源版不支持运行时修改权重（需 reload 才生效），动态能力依赖扩展方案：

### 3.1 Tengine dyups 模块（运行时 HTTP API）

Tengine（阿里巴巴 Nginx fork）内置 `ngx_http_dyups_module`，通过 HTTP API 无需 reload 即可动态修改 upstream 配置（含 weight）：

```nginx
upstream backend { server 10.0.0.1:8080 weight=5; }

server {
    listen 8080;
    location / { set $ups backend; proxy_pass http://$ups; } # 必须用变量引用
}
server {
    listen 8081;
    location /upstream/ { dyups_interface; } # 管理接口
}
```

```bash
# 运行时更新权重（立即生效，无需 reload）
curl -d "server 10.0.0.1:8080 weight=8; server 10.0.0.2:8080 weight=2;" \
     http://localhost:8081/upstream/backend

# 查询当前状态
curl http://localhost:8081/detail
# 输出：server 10.0.0.1:8080 weight=8 max_fails=1 fail_timeout=10

# Lua API（OpenResty 集成）
local dyups = require "ngx.dyups"
dyups.update("backend", "server 10.0.0.1:8080 weight=8;")
```

### 3.2 OpenResty + balancer_by_lua（最灵活方案）

基于 CPU/连接数等指标实时计算权重：

```lua
-- balancer_by_lua_block 中执行，每次请求都可动态决策
local balancer = require "ngx.balancer"

local function calculate_weight(ip, port)
    local metric = fetch_metrics(ip, port)  -- 从监控系统拉取
    local cpu_factor    = (100 - metric.cpu) / 100
    local memory_factor = (100 - metric.memory) / 100
    local conn_factor   = math.max(0, 1 - metric.connections / 1000)
    return math.floor(100 * cpu_factor * memory_factor * conn_factor)
end

-- 每30秒重计算一次权重（cached in shared dict）
local backends = {
    { ip="10.0.0.1", port=8080, weight=calculate_weight("10.0.0.1", 8080) },
    { ip="10.0.0.2", port=8080, weight=calculate_weight("10.0.0.2", 8080) },
}
-- 用 smooth_wrr 选取节点
local selected = smooth_wrr_select(backends)
balancer.set_current_peer(selected.ip, selected.port)
```

### 3.3 nginx-upsync（与服务发现集成）

通过 Consul/etcd 同步权重配置，实现外部系统驱动的动态权重：

```nginx
upstream backend {
    upsync 127.0.0.1:8500/v1/kv/upstreams/backend
           upsync_interval=500ms upsync_type=consul;
    upsync_dump_path /etc/nginx/conf/servers_backend.conf;
}
```

---

## 四、横向对比

### 4.1 算法选型决策树

```
需要缓存亲和（相同 key → 相同节点）?
├─ 是 → 节点数 > 1000? Maglev 哈希 : 一致性哈希 + 虚拟节点
└─ 否 → 延迟敏感 / 节点异构?
         ├─ 是 → 后端可改造上报指标? Envoy ORCA + ClientSideWRR
         │        否 → P2C + EWMA（go-zero/go-kratos）
         └─ 否 → 权重差异大? Smooth WRR : Round Robin / P2C LeastRequest
```

### 4.2 各方案全面对比

| 维度 | Envoy P2C+LeastRequest | Envoy ORCA+WRR | go-zero P2C+EWMA | go-kratos P2C+EWMA | LiteLLM Cooldown | one-api 状态机 | Tengine dyups |
|------|------------------------|----------------|------------------|--------------------|-----------------|---------------|---------------|
| **选择算法** | P2C（活跃请求数） | Smooth WRR | P2C（EWMA负载评分） | P2C（EWMA+慢请求预测） | 冷却池过滤+策略排序 | 优先级随机 | Smooth WRR |
| **指标来源** | 客户端计数器 | 服务端 ORCA 上报 | 客户端 EWMA | 客户端 EWMA+200槽预测 | 错误率+延迟滑动窗口 | 成功率滑动窗口 | 外部 API 推送 |
| **更新频率** | 每次请求完成 | 每 1s（权重重算） | 每次请求完成 | 每次请求完成 | 每次失败立即触发 | 定时健康检查（分钟级） | API 调用时 |
| **状态开销** | 每节点 2 个原子计数器 | 每节点 ORCA 报告+时间戳 | 每节点 3 个 uint64 | 每节点 200 槽位 int64 | Redis/内存 TTL | MySQL 状态字段 | Nginx 共享内存 |
| **冷启动** | penalty 惩罚值 | blackout_period 内用中位数 | penalty 惩罚值 | penalty 惩罚值 | 无特殊处理 | 启动状态 enabled | 按配置初始权重 |
| **故障恢复** | 自动（请求数减少） | weight_expiration 后用中位数 | 自动（EWMA 衰减） | 自动（EWMA + forcePick） | TTL 自动过期 | 定时健检通过后 Enable | 手动 API 更新 |
| **协议支持** | HTTP/gRPC | gRPC（ORCA Trailer） | gRPC | gRPC | HTTP（LLM API） | HTTP | HTTP/TCP |
| **实现语言** | C++ | C++ | Go | Go | Python | Go | C（Nginx 模块） |

### 4.3 LLM 网关 vs 微服务框架实现差异

| 对比维度 | 微服务框架（P2C+EWMA） | LLM 网关（冷却+策略路由） |
|---------|---------------------|----------------------|
| 请求延迟 | 毫秒级 | 秒级（10-60s） |
| 指标粒度 | 单次请求完成回调（微秒级） | 分钟级统计窗口 |
| 主要瓶颈 | CPU、内存、线程 | Token 配额（TPM/RPM） |
| 失败模式 | 超时、连接拒绝 | 429 限速、余额不足、认证失败 |
| 权重调整机制 | 连续值（EWMA 实时更新） | 二值（冷却移除 vs 恢复加入） |
| 状态持久化 | 进程内存（重启丢失） | Redis/数据库（跨实例共享） |

---

## 五、生产实践要点

### 5.1 EWMA 参数调优

衰减时间常数 τ 的选择直接影响系统响应速度和稳定性：

```
τ = P99延迟 × 倍数系数（建议 10-50 倍）

示例：
  P99 = 50ms  → τ = 500ms ~ 2.5s（go-zero 用 10s，go-kratos 用 600ms）
  P99 = 1s    → τ = 10s ~ 50s（LLM 场景）

  τ 小 → 响应快，但容易抖动（毛刺敏感）
  τ 大 → 平滑稳定，但对故障感知慢
```

### 5.2 冷启动与雪崩保护

```go
// 新节点惩罚：无历史数据时赋予最大负载值
const penalty = int64(math.MaxInt32)
func (c *subConn) load() int64 {
    if load == 0 { return penalty } // 防止新节点瞬间吸走所有流量
}

// Envoy slow_start 配置：新加入的 host 在 slow_start_window 内
// 权重从 min_weight_percent 线性增长到配置权重
slow_start_config:
  slow_start_window: 30s
  min_weight_percent: 10
```

### 5.3 Panic Threshold（最小健康节点保障）

```yaml
# Envoy：至少保留 70% 的 host 在轮转中
# 当健康 host < 30% 时，全量 host 参与选择（忽略健康检查）
outlier_detection:
  consecutive_5xx: 5
  base_ejection_time: 30s
  max_ejection_percent: 30  # 最多剔除 30%
```

```python
# LiteLLM：单部署模型组时不触发冷却，防止全线崩溃
if exception_status_int == 429 and is_single_deployment_model_group:
    pass  # 不冷却，避免无可用 deployment
```

### 5.4 重试与自适应协同

自适应权重必须与重试机制配合，否则可能加剧后端压力：

```python
# LiteLLM：重试时先尝试同模型组其他 deployment，再走 fallback
router = Router(
    allowed_fails=1,           # 允许1次失败后冷却
    num_retries=3,             # 最多重试3次
    retry_after=5,             # 重试间隔（退避）
    enable_weighted_failover=True  # 同组加权重试
)
```

```go
// go-zero：P2C 天然通过选择低负载节点实现重试分散
// 不需要额外的重试逻辑，EWMA 更新后负载评分变化，下次选到同一节点概率降低
```

### 5.5 可观测性关键指标

```
每个节点/deployment 的监控指标：
  - ewma_latency_ms：EWMA 延迟
  - inflight_requests：当前在途请求数
  - success_rate_ewma：成功率 EWMA（[0,1]）
  - effective_weight：当前有效权重
  - state：Healthy/Degraded/Failed/Recovering（如有状态机）
  - last_pick_elapsed_ms：距上次被选中的时间（检测饿死）

系统级指标：
  - weight_distribution：各节点权重分布（时序）
  - circuit_breaker_trips：熔断触发次数
  - forced_pick_count：强制探活触发次数（go-zero forcePick）
  - cooldown_events：冷却触发/恢复事件（LiteLLM）
```

---

## 六、方案选型建议

- **gRPC 微服务**：优先选用 go-zero/go-kratos 的 P2C+EWMA，或 Envoy 的 `least_request`（P2C 模式）。如后端可改造，Envoy ORCA+ClientSideWRR 是最精确的方案，因为权重由后端自报资源利用率决定，而非客户端估算。
- **LLM/AI 网关**：LiteLLM 的 `latency-based-routing` + Cooldown 机制是当前最成熟的开源实现，适合多 Provider 管理；one-api 的优先级+健康检查模型更简单，适合中小规模部署。
- **HTTP 反向代理（Nginx 生态）**：需要运行时动态权重必须使用 Tengine dyups 或 OpenResty balancer_by_lua；与服务发现集成推荐 nginx-upsync。标准 Nginx 开源版不支持运行时动态权重。
- **自建实现**：核心公式只需三要素：（1）EWMA 延迟估算 `lag = old_lag × w + new_lag × (1-w)`，（2）负载评分 `score = sqrt(lag) × (inflight + 1)`，（3）P2C 选择框架。可在 100 行 Go 代码内实现完整的自适应负载均衡。

---

## References

1. [go-zero P2C+EWMA 实现源码（zrpc/internal/balancer/p2c/p2c.go）](https://github.com/zeromicro/go-zero/blob/master/zrpc/internal/balancer/p2c/p2c.go)
2. [go-kratos EWMA 节点实现（selector/node/ewma/node.go）](https://github.com/go-kratos/kratos/blob/main/selector/node/ewma/node.go)
3. [go-kratos P2C 选择器（selector/p2c/p2c.go）](https://github.com/go-kratos/kratos/blob/main/selector/p2c/p2c.go)
4. [Envoy LeastRequest 负载均衡实现（least_request_lb.cc）](https://github.com/envoyproxy/envoy/blob/main/source/extensions/load_balancing_policies/least_request/least_request_lb.cc)
5. [Envoy ORCA 权重管理器（orca_weight_manager.cc）](https://github.com/envoyproxy/envoy/blob/main/source/extensions/load_balancing_policies/common/orca_weight_manager.cc)
6. [Envoy ClientSideWRR 实现（client_side_weighted_round_robin_lb.cc）](https://github.com/envoyproxy/envoy/blob/main/source/extensions/load_balancing_policies/client_side_weighted_round_robin/client_side_weighted_round_robin_lb.cc)
7. [LiteLLM Router 路由策略实现（litellm/router.py）](https://github.com/BerriAI/litellm/blob/main/litellm/router.py)
8. [LiteLLM 冷却处理器（litellm/router_utils/cooldown_handlers.py）](https://github.com/BerriAI/litellm/blob/main/litellm/router_utils/cooldown_handlers.py)
9. [LiteLLM 延迟路由策略（litellm/router_strategy/lowest_latency.py）](https://github.com/BerriAI/litellm/blob/main/litellm/router_strategy/lowest_latency.py)
10. [one-api 渠道健康检查（controller/channel-test.go）](https://github.com/songquanpeng/one-api/blob/main/controller/channel-test.go)
11. [one-api 指标监控（monitor/metric.go）](https://github.com/songquanpeng/one-api/blob/main/monitor/metric.go)
12. [smallnest/weighted Smooth WRR 实现](https://github.com/smallnest/weighted)
13. [Tengine ngx_http_dyups_module 动态 upstream](https://github.com/yzprofile/ngx_http_dyups_module)
14. [dubbo-go P2C 负载均衡（cluster/loadbalance/p2c/loadbalance.go）](https://github.com/apache/dubbo-go/blob/main/cluster/loadbalance/p2c/loadbalance.go)
15. [grpc-go 内置负载均衡器列表（balancer/）](https://github.com/grpc/grpc-go/tree/master/balancer)
16. [自适应负载均衡算法原理和实现（阿里云开发者社区）](https://developer.aliyun.com/article/1597304)
17. [负载均衡算法深度解析（P2C/EWMA/Smooth WRR/Maglev）](https://quant67.com/post/algorithms/69-load-balancing/load-balancing.html)
