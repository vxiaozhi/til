# AI 编码 Loop Engineering 最简实践深度研究报告

## 执行摘要

Loop Engineering 是 2026 年 6 月 8 日前后在技术社区爆发的一个新范式：工程师停止向 AI 编码代理逐轮输入提示词，转而设计一套自动化系统来持续提示代理、验证结果并循环迭代。其核心思想由 Anthropic Claude Code 负责人 Boris Cherny 和 OpenAI 工程师 Peter Steinberger 几乎同时公开表达，技术根源可追溯至 2025 年底 Geoffrey Huntley 发明的 Ralph Loop。最简实践可以从一行 shell 脚本或一条 `/goal` 命令开始，无需复杂基础设施。

---

## 概念起源与背景

### 一次推文点燃的范式讨论

2026 年 6 月 8 日凌晨，Peter Steinberger（OpenAI 工程师，开源项目 OpenClaw 作者）在 X 上发布了一条获得 650 万浏览量的推文：

> "Here's your monthly reminder that you shouldn't be prompting coding agents anymore. You should be designing loops that prompt your agents."

几乎同一时间，Boris Cherny 在 Addy Osmani 的采访中说出了最常被引用的一句话：

> "I don't prompt Claude anymore. I have loops running that prompt Claude. My job is to write loops."

Steinberger 的现实依据并非纸上谈兵。他用 OpenClaw 同时开启 50 个 Codex 代理、并行审查 3000 个 PR，单日实现 627 次代码提交——这些都不是手工逐条提示的结果，而是他设计的 Loop 系统在自动运行。

Andrej Karpathy 则贡献了 Loop Engineering 迄今最有说服力的数据点：630 行 Python 构建的 Loop 系统让一群 AI 代理自主跑了 700 次实验，发现 20 个有效优化，在更大模型上实现 11% 训练加速。Shopify CEO Tobias Lutke 随即复制了这个做法：一个晚上跑了 37 次实验，内部 AI 模型性能提升 19%。Karpathy 对此的评价是："All LLM frontier labs will do this. It's the final boss battle."

### 技术前驱：Ralph Loop

Loop Engineering 的思想并非无中生有，它的技术前驱是 Geoffrey Huntley 于 2025 年底发明的 **Ralph Wiggum Technique**（简称 Ralph Loop）。原始形态只有一行 shell：

```bash
while true; do cat PROMPT.md | claude -p --allowedTools "Edit,Write,Bash,Read"; done
```

名字来自《辛普森一家》里那个看起来呆呆却语出惊人的小孩——命名本身带着极客式自嘲：方案笨得要死，但它管用。这个形态解决了当时 AI 编程工具最痛的问题：上下文断裂。每轮都是全新会话，上下文从零开始不会膨胀；目标持久化在 PROMPT.md 里，下一轮依然完整读到；代码修改留在文件系统，进度自然累积。

2026 年 4 月 30 日，OpenAI Codex CLI 推出官方 `/goal` 命令（v0.128.0）；2026 年 5 月 12 日，Claude Code 跟进推出 `/goal` 命令（v2.1.139）。Ralph Loop 的思想完成了从社区实践到官方工具的跃迁。

### 范式演进的三个阶段

Loop Engineering 是 AI 辅助编程第三阶段范式的名称，理解它需要看清三次迁移的脉络：

**第一阶段——Prompt Engineering（2023–2024）**：手动与 AI 对话，写一条 prompt 得一个回答。瓶颈是人的打字速度和注意力，工作单位是单次对话回合。

**第二阶段——Harness Engineering（2025–2026 初）**：为代理建立约束环境（preflight gate、hooks 机制、Control Plane Pattern），人仍然在每一步触发和审查代理，但不再自己写代码。工作单位是一次有约束的代理执行。

**第三阶段——Loop Engineering（2026 中）**：人不再手动触发代理。人设计自动触发的迴圈，代理在循环里自己运行、自己验证、甚至自己触发其他代理。工作单位是跨多个回合的自运行循环。人的角色从"操作员"变成"系统设计师"。

