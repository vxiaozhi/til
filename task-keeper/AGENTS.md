# AGENTS.md 

## 重要
- 技术架构文档统一写在 `docs/` 目录下，并保持简洁。
- 确保 docs/目录 下所有文档能在 CODEBUDDY.md 中引用到。

## 项目概述

Task Keeper (任务管家) 是一个面向软件工程师的 CLI 任务管理和执行引擎。它使用 Markdown + YAML Front Matter 存储任务(无需数据库),并可通过 tmux 会话将任务执行委托给 Claude AI。文档和 UI 字符串使用中文,代码标识符和文档字符串使用英文。

## 相关文档

- [命令参考](docs/command-reference.md) - 所有 CLI 命令的详细参数和示例
- [任务状态转换图](docs/task-state-diagram.md) - 任务状态流转和工作流说明
- [编码任务典型流程](test_cases/coding-task-workflow.md) - 完整的任务执行示例（从创建到完成）

## 常用命令

以下是最常用的命令快速参考。完整的命令列表和参数说明请参考 [命令参考文档](docs/command-reference.md)。

### 安装和开发
```bash
# 安装(可编辑/开发模式,注册 tk CLI)
pip install -e .

# 运行 CLI
tk <command>
```

### 项目初始化
```bash
# 在当前目录初始化新项目
tk init

# 在指定目录初始化项目
tk init /path/to/project

# 设置环境变量(可在任意目录使用)
export TASK_KEEPER_ROOT=/path/to/project
```

初始化会自动创建项目结构并复制所有默认模板文件（CODING, RESEARCH, BUGFIX, DOCUMENTATION, REVIEW, TESTING, REFACTORING, DEPLOYMENT, MEETING, LEARNING，每种类型包含描述、结果、Howto、Learned 四个文件），可立即使用 `tk add` 创建任务。

项目根查找优先级: 1) `TASK_KEEPER_ROOT` 环境变量, 2) 向上查找包含 `.task-keeper` 或 `tasks/`+`templates/` 的目录。

### 任务管理
```bash
# 创建任务（会返回完整 task-id）
tk add --title "实现用户认证" --type CODING --priority HIGH
# 输出: ✓ Task created: task-20260314-142007-abc123

# 列出任务（显示完整 ID）
tk list                                    # 所有任务
tk list --status TODO,IN_PROGRESS          # 按状态
tk list --type CODING --priority HIGH      # 按类型和优先级
tk list --tag backend                      # 按标签
tk list --due-before 2026-03-20           # 截止日期
tk list --overdue                          # 过期任务

# 查看任务详情
tk show task-20260314-142007-abc123

# 更新任务状态
tk update task-20260314-142007-abc123 --status DONE
tk update task-20260314-142007-abc123 --priority CRITICAL

# 删除任务
tk delete task-20260314-142007-abc123
```

### 模板管理
```bash
tk template list            # 列出所有模板类型（含 Howto/Learned 状态）
tk template show <type>     # 查看特定类型的描述模板
tk template show <type> -r  # 查看结果模板
tk template show <type> -H  # 查看 Howto 执行步骤指南
tk template show <type> -l  # 查看 Learned 经验知识
tk template show <type> -a  # 查看全部四种模板
```

### 任务执行引擎(需要 tmux 和 claude CLI)
```bash
tk run <task-id>      # 在分离的 tmux 会话中启动 Claude
tk ps                 # 列出正在运行的会话
tk attach <task-id>   # 附加到正在运行的会话
tk kill <task-id>     # 终止会话
tk log <task-id>      # 查看会话输出
```

### 统计报告
```bash
tk stats                      # 全局统计
tk stats --project <name>     # 特定项目统计
```

**注意**: 该项目目前没有配置测试、代码检查或格式化工具。

## 架构设计

### 双文件任务模型

Task Keeper 的核心设计理念是将任务信息分离为两个独立的 Markdown 文件:

1. **描述文件** (`HHMMSS_slug.md`): 存储不可变的任务信息(目标、技术方案、背景)。包含 YAML front matter + Markdown body。

