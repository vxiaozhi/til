# Coding Agent

## 常见Coding Agent产品

三种形态： CLI 桌面 VSCode插件

### 开源

JS：

- [cline](https://github.com/cline/cline)
- [Roo](https://github.com/RooCodeInc/Roo-Code)
- [CodeBuddy]()
- [trae-agent](https://github.com/bytedance/trae-agent) 字节开源 编程 Agent
- [Qwen Code](https://github.com/QwenLM/qwen-code) 阿里开源：Qwen Code是一款基于Gemini CLI 改造的强大命令行AI工作流工具，特别针对Qwen3-Coder模型进行了优化。它通过先进的代码理解能力、自动化任务处理和智能辅助功能，显著提升您的开发工作效率。
- [Gemini CLI](https://github.com/google-gemini/gemini-cli) Google开源：Gemini CLI 是一款开源人工智能代理，能将 Gemini 的强大功能直接引入您的终端。它提供轻量级的 Gemini 访问方式，让您的指令能以最直接的路径抵达我们的模型。
- [open code](https://github.com/sst/opencode) The open source AI coding agent.
- [ Continue.dev](https://github.com/continuedev/continue) 作为一个开源的AI编码助手，主要以VS Code和JetBrains扩展的形式存在，同时也提供CLI支持[14]。目前在 github 开源项目[44] 上有 30K star（截至2025-11-25）。该工具的核心价值主张是允许用户将任何LLM作为AI编码助手，支持云端和本地模型的灵活配置。其CLI模式可以作为编码Agent在文本用户界面（TUI）中运行，或在无头模式下运行后台Agent.

Python:

- [Aider](https://github.com/Aider-AI/aider) 作为开源CLI AI Agent工具的先驱，由Paul Gauthier开发，其GitHub仓库拥有38.4k星标，表明其在开发者社区中的高度认可[7]。该工具的核心设计理念是与本地文件和Git仓库的紧密协作，支持全仓库感知和多文件编辑功能，这使得它在处理复杂项目结构时具有显著优势。

Go版本:

- [open code](https://github.com/opencode-ai/opencode) A powerful AI coding agent. Built for the terminal.

Rust:

- [Warp](https://github.com/warpdotdev/Warp) 作为一款基于Rust构建的现代化终端，通过AI技术的深度集成重新定义了命令行体验。其AI Agent模式于2024年6月17日发布，目前在 github [42]上有25.3K star（截至2025-11-25）。Warp的设计理念是将LLM直接嵌入终端，以支持多步工作流和复杂任务的自动化执行。
- [Block Goose](https://github.com/block/goose)  是由Block公司（前身为Square）开源团队开发的AI Agent工具，于2024年11月20日发布v1.15.0版本[17]。目前在 github 开源项目[45] 上有 22.4K star。该工具的设计理念是通过在本地机器上运行，为用户提供隐私和控制兼备的自动化任务能力。Goose支持多种语言模型，包括GPT、Sonnet 3.5和Mistral AI等，展现了良好的模型兼容性。
- [OpenAI Codex CLI](https://github.com/openai/codex) Codex CLI 是来自 OpenAI 的强大编程 Agent，在本地计算机上运行，旨在通过智能代码理解、生成和执行能力来增强你的开发工作流程。Codex 采用基于 Rust 的核心架构，并通过 TypeScript SDK 集成实现可扩展性，同时提供交互式和非交互式模式以实现灵活的自动化。

### 商业化

- [Anthropic Claude Code]()
- [CodeBuddy]()
- [Cursor](https://cursor.com/cn/agents)

## Gemini CLI

- [深入解析：Gemini CLI源码解析：Agent与上下文管理实现细节](https://www.cnblogs.com/yjbjingcha/p/19074738)
- [深入AI Agent内核：Google gemini-cli 源码深度解构](https://zhuanlan.zhihu.com/p/1976305837011116648)
  
## Claude Code

Spec 编程本质是基于 [claude-code](https://github.com/anthropics/claude-code) 的 Command 机制实现的， 这里介绍更多 Claude command 相关资料：

- [claude-code 使用指南](https://github.com/zebbern/claude-code-guide)
- [What makes Claude Code so damn good (and how to recreate that magic in your agent)!?](https://minusx.ai/blog/decoding-claude-code/)  是什么让Claude Code如此出色（以及如何在你的智能体中重现这种魔力）？！
- [我的 Claude Code 实战经验：深度使用每个功能 [译]](https://www.ginonotes.com/posts/how-i-use-every-claude-code-feature)
- [掌握 Claude Code / 命令：让 AI 成为你的开发利器](https://feisky.xyz/posts/2025-07-01-claude-code-slash-command/)
- [awesome-claude-code](https://github.com/hesreallyhim/awesome-claude-code) 这是一份精选列表，包含斜杠命令、CLAUDE.md文件、命令行工具及其他资源与指南，旨在提升您的Claude代码工作流效率、生产力及使用体验。
- [SuperClaude_Framework](https://github.com/SuperClaude-Org/SuperClaude_Framework) SuperClaude是一个元编程配置框架，通过行为指令注入与组件编排技术，将Claude代码转化为结构化开发平台。该框架配备强大工具与智能代理，能够提供系统化的工作流自动化解决方案。
- [claude-code-subagents-collection](https://github.com/davepoon/claude-code-subagents-collection) Claude Code专属AI子代理与斜杠指令全集，集成领域专家知识与强大自动化功能，全面提升开发工作流效率。
- [Claude Code Slash Commands](https://github.com/wshobson/commands) 一套专为Claude Code打造的生产级斜杠命令全集，为现代软件开发提供智能自动化与多智能体编排能力。
- [Claude-Command-Suite](https://github.com/qdhenry/Claude-Command-Suite) Claude Command Suite是一款开发工具包，提供148+条斜杠命令、54个AI智能体、Claude代码技能以及面向软件工程任务的自动化工作流。该套件通过结构化、可重复的工作流程，覆盖代码审查、测试部署、业务场景建模及GitHub-Linear同步等功能。

### 逆向

- [Claude Code 逆向工程研究仓库](https://github.com/shareAI-lab/analysis_claude_code) 使用 Claude code 对其自身进行逆向工程分析，附分析的全部提示词。
- [这是一个 Claude Code 的逆向工程](https://github.com/Yuyz0112/claude-code-reverse) 通过 Monkey Patch API 请求代码，拿到 Claude Code 最终与 LLM API 交互的 request 和 response，整体分析了 Claude Code 的执行流程 [项目提供了一个交互式可视化工具，用于体验逆向分析结果](https://yuyz0112.github.io/claude-code-reverse/visualize.html)

### 斜杠命令（command）

- [提交 Git 代码](https://github.com/evmts/tevm-monorepo/blob/main/.claude/commands/commit.md)
- [分析代码结构与目的，以创建详细文档](https://github.com/jerseycheese/Narraitor/blob/feature/issue-227-ai-suggestions/.claude/commands/create-docs.md)
- [生成全面的架构文档](https://github.com/davepoon/claude-code-subagents-collection/blob/main/subagents/architect-review.md)
- [act 参考](https://github.com/davepoon/claude-code-subagents-collection/blob/main/commands/act.md)
- [列出所有工具](https://github.com/davepoon/claude-code-subagents-collection/blob/main/commands/all-tools.md)
- [审查并优化系统架构](https://github.com/davepoon/claude-code-subagents-collection/blob/main/commands/architecture-review.md)
- [设置持续集成流水线](https://github.com/davepoon/claude-code-subagents-collection/blob/main/commands/ci-setup.md)
- [解释代码](https://github.com/davepoon/claude-code-subagents-collection/blob/main/commands/explain-code.md)
- [提示词优化](https://github.com/wshobson/commands/blob/main/tools/prompt-optimize.md)

### Claude Skill

- [DrawIO-Skill: 创建专业的draw.io（diagrams.net）图表，采用XML格式（.drawio文件），集成PMP/PMBOK方法论、丰富的视觉资源库及行业标准专业模板。](https://github.com/jgtolentino/insightpulse-odoo/blob/main/docs/claude-code-skills/community/drawio-diagrams-enhanced/SKILL.md)
- [claude-scientific-skills](https://github.com/K-Dense-AI/claude-scientific-skills)  Claude Scientific Skills 集合——这是一个全面的工具包，旨在将 Claude Code 转换为桌面端强大的"AI 科学家"。该仓库提供了即用型技能，涵盖生物信息学、化学信息学、结构生物学、机器学习和科学计算等领域，使你能够通过自然语言命令执行复杂的多步骤科学工作流程。

### Claude code 技巧

如何写一份好的 CLAUDE.md 文件 [writing-a-good-claude-md](https://www.humanlayer.dev/blog/writing-a-good-claude-md) ：

- CLAUDE.md 旨在帮助 Claude 熟悉您的代码库。它应阐明项目的核心理念（WHY）、核心内容（WHAT）和实现方式（HOW）。
- 指令宜精不宜多。在确保必要指引不缺失的前提下，文件中的指令应尽可能精简。
- 保持 CLAUDE.md 内容简洁且具有普适性。
- 采用渐进式披露原则——无需一次性告知 Claude 所有潜在信息，而应指导其如何查找关键信息，使其仅在需要时能自主获取并运用，从而避免上下文窗口或指令数量过度膨胀。
- Claude 并非代码检查工具。请使用专业的代码检查器和格式化工具，并根据需要合理利用 Hooks、斜杠命令等其他功能。
- CLAUDE.md 是项目引导机制中最高效的切入点，因此请避免自动生成此文件。为获得最佳效果，您应当精心设计其内容。


其他：

- [关于 Claude 对国家限制，使用claude-code-router]( https://github.com/musistudio/claude-code-router)
- [命令行体验差？使用 Claude Code for VS Code](https://marketplace.visualstudio.com/items?itemName=anthropic.claude-code)

### Claude Code 接入 GLM4.6

- [智谱 API Key](https://www.bigmodel.cn/usercenter/proj-mgmt/apikeys)
- [智谱官方的 claude code 接入指引](https://docs.bigmodel.cn/cn/coding-plan/tool/claude)

注意：当前支持到 2.0.14， 最新版本 2.0.17 测试会出错。 

```
# 检查当前版本
claude --version

2.0.14 (Claude Code)
```

### Codex接入 GLM

1. 编辑 ~/.codex/config.toml:

```
model = "GLM-4.7"
model_provider = "glm"

[model_providers.glm]
name = "GLM"
base_url = "https://open.bigmodel.cn/api/coding/paas/v4"
env_key = "GLM_API_KEY"
wire_api = "chat"
query_params = {}
```

2. 配置环境变量：

```
export GLM_API_KEY=xxx
```

### Claude-Code 应用

- [这个工具使用 AI 改写以前的 git 提交信息，让其变得更准确详细。](https://github.com/f/git-rewrite-commits)
- [进阶费曼学习法：Claude code 写书](https://zhuanlan.zhihu.com/p/1932021734954997646) 书目全在[github](https://github.com/zsc?tab=repositories)

### Claude-Code 配置实践

- [everything-claude-code](https://github.com/affaan-m/everything-claude-code) 完整Claude代码配置合集 - 智能体、技能、钩子、命令、规则与MCP。来自Anthropic黑客马拉松获胜者的实战验证配置方案。
