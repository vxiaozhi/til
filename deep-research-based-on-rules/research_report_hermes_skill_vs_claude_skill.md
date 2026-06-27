# Hermes Skill 与 Claude Code Skill 对比研究 & CLAUDE.md 对标分析

## Executive Summary

Hermes Agent 是 Nous Research 开发的开源 AI Agent 框架（MIT 协议，204K+ GitHub Stars），其 Skill 系统与 Claude Code 的 Skill 系统均遵循 agentskills.io 开放标准，使用完全相同的 SKILL.md 文件格式，技能文件可在两者间直接迁移。核心差异在于：Hermes 的 Skill 具备自进化能力——Agent 完成复杂任务后自动将经验蒸馏为技能文件，而 Claude Code 的 Skill 需用户手动编写。在项目级配置文件层面，CLAUDE.md 在 Hermes 体系中的直接对标文件是 .hermes.md（或 HERMES.md），优先级最高；同时 Hermes 也原生支持直接读取 CLAUDE.md 文件，因此已有 Claude Code 项目可无缝迁移。

## 背景

随着 AI 编程助手在 2025-2026 年的爆发式增长，技能（Skill）系统成为区分不同 Agent 框架的关键架构设计。Claude Code 作为 Anthropic 官方的 AI 编程助手，Hermes Agent 作为 Nous Research 主导的开源 Agent 框架，两者在技能系统的设计理念上存在显著差异，代表了"手动策展"与"自动进化"两种不同技术路线。理解两者的异同，有助于团队在技术选型和配置迁移时做出合理决策。

## Hermes Agent 概述

Hermes Agent 由 Nous Research 开发并开源，是一个具备自我进化能力的 AI Agent 框架。其 GitHub 仓库拥有超过 204K Stars、36.7K Forks，代码以 Python 为主（约 82%），TypeScript 为辅（约 14%），另有少量 JavaScript、Shell 等。截至 2026 年 6 月，最新版本为 v0.17.0（发布于 2026 年 6 月 19 日），总计超过 13,000 次提交。

Hermes 的核心定位是"随你一起成长的 Agent"——它不仅是一个编程助手，更是一个持久化运行的、具备跨会话记忆和自我改进能力的个人 AI 助手。其运行环境覆盖从 5 美元 VPS 到 GPU 集群的完整频谱，支持 CLI、Telegram、Discord、Slack、WhatsApp、Signal 等 20 余种交互平台。Hermes 还提供六种终端后端（本地、Docker、SSH、Singularity、Modal、Daytona），并具备 Cron 定时任务、子代理并行执行、FTS5 全文搜索记忆等高级功能。

## Claude Code 概述

Claude Code 是 Anthropic 官方推出的 AI 编程助手，以 TypeScript 编写的 CLI 工具形式存在，核心定位是交互式编码。它运行在终端或 IDE 中，提供模型切换、权限管理、上下文压缩、子代理委派、工作树隔离、计划模式等功能。Claude Code 的配置体系包括六种配置方式：CLAUDE.md（项目级指令）、Rules（作用域规则）、Skills（技能文件）、Hooks（生命周期钩子）、Memory（自动记忆）、Subagents（子代理定义）。

## Skill 系统对比

### 共同基础：agentskills.io 开放标准

两者最关键的共同点是均遵循 agentskills.io 开放标准。该标准定义了 SKILL.md 文件的规范格式：以 YAML frontmatter（`---` 开头和结尾）声明元数据，后接 Markdown 正文描述技能指令。必填字段仅为 name（小写连字符，不超过 64 字符）和 description（不超过 1024 字符）。可选字段包括 version、author、license、platforms、compatibility 及任意的 metadata 键值映射。

遵循此标准的工具还包括：Codex CLI（OpenAI）、Cursor、Gemini CLI、GitHub Copilot、Windsurf、OpenClaw 等 20 余个 AI 编程代理。这意味着按照 agentskills.io 规范编写的技能文件可在不同代理之间直接使用，无需格式转换。

### 技能目录结构

两者的技能目录结构高度一致：

```
技能名称/
├── SKILL.md          # 必需：元数据 + 指令
├── scripts/          # 可选：可执行脚本
├── references/       # 可选：参考文档
├── templates/        # 可选：模板文件
└── assets/           # 可选：其他资源
```

