# Harness 最佳实践

## 命令行工具安装及管理

- [jdx/mise](https://github.com/jdx/mise)

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

### 2. OpenSpec
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

```
# Install beads CLI (system-wide - don't clone this repo into your project)
curl -fsSL https://raw.githubusercontent.com/gastownhall/beads/main/scripts/install.sh | bash

# Initialize in YOUR project
cd your-project
bd init

# Tell your agent
echo "Use 'bd' for task tracking" >> AGENTS.md
```

