## AI Agent 是什么

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



## LLM的应用架构演进过程

LLM 应用架构演进分四个发展阶段：Prompt阶段，Chain编排阶段，Agent阶段和Multi-Agent阶段。 概括来说就是：

- Prompt阶段是最初级的阶段，人类直接书写提示词提问，获取LLM的回答。这个阶段主要是激活和挖掘LLM的智能，但只停留在对话的阶段。
- Chain编排阶段是通过固定的流程编排，让LLM可以和多种工具组合起来，按流水线执行逻辑流程，从而处理特定的任务。典型代表是采用了文档检索增强生成（RAG）技术构建的聊天应用。这个阶段的优点是稳定性和提效，但缺点是固定的流程编排限制了LLM的能力发挥。
- Agent阶段是通过设定好提示词，准备好工具，由Agent自动化规划流程，完成目标。这个阶段的优点是LLM能够自行思考、规划并调用工具来完成目标，但缺点是模型的负担过重，容易陷入死循环。
- Multi-Agent阶段是将单一Agent分为多个不同领域的专家Agent，它们之间互相合作，从而提高Agent的稳定性和智能。这个阶段的优点是能有效提高智能程度，但缺点是多轮的思考，信息的交互，编程实现起来相对复杂，对LLM的响应速度要求高。




## Agent 如何进化提升认知

- [Agentic Context Engine (ACE)](https://github.com/kayba-ai/agentic-context-engine) Agentic Context Engine (ACE) 是一个革命性框架，它使 AI agents 能够从经验中学习并随时间推移提升性能。基于斯坦福大学和 SambaNova 的研究成果，ACE 通过增量学习实现持续优化策略的三代理系统——且无需微调或训练数据。

## 为什么Agent不Work

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
