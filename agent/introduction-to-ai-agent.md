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
