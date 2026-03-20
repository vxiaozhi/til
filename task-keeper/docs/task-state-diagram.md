# Task Keeper 任务状态转换图

## 状态概览

Task Keeper 支持 6 种任务状态：

| 状态 | 说明 | 颜色标识 |
|------|------|---------|
| **TODO** | 待办 - 任务已创建，等待开始 | 🔵 蓝色 |
| **IN_PROGRESS** | 进行中 - 任务正在执行 | 🟡 黄色 |
| **BLOCKED** | 阻塞 - 任务遇到障碍，无法继续 | 🔴 红色 |
| **REVIEW** | 待审查 - 任务完成，等待代码审查 | 🟣 紫色 |
| **DONE** | 已完成 - 任务成功完成 | 🟢 绿色 |
| **CANCELLED** | 已取消 - 任务不再需要执行 | ⚫ 灰色 |

---

## 状态转换图

```
                    ┌──────────────────┐
                    │    tk add        │
                    │  (创建任务)       │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌─────────────────┐
            ┌──────▶│      TODO       │◀──────┐
            │       │     (待办)       │       │
            │       └────────┬─────────┘       │
            │                │                 │
            │    ┌───────────┴───────────┐     │
            │    │                       │     │
            │    │ tk run                │     │ tk update
            │    │ (启动执行引擎)         │     │ --status
            │    │                       │     │
            │    ▼                       ▼     │
            │ ┌─────────────────┐  ┌──────────────────┐
            │ │  IN_PROGRESS    │  │    CANCELLED     │
            │ │   (进行中)       │  │    (已取消)       │
            │ └────────┬─────────┘  └──────────────────┘
            │          │                     ▲
            │          │                     │
            │    ┌─────┴─────┐               │
            │    │           │               │
            │    ▼           ▼               │
            │ ┌─────────┐ ┌─────────┐        │
            └─│ BLOCKED │ │  REVIEW │        │
              │ (阻塞)   │ │ (待审查) │        │
              └────┬────┘ └────┬────┘        │
                   │           │             │
                   │           │             │
                   └─────┬─────┴─────────────┘
                         │
                         ▼
                  ┌─────────────┐
                  │    DONE     │
                  │  (已完成)    │
                  └─────────────┘
```

---

## 命令与状态的关系

### 1. 创建任务
```bash
tk add --title "任务标题" --type CODING --priority HIGH
```
- **初始状态**: TODO
- **说明**: 所有新创建的任务默认为 TODO 状态

### 2. 启动任务执行
```bash
tk run <task-id>
```
- **前置条件**: 状态必须为 TODO 或 BLOCKED
- **状态变更**: TODO/BLOCKED → IN_PROGRESS
- **行为**: 在 tmux 会话中启动 Claude AI 执行任务

### 3. 手动更新状态
```bash
tk update <task-id> --status <NEW_STATUS>
```
- **适用场景**: 任何状态间的手动切换
- **常见转换**:
  - TODO → IN_PROGRESS (手动开始任务)
  - IN_PROGRESS → BLOCKED (遇到障碍)
  - IN_PROGRESS → REVIEW (等待审查)
  - IN_PROGRESS → DONE (手动标记完成)
  - REVIEW → DONE (审查通过)
  - BLOCKED → TODO (障碍解决，重新排队)
  - 任何状态 → CANCELLED (取消任务)

### 4. 自动状态更新
当使用 `tk run` 执行任务时，系统会根据执行结果自动更新状态：
- **成功完成**: IN_PROGRESS → DONE
- **遇到阻塞**: IN_PROGRESS → BLOCKED

---

## 典型工作流

### 工作流 1: 正常完成
```
1. tk add -t "实现登录功能" -T CODING       → TODO
2. tk run task-xxx                          → IN_PROGRESS
3. (Claude 执行成功)                        → DONE
```

### 工作流 2: 需要审查
```
1. tk add -t "重构核心模块" -T REFACTORING  → TODO
2. tk run task-xxx                          → IN_PROGRESS
3. tk update task-xxx --status REVIEW       → REVIEW
4. (代码审查通过)
5. tk update task-xxx --status DONE         → DONE
```

### 工作流 3: 遇到阻塞
```
1. tk add -t "修复支付 Bug" -T BUGFIX       → TODO
2. tk run task-xxx                          → IN_PROGRESS
3. (发现依赖第三方 API，需要等待)
4. tk update task-xxx --status BLOCKED      → BLOCKED
5. (问题解决后)
6. tk run task-xxx                          → IN_PROGRESS
7. (继续执行)                               → DONE
```

### 工作流 4: 任务取消
```
1. tk add -t "调研方案 A" -T RESEARCH        → TODO
2. (需求变更，不再需要)
3. tk update task-xxx --status CANCELLED    → CANCELLED
```

---

## 状态过滤与查询

### 按状态列出任务
```bash
# 查看所有待办任务
tk list --status TODO

# 查看进行中和阻塞的任务
tk list --status IN_PROGRESS,BLOCKED

# 查看已完成的任务
tk list --status DONE

# 查看过期的待办任务
tk list --status TODO --overdue
```

### 状态统计
```bash
# 查看各状态的任务数量
tk stats

# 按项目统计
tk stats --project backend
```

---

## 文件系统层面的状态表示

任务状态编码在结果文件名中：

```
tasks/2026-03-14/
├── 143000_implement-auth.md                      # 描述文件
├── 143000_implement-auth_result_TODO.md          # 状态: TODO
├── 150000_fix-payment_result_IN_PROGRESS.md      # 状态: IN_PROGRESS
├── 153000_refactor-core_result_BLOCKED.md        # 状态: BLOCKED
├── 160000_review-pr_result_REVIEW.md             # 状态: REVIEW
└── 170000_deploy-prod_result_DONE.md             # 状态: DONE
```

**状态更新时**，系统会重命名结果文件：
```bash
# 例如: TODO → IN_PROGRESS
mv 143000_implement-auth_result_TODO.md \
   143000_implement-auth_result_IN_PROGRESS.md
```

这种设计使得：
- 📁 从文件名直接看到任务状态
- 🔍 可以用 shell 命令快速查找特定状态的任务
- 📊 Git diff 清晰展示状态变更历史

---

## 最佳实践

1. **任务创建后立即执行**: `tk add ... && tk run <task-id>`
2. **定期检查阻塞任务**: `tk list --status BLOCKED`
3. **审查流程**: 对重要任务使用 REVIEW 状态
4. **及时清理**: 完成的任务标记为 DONE，不需要的任务标记为 CANCELLED
5. **使用 --keep-session**: 调试时保持会话 `tk run <task-id> --keep-session`

---

## 状态约束

### 可执行状态（tk run）
只有以下状态的任务可以通过 `tk run` 启动：
- ✅ TODO
- ✅ BLOCKED

### 终态
以下状态视为任务的终态（通常不再变更）：
- DONE
- CANCELLED

### 活跃状态
以下状态表示任务仍在进行中：
- TODO
- IN_PROGRESS
- BLOCKED
- REVIEW
