# 深度研究：Claude Code / Codex 与 Telegram 集成的最佳开源方案

## 执行摘要

Claude Code 和 Codex CLI 与 Telegram 的集成生态已经相当成熟，存在超过 30 个开源项目。Claude Code 方面，Anthropic 官方提供了 Channels 插件（研究预览版），社区最受欢迎的是 RichardAtCT/claude-code-telegram（2,700 星）。Codex 方面，专门的 Telegram 桥接项目约 7 个，最流行的是 coleam00/codex-telegram-coding-assistant。在通用框架层面，cc-connect（13,000+ 星）是最全面的多智能体、多平台桥接方案，支持 10+ 种 AI 编码工具和 13 个消息平台。综合评估后，按场景推荐：追求官方支持选 Claude Code Channels；追求功能全面选 cc-connect；追求轻量简洁选 claude-tg-bridge 或 nanogent；同时使用 Claude Code 和 Codex 推荐 telegram-claude-codex 或 OpenAB。

## 背景

Claude Code 是 Anthropic 推出的终端 AI 编码智能体，Codex CLI 是 OpenAI 开源的终端编码智能体（github.com/openai/codex）。两者都在本地终端运行，能够读写文件、执行命令、管理项目。但终端绑定意味着开发者必须坐在电脑前才能交互。通过 Telegram 集成，开发者可以在手机上远程指挥 AI 编码、审查代码、修复 Bug，极大地提升了灵活性和响应速度。Telegram 因其成熟的 Bot API、实时消息、跨平台支持和文件分享能力，成为首选的桥接平台。

## Claude Code 与 Telegram 集成方案

### 方案一：官方方案 — Claude Code Channels（推荐用于官方支持）

Anthropic 于 2026 年 3 月推出了 Claude Code Channels 功能，目前处于研究预览阶段，需要 Claude Code v2.1.80 或更新版本。

工作原理：Channels 基于 MCP（Model Context Protocol），Telegram 插件作为 MCP 服务器将消息事件注入正在运行的 Claude Code 会话。当 Telegram 消息到达时，插件将其转换为 `<channel>` 事件，Claude 处理后通过同一通道回复。

关键限制：要求 Claude Code 会话保持活跃运行（终端关闭则通道断开），不支持语音消息，无法获取历史消息（Telegram Bot API 限制），最重要的是无法远程批准权限提示——如果 Claude 需要用户批准工具调用，会话会停滞，除非用户在终端旁。变通方案是使用 `--dangerously-skip-permissions`，但这会带来安全风险。

设置步骤：通过 @BotFather 创建 Telegram 机器人获取 Token；在 Claude Code 内执行 `/plugin install telegram@claude-plugins-official` 安装插件；运行 `/telegram:configure <token>` 配置；用 `claude --channels plugin:telegram@claude-plugins-official` 启动；发送消息给机器人后运行 `/telegram:access pair <code>` 完成配对。

官方插件源码位于 github.com/anthropics/claude-plugins-official/tree/main/external_plugins/telegram，文档在 code.claude.com/docs/en/channels。

### 方案二：社区方案 — RichardAtCT/claude-code-telegram（功能最全面）

- GitHub：https://github.com/RichardAtCT/claude-code-telegram
- 星数：2,700 | Fork：403 | 最新版本：v1.6.0（2026 年 3 月 30 日）
- 语言：Python | 许可证：MIT

这是社区最受欢迎的方案。提供了完整功能的远程接口，支持智能体模式（自然语言）和经典命令模式（13 个命令）。核心特性包括：多层身份验证（用户白名单 + Token），目录沙盒与路径遍历防护，文件上传与归档解压，图像分析，语音转录（多后端可选），事件驱动自动化（GitHub Webhooks + HMAC-SHA256），Cron 定时调度，用量与成本追踪，审计日志，16 个可配置工具，以及项目线程模式（Project Threads Mode）用于 Telegram 群组中的主题路由。使用 FastAPI 作为 Webhook 服务器、SQLite 持久化、APScheduler 定时任务。226 次提交和 7 个版本说明维护活跃。

### 方案三：linuz90/claude-telegram-bot（TypeScript / Bun 首选）

- GitHub：https://github.com/linuz90/claude-telegram-bot
- 星数：447 | Fork：116
- 语言：TypeScript + Bun | 许可证：MIT

