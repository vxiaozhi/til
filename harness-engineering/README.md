# Harness Engineering（驭缰工程）

- [Harness Engineering 学习指南](https://github.com/deusyu/harness-engineering)
- [walkinglabs/awesome-harness-engineering](https://github.com/walkinglabs/awesome-harness-engineering) [清华大学深圳国际研究生院（THU SIGS）开源实验室] 精选文章、操作指南、基准测试、规范及开源项目列表，专为驾驭工程而设：该实践旨在塑造人工智能代理的周边环境，以确保其可靠工作。
- [walkinglabs/learn-harness-engineering](https://github.com/walkinglabs/learn-harness-engineering) [清华大学深圳国际研究生院（THU SIGS）开源实验室] 一门基于项目的课程，专注于构建环境、状态管理、验证与控制机制，以确保人工智能编码代理可靠运行。
- [HKUDS/OpenHarness/](https://github.com/HKUDS/OpenHarness/) 港大开源的轻量级 Agent 框架
- [gsd-build/get-shit-done](https://github.com/gsd-build/get-shit-done) 一个轻量但强大的元提示、上下文工程与规格驱动开发系统，适用于 Claude Code、OpenCode、Gemini CLI、Kilo、Codex、Copilot、Cursor、Windsurf、Antigravity、Augment、Trae、CodeBuddy 和 Cline。它解决的是 context rot：随着 Claude 的上下文窗口被填满，输出质量逐步劣化的问题。

## Cloude/托管 agent方案

- claude
- codebuddy
- [kubernetes-sigs/agent-sandbox](https://github.com/kubernetes-sigs/agent-sandbox)

## 实现

- [gstack](https://github.com/garrytan/gstack)
- [superpowers](https://github.com/obra/superpowers)
- [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent)
- [bytedance/deer-flow](https://github.com/bytedance/deer-flow) DeerFlow（Deep Exploration and Efficient Research Flow）是一个开源的 super agent harness。它把 sub-agents、memory 和 sandbox 组织在一起，再配合可扩展的 skills，让 agent 可以完成几乎任何事情。
- [xixu-me/awesome-persona-distill-skills](https://github.com/xixu-me/awesome-persona-distill-skills) 这个网站收集了 同事.skill、前任.skill、女娲.skill、自己.skill、乔布斯.skill……

## 自进化

- [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent)
- [lsdefine/GenericAgent](https://github.com/lsdefine/GenericAgent) GenericAgent 是一个极简、自我进化的自主 Agent 框架，赋予任何 LLM 对本地计算机的系统级控制权。其核心代码量仅约 3,000 行，围绕 9 个原子工具 和一个 约 100 行的 Agent 执行循环 构建。 [使用教程](https://datawhalechina.github.io/hello-generic-agent/part1/chapter1/)

## Agent 记忆

- [Tencent/TencentDB-Agent-Memory](https://github.com/Tencent/TencentDB-Agent-Memory) TencentDB Agent Memory = 符号化短期记忆 + 分层式长期记忆。符号化短期记忆：将厚重的工具日志分层卸载，逐步总结成轻量级 Mermaid 结构符号，大幅降低 Token 消耗的同时提升任务成功率。分层式长期记忆：把碎片化对话层层提炼，沉淀出有层次的画像与场景，不再是扁平的向量堆砌。

## Agent 管理生态

- [gastownhall/beads](https://github.com/gastownhall/beads) Beads (bd) 是一款专为 AI 编程 Agent 打造的分布式图谱化问题追踪器。它用具备依赖感知且受版本控制的知识图谱，取代了零散的 Markdown 计划文档——使得 Agent 与人类能够在长周期任务中协同工作，且永不丢失上下文。无论你是独立开发者、Agent 团队，还是人机混合工作流，Beads 都能为每位参与者提供伴随代码存在的持久化结构化记忆。
- [openai/symphony](https://github.com/openai/symphony) Symphony 是一个长时间运行的自动化服务，能够将项目工作转化为隔离的、自主的执行过程。团队无需人工监督 coding agent，Symphony 会自行管理工作——轮询问题追踪器、为每个问题创建独立的工作区，并启动 coding agent 会话，这些会话将独立运行直至完成。

## CLI 生态

- 飞书 cli
- 钉钉 cli
- 企业微信 cli
- [jackwener/OpenCLI](https://github.com/jackwener/OpenCLI) 让任何网站与工具成为你的命令行界面。一个通用的CLI枢纽和AI原生运行时环境。将任意网站、Electron应用或本地二进制文件转化为标准化的命令行接口。专为AI智能体设计，通过统一的AGENT.md集成，实现工具的发现、学习与无缝执行。
- [nashsu/AutoCLI](https://github.com/nashsu/AutoCLI) 极速、安全的命令行工具 —— 一行命令快速获取任意网站信息。覆盖 Bilibili、知乎、小红书、Twitter/X、Reddit、YouTube、HackerNews 等 55+ 站点，同时支持控制 Electron 桌面应用、集成本地 CLI 工具（gh、docker、kubectl），通过浏览器会话复用和 AI 原生发现能力驱动。基于 OpenCLI（TypeScript）用 纯 Rust 完整重写。功能对等，最高快 12 倍，内存省 10 倍，单文件 4.7MB，零运行时依赖。
- [HKUDS/CLI-Anything](https://github.com/HKUDS/CLI-Anything) CLI-Anything: 让所有软件都能被 Agent 驱动 .今天的软件为人而生👨‍💻，明天的用户是 Agent🤖
- [microsoft/playwright-cli](https://github.com/microsoft/playwright-cli) 常见Playwright操作的命令行界面。录制并生成Playwright代码，检查选择器及截取屏幕截图。
