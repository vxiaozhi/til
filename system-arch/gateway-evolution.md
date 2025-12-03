<img width="152" height="77" alt="image" src="https://github.com/user-attachments/assets/58a6de14-79bb-4598-8795-a9b66b3210ec" />## 网关演进

参考： [应用网关的演进历程和分类](https://higress.cn/blog/higress-gvr7dx_awbbpb_ss3ok5o9er9it0nb/)

- 流量网关
- ESB（企业服务总线，Enterprise Service Bus）网关
- 微服务网关
- 云原生网关
-  API 网关
-  AI 网关


## AI 网关

- [agentgateway](https://github.com/agentgateway/agentgateway) Next Generation Agentic Proxy for AI Agents and MCP servers

## 2025KCD(Kubernetes Community Days)

- [2025KCD(Kubernetes Community Days) 的 slides和回放](https://sessionize.com/view/cnfxrf60/GridSmart?format=Embed_Styled_Html&isDark=False&title=KCD%20Hangzhou%20%2B%20OpenInfra%20Days%20China%202025)

以下是 PPT 摘录：

### 从云原生到 AI 原生: 蚂蚁集团 余锋（褚霸）
- 模型在成为新的数据库
- 从应用为中心到模型为中心
- Agent Sandbox 与 Agent Tools: 一切都是Agent

### 从 Pods 到 Prompts：Kubernetes 网络演进与 AI 新时代 ： 张晋涛 Kong Inc.

随着 AI 工作负载在云原生环境中快速兴起，传统的 Kubernetes 网络与 Service Mesh 已不足以满足复杂的语义级流量需求。本议题将从 Kubernetes 网络的演进出发，结合 Service Mesh 的实践，探讨 AI 应用场景下的流量挑战，并展示 semantic-router 与 AI Gateway 如何帮助企业构建新一代智能流量治理体系

- 从 API 到 AI 新的挑战

### Dify 可观测：大模型应用开发和全链路可观测实践

从大语言模型到生产级 Agent 应用，工具调用和中间过程的可观测性是生产落地的关键。本次分享结合开源 LLM 应用开发平台 Dify 和阿里云云监控，带来从大模型应用开发到全链路可观测的最佳实践。涵盖 Workflow 构建、执行过程追踪及请求上下游中工具、知识库、模型调度的全链路追踪。

### 《超越网关：基于 Gateway API Inference Extension 的推理流量控制实践》

随着大模型服务的规模化部署，传统网关在推理请求调度中面临诸多更具业务属性的挑战：无法感知 KVCache 状态、难以动态响应 GPU 资源负载、缺乏对推理语义的理解能力。为此，我们基于 Gateway API Inference extension，设计并实现了一套与网关解耦的请求调度扩展架构。该方案通过轻量集成 Endpoint Picker(EPP)，在旁路系统中实现负载感知路由、KVCache 亲和调度等核心能力，显著提升了推理吞吐与资源利用率。本次分享将介绍该架构的设计理念、关键实现路径与生产实践效果，并探讨如何让现有网关以低侵入方式快速具备面向大模型的智能调度能力。


### 基于 Agentic AI 的 Kubernetes 运维：利用 Kubectl-AI 提升效率
Kubernetes 生态中涌现出不少卓越的 AI 工具，kubectl-AI 是其中的典型代表, kubectl-AI 则是由 Google Cloud Platform 孵化的一款智能接口工具，它能将用户的自然语言意图转化为精确的 Kubernetes 操作命令，显著降低了集群管理的门槛，并提升了运维效率

本演讲的的包括：
- 核心功能：你可以通过 kubectl-AI 进行集群错误分析和获取情境化的洞察信息。它支持多种 AI 模型后端（如 OpenAI 的 GPT 系列、Google 的 Gemini 系列、Azure OpenAI，甚至本地模型如通过 Ollama 运行的模型），能将你的自然语言指令转换为 kubectl 命令并执行，同时还能对结果进行解释
- Demo：这些工具能极大地简化 Kubernetes 的故障排查过程。例如，对于 Pod 处于 Pending 或 CrashLoopBackOff 状态这类常见问题，它们可以快速诊断并提供修复建议。kubectl-AI 还能处理诸如“检查某个命名空间的日志”或“扩展某个 Deployment 的副本数”这样的自然语言请求。
- Deep Dive：kubectl-AI 的技术架构体现了模块化设计，通常包含输入解析层（负责自然语言处理、上下文管理和意图识别）、模型适配层（处理多模型路由和提示工程）以及 Kubernetes 集成层（负责命令验证、执行和结果解释）。

### 通过编译时插桩实现Go AI应用可观测
在2024年6月26日，我们正式推出新一代Go应用监控系统，依托编译时插桩技术构建的零侵入式观测体系，为Go语言生态带来了革命性的监控范式，同时贡献到了OpenTelemetry社区（https://github.com/open-telemetry/opentelemetry-go-compile-instrumentation）该方案通过编译期插桩技术，在完全不改变应用代码的前提下，实现了对应用全生命周期的深度观测。开源版本（https://github.com/alibaba/loongsuite-go-agent）在GitHub社区获得广泛认可，尤其在生产级微服务架构中展现出卓越性能，印证了编译时插桩技术在Go应用观测领域的技术优势，如今AI应用越来越多，如果为Go语言的AI应用提供全链路的可观测能力至关重要，本次将介绍如何使用编译时插桩技术为Go AI应用进行监控。

### AI 训练与推理场景下的镜像分发实践
镜像是AI容器基础设施中的一个重要部分，开源容器镜像加速项目 Nydus 能够使得容器做到秒级冷启动，在镜像构建，分发与运行时，以及性能与安全性上有诸多探索。目前 Nydus 服务了每日百万级的容器创建，也在 AI 训练与推理场景下有着诸多落地场景。AI训推场景中的超大镜像，分发速度慢等问题也给整个镜像链路带来了很多新的挑战和要求。我们将分享Nydus项目在AI镜像链路中关于镜像扫描，构建，和分发中的一些实践和思考。
