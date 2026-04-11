# AI Agent Sandbox 方案深度研究

## 摘要

本报告对当前主流的 AI Agent 沙箱方案进行了全面的技术调研和对比分析。研究覆盖两大场景：

- 桌面 Agent 自托管 Agent（运行在用户本地机器上）和
- 托管 Agent Cloud-hosted Agent（运行在云端基础设施上）

涉及容器化沙箱、微虚拟机沙箱、进程级隔离方案以及 Serverless FaaS 等四大技术路线

核心结论如下：

- 第一，对于桌面 Agent 场景，OpenSandbox 是当前最推荐的开源方案，它在多语言 SDK 支持、安全运行时透明切换、AI 场景原生适配度和社区活跃度方面取得了最佳平衡；
- 第二，对于托管 Agent / SaaS 场景，E2B 是市场验证最充分的选择（Firecracker 微VM 硬件级隔离 + 150ms 冷启动 + BYOC 私有化部署），GPU 密集型工作负载则推荐 Modal，K8s 原生团队选择 agent-sandbox，极致成本效益选 Cloud Run；
- 第三，无论哪种场景，统一推荐"Agent 在外、危险操作委托给 Sandbox"的外部模式，并在此基础上构建纵深防御体系——凭证集中管理（绝不传入 LLM 上下文）、eBPF 运行时监控、网络微隔离、供应链安全扫描和人工审批网关。

## 研究背景与问题定义

随着大语言模型能力的快速演进，AI Agent 从简单的对话机器人演变为能够自主执行代码、操作文件系统、控制浏览器甚至调用任意 API 的复杂系统。这种能力跃升带来了一个根本性的安全问题：如何安全地执行 AI 生成的不可信代码？

传统的代码沙箱主要解决两类威胁：

- 一是恶意对手主动利用内核漏洞进行逃逸攻击，
- 二是限制程序对系统资源的访问。但 AI Agent 面临的威胁模型有本质不同——Agent 本身没有恶意意图，它只是根据提示词（包括可能被注入的恶意提示）执行操作。
- 因此，真正的风险不是"沙箱能否被攻破"，而是"沙箱内部的 Agent 能访问什么资源"。这一认知转变是理解当前沙箱技术选型的关键前提。

## 方案分类与技术路线

当前的 AI Agent 沙箱方案可以归纳为三条主流技术路线：

### 第一条是微虚拟机（MicroVM）路线
- 代表项目包括 E2B、CodeSandbox SDK、Sprites、Zeroboot。
- 这条路线以 AWS Firecracker 为核心技术，为每个沙箱实例提供独立的内核级隔离。
- 其优势在于安全性最强——每个沙箱拥有完全独立的内核上下文，即使宿主机内核存在漏洞也无法直接影响到沙箱内部。
- 代价是启动延迟相对较高（通常在 500ms 到数秒之间），内存开销也更大（每实例约 5-50MB）。适合对安全性要求极高的企业级场景。

### 第二条是增强容器路线，
- 代表项目包括 OpenSandbox、agent-sandbox (K8s SIG)、AIO Sandbox、Dify-Sandbox。
- 这条路线基于 Docker/K8s 容器，通过集成 gVisor（用户空间内核）、Kata Containers（轻量虚拟机）或 Firecracker 等安全运行时来增强隔离性。
- 它在性能和安全性之间取得了较好的折中：启动速度比纯 MicroVM 快，隔离强度又远超标准 runc 容器。
- 特别值得一提的是，OpenSandbox 和 agent-sandbox 都原生支持多种安全运行时的透明切换，开发者可以根据实际需求选择合适的隔离级别。

### 第三条是进程级/内核策略路线，
- 这是 2026 年新兴的方向，以 Multikernel 的 Sandlock 项目为代表。
- 其核心理念是：既然 AI Agent 的主要威胁来自提示注入导致的误操作而非内核逃逸，那么应该将防护重点从硬件隔离转移到细粒度的访问控制策略上。
- 通过 Linux 内核原生的 Landlock（文件系统白名单）、seccomp-bpf（系统调用过滤）和 User Namespaces 等机制，可以在不增加显著开销的前提下实现有效的权限约束。
- 这条路线目前还处于早期阶段，但代表了行业的重要思考方向。

## SandBox 相关开源项目

- [codesandbox](https://github.com/codesandbox)
- [sandboxie-plus/Sandboxie](https://github.com/sandboxie-plus/Sandboxie)
- [langgenius/dify-sandbox](https://github.com/langgenius/dify-sandbox)
- [cloudflare/sandbox-sdk](https://github.com/cloudflare/sandbox-sdk)
- [agent-infra/sandbox](https://github.com/agent-infra/sandbox)
- [patriksimek/vm2](https://github.com/patriksimek/vm2) Advanced vm/sandbox for Node.js
- [kubernetes-sigs/agent-sandbox](https://github.com/kubernetes-sigs/agent-sandbox) agent-sandbox 能够便捷地管理隔离、有状态且单例的工作负载，非常适合用于AI代理运行时等应用场景。
- [rivet-dev/sandbox-agent](https://github.com/rivet-dev/sandbox-agent) 在沙箱中运行编程代理。通过HTTP进行控制。支持Claude Code、Codex、OpenCode和Amp。
- [alibaba/OpenSandbox](https://github.com/alibaba/OpenSandbox) OpenSandbox 是一个面向 AI 应用场景设计的「通用沙箱平台」，为大模型相关的能力（命令执行、文件操作、代码执行、浏览器操作、Agent 运行等）提供 多语言 SDK、沙箱接口协议和沙箱运行时。
- [boxlite](https://github.com/boxlite-ai/boxlite)
- [vm0](https://github.com/vm0-ai/vm0)
- [zeroboot](https://github.com/zerobootdev/zeroboot)
- [containers/bubblewrap](https://github.com/containers/bubblewrap)