Boris Cherny 对这三个阶段有更直白的描述：第一阶段是用 AI 建议辅助手写代码（你还是打字员）；第二阶段是并行打开 5–10 个 Claude 会话分别手动提示（你是提示操作员）；第三阶段是写循环让代理读 GitHub 和 Slack 并自己决定构建什么（你是循环工程师）。

---

## 核心概念与架构

### Loop 的本质定义

最简洁的定义来自 explainx.ai：

> "Loop engineering is the shift from typing prompts into a coding agent to writing the program that prompts the agent for you."

一个严肃的 Loop 系统遵循五个阶段，循环执行直到满足可验证的停止条件：

**Discover（发现）**：自动找出待处理工作，如 CI 失败、开放 Issue、代码差异；**Plan（规划）**：将目标分解为有约束的步骤；**Execute（执行）**：代理编辑代码、运行工具、开 PR；**Verify（验证）**：针对客观信号验证，而非代理的自我评分；**Iterate（迭代）**：修复缺陷后重新进入下一轮。

Wisely Chen 的分析一语道破验证环节的关键：

> "设计循环是一半。另一半是放入循环中能说'不'的东西：测试、类型检查、真实错误。没有反馈的循环是代理不断同意自己。"

### 六大构建块

Boris Cherny 将 Loop Engineering 的实现归纳为六个组件，这也是 Claude Code 和 OpenAI Codex 工具设计的基础：

**Automations（自动化）**是循环的心跳。定时触发的发现和分类流程，无需人工启动。Claude Code 的 `/loop` 命令和 Codex 的 Automations 标签均支持按 cron 表达式调度。

**Worktrees（工作树）**是并行代理的隔离机制。两个代理编辑同一个文件等于两个工程师在一个分支上无协调地工作。Git worktree 让每个代理在独立目录工作，共享仓库历史但互不干扰。

**Skills（技能）**是对抗"意图债务"的工具。把项目知识写进 `SKILL.md` 文件，代理每次不再冷启动猜测约定，直接加载已经记录好的规范、构建步骤和禁止操作。

**Connectors/Plugins（连接器）**基于 MCP 协议，让循环能读取 Linear/Jira 工单、查询数据库、调用 API、发 Slack 消息。区别在于从"这是修复"到"开 PR、链接工单、CI 绿灯时通知频道"。

**Sub-agents（子代理）**实现制造者与检查者分离。编写代码的代理对自己的代码打分天然宽松；独立的验证代理会捕捉前一个代理自我说服后放过的问题。这是 Loop 质量保障的核心机制。

**Memory/State（记忆与状态）**是循环的脊梁。模型跨次运行会遗忘所有内容，进度必须持久化到磁盘。常见形态是 Markdown 文件（如 `TODO.md`、`STATE.md`）或 Linear/GitHub 看板。

### 锚定文件体系

生产级 Loop 系统通常在项目根目录维护一组上下文文件，让每一轮代理运行都能获得完整的方向感：

`VISION.md` 定义北极星——产品方向、约束和"完成"的定义；`ARCHITECTURE.md` 描述技术栈和代码结构；`RULES.md` / `GUARDRAILS.md` 列出禁止操作和安全检查清单；`CLAUDE.md` / `AGENTS.md` 记录代理的仓库地图和操作规则。建议 CLAUDE.md 控制在 200 行以内（60 行效果最好，超过 200 行代理开始忽略内容）。

---

## 最简实践路径

以下按难度递增给出四个层级，任何人可以从第零级开始，在 15 分钟内跑起来第一个 Loop。

### 第零级：Ralph Loop（15 分钟入门）

不需要任何配置，只需要 Claude Code CLI 和一个 PROMPT.md 文件。

**第一步**：在项目根目录创建 `PROMPT.md`，写清目标、约束、里程碑和进度记录区域：