使用官方的 `@anthropic-ai/claude-agent-sdk` 桥接 Telegram 与 Claude Code。支持文本、语音（OpenAI Whisper）、照片、文档（PDF/ZIP/TAR）、音频和视频。特性包括会话持久化、消息队列、扩展思考模式、两个内置 MCP 工具（`ask_user` 和 `send_file`），安全模型包含用户白名单、意图分类、路径验证、命令安全检查、速率限制和审计日志。支持 CLI 认证和 API Key 认证。52 次提交。

### 方案四：terranc/claude-telegram-bot-bridge（轻量终端桥接）

- GitHub：https://github.com/terranc/claude-telegram-bot-bridge
- 星数：124 | Fork：15 | 最新版本：v0.10.1（2026 年 5 月 30 日）
- 语言：Python | 许可证：MIT

26 个版本、86 次提交，维护活跃。核心特色是通过 `/model` 在 Sonnet、Opus、Haiku 间切换；通过 `/resume` 恢复会话；通过 `/history` 查看历史；提供 5 种恢复模式的 revert 功能。语音支持 Whisper 转录。守护进程模式带崩溃重启（5 次/60 秒内自动停止）和 macOS launchd 自启动。

### 方案五：godagoo/claude-telegram-relay（持久记忆方案）

- GitHub：https://github.com/godagoo/claude-telegram-relay
- 星数：329 | Fork：172
- 语言：TypeScript + Bun | 许可证：MIT

通过 Supabase 实现持久记忆，使用 OpenAI Embeddings 实现对话历史的语义搜索，自动检测并持久化事实和目标。支持主动签到（智能外联）、每日简报（晨间摘要）。语音转录支持 Groq 云端或本地 Whisper。跨平台守护进程支持（macOS launchd、Linux systemd、Windows PM2）。

### 其他 Claude Code Telegram 社区项目

npm 包生态也十分活跃：claude-tg-bridge 是零依赖单文件方案，支持自动会话轮转防上下文溢出，本地 whisper-cpp 语音转录；telegram-claude-code 提供交互式设置向导；claude-tg 利用 Claude Code 原生 hooks 系统实现远程权限批准（用户通过 Telegram 行内按钮选择 Allow/Deny）；nanogent 是无状态方案，每条消息生成新的 `claude -p` 进程，适合 VPS 或无显示器部署。

此外还有 oscarsterling/claude-telegram-remote（tmux 注入方案，23 个命令）、junecv/vibeIDE（手机接手桌面会话）、seedprod/claude-code-telegram（技能系统集成 Google Calendar、Gmail 等）、Nickqiaoo/chatcode（文件浏览器 + 项目管理）、PABannier/claude-telegram-bot（双向通知）、dougvk/claude-code-telegram（纯 Shell 脚本最简方案）、leemysw/cc-image（Docker 化方案用于 Synology NAS）和 htlin222/claude-telegram-bot（npm ctb，fork 自 linuz90 并增强群聊支持）。

## Codex CLI 与 Telegram 集成方案

### 方案一：coleam00/codex-telegram-coding-assistant（星数最多）

- GitHub：https://github.com/coleam00/codex-telegram-coding-assistant
- 星数：57 | Fork：23 | 语言：TypeScript + Docker | 许可证：MIT

基于 Docker 的完整方案，预装 Codex CLI。每个工作目录独立线程，切换目录清除旧线程生成新线程。可选集成 Stagehand MCP（Browserbase）实现浏览器自动化和会话回放（录制 Codex 操作视频）。支持实时流式传输、完全写入权限（可配置）、Sequential Thinking MCP 集成。通过 `docker-compose up --build -d` 启动。

### 方案二：benedict2310/telecodex（功能最丰富）

- GitHub：https://github.com/benedict2310/telecodex
- 星数：36 | Fork：24 | 语言：TypeScript + Grammy | 许可证：MIT

使用 `@openai/codex-sdk` 生成 Codex 子进程。核心特性：每个上下文独立会话、流式响应、完整工具可见性（shell 命令、文件更改、web 搜索、MCP 调用）、实时计划显示、语音转录（本地 parakeet-coreml 或 OpenAI Whisper）、图像输入、文件摄取、会话浏览器、Telegram 登录（无需终端）、启动配置文件、模型选择器和推理努力控制。23 次提交，积极开发中。

### 方案三：xx025/openab（通用多后端桥接）

- GitHub：https://github.com/xx025/openab
- 星数：42 | Fork：4 | 语言：Python | 许可证：MIT

支持多个智能体后端的通用桥接层。目前支持 Cursor 和 Codex（Claude、Gemini、OpenClaw 开发中）。聊天接口包括 Telegram、Discord 和 OpenAI 兼容 HTTP API。通过 `pip install openab` 安装，`openab run` 运行并选择聊天平台。