Claude Code 的技能存放在 `.claude/skills/` 目录下，Hermes 的技能存放在 `~/.hermes/skills/` 目录下（用户级）或仓库内的 `skills/` 目录下（项目级）。

### 加载机制对比

两者均采用渐进式披露（Progressive Disclosure）的三级加载策略，以最小化 token 消耗：

Claude Code：第一层在启动时仅加载技能名称和描述（约 100 tokens）；第二层在技能被触发时加载完整的 SKILL.md 正文（建议控制在 5,000 tokens 以内）；第三层按需加载 scripts 目录中的脚本——脚本通过 bash 直接执行，不会注入到上下文中。在上下文压缩时，已加载的技能会被重新附加（每个技能 5,000 tokens，共享 25,000 tokens 预算）。

Hermes Agent：第一层通过 skills_list() 返回所有可用技能的名称、描述、分类和标签（约 3,000 tokens）；第二层通过 skill_view(name) 加载完整的 SKILL.md 内容；第三层通过 skill_view(name, path) 获取特定的引用文件、模板或脚本。Hermes 额外支持技能捆绑（Skill Bundles）——通过 YAML 文件将多个技能归组到单个斜杠命令下一次性接收。

### 核心差异：技能来源与生命周期

这是两者最本质的区别。

Claude Code 的技能完全依赖手动创建。用户需要自行编写 SKILL.md 文件，将其放置到 `.claude/skills/` 目录下。技能的安装来源包括：从 GitHub 仓库（如 anthropics/skills）直接安装，或从 Claude 技能市场获取。技能的质量完全取决于编写者的投入，没有自动化创建或更新机制。

Hermes Agent 的技能具备完整的自进化生命周期。Agent 完成复杂任务（触发条件：5 次以上工具调用）后，会自动将执行轨迹蒸馏为技能文件。当技能存在错误或遗漏步骤时，Agent 通过模糊匹配自动修补。用户可以通过 `/learn` 命令直接让 Agent 从文档、URL 或口头描述中生成符合标准的技能。v0.16 版本后还引入了 Curator 后台进程，自动为技能打分、合并重复项、归档过时技能。技能写入支持审批门控（write_approval），用户可通过 `/skills pending`、`/skills diff`、`/skills approve/reject` 工作流审阅。在实际案例中，有用户报告在 2 小时内自动生成了 3 个技能，在相似任务上实现了 40% 的速度提升。

Hermes 技能还支持条件激活逻辑，通过 metadata.hermes 命名空间下的 requires_toolsets、fallback_for_toolsets、requires_tools、fallback_for_tools 字段，根据当前可用的工具集和平台（macOS/Linux/Windows）动态决定技能的可见性和行为。

### 安全机制对比

Claude Code 的技能安全主要依赖用户自行审核技能内容，因为技能由用户手动安装或编写。

Hermes Agent 的技能安全机制更为完善。Agent 创建的所有技能都会经过内置安全扫描器检查（覆盖 90 多种威胁模式），写入时采用原子写入并支持扫描失败时回滚。安全扫描同时在 Memory 和 Skill 内容上进行提示注入防御。此外还有 SkillsGuard 等第三方安全扫描产品专门针对 Hermes 技能包进行静态安全审计。这也是 Hermes 自进化模式带来的天然需求——既然技能由 Agent 自动生成，就需要额外的安全网。

## CLAUDE.md 与 Hermes 文件体系对标

### 项目级配置文件

CLAUDE.md 是 Claude Code 的项目级配置文件，用于向 AI 提供项目上下文、编码规范、工作流指令等持久化信息。CLAUDE.md 文件放置在项目根目录或 `.claude/` 子目录下，AI 在每次会话启动时自动读取。CLAUDE.md 也支持全局版本（`~/.claude/CLAUDE.md`），用于跨项目的用户偏好设置。

Hermes Agent 采用优先级机制从多个候选文件中选择一个项目级上下文文件加载（"先匹配先生效"原则），优先级从高到低依次为：

