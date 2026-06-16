# Bifrost 自适应负载均衡：实时权重调整的实现方案深度研究

## Executive Summary

Bifrost（https://github.com/maximhq/bifrost）是一个高性能 AI 网关，其负载均衡体系分为两层：**静态加权随机选择**（开源版）和**自适应实时权重调整**（企业版）。静态层通过 `core/keyselectors/weightedrandom.go` 中的加权随机算法在 API Key 粒度实现流量分配；企业版自适应层则每 5 秒基于错误率（50% 权重）、延迟（20%）、利用率（5%）和动量（加性修正）四个维度重新计算所有路由的权重，并通过四状态路由状态机（Healthy → Degraded → Failed → Recovering）实现无人工干预的自愈能力。整体请求路由延迟开销低于 10 微秒。

---

## 背景与架构定位

Bifrost 在 5000 RPS 压力下每请求仅增加约 11μs 延迟，其负载均衡系统被设计为"零开销"路径——所有权重的实际计算都是异步完成、提前缓存的，请求路径上只做查表和加权随机抽样。

整体负载均衡体系采用**两级分离架构**：

第一级（Direction 层）决定将请求发往哪个提供商（Provider），仅在请求的 `model` 字段没有指定提供商前缀（如 `gpt-4o` 而非 `openai/gpt-4o`）时触发。第二级（Route 层）决定在选定提供商内使用哪个 API Key，对每一个请求都会运行，即使提供商已被显式指定。

---

## 开源版：静态加权随机选择

### 核心实现

开源版的 Key 选择逻辑位于 `core/keyselectors/weightedrandom.go`，代码极为简洁：

```go
package keyselectors

import (
    "math/rand"
    "github.com/maximhq/bifrost/core/schemas"
)

func WeightedRandom(ctx *schemas.BifrostContext, keys []schemas.Key,
    providerKey schemas.ModelProvider, model string) (schemas.Key, error) {

    totalWeight := 0
    for _, key := range keys {
        totalWeight += int(key.Weight * 100) // float64 → int，乘100保留两位小数精度
    }

    // 所有 key 权重都为 0 时，退化为均匀随机
    if totalWeight == 0 {
        return keys[rand.Intn(len(keys))], nil
    }

    // Go 1.20+ 全局线程安全随机，无锁无分配
    randomValue := rand.Intn(totalWeight)

    // 按累积权重区间选择
    currentWeight := 0
    for _, key := range keys {
        currentWeight += int(key.Weight * 100)
        if randomValue < currentWeight {
            return key, nil
        }
    }

    return keys[0], nil // 安全兜底
}
```

该函数作为默认 `KeySelector` 在 Bifrost 初始化时注入：

```go
// core/bifrost.go
if bifrost.keySelector == nil {
    bifrost.keySelector = keyselectors.WeightedRandom
}
```

`KeySelector` 本身是一个函数类型，支持完全自定义替换：

```go
// core/schemas/bifrost.go
type KeySelector func(
    ctx *BifrostContext,
    keys []Key,
    providerKey ModelProvider,
    model string,
) (Key, error)
```

### Key 的 Weight 字段

每个 `Key` 结构体中有一个 `float64` 类型的 `Weight` 字段，其注释明确说明了用途：

```go
// core/schemas/account.go
type Key struct {
    ID     string  `json:"id"`
    Name   string  `json:"name"`
    Value  EnvVar  `json:"value"`
    Models WhiteList `json:"models"`
    BlacklistedModels BlackList `json:"blacklisted_models"`
    Weight float64 `json:"weight"` // 多 Key 负载均衡的权重
    // ... 其他字段
}
```

**权重语义示例**：

```json
{
  "keys": [
    { "name": "key-high-quota",  "value": "env.KEY1", "models": ["*"], "weight": 0.7 },
    { "name": "key-backup",      "value": "env.KEY2", "models": ["*"], "weight": 0.3 }
  ]
}
```

key-high-quota 将承接约 70% 的请求，key-backup 承接约 30%。若某个 Key 设置了 `models` 白名单，则对不匹配模型的请求，该 Key 在选择时会被跳过。

### 失败后的密钥轮换

