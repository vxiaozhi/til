## AI 驱动的开发范式

- [涛哥分享： 从AI 编程到AI 企业提效—FU YongTao](https://docs.qq.com/slide/DVmhuTWZCcHRKWkxP?state=weworklogin)

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


## Skills 驱动编程

Skills 是近期 Anthropic 发布了一个新特性——Claude Skills，它的目标，是让 Claude 不再只是一个「能聊天的模型」，而是一个具备可扩展、可执行技能体系的代理式 Agentic AI 工具。

通过 Rules 约束大模型输出，通过 MCP 触达外部业务系统，通过知识库进行私域知识库输入，而通过 Skills 则是为大模型武装上特定技能，配备现实世界所需要的技能，高效解决问题。

- [Claude Skills 原理解析](agent/claude-code-skills.md)