2. **结果文件** (`HHMMSS_slug_result_STATUS.md`): 存储可变的执行状态。状态编码在文件名中,通过文件重命名来更新状态。

**任务 ID 格式**: `task-YYYYMMDD-HHMMSS-{6-char-hex}`

**存储位置**: 所有任务文件存储在 `tasks/YYYY-MM-DD/` 目录下,按日期分区组织。

**设计优势**:
- 职责清晰: 描述是"要做什么",结果是"做得怎么样"
- Git 友好: diff 更清晰,减少合并冲突
- 状态可见: 从文件名直接看到任务状态
- 易于浏览: 相同前缀的文件在目录中相邻排列

### 分层架构

```
CLI Layer (task_keeper/cli/)
    ├── main.py              # Click 命令组入口
    ├── add.py, list_cmd.py  # 各子命令独立文件
    └── context.py           # AppContext 依赖注入容器
           │
           ↓
Service Layer (task_keeper/services/)
    ├── TaskService          # 任务 CRUD 操作
    ├── TemplateService      # 模板加载和渲染
    └── QueryService         # 过滤、搜索、统计
           │
           ↓
Storage Layer (task_keeper/storage/)
    ├── MarkdownStorage      # YAML front matter 读写
    └── TaskScanner          # 文件系统扫描 tasks/ 目录
           │
           ↓
Executor Layer (task_keeper/executor/)
    ├── PromptAssembler      # 从任务+模板构建提示词
    ├── WorkspaceManager     # 每任务独立工作目录管理
    └── TmuxManager          # tmux 会话生命周期管理
```

### AppContext 和项目根查找

`AppContext` (在 `cli/context.py` 中定义) 是核心依赖注入容器,负责:
- **项目根自动发现**(按优先级):
  1. 检查 `TASK_KEEPER_ROOT` 环境变量
  2. 从当前目录向上查找包含 `.task-keeper` 标记文件的目录
  3. 查找同时包含 `tasks/` 和 `templates/` 目录的目录
  4. 检查 `pyproject.toml` 中 `project.name = "task-keeper"` 的目录
- 如果找不到项目根,抛出 `ProjectRootNotFoundError` 并提示用户运行 `tk init`
- 初始化所有服务层、存储层和执行器组件
- 通过 Click 的 context 对象传递给各个命令

**环境变量支持**: 设置 `export TASK_KEEPER_ROOT=/path/to/project` 后可在任意目录使用 `tk` 命令。

### 任务执行流程 (`tk run`)

1. 读取任务描述文件 + 从 `templates/` 加载匹配的结果模板和 howto 模板
2. `PromptAssembler` 构建完整的提示词(包含任务信息、描述内容、执行步骤指南和输出要求)
3. `WorkspaceManager` 在 `workspaces/{task-id}/` 下创建隔离的工作目录
4. 将 `prompt.md` 写入工作空间
5. `TmuxManager` 启动分离的 tmux 会话,运行命令:
   ```bash
   claude -p "$(cat prompt.md)" --output-file result.md
   ```
6. 任务完成时,`scripts/on_task_complete.py` 回调脚本:
   - 读取 Claude 的输出
   - 写入结果文件的 markdown body
   - 更新 YAML front matter (status, updated_at)
   - 重命名文件以反映新状态 (DONE 或 BLOCKED)

### 模板系统

- **位置**: `templates/` 目录
- **命名**: 每种任务类型配套四个文件
  - `TYPE.md`: 描述文件模板
  - `TYPE_result.md`: 结果文件模板
  - `TYPE_howto.md`: 执行步骤指南（howto）
  - `TYPE_learned.md`: 经验知识积累（learned）
- **语法**: 使用 `{{variable}}` 占位符（描述和结果模板）
- **Howto**: 纯 Markdown 格式的结构化执行步骤,在 `tk run` 时自动注入到 prompt 中指导 AI 执行
- **Learned**: 纯 Markdown 格式的经验记录框架,供项目级手工追加经验教训,仅供人工查阅
- **支持的类型**: CODING, RESEARCH, BUGFIX, DOCUMENTATION, REVIEW, TESTING, REFACTORING, DEPLOYMENT, MEETING, LEARNING

