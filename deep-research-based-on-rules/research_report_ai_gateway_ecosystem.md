# AI 网关开源项目全景调研：从独立网关到传统网关 AI 扩展

## 执行摘要

截至 2026 年年中，AI 网关开源生态已形成六大阵营：以 LiteLLM（50k+ Stars）为代表的 Python 独立网关、以 Bifrost 和 TensorZero 为代表的 Go/Rust 高性能网关、以 Kong/APISIX/Higress 为代表的传统网关 AI 插件、以 new-api 为代表的国产 API 分发系统、以 Docker MCP Gateway 和 IBM Context Forge 为代表的 MCP 专用网关，以及以 Gravitee/kgateway 为代表的统一 API+AI 治理平台。AI 网关与传统 7 层网关最本质的差异体现在五个维度：限流单位从"请求数/秒"变为"Token/分钟+金额预算/月"、缓存从 HTTP 精确匹配升级为语义向量匹配、路由从 URL/Header 路由扩展为模型名+成本+延迟多维路由、安全从 WAF/DDoS 延伸到 Prompt 注入防护和 PII 脱敏、流量模型从同步短连接变为 SSE 流式长连接。当前行业趋势是传统网关和 AI 网关正在融合——Rust 数据平面正在取代 C++/Python 成为新默认选择，MCP 和 A2A 协议正成为新一轮竞争的关键战场。

## 背景

2025 至 2026 年间，大语言模型调用量呈爆发式增长。企业接入的模型提供商从最初单一的 OpenAI 扩展到 Anthropic、Google Gemini、AWS Bedrock、Azure、国内外开源模型等数十个来源。管理如此复杂的多模型调用基础设施——包括统一接入、成本控制、安全治理、可观测性——催生了 AI 网关这一全新基础设施品类。与此同时，传统的 API 网关（Kong、APISIX、Envoy、Nginx）也纷纷推出 AI 插件来覆盖这一需求。本文旨在系统梳理当前 AI 网关开源生态，并分析其与传统 7 层网关的核心差异。

## 一、独立 AI 网关核心项目

### 1.1 LiteLLM

LiteLLM（GitHub: BerriAI/litellm）是当前 AI 网关赛道的事实标准，截至 2026 年 6 月拥有约 50,300 个 GitHub Stars（累计发布 1,361 个版本）。项目使用 Python 编写（86.4%），MIT 协议，由 Y Combinator（W23）支持的 BerriAI 公司维护，获得 160 万美元融资，累计 PyPI 下载量超 4.8 亿次。Docker 拉取量超过 2.4 亿次，生产环境已处理超过 10 亿次请求。值得警惕的是，LiteLLM 在 2026 年 3 月遭遇严重供应链攻击——恶意版本（v1.82.7/v1.82.8）通过 DNS 隧道窃取 SSH 密钥和 API 凭据，12 小时内被撤销，但此事严重动摇了受监管行业对 Python 网关安全性的信心。

LiteLLM 提供两种使用形态：Python SDK（嵌入应用进程）和独立代理服务器（AI Gateway，属于独立微服务模式）。核心功能包括：统一的 OpenAI 兼容接口调用 140+ 模型提供商（2,500+ 模型）、虚拟密钥（Virtual Keys）实现多租户密钥管理、成本追踪与预算管控（按密钥/用户/团队/项目实时追踪费用并设硬性预算上限）、智能路由与容灾（负载均衡、自动故障转移、重试、冷却期、上下文窗口溢出处理）、Redis 语义缓存、OpenTelemetry/Prometheus/Langfuse 可观测性集成、RPM/TPM 速率限制。2026 年重点发力 Agent 网关（A2A 协议，支持 LangGraph/Vertex AI Agent Engine/Azure AI Foundry/Bedrock AgentCore 等代理框架）和 MCP 工具集成。性能方面，官方宣称在 1,000 RPS 下 P95 延迟仅 8ms。已知采用方包括 Netflix、Stripe、Adobe 等企业。主要局限是 Python GIL 瓶颈导致极高并发场景受限，以及企业功能（SSO、RBAC、审计日志）需商业许可。

### 1.2 Bifrost

Bifrost（GitHub: maximhq/bifrost）由 Maxim AI 开发，使用 Go 语言编写，Apache 2.0 协议。定位为高性能生产级 AI 网关，可作为 Kong/APISIX/Envoy 等传统网关的插件或独立部署。截至 2026 年年中拥有约 5,700 个 Stars。

Bifrost 最显著的优势是极低的请求开销，独立基准测试显示其每次请求仅 11 微秒（在 5,000 RPS 下），但需注意在 300+ 并发用户场景下出现了连接池资源耗尽问题（千万级失败）。支持 19-20 个模型提供商，双层缓存机制（精确匹配 + 向量语义缓存，支持 Redis/Weaviate/Qdrant），四级预算治理（按密钥/团队/项目/全局），原生 MCP 支持（Code Mode 可在 500+ 工具场景下节省 92.8% 输入 Token）。通过 `npx -y @maximhq/bifrost` 或 Docker 可在 30 秒内部署。相较于 LiteLLM，Bifrost 在延迟方面有数量级优势，但模型提供商覆盖数（19+ vs 140+）和社区规模（5.7k vs 50.1k Stars）差距明显。

### 1.3 Portkey

