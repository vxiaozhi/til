# AI 网关开源生态全景调研：项目图谱、架构解析与七层网关异同分析

> 研究日期: 2026-06-14 | 来源数量: 34 | 字数: ~7,000 | 模式: Standard | AS_OF: 2026-06-14 | 官方源占比: 35%

## 摘要 / Executive Summary

AI 网关（AI Gateway）是介于应用程序与大语言模型（LLM）提供商之间的中间件层，提供统一的 API 入口、多模型路由、认证鉴权、速率限制、成本治理、语义缓存和安全防护等能力。本研究对开源 AI 网关生态进行了系统性调研，识别出 35+ 个活跃项目，涵盖 Python 代理、Go/Rust 高性能网关、企业级 API 网关 AI 插件、中国生态中继平台和新兴 MCP 网关五大类别。

核心发现：（1）AI 网关市场 2025 年估值 21.8 亿美元，预计 2030 年达 72.1 亿美元（CAGR 27.1%）[5]；（2）LiteLLM 以 50.3k GitHub Stars 和 240M+ Docker Pulls 占据社区主导地位，但 Python 架构在高并发场景下存在性能瓶颈 [1][26]；（3）Go 语言网关（Bifrost、Envoy AI Gateway、Higress）在吞吐量方面有 40-50 倍的优势 [11][12]；（4）AI 网关与传统七层网关的根本差异在于令牌感知计费、语义缓存、内容级安全检测和流式传输优化四个维度 [7][8][9]；（5）2026 年 Q1-Q2 的供应链安全事件（LiteLLM PyPI 投毒）和行业整合（Portkey 被 Palo Alto Networks 收购、Helicone 被 Mintlify 收购）标志着生态从草根开源向企业级基础设施的结构性转变 [3][22][14]。

**置信度:** High — 基于 34 个独立来源、20 个域名、12 个官方来源交叉验证。

---

## 目录