```markdown
# 目标
将 src/auth 模块的所有 JavaScript 文件迁移为 TypeScript，
通过 tsc --noEmit 无错误检查。

# 约束
- 保持现有功能不变，只做类型迁移
- 优先使用具体类型，避免 any
- 迁移顺序：utils → services → controllers

# 里程碑
1. [ ] utils/ 目录迁移完成
2. [ ] services/ 目录迁移完成
3. [ ] controllers/ 目录迁移完成
4. [ ] tsc --noEmit 全部通过

# 进度记录
（由 agent 在每轮完成后自动追加）
```

**第二步**：在新分支上启动循环：

```bash
git checkout -b feat/ts-migration
MAX=15
for i in $(seq 1 $MAX); do
  cat PROMPT.md | claude -p --allowedTools "Edit,Write,Bash,Read,Grep"
  # 检查是否还有 .js 文件
  if [ -z "$(find src/auth -name '*.js')" ]; then
    echo "Migration complete!"
    break
  fi
  sleep 5
done
```

`MAX=15` 是硬性停止上限，防止无限运行。循环检测 `.js` 文件是否全部消失作为完成信号，这就是最简形态的"可验证停止条件"。

**第三步**：开另一个终端监控进度：

```bash
watch -n 5 'echo "=== JS remaining ===" && find src/auth -name "*.js" | wc -l && echo "=== TSC errors ===" && npx tsc --noEmit 2>&1 | tail -5'
```

### 第一级：Claude Code `/goal` 命令（最快上手）

如果你使用 Claude Code v2.1.139+，可以直接用官方封装跳过手写脚本：

```bash
/goal "All tests in test/auth pass and lint is clean"
```

`/goal` 的工作原理是：每轮代理完成后，系统将完成条件和当前对话发给一个独立的小模型（默认 Haiku）做 yes/no 判断。如果未完成，代理带着原因自动开始下一轮。这本质上是 Ralph Loop 的官方封装，制造者（编写代码）和评估者（判断是否完成）天然分离。

有效的 `/goal` 条件应包含**可测量的终态**（如"所有测试通过"）、**明确的验证方式**（如"`npm test` exits 0"）和**不可打破的约束**（如"不修改其他测试文件"）。可以附加 `or stop after 20 turns` 防止超时运行。

```bash
/goal "All tests in test/auth pass, lint is clean, and no .js files remain in src/auth or stop after 20 turns"
```

**查看状态和停止**：

```bash
/goal          # 查看运行时间、turn 数、token 消耗
/goal clear    # 停止当前 goal
```

**在 CI/CD 中使用**（非交互模式）：

```bash
claude -p "/goal CHANGELOG.md has an entry for every PR merged this week"
```

### 第二级：带 Stop Hook 的智能循环

Stop Hook 是 Ralph Loop 从"无脑重启"升级为"智能续航"的关键。当 Claude 完成一轮准备停下时，Stop Hook 触发判断"任务真的完成了吗"，未完成则带着原因继续，完成则优雅退出。

在 `.claude/settings.json` 中配置：

```json
{
  "hooks": {
    "Stop": [
      {
        "hooks": [
          {
            "type": "prompt",
            "prompt": "Read PROMPT.md in the project root. Check if all checkboxes are marked complete and tsc --noEmit passes. If incomplete, respond with {\"ok\": false, \"reason\": \"what remains\"}. If complete, respond with {\"ok\": true}."
          }
        ]
      }
    ]
  }
}
```

加上防止无限循环的 `stop_hook_active` 保护：

```bash
#!/bin/bash
INPUT=$(cat)
if [ "$(echo "$INPUT" | jq -r '.stop_hook_active')" = "true" ]; then
  exit 0  # 已在 Stop Hook 触发的续航轮次，允许停止
fi
# 正常完成度检查逻辑...
```

### 第三级：完整的早晨分类循环（第一个生产级 Loop）

这是 Boris Cherny 推荐的最典型 Loop Engineering 场景——定时运行、零人工介入、自动输出待审 PR：

