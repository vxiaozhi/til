# Agent 上下文

Context Engineering（上下文工程），本质上就是我们在充当翻译官，把人类习惯的高熵表达，转化为机器能理解的低熵指令。

在 Context Engineering 2.0（[2510.26493] Context Engineering 2.0: The Context of Context Engineering） 这篇论文中，作者给出了一个更具哲学意味的定义：

Context Engineering 是设计与优化上下文的收集、存储、管理与使用的系统性过程，旨在弥合人类（碳基智能）与机器（硅基智能）之间的认知差距（Cognitive Gap）。

Context Engineering 2.0 提出了一个核心观点：上下文工程本质上是一个“熵减过程”。

## 相关Paper

- [Context Engineering 2.0: The Context of Context Engineering](https://arxiv.org/abs/2510.26493)
- [Memory in the Age of AI Agents: A Survey](https://arxiv.org/pdf/2512.13564)
- [Li Z, Song S, Xi C, et al. Memos: A memory os for ai system[J]. arXiv preprint arXiv:2507.03724, 2025]()
- [Chhikara P, Khant D, Aryan S, et al. Mem0: Building production-ready ai agents with scalable long-term memory[J]. arXiv preprint arXiv:2504.19413, 2025.]()
- [Xu W, Liang Z, Mei K, et al. A-mem: Agentic memory for llm agents[J]. arXiv preprint arXiv:2502.12110, 2025.]()

## 谷歌发布AI“大统一理论”

- [paper: Mathematical Framing for Different Agent Strategies](https://arxiv.org/abs/2512.04469)
- [解读视频](https://www.youtube.com/watch?v=KeJ7iK4n8g8&list=PL9HLkww_4B5G0hEWEfOtPf5rMTdjgm-1h&index=7) 这不仅仅是一篇技术论文，更是一张 AI 工程化的“元素周期表”。我们将揭秘谷歌如何用 5 个数学旋钮（C, F, S, A, U）重构 AI 开发，以及“架构编译”时代将如何彻底改变我们与 AI 的协作方式。
  
## Agentic Context Engineering: Evolving Contexts for Self-Improving Language Models

- [Agentic Context Engineering: Evolving Contexts for Self-Improving Language Models](https://arxiv.org/abs/2510.04618)

大型语言模型（LLM）应用，如智能体和领域特定推理系统，正日益依赖上下文适应技术——即通过指令、策略或证据调整输入内容，而非更新模型权重。现有方法虽提升了可用性，却常受限于简洁性偏差（为追求简明摘要而丢失领域洞察）和上下文坍缩问题（迭代重写导致细节随时间流失）。基于动态速查表提出的自适应记忆机制，我们推出ACE框架（Agentic Context Engineering），将上下文视为持续演进的“战术手册”，通过模块化的生成、反思与整理流程积累、优化并组织策略。ACE采用结构化增量更新机制防止信息坍缩，在保留详细知识的同时适配长上下文模型。在智能体与领域特定基准测试中，ACE能同时优化离线场景（如系统提示）和在线场景（如智能体记忆），各项指标均显著超越基线：智能体任务提升10.6%，金融领域任务提升8.6%，同时大幅降低适应延迟与部署成本。值得注意的是，ACE无需标注监督即可实现有效适应，仅依靠自然执行反馈进行优化。在AppWorld排行榜上，使用较小开源模型的ACE在整体平均分上与顶级生产级智能体持平，并在更高难度的测试挑战集中实现反超。这些成果表明：全面且持续演进的上下文能够构建可扩展、高效率、具备自我进化能力且低开销的LLM系统。

## 其它

- [anthropic的文章： Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)
