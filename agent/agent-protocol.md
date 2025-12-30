## Agent 交互协议

### MCP Model Context Protocol，模型上下文协议）

- MCP2024年11月底，由 Anthropic 推出的一种开放标准，旨在统一大模型与外部数据源和工具之间的通信协议。
- MCP 的主要目的在于解决当前 AI 模型因数据孤岛限制而无法充分发挥潜力的难题，MCP 使得 AI 应用能够安全地访问和操作本地及远程数据，为 AI 应用提供了连接万物的接口。

MCP 与 Function Calling 的区别：

- MCP（Model Context Protocol），模型上下文协议
- Function Calling，函数调用

这两种技术都旨在增强 AI 模型与外部数据的交互能力，但 MCP 不止可以增强 AI 模型，还可以连接其他的应用系统。

**MCP 核心架构**

MCP 遵循客户端-服务器架构（client-server），其中包含以下几个核心概念：

- MCP 主机（MCP Hosts）：发起请求的 LLM 应用程序（例如 Claude Desktop、IDE 或 AI 工具）。
- MCP 客户端（MCP Clients）：在主机程序内部，与 MCP server 保持 1:1 的连接。
- MCP 服务器（MCP Servers）：为 MCP client 提供上下文、工具和 prompt 信息。
- 本地资源（Local Resources）：本地计算机中可供 MCP server 安全访问的资源（例如文件、数据库）。
- 远程资源（Remote Resources）：MCP server 可以连接到的远程资源（例如通过 API）。

MCP 协议支持两种主要的通信机制：基于标准输入输出的本地通信和基于SSE（Server-Sent Events）的远程通信。这两种机制都使用 JSON-RPC 2.0 格式进行消息传输，确保了通信的标准化和可扩展性。

- 本地通信：通过 stdio 传输数据，适用于在同一台机器上运行的客户端和服务器之间的通信。
- 远程通信：利用 SSE 与 HTTP 结合，实现跨网络的实时数据传输，适用于需要访问远程资源或分布式部署的场景。

**开发**

- [modelcontextprotocol/python-sdk](https://github.com/modelcontextprotocol/python-sdk)
- [modelcontextprotocol/typescript-sdk](https://github.com/modelcontextprotocol/typescript-sdk)
- [modelcontextprotocol/go-sdk](https://github.com/modelcontextprotocol/go-sdk)

**MCP Servers**

- [modelcontextprotocol/servers](https://github.com/modelcontextprotocol/servers)
- [awesome-mcp-servers](https://github.com/wong2/awesome-mcp-servers) 精选模型上下文协议（MCP）服务器列表
- [LaTeX MCP Server](https://github.com/Yeok-c/latex-mcp-server)  阅读你引用的论文，验证/补充你的论点。访问你的Python脚本，根据实验数据生成新图表/Latex表格，并自动将其插入Latex文档。可逐步验证每个环节，确保PDF编译成功。其功能在于能自主将研究框架与实验结果整合成文（尽管成品可能略显粗糙）。
- [MCP LaTeX Server](https://github.com/RobertoDure/mcp-latex-server) MCP LaTeX服务器通过标准化协议，使Claude等AI助手能够无缝处理LaTeX文档。该服务器提供创建、编辑、读取和验证LaTeX文件的工具，可轻松生成专业的学术论文、报告、演示文稿及其他LaTeX文档。**支持 Beamer**
- [Github 官方 mcp server](https://github.com/github/github-mcp-server)
  
### Agent-to-Agent (A2A) 协议

Agent-to-Agent (A2A) 协议是由 Google 开源的标准协议 [原始仓库](https://github.com/a2aproject/A2A)，专门用于不同 AI 代理之间的发现和协作。该协议定义了：

- 统一的通信接口：标准化的 HTTP API，支持消息传递、任务管理等核心功能
- 代理发现机制：通过 AgentCard 描述代理能力，实现自动发现和匹配
- 多模态支持：支持文本、图像等多种数据类型的处理和传输
- 流式通信：支持实时流式数据传输，适用于长时间运行的任务
- 会话管理：通过会话 ID 组织多轮对话和相关任务

开源 [trpc-a2a-go](https://github.com/trpc-group/trpc-a2a-go/) 项目简介
trpc-a2a-go 是 tRPC 团队提供的 A2A 协议 Go 语言实现，主要特性包括：

- 完整的 A2A 协议实现：支持所有核心 A2A 协议特性
- 易于使用的 API：提供简洁的接口用于构建 A2A 服务和客户端
- 灵活的认证支持：内置 JWT、API Key、OAuth2 等多种认证方式
- 丰富的示例：包含简单示例、流式处理、认证等完整示例

其它：

- [Agent2Agent (A2A) 协议发布](https://developers.googleblog.com/zh-hans/a2a-a-new-era-of-agent-interoperability/)
