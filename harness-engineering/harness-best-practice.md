# Harness 最佳实践

## 命令行工具管理

通用型管理工具， 这类工具的目标是“一个程序管理所有开发环境”。

- [jdx/mise](https://github.com/jdx/mise)  (原 rtx) 特点: 速度最快，集成环境变量管理（direnv）和任务运行（make）。
- vfox (version-fox) [GitHub](https://github.com/version-fox/vfox) 特点: 国产优秀开源工具，跨平台一致性极高，对 Windows 用户非常友好。
- asdf [GitHub](https://github.com/asdf-vm/asdf)  特点: 插件生态最丰富（300+ 插件），是大多数现代工具的灵感来源。

mise 安装：
```
$ curl https://mise.run | sh
$ ~/.local/bin/mise --version
              _                                        __
   ____ ___  (_)_______        ___  ____        ____  / /___ _________
  / __ `__ \/ / ___/ _ \______/ _ \/ __ \______/ __ \/ / __ `/ ___/ _ \
 / / / / / / (__  )  __/_____/  __/ / / /_____/ /_/ / / /_/ / /__/  __/
/_/ /_/ /_/_/____/\___/      \___/_/ /_/     / .___/_/\__,_/\___/\___/
                                            /_/                 by @jdx
2026.4.28 macos-arm64 (2026-04-30)
```

## Coding Agent 软件清单

### 1.  [claude-mem]()

### 2. OpenSpec 【已放弃，经实践发现存在与 SpecKit 存在同样缺点： 文档过多，积累的文档无法被 agent 再次利用，起不到复利作用】
```
npm install -g @fission-ai/openspec@latest

cd your-project
openspec init
```

### 3. andrej-karpathy-skills

cluade code
```
/plugin marketplace add forrestchang/andrej-karpathy-skills
/plugin install andrej-karpathy-skills@karpathy-skills
```

### 4. claude code 官方 market

claude 官方有 2 个：

- https://github.com/anthropics/claude-code 【插件已内置】
- https://github.com/anthropics/skills

```
/plugin marketplace add anthropics/skills
```

### 5. beads

- [gastownhall/beads](https://github.com/gastownhall/beads)

相关生态：

- [gastownhall/gastown](https://github.com/gastownhall/gastown) Gas Town —— 一个多 Agent 编排系统，它将 AI 编码 Agent 视为结构化、基于 Git 的工作区内的一等公民和可问责的员工。无论你是运行两个还是二十个 Claude Code 实例，Gas Town 都能为你提供协调层、持久化工作跟踪以及监控基础设施，确保一切顺畅运转。
- [Dicklesworthstone/beads_viewer](https://github.com/Dicklesworthstone/beads_viewer) Beads Viewer (bv) 是一个高性能的终端用户界面 (TUI)，用于浏览和管理使用 Beads issue 追踪系统的项目中的任务。它能将你的任务数据转化为智能依赖图，自动高亮传统基于列表的追踪器容易忽略的瓶颈、循环和关键路径。
- [mantoni/beads-ui](https://github.com/mantoni/beads-ui) Beads 的本地界面 — 与您的编程代理协作处理问题。
```
npm i beads-ui -g
# In your project directory:
bdui start --open
```

安装：
```
# Install beads CLI (system-wide - don't clone this repo into your project)
curl -fsSL https://raw.githubusercontent.com/gastownhall/beads/main/scripts/install.sh | bash

# Initialize in YOUR project
cd your-project
bd init

# Tell your agent
echo "Use 'bd' for task tracking" >> AGENTS.md
```

与 claude code 集成： https://gastownhall.github.io/beads/integrations/claude-code

### 6. ruflo

- [ruvnet/ruflo](https://github.com/ruvnet/ruflo) Ruflo 是一个多 Agent AI 编排平台，构建在一个自学习且可通过插件扩展的运行时之上，能够将 Claude Code 转化为由 100 多个专业 Agent 组成的协同集群。