Portkey AI Gateway（GitHub: Portkey-AI/gateway）是增长最快的 AI 网关项目之一，使用 TypeScript/Node.js 编写（95.8%），MIT 协议。截至 2026 年中，主仓库拥有约 12,100 个 Stars，公司累计融资约 1,800 万美元（Elevation Capital + Lightspeed）。2026 年 5 月 29 日，Palo Alto Networks 以约 1.2-1.4 亿美元完成对 Portkey 的收购，将其整合为 Prisma AIRS（AI Runtime Security）平台的核心组件，与 Idira（Agent 身份安全）和 Chronosphere（AI 可观测性）协同——这标志着 AI 网关正式成为企业网络安全基础设施的一部分。

Portkey 提供统一的 REST API + SDK 对接 250+ 模型提供商（45+ 提供商），完全兼容 OpenAI SDK 签名。核心特性包括：自动 Fallback（失败切换到备用模型/提供商）、负载均衡（权重分发到多个 API Key）、最多 5 次自动重试（指数退避）、断路器（Circuit Breaker）熔断保护、Canary 测试（生产环境灰度发布新模型）、40-50+ 内置安全护栏（PII/PHI 自动脱敏、输入输出规则校验）、语义缓存（不限 TTL，支持流式响应回放）、虚拟 Key 管理、RBAC 角色访问控制。同时提供 SOC2、ISO27001、GDPR、HIPAA、CCPA 合规认证。

Portkey 的一大特色是极轻量部署——约 122 KB 包体，启动时间小于 1 毫秒，单命令 `npx @portkey-ai/gateway` 即可本地运行，也支持 Docker、Cloudflare Workers 等多种方式。2026 年新增了 MCP 支持、gRPC 传输（Beta）和 Realtime API（OpenAI WebSocket 集成）。

### 1.4 Helicone

Helicone（GitHub: Helicone/helicone）是一个开源 LLM 可观测性平台兼 AI 网关，使用 TypeScript 编写，Apache 2.0 协议，拥有约 5,785 个 Stars。由 Y Combinator W23 支持，但于 2026 年 3 月 3 日被文档平台 Mintlify 收购，目前已进入维护模式——安全补丁和新模型支持持续，但新功能开发显著放缓。

Helicone 的核心卖点是通过仅修改 baseURL 这一行代码即可实现 LLM 调用的完整可观测性，覆盖 100+ 模型。架构为六服务微服务：Web（NextJS 前端）、Worker（Cloudflare Workers 代理）、Jawn（Express 服务器）、Supabase（数据库+认证）、ClickHouse（分析）、Minio（日志存储）。另有一个独立的 Rust AI Gateway 子项目（596 Stars，GPL-3.0）专注于最快最轻量的网关转发。

收购后的维护模式状态使得 Helicone 对于需要长期活跃开发的团队存在一定风险，但对于个人开发者和小型团队仍然是获取 LLM 可观测性最快的方案。

### 1.5 TensorZero

TensorZero（GitHub: tensorzero/tensorzero）使用 Rust 编写，是当前唯一将推理网关、可观测性、评估（Evaluation）、优化（Fine-tuning/Prompt Engineering/RLHF）和实验（A/B Testing/Multi-Armed Bandit）整合在同一开源栈中的平台。拥有约 11,400 个 Stars，Apache 2.0 协议，但主仓库已于 2026 年 6 月 12 日归档，由社区 fork（agentify-sh/gateway）继续维护。

TensorZero 的 Rust 性能优势显著：在 4-vCPU 实例上可达 10,000 QPS（对比 LiteLLM 在 1,000 RPS 时即失败），P99 延迟开销低于 1ms。2026 年最核心的创新是 Autopilot 自动 AI 工程师——分析数百万次推理数据、识别错误模式、设置评估、对齐 LLM Judge、推荐模型、优化 Prompt、运行 A/B 测试并闭合反馈循环。其他特色包括 GEPA 自动化 Prompt 工程、多臂老虎机自适应实验（相比传统 A/B 测试将最优方案识别时间缩短 37%）、动态上下文学习（DICL）。

### 1.6 Arch Gateway (katanemo/archgw)

Arch Gateway（GitHub: katanemo/archgw）由 Envoy 核心贡献者、AWS API Gateway 团队成员和微软研究院背景的团队打造，使用 Rust + Envoy + Wasm 构建，Apache 2.0 协议，拥有约 3,700 个 Stars。

Arch 的核心设计理念是将 "Prompt 视为新型 HTTP 请求"。它内置轻量意图路由 LLM 和 Prompt 护栏模型，在 Wasm 过滤器层实现 Prompt 安全检查、意图路由和 LLM 调用劫持（替换 Header、注入追踪信息）。架构为三子系统：Listener 子系统、Prompt Handler 子系统和 Model Serving 子系统。通过 `prompt_gateway.wasm`（ingress 过滤器）和 `llm_gateway.wasm`（egress 过滤器）实现扩展，Wasm 过滤器编译为 `wasm32-wasip1` 并加载到 Envoy 中。已获得财富 500 强企业 25 万美元合同，2025 年在 Hacker News 上获得 118 分的热度。路线图包括 sidecar 模式、A2A/MCP 协议支持和基于偏好的 LLM 路由（通过 Plano 子项目）。

### 1.7 agentgateway (Solo.io)

