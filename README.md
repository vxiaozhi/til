# til
📝 Today I Learned

建立本仓库动机参考了： [jbranchaud/til](https://github.com/jbranchaud/til) 

## 目录

## 书籍

- [EbookFoundation/free-programming-books](https://github.com/EbookFoundation/free-programming-books) 免费提供的编程书籍,Star 380K+
  
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

## 配置文件格式

- [常见配置文件格式对比](config-formats/config-formats-comparison.md)
- [json](config-formats/formats-json.md)
- ini
- yaml
- toml

## 系统架构

- [网关演进](system-arch/gateway-evolution.md)
- [Cloudflare Workers](system-arch/introduction-to-cloudflare-workers.md)
- [Milvus](https://github.com/milvus-io/milvus) 高性能、云原生向量 DB。支持内存映射（Mmap）实现对磁盘上大型文件的直接内存访问。
- [Mesh VPN 方案总结](system-arch/mesh-vpn-projects-summary.md)
- [Mock 服务](system-arch/mock-server.md)

## 数据库

- [golang-migrate/migrate](https://github.com/golang-migrate/migrate) Golang实现的数据库迁移工具，支持 MySQL/PostGres/SQlite/Clickhouse 等主流数据库， 使用案例：langfuse 中的 clickhouse 迁移。

## 游戏引擎

- [godot](https://github.com/godotengine/godot) Multi-platform 2D and 3D game engine
- [Web PixiJS](https://github.com/pixijs/pixijs) Next-Generation, Fastest HTML5 Creation Engine for the Web
- [Web Phaser](https://github.com/phaserjs/phaser)  HTML5 Game Framework
- [Web three.js](https://github.com/mrdoob/three.js) JavaScript 3D Library.

## OpenAI/Gemini/Claude API

- [claude /v1/messages](llm/claude_v1_messages.md)
  
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


## 智能体设计模式（Agentic Design Patterns）

- [Agentic_Design_Patterns PDF原文](https://github.com/sarwarbeing-ai/Agentic_Design_Patterns)
- [Agentic_Design_Patterns 中英文对照翻译](https://github.com/ginobefun/agentic-design-patterns-cn)
- [Agentic_Design_Patterns 我用 manus 的翻译链接](https://manus.im/app/C23TuqAJEPEk1fAx9HHZz8)

## LLM & Agent (论文、博客、论坛)

- [lmsys.org](https://lmsys.org/) LMSYS Org致力于开发大型模型的开源模型、数据集、系统及评估工具。
- [Huggingface Daily Paper](https://huggingface.co/papers/date/2025-12-16)
- [anthropic 工程博客](https://www.anthropic.com/engineering)
- [hao-ai-lab.github.io/blogs/](https://hao-ai-lab.github.io/blogs/) 加州大学圣地亚哥分校郝AI实验室网站
- [cursor 博客](https://cursor.ac.cn/en/blog)
- [鱼皮的 Vibe Coding 零基础教程](https://github.com/liyupi/ai-guide/tree/main/Vibe%20Coding%20%E9%9B%B6%E5%9F%BA%E7%A1%80%E6%95%99%E7%A8%8B)

## LLM 推理优化

- [NVIDIA Dynamo](https://github.com/ai-dynamo/dynamo)  是一个开源、低延迟的模块化推理框架，用于在分布式环境中服务生成式 AI 模型。它通过智能资源调度和请求路由、优化的内存管理和无缝的数据传输，实现跨大型 GPU 集群的推理工作负载无缝扩展。
- [vLLM/SGLang]()
- [打破算力瓶颈：LLM推理中Prefill/Decode分离架构深度解析](https://cloud.tencent.com/developer/article/2566044)

## AIAgent 应用领域

- [Coding Agent](agent/coding-agent.md)
- [模型 Coding 能力评测](https://github.com/amebapu/aiCodingTestCase)
- [PPT Agent](agent/ppt-agent.md)
- [手机 Agent](agent/phone-agent.md)
- [AI 面试](https://github.com/FoloUp/FoloUp)
- [UI生成：vercel-labs/json-render](https://github.com/vercel-labs/json-render) Vercel出品 AI → JSON → UI

## Agent OS

- [OpenClaw 龙虾](agent/openclaw)
- [RightNow-AI/openfang](https://github.com/RightNow-AI/openfang)

## AIAgent 平台及框架

- [dify]()
- [coze-studio](https://github.com/coze-dev/coze-studio)
- [n8n](https://github.com/n8n-io/n8n)
- 腾讯元器
- [JS 框架 badlogic/pi-mono](https://github.com/badlogic/pi-mono) AI代理工具包：编码代理命令行界面、统一LLM API、终端用户界面与网页UI库、Slack机器人、vLLM容器组
- [Go 框架 trpc-agent-go]()

## AIAgent可观测

- [langfuse](https://github.com/langfuse/langfuse)
- [langsmith](https://github.com/langchain-ai/langsmith-sdk)
- [higress AI可观测](https://higress.cn/docs/latest/plugins/ai/api-o11y/ai-statistics/)
- [coze-loop](https://github.com/coze-dev/coze-loop)

## AI视频生成

- [remotion-dev/skills](https://github.com/remotion-dev/skills) 
- [MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo) 利用AI大模型，一键生成高清短视频
- [ Huobao Drama - AI短剧生成平台](https://github.com/chatfire-AI/huobao-drama) 基于 Go + Vue3 的全栈AI短剧自动化生产平台

## DevOps

- [k8s-helm-chart](devops/k8s-helm-chart.md)

## SandBox

- [codesandbox](https://github.com/codesandbox)
- [sandboxie-plus/Sandboxie](https://github.com/sandboxie-plus/Sandboxie)
- [langgenius/dify-sandbox](https://github.com/langgenius/dify-sandbox)
- [cloudflare/sandbox-sdk](https://github.com/cloudflare/sandbox-sdk)
- [agent-infra/sandbox](https://github.com/agent-infra/sandbox)
- [patriksimek/vm2](https://github.com/patriksimek/vm2) Advanced vm/sandbox for Node.js
- [kubernetes-sigs/agent-sandbox](https://github.com/kubernetes-sigs/agent-sandbox) agent-sandbox 能够便捷地管理隔离、有状态且单例的工作负载，非常适合用于AI代理运行时等应用场景。
- [rivet-dev/sandbox-agent](https://github.com/rivet-dev/sandbox-agent) 在沙箱中运行编程代理。通过HTTP进行控制。支持Claude Code、Codex、OpenCode和Amp。
- [alibaba/OpenSandbox](https://github.com/alibaba/OpenSandbox) OpenSandbox 是一个面向 AI 应用场景设计的「通用沙箱平台」，为大模型相关的能力（命令执行、文件操作、代码执行、浏览器操作、Agent 运行等）提供 多语言 SDK、沙箱接口协议和沙箱运行时。

## K8s dashboard

- Aptakube 商业闭源
- [headlamp](https://github.com/kubernetes-sigs/headlamp) 开源免费

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
- [git](tools-and-resources/git.md)

## 思维模型与方法论

- [40个实用的思维模型](https://zhuanlan.zhihu.com/p/679640997)
- [目标管理-GROW模型](mental-models/grow-model.md)
- [STAR 法则解析](mental-models/star-principle.md)

## TODO
- AI Agent 全栈架构
- AI Agent 在游戏领域的应用及挑战
- [task keeper](task-keeper/) 任务管家构想

