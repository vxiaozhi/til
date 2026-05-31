# Lazygit + AI 生成 Commit Message 集成方案深度研究

> 研究日期：2026-05-31  
> 研究范围：lazygit customCommands 机制、主流 AI commit 工具对比、完整集成配置方案

---

## 1. 背景与动机

手写 commit message 是开发者日常高频但低价值的重复劳动。好的 commit message 需要：
- 简洁（主题行 ≤50 字符）
- 准确描述**做了什么**而不是**怎么做**
- 遵循团队约定（Conventional Commits / gitmoji 等）

AI 工具通过分析 `git diff --cached` 可以自动理解变更语义并生成规范的消息，lazygit 的 `customCommands` 机制提供了将两者无缝集成的能力。

---

## 2. Lazygit customCommands 机制

### 2.1 核心配置结构

```yaml
# ~/.config/lazygit/config.yml
customCommands:
  - key: "<快捷键>"
    description: "命令描述"
    context: "files"          # 生效上下文
    command: "shell command"  # 实际执行的命令
    output: terminal          # 输出位置
    loadingText: "..."        # 等待时显示的文字
    prompts: []               # 运行前的交互提示
    after:                    # 执行后的操作
      checkForConflicts: true
```

### 2.2 output 选项

| 值 | 说明 |
|----|------|
| `none` | 丢弃输出 |
| `terminal` | 暂停 lazygit，在终端中运行（支持编辑器交互） |
| `log` | 流式输出到命令日志 |
| `logWithPty` | 在伪终端中运行（支持彩色输出） |
| `popup` | 在弹窗中显示结果 |

> **关键**：集成 AI commit 必须使用 `output: terminal`，因为需要编辑器交互（`git commit -e`）或子进程 TUI 交互。

### 2.3 menuFromCommand 提示类型

这是实现"AI 生成多个候选 commit，用户选一个"功能的核心机制：

```yaml
prompts:
  - type: "menuFromCommand"
    title: "选择提交消息"
    key: "Msg"
    command: "lazycommit commit"       # 执行命令，每行输出作为一个菜单项
    filter: '^(?P<raw>.+)$'            # 正则过滤，命名分组可在 valueFormat 中引用
    valueFormat: "{{ .raw }}"          # 选中后传给 .Form.Msg 的值
    labelFormat: "{{ .raw | green }}"  # 菜单中显示的标签
```

配合的主命令：
```yaml
command: 'git commit -m "{{.Form.Msg}}"'
```

### 2.4 上下文（context）

常用值：

| context | 说明 |
|---------|------|
| `files` | 文件面板（AI commit 应设为此值） |
| `global` | 所有面板 |
| `commits` | 提交历史面板 |

---

## 3. 主流 AI Commit 工具对比

### 3.1 工具总览

| 工具 | 语言 | Stars | 维护状态 | lazygit 集成 | 特点 |
|------|------|-------|----------|--------------|------|
| **lazycommit** | Go | 130 | 活跃（v1.5.4） | 原生支持 | 专为 lazygit 设计，支持多提供商 |
| **aicommits** | TypeScript | 9k | 活跃（v3.4.0） | 需配置 | 最成熟，支持最广泛 |
| **aicommit2** | TypeScript | 518 | 活跃（v2.5.21） | 原生支持（--output json） | 功能最全，支持代码审查 |
| **claude-lazygit** | TypeScript | 新项目 | 活跃 | 原生支持 | 专用 Claude CLI，零配置 |

---

### 3.2 lazycommit

**项目地址**：https://github.com/m7medVision/lazycommit  
**定位**：专为 lazygit + TUI 工作流设计的 AI commit 生成器

#### 安装

```bash
go install github.com/m7medvision/lazycommit@latest
```

#### 支持的 AI 提供商

| 提供商 | 认证方式 | 备注 |
|--------|----------|------|
| opencode（默认） | opencode CLI | 免费模型，无需 API Key |
| GitHub Copilot | GitHub Token | gpt-4o |
| OpenAI | API Key | gpt-4o |
| Anthropic | Claude Code CLI | claude-haiku-4-5 |
| Gemini | Gemini CLI | flash 系列 |