agentgateway（GitHub: agentgateway/agentgateway）由 Solo.io 创建，使用 Rust 编写，定位为 AI 原生数据平面代理。2025 年 8 月捐赠 Linux Foundation，2026 年 6 月 4 日加入 Agentic AI Foundation（AAIF）成为第四个托管项目。发布 6 个月即获得 1,000+ Stars。

agentgateway 的核心主张是：传统 Envoy 网关是基于无状态 HTTP 请求/响应模式设计的，而 MCP 是有状态的、双向的，传统网关无法高效处理。官方宣称相比 retrofitted 方案有 300 倍内存优化、35 倍吞吐提升和 100 倍以上延迟降低。原生支持 MCP 协议（JSON-RPC 会话感知聚合、MCP Server 联邦和虚拟化）和 A2A 协议（长时间运行任务委托），通过 Cedar 策略引擎实现细粒度授权。同时实现了 Kubernetes Gateway API 完全兼容（HTTPRoute、GRPCRoute、TCPRoute、TLSRoute）。企业版提供代身份认证（On-behalf-of Identity）、加密可验证审计追踪、FIPS 合规和 7×24 支持。AAIF 关键支持方包括微软、AWS、Cisco、华为、IBM、Red Hat 等。

### 1.8 OpenClaw

OpenClaw（GitHub: openclaw/openclaw）是一个现象级的开源 AI 代理网关兼自托管 Agent 运行时，使用 TypeScript/Node.js 编写，MIT 协议，拥有约 37.9 万个 Stars 和超过 58,000 次提交，是 GitHub 历史上增长最快的项目之一。创始人为 Peter Steinberger（PSPDFKit 创始人，2026 年 2 月加入 OpenAI）。

OpenClaw 远超普通 AI 网关的范畴——它是一个完整的 AI 助手平台，包含 48 个原生工具（文件、会话、记忆、Web、消息、家庭自动化、数据库、邮件等）、9 个渠道适配器（Telegram、SMS、WhatsApp、Teams、Slack、Discord、Signal、Email、Webhook）、"Plan-Execute-Verify"高风险管理模式和本地技能创作/评审/打包系统。提供 Web UI（默认 127.0.0.1:18789）访问，支持 Anthropic Claude、OpenAI GPT、Google Gemini、Grok/xAI、DeepSeek 等 10 个提供商及 GGUF 嵌入式本地模型。

其爆炸式增长伴随着严重争议：在中国市场尤为火爆（腾讯/阿里/百度提供一键部署，深圳市政府补贴 AI 项目），但也暴露出 CVE-2026-25253（单次点击 RCE）、"ClawJacked"WebSocket 劫持、4 万个实例暴露公网、Anthropic 商标争议（两次被迫更名）和 Google 因规避计费而大规模封号等安全事件。下载量在高峰期后下降约 50%。官方强烈建议固定补丁版本、启用沙箱、绑定环回地址且不公开暴露网关。

### 1.9 OptiLLM

OptiLLM（GitHub: algorithmicsuperintelligence/optillm）是一个专注于推理时优化的开源 AI 代理网关，使用 Python 编写（99.8%），Apache 2.0 协议，拥有约 4,100 个 Stars。创始人为 Asankhaya Sharma。

OptiLLM 的独特定位是：不做传统网关的路由/限流，而是在推理阶段通过 20+ 种技术（MARS 多代理推理、CePO、MCTS、PlanSearch、Best-of-N、Mixture-of-Agents 等）提升 LLM 输出质量。基准测试显示：MARS + Gemini 2.5 Flash Lite 在 AIME 2025 上从 43.3 分提升到 73.3 分（+30 分），Mixture-of-Agents 模式下 GPT-4o-mini 可以达到 GPT-4 级别的表现。支持 OpenAI、Anthropic、Google、Cerebras、Azure 等提供商，通过 LiteLLM 间接支持 100+ 模型。通过 `pip install optillm` 安装，以 OpenAI 兼容 Drop-in 代理方式运行。

### 1.11 新兴独立 AI 网关项目

除上述核心项目外，2025-2026 年间涌现了多个值得关注的新兴独立 AI 网关。

Ferro Labs AI Gateway（GitHub: ferro-labs/ai-gateway）使用 Go 语言编写，Apache 2.0 协议，虽然仅有约 130 个 Stars，但其性能数据值得关注——实测 13,925 RPS（1,000 并发用户），P50 开销仅 0.002 毫秒（2 微秒），内存占用约 32MB。支持 30+ 提供商、8 种路由策略、MCP、OpenTelemetry 和内置 Dashboard。该团队也是 AI 网关独立基准测试的执行方。

Hadrian Gateway（GitHub: ScriptSmith/hadrian）使用 Rust 编写，单二进制部署，OpenAI 兼容。内置 RAG、Guardrails、语义缓存、成本预测和 SSO/RBAC，目前处于 Alpha 阶段。

Styx（GitHub: timmx7/styx）自称为"首个 MCP-Native AI Gateway"，提供自动路由（styx:auto）、语义缓存和 Stripe 计费。

Agentify Gateway（GitHub: agentify-sh/gateway）是 TensorZero 上游归档后的社区活跃分支，继续保持 Apache 2.0 许可证，延续 LLM 网关 + 可观测性 + 评估 + 实验的整合定位。

### 1.10 aisuite