1. **.hermes.md 或 HERMES.md**（第一优先级）——Hermes 原生的项目指令文件，发现方式为从当前工作目录向上遍历至 Git 根目录。这是 CLAUDE.md 在 Hermes 体系中的直接对标文件，功能完全等价。
2. **AGENTS.md**（第二优先级）——通过递归目录遍历逐级发现，支持子目录级别的渐进式规则覆盖，类似于 Claude Code 的 Rules 系统。
3. **CLAUDE.md**（第三优先级）——仅在当前工作目录扫描，不超过 20,000 字符，含注入扫描。这意味着 Hermes 原生支持直接读取 CLAUDE.md 文件，已有 Claude Code 项目无需任何修改即可被 Hermes 识别。
4. **.cursorrules 及 .cursor/rules/*.mdc**（第四优先级）——Cursor IDE 的规则文件，同样仅限当前工作目录。

### 全局配置与人格文件

Claude Code 的全局用户偏好通过 `~/.claude/CLAUDE.md` 表达，而 Hermes 将这一职责拆分为两个独立文件：

**SOUL.md**（位于 `~/.hermes/SOUL.md`）是 Agent 的人格与身份文件，占据系统提示的第一号槽位（slot #1），加载顺序优先于一切项目级配置。它定义了 Agent 的角色定位、行为准则和交流风格，与项目指令在概念上做了清晰分离。SOUL.md 始终独立加载，不受项目级上下文文件优先级机制的影响。

**USER.md**（位于 `~/.hermes/memories/USER.md`）存储用户画像和偏好设置，容量上限约 1,375 字符（约 500 tokens），属于持久化记忆的一部分。

### 记忆系统对标

Claude Code 的自动记忆（Auto Memory）功能将记忆文件存储在 `~/.claude/projects/<project-id>/memory/` 目录下，通过 MEMORY.md 索引文件管理，每次会话加载前 200 行内容。记忆类型包括用户画像、反馈记录、项目信息和外部参考。

Hermes 的记忆系统位于 `~/.hermes/memories/` 目录，包含两个核心文件：MEMORY.md（Agent 记住的关于用户、项目、环境的持久事实，上限约 2,200 字符 / 800 tokens）和 USER.md（用户画像，上限约 1,375 字符 / 500 tokens）。Hermes 记忆采用有界策展策略——非无限增长，超出限制时采用截断（头部保留 70%，尾部保留 20%）。记忆注入到系统提示的 volatile 层，每次会话重建。

一个关键架构差异是：Hermes 的记忆在会话中途写入时只更新磁盘文件，不会实时更新已构建的系统提示；Claude Code 的自动记忆则支持会话内即时生效。

### 规则系统对标

Claude Code 的 Rules 系统通过 `.claude/rules/` 目录下的 Markdown 文件实现，每个文件包含 YAML frontmatter 声明作用域（通过 glob 模式匹配文件路径），支持 alwaysApply 和 enabled 开关。

Hermes 通过子目录 AGENTS.md 文件的渐进式发现实现类似功能——在项目目录树中，每个子目录可以包含自己的 AGENTS.md 文件，当 Agent 进入该目录时自动加载对应规则。这与 Claude Code Rules 的 glob 匹配模式在设计思路上类似，但实现方式不同。

### 完整对标总结表

Claude Code 配置体系与 Hermes Agent 配置体系的完整对应关系如下：

| Claude Code | Hermes Agent | 说明 |
|---|---|---|
| CLAUDE.md（项目级） | .hermes.md / HERMES.md | 项目指令与规范，Hermes 优先级最高 |
| ~/.claude/CLAUDE.md（全局） | ~/.hermes/SOUL.md + memories/USER.md | 全局的人格、偏好和行为准则，Hermes 拆分管理 |
| .claude/skills/ | ~/.hermes/skills/ | 技能目录，均遵循 agentskills.io 标准 |
| .claude/rules/ | 子目录 AGENTS.md | 作用域规则，Hermes 通过目录级渐进发现 |
| .claude/settings.json | ~/.hermes/config.yaml | 通用设置（模型、工具集、权限等） |
| .claude/agents/ | Kanban + Profiles | 子代理配置，Hermes 通过 Profile 和 Kanban 实现多代理编排 |
| .claude/hooks/ | Hooks（config.yaml 内配置） | 生命周期钩子 |
| ~/.claude/projects/*/memory/ | ~/.hermes/memories/ | 持久化记忆存储 |
| Memory（自动记忆） | MEMORY.md + USER.md | 跨会话记忆，Hermes 采用有界策展策略 |

