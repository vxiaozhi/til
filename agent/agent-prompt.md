## Prompt的设计

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