aisuite（GitHub: andrewyng/aisuite）由 Andrew Ng 团队开发，是一个轻量级 Python 客户端库（14,200 个 Stars，MIT 协议），定位为 Library-style 网关。提供统一的多模型调用接口（OpenAI 风格），通过 `provider:model-name` 格式切换 OpenAI、Anthropic、Google、Mistral、Hugging Face、AWS、Cohere、Ollama、OpenRouter 等 11+ 提供商。支持 Agent API 工具调用（纯 Python 函数自动生成 Schema）、预建沙箱工具集（文件、Git、Shell）和 MCP Server 工具接入。不同于本报告中其他项目的"网关/代理"定位，aisuite 是一个客户端 SDK，适合个人开发者快速实验多模型，不适合生产级流量治理。

## 二、传统 API 网关 AI 插件/扩展

### 2.1 Kong AI Gateway

Kong 官方的 AI 网关插件集基于 Kong Gateway（43,600+ Stars）生态构建，以 Lua/OpenResty（Nginx）实现。在并发性能方面最强——基准测试中单一节点达到 15,891 RPS（1,000 并发用户），且内存消耗恒定 43MB 不受并发数增加影响。AI 功能以插件形式提供：多模型路由、Prompt 模板、Token 计数、Prompt Guard 等。但 AI 相关的 MCP/A2A 高级特性需要企业版授权。Kong 的单次请求开销在 1.4ms-5ms 范围，高于 Bifrost 的 11 微秒。最适合已有 Kong 基础设施的团队。

### 2.2 Apache APISIX AI Gateway

Apache APISIX 的 AI 插件集包括 ai-proxy、ai-proxy-multi、ai-prompt-guard 等，核心优势在于与成熟 API 网关的统一管理和插件热加载能力。基于 OpenResty（Nginx + Lua）架构，支持动态配置和插件编排。

### 2.3 kgateway

kgateway 是 Solo.io 将 Gloo Gateway 捐赠 CNCF（2025 年 3 月进入 Sandbox）的产物。v2.0 版本集成 AI Gateway 功能，采用创新的双数据平面架构：Envoy 处理传统 API 流量，agentgateway 处理 AI 代理流量。通过统一的控制平面管理，代表了"统一 API+AI 网关"的架构方向。支持 Kubernetes Gateway API Inference Extensions。

### 2.4 Higress

Higress（GitHub: alibaba/higress）由阿里云开源，基于 Envoy + Istio + Wasm 插件架构，Go 语言编写，Apache 2.0 协议，拥有约 8,000 个 Stars（截至 2026 年 3 月）。Higress 是国内 AI 网关领域的代表性项目，率先提供了大模型代理、安全防护、语义缓存和 Prompt 工程能力，通过 Wasm 插件支持 Go/Rust/JS 编写自定义扩展。

2025-2026 年间，Higress 围绕 MCP 协议进行了深度布局，实现了三种 MCP Server 托管模式：Wasm 插件内置 MCP Server（对接 SaaS API 生态）、MCP 直接路由（代理已有 MCP 服务）和 Nacos 服务注册发现（传统 API 零代码转换为 MCP 协议）。支持 OpenAPI → MCP 自动转换、数据库 → MCP 自动转换（MySQL/PostgreSQL/ClickHouse/SQLite）。携程（Trip.com）基于 Higress 构建了企业级 AI 网关，统一管理大模型和 MCP 服务访问，并在 2025 中国可信云大会上分享实践。

### 2.5 WSO2 AI Gateway

WSO2 API Manager 4.6+ 版本集成，Apache 2.0 协议，全开源。支持语义缓存（基于向量嵌入，后端可选 Zilliz/Milvus）、多模型路由、Token 计费和 Prompt 护栏功能。作为全开源方案在企业市场有一定吸引力。

### 2.6 Gravitee Agent Mesh

Gravitee 的 AI 治理套件从 4.8 版本开始引入（Agent Mesh），后续版本（4.10+）逐步完善为 LLM Proxy + MCP Proxy + A2A Proxy 三大 AI 原生 API 类型。4.10 版本新增 AI IAM（基于 OpenFGA 的细粒度零信任授权引擎，策略可自动适配已注册的工具、代理和模型）、原生 MCP Proxy 和工具级 ACL。定位为统一 API+AI+Agent 治理平台，其核心优势在于将 API 管理已有的信任延伸到 Agent 世界——使用相同的网关、策略和目录来治理 LLM、MCP 和 A2A 流量。Gravitee 已被 Gartner 评为 API 管理魔力象限领导者。

## 三、国产/中文社区项目

### 3.1 new-api

new-api（GitHub: QuantumNous/new-api）是基于 One API 二次开发的 AI 模型接口管理与分发系统，使用 Go 语言编写，AGPLv3 协议。截至 2026 年 5 月拥有约 34,900 个 Stars 和 7,800 个 Fork，已取代 One API 成为中文生态中最主流的选择。

核心特色包括：支持 OpenAI ↔ Claude ↔ Gemini 多协议格式双向转换、Midjourney Proxy 和 Suno 音乐生成、易支付/Stripe 在线支付集成、组织级成本核算、数据看板。产品定位为"新一代大模型网关 + AI 资产管理系统"，面向个人和企业内部管理分发使用。从 2025 年 5 月（7.5k Stars）到 2026 年 5 月（34.9k Stars），实现了一年超过 4.6 倍的爆发式增长。

### 3.2 One API

