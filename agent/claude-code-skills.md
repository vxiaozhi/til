# Claude Code Skills

Skills 是近期 Anthropic 发布了一个新特性——Claude Skills，它的目标，是让 Claude 不再只是一个「能聊天的模型」，而是一个具备可扩展、可执行技能体系的代理式 Agentic AI 工具。

Anthropic Skills，旨在通过提供领域特定的专业知识、工作流程、上下文和最佳实践，将通用型 AI 代理转变为特定任务的专家。Skills 的核心在于其可重用、基于文件系统的资源包，能够让 Claude 按需加载所需信息，从而避免了在每次对话中重复提供相同指导的低效性。

Skills 的主要功能特性包括：

- 专业化能力：Skills 允许用户为 Claude 定制特定领域的专业能力，使其在处理特定任务时表现更出色，例如处理 Excel 表格、创建 PowerPoint 演示文稿、撰写 Word 文档或填写 PDF 文件 [1]。
- 减少重复：通过将指令、脚本和资源打包成 Skills，可以避免在不同对话中重复输入相同的指导，实现“一次创建，自动使用” [1]。
- 可组合性：Skills 可以像乐高积木一样进行组合，以构建复杂的自动化工作流程，从而实现更高级别的任务处理能力 [1]。
- 高效性：Skills 采用渐进式披露机制，仅在 Claude 认为相关时才加载最少的信息和文件，从而保持了 Claude 的运行速度，并有效管理了上下文窗口的成本 [1]。
- 可执行代码支持：Skills 可以包含可执行代码（如 Python 脚本），用于处理传统编程更可靠的任务，而非仅仅依赖于语言模型的文本生成能力，这为复杂逻辑的实现提供了确定性可靠性 [2]。
- 版本控制与管理：通过 /v1/skills API 端点，开发者可以对自定义 Skills 进行版本控制和管理，确保工作流程的稳定性和可追溯性 [3]。


Skills 相关仓库：

- [Claude官方 Skills](https://github.com/anthropics/skills)
- [Claude官方 Skills 对应的中文版本](https://github.com/vxiaozhi/Claude_skills_zh-CN)

其它有用 skills：

- [内容研究撰稿人](https://github.com/ComposioHQ/awesome-claude-skills/blob/master/content-research-writer/SKILL.md)

支持 skills 的 Agent 框架：

- [trpc-agent-go](https://github.com/trpc-group/trpc-agent-go/blob/main/docs/mkdocs/zh/skill.md)

##  技术架构和工作原理（三级渐进式披露机制）

Anthropic Skills 的技术架构核心是其“渐进式披露”（Progressive Disclosure）机制，旨在优化 token 消耗并延迟信息加载，直到真正需要时才进行。Skills 在 Claude 的虚拟机（VM）环境中运行，每个 Skill 都是 VM 上的一个目录，允许 Claude 使用 bash 命令和执行代码。

Skill 架构遵循渐进式披露设计原则(Progressive Disclosure Design Principle)，在保持可访问性的同时优化上下文使用。该系统在三个不同的加载级别上运行：

- 元数据层 - 始终可用（约 100 个词），包含技能的名称和描述
- 指令层 - 在技能触发时加载（<5k 个词），包含核心 SKILL.md 内容
- 资源层 - 按需加载，包含捆绑的资源、脚本和引用

这种分层架构使得 Anthropic Skills 能够高效地管理上下文窗口，按需加载知识，并通过代码执行提供确定性可靠性，从而将通用模型专业化，并支持复杂工作流的构建。

## Skill_Seekers

- [Skill_Seekers](https://github.com/vxiaozhi/Skill_Seekers)

修复 log 问题：https://github.com/yusufkaraaslan/Skill_Seekers/pull/187/commits/4137c737a0194f5436bba65d71c7e176a30689b6

```
uv build
uv tool install .
```

## 自定义 Skills 实践

### 1. md-to-ppt-outline_PPT大纲生成

```
创建一个新技能：读取当前项目下所有 md 文件，生成 ppt 中文大纲，技能指令文件也用中文
```

生成的技能：https://github.com/vxiaozhi/Claude_skills_zh-CN/tree/main/md-to-ppt-outline_PPT%E5%A4%A7%E7%BA%B2%E7%94%9F%E6%88%90


### 2. proto-generator_需求生成Protobuf

生成的技能： https://github.com/vxiaozhi/Claude_skills_zh-CN/tree/main/proto-generator_%E9%9C%80%E6%B1%82%E7%94%9F%E6%88%90Protobuf


