# AGENTS.md This file provides guidance to ClaudeCode when working with code in this repository.

## 项目简介

**gitsy** 是一个 CLI 工具，用于从多个 Git 仓库并发收集提交记录和代码变更，通过调用 ClaudeCode AI 生成工作周报，并可将结果上传到 iWiki。

依赖要求：Go >= 1.21，系统 PATH 中需有 `git` 和 `claude` CLI 工具。

## 常用命令

### 构建与安装

```bash
make build          # 编译，输出 ./gitsy
make install        # 编译并安装到 $(GOPATH)/bin
make clean          # 清除编译产物
```

手动编译：`go build -o gitsy ./cmd/gitsy`

### 测试

```bash
make test                                   # 运行所有测试
go test -v ./...                            # 同上，带详细输出
go test -v -run TestParseOptions ./internal/cli/   # 运行单个测试函数
go test -v ./internal/iwiki/               # 运行指定包的测试
```

### 代码检查

```bash
make lint    # 执行 go fmt + go vet
make fmt     # 仅格式化
make vet     # 仅静态检查
```

### 运行

```bash
# 快捷方式
gitsy --repos /path/to/repo --today
gitsy --repos /path/to/repo --week --output report.md

# 指定日期范围
gitsy --repos /path/to/repo1,/path/to/repo2 --start 2026-03-17 --end 2026-03-24

# 只生成 Markdown，不调用 ClaudeCode
gitsy --repos /path/to/repo --week --md-only

# 上传到 iWiki（需要环境变量 WIKI_TOKEN）
gitsy --repos /path/to/repo --week --iwiki-space-id 12345 --iwiki-parent-id 67890

# 安装/卸载 cron 定时任务
gitsy --repos /path/to/repo --cron-install daily    # 每日 18:00
gitsy --repos /path/to/repo --cron-install weekly   # 每周五 18:00
gitsy --cron-uninstall
```

### 环境变量

| 变量 | 用途 |
|------|------|
| `GITSY_REPOS` | 默认仓库列表（逗号分隔），替代 `--repos` |
| `GITSY_IWIKI_SPACE_ID` | 默认 iWiki 空间 ID |
| `GITSY_IWIKI_PARENT_ID` | 默认 iWiki 父文档 ID |
| `WIKI_TOKEN` | iWiki 上传所需的 Bearer Token |

命令行参数优先于环境变量。

## 架构概览

### 整体数据流

```
CLI 参数解析 (cli.ParseOptions)
    ↓
并发收集各仓库 (cli.collectRepos + goroutines)
    ↓  每个仓库：ReadREADME + GetCommitLog + GetFullDiff
格式化为 Markdown (formatter.FormatMarkdown)
    ↓
[可选] 保存中间 Markdown (--md-output)
    ↓
调用 ClaudeCode AI 生成总结 (claude.GenerateSummary)
    ↓
[可选] 上传到 iWiki (iwiki.UploadDocument)
    ↓
输出到 stdout 或文件 (--output)
```

### 包结构与职责

**`internal/cli`** — 应用入口和协调层  
`Run()` 是主函数，负责整个执行流程的编排。`ParseOptions()` 支持独立测试（接受 `args []string` 和 `getEnv func(string) string` 参数，不依赖全局状态）。`collectRepos()` 用 `sync.WaitGroup` 并发处理每个仓库，结果按原始顺序保存至 `[]types.RepoInfo`。

**`internal/git`** — Git 操作封装  
所有操作通过 `exec.Command("git", ...)` 调用系统 git 命令。`GetFullDiff` 的 diff 输出通过 `codeFilePatterns` 过滤，只包含代码相关文件，并在超过 50000 字节时截断；README 超过 3000 字节也会被截断，目的是控制传给 AI 的 token 数量。

**`internal/formatter`** — Markdown 序列化  
纯函数 `FormatMarkdown`，将 `[]types.RepoInfo` 拼接为结构化 Markdown，作为 ClaudeCode 的输入 prompt 的一部分。

**`internal/claudecode`** — AI 调用层  
通过 `exec.Command("claude", "--print", "-y")` 调用本地 ClaudeCode CLI，将 prompt 通过 stdin 传入，从 stdout 读取生成结果。内嵌了中文 `summaryPrompt` 常量，要求 AI 生成「简要概括」和「详细周报」两部分。

**`internal/iwiki`** — iWiki MCP 客户端  
实现了 JSON-RPC 2.0 over HTTP 协议，先调用 `initialize` 方法握手，再调用 `tools/call`（工具名 `createDocument`）创建文档。响应支持普通 JSON 和 SSE（`text/event-stream`）两种格式。认证通过 HTTP Header `Authorization: Bearer <WIKI_TOKEN>` 传递。

**`internal/cron`** — cron 定时任务管理  
通过 `crontab -l / crontab -` 读写系统 crontab。用特殊注释标签 `# gitsy-auto-report` 标记 gitsy 安装的条目，支持按模式（`[每日日报]` / `[每周周报]`）精确替换或批量删除。

**`internal/types`** — 共享类型  
`Options`（所有 CLI 参数）和 `RepoInfo`（单个仓库的收集结果，含 `Name`、`Commits`、`README`、`Diff`、`Error` 字段）。

### 关键设计决策

- **可测试性**：`cli.ParseOptions` 接受依赖注入参数，`cli_test.go` 直接调用它进行单元测试，无需 mock `os.Args`。
- **截断策略**：git 数据在 `git` 包内完成截断（README 3000B、diff 50000B），在进入 formatter 之前已控制大小，防止 prompt 超出 AI 上下文窗口。
- **md-only 模式**：`--md-only` 跳过 ClaudeCode 调用，直接输出中间 Markdown，便于调试或手动审查原始数据。
- **无外部依赖**：`go.mod` 只声明了 `go 1.21`，无第三方依赖，所有功能通过标准库和系统命令实现。