## 技术架构的深层差异

### 代理循环

Claude Code 本身是代理循环的宿主——它不拥有自己的代理循环，而是在 Anthropic API 的请求-响应循环中运行，由外部系统管理会话状态和工具调用调度。

Hermes Agent 拥有自己的代理循环（run_agent.py），是一个完整的自循环系统。它管理自己的工具调用、技能激活、记忆读写和上下文压缩。这种架构使 Hermes 能够运行在无头模式下（Gateway 模式），作为持久化后台服务持续运行，而 Claude Code 更适合交互式会话。

### 上下文压缩

Claude Code 采用服务端压缩方案——通过 Context Compaction API（compact-2026-01-12 头）将压缩工作完全卸载到 Anthropic 服务器端。用户只需设置一个 token 阈值参数，无需管理压缩的具体实现。压缩过程对用户不透明，无法检查和干预。

Hermes 采用客户端双层压缩方案：第一层是 Agent 端压缩器（context_compressor.py），默认在上下文窗口达到 50% 时触发；第二层是 Gateway 会话卫生层，在 85% 时触发，作为安全网。整个压缩过程分为四个阶段：裁剪旧工具结果、确定压缩边界、生成结构化摘要、重组压缩消息。Hermes 的压缩器完全开源且可配置（阈值、目标比例、保护消息数、辅助模型等），但也因此存在几个已知的生产环境故障模式：静默摘要丢失（JSON 解析失败时）、工具排序崩溃（API 400 错误）、以及防抖动永久锁定（无超时或衰减机制，一旦触发就持续锁定至 /new）。

两种方案各有优劣：Hermes 提供灵活性和可见性，代价是复杂度和可靠性风险；Claude Code 提供简洁性和可靠性，代价是零控制权和完全不透明。

### 模型支持与生态系统

Claude Code 主要支持 Anthropic 的 Claude 模型系列（Opus、Sonnet、Haiku），同时也通过第三方渠道支持部分外部模型。

Hermes Agent 支持极其广泛的模型供应商生态，包括：Nous Portal、OpenRouter（200 多个模型）、OpenAI、Anthropic、Google Gemini、Hugging Face、NVIDIA NIM、xAI Grok、DeepSeek、Kimi Coding、MiniMax、Xiaomi MiMo、Alibaba Qwen 等 20 多个供应商。用户可以通过 `hermes model` 命令灵活动态切换模型。此外 Hermes 支持 Prompt Caching（对多个供应商）、推理力度调节、工具使用强制执行等高级模型控制能力。

## 分析与总结

Claude Code 和 Hermes Agent 并非直接竞品，而是定位不同、优势互补的两个工具。Claude Code 专精于交互式编码场景——在对代码质量要求高、需要人类审查和实时决策的开发任务中表现最优。Hermes Agent 专精于自主化、持久化运行场景——在需要跨会话记忆、自动经验积累、后台持续运行的任务中表现出色。

在 Skill 系统层面，两者的技能文件完全互通。同一个 SKILL.md 文件放在 Claude Code 的 `.claude/skills/` 目录下能被 Claude Code 使用，放在 Hermes 的 `~/.hermes/skills/` 目录下能被 Hermes 使用，放在 Codex CLI 的 `~/.agents/skills/` 目录下也能被 Codex CLI 使用。这种互操作性得益于 agentskills.io 开放标准的广泛采纳，是 AI 编程工具生态走向标准化的积极信号。

在项目配置文件层面，如果你已有使用 CLAUDE.md 配置的 Claude Code 项目，迁移到 Hermes 时的路径非常直接：Hermes 原生支持读取 CLAUDE.md 作为项目上下文（优先级第三），无需任何修改即可被识别。如果想要充分利用 Hermes 的原生特性（如从 Git 根目录向上遍历发现机制），可以将 CLAUDE.md 重命名为 .hermes.md 或 HERMES.md，这样 Hermes 会以最高优先级加载。同时，如果有全局用户偏好或 Agent 人格定义的需求，可以将内容拆分到 SOUL.md（人格定义）和 memories/USER.md（用户偏好）中。

