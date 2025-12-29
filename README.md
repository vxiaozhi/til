# til
📝 Today I Learned

建立本仓库动机参考了： [jbranchaud/til](https://github.com/jbranchaud/til)

## 目录

## 编程语言与框架

- [各个编程语言性能对比，代码开源](https://github.com/niklas-heer/speed-comparison) 基于莱布尼茨公式计算π值来作为 benchmark
- [Golang](programming-language/golang.md)
- [Python](programming-language/python.md)
- [Elixir](programming-language/elixir.md)
- [js/ts](programming-language/javascript.md)
- [css](programming-language/html-css.md)


## 软件开发实践

- [代码评审(Code Review)](development-practices/code-review.md)
- [设计模式](development-practices/design-patterns.md)

## 协议与规范
- [Json-RPC2.0](protocols-and-specifications/json-rpc2.md)
- [http todo]()
- [prorobuf todo]()
- [flatbuffer todo]()
- [Cap'n 协议](https://github.com/capnproto/capnproto) 号称比Protocol Buffers快无限倍， 典型应用[workerd, Cloudflare's JavaScript/Wasm Runtime](https://github.com/cloudflare/workerd)


## 系统架构

- [网关演进](system-arch/gateway-evolution.md)
- [Cloudflare Workers](system-arch/introduction-to-cloudflare-workers.md)
- [Milvus](https://github.com/milvus-io/milvus) 高性能、云原生向量 DB。支持内存映射（Mmap）实现对磁盘上大型文件的直接内存访问。


## 游戏引擎

- [godot](https://github.com/godotengine/godot) Multi-platform 2D and 3D game engine
  
## 人工智能与智能体（ AI & Agent）

- [AI Agent 是什么](agent/introduction-to-ai-agent.md)
- [Agent 架构与生态](agent/agent-architecture-and-ecosystem.md)
- [Agent Prompt的设计](agent/agent-prompt.md) 系统提示词的方法论和优秀案例
- [Agent 记忆系统](agent/agent-memory.md)
- [Agent 工具与函数调用](agent/agent-function-calling.md)
- [交互协议: MCP (Model Context Protocol), A2A (Agent-to-Agent) 协议](agent/agent-protocol.md)
- [AI 驱动的开发范式](agent/ai-driven-development-paradigm.md)
- [Agent 范式](agent/agent-paradigm.md)
- [Agent 上下文](agent/agent-context.md)

## LLM & Agent (论文、博客、论坛)

- [lmsys.org](https://lmsys.org/) LMSYS Org致力于开发大型模型的开源模型、数据集、系统及评估工具。
- [Huggingface Daily Paper](https://huggingface.co/papers/date/2025-12-16)
- [anthropic 工程博客](https://www.anthropic.com/engineering)
- [hao-ai-lab.github.io/blogs/](https://hao-ai-lab.github.io/blogs/) 加州大学圣地亚哥分校郝AI实验室网站

## LLM 推理优化

- [NVIDIA Dynamo](https://github.com/ai-dynamo/dynamo)  是一个开源、低延迟的模块化推理框架，用于在分布式环境中服务生成式 AI 模型。它通过智能资源调度和请求路由、优化的内存管理和无缝的数据传输，实现跨大型 GPU 集群的推理工作负载无缝扩展。
- [vLLM/SGLang]()
- [打破算力瓶颈：LLM推理中Prefill/Decode分离架构深度解析](https://cloud.tencent.com/developer/article/2566044)

## AIAgent 应用领域

- [Coding Agent](agent/coding-agent.md)
- [PPT Agent](agent/ppt-agent.md)
- [手机 Agent](agent/phone-agent.md)
- [AI 面试](https://github.com/FoloUp/FoloUp)

## AIAgent 构建平台

- [dify]()
- [coze-studio](https://github.com/coze-dev/coze-studio)
- [n8n](https://github.com/n8n-io/n8n)

## AIAgent可观测

- [langfuse](https://github.com/langfuse/langfuse)
- [langsmith](https://github.com/langchain-ai/langsmith-sdk)
- [higress AI可观测](https://higress.cn/docs/latest/plugins/ai/api-o11y/ai-statistics/)
- [coze-loop](https://github.com/coze-dev/coze-loop)

## AI视频生成

- [MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo) 利用AI大模型，一键生成高清短视频

## DevOps

- [k8s-helm-chart](devops/k8s-helm-chart.md)


## 实用工具与资源

- [开源项目集合](tools-and-resources/open-source-project-collection.md)
- [开源模型](tools-and-resources/open-source-models.md)
- [开发者服务](tools-and-resources/developer-services.md)
- [PPT制作](tools-and-resources/ppt-creation.md)
- [PDFMathTranslate](https://github.com/PDFMathTranslate/PDFMathTranslate) 基于 AI 完整保留排版的 PDF 文档全文双语翻译，支持 Google/DeepL/Ollama/OpenAI 等服务，提供 CLI/GUI/MCP/Docker/Zotero
- [Next AI Draw.io](tools-and-resources/next-ai-drawio.md)
- [Roadmaps](https://roadmap.sh/dashboard) 开发者互动式路线图、指南及其他教育内容，助力开发者在职业生涯中不断成长。[代码开源](https://github.com/kamranahmedse/developer-roadmap)
- [kaniko](https://github.com/GoogleContainerTools/kaniko) K8s中构建镜像
- [提效工具](tools-and-resources/efficiency-tools.md)

## 思维模型与方法论

- [40个实用的思维模型](https://zhuanlan.zhihu.com/p/679640997)
- [目标管理-GROW模型](mental-models/grow-model.md)
- [STAR 法则解析](mental-models/star-principle.md)

## TODO
- AI Agent 全栈架构
- AI Agent 在游戏领域的应用及挑战