#### 核心配置

```yaml
# ~/.config/.lazycommit.yaml（敏感信息）
active_provider: anthropic

providers:
  anthropic:
    model: "claude-haiku-4-5"
    num_suggestions: 10

  openai:
    api_key: "$OPENAI_API_KEY"
    model: "gpt-4o"
    # 支持自定义端点（Ollama 等）
    endpoint_url: "http://localhost:11434/v1"
```

```yaml
# ~/.config/.lazycommit.prompts.yaml（可共享）
language: Chinese  # 支持任意语言
commit_message_template: "Based on the following git diff, generate 10 conventional commit messages. Each message should be on a new line:\n\n%s"
```

#### Lazygit 集成配置（menuFromCommand 方式）

```yaml
customCommands:
  - key: "<c-a>"
    description: "AI 生成提交消息"
    command: 'git commit -m "{{.Form.Msg}}"'
    context: "files"
    prompts:
      - type: "menuFromCommand"
        title: "AI 候选提交消息"
        key: "Msg"
        command: "lazycommit commit"
        filter: '^(?P<raw>.+)$'
        valueFormat: "{{ .raw }}"
        labelFormat: "{{ .raw | green }}"
```

#### 仓库级提示词覆盖

在仓库根目录创建 `.lazycommit.prompts.yaml` 可针对项目定制：

```yaml
language: Chinese
commit_message_template: "Based on the following git diff, generate 5 conventional commit messages in Chinese:\n\n%s"
```

---

### 3.3 aicommits

**项目地址**：https://github.com/nutlope/aicommits  
**定位**：最成熟的 AI commit 工具，社区最大（9k Stars）

#### 安装

```bash
npm install -g aicommits
aicommits setup  # 交互式引导配置
```

#### 支持的 AI 提供商

TogetherAI（推荐）、OpenAI、Groq、xAI、OpenRouter、Ollama、LM Studio、自定义 OpenAI 兼容端点

#### 核心用法

```bash
git add <files>
aicommits                          # 生成 1 条
aicommits -g 3                     # 生成 3 条候选
aicommits --type conventional      # Conventional Commits 格式
aicommits --type gitmoji           # gitmoji 格式
aicommits -p "用中文写提交信息"     # 自定义提示词
aicommits -a                       # 自动暂存已跟踪文件
```

#### Git Hook 集成

```bash
aicommits hook install   # 安装 prepare-commit-msg hook
aicommits hook uninstall
```

安装后，`git commit` 会自动弹出 AI 生成的消息供编辑。

#### Lazygit 集成配置

```yaml
customCommands:
  - key: "<c-a>"
    description: "AI 生成提交消息"
    context: "files"
    command: "aicommits"
    subprocess: true
```

---

### 3.4 aicommit2

**项目地址**：https://github.com/tak-bro/aicommit2  
**定位**：功能最全面，支持多 VCS、代码审查、差异压缩

#### 安装

```bash
brew install aicommit2        # macOS/Linux
# 或
npm install -g aicommit2
```

#### 支持的 AI 提供商（13+）

OpenAI、Anthropic Claude、Google Gemini、Mistral、Cohere、Groq、Perplexity、DeepSeek、GitHub Models、AWS Bedrock、Ollama、OpenRouter、Copilot SDK

#### 配置文件（`~/.config/aicommit2/config.ini`）

```ini
# 全局设置
generate=3
locale=zh-CN
type=conventional
maxLength=72
diffCompression=compact   # 差异压缩，减少 30-60% token

[ANTHROPIC]
key=sk-ant-...
model=claude-haiku-4-5
maxTokens=1024

[OLLAMA]
model=llama3.2
numCtx=4096
```

#### 核心高级功能

**代码审查（提交前 AI Review）：**
```bash
aicommit2 config set codeReview=true
# 暂存更改后执行 aicommit2，会先进行结构化代码审查
# 严重程度：critical / warning / suggestion / praise
```