速率限制（429）、认证失败（401/403）等错误会触发 Key 轮换——Bifrost 将当前 Key 标记为"本轮已用"，从剩余 Key 中重新执行加权随机选择，直到所有 Key 都尝试过后才会返回错误。这一过程是**请求粒度**的，不修改 Key 的持久化权重配置。

---

## 企业版：自适应实时权重调整

自适应负载均衡（Adaptive Load Balancing）是 Bifrost Enterprise 的独立功能，需要联系 Bifrost 团队开通。其核心目标是让权重能够根据每个路由的实时性能表现**自动调整**，无需人工介入。

### 两级作用域

| 级别 | 粒度 | 作用 |
|------|------|------|
| **Direction 层** | Provider + Model | 决定发往哪个 LLM 提供商 |
| **Route 层** | Provider + Model + Key | 决定使用哪个 API Key |

两层均使用相同的评分公式，但评估对象不同。

### 权重计算公式

每 5 秒异步重新计算一次，公式如下：

$$Score = (P_{error} \times 0.5) + (P_{latency} \times 0.2) + (P_{util} \times 0.05) - M_{momentum}$$

$$Weight = W_{min} + (1 - Score) \times (W_{max} - W_{min})$$

最终权重范围为 1 到 1000，**分数越低，权重越高，获得流量越多**。

#### 因子一：错误率惩罚 P_error（权重 50%）

错误率惩罚是最重要的因子，直接反映路由的可靠性。计算基于滑动时间窗口内的请求失败比例：

```
P_error = (recent_failures / total_requests) × 100
```

2% 错误率触发 Degraded 状态，5% 触发 Failed 状态。

#### 因子二：延迟分值 P_latency（权重 20%）

延迟计算使用 **MV-TACOS（Multivariate Time-Adaptive Cosine Similarity）算法**，这是一个专门处理 LLM 请求延迟特性的多变量时间自适应余弦相似度算法：

首先，基于滑动窗口内各百分位数构建加权基线：

```
baseline = p50 × 0.4 + p95 × 0.35 + p99 × 0.15 + avg × 0.1
```

然后计算当前延迟向量与基线向量的余弦相似度，最终转化为惩罚分值：

```
P_latency = (1 - cosine_similarity) × 100
```

MV-TACOS 的设计优点在于：它比较的是延迟的**分布形态**（向量方向）而非绝对值，因此能适应不同模型本身的响应时间差异，并能区分"正常慢"（基线本来就高）和"异常慢"（突然劣化）。

#### 因子三：利用率惩罚 P_util（权重 5%）

防止将所有流量集中到少数高分路由，促进整体均衡：

```
P_util = (current_tpm / max_tpm) × 100
```

利用率达到 100%（TPM 命中限制）时，断路器激活，该 Key 的权重强制置为 0，暂时退出轮转。

#### 因子四：动量偏差 M_momentum（加性修正，奖励恢复中的路由）

动量是一个负向修正项（减小惩罚），用于加速从故障状态中恢复的路由快速重新获得流量：

```
故障后经过时间 → 惩罚减少比例
  5 秒  → 减少 20%
 10 秒  → 减少 40%
 30 秒  → 减少 90%
 60 秒  → 完全恢复（M_momentum = 0）
```

这意味着一个提供商恢复正常后，30 秒内即可获得原有流量的 90%，而不需要等待若干个统计周期的数据积累。

### 路由状态机

每个路由（Provider+Model+Key 三元组）维护一个独立的状态机，共四个状态：

```
Healthy ──(错误率 > 2%)──→ Degraded
Degraded ──(错误率 > 5% 或 TPM 命中)──→ Failed
Failed ──(首次成功)──→ Recovering
Recovering ──(成功率 >= 50% 且承接预期流量 >= 50%)──→ Healthy
```

各状态下的行为如下：

| 状态 | 触发条件 | 流量策略 |
|------|---------|---------|
| Healthy | 错误率 < 2% | 按计算权重正常接受流量 |
| Degraded | 错误率 2%–5% | 权重降低，减少流量 |
| Failed | 错误率 > 5% 或 TPM 命中 | 权重强制为 0，退出轮转 |
| Recovering | Failed 后首次成功 | 以 25% 的概率接受探测流量 |

Recovering 状态的 25% 探测概率是关键设计：系统会主动向处于恢复中的路由"投石问路"，以确认其是否真正恢复，而不是等待被动的流量分配。