### 方案四：poseidonchan/codex-telegram-bot（Python 多机器方案）

- GitHub：https://github.com/poseidonchan/codex-telegram-bot
- 星数：10 | 语言：Python + SQLite3 | 许可证：MIT

支持本地和 SSH 远程机器。核心特性：内联批准按钮、缓冲流式传输、会话管理（创建/重命名/恢复/压缩）、三级沙盒控制（只读/工作区写入/危险完全访问）、批准模式（按请求或自动）、计划模式切换、模型选择、思考努力控制。34 次提交。

### 方案五：incursa/codex-telegram（C# 预编译二进制）

- GitHub：https://github.com/incursa/codex-telegram
- 星数：5 | 语言：C# .NET | 许可证：Apache-2.0

提供 Windows x64、Linux x64、macOS arm64 预编译二进制文件。首次运行向导、语音备注（OpenAI Whisper）、输出批处理、群组和论坛主题支持、14 个发布版本（最新 v1.0.20，2026 年 5 月）。无需 Node.js 或 Python 运行时。

### 其他 Codex Telegram 项目

codenoah/codex-telegram-bridge（npm 包，利用 Codex 应用服务器 WebSocket 模式）；kravchik/orc（15 星，Python，支持 Slack/Telegram 双前端）；yhdesai/codex-toolbox（将 Codex 会话镜像到 Telegram 论坛主题，含 Apple Watch 客户端）；0xkaz/codex-gemini-telegram-bridge（同时支持 Gemini CLI）；daocha/coding-agent-telegram（Python，同时支持 Copilot CLI，12 个版本维护活跃）。

## 通用框架方案（同时支持 Claude Code 和 Codex）

### 方案一：cc-connect（最全面的多智能体方案，强烈推荐）

- GitHub：https://github.com/chenhg5/cc-connect
- 星数：13,000+ | Fork：1,200+ | 语言：Go | 许可证：MIT
- 支持的智能体：Claude Code、Codex、Cursor Agent、Gemini CLI、Qoder CLI、OpenCode、iFlow CLI、Kimi CLI、Pi、Copilot、Devin（通过 ACP），以及任何支持 ACP 协议的智能体
- 支持的平台：飞书、钉钉、WPS 协作、Telegram、Slack、Discord、微博、LINE、企业微信、微信、QQ、QQ Bot、Matrix（共 13 个）

作为本地守护进程运行，通过 WebSocket/Stream/Gateway 等方式连接智能体和聊天平台，无需公网 IP。核心特性：多智能体编排、会话管理、权限模式（yolo/default）、运行时提供商/模型切换、目录控制、自然语言 Cron 定时任务、OS 级别用户隔离、语音/图像/文件支持、5 种语言国际化、多项目架构。通过 npm、Homebrew、预编译二进制或 Go 源码安装，支持 TOML 或 Web UI 配置。这是目前社区规模最大、功能最完整的方案，尤其适合需要同时使用多种 AI 编码工具或需要在多个消息平台间切换的场景。

### 方案二：Tether（最佳监督层方案）

- GitHub：https://github.com/larsderidder/tether
- 语言：Python | 许可证：Apache 2.0
- 支持的智能体：Claude Code、Codex、OpenCode、Pi，以及通过 MCP/REST 的自定义智能体
- 支持的平台：Telegram、Slack、Discord，外加移动端 PWA Web UI

设计理念是作为"监督层"与智能体并行运行，拦截输出和批准请求。智能体在终端正常运行，Tether 将输出转发到桥接平台。核心特色：远程批准按钮、自动批准规则、统一会话管理、人工介入门控、MCP 服务器和 REST API、PWA Web UI（localhost:8787）。通过 `pipx install tether-ai` 安装。适合需要精细权限控制和人工监督的团队环境。

### 方案三：CCGram（终端层方案，最灵活）

- GitHub：https://github.com/alexei-led/ccgram
- 语言：Python | 许可证：MIT
- 支持的智能体：Claude Code、Codex CLI、Gemini CLI、Pi，以及任何终端 CLI 工具

将 Telegram 论坛主题映射为 tmux/herdr 窗口。发送给某个主题的消息变为对应终端窗格的按键输入，智能体输出从会话转录中读取。设计哲学是"终端是唯一真相来源"——可以随时从桌面恢复会话。核心特色：智能体-主题对应、Git Worktree 主题隔离、交互式提示行内键盘、语音消息（Whisper）、终端截图、文件发送、操作工具栏、实时视图（每 5 秒自动刷新截图）、可选的 Web 终端（xterm.js）、Shell Provider 模式（自然语言转 Shell 命令）。通过 `uv tool install ccgram` 或 Homebrew 安装。