社区中已经出现了将两个生态桥接的项目，如 claude-self-improving-skills 项目将 Hermes 风格的技能自进化能力移植到 Claude Code，以及 OpenSkills 项目让 Cursor、Windsurf、Aider 等不支持 Skill 工具调用的编程助手也能使用 Claude Code Skills 格式。

## 结论

Hermes Skill 与 Claude Code Skill 的共同基础是 agentskills.io 开放标准，两者的 SKILL.md 文件格式完全相同、可互通使用。核心区别在于技能的生命周期管理：Claude Code 走手动策展路线，技能由用户编写和维护；Hermes 走自动进化路线，技能由 Agent 从执行经验中自主生成和持续优化。CLAUDE.md 在 Hermes 体系中的直接对标文件是 .hermes.md（或 HERMES.md），同时 Hermes 也原生兼容直接读取 CLAUDE.md。整体而言，这两个系统可以看作同一开放标准下的两种不同实现哲学——一个偏重人工精准控制，一个偏重自动化持续演进。

## 参考文献

1. [NousResearch/hermes-agent - GitHub](https://github.com/NousResearch/hermes-agent)
2. [Hermes Agent Official Documentation](https://hermes-agent.nousresearch.com/docs)
3. [Hermes Agent - Context Files](https://hermes-agent.nousresearch.com/docs/user-guide/features/context-files/)
4. [Hermes Agent - Skills System](https://hermes-agent.nousresearch.com/docs/user-guide/features/skills/)
5. [Hermes Agent - Creating Skills](https://hermes-agent.nousresearch.com/docs/developer-guide/creating-skills)
6. [Hermes Agent - Configuration](https://hermes-agent.nousresearch.com/docs/user-guide/configuration)
7. [Hermes Agent - Prompt Assembly](https://hermes-agent.nousresearch.com/docs/developer-guide/prompt-assembly/)
8. [Priority-based context file selection + CLAUDE.md support - PR #2301](https://github.com/NousResearch/hermes-agent/pull/2301)
9. [Feature: Project Context System - Issue #502](https://github.com/NousResearch/hermes-agent/issues/502)
10. [agentskills.io Specification](https://agentskills.io/specification)
11. [agentskills/agentskills - GitHub](https://github.com/agentskills/agentskills)
12. [Claude Code Commands Reference](https://code.claude.com/docs/en/commands)
13. [Claude Code 进阶指南：Claude.md 配置 + Auto Memory + Skill 扩展 - 微信公众号](https://weixin.sogou.com/link?url=dn9a_-gY295K0Rci_xozVXfdMkSQTLW6cwJThYulHEtVjXrGTiVgS1FX0i4gQdd5fIVmjBieHTxh34Nxo0Cf8VqXa8Fplpd9Heste22gZ8OZIYrlFzTqEGfwI9YyuuHn-mZbMSM1nHfmMU2wOfaK0K0weoJEcBrc3WnOqoy5-4CBkiSG6sZQSOtw9OGpmnv4bvUqdIHd6Y8BOtPbqPgyofI4P0ky4KYROlEunZnMH6oi5FOafzLN3QwiJxtJnioOTQEhURlWfHeq3X8EKMKOIA)
14. [Claude Code vs Hermes Agent: Prompt Assembly Boundary 技术实现对比 - 微信公众号](https://weixin.sogou.com/link?url=dn9a_-gY295K0Rci_xozVXfdMkSQTLW6cwJThYulHEtVjXrGTiVgS1FX0i4gQdd5SVW-8GX--wZh34Nxo0Cf8VqXa8Fplpd9GIzYMT37omYBMYpq5p35PSegLw29w3_YTv0UKj-Q3Y3dRKB6cMGMO6LM_WQjnzSNKMOKv9jsdm5IvKf0xnOZP_XPIcbOw-z5HS2gMC-MRqNiTl_IYndsesKzgbgwYAwKF34EyerZF_gY0n3rlNzMk86PPjiIJ4Y0juZKL2V1_ibYl_Q5RRZQjg)
15. [三大 AI 神器神仙打架！一文讲透 Claude Code、OpenClaw 和 Hermes Agent - 微信公众号](https://weixin.sogou.com/link?url=dn9a_-gY295K0Rci_xozVXfdMkSQTLW6cwJThYulHEtVjXrGTiVgS1FX0i4gQdd5SVW-8GX--wZh34Nxo0Cf8VqXa8Fplpd9yiDUXBlRC0kZ0DF-VEh4B9APnselAntZblwh3brqTmi5E1LUTXZTNncTH2rx-BjSW0-cy30OvbhuUyC7_Zsd4IzQaae1CxHO2hlExuZTwLRby5hEOD1Tv7Pn_tldmJQAHou6EvI2f0V47t6m4ZjR6-7ByXhEshuBV-7g_mGQMhlr1dbZWbKUeQ)
16. [Thin Harness + Thick Skills: Agent 工程的架构共识 - 微信公众号](https://weixin.sogou.com/link?url=dn9a_-gY295K0Rci_xozVXfdMkSQTLW6cwJThYulHEtVjXrGTiVgS1FX0i4gQdd5SVW-8GX--wZh34Nxo0Cf8VqXa8Fplpd9iyR8pU-O-mVDNrJjz85MPWdcKsnIAeVpIM3z-_wRllgSePJRw5hH5rao2VBjV8AZJmodHXbJD8b5aVv46gCEaeIrAUFRIyfE3QBlHN6UCTMezFTEWgQiLR0B3ECp1xh3lG8TFGfVhrBDckTOZl5KL3Pwwy1rQOIETzBrbEOe728GX_iHL9MadA)
17. [Hermes Agent 完全解读 - 微信公众号](https://weixin.sogou.com/link?url=dn9a_-gY295K0Rci_xozVXfdMkSQTLW6cwJThYulHEtVjXrGTiVgS1FX0i4gQdd5SVW-8GX--wZh34Nxo0Cf8VqXa8Fplpd9zdAmJtvXVHey89Pi-yJ6EaTQrOf0-kXswXKFnfY2aB5nuo2dkKbz0ikLVFwVV5duVVpZmcbrry68PZD33gvGrbOC_3SOPypFDf-_xa-k0cuY1YzJwlRHGM24SkrX5ZRA0zk8odE5JpiLnaR9mmWERQp-YqhSAWzajtxgoNbQMOFOJBjQH7pCxQ)
18. [OpenSkills: 让每个 AI 编程助手都能用上 Claude Skills - 微信公众号](https://weixin.sogou.com/link?url=dn9a_-gY295K0Rci_xozVXfdMkSQTLW6cwJThYulHEtVjXrGTiVgS1FX0i4gQdd5fIVmjBieHTxh34Nxo0Cf8VqXa8Fplpd9iVvTRTNYnkdUwDIN-Gl2rU2x3fOJKO0SBO5-Ol10k5eiJfAdjnZmVf97mPEAoM785-emWh9VW4gODXbOWWe8blJ9i4dwNBU6ylxyMeQcDlLJ_8LBm3SPay9K6P1WQjZvU5QCNweRN4bNFUeKyR8snIAJTsZsjenBgnjwpVOTcVV5Nu7CnoSqqg)
19. [claude-self-improving-skills - GitHub](https://github.com/UniM0cha/claude-self-improving-skills)
20. [magnus919/hermes-profiles - GitHub](https://github.com/magnus919/hermes-profiles)
21. [Hermes Agent 橙皮书](https://github.com/alchaincyf/hermes-agent-orange-book)
22. [How Hermes and Claude handle context compression - Mem0](https://mem0.ai/blog/how-hermes-and-claude-handle-context-compression-in-real-production-agents-(and-what-you-should-extract))
23. [Hermes Agent vs Claude Code - Bluehost](https://www.bluehost.com/blog/hermes-agent-vs-claude-code/)
24. [AI Agent 架构设计：Skills 系统设计（OpenClaw、Claude Code、Hermes Agent 对比）](https://blog.csdn.net/u014106644/article/details/160715516)
25. [Auto-Porting Your CLAUDE.md Skills to Hermes Agent - Dev.to](https://dev.to/akaranjkar08/auto-porting-your-claudemd-skills-to-hermes-agent-the-agentskillsio-open-standard-nobody-is-5h89)