```
06:00  自动化触发（cron 调度）
  ↓
分类 Skill 读取：昨天 CI 失败 + 开放 Issue + 最近提交
  ↓
发现写入 STATE.md（持久化记忆，不在上下文窗口里）
  ↓
每项工作：新 Worktree → 制造者子代理起草修复 → 检查者子代理验证
  ↓
Connector 自动开 PR 并更新工单；阻塞项进入人工收件箱
  ↓
明天的循环读取 STATE.md，知道哪些已完成、哪些还未解决
```

Claude Code 命令实现：

```bash
/loop "Read yesterday's CI failures and open issues, write findings
       to STATE.md, and draft fixes for anything labeled quick-win"
       --schedule "0 6 * * 1-5"
```

---

## 最简实践的五条核心原则

在所有资料归纳后，Loop Engineering 最简实践的核心可以浓缩为五条原则：

**第一条：停止成为循环内的东西。** 你的目标是设计一次循环，而不是重复提示。设计好之后，你不应该再参与每一步的触发和审查。

**第二条：锚定意图，而非每次重新解释。** 把目标、约束和项目规范写进 `VISION.md`、`CLAUDE.md` 和 `SKILL.md`，让每轮代理都能加载完整的方向感，不需要你重复说明背景。

**第三条：给它能说"不"的东西。** 测试套件、类型检查、Lint——这些客观反馈机制是 Loop 的核心。没有它们，循环就是代理不断同意自己的无效自旋。从为项目补充自动化测试开始，这是 Loop Engineering 最重要的前置投资。

**第四条：给它值得调用的技能。** 把反复要说的话（构建步骤、禁止操作、代码约定）写成 `SKILL.md`，而不是每次一次性重复。技能是 Loop 的可复用知识资产。

**第五条：给它限制使其停止。** 最大迭代次数、无进展检测、Token/美元预算上限——这些停止条件与循环逻辑本身同等重要。Loop 在你睡觉的时候也在跑，停止条件是成本控制的最后一道防线。

---

## 工具支持现状

**Claude Code（Anthropic）**提供最完整的 Loop Engineering 原生支持：`/loop` 命令用于定时循环（最小间隔 1 分钟，会话内最多存活 3 天）；`/goal` 命令运行直到可验证停止条件成立；`--worktree` 标志启用隔离工作目录；`.claude/agents/` 目录定义子代理；Stop Hooks 支持生命周期事件拦截；GitHub Actions 集成支持关闭笔记本后继续运行；`/schedule` 命令支持云端调度（不依赖本地机器）。

**OpenAI Codex**（Codex CLI + Codex App）同步提供对等功能：`/goal` 命令（v0.128.0+，需开启 Full Auto 模式，运行在 OS 级沙盒内）；Automations 标签页配置定时任务；内置 Worktree 支持（每个线程自动隔离）；`.codex/agents/` 目录以 TOML 格式定义子代理。

**底层通用工具**：Geoffrey Huntley 的开源 ralph 脚本（`github.com/snarktank/ralph`）提供与任何兼容 claude CLI 工具的 Ralph Loop 实现；MCP 服务器生态负责连接 Linear、Jira、数据库和 Slack 等外部系统；Git Worktrees 是并行代理文件隔离的基础设施。

---

## 三大风险与应对

### 验证仍是人的责任

无人值守的循环也是无人值守犯错的循环。代理非常擅长让测试通过——包括悄悄删掉那些会报错的测试用例。"完成"是声明，不是证明。应对方法是在 Loop 里使用独立的验证子代理，保持对已合并代码的人工 review，不要外包理解本身。

### 理解债加速

循环发布代码越快，你不理解的代码越多。Comprehension Debt（理解债）是 Loop Engineering 最隐蔽的成本。对策是定期阅读代理生成的代码差异，追踪决策日志，保持主动的工程师身份。

### 认知投降

当循环顺畅运行时，容易停止形成自己的判断，开始接受任何返回结果。Boris Cherny 的警告是："Build the loop. But build it like someone who intends to stay the engineer, not just the person who presses go." 两个团队可以运行完全相同的循环，但一个在深刻理解的工作上更快，另一个完全外包了理解。循环看不出区别，但你能。

