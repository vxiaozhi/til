# Task Keeper 命令参考

## 项目初始化

### `tk init [PATH]`
初始化新项目。会创建目录结构、复制默认模板和回调脚本。

**参数:**
- `PATH` - 项目路径(可选，默认当前目录)

**创建内容:**
- `tasks/` - 任务存储目录
- `templates/` - 任务模板目录(包含 40 个默认模板：每种类型 4 个)
- `workspaces/` - 执行工作空间
- `scripts/` - 回调脚本(包含 `on_task_complete.py`)
- `.task-keeper` - 项目标记文件
- `.gitignore` - Git 忽略文件

**示例:**
```bash
tk init
tk init /path/to/project
```

---

## 任务管理

### `tk add`
创建新任务。支持参数或 stdin 输入。

**选项:**
- `-t, --title TEXT` - 任务标题
- `-T, --type CHOICE` - 任务类型(必填，除非通过 stdin 提供)
  - 可选值: CODING, RESEARCH, BUGFIX, DOCUMENTATION, REVIEW, TESTING, REFACTORING, DEPLOYMENT, MEETING, LEARNING
- `-p, --priority CHOICE` - 优先级(默认 MEDIUM)
  - 可选值: CRITICAL, HIGH, MEDIUM, LOW
- `--tag TEXT` - 标签(可重复)
- `--assignee TEXT` - 负责人
- `--project TEXT` - 项目名称
- `--due-date TEXT` - 截止日期(YYYY-MM-DD)
- `--estimated-hours FLOAT` - 预计工时
- `--json` - JSON 格式输出

**示例:**
```bash
tk add --title "实现用户认证" --type CODING --priority HIGH
tk add -t "Bug修复" -T BUGFIX --tag backend --tag urgent --json
echo "任务内容" | tk add
```

### `tk list`
列出任务。

**选项:**
- `--status TEXT` - 按状态过滤(逗号分隔)
  - 可选值: TODO, IN_PROGRESS, BLOCKED, REVIEW, DONE, CANCELLED
- `--type TEXT` - 按类型过滤(逗号分隔)
- `--priority TEXT` - 按优先级过滤(逗号分隔)
- `--tag TEXT` - 按标签过滤
- `--project TEXT` - 按项目过滤
- `--assignee TEXT` - 按负责人过滤
- `--due-before TEXT` - 截止日期早于(YYYY-MM-DD)
- `--due-after TEXT` - 截止日期晚于(YYYY-MM-DD)
- `--overdue` - 仅显示过期任务
- `--json` - JSON 格式输出

**示例:**
```bash
tk list
tk list --status TODO,IN_PROGRESS
tk list --type CODING --priority HIGH
tk list --tag backend --overdue --json
```

### `tk show <TASK_ID>`
显示任务详情。

**参数:**
- `TASK_ID` - 任务 ID

**选项:**
- `--json` - JSON 格式输出

**示例:**
```bash
tk show task-20260314-142007-abc123
tk show task-20260314-142007-abc123 --json
```

### `tk update <TASK_ID>`
更新任务。

**参数:**
- `TASK_ID` - 任务 ID

**选项:**
- `--status CHOICE` - 新状态
- `--priority CHOICE` - 新优先级
- `--assignee TEXT` - 新负责人
- `--project TEXT` - 新项目名称
- `--due-date TEXT` - 新截止日期
- `--estimated-hours FLOAT` - 新预计工时
- `--add-tag TEXT` - 添加标签(可重复)
- `--remove-tag TEXT` - 移除标签(可重复)
- `--json` - JSON 格式输出

**示例:**
```bash
tk update task-20260314-142007-abc123 --status DONE
tk update task-20260314-142007-abc123 --priority CRITICAL --add-tag urgent
tk update task-20260314-142007-abc123 --assignee zhangsan --json
```

### `tk delete <TASK_ID>`
删除任务。

**参数:**
- `TASK_ID` - 任务 ID

**选项:**
- `--yes, -y` - 跳过确认(JSON 模式自动启用)
- `--json` - JSON 格式输出

**示例:**
```bash
tk delete task-20260314-142007-abc123
tk delete task-20260314-142007-abc123 -y --json
```

---

## 任务执行

### `tk run <TASK_ID>`
通过 Claude 在 tmux 会话中执行任务。

**参数:**
- `TASK_ID` - 任务 ID

**选项:**
- `-k, --keep-session` - 任务完成后保持会话(用于调试)
- `--json` - JSON 格式输出

**依赖:** tmux, claude CLI

**示例:**
```bash
tk run task-20260314-142007-abc123
tk run task-20260314-142007-abc123 --keep-session --json
```

### `tk ps`
列出运行中的任务会话。

**选项:**
- `--json` - JSON 格式输出

**示例:**
```bash
tk ps
tk ps --json
```

### `tk attach <TASK_ID>`
附加到运行中的任务会话(交互式)。

**参数:**
- `TASK_ID` - 任务 ID

**示例:**
```bash
tk attach task-20260314-142007-abc123
```

### `tk kill <TASK_ID>`
终止运行中的任务会话。

**参数:**
- `TASK_ID` - 任务 ID

**选项:**
- `--json` - JSON 格式输出

**示例:**
```bash
tk kill task-20260314-142007-abc123
tk kill task-20260314-142007-abc123 --json
```

### `tk log <TASK_ID>`
查看任务的 Claude 输出(交互式)。

**参数:**
- `TASK_ID` - 任务 ID

**示例:**
```bash
tk log task-20260314-142007-abc123
```

---

## 模板管理

### `tk template list`
列出所有可用模板。显示每种任务类型的描述、结果、Howto、Learned 四种模板文件的存在状态。

**选项:**
- `--json` - JSON 格式输出

**示例:**
```bash
tk template list
tk template list --json
```

### `tk template show <TASK_TYPE>`
显示特定类型的模板内容。

**参数:**
- `TASK_TYPE` - 任务类型

**选项:**
- `-r, --result` - 显示结果模板(默认显示描述模板)
- `-H, --howto` - 显示执行步骤指南模板
- `-l, --learned` - 显示经验知识模板
- `-a, --all` - 显示全部四种模板(描述、结果、Howto、Learned)
- `--json` - JSON 格式输出

**示例:**
```bash
tk template show CODING
tk template show CODING --result
tk template show CODING --howto
tk template show CODING --learned
tk template show CODING --all --json
```

---

## 统计报告

### `tk stats`
显示任务统计信息。

**选项:**
- `--project TEXT` - 指定项目
- `--json` - JSON 格式输出

**示例:**
```bash
tk stats
tk stats --project backend-api
tk stats --json
```

---

## JSON 输出格式

所有支持 `--json` 的命令输出格式:

**成功:**
```json
{
  "success": true,
  "data": {...}
}
```

**失败:**
```json
{
  "success": false,
  "error": "错误信息"
}
```

---

## 环境变量

- `TASK_KEEPER_ROOT` - 指定项目根目录路径，设置后可在任意目录使用 `tk` 命令

**示例:**
```bash
export TASK_KEEPER_ROOT=/path/to/project
tk list  # 在任意目录执行
```