**差异压缩（节省 token）：**
```bash
aicommit2 config set diffCompression=compact
aicommit2 config set maxHunkLines=200
aicommit2 config set maxDiffLines=1000
```

**Lazygit 集成（JSON 输出模式）：**

```yaml
customCommands:
  - key: "c"
    context: "files"
    description: "AI commit (aicommit2)"
    prompts:
      - type: "menuFromCommand"
        title: "选择提交消息"
        key: "Commit"
        command: "aicommit2 --output json"
        filter: '"subject":"(?P<subject>[^"]+)","body":"(?P<body>[^"]*)"'
        valueFormat: '{{ .subject }}<SEP>{{ .body }}'
        labelFormat: '{{ .subject }}'
    output: "terminal"
    command: >
      bash -c 'MSG="{{ .Form.Commit }}" && SUBJ="${MSG%%<SEP>*}" && BODY="${MSG#*<SEP>}" && git commit -e -m "$SUBJ" ${BODY:+-m "$BODY"}'
```

---

### 3.5 claude-lazygit

**项目地址**：https://github.com/godlyfast/claude-lazygit  
**定位**：专用 Claude Code CLI，零配置，bunnai 的 Claude 版本

#### 特点

- 复用 Claude Code CLI 的现有身份验证，无需额外 API Key
- 一键安装 lazygit 集成
- 生成 1 条高质量消息 + 支持重新生成

#### 安装

```bash
npm install -g claude-lazygit
claude-lazygit install    # 自动配置 lazygit
```

#### 等价手动配置

```yaml
customCommands:
  - key: "<c-a>"
    description: "AI commit (Claude)"
    context: "files"
    command: "claude-lazygit"
    subprocess: true
```

---

## 4. 手动脚本方案（无额外依赖）

如果不想安装第三方工具，可以直接使用 Claude CLI / claude code 命令：

### 4.1 最简方案（直接调用 claude -p）

```yaml
# ~/.config/lazygit/config.yml
os:
  shell: "zsh"
  shellArg: "-c"

customCommands:
  - key: "G"
    description: "AI commit message (Claude)"
    context: "files"
    loadingText: "AI 生成提交消息中..."
    command: |
      DIFF=$(git diff --cached --diff-algorithm=minimal)
      if [ -z "$DIFF" ]; then
        DIFF=$(git diff --diff-algorithm=minimal)
      fi
      if [ -z "$DIFF" ]; then
        echo "没有可提交的变更"
        exit 1
      fi
      MSG=$(echo "$DIFF" | claude -p "你是一个 commit message 生成器。分析以下 git diff，只输出提交消息，不要输出其他任何内容。规则：使用祈使语气；不超过 72 个字符；遵循 Conventional Commits 规范（feat/fix/refactor/docs/test/chore）；描述做了什么而不是怎么做。" 2>/dev/null)
      if [ -n "$MSG" ]; then
        git commit -e -m "$MSG"
      fi
    output: terminal
```

### 4.2 多候选方案（结合 fzf）

```yaml
customCommands:
  - key: "<c-g>"
    description: "AI commit（多候选 + fzf 选择）"
    context: "files"
    loadingText: "AI 生成候选消息..."
    command: |
      DIFF=$(git diff --cached --diff-algorithm=minimal)
      [ -z "$DIFF" ] && echo "没有暂存变更" && exit 1
      MSGS=$(echo "$DIFF" | claude -p "分析以下 git diff，生成5条符合 Conventional Commits 规范的提交消息，每行一条，不要编号或前缀。" 2>/dev/null)
      if [ -n "$MSGS" ]; then
        SELECTED=$(echo "$MSGS" | fzf --prompt="选择提交消息: " --height=10)
        [ -n "$SELECTED" ] && git commit -m "$SELECTED"
      fi
    output: terminal
```

### 4.3 Ollama 本地模型方案（无 API 费用）

```bash
# 使用本地 Ollama + qwen2.5-coder
DIFF=$(git diff --cached)
MSG=$(echo "$DIFF" | ollama run qwen2.5-coder "分析以下 git diff，生成一条符合 Conventional Commits 规范的提交消息，只输出消息本身：\n\n$DIFF")
git commit -m "$MSG"
```