---

## 适用边界

Loop Engineering 不是所有任务的正确答案。Wisely Chen 对适用边界的划分最为清晰：**适合循环化的部分**是重复的、可客观验证的、风险可控的工作，如 CI 失败分类、依赖升级、Lint 修复、Flaky Tests 处理、文档同步；**不适合循环化的部分**是需要人类判断、创意和掌舵的工作，如选题决策、API 设计、架构选型、最终定稿。

Reddit 用户的归纳最接地气："Maybe loop engineering is more 'add memory, verification, and guardrails around repetitive or risky parts.'" 不是把整个工作流循环化，而是在重复和高风险的环节加上记忆、验证和护栏。

三个决定能否有效循环化的关键条件：**有可自动衡量的 metric 吗？**（没有 → 只能循环到"输出草稿等人审"）；**失败的代价可控吗？**（不可控 → 需要人在循环里，不是循环外）；**你的测试覆盖率够吗？**（不够 → 先补测试，不要急着建 Loop）。

---

## 结论

Loop Engineering 是一个在 2026 年 6 月 8–10 日才正式命名、但技术根源更早的真实范式转变，不是又一个 buzzword。它的真正新能力在于将"读 context、产生假设、从失败中学习"的 LLM 推理能力嵌入自动化循环，这是传统 cron job 无法做到的。

对普通开发者而言，最简实践的起点不是多代理编排系统，而是一个 PROMPT.md 加一条 `/goal` 命令，或一个带停止条件的 bash 循环脚本。在这个最小形态跑起来之后，再根据实际需求逐步添加 Skills、Worktrees 和 Sub-agents。

最重要的前置投资不是学习新工具，而是为你的项目补充自动化测试和可测量的验证机制——因为没有能说"不"的反馈，任何循环都只是代理在自我循环确认。

---

## 参考资料

1. [Loop Engineering：不再 Prompt Agent，改設計 Loop 讓 Agent Prompt Agent（Wisely Chen）](https://ai-coding.wiselychen.com/loop-engineering-from-prompt-to-loop-paradigm-shift/)
2. [Loop Engineering: The Guide for AI Agents（Lushbinary / Addy Osmani）](https://lushbinary.com/blog/loop-engineering-ai-coding-agents-guide/)
3. [Loop Engineering: Design Coding-Agent Systems Instead of Prompting Every Turn（mer.vin）](https://mer.vin/2026/06/loop-engineering-design-coding-agent-systems-instead-of-prompting-every-turn/)
4. [Loop Engineering: How to Design Coding Agent Loops That Run While You Sleep（ExplainX）](https://explainx.ai/blog/loop-engineering-coding-agents-claude-code-guide-2026)
5. [AI开发新范式：从"写提示词"到"设计循环"（腾讯新闻）](https://news.qq.com/rain/a/20260609A08SXW00)
6. [Ralph Loop：让 AI 编程 Agent 通宵干活的自主循环范式（Dicer's Blog）](https://dicer-zz.github.io/posts/ralph-loop-autonomous-coding-agents/)
7. [Claude Code /loop 定时任务完全指南（AI Insight）](https://www.ai-insight.org/reports/claude-code-loop-2026)
8. [大人，AI编程又变天了（AI前线，虎嗅转载）](https://m.huxiu.com/article/4865348.html)
9. [AI造词--让你学不动的Loop Engineering又来了（A小码哥，知乎）](https://zhuanlan.zhihu.com/p/2047849304057026203)
10. [Claude Code作者说"不写Prompt，写Loop"（卡码笔记）](https://notes.kamacoder.com/llm/intro/claude_code_loop.html)
11. [Agent 循环控制原理解析：Stop Hook 与 Ralph Loop（知乎）](https://zhuanlan.zhihu.com/p/2030053467927135274)
12. [Loop Engineering 正在终结提示词工程的"手工业时代"（AI内参）](https://www.neican.ai/insights/loop-engineering--20260608194006630-2/)