One API（GitHub: songquanpeng/one-api）是国产开源 OpenAI 接口管理与分发系统的先驱，使用 Go 语言编写。曾是中文社区最流行的 AI API 管理方案，支持多模型 Key 池化管理、用户管理和额度分配。但目前已基本被 new-api 在功能和社区活跃度上超越。两者均沿用其基础架构设计。

### 3.3 GPT-Load

GPT-Load（GitHub: tbphp/gpt-load）是一个轻量级的 Go+Vue 企业级 API Key 池代理系统，拥有约 6,200 个 Stars，MIT 协议。专注于智能 Key 轮转（自动故障检测、黑名单与恢复、加权轮询）、双认证体系（管理后台 + 代理服务分离认证）、集群部署（Leader-Follower 架构 + Redis PubSub）和零拷贝流式转发。典型使用场景是由 new-api 处理前端模型聚合与计费，GPT-Load 在后端管理数万个 API Key 的池化与轮转。

### 3.4 其他值得关注的国产项目

one-hub（GitHub: MartialBE/one-hub）是 One API 的另一活跃分支，拥有约 2,800 个 Stars，Apache 2.0 协议。相比源头新增了 Telegram Bot、Prometheus 监控、Webauthn 登录和自定义模型定价等功能。

simple-one-api（GitHub: fruitbars/simple-one-api）约 2,300 个 Stars，专为国产模型（百度千帆、讯飞星火、腾讯混元、MiniMax、DeepSeek）设计的最小化单二进制文件适配器，无前端界面。

uni-api（GitHub: yym68686/uni-api）约 1,200 个 Stars，Python 编写的纯配置驱动 API 管理器，支持 20+ 提供商和 4 种负载均衡策略，是调研项目中发布最频繁的项目（截至 2026 年 6 月 14 日已发布 116 个版本）。

APIPark（GitHub: APIParkLab/APIPark）约 1,800 个 Stars，Apache 2.0 协议，获得红杉资本支持。定位为云原生 AI 和 API 网关，接入 100+ AI 模型，宣称性能超过 Nginx。

## 四、MCP 专用网关

### 4.1 Docker MCP Gateway

Docker MCP Gateway（GitHub: docker/mcp-gateway）由 Docker 官方开源，Go 语言编写。定位为生产级 MCP 网关，核心特色是容器原生——MCP Server 在隔离的 Docker 容器中运行。提供密钥管理（通过 Docker Desktop 安全存储，避免环境变量泄露）、OAuth 认证（2026 年 5 月 GA）、OpenTelemetry 可观测性、安全检查（验证镜像签名、阻断负载中的密钥泄露、记录所有调用）和社区注册发现。配合 Docker MCP Catalog（100 万+ pulls），已成为容器原生 MCP 网关的事实标准。安装方式为 Docker CLI 插件（`docker mcp`），Docker Desktop 4.59+ 预装。

### 4.2 IBM MCP Context Forge

IBM MCP Context Forge（GitHub: IBM/mcp-context-forge，Apache 2.0）是一个生产级 MCP 网关、注册和代理，使用 Python（FastAPI）编写，拥有约 3,790 个 Stars。它聚合多个 MCP Server、自动发现对等节点（通过 mDNS 或显式配置）、健康检查并合并能力。同时支持 REST/gRPC API 适配为 MCP 兼容工具（JSON-Schema 输入验证、重试和速率限制），以及 A2A 协议的 OpenAI、Anthropic 和自定义代理集成。内置 40+ 插件系统、OAuth 2.0 + PKCE、OpenTelemetry（Phoenix/Jaeger/Zipkin）、HTMX + Alpine.js 管理 UI，支持气隙（Air-gapped）部署。2026 年的 MCP 网关横向分析将其评为采取"最广泛方法"的方案——在一个端点后联邦 MCP、A2A、REST 和 gRPC。

### 4.3 Lunar MCPX

Lunar MCPX（Lunar.dev）是一个 MIT 协议开源的 MCP 网关与聚合器，支持零代码 JSON 配置接入多个 MCP Server，提供全局级/服务级/工具级三层访问控制和 Prometheus 指标及 OAuth 认证。定位为轻量级 MCP 聚合网关。

### 4.4 Microsoft MCP Gateway

Microsoft MCP Gateway（GitHub: microsoft/mcp-gateway）使用 C# 编写（73.5%），MIT 协议，拥有约 688 个 Stars。提供双平面架构（数据平面 + 控制平面），专为 Kubernetes 原生部署设计。特色功能包括：会话感知路由（将相同 session_id 的请求一致路由到同一后端）、Azure Entra ID 认证 + RBAC 角色、React SPA 管理门户（内置 JSON-RPC 测试控制台）、LLM 驱动的预览代理和会话功能，以及一键 Azure 部署（ARM 模板）。

### 4.5 AIRIS MCP Gateway

AIRIS MCP Gateway（GitHub: agiletec-inc/airis-mcp-gateway）使用 Python 编写，MIT 协议，拥有约 161 个 Stars 但极活跃（87 个发布版本）。特色包括：按需服务器生命周期（空闲自动终止）、HOT/COLD/Disabled 三级服务器管理、渐进式工具披露（可将上下文 Token 使用量减少 97%）、支持 Claude Code/Codex/Gemini CLI/Cursor/Windsurf 等多客户端，以及内置 20+ 通用 MCP Server（context7、fetch、tavily、supabase、stripe、twilio、github）。

