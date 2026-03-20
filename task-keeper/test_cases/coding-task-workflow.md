# 编码任务典型运行流程

本文档展示一个编码任务从创建到完成的精简命令流程。

## 场景说明

假设我们需要为一个 Web 应用添加用户认证功能，包括登录、注册和 JWT token 验证。

---

## 步骤 1: 初始化项目（如果是新项目）

```bash
# 在项目目录初始化 Task Keeper
cd /path/to/my-project
tk init
```

**检查点**: 
- `tasks/` 目录已创建
- `templates/` 目录已创建并包含 20 个模板文件
- `.task-keeper` 标记文件存在

---

## 步骤 2: 创建编码任务（使用 here document）

使用 here document 直接从命令行输入任务描述：

```bash
tk add <<'EOF'
---
title: 实现用户认证系统
type: CODING
priority: HIGH
tags: [backend, security]
project: web-app
assignee: zhangsan
due_date: 2026-03-20
---

# 实现用户认证系统

## 任务背景

当前 web 应用缺少用户认证机制，所有接口都是公开的，存在安全风险。
需要实现一套完整的认证系统，支持用户注册、登录和基于 JWT 的访问控制。

## 任务目标

- 实现用户注册接口（/api/auth/register）
- 实现用户登录接口（/api/auth/login）
- 实现 JWT token 生成和验证

## 技术方案

### 架构设计

采用标准的 JWT 认证流程：
1. 用户注册：密码使用 bcrypt 加密存储
2. 用户登录：验证通过后返回 JWT access token 和 refresh token

### 接口设计

**POST /api/auth/register**
- Request: `{"username": "string", "email": "string", "password": "string"}`
- Response: `{"id": "uuid", "username": "string", "email": "string", "created_at": "datetime"}`

**POST /api/auth/login**
- Request: `{"email": "string", "password": "string"}`
- Response: `{"access_token": "string", "refresh_token": "string", "expires_in": 3600}`

## 验收标准

- [ ] 用户可以成功注册账号
- [ ] 用户可以使用正确的邮箱密码登录
- [ ] 登录后获得有效的 JWT token
- [ ] 携带 token 可以访问受保护接口

EOF
```

**说明**: 
- 使用 `<<'EOF'` 语法（单引号）可避免 shell 变量展开
- 系统会自动检测标准输入，无需额外选项
- 无需创建临时文件，更简洁高效

**检查点**:
- 输出包含完整 task-id（格式：`task-YYYYMMDD-HHMMSS-xxxxxx`）
- `tasks/YYYY-MM-DD/` 目录下生成两个文件：描述文件和结果文件

---

## 步骤 3: 启动 Claude 执行任务

```bash
tk run <task-id>
```

**检查点**:
- 输出显示 tmux 会话名称（格式：`tk-task-YYYYMMDD-HHMMSS-xxxxxx`）
- `workspaces/<task-id>/` 目录已创建
- `workspaces/<task-id>/prompt.md` 文件存在
- 结果文件已重命名为 `*_result_IN_PROGRESS.md`

---

## 步骤 4: 附加到会话观察执行

```bash
tk attach <task-id>
```

**检查点**:
- 进入 tmux 会话
- 看到 Claude 正在执行（输出实时更新）

**操作提示**: 按 `Ctrl+B` 然后 `D` 分离会话，让任务继续在后台运行

---

## 步骤 5: 查看任务完成状态

```bash
tk show <task-id>
```

**检查点**:
- Status 字段显示为 `DONE` 或 `BLOCKED`
- 结果文件已重命名为 `*_result_DONE.md` 或 `*_result_BLOCKED.md`
- Updated 时间戳已更新

---

## 完整命令速查

```bash
# 1. 初始化项目
tk init

# 2. 使用 here document 创建任务
tk add <<'EOF'
---
title: 实现用户认证系统
type: CODING
priority: HIGH
---
# 任务内容...
EOF

# 3. 启动执行
tk run <task-id>

# 4. 附加到会话
tk attach <task-id>

# 5. 分离会话（在 tmux 中）
# Ctrl+B 然后 D

# 6. 查看任务状态
tk show <task-id>

# 7. 查看运行中的会话
tk ps

# 8. 查看任务输出
tk log <task-id>

# 9. 杀掉会话（如需要）
tk kill <task-id>
```

---

## 关键文件位置

- **任务描述**: `tasks/YYYY-MM-DD/HHMMSS_slug.md`
- **任务结果**: `tasks/YYYY-MM-DD/HHMMSS_slug_result_<STATUS>.md`
- **工作空间**: `workspaces/<task-id>/`
- **提示词文件**: `workspaces/<task-id>/prompt.md`
- **输出结果**: `workspaces/<task-id>/result.md`

---

## 注意事项

1. **环境依赖**: 需要安装 `tmux` 和 `claude` CLI，Python 3.10+
2. **会话管理**: 任务完成后会话自动关闭，使用 `--keep-session` 可保持会话
3. **状态同步**: 状态更新通过文件重命名实现，依赖回调脚本 `scripts/on_task_complete.py`
4. **并发执行**: 每个任务有独立的 tmux 会话和工作空间，可同时运行多个任务