### 跨节点权重同步

在集群部署模式下，各节点通过 **Gossip 协议**同步权重信息，确保多节点间的路由决策一致，避免某一节点视角下的"局部最优"导致整体流量分布不均。

---

## 请求路由完整流程

```
1. 请求到达（POST /v1/chat/completions）
   ↓
2. Transport 层解析（FastHTTP，~2.1μs）
   ↓
3. Plugin Pipeline 预处理（鉴权、限流、VirtualKey 解析）
   ↓
4. Direction 选择（企业版：基于预计算权重；开源版：按 VK 静态配置）
   ├── 模型目录查询：找出支持该模型的所有 Provider
   ├── 加权随机选择最优 Provider（使用预计算分数）
   └── 生成备选 Provider 列表（按分数排序，用于 Fallback）
   ↓
5. Route 选择（所有请求均执行）
   ├── 企业版：WeightedRandom（基于动态权重 1–1000）
   └── 开源版：WeightedRandom（基于静态 Key.Weight 配置）
   ↓
6. Provider Worker 池执行 HTTP 请求
   ↓
7. 成功 → 返回响应；失败 → 触发 Fallback 链
   ↓
8. 企业版：异步更新路由指标（后台每 5s 重计算权重）
```

---

## 配置详解

### 开源版：Key 级别权重配置

通过 HTTP API 创建或更新 Key 时设置 `weight` 字段：

```json
// POST /api/providers/{provider}/keys
{
  "name": "openai-key-primary",
  "value": "env.OPENAI_KEY_1",
  "models": ["gpt-4o", "gpt-4o-mini"],
  "weight": 0.7
}
```

```json
// POST /api/providers/{provider}/keys
{
  "name": "openai-key-backup",
  "value": "env.OPENAI_KEY_2",
  "models": ["*"],
  "weight": 0.3
}
```

在 config.json 中的等效配置：

```json
{
  "providers": {
    "openai": {
      "keys": [
        {
          "name": "openai-key-primary",
          "value": "env.OPENAI_KEY_1",
          "models": ["gpt-4o", "gpt-4o-mini"],
          "weight": 0.7
        },
        {
          "name": "openai-key-backup",
          "value": "env.OPENAI_KEY_2",
          "models": ["*"],
          "weight": 0.3
        }
      ]
    }
  }
}
```

**权重注意事项**：
- `models: []` 表示拒绝所有模型（v1.5.0+ 默认行为），应使用 `["*"]` 表示允许所有
- `blacklisted_models` 优先于 `models` 白名单（黑名单胜出）
- 显式指定 `x-bf-api-key-id` 或 `x-bf-api-key` 请求头时，会完全绕过加权随机选择

### 开源版：VirtualKey 级别 Provider 权重配置

```json
// PUT /api/governance/virtual-keys/{vk_id}
{
  "provider_configs": [
    {
      "provider": "openai",
      "allowed_models": ["gpt-4o", "gpt-4o-mini"],
      "weight": 0.3
    },
    {
      "provider": "azure",
      "allowed_models": ["gpt-4o"],
      "weight": 0.7
    }
  ]
}
```

权重会自动归一化（无需保证各 `weight` 之和为 1.0），省略 `weight` 字段（或设为 null）则该 Provider 不参与加权选择，但仍可接受显式 `provider/model` 格式的直接路由请求。

### 企业版：自适应权重配置

自适应负载均衡由系统自动管理权重，用户主要通过以下参数调整算法行为：

```json
{
  "load_balancing": {
    "enabled": true,
    "scoring": {
      "error_weight": 0.5,
      "latency_weight": 0.2,
      "utilization_weight": 0.05
    },
    "state_transitions": {
      "degraded_error_threshold": 0.02,
      "failed_error_threshold": 0.05,
      "recovery_probe_rate": 0.25
    },
    "timing": {
      "score_recalc_interval": "5s",
      "momentum_decay_to_90pct": "30s",
      "full_recovery_time": "60s"
    }
  }
}
```

企业版仪表板提供实时可视化界面，展示每个路由的权重分布、状态转换历史、错误率与延迟趋势。

---

## 自定义 KeySelector

开源版支持注入完全自定义的 KeySelector，实现个性化的负载均衡逻辑。以下是实现按地理区域路由的示例：

