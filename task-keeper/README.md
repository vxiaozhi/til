# Task Keeper - 任务管家

一个面向软件工程师的轻量级命令行任务管理工具，使用 Markdown + YAML Front Matter 存储任务，无需数据库。

## 核心特性

- 📝 **双文件架构**: 任务描述与执行结果分离，职责清晰
- 🗂️ **文件系统存储**: 每个任务独立的 Markdown 文件，Git 友好
- 🏷️ **状态追踪**: 文件名包含任务状态，一目了然
- 🔍 **灵活查询**: 支持按状态、类型、优先级、标签等多维度过滤
- 🎨 **美观输出**: 使用 Rich 库提供彩色表格输出
- 🤖 **AI 执行引擎**: 集成 Claude AI + tmux，自动化任务执行
- 🚀 **零数据库**: 无需数据库，使用 Python 标准库为主

## 快速开始

### 安装

```bash
# 安装（可编辑/开发模式，注册 tk CLI）
pip install -e .
```

### 项目初始化

```bash
# 在当前目录初始化新项目
tk init

# 在指定目录初始化项目
tk init /path/to/project

# 设置环境变量（可在任意目录使用）
export TASK_KEEPER_ROOT=/path/to/project
```

初始化会自动创建项目结构并复制所有默认模板文件，可立即使用 `tk add` 创建任务。

### 基础用法

```bash
# 创建任务（会返回完整的 task-id）
tk add --title "实现用户认证" --type CODING --priority HIGH
# 输出: ✓ Task created: task-20260314-142007-abc123

# 列出所有任务（显示完整 ID）
tk list

# 查看任务详情
tk show task-20260314-142007-abc123

# 更新任务状态
tk update task-20260314-142007-abc123 --status IN_PROGRESS  # 开始任务
tk update task-20260314-142007-abc123 --status DONE         # 完成任务

# 删除任务
tk delete task-20260314-142007-abc123
```

## 文件结构

```
task_keeper/
├── tasks/                          # 任务存储目录
│   └── 2026-03-14/                # 按日期组织
│       ├── 142007_untitled.md              # 描述文件
│       └── 142007_untitled_result_TODO.md  # 结果文件
├── templates/                      # 任务模板（每种类型4个文件）
│   ├── CODING.md                  # 描述模板
│   ├── CODING_result.md           # 结果模板
│   ├── CODING_howto.md            # 执行步骤指南
│   ├── CODING_learned.md          # 经验知识积累
│   └── ...                        # 其他任务类型
├── workspaces/                     # 任务执行工作目录
├── scripts/                        # 回调脚本
│   └── on_task_complete.py        # 任务完成回调
├── examples/                       # 命令示例脚本
├── task_keeper/                    # 源代码
│   ├── cli/                       # 命令行接口
│   ├── models/                    # 数据模型
│   ├── storage/                   # 文件存储
│   ├── services/                  # 业务逻辑
│   ├── executor/                  # 任务执行引擎
│   └── utils/                     # 工具函数
├── plan.md                        # 设计文档
├── CODEBUDDY.md                   # 项目指南
└── README.md                      # 本文件
```

## 双文件架构

每个任务由两个文件组成：

### 1. 描述文件 (Description)
- **文件名**: `{HHMMSS}_{task-name}.md`
- **作用**: 存储任务的基本信息、目标、技术方案等**不变信息**
- **内容**: YAML Front Matter (元数据) + Markdown Body (详细描述)

### 2. 结果文件 (Result)
- **文件名**: `{HHMMSS}_{task-name}_result_{STATUS}.md`
- **作用**: 存储任务执行过程、进展、问题、决策等**可变信息**
- **内容**: YAML Front Matter (状态、进度) + Markdown Body (执行记录)
- **特点**: 状态变更时自动重命名文件

### Task ID 格式

**格式**: `task-YYYYMMDD-HHMMSS-{6位hex}`  
**示例**: `task-20260314-142007-abc123`

- `tk add` 创建任务时返回完整 ID
- `tk list` 显示完整 ID
- 所有命令都使用完整 ID

### 为什么分离？

1. **职责清晰**: 描述是"要做什么"，结果是"做得怎么样"
2. **版本友好**: Git diff 更清晰，减少合并冲突
3. **状态可见**: 从文件名直接看到任务状态
4. **易于浏览**: 相同前缀的文件在目录中相邻排列

## 模板系统

Task Keeper 为每种任务类型提供 **四个模板文件**，用于标准化任务创建和执行流程：

### 模板文件类型

每种任务类型（如 CODING、RESEARCH、BUGFIX 等）都包含以下四个模板文件：

1. **描述模板** (`TYPE.md`)
   - 用于创建任务时生成描述文件
   - 使用 `{{variable}}` 占位符（如 `{{title}}`、`{{description}}`）
   - 定义任务的基本信息、目标、技术方案等不变内容

2. **结果模板** (`TYPE_result.md`)
   - 用于创建任务时生成结果文件
   - 使用 `{{variable}}` 占位符
   - 定义任务执行过程、进展、问题记录的标准格式

3. **执行步骤指南** (`TYPE_howto.md`) 🔥
   - **定义任务如何被执行**的指导文档
   - 纯 Markdown 格式，包含结构化的执行步骤
   - **在 `tk run` 执行时自动注入到 prompt 中**，指导 AI 按照标准流程完成任务
   - 示例内容：需求分析、技术方案设计、任务拆解、编码实现、测试验证等步骤
   - 可包含针对 coding agent 的命令行参数和 prompt 模板建议