### 4.6 Gate22

Gate22 是一个 MCP 网关治理控制平面，使用 TypeScript 编写，Apache 2.0 协议。专注于团队级 AI Agent 工具治理，提供函数级允许列表（allow-list）权限、凭证管理、Bundle 组合和审计日志。专为多开发人员协作的 AI Agent 工具安全治理场景设计。

## 五、AI 网关与传统 7 层网关的异同

AI 网关与传统 7 层网关之间的差异不是在"替代"层面上展开的，而是在流量特性、计费模型、协议感知和治理粒度维度上的根本性演进。以下逐一分析十一个核心对比维度。

### 5.1 架构层级定位

传统 7 层网关位于 OSI 应用层（L7），作为 HTTP/HTTPS 流量的统一入口和代理。AI 网关可理解为"L7.5"或"L8"层——它仍然基于 HTTP 协议，但深度解析 HTTP Body 中的 LLM 协议语义（模型名、对话轮次、Token 用量等），实际上在应用层之上构建了更细粒度的 AI 应用感知。传统网关是"流量看门人"，AI 网关是"智能控制平面"。

### 5.2 协议感知能力

传统网关：基于 HTTP 方法（GET/POST/PUT/DELETE）、URL 路径、Headers 进行转发决策，请求 Body 是不透明负载。AI 网关：深度解析 JSON Body 以提取模型名、Token 数量、Prompt 内容和对话上下文。原生支持 SSE（Server-Sent Events）流式响应处理、WebSocket 双向通信、MCP 协议（JSON-RPC 会话感知）和 A2A 协议（长时间运行任务委托）。这一差异直接影响网关架构——传统 Envoy 的过滤器链是为无状态单向流设计的，处理有状态双向 MCP 需要大量 workaround。

### 5.3 状态模型

传统 7 层网关是无状态的请求/响应代理——每个 HTTP 请求独立处理。AI 网关则是有状态的：需要维护会话上下文（多轮对话历史）、跟踪上下文窗口使用量、管理 Token 预算的累计消耗。MCP 和 A2A 协议进一步加深了这一差异——MCP 是会话级有状态协议，服务器可以主动向客户端发起异步消息，传统网关无法原生支持。

### 5.4 计费模型

这是最核心的差异维度之一。传统网关按请求数计费（或按带宽、按连接数），一个简单的 GET 请求和一个复杂的 POST 请求计数相同。AI 网关按 Token 计费——解析请求 Body 中的输入 Token 和响应 Body 中的输出 Token，根据不同模型的实时定价表计算金额。企业在 AI 网关中设置的是"每个团队每月预算不超过 $500"，而非"每秒请求不超过 100"。这种计费模型的差异导致 AI 网关需要在请求路径中嵌入 Tokenizer（如将 tiktoken 编译为 Wasm）以在转发前精确计算 Token 数。

### 5.5 路由粒度

传统网关的路由基于 URL 路径、主机名、Header 值进行转发（如 `/api/v1/users` → 用户服务）。AI 网关的路由维度更加丰富：基于模型名路由（`gpt-4o` → OpenAI 端点）、基于 Prompt 意图路由（代码生成 → Claude，翻译 → 多语言模型）、基于成本优化路由（简单查询 → 便宜的小模型，复杂推理 → 昂贵的大模型）、基于延迟优先路由、基于提供商可用性自动故障转移（OpenAI 返回 429/5xx → 透明重试 Anthropic）。Agent 网关还引入了"工具路由"——同一个 MCP 工具调用可路由到不同的后端实现。

### 5.6 缓存策略

传统网关使用 HTTP 协议级缓存：基于 URL + Header 的精确匹配缓存（ETag、Cache-Control），通过 CDN 边缘节点分发。AI 网关使用语义缓存：基于向量嵌入的语义相似匹配——当用户新问题与缓存中某问题的余弦相似度超过 0.95 时，直接返回缓存的 LLM 回复，无需调用模型。对于 FAQ/客服等场景语义缓存命中率可达较高水平，显著节约成本和延迟。部分 AI 网关（Bifrost、Portkey）实现了双层缓存：精确匹配 + 语义匹配。

### 5.7 安全模型

传统网关的安全模型聚焦于：WAF（Web 应用防火墙）、DDoS 防护、IP/请求级速率限制、CORS 策略、API Key/JWT 验证、mTLS。AI 网关的安全模型则扩展到：Prompt 注入检测（识别试图劫持模型行为的恶意提示词）、PII/PHI 数据脱敏（在数据离开内网之前自动检测并脱敏敏感信息）、内容审核（检测有害/违规输出）、数据防泄露（防止模型输出中包含训练数据或系统提示词）、Token 级别滥用检测（小请求大消耗的隐蔽攻击）、模型级访问控制（限制特定用户/团队只能使用特定模型）。

### 5.8 内容转换

传统网关的转换能力局限在 HTTP 层：Header 修改、请求/响应 Body 改写、URL 重写。AI 网关进行语义级内容转换：模型格式互转（OpenAI API ↔ Claude API ↔ Gemini API 透明切换）、Prompt 模板注入（自动添加系统提示词、安全护栏）、降级 Fallback（主模型不可用时自动切换到备用模型或更便宜的替代品）、多模态转换支持（文本 ↔ 图像 ↔ 音频端点统一）。

### 5.9 限流单位