对应 lazycommit 配置：

```yaml
# ~/.config/.lazycommit.yaml
active_provider: openai
providers:
  openai:
    api_key: "ollama"
    model: "qwen2.5-coder:7b"
    endpoint_url: "http://localhost:11434/v1"
```

---

## 5. 方案选型指南

### 5.1 决策矩阵

| 场景 | 推荐方案 | 理由 |
|------|----------|------|
| 已有 Claude Code CLI，追求简单 | `claude-lazygit` 或手动脚本 | 零额外配置，复用现有授权 |
| 需要多候选消息选择 | `lazycommit` | 原生 menuFromCommand，Go 单二进制 |
| 需要多 AI 提供商切换 | `aicommit2` | 支持 13+ 提供商，配置灵活 |
| 团队统一，需要代码审查 | `aicommit2` + codeReview | 提交前自动 AI Review |
| 使用本地模型（隐私敏感） | `lazycommit` + Ollama | 支持自定义 OpenAI 兼容端点 |
| 最小外部依赖 | 手动脚本（claude -p）| 只依赖 Claude CLI |

### 5.2 集成模式对比

**模式 A：subprocess 模式**（工具内部处理 git commit）

```yaml
command: "claude-lazygit"
subprocess: true
```

- 优点：工具控制完整流程，可内置重新生成等交互
- 缺点：lazygit 需等待子进程完成，且工具需自己处理 git 操作

**模式 B：menuFromCommand 模式**（lazygit 展示候选，工具只输出文本）

```yaml
command: 'git commit -m "{{.Form.Msg}}"'
prompts:
  - type: menuFromCommand
    command: "lazycommit commit"
```

- 优点：lazygit 原生 UI 展示候选，用户体验好
- 缺点：工具需要按行输出候选消息

**模式 C：terminal 模式**（直接打开编辑器）

```yaml
command: |
  MSG=$(... | claude -p "...")
  git commit -e -m "$MSG"
output: terminal
```

- 优点：用户可在提交前编辑消息，最灵活
- 缺点：需要终端环境支持

---

## 6. Prompt 工程最佳实践

### 6.1 核心原则

1. **只输出消息本身**：避免 AI 输出解释、编号或其他前缀
2. **强制格式约束**：明确指定字符限制、格式规范
3. **差异压缩**：大型变更需先压缩 diff，避免超出上下文窗口
4. **语言指定**：需要中文消息时明确说明

### 6.2 推荐 Prompt 模板

**英文 Conventional Commits：**
```
You are a git commit message generator. Analyze the provided git diff and output ONLY the commit message, nothing else.

Rules:
- Follow Conventional Commits: <type>(<scope>): <description>
- Types: feat, fix, refactor, docs, test, chore, perf, ci
- Subject line max 72 chars, imperative mood
- No period at end
- Be specific about WHAT changed, not HOW
- If multiple types apply, use the most significant one
```

**中文 Conventional Commits：**
```
你是一个 git commit message 生成器。分析以下 git diff，只输出提交消息，不要输出任何解释或其他内容。

规则：
- 格式：<类型>(<范围>): <描述>
- 类型：feat（新功能）、fix（修复）、refactor（重构）、docs（文档）、test（测试）、chore（杂项）
- 描述不超过 72 个字符
- 使用祈使语气（"添加"而不是"添加了"）
- 不以句号结尾
- 描述具体改动，避免"修改代码"等模糊表达
```

**生成多候选：**
```
分析以下 git diff，生成 5 条符合 Conventional Commits 规范的提交消息候选。
每条消息独占一行，不要编号、不要项目符号、不要任何其他文字。
```

### 6.3 diff 预处理建议

```bash
# 去除二进制文件，限制 diff 大小
DIFF=$(git diff --cached --diff-algorithm=minimal \
  --ignore-blank-lines \
  --ignore-all-space \
  -- ':!*.lock' ':!*.sum' ':!package-lock.json' \
  | head -c 8000)
```