```go
package main

import (
    "github.com/maximhq/bifrost/core"
    "github.com/maximhq/bifrost/core/schemas"
)

// 自定义 KeySelector：按请求来源地区选择就近的 Key
func geoAwareSelector(
    ctx *schemas.BifrostContext,
    keys []schemas.Key,
    providerKey schemas.ModelProvider,
    model string,
) (schemas.Key, error) {
    region := ctx.GetString("user-region") // 从 context 读取地区信息

    // 优先选择对应地区的 Key
    for _, key := range keys {
        if key.Name == "key-"+region {
            return key, nil
        }
    }

    // 找不到匹配地区的 Key，回退到加权随机
    return keyselectors.WeightedRandom(ctx, keys, providerKey, model)
}

func main() {
    bifrost, _ := core.NewBifrost(schemas.BifrostConfig{
        Account:     myAccount,
        KeySelector: geoAwareSelector, // 注入自定义选择器
    })
}
```

---

## 性能特性

Bifrost 的负载均衡设计遵循"热路径零开销"原则：

| 操作 | 延迟 | 说明 |
|------|------|------|
| Key 选择（WeightedRandom） | ~10ns | 常数时间，无分配 |
| 权重重新计算（企业版） | 异步，每 5 秒 | 不在请求路径上 |
| Provider 分数查询（企业版） | ~50ns | 读取预计算缓存 |
| 整体路由开销 | < 10μs | 全链路 |

相比之下，LiteLLM 等方案的路由开销通常在毫秒量级，Bifrost 宣称比 LiteLLM 快 50 倍，负载均衡层的"异步计算 + 同步查表"架构是性能优势的主要来源之一。

---

## 总结

Bifrost 的负载均衡体系从简单到复杂分为三个层次：

一是**Key 级别静态权重**（开源版核心），通过 `Key.Weight` 字段配置，采用加权随机算法，适合手动划分 API Key 的配额比例；

二是**Provider 级别静态权重**（开源版治理层），通过 VirtualKey 的 `provider_configs.weight` 配置，实现跨 Provider 的流量分配和自动 Fallback；

三是**自适应动态权重**（企业版），基于 Error Penalty（50%）、MV-TACOS 延迟分（20%）、利用率惩罚（5%）和动量奖励（加性）四因子的复合评分，每 5 秒异步重算，配合四状态路由状态机和 25% 探测恢复机制，实现完全自主的流量优化。

对于大多数业务场景，开源版的静态权重配置加上 Fallback 链已足够满足高可用需求；企业版自适应层则面向需要精细化流量管理和对延迟/可用性极为敏感的生产环境。

---

## References

1. [Bifrost GitHub Repository (maximhq/bifrost)](https://github.com/maximhq/bifrost)
2. [core/keyselectors/weightedrandom.go - 加权随机选择实现](https://github.com/maximhq/bifrost/blob/dev/core/keyselectors/weightedrandom.go)
3. [core/schemas/account.go - Key 结构体定义](https://github.com/maximhq/bifrost/blob/dev/core/schemas/account.go)
4. [core/schemas/bifrost.go - KeySelector 类型定义](https://github.com/maximhq/bifrost/blob/dev/core/schemas/bifrost.go)
5. [docs/enterprise/adaptive-load-balancing.mdx - 自适应负载均衡文档](https://github.com/maximhq/bifrost/blob/dev/docs/enterprise/adaptive-load-balancing.mdx)
6. [docs/features/keys-management.mdx - Key 管理与加权负载均衡配置](https://github.com/maximhq/bifrost/blob/dev/docs/features/keys-management.mdx)
7. [docs/features/governance/routing.mdx - 治理路由配置](https://github.com/maximhq/bifrost/blob/dev/docs/features/governance/routing.mdx)
8. [docs/providers/provider-routing.mdx - Provider 路由完整指南](https://github.com/maximhq/bifrost/blob/dev/docs/providers/provider-routing.mdx)
9. [docs/architecture/core/request-flow.mdx - 请求流程架构](https://github.com/maximhq/bifrost/blob/dev/docs/architecture/core/request-flow.mdx)
10. [docs/architecture/core/concurrency.mdx - 并发架构设计](https://github.com/maximhq/bifrost/blob/dev/docs/architecture/core/concurrency.mdx)