这是区分 AI 网关和传统网关最直观的维度。传统网关：请求数/秒（RPS）、并发连接数。AI 网关：Token/分钟（TPM），同时支持金额预算/月（如每个项目每月 API 预算 $1,000）。小请求（如 2 Token 的"hello"）和大请求（如消耗 $2 的 RAG 查询）在传统限流下计数相同，这是 AI 场景下不可接受的——攻击者可以用少量请求产生巨额费用。AI 网关必须在请求路径中解析 Token 数来实施真正的资源限流。

### 5.10 流量特征

传统 API 流量特征：同步短连接（毫秒级延迟）、结构化 JSON/XML 负载、KB 级载荷、流式传输罕见。AI 流量特征：流式长连接（秒到分钟级延迟）、自然语言 Prompt + 生成文本、MB 级载荷（文档、图像、上下文）、SSE 流式传输是常态、推理速度差异大（Groq/Cerebras 在数百毫秒级返回而传统提供商在数十秒级）。这些差异深刻影响网关架构设计——传统网关的线程模型（Nginx Worker 进程）和连接池策略需要重新考虑以处理大量长连接流。

### 5.11 生态定位整合

AI 网关的生态已形成六种定位模式：

独立 AI 网关：LiteLLM、Bifrost、Portkey、Helicone、TensorZero、OptiLLM、aisuite——专注 AI 流量代理，需与传统 API 网关配合使用。适合 AI 实验阶段或 AI 使用规模尚小的团队。

API 网关 AI 插件：Kong AI Gateway、Apache APISIX AI、Higress——在现有 API 网关上增加 AI 能力，降低引入新系统成本。适合已有对应网关基础设施的团队。风险在于插件的架构可能无法充分支持有状态 MCP/A2A 协议。

统一 API+AI 网关：kgateway、Gravitee Agent Mesh——一套系统同时覆盖传统 API 和 AI 流量，避免策略和可观测性在双系统间分裂。是 2026 年行业趋势所向。

MCP 专用网关：Docker MCP Gateway、IBM Context Forge、Lunar MCPX、Gate22——专为 MCP 协议的注册、发现、路由和治理而设计。适合以 Agent 为核心构建的 AI 应用。

Agent 治理平台：agentgateway、Arch Gateway——从数据平面层面为 Agent 通信优化，原生支持 A2A 协议和代理级授权。代表最高级别的 AI 网关抽象。

国产 API 分发系统：new-api、One API、GPT-Load——有中国生态特色（支付集成、国产模型支持、中文社区），满足国内用户对多模型 Key 管理和额度分配的核心需求。

## 六、趋势与展望

Rust 数据平面正在成为 AI 网关的下一个标准。agentgateway（Solo.io）、TensorZero、Arch Gateway 均选择了 Rust，理由是内存安全、无 GC 暂停（可预测延迟）、原生 JSON 解析和更好的流式长连接处理。Solo.io 的基准数据（300 倍内存优化、35 倍吞吐）和 TensorZero 的基准（10,000 QPS vs LiteLLM 1,000 RPS）支持了这一趋势。

MCP 协议已成为 2025-2026 年 AI 网关竞争的核心战场。Traditional 网关（Higress）、AI 先锋（LiteLLM、Bifrost、Portkey）、MCP 专用网关（Docker MCP Gateway、IBM Context Forge）和数据平面项目（agentgateway）纷纷加入 MCP 支持。MCP 正在从"实验性协议"快速演变为"AI 基础设施标准协议"。

传统 API 网关和 AI 网关正在走向融合，而非分化。Solo.io 的 kgateway 双数据平面架构（Envoy + agentgateway）和 Gravitee 的统一 API+AI+Agent 治理平台代表了这一趋势——不是用一个替换另一个，而是将两者整合进同一个运维体验中。

中国 AI 网关生态呈现出独特发展路径。new-api（38.7k Stars）和 Higress（8k Stars）分别从模型分发和云原生网关两个方向切入，标志着本土自主 AI 基础设施的快速成熟。

## 结论

截至 2026 年年中，AI 网关的开源生态已经从单点工具发展为多层次、多阵营的成熟基础设施品类。选择 AI 网关时，根本性的决策点在于是采用独立的 AI 专用网关（LiteLLM/Bifrost/Portkey，适合快速起步和 AI 专用场景）、利用已有 API 网关的 AI 插件（Kong/APISIX/Higress，适合已有网关投入的团队），还是直接采用统一网关架构（kgateway/Gravitee，适合新构建 AI 原生基础设施的团队）。AI 网关与传统 7 层网关的本质区别昭示着 AI 流量需要专属的治理基础设施——不是简单的"配置差异"，而是从计费单位到安全模型、从协议感知到流量特性的根本性转变。

2026 年见证了 AI 网关行业的三件里程碑事件：Palo Alto Networks 以约 1.2-1.4 亿美元收购 Portkey，标志着 AI 网关正式成为企业网络安全基础设施；TensorZero 上游归档和社区分支（Agentify Gateway）的诞生，说明开源 AI 基础设施的商业可持续性仍是挑战；LiteLLM 供应链攻击事件引发了全行业对 AI 网关安全性（特别是 Python 生态）的深刻反思。展望 2026-2027 年，MCP 和 A2A 协议将持续推动 AI 网关向 Agent 治理平台演进，Rust 数据平面将加速取代 Python/TypeScript 在性能敏感场景的地位，传统网关与 AI 网关的融合将催生出新一代统一治理平台，而 Kubernetes Gateway API Inference Extensions 作为一种标准化尝试，将推动 AI 路由成为基础设施层的基本功能而非应用层专有特性。