### 方案四：takopi（Python 生态首选）

- GitHub：https://github.com/banteg/takopi
- 星数：1,000+ | 语言：Python | 许可证：MIT
- 支持的智能体：Codex、Claude Code、OpenCode、Pi

使用 Git Worktree 实现多分支隔离。三种工作流模式：Assistant（持续对话）、Workspace（论坛主题映射仓库/分支）、Handoff（回复继续）。核心特性：多项目管理 + Worktree 隔离、进度流式传输、并行运行多个智能体、文件传输、群聊支持、通过前缀选择引擎（/codex、/claude、/opencode、/pi）、插件系统。通过 `uv tool install -U takopi` 安装。

### 方案五：telegram-claude-codex（同时使用两种工具的最佳选择）

- GitHub：https://github.com/Mark-Life/telegram-claude-codex
- 星数：9 | 语言：TypeScript + Bun | 许可证：MIT

在运行时通过 `/provider` 命令在 Claude Code 和 OpenAI Codex 之间切换。CLI 认证由各自 CLI 处理，无需在 .env 中存储 API Key。核心特性：多提供商切换、项目管理、实时流式传输、会话连续性、消息排队、Groq Whisper 语音转录、计划模式拦截、撰写模式（多消息批量处理为单个提示）、分支和 PR 感知、访问控制。111 次提交，开发活跃。

### 其他多智能体方案

Nicolas-Arsenault/claudegram（npm 包，支持 Claude Code 和 Codex，v2.1.0）；TimFinnigan/oyster-bot（插件架构，10+ 内置插件，含 Obsidian 集成）；AliceLJY/telegram-ai-bridge（A2A-TG 智能体协作协议，支持群组内多智能体协作）；Gucvii/claude-to-im-skill（Node.js，支持 Telegram/Discord/飞书/QQ/微信五个平台）；gergomiklos/heyagent（npm 包，扫码手机连接）；fnzv/trash（Go 语言，命令批准工作流 + 安全防护）；pavel-molyanov/telegram-ai-agent（Python，Linux VPS 优化，含 MCP 服务器）。

### 通用 Shell 机器人（可包装任意 CLI 工具）

botgram/shell-bot（838 星，Node.js，基于 PTY 的真实终端模拟，实时输出流式传输）；shell2telegram（166 星，Go 语言，将 Telegram 命令映射到 Shell 命令）；sagan/tgshell（Go 语言，终端模拟器 + SSH 客户端）。

## 综合对比分析

### 按场景推荐

如果你只需要 Claude Code 的官方方案：选择 Claude Code Channels。它由 Anthropic 维护，与 Claude Code 原生集成，遵循 MCP 标准。但需要接受其限制——无法远程批准权限、不支持语音、会话必须保持活跃。

如果你需要功能最全面的单智能体方案：选择 RichardAtCT/claude-code-telegram（Claude Code）或 benedict2310/telecodex（Codex）。两者都是社区最活跃、功能最丰富的专用方案。

如果你同时使用多种 AI 编码工具（Claude Code + Codex + 其他）：选择 cc-connect。13,000+ 星、10+ 智能体、13 个平台，是当之无愧的最全面的多智能体方案。其次是 telegram-claude-codex（轻量级切换）或 OpenAB（Python 生态）。

如果你需要精细的权限控制和人工监督：选择 Tether。它作为监督层运行，提供远程批准按钮、自动批准规则和人工介入门控，适合团队环境。

如果你追求最小化设置和零依赖：选择 claude-tg-bridge（一条 npx 命令启动）或 nanogent（无状态，每次消息生成新进程）。两者都是零依赖方案。

如果你希望终端保持唯一真相来源：选择 CCGram。它基于 tmux 层面操作而不依赖智能体 SDK，可以包装任意 CLI 工具，并允许随时从桌面恢复会话。

如果你需要持久记忆和主动 AI 行为：选择 godagoo/claude-telegram-relay。基于 Supabase 的语义搜索和事实/目标持久化是独特优势。

### 架构模式总结

所有这些方案可归纳为几种架构模式：MCP 插件模式（官方 Channels），SDK 子进程模式（RichardAtCT、telecodex），应用服务器/WebSocket 模式（codex-telegram-bridge），终端注入模式（CCGram、oscarsterling 的 tmux 方案），进程生成模式（nanogent、claude-tg-bridge），以及多智能体编排模式（cc-connect、Tether）。选择哪种取决于你对会话持久性、权限控制、多智能体支持和设置复杂度的不同偏好。