### 数据模型和枚举

**TaskType** (任务类型):
- CODING, RESEARCH, DOCUMENTATION, REVIEW, BUGFIX, TESTING, REFACTORING, DEPLOYMENT, MEETING, LEARNING

**TaskStatus** (任务状态):
- TODO (待办)
- IN_PROGRESS (进行中)
- BLOCKED (阻塞)
- REVIEW (待审查)
- DONE (已完成)
- CANCELLED (已取消)

详细的状态转换规则和工作流示例请参考 [任务状态转换图](docs/task-state-diagram.md)。

**Priority** (优先级):
- CRITICAL (紧急重要, P0)
- HIGH (高优先级, P1)
- MEDIUM (中优先级, P2)
- LOW (低优先级, P3)

### 关键数据目录

- `tasks/`: 任务存储(按日期分区的子目录)
- `templates/`: 任务类型模板配对文件
- `workspaces/`: 为 Claude 执行提供的每任务独立工作目录
- `scripts/`: 回调脚本(如 `on_task_complete.py`)

### 运行时依赖

执行引擎功能 (`tk run`/`ps`/`attach`/`kill`/`log`) 需要:
- **tmux**: 终端多路复用器(安装: `brew install tmux`)
- **claude CLI**: Anthropic 的 Claude 命令行工具,以非交互模式调用(`-p` 标志)

### 技术栈

**核心依赖**:
- Python 3.10+
- PyYAML: YAML 解析
- Click: CLI 框架
- Rich: 终端美化输出(彩色表格)

**标准库**:
- pathlib: 文件路径操作
- datetime: 日期时间处理
- dataclasses: 数据模型
- re: 正则表达式匹配
- subprocess: 调用外部命令(tmux, claude)

## 重要实现细节

### 状态更新机制
任务状态变更不通过修改文件内容,而是通过重命名结果文件来实现。这使得状态在文件系统层面可见,无需打开文件即可了解任务状态。

### MarkdownStorage
负责 YAML front matter 的序列化和反序列化,使用正则表达式解析 `---\n...\n---` 格式的元数据块。

### TaskScanner
遍历 `tasks/` 目录树,扫描所有 `.md` 文件,根据文件命名约定识别描述文件和结果文件,并将它们配对为完整的 Task 对象。

### Tmux 会话命名
会话名格式: `tk-{完整task-id}`，例如 `tk-task-20260314-194038-4353f5`。使用完整 task-id 可避免会话名冲突，允许通过标准 tmux 命令手动管理会话。

### 回调机制
`on_task_complete.py` 脚本设计为可被 shell 钩子或 tmux hook 触发。当前需要手动调用或通过自定义包装器集成。

## 文件组织模式

代码遵循清晰的模块化结构:
- **每个 CLI 命令一个文件** (`cli/` 目录)
- **按职责分离服务** (`services/` 目录)
- **存储抽象** (`storage/` 目录)
- **执行器组件** (`executor/` 目录)
- **数据模型集中管理** (`models/` 目录)

## 扩展和定制

### 添加新任务类型
1. 在 `models/enums.py` 的 `TaskType` 枚举中添加新类型
2. 在 `templates/` 目录创建 `NEWTYPE.md`、`NEWTYPE_result.md`、`NEWTYPE_howto.md` 和 `NEWTYPE_learned.md`
3. 无需修改代码,系统会自动识别新模板

### 添加新 CLI 命令
1. 在 `cli/` 目录创建新文件,定义 Click 命令
2. 在 `cli/main.py` 中导入并注册命令
3. 通过 `@click.pass_context` 访问 `AppContext` 获取服务

### 自定义提示词组装
修改 `executor/prompt.py` 中的 `PromptAssembler` 类,调整 `SYSTEM_INTRO` 或 `assemble()` 方法的输出格式。