## 参考文献

1. [LiteLLM GitHub Repository](https://github.com/BerriAI/litellm)
2. [Bifrost Official Site](https://www.bifrost.llm)
3. [Portkey AI Gateway GitHub](https://github.com/Portkey-AI/gateway)
4. [Helicone GitHub Repository](https://github.com/Helicone/helicone)
5. [TensorZero GitHub Repository](https://github.com/tensorzero/tensorzero)
6. [Arch Gateway GitHub Repository](https://github.com/katanemo/archgw)
7. [agentgateway by Solo.io](https://github.com/agentgateway/agentgateway)
8. [OpenClaw GitHub Repository](https://github.com/openclaw/openclaw)
9. [OptiLLM GitHub Repository](https://github.com/algorithmicsuperintelligence/optillm)
10. [aisuite by Andrew Ng](https://github.com/andrewyng/aisuite)
11. [Kong AI Gateway](https://konghq.com/products/kong-ai-gateway)
12. [Apache APISIX AI Gateway Plugin](https://apisix.apache.org/docs/apisix/plugins/ai-proxy/)
13. [kgateway CNCF Project](https://kgateway.dev)
14. [Higress GitHub Repository](https://github.com/alibaba/higress)
15. [WSO2 AI Gateway](https://wso2.com/api-manager/ai-gateway/)
16. [Gravitee Agent Mesh](https://www.gravitee.io/platform/agent-mesh)
17. [new-api GitHub Repository](https://github.com/QuantumNous/new-api)
18. [One API GitHub Repository](https://github.com/songquanpeng/one-api)
19. [GPT-Load GitHub Repository](https://github.com/nicepkg/gpt-load)
20. [Docker MCP Gateway GitHub](https://github.com/docker/mcp-gateway)
21. [IBM MCP Context Forge GitHub](https://github.com/IBM/mcp-context-forge)
22. [Lunar MCPX GitHub Repository](https://github.com/lunar-dev/mcpx)
23. [Gate22 GitHub Repository](https://github.com/gate22ai/gate22)
24. [Awesome AI Gateway List](https://github.com/cuihuan/awesome-ai-gateway)
25. [Solo.io Blog - Why Traditional Gateways Failed AI Workloads](https://www.solo.io/blog/why-traditional-gateways-failed-ai-workloads-and-how-kgateways-rust-powered-agentgateway-fixes-it)
26. [API7.ai - What Is an AI Gateway (2026 Guide)](https://api7.ai/id/learning-center/api-gateway-guide/what-is-an-ai-gateway)
27. [Linux Foundation - Welcomes Agentgateway Project](https://www.linuxfoundation.org/press/linux-foundation-welcomes-agentgateway-project)
28. [DevOps.com - The Day 2 AI Problem: Why Standard API Gateways Fail](https://devops.com/the-day-2-ai-problem-why-standard-api-gateways-fail-at-genai-scale/)
29. [AI Gateways Are Not I/O-Bound Proxies - Benchmark](https://dev.to/ferrolabs-ai/ai-gateways-are-not-io-bound-proxies-i-benchmarked-5-of-them-to-prove-it-4iji)
30. [大模型网关选型与落地：从开源方案到生产实践的关键决策 (WeChat)](https://mp.weixin.qq.com)
31. [模型 API 聚合平台深度盘点：2026 年主流选型指南](https://segmentfault.com/a/1190000047675459)
32. [Palo Alto Networks Completes Acquisition of Portkey](https://paloaltonetworks.gcs-web.com/news-releases/news-release-details/palo-alto-networks-completes-acquisition-portkey-secure-ai)
33. [LiteLLM Supply Chain Attack Analysis](https://www.alibabacloud.com/blog/603001)
34. [Ferro Labs AI Gateway GitHub](https://github.com/ferro-labs/ai-gateway)
35. [Agentify Gateway (TensorZero Fork)](https://github.com/agentify-sh/gateway)
36. [Microsoft MCP Gateway GitHub](https://github.com/microsoft/mcp-gateway)
37. [AIRIS MCP Gateway GitHub](https://github.com/agiletec-inc/airis-mcp-gateway)
38. [one-hub GitHub (One API Fork)](https://github.com/MartialBE/one-hub)
39. [uni-api GitHub](https://github.com/yym68686/uni-api)
40. [APIPark GitHub](https://github.com/APIParkLab/APIPark)
41. [Envoy AI Gateway System Architecture](https://aigateway.envoyproxy.io/docs/concepts/architecture/system-architecture/)
42. [kgateway Deep Dive into Gateway API Inference Extension](https://kgateway.dev/blog/deep-dive-inference-extensions/)
43. [Higress CNCF Blog: Enterprise-Grade AI Gateway](https://www.cncf.io/blog/2026/03/25/higress-joins-cncf-delivering-an-enterprise-grade-ai-gateway/)
44. [Awesome MCP Gateways List](https://github.com/e2b-dev/awesome-mcp-gateways)
45. [API7.ai - AI Gateway vs MCP Gateway vs API Gateway](https://www.apiseven.com/learning-center/api-gateway-guide/ai-gateway-vs-mcp-gateway-vs-api-gateway)
