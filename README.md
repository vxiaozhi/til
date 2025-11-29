# til
📝 Today I Learned

建立本仓库动机参考了： [jbranchaud/til](https://github.com/jbranchaud/til)

## 目录

## 编程语言与框架

### Go语言

- [rpcx](https://github.com/smallnest/rpcx) Go语言呢实现的微服务 RPC 框架，类似于阿里巴巴的 Dubbo 和微博的 Motan。序列化支持，JSON, Protobuf, MessagePack, 原始字节。服务发现支持：	对等网络（点对点）, zookeeper, etcd, consul, mDNS。
- [ants](https://github.com/panjf2000/ants/) ants 是一个高性能的 goroutine 池，实现了对大规模 goroutine 的调度管理、goroutine 复用，允许使用者在开发并发程序的时候限制 goroutine 数量，复用资源，达到更高效执行任务的效果。使用了 ants 的开源项目包括：coze-loop/trpc-go/dify-plugin-daemon
- [GJSON](https://github.com/tidwall/gjson) Get JSON values quickly - JSON parser for Go
- [Google 开发的依赖注入库 Wire](https://github.com/google/wire)

### Python语言

- [uv](https://github.com/astral-sh/uv) Rust实现的 python 包管理器，比 Pip 快 10-100 倍。


## 软件开发实践

- [代码评审(Code Review)](development-practices/code-review.md)
- [设计模式](development-practices/design-patterns.md)

## 协议与规范
- [Json-RPC2.0](protocols-and-specifications/json-rpc2.md)
- [http todo]()
- [prorobuf todo]


## 系统架构

- [网关演进](system-arch/gateway-evolution.md)
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


## AIAgent 应用领域

- [coding Agent](agent/coding-agent.md)
- [PPT Agent](agent/ppt-agent.md)

## 实用工具与资源

- [开源项目集合](tools-and-resources/open-source-project-collection.md)
- [开源模型](tools-and-resources/open-source-models.md)
- [开发者服务](tools-and-resources/developer-services.md)
- [PPT制作](tools-and-resources/ppt-creation.md)
- [PDFMathTranslate](https://github.com/PDFMathTranslate/PDFMathTranslate) 基于 AI 完整保留排版的 PDF 文档全文双语翻译，支持 Google/DeepL/Ollama/OpenAI 等服务，提供 CLI/GUI/MCP/Docker/Zotero

## 思维模型与方法论

- [40个实用的思维模型](https://zhuanlan.zhihu.com/p/679640997)
- [目标管理-GROW模型](mental-models/grow-model.md)
- [STAR 法则解析](mental-models/star-principle.md)

## TODO
- AI Agent 全栈架构
- AI Agent 在游戏领域的应用及挑战