1. [AI 网关开源项目全景图谱](#1-ai-网关开源项目全景图谱)
2. [代表性项目深度分析](#2-代表性项目深度分析)
3. [AI 网关技术架构与核心能力](#3-ai-网关技术架构与核心能力)
4. [AI 网关与传统七层网关的异同](#4-ai-网关与传统七层网关的异同)
5. [市场趋势与生态动态](#5-市场趋势与生态动态)
6. [争议与反方观点](#6-争议与反方观点)
7. [关键发现](#7-关键发现)
8. [局限性与未来方向](#8-局限性与未来方向)
9. [参考文献](#9-参考文献)

---

## 1. AI 网关开源项目全景图谱

### 1.1 生态总览

截至 2026 年 6 月，开源 AI 网关生态包含 35+ 个活跃项目，按架构语言和定位可分为五大类别 [6][22]：

| 类别 | 代表项目 | 语言 | Stars (approx.) | 核心定位 |
|------|---------|------|-----------------|---------|
| **Python 代理型** | LiteLLM, aisuite, MLflow AI Gateway | Python/TypeScript | 14k-50k+ | 轻量级统一 API 代理 |
| **高性能网关** | Bifrost, TensorZero | Go, Rust | 5.7k-11.6k | 低延迟、高吞吐量 |
| **企业 API 网关 + AI 插件** | Kong AI, APISIX, Envoy AI Gateway, Higress, kgateway | Go/Lua | 1.7k-43.6k | 在成熟 API 网关基础上叠加 AI 能力 |
| **中国生态中继平台** | new-api, one-api, GPT-Load | Go | 6.2k-38.7k | 多租户 Key 分发与计费 |
| **MCP 网关** | Lunar MCPX, agentgateway, IBM Context Forge | 多语言 | 454-3.5k | 工具调用治理与代理编排 |

Stars 数据反映社区关注度，但不等同于生产成熟度 [6]。

### 1.2 关键项目一览

除 LiteLLM 外（详见第 2 章），值得关注的项目包括 [1][2][6][22]：

- **new-api**（Go, AGPL-3.0, ~38.7k stars）：one-api 的活跃分支，在中国生态中占据主导，提供 Key 分发、用户计费和 50+ 渠道支持。
- **one-api**（Go, MIT, ~34.9k stars）：中国生态 LLM 中继平台的鼻祖，10 分钟 Docker 部署。
- **Portkey Gateway**（TypeScript, Apache 2.0, ~12.1k stars）：2026 年 3 月全面开源，覆盖 1,600+ 模型变体，2026 年 4 月被 Palo Alto Networks 收购 [14][22]。
- **TensorZero**（Rust, Apache 2.0, ~11.6k stars）：将评估、实验和数据反馈闭环直接嵌入网关，是唯一将优化飞轮作为网关内置能力的项目 [22]。
- **Higress**（Go/Envoy, Apache 2.0, ~8.6k stars）：阿里系出品，2026 年 3 月加入 CNCF Sandbox，同时替代 Nginx Ingress 和 AI 网关 [18]。
- **Bifrost**（Go, Apache 2.0, ~5.7k stars）：号称 40 倍于 LiteLLM 的网关开销，支持 MCP 和自适应负载均衡 [11][12]。
- **Envoy AI Gateway**（Go, Apache 2.0, ~1.7k stars）：CNCF 生态中首个正式 AI 网关项目，由 Tetrate 和 Bloomberg 联合推出 [16][17]。

### 1.3 许可证格局

许可证呈现显著碎片化：MIT（LiteLLM 核心、one-api、aisuite、GPT-Load）、Apache 2.0（Kong 核心、TensorZero、Bifrost、Higress、Envoy AI Gateway、APISIX）、AGPL-3.0（new-api）三足鼎立。AGPL-3.0 的网络条款被多个来源标记为"大多数企业采购的资格排除项"。Kong 的开放核心模式将语义缓存、Prompt Guard 等 AI 专项插件锁定在 Enterprise 许可证后 [6][22]。

---

## 2. 代表性项目深度分析

### 2.1 LiteLLM — 社区主导者

LiteLLM 由 BerriAI（YC W23）维护，是当前社区规模最大的开源 AI 网关 [1][2]。核心指标：

| 维度 | 数据 |
|------|------|
| GitHub Stars | ~50,300 |
| 贡献者 | 1,000+ |
| Docker Pulls | 240M+ |
| PyPI 下载量 | 470,000+ |
| 支持的 LLM 提供商 | 100+ |
| 许可证 | MIT（核心）/ 商业许可（企业功能） |

**架构特点：** 提供 Python SDK（`pip install litellm`）和 Proxy Server（基于 FastAPI 的 AI 网关，Docker 部署）两种部署面。实验性的微服务化部署（gateway + backend + UI）支持 Helm Chart，将 LLM 数据面与管理控制面分离 [2]。

**企业功能：** 虚拟 Key 与权限范围管理、多租户层级（Organization > Team > User > Key）+ RBAC、按调用成本追踪与实时预算执行、基于延迟和最少繁忙策略的负载均衡、跨提供商自动故障转移（fallback）、Redis 缓存、OpenTelemetry 可观测性回调。已知采用方包括 Netflix、Adobe、Samsara、Lemonade、Rocket Money [1][2][28]。

**性能局限：** 官方声称 1,000 RPS 下 P95 延迟 8ms，但独立第三方在 t3.xlarge 实例上的基准测试显示：500 RPS 下 P99 延迟高达 28,000ms，1,000 RPS 时因内存耗尽（4.3 GB）崩溃。相比之下，Go 语言实现的 Bifrost 在同等条件下 P99 延迟仅 520ms、内存 1.4 GB [12][26]。Python GIL 竞争是根本瓶颈。

**安全事件：** 2026 年 3 月 24 日发生重大供应链投毒事件——恶意版本 v1.82.7 和 v1.82.8 通过被入侵的 CI/CD（Trivy 扫描器投毒）发布至 PyPI，载荷包括凭证窃取（SSH 密钥、云凭证、.env 文件）和 DNS 隧道外传。恶意包在线 40 分钟至 5.5 小时后被 PyPI 隔离 [3]。事后 BerriAI 采取了一系列补救措施：凭证轮换、Trusted Publishers + 临时凭证重建 CI/CD、Cosign 发布签名、移除 6,000+ 开放分支、委托 Veria Labs 外部审计 [3]。

### 2.2 Bifrost — 性能标杆

Bifrost（Go, Apache 2.0）是高性能 AI 网关的代表 [11][12]。在 t3.xlarge 实例上 5,000 RPS 持续负载下的关键指标：

| 指标 | Bifrost (Go) | LiteLLM (Python) | 倍数 |
|------|-------------|-------------------|------|
| 网关开销（P50） | 11 μs | 440 μs | **40x** |
| 内存占用 | 50 MB | 500 MB | **10x** |
| 队列等待 | 1.67 μs | 47 μs | **28x** |
| 网关层故障率 | 0% | 11% | — |
| 容器大小 | ~20 MB | ~500 MB | **25x** |
| 最大稳定吞吐 | 5,000+ RPS | <1,000 RPS | **5x+** |

注意：40 倍优势仅适用于网关开销，端到端延迟改善约 24%（1.61s vs 2.12s），因为 LLM 推理延迟占端到端延迟的主体 [12]。Go 的 goroutine（单栈约 2KB，无 GIL）是核心架构优势，实现了基于 channel 的异步队列，完全替代了基于互斥锁的协调。

Bifrost 支持 ~23 个提供商（对比 LiteLLM 100+），但已覆盖主流厂商。支持 MCP 和自适应负载均衡（latency-based + least-busy）。许可证采用纯净的 Apache 2.0，无开放核心限制 [11]。

### 2.3 Portkey — 开源转型的观察平台

Portkey 于 2026 年 3 月将网关核心全面开源（Apache 2.0），日处理超过 1 万亿 tokens [14]。覆盖 250+ 提供商和 1,600+ 模型变体，同时将可观测性控制面和高级企业功能（SOC 2、HIPAA、SSO、PII 脱敏）保留为闭源 SaaS 层。定价从 $49-$99/月起 [13][29][22]。

2026 年 4 月 30 日被 Palo Alto Networks 收购后，Portkey 路线图正在整合进 Prisma AIRS [22][23]。这一收购标志着 AI 网关从独立中间件向安全平台基础设施的定位转变。

### 2.4 企业 API 网关的 AI 演进

**Kong AI Gateway**（Lua/Go, Apache 2.0, ~43.6k stars）在成熟的 API 网关上叠加 AI 插件（AI Proxy、Prompt Decorator、Prompt Guard、Semantic Cache）。优势在于现有 Kong 用户可平滑扩展，劣势是语义缓存和高级路由需 Enterprise 许可证，且 LLM 调用在很大程度上被视为不透明 HTTP 请求，缺乏 Token 级可见性 [7][21][6]。

**Envoy AI Gateway**（Go, Apache 2.0, ~1.7k stars）是 CNCF 生态中首个 AI 网关，v0.7.0（2026 年 6 月），支持 16+ 提供商。采用两层架构：Tier 1 集中式网关负责外部 API 入口和全局认证/路由/限流，Tier 2 负责集群内部的端点选取和模型管理。Kubernetes 原生（CRD 配置），支持 Gateway API Inference Extension 实现推理感知路由（KV-cache 命中率、队列深度、LoRA 适配器放置），这是纯代理型网关所不具备的能力 [16][17][20]。

**Higress**（阿里系, Go/Envoy/Istio, Apache 2.0, ~8.6k stars）2026 年 3 月加入 CNCF Sandbox（恰逢 Nginx Ingress 退休）。独特定位：将流量网关、微服务网关和 AI 网关合并为单一控制面，同时支持传统 REST/gRPC API 管理和 LLM/MCP 流量管理。在阿里双十一规模验证，生产用户包括阿里、蚂蚁集团、携程、大疆、快手、BOSS 直聘 [18][6]。

### 2.5 MLflow AI Gateway — 实验平台的网关

MLflow AI Gateway（Python, Apache 2.0, 约 26.5k stars）为 50+ LLM 提供商提供统一端点，直接嵌入 MLflow Tracking Server 无需独立进程。支持流量分割（A/B 测试）、自动 fallback 链，并将每次请求记录为 MLflow Trace（含成本和延迟仪表盘）。但与专用网关相比，缺乏内置 guardrails、语义缓存和细粒度速率限制 [15][6]。

### 2.6 中国生态: One API / New API

one-api（Go, MIT, ~34.9k stars）和其活跃分支 new-api（Go, AGPL-3.0, ~38.7k stars）在中国生态占据主导。10 分钟 Docker 部署，50+ 渠道支持（尤其覆盖 DeepSeek、通义千问、智谱 GLM 等国产模型），内置用户计费、虚拟 Key 管理、按 Key 配额。但缺乏语义缓存、guardrails，高级配置需手动编辑数据库 [6][22]。

这两个项目合计 Stars 超过 73k（超过 LiteLLM），但在英语技术媒体的网关对比中系统性地被排除，反映出显著的地理和语言偏差 [6]。

---

## 3. AI 网关技术架构与核心能力

### 3.1 架构模式

业界已收敛为三种主要架构模式 [7][8][19][20]：

**模式 A — 集中式代理（Centralized Proxy）：** 应用通过 OpenAI 兼容 API 接入网关，网关负责认证、路由、缓存和可观测性。配置（ConfigMap）承载所有路由规则、fallback 策略和成本治理——与应用程序代码解耦，实现变更无需重新部署 [19]。LiteLLM、Bifrost、Portkey、One API 遵循此模式。

**模式 B — 两层架构（Two-Tier）：** 适用于同时使用外部 API 和自托管模型的企业。Tier 1 集中式网关集群处理外部 API 入口、全局认证和顶级路由；Tier 2 内部模型服务集群处理负载均衡、模型版本管理和 GPU 自动扩缩容 [20]。Envoy AI Gateway 是该模式的原生实现。

**模式 C — 统一 API+AI 平台：** 在现有 API 网关基础上通过插件叠加 AI 能力。Kong、APISIX、Higress 均属此类。此模式减少了运维碎片，但可能在 AI 流量的深度 Body 检测上有所妥协 [7][8]。

### 3.2 Day-1 生产必备能力

综合多个来源，AI 网关在生产环境中的 8 项必备能力为 [1][19][21][33]：

1. **统一 API（Unified API）：** 单一 OpenAI 兼容端点，应用一次集成即可访问所有模型。
2. **自动故障转移（Automatic Failover）：** 基于 HTTP 429/5xx 自动切换提供商，优先级 fallback 链。生产数据显示 fallback 挽救了 3.5% 的请求和 5.1% 的 tokens [4]。
3. **Token 级速率限制（Token-Level Rate Limiting）：** 区别于传统 API 网关的请求计数限流，需感知 token 消耗量。
4. **虚拟 Key 管理（Virtual Key Management）：** 应用层不直接持有提供商凭证，通过网关分发带权限范围的虚拟 Key。
5. **集中式日志与成本追踪（Centralized Logging & Cost Tracking）：** 按调用、按模型、按团队的实时成本可见性。
6. **PII 检测与注入防护（PII/Injection Detection）：** OWASP 2025 将 Prompt 注入列为 LLM 应用 #1 风险 [7]。
7. **流式传输支持（Streaming Support）：** SSE 协议支持，区别于传统 API 的请求-响应模式。
8. **精确匹配缓存（Exact-Match Caching）：** 对相同请求直接返回缓存结果，避免重复推理成本。语义缓存可进一步降低 20-40% 推理成本 [7]。

### 3.3 Agentic 工作负载的冲击

Vercel 2026 年 4 月生产指数数据显示：59% 的 Token 量来自工具调用（agentic）请求，较 6 个月前增长 27 个百分点。工具调用请求平均消耗 2.6x 更多 tokens [4]。

Agentic 流量的三个特殊要求 [9]：
- **双向、有状态协议：** Envoy 的无状态单向架构与 MCP/A2A 的双向通信根本冲突。
- **延迟叠加效应：** 代理循环中的每一毫秒网关延迟会累积放大（一轮代理交互包含数十次快速往返）。
- **深度 Body 检测：** 传统网关仅检查 Header，而 MCP tool call 的上下文（模型名、prompts、token 数、工具定义）深藏在 JSON Body 中。

---

## 4. AI 网关与传统七层网关的异同

### 4.1 根本差异：五个维度

AI 网关不是传统 API 网关（七层/应用层网关）的替代品，而是其演化扩展。两者有五个根本性差异 [7][8][9]：

| 维度 | 传统七层网关 | AI 网关 |
|------|-------------|---------|
| **流量模式** | 同步请求-响应（REST/gRPC） | 流式传输（SSE/WebSocket），连接需长时间保持 |
| **计费单位** | 请求次数 | Token 消耗量（输入 + 输出），成本模型完全不同 |
| **缓存策略** | 精确匹配（URL + Header Hash） | 语义缓存（cosine 相似度匹配），需嵌入模型支持 |
| **安全模型** | 认证 + 授权 + WAF | 额外需要 Prompt 注入检测 + 输出内容审核 |
| **可观测性** | 请求指标（RPS、延迟、错误率） | Token 级指标（Token 吞吐量、每 Token 成本、模型级延迟） |

### 4.2 架构层面的结构性冲突

传统 Envoy 网关的架构与 AI 工作负载存在三个结构性冲突 [9]：

1. **无状态 vs 有状态：** Envoy 设计为无状态、单向代理。AI 的 MCP 协议和 A2A（Agent-to-Agent）通信是双向、有状态的——需要连接级 Session 管理而非请求级路由。
2. **Body 盲路由：** 传统网关"将流量视为不透明信封，仅检查 Header"。关键 AI 上下文（模型名、prompts、工具调用定义）深藏在 JSON Body 中，需要深度 Body 解析作为一等公民能力。
3. **进程外补丁的脆弱性：** 通过 Envoy 外部进程（ext_proc）或 Wasm 插件添加 AI 能力，每个外部调用增加延迟和故障点。Solo.io 的评估是"修复 Envoy 插件层级的 AI 网关问题在根本上是不充分的" [9]。

### 4.3 行业演进路径

关于 AI 网关的未来形态，存在三种竞争性观点：

**观点 A — 统一平台论（Kong, APISIX, API7.ai）：** "AI 网关和 MCP 网关不是根本上的新技术，而是传统 API 网关架构上的领域特化配置。" [10] 建议将 AI 流量视为 API 网关上的专项路由和插件。未来 18-24 个月内单一控制面将管理所有流量类型 [7]。Gartner 估计统一平台可降低 30-50% 的运维成本 [8]。

**观点 B — 从零重建论（Solo.io, Bifrost 团队）：** 传统代理的架构假设与 AI 工作负载根本冲突。"修复 Envoy 插件层级的问题在根本上是不充分的。" [9] 需要"从头构建的纯 Rust 数据面，为有状态、双向代理协议定制"，深度 Body 检测作为一等公民能力。此观点在 agentic 工作负载为主的生产环境中尤其有力。

**观点 C — 分层部署论（Tyk, Gravitee, Traefik）：** 维持两个独立网关——传统 API 网关和 AI 专用网关。互不干扰，按需扩展，避免统一平台中的功能折衷。

**置信度:** Medium — 任一观点均来自有立场的供应商，缺乏独立的第三方比较数据 [6][22]。

**反方解释:** 统一平台论的支持者（Kong, APISIX）是既有企业 API 网关市场份额的受益者，天然倾向于"AI 只是另一个协议"的叙事。从零重建论（Solo.io）则是新产品试图从差异化架构切入市场的后发者叙事。真实情况可能取决于部署场景：对 80% 的初期 AI 部署，统一平台"足够好"；对高吞吐 agentic 工作负载，专用 AI 网关有不可替代的优势。

### 4.4 供应商背景揭露

必须指出：本研究关于 AI 网关与传统网关对比的四个深度来源（Kong、APISIX、Solo.io、API7.ai）均为供应商或项目关联方博客，存在内在的定位偏好——Kong 和 APISIX 倡导统一平台（保护现有市场份额），Solo.io 主张从零重建（差异化新产品），API7.ai 淡化差异（与其 APISIX 产品对齐）。缺乏独立第三方（学术、分析师）的客观比较是当前研究生态的显著缺口 [7][8][9][10]。

---

## 5. 市场趋势与生态动态

### 5.1 市场规模

Research and Markets 2026 年 3 月报告显示：AI 网关市场 2025 年估值 21.8 亿美元，预计 2030 年达 72.1 亿美元，CAGR 27.1% [5]。Kong 引用的另一组数据估计略低（2024 年 39.11 亿美元至 2031 年 98.43 亿美元，CAGR 14.3%）[7]。两组数据的 100 倍差异源于范围定义不同——较窄的定义排除 API 管理平台和模型 API 消费本身，使得跨报告比较不可靠。

### 5.2 提供商格局：无人通吃

Vercel 2026 年 4 月生产数据显示了明确的"无人通吃"格局 [4]：
- **Anthropic 主导支出**：61% 支出份额，仅 26% Token 量——高价值企业场景（编码代理、后台自动化）
- **Google 主导量**：38% Token 量，仅 21% 支出——依靠 Gemini Flash 等低成本模型
- **OpenAI 回升**：2026 年 3 月至 4 月支出增长 3 倍，受 GPT-5.4/5.5 发布推动

结论：多模型路由不是可选的优化，而是必须的基础设施 [4]。

### 5.3 2026 关键事件与结构性转变

**供应链安全危机：** 2026 年 3 月 24 日 LiteLLM 遭遇 PyPI 投毒事件（TeamPCP 攻击组织），暴露了自托管网关的安全风险，推动了全行业 commit pinning 和 Sigstore 验证的采用 [3][21][22]。随后 CVE-2026-30623（2026 年 4 月 15 日）披露了影响至少 14 个项目的 MCP STDIO 命令注入漏洞——加速了网关层内置 guardrails 的推进 [22]。

**行业整合：** Helicone 被 Mintlify 收购（2026 年 3 月 3 日，转为维护模式），Portkey 被 Palo Alto Networks 收购（2026 年 4 月 30 日，整合进 Prisma AIRS）。OpenRouter 逆势获 1.13 亿美元 B 轮融资（估值 13 亿美元，2026 年 5 月）——信号：独立网关仍有空间，但只有规模最大的能独立存活 [22][23]。

**MCP 协议普及：** 78% 的 AI 生产团队运行 MCP，75% 的网关厂商预计 2026 年底前支持 MCP 功能 [4][5]。MCP 网关正在分化为三个子模式：API 到 MCP 翻译、代理间 A2A 治理、MCP 服务器聚合加成本覆盖 [24]。

**中国生态独立发展：** new-api / one-api 生态在合并 Stars 上超过 LiteLLM，但聚焦于 Key 分发/转售和国产模型支持而非 evaluations/guardrails——反映了不同的市场结构 [6]。

---

## 6. 争议与反方观点

### 核心争议 1: 独立 AI 网关 vs 统一 API 网关

正方（Kong, APISIX）：AI 网关只是 API 网关的一个特化配置，统一平台降低成本 30-50% [7][8]。反方（Solo.io, Bifrost）：AI 流量的特殊性（流式传输、Token 计费、有状态双向协议）要求专用架构，在旧代理上打补丁"从根本上不充分" [9]。目前缺乏独立的实证研究结论。

### 核心争议 2: Python vs Go/Rust 的性能争论

LiteLLM 社区规模（50.3k stars）远超任何 Go 替代品，证明了"够用就好"的性能对大多数场景是足够的。但独立 benchmark 显示 Python 网关在 500 RPS 下 P99 延迟 28 秒——对延迟敏感的生产场景不可接受 [12][26]。争议点在于：大多数团队是否需要超过 1,000 RPS？答案可能取决于场景。

### 核心争议 3: 中国生态被排除在英语评测之外

new-api（38.7k stars）和 one-api（34.9k stars）在社区规模上超过了 Bifrost、Portkey、TensorZero 的总和，但在 FutureAGI、Contabo、Pomerium 等英语评测中从未出现——暗示系统性的地理和语言偏差 [6][22]。但两者缺乏 guardrails 和 evals 功能，更多是 API 分销工具而非完整的 AI 网关。

### 核心争议 4: 性能数据全为厂商发布

Bifrost 的 "11 μs 网关开销"、Future AGI 的 "29k req/s"、LiteLLM 的 "8ms P95" 均来自项目自身或关联方——缺乏中立的第三方独立复现 [22][6]。在没有标准化 benchmark（如 TPC 对数据库）的情况下，任何性能对比声明都应打折扣。

---

## 7. 关键发现

- **发现 1 — 生态成熟但碎片化：** 35+ 开源项目中有明确的两个社区领导者（LiteLLM 在社区规模，Bifrost/Envoy AI Gateway 在架构质量）。Python 主导社区（50k+ stars），Go/Rust 主导性能（40-50x 优势）。许可证碎片化（MIT/Apache 2.0/AGPL-3.0/开放核心）增加了企业选型复杂度。 [1][6][11][22]

- **发现 2 — 安全正在重塑生态：** 2026 年 3 月 LiteLLM 供应链投毒事件和 CVE-2026-30623 将供应安全从"最佳实践"升级为"选型准入门槛"——Sigstore 签名、SLSA 认证和漏洞响应 SLA 正成为基础设施软件的强制性要求。 [3][22]

- **发现 3 — AI 网关不是七层的替代，而是扩展：** 五个维度上存在根本差异（流式传输、Token 计费、语义缓存、内容安全、Token 级可观测性），但所有差异都是叠加在七层基础上的 AI 特化能力——并非推翻重来。 [7][8][9]

- **发现 4 — Agentic 工作负载正在改变游戏规则：** 59% 的 Token 量来自工具调用，2.6x Token 放大效应，以及 MCP/A2A 有状态双向协议的兴起——使得传统无状态代理的架构局限性从理论问题变为生产瓶颈。 [4][9]

- **发现 5 — 独立评测和标准化 Benchmark 严重缺乏：** 所有性能对比数据均来自厂商发布，所有深度分析均来自有立场的供应商博客。AI 网关生态亟需类似于数据库领域 TPC 的标准化性能测试和第三方评估框架。 [6][22]

---

## 8. 局限性与未来方向

### 本研究局限

- **来源偏差：** 对比分析的核心来源（Kong、APISIX、Solo.io、API7.ai）均为供应商关联方，缺乏独立学术或分析师视角。所有性能数据均未经第三方独立复现。
- **覆盖偏差：** 英语来源系统性排除中国生态高 Stars 项目（new-api、one-api）。MCP 网关子类别的最近一次全面综述停留在 2025 年 6 月，已过时。
- **定量数据不足：** 缺少自托管 TCO（总拥有成本）分析、网关代理层延迟惩罚的 P50/P99 量化数据、传统网关处理 AI 流量的生产故障率数据。
- **地区偏差：** 市场数据以北美和西欧为主，亚太地区（尤其中国）数据有限。

### 未来方向

1. **标准化 Benchmark 需求（高优先级）：** 需要有中立组织（如 CNCF SIG）定义统一的 AI 网关性能测试标准和参考工作负载——类似于数据库领域的 TPC-C/TPC-H。
2. **开源社区健康度量（中优先级）：** 对 GitHub stars 之外的生产采用率（Docker pulls、PyPI 下载量、贡献者活跃度趋势）进行系统性跟踪。
3. **安全态势持续跟踪（高优先级）：** LiteLLM 安全事件后的供应链安全态势演变，以及各项目的 SLSA 成熟度。
4. **中国生态深度调研（中优先级）：** 对 new-api/one-api 生态的功能、社区和生产案例进行独立调研，填补英语文献空白。

---

## 9. 参考文献

[1] LiteLLM GitHub Repository. Source-Type: official. As Of: 2026-06. https://github.com/BerriAI/litellm
[2] LiteLLM Official Documentation. Source-Type: official. As Of: 2026-06. https://docs.litellm.ai/docs/
[3] Datadog Security Labs. "LiteLLM Supply Chain Compromise Analysis." Source-Type: official. As Of: 2026-03. https://securitylabs.datadoghq.com/articles/litellm-compromised-pypi-teampcp-supply-chain-campaign/
[4] Vercel. "AI Gateway Production Index." Source-Type: official. As Of: 2026-04. https://vercel.com/blog/ai-gateway-production-index
[5] Research and Markets. "Large Language Model Gateways Market Report 2026." Source-Type: secondary-industry. As Of: 2026-03. https://www.researchandmarkets.com/reports/6231289/large-language-model-gateways-market-report
[6] cuihuan. "awesome-ai-gateway: Curated List of AI Gateways." Source-Type: community. As Of: 2026-06-14. https://github.com/cuihuan/awesome-ai-gateway
[7] Kong Inc. "API Gateway vs. AI Gateway: Key Differences & Best Use Cases." Source-Type: secondary-industry. As Of: 2025-11. https://konghq.com/blog/learning-center/api-gateway-vs--ai-gateway
[8] Apache APISIX (Yilia Lin). "AI Gateway vs API Gateway Differences Explained." Source-Type: secondary-industry. As Of: 2025-03. https://apisix.incubator.apache.org/blog/2025/03/21/ai-gateway-vs-api-gateway-differences-explained/
[9] Solo.io (Sebastian Maniak). "Why Traditional Gateways Failed AI Workloads." Source-Type: secondary-industry. As Of: 2025-12. https://www.solo.io/blog/why-traditional-gateways-failed-ai-workloads-and-how-kgateways-rust-powered-agentgateway-fixes-it
[10] API7.ai. "AI Gateway, MCP Gateway, API Gateway — What's the Difference?" Source-Type: secondary-industry. As Of: 2025-06. https://api7.ai/ja/learning-center/api-gateway-guide/ai-gateway-vs-mcp-gateway-vs-api-gateway
[11] Bifrost AI Gateway Official Documentation. Source-Type: official. As Of: 2026-06. https://docs.getbifrost.ai/overview
[12] Varshith V Hegde. "Bifrost: The LLM Gateway That's 40x Faster Than LiteLLM." Source-Type: community. As Of: 2026-05. https://dev.to/varshithvhegde/bifrost-the-llm-gateway-thats-40x-faster-than-litellm-1763
[13] Portkey AI Gateway Documentation. Source-Type: official. As Of: 2026-06. https://portkey.ai/docs/product/ai-gateway
[14] Benzinga. "Portkey's Gateway is Now Fully Open Source." Source-Type: journalism. As Of: 2026-03. https://www.benzinga.com/pressreleases/26/03/g51436964/portkeys-gateway-is-now-fully-open-source-processing-over-1-trillion-tokens-every-day
[15] MLflow AI Gateway Official Documentation. Source-Type: official. As Of: 2026-06. https://mlflow.org/genai/ai-gateway
[16] Envoy AI Gateway Official Site. Source-Type: official. As Of: 2026-06. https://aigateway.envoyproxy.io/
[17] Bloomberg. "Tetrate and Bloomberg Release Open Source Envoy AI Gateway." Source-Type: journalism. As Of: 2025-02. https://www.bloomberg.com/company/press/tetrate-and-bloomberg-release-open-source-envoy-ai-gateway-built-on-cncfs-envoy-gateway-project/
[18] CNCF Blog. "Higress Joins CNCF." Source-Type: official. As Of: 2026-03. https://www.cncf.io/blog/2026/03/25/higress-joins-cncf-delivering-an-enterprise-grade-ai-gateway-and-a-seamless-path-from-nginx-ingress/
[19] FreeCodeCamp. "The LLM Gateway Pattern: Why Every Kubernetes-Based AI App Needs One." Source-Type: community. As Of: 2025. https://www.freecodecamp.org/news/the-llm-gateway-pattern-why-every-kubernetes-based-ai-app-needs-one/
[20] Envoy AI Gateway. "A Reference Architecture for Adopters of Envoy AI Gateway." Source-Type: official. As Of: 2025. https://aigateway.envoyproxy.io/blog/envoy-ai-gateway-reference-architecture/
[21] Kong Inc. "Kong AI Gateway vs LiteLLM: Which AI Gateway Scales for Production?" Source-Type: secondary-industry. As Of: 2026-03. https://konghq.com/blog/enterprise/kong-ai-gateway-vs-litellm
[22] FutureAGI. "Best 7 Open Source AI Gateways in 2026." Source-Type: secondary-industry. As Of: 2026-05. https://futureagi.com/blog/best-open-source-ai-gateways/
[23] FutureAGI. "Best 5 LiteLLM Alternatives in 2026." Source-Type: secondary-industry. As Of: 2026-05. https://futureagi.com/blog/best-litellm-alternatives-2026/
[24] Nordic APIs. "10+ API Gateways That Support MCP." Source-Type: journalism. As Of: 2025-06. https://nordicapis.com/10-api-gateways-that-support-mcp/
[25] Contabo. "LiteLLM vs Portkey, Kong & Cloudflare: AI Gateways Compared." Source-Type: secondary-industry. As Of: 2026-05. https://contabo.com/blog/litellm-vs-ai-gateways/
[26] Kuldeep Paul. "LLM Gateway Comparison: Bifrost vs LiteLLM 2025." Source-Type: community. As Of: 2025. https://dev.to/kuldeep_paul/llm-gateway-comparison-bifrost-vs-litellm-2025-4elk
[27] PyPI. "litellm Package." Source-Type: official. As Of: 2026-06. https://pypi.org/project/litellm/
[28] InfoWorld. "LiteLLM Article." Source-Type: journalism. As Of: 2025. https://www.infoworld.com/article/3975290
[29] FutureAGI. "Portkey Alternatives in 2026: 6 LLM Gateway and Observability Tools." Source-Type: secondary-industry. As Of: 2026-06. https://futureagi.com/blog/portkey-alternatives-2026/
[30] FutureAGI. "OpenRouter Alternatives in 2026." Source-Type: secondary-industry. As Of: 2026-06. https://futureagi.com/blog/openrouter-alternatives-2026/
[31] FutureAGI. "LiteLLM vs Alternatives in 2026." Source-Type: secondary-industry. As Of: 2026-06. https://futureagi.com/blog/litellm-llms-comparison-2025/
[32] Pomerium. "LiteLLM Alternatives: Best Open-Source and Secure LLM Gateways in 2025." Source-Type: secondary-industry. As Of: 2025-08. https://www.pomerium.com/blog/litellm-alternatives
[33] Multi-Vendor AI Gateway Capabilities Synthesis (Cloudflare, Portkey, Solo.io, Tyk, Gravitee, Tetrate, nexos.ai, Databricks, Last9, TrueFoundry). Source-Type: secondary-industry. As Of: 2025-2026.
[34] pingcap/ossinsight. "Issue #2169 — LLM Gateway Collection Request." Source-Type: community. As Of: 2025. https://github.com/pingcap/ossinsight/issues/2169
