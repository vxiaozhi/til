# til
📝 Today I Learned

建立本仓库动机参考了： [jbranchaud/til](https://github.com/jbranchaud/til)

## 目录

## Go语言

- [rpcx](https://github.com/smallnest/rpcx) Go语言呢实现的微服务 RPC 框架，类似于阿里巴巴的 Dubbo 和微博的 Motan。序列化支持，JSON, Protobuf, MessagePack, 原始字节。服务发现支持：	对等网络（点对点）, zookeeper, etcd, consul, mDNS。

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

## AIAgent

**LLM的应用架构演进过程**

LLM 应用架构演进分四个发展阶段：Prompt阶段，Chain编排阶段，Agent阶段和Multi-Agent阶段。 概括来说就是：

- Prompt阶段是最初级的阶段，人类直接书写提示词提问，获取LLM的回答。这个阶段主要是激活和挖掘LLM的智能，但只停留在对话的阶段。
- Chain编排阶段是通过固定的流程编排，让LLM可以和多种工具组合起来，按流水线执行逻辑流程，从而处理特定的任务。典型代表是采用了文档检索增强生成（RAG）技术构建的聊天应用。这个阶段的优点是稳定性和提效，但缺点是固定的流程编排限制了LLM的能力发挥。
- Agent阶段是通过设定好提示词，准备好工具，由Agent自动化规划流程，完成目标。这个阶段的优点是LLM能够自行思考、规划并调用工具来完成目标，但缺点是模型的负担过重，容易陷入死循环。
- Multi-Agent阶段是将单一Agent分为多个不同领域的专家Agent，它们之间互相合作，从而提高Agent的稳定性和智能。这个阶段的优点是能有效提高智能程度，但缺点是多轮的思考，信息的交互，编程实现起来相对复杂，对LLM的响应速度要求高。

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

**实践**

GitHub 官方发布了 Spec-Kit 实现规约编程的开源工具并引发广泛关注，源代码见： https://github.com/github/spec-kit 。主要命令：

- /constitution - 建立项目宪法：定义项目核心原则、技术约束、质量标准
- /specify - 写需求文档：自然语言描述功能需求、AI 自动生成完整规约、质量检测清单与验证
- /clarify - 澄清规约：进行用户需求澄清细节、确认
- /plan - 做技术方案：生成技术栈选型、架构设计、数据模型、API 契约
- /tasks - 任务分解清单：按照用户故事组织、依赖关系分析、并行执行优化
- /analyze - 审核文档: 识别spec.md`、`plan.md`、`tasks.md 不一致性、操作约束、规范分析报告、提供建议与修复
- /implement - 开始干活：逐任务自动执行、进度跟踪、质量验证
 
其中最关键的 4 个指令是：/specify、/plan 、/tasks 、/implement 指令。


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

## ASR模型
- [Wisper](https://github.com/openai/whisper) OpenAI开源的语音识别模型， 默认对中文的效果较差，这里有改进介绍：[Whisper对于中文语音识别与转写中文文本优化的实践(Python3.10)](https://www.cnblogs.com/v3ucn/p/17987069)
- [Whisper-Finetune](https://github.com/shuaijiang/Whisper-Finetune) 微调Whisper语音识别模型
- [FunASR](https://github.com/modelscope/FunASR) FunASR是一个基础语音识别工具包，提供多种功能，包括语音识别（ASR）、语音端点检测（VAD）、标点恢复、语言模型、说话人验证、说话人分离和多人对话语音识别等。
