# gitsy

[![Go Version](https://img.shields.io/badge/Go-%3E%3D%201.21-blue)](https://golang.org/)

一个用于从 Git 仓库收集提交记录和代码变更，并通过 ClaudeCode 生成工作周报的 CLI 工具。

## 功能特性

- 📊 **多仓库支持**：同时处理多个 Git 仓库
- 📅 **时间范围过滤**：指定日期范围收集提交记录
- 👤 **作者过滤**：可选择性筛选特定作者的提交
- 📝 **自动生成周报**：使用 ClaudeCode AI 智能生成工作总结
- 🚀 **并发处理**：高效并发收集各仓库信息
- 📄 **Markdown 输出**：支持保存中间 Markdown 和最终总结

## 安装

### 从源码安装

```bash
git clone <repository-url>
cd gitsy
make install
```

或手动编译：

```bash
go build -o gitsy ./cmd/gitsy
```

## 使用方法

### 基本用法

```bash
gitsy --repos /path/to/repo1,/path/to/repo2 --start 2026-03-17 --end 2026-03-24
```

### 命令行参数

| 参数 | 说明 | 必填 | 默认值 |
|------|------|------|--------|
| `--repos` | 仓库目录列表，多个仓库用逗号分隔 | ✓ | - |
| `--start` | 起始日期，格式 YYYY-MM-DD | ✓ | - |
| `--end` | 结束日期，格式 YYYY-MM-DD | ✗ | 今天 |
| `--today` | 生成当日工作报告 | ✗ | - |
| `--week` | 生成最近 7 天工作报告 | ✗ | - |
| `--author` | 过滤指定 git author | ✗ | - |
| `--md-output` | 保存中间 Markdown 文件路径 | ✗ | - |
| `--output` | 保存最终总结文件路径 | ✗ | stdout |
| `--md-only` | 只输出 Markdown 汇总，不调用 codebuddy | ✗ | false |
| `--model` | 指定 ClaudeCode 使用的 AI 模型 | ✗ | - |
| `--verbose` | 打印详细日志信息 | ✗ | false |
| `--iwiki-space-id` | iWiki 空间 ID（与 --iwiki-parent-id 配合使用） | ✗ | - |
| `--iwiki-parent-id` | iWiki 父文档 ID（与 --iwiki-space-id 配合使用） | ✗ | - |
| `--iwiki-title` | iWiki 文档标题（可选，未提供时自动生成） | ✗ | - |
| `--cron-install` | 安装 cron 定时任务（daily/weekly） | ✗ | - |
| `--cron-uninstall` | 卸载所有 gitsy 定时任务 | ✗ | - |

### 环境变量

| 环境变量 | 说明 | 对应参数 |
|----------|------|----------|
| `GITSY_REPOS` | 仓库目录列表，多个仓库用逗号分隔 | `--repos` |
| `GITSY_IWIKI_SPACE_ID` | iWiki 空间 ID | `--iwiki-space-id` |
| `GITSY_IWIKI_PARENT_ID` | iWiki 父文档 ID | `--iwiki-parent-id` |
| `WIKI_TOKEN` | iWiki 认证令牌（上传时必需） | - |

> **注意**：命令行参数优先于环境变量。当两者同时存在时，以命令行参数为准。

### 使用示例

**生成当日工作报告（快捷方式）：**

```bash
gitsy --repos /path/to/repo --today --output today-report.md

# 使用环境变量（假设已设置 GITSY_REPOS）
gitsy --today --output today-report.md
```

**生成最近 7 天工作周报（快捷方式）：**

```bash
gitsy --repos /path/to/project1,/path/to/project2 --week --output weekly-report.md

# 使用环境变量
gitsy --week --output weekly-report.md
```

**指定日期范围生成周报：**

```bash
gitsy --repos /path/to/project1,/path/to/project2 \
      --start 2026-03-17 \
      --end 2026-03-24 \
      --output weekly-report.md
```

**筛选特定作者的提交：**

```bash
gitsy --repos /path/to/repo \
      --week \
      --author "john@example.com" \
      --output john-report.md
```

**保存中间 Markdown 文件：**

```bash
gitsy --repos /path/to/repo \
      --today \
      --md-output raw-data.md \
      --output summary.md
```

**上传工作周报到 iWiki：**

```bash
# 需要先设置环境变量 WIKI_TOKEN
export WIKI_TOKEN="your_iwiki_token"

# 方式一：通过命令行参数指定
gitsy --repos /path/to/repo \
      --week \
      --iwiki-space-id 12345 \
      --iwiki-parent-id 67890

# 方式二：通过环境变量指定（适合在 .bashrc 中持久化配置）
export GITSY_REPOS="/path/to/repo1,/path/to/repo2"
export GITSY_IWIKI_SPACE_ID="12345"
export GITSY_IWIKI_PARENT_ID="67890"
gitsy --week

# 上传并指定自定义标题
gitsy --repos /path/to/repo \
      --week \
      --iwiki-space-id 12345 \
      --iwiki-parent-id 67890 \
      --iwiki-title "本周工作总结"
```

**指定 AI 模型：**

```bash
# 使用指定模型生成周报
gitsy --repos /path/to/repo --week --model claude-3-5-sonnet

# 结合 iWiki 上传使用
gitsy --week \
      --model claude-3-7-sonnet \
      --iwiki-space-id 12345 \
      --iwiki-parent-id 67890
```

## 项目结构

```
gitsy/
├── cmd/gitsy/           # 命令行入口
│   └── main.go
├── internal/            # 内部包
│   ├── cli/            # CLI 核心逻辑
│   ├── git/            # Git 操作封装
│   ├── formatter/      # Markdown 格式化
│   ├── codebuddy/      # ClaudeCode API 调用
│   ├── iwiki/          # iWiki 集成
│   ├── cron/           # Cron 定时任务管理
│   └── types/          # 类型定义
├── go.mod
├── README.md
├── Makefile
└── .gitignore
```

## 开发

### 编译

```bash
make build
```

### 安装到系统

```bash
make install
```

### 清理编译产物

```bash
make clean
```

### 运行测试

```bash
make test
```

## 依赖要求

- **Go**: >= 1.21
- **Git**: 命令行工具需在系统 PATH 中
- **ClaudeCode**: 需安装 codebuddy CLI 工具

## 工作原理

1. **收集阶段**：并发访问指定的 Git 仓库，提取：
   - README 文件内容
   - 指定时间范围内的提交记录
   - 完整的代码变更 diff

2. **格式化阶段**：将收集的信息整理为结构化的 Markdown 文档

3. **总结阶段**：调用 ClaudeCode AI 生成高层次的工作周报

