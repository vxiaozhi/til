# til
📝 Today I Learned

建立本仓库动机参考了： [jbranchaud/til](https://github.com/jbranchaud/til)

## 目录

## Go语言

- [rpcx](https://github.com/smallnest/rpcx) Go语言呢实现的微服务 RPC 框架，类似于阿里巴巴的 Dubbo 和微博的 Motan。序列化支持，JSON, Protobuf, MessagePack, 原始字节。服务发现支持：	对等网络（点对点）, zookeeper, etcd, consul, mDNS。
- [ants](https://github.com/panjf2000/ants/) ants 是一个高性能的 goroutine 池，实现了对大规模 goroutine 的调度管理、goroutine 复用，允许使用者在开发并发程序的时候限制 goroutine 数量，复用资源，达到更高效执行任务的效果。使用了 ants 的开源项目包括：coze-loop/trpc-go/dify-plugin-daemon

## Python语言

- [uv](https://github.com/astral-sh/uv) Rust实现的 python 包管理器，比 Pip 快 10-100 倍。

## Json-RPC2.0
- [(译) JSON-RPC 2.0 规范(中文版)](https://wiki.geekdream.com/Specification/json-rpc_2.0.html)
- [JSON-RPC 2.0 Specification](https://www.jsonrpc.org/specification)

请求对象包括四个成员：
- jsonrpc： 指定JSON-RPC协议版本的字符串，必须准确写为“2.0”
- method
- params
- id：唯一标识id，值必须包含一个字符串、数值或NULL空值。如果不包含该成员则被认定为是一个通知。该值一般不为NULL，若为数值则不应该包含小数。

应答对象包括四个成员：
- jsonrpc
- result
- error
- id
  
## 设计模式

**架构模式——黑板模式**

参考：[架构模式——黑板模式（Blackboard）](https://github.com/luoway/blog/issues/24)

黑板架构背后的理念是：一系列独立的程序携手合作，致力于处理同一个数据结构。每个程序善于解决整项任务的某一部分；所有程序合作致力于找到解决之道。系统前进的方向主要取决于当前的进展状态。一个中央控制组件负责评估当前状态并协调各个专业程序。

之所以命名“黑板”，是因为它让人想起专家们站在黑板前协作解决问题的情形。每位专家都独立地对当前状态做出评估，随时可能到黑板前添加、修改或删除信息。专家们通常自行决定接下来由谁来到黑板前，在黑板模式中，如果有多个程序都能提供帮助，将由调停者（moderator）组件决定这些程序的执行顺序。

## 翻译

- [PDFMathTranslate](https://github.com/PDFMathTranslate/PDFMathTranslate) 基于 AI 完整保留排版的 PDF 文档全文双语翻译，支持 Google/DeepL/Ollama/OpenAI 等服务，提供 CLI/GUI/MCP/Docker/Zotero
  
## AIAgent

- [从ChatGPT到AI Agent，一文讲透 Agent 的底层逻辑](https://zhuanlan.zhihu.com/p/1966627526530037143)
- [awesome-ai-agents](https://github.com/e2b-dev/awesome-ai-agents) 这个仓库收集了常用的 AIAgent 开源项目
- [DecryptPrompt](https://github.com/DSXiangLi/DecryptPrompt) 总结Prompt&LLM论文，开源数据&模型，AIGC应用
- [智能体设计模式：智能系统构建实战指南](https://jimmysong.io/book/agentic-design-patterns/) 几米宋的大作

### 什么是Agent

- [How to think about agent frameworks](https://blog.langchain.com/how-to-think-about-agent-frameworks/)
- [LLM Powered Autonomous Agents](https://lilianweng.github.io/posts/2023-06-23-agent/)
  
一个比较经典的定义是OpenAI的研究主管Lilian Weng给出的定义是：Agent = 大模型（LLM）+ 规划（Planning）+ 记忆（Memory）+ 工具使用（Tool Use）。这个定义是从技术实现的角度对Agent进行了定义，它指的是要实现一个Agent，就需要支持这些能力，它需要基于大模型，需要有规划的能力，能思考接下来要做的事情，需要有记忆，能够读取长期记忆和短期记忆，需要能够使用工具，他是将支持这些能力的集合体定义为了Agent。

![](https://lilianweng.github.io/posts/2023-06-23-agent/agent-overview.png)

agent有以下4个模块： Tool、记忆（Memory）、规划（Planning）和动作（Action）模块：

- Tool：核心技术：函数调用（Function Calling）、API集成。优势：突破大模型固有局限，实现现实世界操作。
- Memory：记忆模块存储环境中的信息，agent则利用记忆来帮助决策未来的动作，使行为更加一致、合理。记忆模块结合了认知科学研究中关于人类记忆过程的原理和机制。人类记忆遵循一个从感官记忆（记录感知输入）到短期记忆（暂时保持信息），再到长期记忆（在较长时间内巩固信息）的总体进程。对Agent而言，短期记忆类似于在Transformer架构限制的上下文窗口内的输入信息。长期记忆则类似于代理可以快速查询和检索的外部向量存储。
- Planning：将复杂任务分解为更简单的子任务，逐个解决。比较常见的planning策略有以下几种：
  - Single-path reasoning：最终任务被分解为几个中间步骤，以级联方式连接，每个步骤只引导到一个后续步骤；如CoT, Zero-shotCot, ReWoo等
  - Multi-path reasoning ：推理步骤被组织成树状结构。每个中间步骤可能有多个后续步骤，更类似于人类思维。如ToT，RAP等
  - Planning with feedback ：在采取行动后能够接收反馈。反馈可以来自环境、人类和模型。如ReAct以及结合强化学习的Reflexion等。
  - [相关论文 Understanding the planning of LLM agents: A survey](https://arxiv.org/pdf/2402.02716)
- Action：将agent的决策转化为具体的输出。Agent可以调用APIs， Databases，或者直接依赖LLM的能力采取action；通过Action，Agent可以完成一个任务 、与其他agent交流或者 探索环境 （trial-and-error） 

Antropic的 Barry Zhang 提出 Agent 更简洁的概念，即在循环（Loop）中使用工具的模型 。

![](https://blog.langchain.com/content/images/size/w1000/2025/04/58d9f10c985c4eb5d53798dea315f7bb5ab6249e-2401x1000.webp)

### Prompt的设计

Agent的开发，系统提示词的设计至关重要，可以说一个好的智能体提示词就直接决定了一个智能体的上限。提示词的设计已经沉淀了很多方法论了，具体到Agent的提示词该怎么设计，可以学习和借鉴一下主流的Agent的提示词的撰写方法。

- [system-prompts-and-models-of-ai-tools](https://github.com/x1xhlol/system-prompts-and-models-of-ai-tools)

这个Github项目收集了主流的AI Agent工具的提示词，非常值得学习。重点可以看看Manus和Cline。总结一下，这些世界一流的AI Agent提示词的撰写方法，主要有以下几个特点：

- 角色与能力定义: 所有 Prompt 都首先清晰定义了 Agent 的角色、目标和核心能力。
- 工具使用规则: 对于具备工具调用能力的 Agent，都详细规定了工具的使用方式、限制和注意事项。这是 Agentic AI 的核心要素。
- 任务分解与规划: 隐式或显式地要求 Agent 能够分解复杂任务，并按计划执行（如cline的PLAN MODE, Manus 的 Agent Loop，Lovable 的分步计划）。
- 上下文利用: 特别是 Cursor 和 cline，强调利用环境（IDE、项目文件、实时预览）信息。
- 结构化的交互协议: 对大模型返回的数据格式提出明确要求，保证 LLM 与程序间通信的可靠性。（如cline采用XML格式交互）
- 限制与边界: 清晰说明 Agent 不能做什么，有助于管理用户预期和保证安全。
- 可扩展性：通过标准化协议集成外部能力（如cline提示词模版的MCP server模块）。
- 代码质量与最佳实践: 对于编码相关的 Agent，都强调了代码质量、可维护性和遵循最佳实践。

这些提示词各有侧重，但都体现了设计一个有效 AI Agent 所需考虑的关键要素：清晰的定位、明确的能力与限制、规范的工具使用、结构化的任务执行以及有效的沟通策略。学习这些特点有助于构建更强大、更可靠、更易于协作的 AI Agent

- [share-best-prompt](https://github.com/shareAI-lab/share-best-prompt) 世界上最好的提示词 （总计估值超过300亿的提示词）外国网友x1xh成功获取了 v0、Manus、Cursor、Same.dev 和 Lovable 的完整官方系统提示词。附带提示词对应的中文版本。

### Agent游戏环境

相关接口：

- [Mineflayer](https://github.com/PrismarineJS/mineflayer) Mineflayer 是一个强大的、高级的 JavaScript API，用于创建可以与 Minecraft 服务器交互的 Minecraft 机器人。它是 PrismarineJS 生态系统的一部分，为开发者提供了一套全面的工具，以便通过编程方式自动化和增强他们的 Minecraft 体验。
- [Mindcraft](https://github.com/mindcraft-bots/mindcraft) Mindcraft 是一个创新框架，通过大型语言模型（LLMs）和 Mineflayer 库将人工智能引入 Minecraft。该项目支持创建能够理解自然语言、感知环境并在 Minecraft 世界中执行复杂任务的智能机器人。
- [Project Malmö](https://zread.ai/microsoft/malmo) Project Malmö 是一个基于 Minecraft 构建的强大 AI 实验与研究平台。由微软设计，它为在复杂的 3D 世界中开发和测试人工智能算法提供了丰富的交互环境。该平台旨在激发新一代研究，探索这一独特环境带来的挑战性问题，从导航和生存任务到复杂的多智能体场景。

### Agent前端

- [AG-UI](https://github.com/ag-ui-protocol/ag-ui) 是一个用于Agent与前端页面交互的协议，他是一个基于事件驱动的协议，将Agent的各种行为（工具调用、大模型调用等）以不同类型Event的形式推送到前端，当前已经 CopliotKit 提供了不少与UI组件通过 AG-UI 协议与Agent交互。
- [CopilotKit](https://github.com/CopilotKit/CopilotKit) CopilotKit框架，旨在帮助开发者构建由 AI 驱动的应用程序，其中的 copilot 和 agent 能够无缝集成到现有软件中。该框架专注于快速开发和生产就绪能力，为创建智能、交互式的用户体验提供了核心构建模块

### 记忆系统

#### 1. 记忆系统是什么？

记忆系统是指通过特定机制存储、管理和检索信息，以增强模型在长期交互或复杂任务中的上下文连贯性、个性化响应及知识持久化的技术框架。其核心目标是解决大模型因固定上下文窗口限制导致的“失忆”问题，并模拟人类记忆的分层与动态更新特性。

#### 2. 为什么需要记忆系统？

大模型本身不存在记忆能力——如果开发agent应用，需要外挂记忆系统进行信息的记忆

大模型本身的上下文阈值是有限的——开发过程中没有办法直接给它所有的对话或者文本内容，超出后早期对话内容会被丢弃，导致多轮对话中出现“断片”或重复提问。记忆系统通过分层存储（短期/长期记忆）和动态检索（如向量数据库），将历史信息压缩后注入当前上下文，确保对话连贯性。

#### 3. 记忆系统的分层架构：

记忆系统通常借鉴人类记忆的三层结构，分为短期、中期和长期记忆：

- 短期记忆（STM）：存储当前对话或任务的即时信息，受限于模型的上下文窗口长度（如GPT-4的2048 tokens）。实现技术：将对话历史直接嵌入提示词中，但容量有限。
- 中期记忆（MTM）：整合短期记忆中的主题信息，通过分段分页策略组织（如MemoryOS将同一主题的对话归并为“段”），并基于热度算法（访问频率、时间衰减等）动态更新。
- 长期记忆（LPM）：持久化存储用户偏好、角色特征等个性化数据。例如，MemoryOS的LPM模块包含用户画像和智能体特征，通过向量数据库或知识图谱实现长期存储，然后通过RAG手段来进行提取。

#### 4. 开源方案
- [Awesome-LLM-Resources-List](https://github.com/ilsilfverskiold/Awesome-LLM-Resources-List) 这里收集了记忆系统（Long-Term Memory）相关的开源项目
- [awesome-ai-memory](https://github.com/XiaomingX/awesome-ai-memory) AI长期记忆的开源和商业项目列表,列举了2024-2025年社区认可度高、技术前沿的AI记忆及智能体相关工具
- [超越“金鱼脑”：深度剖析四大主流 AI Agent 记忆管理技术](https://zhuanlan.zhihu.com/p/1943700805099185953) 深入剖析了为什么传统的 RAG 还不够，以及 Agent 引入记忆系统的必要性。
  
常用开源方案（以下方案均为 Python 实现）：

| Provider     | Community             | Founded     | GitHub                                                                                          | ⭐ Stars | Open Source                 |
|--------------|------------------------|-------------|--------------------------------------------------------------------------------------------------|---------|-----------------------------|
| Mem0         | 🚀 Fast-growing        | June 2023   | [![GitHub followers](https://img.shields.io/github/followers/mem0ai?style=flat-square&color=teal)](https://github.com/mem0ai/mem0)         | 35.2k   | ✅ Apache-2.0               |
| Letta        | 💬 Active dev community| Oct 2023    | [![GitHub followers](https://img.shields.io/github/followers/letta-ai?style=flat-square&color=teal)](https://github.com/letta-ai/letta)     | 17k     | ✅ Apache-2.0               |
| Zep          | 🤝 Moderate community  | Aug 2024    | [![GitHub followers](https://img.shields.io/github/followers/getzep?style=flat-square&color=teal)](https://github.com/getzep/graphiti)      | 11.6k   | ⚠️ Graphiti CE (Apache-2.0) |
| MemoRAG      | 🧪 Small research group| Sep 2024    | [![GitHub followers](https://img.shields.io/github/followers/qhjqhj00?style=flat-square&color=teal)](https://github.com/qhjqhj00/MemoRAG)    | 1.8k    | ✅ Apache-2.0               |
| Memary       | 🧠 Niche community     | April 2024  | [![GitHub followers](https://img.shields.io/github/followers/kingjulio8238?style=flat-square&color=teal)](https://github.com/kingjulio8238/Memary) | 2.3k    | ✅ MIT                      |
| Cognee       | 🔄 Moderate            | Aug 2023    | [![GitHub followers](https://img.shields.io/github/followers/topoteretes?style=flat-square&color=teal)](https://github.com/topoteretes/cognee)     | 5.8k    | ✅ Apache-2.0               |
| EverMemOS - 陈天桥盛大团队，推出最强开源记忆系统EverMemOS       | EverMind-AI            | Nov 2025    | https://github.com/EverMind-AI/EverMemOS   | 166    | ✅ Apache-2.0               |

记忆功能对比：

| Provider  | Based   | Optional KG | Self-Editing / Agentic | Rolling Summaries            | Categories |
|-----------|---------|-------------|-------------------------|-------------------------------|------------|
| Mem0      | 🧮 Vector | ✅ Yes       | ✅ Yes                  | ❌ Not explicit               | ✅ Yes     |
| Letta     | 🧮 Vector | ⚠️ Partial  | ✅ Yes                  | ⚠️ Partial (memory blocks)    | ✅ Yes     |
| Zep       | 🧠 KG     |  -         | ✅ Yes                  | ✅ Auto chat summarization     | ✅ Yes     |
| MemoRAG   | 🧮 Vector | ❌ No       | ✅ Yes                  | ❌ Uses long-range model      | ❌ No      |
| Memary    | 🧠 KG     | -         | ✅ Yes                  | ⚠️ Plans “rewind” feature     | ✅ Yes     |
| Cognee    | 🧠 KG     | -         | ✅ Yes                  | ❌ No auto summaries          | ✅ Yes     |




### LLM的应用架构演进过程

LLM 应用架构演进分四个发展阶段：Prompt阶段，Chain编排阶段，Agent阶段和Multi-Agent阶段。 概括来说就是：

- Prompt阶段是最初级的阶段，人类直接书写提示词提问，获取LLM的回答。这个阶段主要是激活和挖掘LLM的智能，但只停留在对话的阶段。
- Chain编排阶段是通过固定的流程编排，让LLM可以和多种工具组合起来，按流水线执行逻辑流程，从而处理特定的任务。典型代表是采用了文档检索增强生成（RAG）技术构建的聊天应用。这个阶段的优点是稳定性和提效，但缺点是固定的流程编排限制了LLM的能力发挥。
- Agent阶段是通过设定好提示词，准备好工具，由Agent自动化规划流程，完成目标。这个阶段的优点是LLM能够自行思考、规划并调用工具来完成目标，但缺点是模型的负担过重，容易陷入死循环。
- Multi-Agent阶段是将单一Agent分为多个不同领域的专家Agent，它们之间互相合作，从而提高Agent的稳定性和智能。这个阶段的优点是能有效提高智能程度，但缺点是多轮的思考，信息的交互，编程实现起来相对复杂，对LLM的响应速度要求高。

### 工具/函数调度

#### 1. what？——function call是什么？ 

LLM通过结构化指令调用外部函数/API，将自然语言意图转为可执行指令的能力。 简单说：Function Call就是让智能助手能调用外部工具的功能，比如查天气、订外卖、算数学题，让它从“只会说话”变成“会办实事”的全能帮手！

#### 2. why？——为什么需要function call？ 

大模型本身的一些缺陷，例如：
1. 知识有时效性缺陷 比如你问 "2025 年 NBA 总冠军是谁？"（假设现在是 2025 年），模型如果没学过 2025 年的新数据，就答不上来。但用 Function Call 调用体育新闻 API，马上能拿到实时结果。
2. 不会做专业操作 模型懂医学知识，但不能直接帮你查医院排班；懂数学公式，但不会用 Excel 算工资表。而 Function Call 能喊医院系统、办公软件来干活，实现 "理论 + 实操" 结合。

#### 3. Function call可能的问题

错误调用参数、幻觉生成API、依赖关系混乱、隐私问题（如乱调用支付软件）。如下面举了一些例子：

1. 如果"外援"掉链子，助手也会变笨 比如天气API突然崩了，助手查不到天气，只能跟你说："抱歉，天气信息没拿到..."
2. 隐私问题：别让助手乱翻你的东西 如果助手能调用你的支付宝付款，万一被坏人骗了，可能会乱花钱——所以现在很多Function Call都需要你"授权确认"才能用。
3. 复杂任务容易搞砸 比如你让助手"先订机票，再订酒店，最后租辆车"，如果其中一步出错（比如机票卖完了），助手可能不知道怎么调整，需要你手把手教它。

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

- [awesome-mcp-servers](https://github.com/wong2/awesome-mcp-servers) 精选模型上下文协议（MCP）服务器列表
- [LaTeX MCP Server](https://github.com/Yeok-c/latex-mcp-server)  阅读你引用的论文，验证/补充你的论点。访问你的Python脚本，根据实验数据生成新图表/Latex表格，并自动将其插入Latex文档。可逐步验证每个环节，确保PDF编译成功。其功能在于能自主将研究框架与实验结果整合成文（尽管成品可能略显粗糙）。
- [MCP LaTeX Server](https://github.com/RobertoDure/mcp-latex-server) MCP LaTeX服务器通过标准化协议，使Claude等AI助手能够无缝处理LaTeX文档。该服务器提供创建、编辑、读取和验证LaTeX文件的工具，可轻松生成专业的学术论文、报告、演示文稿及其他LaTeX文档。**支持 Beamer**
  
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

### Agent 如何进化提升认知

- [Agentic Context Engine (ACE)](https://github.com/kayba-ai/agentic-context-engine) Agentic Context Engine (ACE) 是一个革命性框架，它使 AI agents 能够从经验中学习并随时间推移提升性能。基于斯坦福大学和 SambaNova 的研究成果，ACE 通过增量学习实现持续优化策略的三代理系统——且无需微调或训练数据。

### 为什么Agent不Work

AI Agent在大众看到之前已经发展了两年多，直到最近Manus的爆火才被出现在大家面前，根本原因是，Agent的可靠性不足，上限较低。所以一直还摆不上台面，仅在有限的场景迭代和落地。

实现一个Agent不难，有开发经验的同学，通过学习在一两天内可以开发出一个可以运行的Agent，但要做一个可用的Agent，则还需要大量的工作。

判断一个Agent是否可用，主要取决于具体场景的错误容忍度和受众的介入程度。以AI编程为例，开发者对Agent生成代码的预期是“规模不大的需求，代码生成还不错，会有问题，但可以通过反复沟通去修正，最终达到相对可接受的结果”。所以，Vibe coding这个场景火了，大量不懂代码的开发者诞生了。Deep Research所关注的研报场景同理。

所以，当下大家能看到的生产级别的Agent，基本上都有这两个特征：复杂度与规模较低、容错水平高。

影响Agent在大规模复杂问题上的性能因素是幻觉和记忆管理的挑战。

**幻觉**

- 大模型是一个概率模型，它生成的内容一定的概率是错误的，即我们常说的幻觉。
- Agent执行一次任务，通常需要组合多次大模型的调用来完成工作，在总体的结果成功率上比单次的大模型调用会更加低。例如：假设平均单次调成大模型生成内容的正确率在90%，那4次组合调用后，正确率直接下降到60-70% 。

**记忆管理**

- 当前基于大语言模型的Agent普遍面临"记忆困境"，这种困境源于大模型自身的无状态特性与人类认知过程中持续演进的记忆机制之间的本质差异。传统采用简单对话历史堆砌的"伪记忆"实现方式，在应对需要长期记忆保持、复杂知识关联和动态经验积累的场景时，暴露出一系列结构性矛盾。

**上下文窗口限制**

当前主流大模型的上下文处理能力受限于固定长度的窗口机制（如GPT-4的32k tokens）。这种物理限制导致对话轮次或任务复杂度超过窗口容量时，必然发生历史信息截断，造成关键记忆丢失；其次，随着上下文长度增加，模型处理效率呈指数级下降。这种矛盾在需要长期任务追踪的场景（如连续多日项目管理）中尤为突出。


## AIAgent 应用领域

### 编程开发(Coding Agent)

- [cline](https://github.com/cline/cline)
- [Roo](https://github.com/RooCodeInc/Roo-Code)
- [CodeBuddy]()
- [trae-agent](https://github.com/bytedance/trae-agent) 字节开源 编程 Agent
- [Qwen Code](https://github.com/QwenLM/qwen-code) 阿里开源：Qwen Code是一款基于Gemini CLI 改造的强大命令行AI工作流工具，特别针对Qwen3-Coder模型进行了优化。它通过先进的代码理解能力、自动化任务处理和智能辅助功能，显著提升您的开发工作效率。
- [Gemini CLI](https://github.com/google-gemini/gemini-cli) Google开源：Gemini CLI 是一款开源人工智能代理，能将 Gemini 的强大功能直接引入您的终端。它提供轻量级的 Gemini 访问方式，让您的指令能以最直接的路径抵达我们的模型。

### PPT 编写

- [PPTAgent](https://github.com/icip-cas/PPTAgent) PPTAgent 是由中国科学院软件研究所的中文信息处理实验室（ICIP-CAS）研发的 AI 驱动系统，通过精密的两阶段工作流，能够自动从文档生成专业演示文稿。该系统受人类演示文稿创作方法启发，结合先进的语言模型与视觉处理技术，提供超越简单文本到幻灯片转换的高质量、内容丰富的幻灯片。
- [TrainPPTAgent](https://github.com/johnson7788/TrainPPTAgent) TrainPPTAgent 是一款基于 AI 的智能演示文稿生成工具。用户只需输入主题，系统即可自动通过微信搜索网络内容，生成结构完整、内容丰富的 PPT 大纲与逐页内容。项目采用 前后端分离架构：前端负责交互、大纲编辑与模板选择，后端则借助大语言模型（LLM）与强化学习（GRPO）完成内容生成与优化，使生成的 PPT 更贴合用户目标。

## 氛围编程（vibe coding）

2025年，Andrej Karpathy 提出了 "Vibe Coding" 这个概念，描述了一种全新的 AI 辅助开发模式：开发者用自然语言描述想法，AI 立即生成代码，然后通过不断的反馈和调整来完善功能。

让我们看一个典型的 Vibe Coding 场景：

```
开发者: "我需要一个用户评论功能"
AI: [生成基础的评论 CRUD 代码]
开发者: "评论需要支持回复"
AI: [修改代码，添加回复功能]
开发者: "回复应该是树状结构，不是平铺的"
AI: [重构数据结构和显示逻辑]
开发者: "还需要点赞和举报功能"
AI: [继续扩展功能...]
```
这种模式的魅力在于：

- 即时反馈：想法立刻变成代码
- 低门槛：不需要写详细的技术文档
- 高效率：跳过繁琐的规划阶段
- 直觉化：符合人类的自然思维方式

Vibe Coding 在快速原型开发、个人项目和探索性编程中表现出色。它让编程变得更加直观和有趣，降低了创意实现的门槛。然而，当项目规模扩大、团队协作增加时，Vibe Coding 开始暴露出一些问题：

- 缺乏长期规划：每次对话都是局部优化，缺乏全局视角。当需求复杂化时，可能需要推倒重来。
- 团队协作困难：个人与 AI 的对话历史难以传递给团队成员，知识无法有效共享。
- 质量控制挑战：快速迭代容易忽略代码质量、安全性和可维护性。
- 技术债务积累：为了快速实现功能，可能做出不够优雅的设计决策。

正是为了应对 Vibe Coding 的这些局限性，规格驱动开发（Spec-driven Development）作为一种更加精细化的 AI 协作方式应运而生。

## Spec 编程

- [AI编程 - Spec开发工作流解析](https://zhuanlan.zhihu.com/p/1934780545004442461)
- [规格驱动开发利器：Spec Workflow MCP](https://github.com/pimzino/spec-workflow-mcp)
- [Spec-Kit](https://github.com/github/spec-kit) GitHub 官方发布的实现规约编程的开源工具
- [OpenSpec](https://github.com/Fission-AI/OpenSpec)  OpenSpec 是一个面向规范驱动开发的 AI 原生系统，通过结构化的规范工作流协调人类与 AI 编程助手。通过在实施前确立明确意图，OpenSpec 能够提供确定性的、可审查的输出，且无需 API 密钥或复杂配置。

**由来**

氛围编程（vibe coding）：买 Tokens，写模糊提示，点“生成”，有时得完美代码，有时一团乱麻。AI 鼓励你“再试一次”，你安慰自己“这次一定能修好 bug”，但最终模型厂商总是赢家。偶尔你觉得自己赚到了，回头却发现花了更多时间。

vibe coding 最大的问题是：它让开发变成了“碰运气”，而不是“可控的工程”。

传统软件工程强调需求澄清、技术设计、任务拆分、过程可追溯。这样做虽然“慢”，但能让项目稳步推进、可复盘、可协作。每一步都有人参与评审，确保方向和细节都不会跑偏。

Kiro AI IDE 就把这种流程做成了“Spec 工作流”，让 AI 编程也能像工程师一样靠谱。

在 Spec 工作流下，AI 负责：

- 模糊需求 → 需求方案
- 技术设计文档
- 任务清单
- 编码实现
- 验收测试

人只需参与：

- 需求输入
- 需求/技术/任务/测试评审


GitHub 官方发布了 Spec-Kit 实现规约编程的开源工具并引发广泛关注，源代码见： https://github.com/github/spec-kit 。主要命令：

- /constitution - 建立项目宪法：定义项目核心原则、技术约束、质量标准 → 输出 .specify/memory/constitution.md
- /specify - 写需求文档：自然语言描述功能需求、AI 自动生成完整规约、质量检测清单与验证 → 输出 specs/###-slug/spec.md
- /clarify - 澄清规约：进行用户需求澄清细节、确认
- /plan - 做技术方案：生成技术栈选型、架构设计、数据模型、API 契约  → 输出 specs/###-slug/plan.md
- /tasks - 任务分解清单：按照用户故事组织、依赖关系分析、并行执行优化 → 输出 specs/###-slug/tasks.md
- /analyze - 审核文档: 识别spec.md`、`plan.md`、`tasks.md 不一致性、操作约束、规范分析报告、提供建议与修复
- /implement - 开始干活：逐任务自动执行、进度跟踪、质量验证
 
其中最关键的 4 个指令是：/specify、/plan 、/tasks 、/implement 指令。

## Spec Coding 实践

### Spec Coding（通过 Spec-Kit ）

#### Step 0： 安装依赖

Spec-Kit需要依赖 AIAgent， 如 CodeBuddy，Qwen，Cursor，Copilot。这里我们以CodeBuddy为例。

本地终端安装 codebuddy-code 命令行：

```
npm install -g @tencent-ai/codebuddy-code
```

安装 Specify:

```
# 方式 1：持久化安装（推荐）
uv tool install specify-cli --from git+https://github.com/github/spec-kit.git

# 方式 2：一次性使用
uvx --from git+https://github.com/github/spec-kit.git specify init my-project
```

初始化并配置 github 令牌：

```
# 先申请 Github 令牌： https://github.com/settings/personal-access-tokens
# 进行导入配置变量，其中/root/.bashrc 为 Linux 系统本机的变量位置，如在 Mac 安装，默认地址为 ~/.zshrc  或 ~/.bashrc。
export GH_TOKEN='github_pat_xxx' & export GITHUB_TOKEN="$GH_TOKEN" >> /root/.bashrc
 
source  /root/.bashrc
```

#### Step 1: 初始化项目

```
# 使用 CodeBuddy 进行项目初始化
specify init my-project

#存量项目，直接进入工作根目录，进行
specify init .
```


### Spec Coding（通过 spec-workflow-mcp ）

由于 Spec-Kit 需要依赖 特定的 Agent 才能运行，因此 我们采用 https://github.com/pimzino/spec-workflow-mcp 来简化使用流程。

以下是在 Mac VSCode + CodeBuddy 下的操作流程，以创建一个图书管理系统为例：

#### Step 0： 安装依赖

安装 node：

```
brew install node
```

配置 mcp server：

```
{
  "mcpServers": {
    "spec-workflow": {
      "command": "npx",
      "args": ["-y", "@pimzino/spec-workflow-mcp@latest", "/path/to/your/project"]
    }
  }
}
```

连接成功后，你将看到以下可用工具:

```
spec-workflow

工具:
approvals
spec-status
spec-workflow-guide
steering-guide
Command: npx -y @pimzino/spec-workflow-mcp@latest /path/to/your/project
```

输入以下内从检查 mcp 是否被调用：

```
展示 spec workflow guide
```


在终端中输入以下命令启动 Web Dashboard：

```
npx -y @pimzino/spec-workflow-mcp@latest /path/to/your/project --dashboard
```

Dashboard 提供了可视化的项目管理界面，包括：

- 项目状态概览
- 文档审批管理
- 进度跟踪
- 任务管理

### Step 1： Steering

聊天窗口输入以下内容：

```
用 Python 开发一个图书管理系统。

首先创建 Steering 文档
```

运行完成，会在steering 目录下创建三个文件：product.md tech.md structure.md. 

注意：每个文件创建完成后需要在 dashboard 中申请通过后才会进入下一步。

### Step 2： 基于 Steering 指导，创建具体的规格文档

### Step 3： 基于规格，生成 Tasks

### Step 4： 按照 Tasks 文档逐步实施开发

## Claude Code

Spec 编程本质是基于 [claude-code](https://github.com/anthropics/claude-code) 的 Command 机制实现的， 这里介绍更多 Claude command 相关资料：

- [claude-code 使用指南](https://github.com/zebbern/claude-code-guide)
- [Claude Code 逆向工程研究仓库](https://github.com/shareAI-lab/analysis_claude_code) 使用 Claude code 对其自身进行逆向工程分析，附分析的全部提示词。
- [我的 Claude Code 实战经验：深度使用每个功能 [译]](https://www.ginonotes.com/posts/how-i-use-every-claude-code-feature)
- [掌握 Claude Code / 命令：让 AI 成为你的开发利器](https://feisky.xyz/posts/2025-07-01-claude-code-slash-command/)
- [awesome-claude-code](https://github.com/hesreallyhim/awesome-claude-code) 这是一份精选列表，包含斜杠命令、CLAUDE.md文件、命令行工具及其他资源与指南，旨在提升您的Claude代码工作流效率、生产力及使用体验。
- [SuperClaude_Framework](https://github.com/SuperClaude-Org/SuperClaude_Framework) SuperClaude是一个元编程配置框架，通过行为指令注入与组件编排技术，将Claude代码转化为结构化开发平台。该框架配备强大工具与智能代理，能够提供系统化的工作流自动化解决方案。
- [claude-code-subagents-collection](https://github.com/davepoon/claude-code-subagents-collection) Claude Code专属AI子代理与斜杠指令全集，集成领域专家知识与强大自动化功能，全面提升开发工作流效率。
- [Claude Code Slash Commands](https://github.com/wshobson/commands) 一套专为Claude Code打造的生产级斜杠命令全集，为现代软件开发提供智能自动化与多智能体编排能力。
- [Claude-Command-Suite](https://github.com/qdhenry/Claude-Command-Suite) Claude Command Suite是一款开发工具包，提供148+条斜杠命令、54个AI智能体、Claude代码技能以及面向软件工程任务的自动化工作流。该套件通过结构化、可重复的工作流程，覆盖代码审查、测试部署、业务场景建模及GitHub-Linear同步等功能。

### Claude-Code 应用之写书

- [进阶费曼学习法：Claude code 写书](https://zhuanlan.zhihu.com/p/1932021734954997646) 书目全在[github](https://github.com/zsc?tab=repositories)

## Skills 驱动编程

通过 Rules 约束大模型输出，通过 MCP 触达外部业务系统，通过知识库进行私域知识库输入，而通过 Skills 则是为大模型武装上特定技能，配备现实世界所需要的技能，高效解决问题。Skills 是近期 Anthropic 发布了一个新特性——Claude Skills，它的目标，是让 Claude 不再只是一个「能聊天的模型」，而是一个具备可扩展、可执行技能体系的代理式 Agentic AI 工具。

- [Claude官方 Skills](https://github.com/anthropics/skills)

其它有用 skills：
- [内容研究撰稿人](https://github.com/ComposioHQ/awesome-claude-skills/blob/master/content-research-writer/SKILL.md)
- []()

  
## 建站
- NGINX 原生 ACME 支持啦， NGINX 官方发布 ngx_http_acme_module 模块。 参考：[NGINX 原生 ACME 支持：从根本上重塑 TLS 自动化部署](https://sconts.com/post/nginx-native-acme-support/) 

## 开发者

**支付**

- [apple-refund-assistant](https://github.com/seth-shi/apple-refund-assistant) 一个开源的 Web 应用，用于即时处理苹果回传的消费数据，帮助开发者防范欺诈退款。

**登录**

- [casdoor]()
- [草梅 Auth](https://github.com/CaoMeiYouRen/caomei-auth) 基于 Nuxt 框架的登录平台，支持 OAuth2.0 协议，有邮箱、用户名、手机、验证码、社交媒体等多种登录方式。

## AI网关

- [AxonHub](https://github.com/looplj/axonhub) 开源的 AI 网关应用，为不同的 AI 模型提供统一的 API 兼容层，配备 Web 控制面板。

## AI编程
- [Open Lovable](https://github.com/firecrawl/open-lovable) 一个开源的前端应用，使用自然语言生成网站 UI，类似于 V0/Lovable。
- [coro-code](https://github.com/Blushyes/coro-code) Rust 实现的基于终端的 AI 编码代理，Claude Code 的开源替代品。

  
## 开源项目

### 开源复刻
- [Clone-Wars](https://github.com/GorvGoyl/Clone-Wars) 这个仓库收集了各种流行网站（Airbnb, Amazon, Instagram, Netflix, TikTok 等）、流行软件（2048，MsPaint, Mac Finder等）的开源克隆，已经超过100多个网站了。

### 英语学习
- [NCE Flow](https://github.com/luzhenhua/NCE-Flow) 《新概念英语》点读，可以选择任一句开始播放，也可以自动朗读。
- [Type Words](https://github.com/zyronon/TypeWords) 开源的 Web 应用，通过打字学习英语单词，加深记忆，有发音和例句，内置多个常用词库
- [binglish：AI 桌面英语](https://github.com/klemperer/binglish) 一个 Python 脚本，自动为 Windows 更换必应 Bing 每日壁纸，并在壁纸上添加“每日单词”，AI 生成单词解释和例句。

### AI Agent
- [🧠🤖Deep Agents](https://github.com/langchain-ai/deepagents) Deep Agents 是一个 Python 包，它解决了传统 LLM Agent 的一个根本性局限：无法有效规划和执行复杂的多步骤任务。虽然通过工具调用循环的简单 Agent 可以处理基础任务，但它们在面临需要战略规划、任务分解和协调执行的更长期、更复杂的挑战时往往会失败。[基于LangChain实现]
- [CrewAI](https://github.com/crewAIInc/crewAI) CrewAI 是一个多智能体（multi-agent）编排框架，其核心理念是让多个具备特定角色的 AI 代理协同合作（组成“crew”团队）来完成复杂任务。每个代理被赋予特定的角色、目标和背景知识，通过相互分工与配合，自动地进行任务委派和问询，最终以团队形式完成用户交给的工作。 [CrewAI 起初借鉴并构建在 LangChain 生态之上，因而天然支持使用 LangChain 提供的大量工具集合（如搜索、数据库查询、API 接口等)]
- [AgentVerse](https://github.com/OpenBMB/AgentVerse) AgentVerse 是一个综合框架，旨在促进在各种应用中部署多个基于 LLM 的 Agent。该框架提供两种主要范式：任务解决和模拟，使开发者能够创建能够协作解决复杂任务或模拟交互环境的多 Agent 系统。
- [Eino](https://github.com/cloudwego/eino) 字节跳动开源的 AI Agent 框架， Go 实现
- [tRPC-Agent-Go]() 腾讯开源的 AI Agent 框架
- [Agno](https://github.com/agno-agi/agno) 多智能体（multi-agent）框架

### 知识库搭建
- [PandaWiki](https://github.com/chaitin/PandaWiki) PandaWiki 是一款 AI 大模型驱动的开源知识库搭建系统，帮助你快速构建智能化的 产品文档、技术文档、FAQ、博客系统，借助大模型的力量为你提供 AI 创作、AI 问答、AI 搜索 等能力

### 语音ASR
- [Handy](https://github.com/cjpais/Handy) 开源的跨平台桌面应用，用来语音转文本, Rust + ts 实现。支持 ParakeetV3、Whisper 系列模型进行语音识别，但对中文的识别效果较差。
- [IntraScribe](https://github.com/weynechen/intrascribe) 可完全本地化的，面向企业、学校与机关等内网环境的本地优先语音转写与协作平台：支持实时转写、说话人分离、高质量批处理、AI 总结与标题生成。默认提供浏览器 WebRTC 接入与 SSE 实时返回.
- [FlyCut Caption - 智能视频字幕裁剪工具](https://github.com/x007xyz/flycut-caption) 一个基于 Web 的 AI 视频字幕编辑工具，可以视频语音自动转文本，生成字幕

### 语音 TTS
- [index-tts-lora](https://github.com/asr-pub/index-tts-lora) 网友基于 B 站开源的 Index-TTS 语音合成模型的微调模型，提升语音的韵律感和自然度。

### AI视频处理
- [AI视频转录器](https://github.com/wendy7756/AI-Video-Transcriber) AI 视频转录&翻译&总结工具，支持YouTube、Tiktok、B 站等30+平台。代码开源，需要自己搭建前后端。


## 向量存储

- [Milvus](https://github.com/milvus-io/milvus) 高性能、云原生向量 DB。支持内存映射（Mmap）实现对磁盘上大型文件的直接内存访问。
  
## 开源大语言模型

- [gpt-oss](https://github.com/openai/gpt-oss) OpenAI 开源的大语言模型
- [gpt-oss-120b 和 DeepSeek-R1-0528 性能对比](https://www.reddit.com/r/LocalLLaMA/comments/1mifuqk/gptoss120b_outperforms_deepseekr10528_in/)
  
## ASR模型
- [Wisper](https://github.com/openai/whisper) OpenAI开源的语音识别模型， 默认对中文的效果较差，这里有改进介绍：[Whisper对于中文语音识别与转写中文文本优化的实践(Python3.10)](https://www.cnblogs.com/v3ucn/p/17987069)
- [Whisper-Finetune](https://github.com/shuaijiang/Whisper-Finetune) 微调Whisper语音识别模型
- [FunASR](https://github.com/modelscope/FunASR) FunASR是一个基础语音识别工具包，提供多种功能，包括语音识别（ASR）、语音端点检测（VAD）、标点恢复、语言模型、说话人验证、说话人分离和多人对话语音识别等。

## PPT(Slides)制作

- [陈皓-如何做一个有质量的技术分享](https://coolshell.cn/articles/21589.html)

做 slides 有非常多种选择，PowerPoint、Keynote、LaTeX+Beamer、reveal.js、Emacs org-mode、Jupyter Notebook……

### LaTeX + Beamer

#### 1. **Beamer 是什么，为什么用 Beamer？**

LaTeX：基于TeX的排版系统，以代码形式编写文档，擅长数学公式、学术排版。
Beamer：LaTeX的一个宏包，专门用于生成结构化的幻灯片（类似PPT），输出为PDF。Beamer 的主题大方简洁，非常适合用作学术汇报和晋升述职。

一些文档：

- [这是 beamer 的官方主题](https://hartwork.org/beamer-theme-matrix/)
- [overleaf网站提供的 Beamer主题，大多开源](https://www.overleaf.com/latex/templates/tagged/presentation)
- [Beamer Github源码](https://github.com/josephwright/beamer)
- [从零开始用beamer做学术报告幻灯片](https://alexander-qi.github.io/2019/teachbeamer/)
- [技术大佬潘伟洲 的一些课件作品。大多使用 LaTeX + Beamer 制作](https://github.com/wzpan/wzpan.github.io/wiki/slides)

参考：[使用 LaTeX + Beamer 创建PPT](latex/creating-slides-using-LaTeX-Beamer.md)

## 年终总结

- [二〇二三年的年终总结都写好了吗？](https://github.com/saveweb/review-2023)

## 目标管理-GROW模型

GROW模型是一种非常经典且实用的教练式辅导和目标管理工具。它的名字GROW正好代表了其四个核心步骤的首字母:

1. G - Goal（目标）
2. R - Reality（现状）
3. O - Options（方案）
4. W - Will（意愿/行动)

与游戏中 GOAP 算法类比

| GROW模型 | GOAP算法 | 核心类比点 |
| :--- | :--- | :--- |
| **G - Goal（目标）** | **Goal（目标）** | **起点完全一致：** 两者都始于一个清晰定义的、需要达成的目标状态。例如，GROW中的“本月销售额提升10%”对应GOAP中的“生存状态为真”（即“不被饿死”）。 |
| **R - Reality（现状）** | **World State（世界状态）** | **评估系统现状：** 都是对当前所有相关条件的客观评估。GROW评估的是个人/环境的现实情况（如：现有客户资源、时间、技能）；GOAP评估的是游戏世界的当前状态（如：AI是否饥饿、附近是否有食物、工具在哪里）。 |
| **O - Options（方案）** | **Actions（行动）** 及其 **效果** | **生成可能性空间：** GROW是通过头脑风暴列出所有可能的行动方案（如：拜访客户、优化方案、寻求合作）；GOAP是通过一个预设的“行动库”（Action Library）来列举所有可执行的动作（如：`采集苹果`、`生火`、`烤制食物`），每个动作都有前置条件（Preconditions）和效果（Effects）。 |
| **W - Will（意愿/行动）** | **Plan（计划）** | **制定具体执行路径：** GROW是选择最可行的方案并转化为具体的行动计划（下一步做什么、何时做）；GOAP是利用规划器（如A*算法）从所有可能的行动序列中，找出一条从“当前世界状态”到“目标状态”成本最低、最可行的路径。这个路径就是一个具体的、有序的行动计划。 |