---

## 7. 完整推荐配置（生产可用）

### 7.1 使用 lazycommit（推荐新手）

```yaml
# ~/.config/lazygit/config.yml
customCommands:
  # Ctrl+A：AI 生成多候选，菜单选择
  - key: "<c-a>"
    description: "AI 生成提交消息（候选菜单）"
    command: 'git commit -m "{{.Form.Msg}}"'
    context: "files"
    loadingText: "AI 分析变更中..."
    prompts:
      - type: "menuFromCommand"
        title: "选择提交消息"
        key: "Msg"
        command: "lazycommit commit"
        filter: '^(?P<raw>.+)$'
        valueFormat: "{{ .raw }}"
        labelFormat: "{{ .raw | green }}"
```

```yaml
# ~/.config/.lazycommit.yaml
active_provider: anthropic
providers:
  anthropic:
    model: "claude-haiku-4-5"
    num_suggestions: 5
```

```yaml
# ~/.config/.lazycommit.prompts.yaml
language: Chinese
commit_message_template: |
  分析以下 git diff，生成 5 条符合 Conventional Commits 规范的中文提交消息候选。
  每条消息独占一行，不要编号或其他文字：

  %s
```

### 7.2 使用手动脚本（无额外依赖）

```yaml
# ~/.config/lazygit/config.yml
os:
  shell: "bash"
  shellArg: "-c"

customCommands:
  # G 键：生成单条消息，打开编辑器确认
  - key: "G"
    description: "AI commit（Claude CLI）"
    context: "files"
    loadingText: "Claude 分析变更中..."
    command: |
      DIFF=$(git diff --cached --diff-algorithm=minimal -- ':!*.lock' ':!*.sum' | head -c 8000)
      if [ -z "$DIFF" ]; then
        echo "没有暂存的变更"
        exit 1
      fi
      MSG=$(printf '%s' "$DIFF" | claude -p "分析以下 git diff，只输出一条符合 Conventional Commits 规范的提交消息，不要任何其他内容：" 2>/dev/null)
      if [ -n "$MSG" ]; then
        git commit -e -m "$MSG"
      fi
    output: terminal
```

---

## 8. 常见问题与注意事项

### 8.1 大 diff 处理

- diff 过大会超出模型上下文窗口
- 建议过滤 lock 文件（`package-lock.json`、`go.sum`、`yarn.lock`）
- 使用 `head -c 8000` 或 `aicommit2` 的 `diffCompression=compact` 限制大小

### 8.2 隐私与安全

- diff 内容会发送到外部 AI 服务（OpenAI / Anthropic 等）
- 含敏感信息（密钥、密码）的变更应避免使用 AI commit
- 可使用本地模型（Ollama）规避隐私风险

### 8.3 消息质量提升

- 使用小而专注的提交（单一关注点）效果更好
- 提交前确认 `git add` 的文件是相关联的
- 生成后务必人工审查，AI 可能误解变更意图

### 8.4 lazygit 快捷键冲突

- `customCommands` 中的快捷键会覆盖同一上下文的内置快捷键
- 建议使用 Ctrl 组合键（`<c-a>`）避免冲突
- 可用 `context: global` 让快捷键全局生效

---

## 9. 参考资料

| 资源 | 说明 |
|------|------|
| [lazycommit](https://github.com/m7medVision/lazycommit) | Go 实现，专为 lazygit 设计 |
| [aicommits](https://github.com/nutlope/aicommits) | 最成熟的 TS 实现，9k Stars |
| [aicommit2](https://github.com/tak-bro/aicommit2) | 功能最全，支持代码审查 |
| [claude-lazygit](https://github.com/godlyfast/claude-lazygit) | Claude Code CLI 专用 |
| [lazygit Custom Commands 文档](https://github.com/jesseduffield/lazygit/blob/master/docs/Custom_Command_Keybindings.md) | 官方配置参考 |
| [eshlox 博客：AI commit in lazygit](https://eshlox.net/ai-commit-messages-lazygit) | 手动脚本方案实践 |