### 安全考量

大多数项目使用基于 Telegram 用户 ID 的白名单作为主要访问控制。成熟度最高的项目默认拒绝批准，要求用户在 Telegram 中明确批准每条命令。部分项目使用 `--dangerously-bypass-approvals-and-sandbox` 标志，这会绕过所有安全措施，仅适合在受信任的个人机器上使用。所有方案都不将智能体的 WebSocket 或 API 暴露到互联网——连接都是本地的，Telegram 是唯一的公共端点。

## 结论

Claude Code 和 Codex 与 Telegram 的集成生态已经相当成熟，总共有超过 30 个开源项目可供选择。关键发现如下：第一，Anthropic 官方提供了 Claude Code Channels，这是官方支持的最佳路径，但有研究预览阶段的限制。第二，cc-connect 以 13,000+ 星成为最全面的通用方案，几乎可以桥接任何智能体到任何消息平台。第三，对于大多数只想用一个工具的开发者，专用桥接（RichardAtCT/claude-code-telegram 或 telecodex）提供了更精细的体验。第四，npm 包生态（claude-tg-bridge、nanogent、claude-tg）为追求简洁的用户提供了零依赖的快速部署选项。第五，Codex 的 Telegram 桥接生态虽不如 Claude Code 庞大，但已经足够成熟，有多个活跃维护的项目。

## 参考文献

1. [Anthropic - Claude Code Channels 官方文档](https://code.claude.com/docs/en/channels)
2. [Anthropic - 官方 Telegram 插件源码](https://github.com/anthropics/claude-plugins-official/tree/main/external_plugins/telegram)
3. [RichardAtCT/claude-code-telegram](https://github.com/RichardAtCT/claude-code-telegram)
4. [chenhg5/cc-connect - 多智能体多平台桥接](https://github.com/chenhg5/cc-connect)
5. [larsderidder/tether - AI 编码智能体监督层](https://github.com/larsderidder/tether)
6. [alexei-led/ccgram - 基于 tmux 的 Telegram 控制](https://github.com/alexei-led/ccgram)
7. [banteg/takopi - Telegram AI 编码智能体桥接](https://github.com/banteg/takopi)
8. [linuz90/claude-telegram-bot](https://github.com/linuz90/claude-telegram-bot)
9. [godagoo/claude-telegram-relay](https://github.com/godagoo/claude-telegram-relay)
10. [terranc/claude-telegram-bot-bridge](https://github.com/terranc/claude-telegram-bot-bridge)
11. [benedict2310/telecodex - Codex Telegram SDK 集成](https://github.com/benedict2310/telecodex)
12. [coleam00/codex-telegram-coding-assistant](https://github.com/coleam00/codex-telegram-coding-assistant)
13. [xx025/openab - 通用多后端桥接](https://github.com/xx025/openab)
14. [poseidonchan/codex-telegram-bot](https://github.com/poseidonchan/codex-telegram-bot)
15. [incursa/codex-telegram - C# 预编译方案](https://github.com/incursa/codex-telegram)
16. [Mark-Life/telegram-claude-codex - 双提供商方案](https://github.com/Mark-Life/telegram-claude-codex)
17. [codenoah/codex-telegram-bridge](https://github.com/codenoah/codex-telegram-bridge)
18. [Nicolas-Arsenault/claudegram - npm 多智能体桥接](https://github.com/Nicolas-Arsenault/claudegram)
19. [botgram/shell-bot - Telegram 通用 Shell 机器人](https://github.com/botgram/shell-bot)
20. [TimFinnigan/oyster-bot - 插件式 Telegram 机器人](https://github.com/TimFinnigan/oyster-bot)
21. [Gucvii/claude-to-im-skill - 多 IM 平台桥接](https://github.com/Gucvii/claude-to-im-skill)
22. [AliceLJY/telegram-ai-bridge - 多智能体协作桥接](https://github.com/AliceLJY/telegram-ai-bridge)
23. [gergomiklos/heyagent - npm 快速部署方案](https://github.com/gergomiklos/heyagent)
24. [claude-tg-bridge (npm)](https://www.npmjs.com/package/claude-tg-bridge)
25. [nanogent (npm)](https://www.npmjs.com/package/nanogent)
26. [claude-tg (npm)](https://www.npmjs.com/package/claude-tg)
27. [coding-agent-telegram (PyPI)](https://pypi.org/project/coding-agent-telegram/)