4. **经验知识** (`TYPE_learned.md`)
   - 纯 Markdown 格式的经验记录框架
   - 供项目级手工追加经验教训
   - 仅供人工查阅，不参与自动化执行

### Howto 模板的工作机制

当使用 `tk run <task-id>` 执行任务时：

1. **加载阶段**: 系统自动读取任务类型对应的 `TYPE_howto.md` 文件
2. **组装阶段**: `PromptAssembler` 将以下内容组装成完整 prompt：
   ```
   系统介绍
   ---
   任务信息 (ID、类型、优先级、标签等)
   ---
   任务描述 (描述文件的 body 内容)
   ---
   执行步骤指南 (howto 模板内容) 🔥
   ---
   输出要求 (结果模板内容)
   ```
3. **执行阶段**: 完整的 prompt 被传递给 Claude AI，指导其按照标准化步骤完成任务
4. **输出阶段**: AI 按照结果模板的格式输出执行结果

**示例 - CODING Howto 结构**:
```markdown
# 编码任务 (CODING) 执行步骤指南

## 1. 需求分析与理解
- 仔细阅读任务描述，理解业务背景和最终目标
- 明确验收标准和约束条件
...

## 2. 技术方案设计
- 分析现有代码结构，确定修改/新增的模块边界
- 设计整体架构，画出关键模块的交互关系
...

## 3-6. 更多步骤...
```

### 查看和管理模板

```bash
# 列出所有任务类型及其模板状态
tk template list

# 查看特定类型的各种模板
tk template show CODING     # 描述模板
tk template show CODING -r  # 结果模板
tk template show CODING -H  # 执行步骤指南
tk template show CODING -l  # 经验知识
tk template show CODING -a  # 全部四种模板
```

### 自定义模板

模板文件位于项目根目录的 `templates/` 文件夹，可直接编辑：

```bash
# 编辑 CODING 类型的 howto 模板
vim templates/CODING_howto.md

# 修改后立即生效，下次 tk run 时使用新的步骤指南
```

## 任务类型

- `CODING`: 编码任务
- `RESEARCH`: 调研任务
- `DOCUMENTATION`: 文档撰写
- `REVIEW`: 代码审查
- `BUGFIX`: Bug 修复
- `TESTING`: 测试任务
- `REFACTORING`: 重构
- `DEPLOYMENT`: 部署
- `MEETING`: 会议
- `LEARNING`: 学习

## 任务状态

- `TODO`: 待办
- `IN_PROGRESS`: 进行中
- `BLOCKED`: 阻塞
- `REVIEW`: 待审查
- `DONE`: 已完成
- `CANCELLED`: 已取消

## 优先级

- `CRITICAL`: 紧急重要 (P0)
- `HIGH`: 高优先级 (P1)
- `MEDIUM`: 中优先级 (P2)
- `LOW`: 低优先级 (P3)

## 高级用法

```bash
# 按条件过滤
tk list --status TODO,IN_PROGRESS
tk list --type CODING --priority HIGH
tk list --tag backend
tk list --project "用户中心"

# 日期范围查询
tk list --due-before 2026-03-20
tk list --overdue

# 统计报告
tk stats
tk stats --project UserManagementSystem

# 模板管理
tk template list            # 列出所有模板类型（含 Howto/Learned 状态）
tk template show CODING     # 查看描述模板
tk template show CODING -r  # 查看结果模板
tk template show CODING -H  # 查看执行步骤指南（howto）
tk template show CODING -l  # 查看经验知识（learned）
tk template show CODING -a  # 查看全部四种模板

# 任务执行引擎（需要 tmux 和 claude CLI）
tk run <task-id>      # 在分离的 tmux 会话中启动 Claude
tk ps                 # 列出正在运行的会话
tk attach <task-id>   # 附加到正在运行的会话
tk kill <task-id>     # 终止会话
tk log <task-id>      # 查看会话输出
```

## 技术栈

### 核心依赖
- Python 3.10+
- PyYAML: YAML 解析
- Click: CLI 框架
- Rich: 终端美化

### 标准库
- pathlib: 文件路径操作
- datetime: 日期时间处理
- dataclasses: 数据模型
- re: 正则表达式

### 运行时依赖（可选）
- **tmux**: 终端多路复用器（执行引擎需要）
- **claude CLI**: Anthropic 的 Claude 命令行工具（执行引擎需要）

## 开发计划

详见 [plan.md](./plan.md)

### Phase 1: MVP (核心功能) ✅
- ✅ 数据模型设计
- ✅ 文件格式定义
- ✅ Markdown 文件读写
- ✅ 基础 CRUD 命令

### Phase 2: 查询增强 ✅
- ✅ 任务扫描器
- ✅ 高级过滤
- ✅ Rich 表格输出

### Phase 3: 便捷命令 ✅
- ✅ 状态更新命令
- ✅ 模板管理
- ✅ 统计报告
- ✅ 任务执行引擎（tmux + Claude）

## 示例

查看 `examples/` 目录下的示例脚本，了解所有命令的详细用法：

- `01-init-project.sh` - 项目初始化
- `02-add-task-basic.sh` - 基础任务创建
- `03-add-task-advanced.sh` - 高级任务创建
- `04-list-tasks.sh` - 任务列表查询
- `05-list-with-filters.sh` - 过滤查询
- `06-show-task.sh` - 查看任务详情
- `07-update-task.sh` - 更新任务
- `08-delete-task.sh` - 删除任务
- `09-template-commands.sh` - 模板管理
- `10-run-task.sh` - 任务执行引擎
- `11-stats.sh` - 统计报告

实际任务文件示例见 `tasks/` 目录。

## 贡献

欢迎提交 Issue 和 Pull Request！

## License

MIT
