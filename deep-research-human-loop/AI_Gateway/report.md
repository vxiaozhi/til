# AI 网关开源项目及与传统 7 层网关的异同

> 深度调研报告 | 共 24 个开源项目 | 生成日期: 2026-06-14

## 目录

1. [Kong AI Gateway](#kong-ai-gateway) — Stars: 43,586 | Lua
2. [Apache APISIX AI Gateway](#apache-apisix-ai-gateway) — Stars: 16,725 | Lua
3. [Portkey](#portkey) — Stars: 12,059 | TypeScript
4. [Bifrost](#bifrost) — Stars: 5,738 | Go（核心 74.6%），TypeScript（UI 17.0%），Python（4.4%）
5. [kgateway](#kgateway) — Stars: 约 5,600 | Go（控制平面，93.3%）；Envoy 数据面为 C++；agentgateway 数据面为 Rust
6. [agentgateway](#agentgateway) — Stars: 3,260 | Rust
7. [Lunar MCPX（Lunar MCP Gateway）](#lunar-mcpxlunar-mcp-gateway) — Stars: 454 | TypeScript（60.9%），Go（29.7%），Python（3.4%）
8. [Gravitee Agent Mesh（现称 Gravitee AI Agent Management）](#gravitee-agent-mesh现称-gravitee-ai-agent-management) — Stars: 421 | Java
9. [Gate22](#gate22) — Stars: 177 | TypeScript（前端 Next.js，53%）+ Python（后端 FastAPI，46.3%）
10. [WSO2 AI Gateway（WSO2 AI 网关）](#wso2-ai-gatewaywso2-ai-网关) — Stars: 48 | Go
11. [Plano（原名 Arch Gateway / archgw）](#plano原名-arch-gateway--archgw) — Stars: 约 6,600（截至 2026 年 6 月） | Rust（70%），辅以 Python（18%）、TypeScript（11%）
12. [Docker MCP Gateway](#docker-mcp-gateway) — Stars: 1,452（截至 2026-06-13） | Go
13. [Envoy AI Gateway](#envoy-ai-gateway) — Stars: 约 1,748（截至 2026 年 6 月） | Go（控制面和外置处理器），C++（Envoy 数据面代理）
14. [GPT-Load](#gpt-load) — Stars: 6,221+（截至2026年6月） | Go（后端核心，使用Gin框架）+ Vue 3 / TypeScript（前端管理界面）。注意：该任务描述中标注为Python，但项目实际使用Go语言开发，非Python项目
15. [Helicone](#helicone) — Stars: 主平台约 5,800（截至 2026 年 6 月）；AI 网关约 601 | 主平台：TypeScript（91.2%），辅以 MDX、Python；AI 网关：Rust（96.7%），辅以 HCL、Shell
16. [Higress](#higress) — Stars: 8,643（截至 2026-06-14） | Go（80.3%），辅以 Rust、C++、TypeScript（Wasm 插件）
17. [Langfuse](#langfuse) — Stars: 29,033（截至2026年6月） | TypeScript（核心平台为 Next.js/Node.js，SDK 支持 Python 和 JS/TS）
18. [LiteLLM](#litellm) — Stars: 约 50,300（截至 2026 年 6 月） | Python（86.4%），辅以 TypeScript（12.7%）
19. [LobeChat Plugin Gateway（@lobehub/chat-plugins-gateway）](#lobechat-plugin-gatewaylobehubchat-plugins-gateway) — Stars: 25（截至 2026 年 6 月） | TypeScript（98.1%）
20. [One API](#one-api) — Stars: 34,900+（截至2026年6月，约34.9k） | Go（后端核心）+ JavaScript（前端Web界面），GitHub API标注主要语言为JavaScript因前端代码占比较多
21. [OptiLLM](#optillm) — Stars: 约 4,100（截至2026年6月） | Python
22. [TensorZero](#tensorzero) — Stars: 约 11,595（截至 2026 年 6 月归档时，仓库已设为只读） | Rust（79.4%），辅以 TypeScript（14.7%）、Python（4.0%）
23. [aisuite](#aisuite) — Stars: 约 14,200（截至 2026 年 6 月） | Python（同时提供 TypeScript/JavaScript 版本，支持 5 家 LLM 提供商的基础功能）
24. [New API](#new-api) — Stars: 38,688（截至2026年6月14日） | Go（后端 99.8%）+ React/Next.js（前端）

## 基本信息

### 1. Kong AI Gateway

- **项目名称**: Kong AI Gateway
- **GitHub 地址**: https://github.com/Kong/kong
- **Stars**: 43,586
- **主要语言**: Lua
- **开源协议**: Apache 2.0
- **背后公司/社区**: Kong Inc.（Kong 公司，总部位于美国旧金山，由 Marco Palladino 和 Augusto Marietti 于 2009 年创立）
- **首次发布**: 2024年2月15日（AI 网关功能作为 Kong Gateway 3.6 的六个 AI 插件首次发布，开源 beta 版）；2024年5月正式进入 GA（General Availability）阶段
- **官网**: https://konghq.com/products/kong-ai-gateway

### 2. Apache APISIX AI Gateway

- **项目名称**: Apache APISIX AI Gateway
- **GitHub 地址**: https://github.com/apache/apisix
- **Stars**: 16,725
- **主要语言**: Lua
- **开源协议**: Apache-2.0
- **背后公司/社区**: Apache Software Foundation（Apache 软件基金会）托管的顶级项目，由支流科技（API7.ai）于 2019 年创建并捐赠，社区共同维护
- **首次发布**: 2019 年 6 月 4 日（首个正式版本 v0.4）；项目仓库创建于 2019 年 4 月 10 日；AI 网关能力首次随 APISIX 3.12.0 于 2025 年 4 月 1 日正式发布
- **官网**: https://apisix.apache.org/（AI 网关专题页：https://apisix.incubator.apache.org/ai-gateway/）

### 3. Portkey

- **项目名称**: Portkey
- **GitHub 地址**: https://github.com/Portkey-AI/gateway
- **Stars**: 12,059
- **主要语言**: TypeScript
- **开源协议**: MIT
- **背后公司/社区**: Portkey, Inc.（总部旧金山，班加罗尔设有研发中心），2026年5月被 Palo Alto Networks 收购，估值约 1.2-1.4 亿美元
- **首次发布**: 2023年8月（GitHub 仓库创建于 2023-08-23，公司成立于 2023 年 3 月）
- **官网**: https://portkey.ai

### 4. Bifrost

- **项目名称**: Bifrost
- **GitHub 地址**: https://github.com/maximhq/bifrost
- **Stars**: 5,738
- **主要语言**: Go（核心 74.6%），TypeScript（UI 17.0%），Python（4.4%）
- **开源协议**: Apache 2.0
- **背后公司/社区**: Maxim AI（H3 Labs Inc.），总部位于印度班加罗尔和美国，由前 Google 和 Postman 工程师 Vaibhavi Gangwar 与 Akshay Deo 于 2023 年创立，2024 年 6 月获 Elevation Capital 领投的 300 万美元种子轮融资
- **首次发布**: 2025 年 3 月 19 日（GitHub 仓库创建日期）
- **官网**: https://www.getmaxim.ai/bifrost

### 5. kgateway

- **项目名称**: kgateway
- **GitHub 地址**: https://github.com/kgateway-dev/kgateway
- **主要语言**: Go（控制平面，93.3%）；Envoy 数据面为 C++；agentgateway 数据面为 Rust
- **开源协议**: Apache-2.0
- **背后公司/社区**: Solo.io 于 2018 年创建（原名 Gloo Gateway），2024 年 11 月 KubeCon NA 宣布捐赠给 CNCF，2025 年 3 月正式成为 CNCF Sandbox 项目，由 CNCF 进行厂商中立治理，6 家以上组织参与维护（含 4 名非 Solo.io 维护者）
- **首次发布**: 2018 年（原 Gloo 开源项目首次发布），2019 年初 GA；2025 年 4 月 1 日 kgateway v2.0.0 正式发布（CNCF 捐赠后首个大版本）；最新版本 v2.3.3（2026 年 6 月 12 日）
- **官网**: https://kgateway.dev

### 6. agentgateway

- **项目名称**: agentgateway
- **GitHub 地址**: https://github.com/agentgateway/agentgateway
- **Stars**: 3,260
- **主要语言**: Rust
- **开源协议**: Apache-2.0
- **背后公司/社区**: Solo.io 创建，2025年8月捐赠给 Linux Foundation，现由 Agentic AI Foundation (AAIF) 进行厂商中立治理，贡献者包括 AWS、Cisco、华为、IBM、Microsoft、Red Hat 等
- **首次发布**: 2025年3月18日（GitHub 仓库创建），2025年4月24日（官方正式发布）
- **官网**: https://agentgateway.dev

### 7. Lunar MCPX（Lunar MCP Gateway）

- **项目名称**: Lunar MCPX（Lunar MCP Gateway）
- **GitHub 地址**: https://github.com/TheLunarCompany/lunar（mcpx 子目录）
- **Stars**: 454
- **主要语言**: TypeScript（60.9%），Go（29.7%），Python（3.4%）
- **开源协议**: MIT
- **背后公司/社区**: Lunar.dev（TheLunarCompany）——以色列特拉维夫的AI基础设施公司
- **首次发布**: 2025年5月（MCPX首个官方博客公告为2025年5月29日；CHANGELOG最早可追溯版本v0.2.9发布于2025年8月19日；GitHub仓库最早创建于2023年8月15日，但初期为Lunar Proxy项目）
- **官网**: https://lunar.dev；文档：https://docs.lunar.dev/mcpx/

### 8. Gravitee Agent Mesh（现称 Gravitee AI Agent Management）

- **项目名称**: Gravitee Agent Mesh（现称 Gravitee AI Agent Management）
- **GitHub 地址**: https://github.com/gravitee-io/gravitee-api-management
- **Stars**: 421
- **主要语言**: Java
- **开源协议**: Apache 2.0
**背后公司/社区**: 

> Gravitee（GraviteeSource SARL，总部位于法国里尔，由 Rory Blundell、Azize Elamrani、David Brassely、Nicolas Géraud、Titouan Compiegne 于 2015 年联合创立。2025年5月完成 6000 万美元 C 轮融资，累计融资超 1.25 亿美元，服务 350+ 企业客户。连续两年入选 Gartner API Management 魔力象限领导者）


- **首次发布**: 2015年（公司/APIM 平台创立）；2025年6月20日（Agent Mesh AI 治理功能首次发布，随 Gravitee APIM 4.8 版本推出）；2025年10月（新增原生 MCP Proxy 和 AI IAM / OpenFGA 授权）
- **官网**: https://www.gravitee.io/platform/ai-gateway

### 9. Gate22

- **项目名称**: Gate22
- **GitHub 地址**: https://github.com/aipotheosis-labs/gate22
- **Stars**: 177
- **主要语言**: TypeScript（前端 Next.js，53%）+ Python（后端 FastAPI，46.3%）
- **开源协议**: Apache 2.0
- **背后公司/社区**: Aipotheosis Labs（Aipolabs），旗下运营 ACI.dev 平台，总部位于美国 Omaha, NE，2024 年成立，已获 300 万美元融资，通过 SOC 2 合规认证
- **首次发布**: 2025 年 10 月 1 日（v0.0.4），仓库创建于 2025 年 8 月 19 日
- **官网**: https://gateway.aci.dev（云端版：https://gate22.aci.dev，文档：https://gate22-docs.aci.dev）

### 10. WSO2 AI Gateway（WSO2 AI 网关）

- **项目名称**: WSO2 AI Gateway（WSO2 AI 网关）
- **GitHub 地址**: https://github.com/wso2/api-platform
- **Stars**: 48
- **主要语言**: Go
- **开源协议**: Apache 2.0
- **背后公司/社区**: WSO2 LLC（成立于 2005 年，总部位于美国加州山景城，专注于开源 API 管理和集成中间件）
- **首次发布**: 2024 年 11 月 5 日（WSO2 API Manager 4.4.0 首次引入 AI Egress API 管理功能）；独立 AI Gateway 组件 v0.9.0 于 2026 年 2 月 18 日发布，v1.0.0 GA 于 2026 年 4 月 2 日发布
- **官网**: https://wso2.com/api-platform/ai-gateway/

### 11. Plano（原名 Arch Gateway / archgw）

- **项目名称**: Plano（原名 Arch Gateway / archgw）
- **GitHub 地址**: https://github.com/katanemo/archgw
- **Stars**: 约 6,600（截至 2026 年 6 月）
- **主要语言**: Rust（70%），辅以 Python（18%）、TypeScript（11%）
- **开源协议**: Apache 2.0
- **背后公司/社区**: Katanemo Labs（2026 年 4 月被 DigitalOcean 收购）
- **首次发布**: 2024 年（首个 Show HN 在 2024 年末）
- **官网**: https://planoai.dev

### 12. Docker MCP Gateway

- **项目名称**: Docker MCP Gateway
- **GitHub 地址**: https://github.com/docker/mcp-gateway
- **Stars**: 1,452（截至 2026-06-13）
- **主要语言**: Go
- **开源协议**: MIT
- **背后公司/社区**: Docker, Inc.（Docker 公司官方项目，由 Docker 团队维护）
- **首次发布**: 2025年6月6日（v0.4.0，仓库创建于2025年4月22日）
- **官网**: 无独立官网；官方文档 https://docs.docker.com/ai/mcp-catalog-and-toolkit/mcp-gateway/

### 13. Envoy AI Gateway

- **项目名称**: Envoy AI Gateway
- **GitHub 地址**: https://github.com/envoyproxy/ai-gateway
- **Stars**: 约 1,748（截至 2026 年 6 月）
- **主要语言**: Go（控制面和外置处理器），C++（Envoy 数据面代理）
- **开源协议**: Apache 2.0
- **背后公司/社区**: Tetrate 与 Bloomberg 联合发起开源，CNCF Envoy 生态社区维护，贡献者来自 Tetrate、Bloomberg、WSO2、RedHat、Google 及独立开发者
- **首次发布**: 2025 年 2 月 25 日（v0.1.0），项目仓库创建于 2024 年 10 月 21 日
- **官网**: https://aigateway.envoyproxy.io

### 14. GPT-Load

- **项目名称**: GPT-Load
- **GitHub 地址**: https://github.com/tbphp/gpt-load
- **Stars**: 6,221+（截至2026年6月）
- **主要语言**: Go（后端核心，使用Gin框架）+ Vue 3 / TypeScript（前端管理界面）。注意：该任务描述中标注为Python，但项目实际使用Go语言开发，非Python项目
- **开源协议**: MIT
- **背后公司/社区**: 个人开发者tbphp（社区称T佬）主导开发，LINUX DO（linux.do）社区为核心用户社区。项目完全由社区驱动，无商业公司背景
- **首次发布**: 2025年6月13日（v0.1.1），首次commit于2025年6月6日
- **官网**: https://www.gpt-load.com

### 15. Helicone

- **项目名称**: Helicone
- **GitHub 地址**: 主平台：https://github.com/Helicone/helicone ；AI网关：https://github.com/Helicone/ai-gateway
- **Stars**: 主平台约 5,800（截至 2026 年 6 月）；AI 网关约 601
- **主要语言**: 主平台：TypeScript（91.2%），辅以 MDX、Python；AI 网关：Rust（96.7%），辅以 HCL、Shell
- **开源协议**: 主平台 helicone/helicone 使用 Apache 2.0；AI 网关 Helicone/ai-gateway 使用 GPL-3.0；Helm Chart 使用 Apache 2.0 with The Commons Clause
- **背后公司/社区**: Helicone（YC W23 孵化，总部位于旧金山），由创始人 Justin Torre（CEO）、Cole Gottdank（CTO）、Scott Nguyen 联合创立。2026 年 3 月被 Mintlify 收购，目前处于维护模式，新功能开发已暂停
- **首次发布**: 2023 年 1 月 31 日（GitHub 仓库创建）；YC W23 批次公开发布（2023 年初）；AI 网关于 2025 年 6 月 19 日发布 Beta 版
- **官网**: https://www.helicone.ai（文档站：https://docs.helicone.ai）

### 16. Higress

- **项目名称**: Higress
- **GitHub 地址**: https://github.com/higress-group/higress
- **Stars**: 8,643（截至 2026-06-14）
- **主要语言**: Go（80.3%），辅以 Rust、C++、TypeScript（Wasm 插件）
- **开源协议**: Apache-2.0
- **背后公司/社区**: 阿里巴巴/阿里云，2026年3月加入 CNCF Sandbox 项目，由阿里云 API 网关团队维护
- **首次发布**: 2022-11-01（GitHub v0.5.0 首次 Release）；2022-11-05（杭州云栖大会正式宣布开源）；2023-05-22（v1.0.0 GA 版本）
- **官网**: https://higress.io / https://higress.cn

### 17. Langfuse

- **项目名称**: Langfuse
- **GitHub 地址**: https://github.com/langfuse/langfuse
- **Stars**: 29,033（截至2026年6月）
- **主要语言**: TypeScript（核心平台为 Next.js/Node.js，SDK 支持 Python 和 JS/TS）
- **开源协议**: MIT（核心代码）；企业版功能（ee/ 目录）使用商业许可
- **背后公司/社区**: Langfuse GmbH（2026年1月被 ClickHouse 收购，团队整体加入 ClickHouse 继续独立开发；YC W23 孵化项目）
- **首次发布**: 2023年5月（GitHub 仓库创建于 2023-05-18，YC W23 批次）
- **官网**: https://langfuse.com

### 18. LiteLLM

- **项目名称**: LiteLLM
- **GitHub 地址**: https://github.com/BerriAI/litellm
- **Stars**: 约 50,300（截至 2026 年 6 月）
- **主要语言**: Python（86.4%），辅以 TypeScript（12.7%）
- **开源协议**: 核心 SDK/代理使用 MIT 协议；企业级功能（SSO/RBAC/审计日志等）使用商业许可
- **背后公司/社区**: BerriAI（YC W23 孵化，总部位于旧金山），由创始人 Ishaan Jaffer 和 Krrish Dholakia 领导，1,300+ 社区贡献者
- **首次发布**: 2023 年 8 月（YC 公开发布于 2023 年 8 月 24 日）
- **官网**: https://www.litellm.ai/（文档站点：https://docs.litellm.ai）

### 19. LobeChat Plugin Gateway（@lobehub/chat-plugins-gateway）

- **项目名称**: LobeChat Plugin Gateway（@lobehub/chat-plugins-gateway）
- **GitHub 地址**: https://github.com/lobehub/chat-plugins-gateway
- **Stars**: 25（截至 2026 年 6 月）
- **主要语言**: TypeScript（98.1%）
- **开源协议**: MIT
- **背后公司/社区**: LobeHub 开源社区，由 arvinxx 等社区开发者维护，隶属于 LobeChat 生态体系
- **首次发布**: 2023 年 8 月 13 日（GitHub 仓库创建）；首个 npm 版本 v1.0.0 发布于 2023 年 8 月
- **官网**: https://chat-plugins-gateway.lobehub.com（托管服务地址）；文档：https://chat-plugin-sdk.lobehub.com/guides/server-gateway

### 20. One API

- **项目名称**: One API
- **GitHub 地址**: https://github.com/songquanpeng/one-api
- **Stars**: 34,900+（截至2026年6月，约34.9k）
- **主要语言**: Go（后端核心）+ JavaScript（前端Web界面），GitHub API标注主要语言为JavaScript因前端代码占比较多
- **开源协议**: MIT
- **背后公司/社区**: 个人开发者宋全鹏（songquanpeng / JustSong）主导开发，社区协作维护。项目于2025年初停止主动维护后，社区fork出New API（QuantumNous/new-api）接替演进
- **首次发布**: 2023年4月23日（v0.1.0），首次commit于2023年4月22日
- **官网**: https://oneapi.justsong.cn/（官方演示站：https://openai.justsong.cn/）

### 21. OptiLLM

- **项目名称**: OptiLLM
- **GitHub 地址**: https://github.com/codelion/optillm
- **Stars**: 约 4,100（截至2026年6月）
- **主要语言**: Python
- **开源协议**: Apache 2.0
- **背后公司/社区**: Asankhaya Sharma（codelion）个人发起，现由 algorithmicsuperintelligence 组织维护，社区驱动开源项目
- **首次发布**: 2024年8月22日（GitHub 初始提交），2024年10月24日（PyPI 首个可用版本 0.0.2）

### 22. TensorZero

- **项目名称**: TensorZero
- **GitHub 地址**: https://github.com/tensorzero/tensorzero
- **Stars**: 约 11,595（截至 2026 年 6 月归档时，仓库已设为只读）
- **主要语言**: Rust（79.4%），辅以 TypeScript（14.7%）、Python（4.0%）
- **开源协议**: Apache 2.0（完全开源，无企业版功能保留）
**背后公司/社区**: 

> TensorZero 公司（总部纽约），由 CEO Gabriel Bianconi（前 Ondo Finance CPO，斯坦福 CS 学士及硕士）和 CTO Viraj Mehta（CMU 强化学习博士，斯坦福数学学士及 CS 硕士）联合创立。2025 年 8 月获 FirstMark 领投、Bessemer 和 Bedrock 跟投的 730 万美元种子轮融资。2026 年 6 月 12 日仓库归档、公司停止运营，剩余资金退还投资人。现有社区分支 Agentify Gateway（agentify-sh/gateway）继承代码继续开发


- **首次发布**: 2024 年 9 月 9 日（v2024.09.0，GitHub 仓库创建于 2024 年 7 月 16 日）
- **官网**: https://www.tensorzero.com

### 23. aisuite

- **项目名称**: aisuite
- **GitHub 地址**: https://github.com/andrewyng/aisuite
- **Stars**: 约 14,200（截至 2026 年 6 月）
- **主要语言**: Python（同时提供 TypeScript/JavaScript 版本，支持 5 家 LLM 提供商的基础功能）
- **开源协议**: MIT 协议，允许商业和非商业用途
- **背后公司/社区**: Andrew Ng（吴恩达）个人项目，与 DeepLearning.AI 生态关联，1,500+ Fork，32+ 贡献者
- **首次发布**: 2024 年 7 月 5 日（PyPI v0.1.0 首发）；吴恩达于 2024 年 11 月公开发布宣传
- **官网**: 无独立官网，GitHub 仓库即官方站点（https://github.com/andrewyng/aisuite）

### 24. New API

- **项目名称**: New API
- **GitHub 地址**: https://github.com/QuantumNous/new-api
- **Stars**: 38,688（截至2026年6月14日）
- **主要语言**: Go（后端 99.8%）+ React/Next.js（前端）
- **开源协议**: AGPL-3.0（GNU Affero General Public License v3.0），附加强制署名保留条款
- **背后公司/社区**: QuantumNous 团队维护，最初由 Calcium-Ion 基于 One API Fork 创建（2023年11月），2024年Q3由 QuantumNous 团队接手并更名
- **首次发布**: 2023年11月10日（GitHub 仓库创建）；最早 Release v0.0.4 发布于 2023年12月5日；品牌独立并正式发布为 New API 可追溯至 2024年Q3
- **官网**: https://www.newapi.ai / https://docs.newapi.pro

## 功能特性

### 1. Kong AI Gateway

**模型提供商支持**: 

> 支持 17 家以上主流 LLM 提供商，包括：OpenAI、Anthropic（Claude）、Azure OpenAI、AWS Bedrock、Google Gemini、Google Vertex AI、Cohere、Mistral、Meta Llama、xAI Grok、DeepSeek、Ollama、Datadog、vLLM（自托管）、HuggingFace、Cerebras、阿里云通义千问（DashScope）。所有提供商通过统一的 OpenAI 兼容 API 对外暴露，同时支持各提供商的 Native SDK 直通模式（v3.10+）。新增支持阿里云 DashScope 和 Cerebras（v3.13），持续扩展中。


**负载均衡**: 

> 支持 7 种负载均衡策略：加权轮询（Weighted Round-Robin）、一致性哈希（Consistent Hashing，用于粘性会话）、最少连接（Least Connections，v3.13+）、最低使用量（Lowest Usage，按 token 消耗/cost 选择）、最低延迟（Lowest Latency，基于 PEAK EWMA 跟踪）、语义路由（Semantic，基于向量嵌入匹配）、优先级路由（Priority，v3.10+，优先组失败时降级到备选组）。支持跨不同 API 格式的故障转移（如 OpenAI→Mistral）。


**速率限制**: 

> 支持三级速率限制：请求数级（传统 API 网关限流）、Token 级（ai-rate-limiting-advanced 插件，按 prompt_tokens/completion_tokens/total_tokens 限制）、金额级（按 input_cost 和 output_cost 计算实际美元成本，对 Consumer 预算进行实时扣减）。支持全局 Token 预算与单模型子上限组合（如'每日 100 万 Token 总预算，GPT-4o 最多 20 万'）。支持 local/cluster/redis 三种限流策略存储后端。


**缓存能力**: 

> 支持精确匹配缓存和语义缓存（AI Semantic Cache 插件）。语义缓存基于向量嵌入（cosine similarity），使用 Redis 作为向量数据库和响应缓存后端（支持 Redis Community Edition、Redis Cloud、AWS ElastiCache、Azure Managed Redis、Google Cloud Memorystore）。缓存命中时延迟低于 100ms，零 Token 消耗。配置参数包括：distance_metric、threshold（语义匹配严格度）、Redis TTL（默认 300 秒）。响应头包含 X-Cache-Status/Hit/Miss/Bypass/Refresh、X-Cache-Key、X-Cache-Ttl。注意：精确匹配模式仍可能返回语义相似的缓存结果。仅企业版提供。


**降级与重试**: 

> 支持多层级故障转移和自动重试机制。当目标提供商的故障标准（failover_criteria）满足时（包括错误、超时、HTTP 429/500 等），自动重试或切换到其他可用目标。v3.10+ 支持跨 API 格式的降级（如从 OpenAI 格式降级到 Mistral 格式）。v3.13+ 引入健康检查和断路器（circuit breaker），自动排除不健康目标并在可配置时间后重新评估。可配置 connect_timeout、read_timeout、write_timeout 和 retries 参数。


**认证与密钥管理**: 

> 基于 Consumer 模型的密钥管理：Key Auth 插件（API Key 认证）、OpenID Connect 插件（OIDC/SSO 集成，企业版）、ACL 和 RBAC 插件（细粒度访问控制）。支持虚拟密钥模式：真实提供商 API Key 存储在网关侧（AI Proxy 插件配置中注入），客户端使用 Kong 颁发的 API Key 发起请求，实现客户端凭证与提供商凭证的解耦。hide_credentials 选项用于在代理前剥离凭证，防止泄露。Kong Vaults 支持密钥轮转。注意：LiteLLM 或 Portkey 的原生'虚拟密钥'概念在 Kong 中对应 Consumer+credential 模式而非独立字段。


**可观测性**: 

> 支持多层可观测体系：Prometheus 插件暴露 AI 专用指标（ai_llm_requests_total、ai_llm_cost_total、ai_llm_tokens_total、ai_llm_provider_latency、ai_cache_fetch_latency 等），含 provider/model/cache_status/workspace/consumer/token_type/request_mode 等标签；OpenTelemetry 插件导出 gen_ai.* span 到 OTLP 兼容后端（支持 Langfuse、Grafana、Datadog），基于 W3C traceparent 实现端到端链路追踪；Kong Konnect 控制面提供统一 Dashboard 和审计日志。v3.12+ 新增 time_to_first_token 和 request_mode 观测指标。v3.13+ 新增 MCP 流量指标。限制：LLM 调用被视作带有 Token 元数据的 HTTP 请求，不原生展示 Agent 专用概念（工具调用、子 Agent、重试、评估分数），需通过自定义 Lua 插件或外部工具补充。


**请求/响应转换**: 

> 支持 OpenAI↔Anthropic（Claude）↔Cohere↔Gemini↔Bedrock↔Azure 等格式互转。AI Proxy 插件作为统一翻译层：接受标准 OpenAI 兼容格式请求，自动转换为目标提供商原生格式，并将响应转换回 OpenAI 格式。v3.10+ 支持 Native 格式直通模式（llm_format 参数），允许使用各提供商的 Native SDK 格式同时保留分析、日志和成本计算能力。AI Response Transformer 和 AI Request Transformer 插件可调用 LLM 对请求/响应进行中继转换（如实时翻译、内容摘要）。限制：流式响应时 AI Response Transformer 不可用，但 AI Request Transformer 正常工作。


**提示词安全**: 

> 提供多层防护体系：AI Prompt Guard（基于正则表达式的允许/拒绝列表，检查文本补全请求，阻止匹配拒绝模式的请求返回 4xx）；AI Semantic Prompt Guard（v3.10+，基于语义智能的允许/拒绝主题列表，超越正则匹配理解语义意图）；AI Azure Content Safety（集成 Azure AI 内容安全检测仇恨言论、特定主题拦截等）；AI AWS Guardrails（验证请求是否存在 Prompt 注入）；AI GCP Model Armor（检测越狱尝试和阻止不安全 Prompt）；AI Custom Guardrail（v3.14+，配置驱动集成任意第三方护栏 API，如 NVIDIA NeMo Guardrails，支持输入和输出双端防护）。也支持 CrowdStrike AIDR 和 Pangea AI Guard 等第三方集成。


**流式处理**: 

> 支持 SSE（Server-Sent Events）流式处理，通过 HTTP chunked transfer encoding 实现。AI Proxy 插件在 STREAMING 阶段捕获每个 SSE chunk，经过 parse-sse-chunk 和 normalize-sse-chunk 处理后，由各提供商驱动转换为 OpenAI 兼容格式的 SSE chunk 实时推送给客户端。配置 response_streaming 支持三个值：allow（默认，调用方可选开启流式）、deny（强制缓冲）、always（强制流式）。v3.14+ 新增 Anthropic 原生流式直通模式（proper message reordering for tool calls）。支持 WebSocket（ws/wss）协议。限制：流式处理不支持 HTTP/2，需禁用 proxy_listen 中的 HTTP/2；流式时不能同时使用 AI Response Transformer 插件；跨提供商流式 Token 计数在 v3.14 修复前存在膨胀问题。


**Token 计数与成本追踪**: 

> 支持完整的 Token 统计与成本归属体系。Proxy 层启用 log_statistics 后自动统计 prompt_tokens、completion_tokens、total_tokens。Prometheus 指标按 provider/model/consumer/workspace/token_type 分组。v3.8+ 的 AI Rate Limiting Advanced 插件支持按 Token 数量（total_tokens/prompt_tokens/completion_tokens）和成本（input_cost/output_cost 配置 + 实际 Token 数）进行速率限制。Konnect Metering & Billing（基于 OpenMeter 构建）支持与 Stripe 对接的 Token 计费流水线：LLM 请求→AI Gateway（认证+Token 日志）→计量聚合→功能与费率卡→套餐→订阅→发票→Stripe 支付。支持按 Consumer/Customer 层级的 Token 消耗归因和计费。v3.10+ 新增 Log Statistics Stage，v3.11+ 消费指标新增 consumer 标签。



### 2. Apache APISIX AI Gateway

**模型提供商支持**: 

> 支持 10+ 主流 LLM 提供商，覆盖 300+ 模型。一级原生集成：OpenAI（GPT-4/GPT-4o/GPT-3.5）、DeepSeek（deepseek-chat/deepseek-reasoner）、Azure OpenAI、Anthropic Claude（原生 Messages API，自 v3.15.0 起）、AWS Bedrock（Bedrock Converse API + AWS SigV4 签名，自 v3.15.0 起）、Google Vertex AI、Google Gemini、OpenRouter、AI/ML API（单一端点覆盖 300+ 模型，含 Claude/Gemini/Mistral/Llama 3 等）。通过 openai-compatible 通用驱动支持任何 OpenAI 兼容 API（如阿里云 DashScope/Qwen、vLLM、Ollama 等自部署模型）。支持自定义端点覆盖。每个提供商有独立驱动模块实现协议转换


- **负载均衡**: 支持 round-robin（轮询）、consistent-hash（一致性哈希）、weighted（加权）、priority-based（优先级）多种负载均衡策略。通过 ai-proxy-multi 插件实现多 LLM 实例间的负载分配，支持根据延迟、成本和稳定性动态调整权重。相同优先级内按权重分配流量（如 OpenAI 80% + DeepSeek 20%），优先级作为故障转移链
**速率限制**: 

> 基于 Token 的速率限制（ai-rate-limiting 插件），支持 total_tokens（总 token）、prompt_tokens（提示 token）、completion_tokens（完成 token）、expression（自定义表达式含 cost_expr 动态成本计算）四种策略。可针对 Route/Service/Consumer/Consumer Group 多维度限流。支持单节点（local）和集群级（Redis/Redis-Cluster/Redis-Sentinel）策略。可按模型实例（如 gpt-4o 和 gpt-4o-mini 不同配额）分别配置限制。超限返回 HTTP 429 并带 X-AI-RateLimit-* 响应头


- **降级与重试**: ai-proxy-multi 插件实现完整的故障转移（fallback）链路：基于优先级的多层降级（高优先级实例不可用时自动切换至低优先级实例）；自动重试；在 HTTP 429（限流）、HTTP 5xx（服务端错误）时触发降级；支持主动和被动健康检查，自动将不健康实例从负载均衡池中移除
**认证与密钥管理**: 

> 支持多种认证方式：key-auth（API Key）、JWT、OAuth2/OIDC、basic-auth、HMAC、mTLS 等。支持 HashiCorp Vault 集成管理密钥。ai-proxy-multi 支持按实例配置独立的 API Key（header/query 传递）。支持云服务商专用认证（AWS SigV4 签名、GCP OAuth）。API7 企业版额外支持 SSO（Okta/Auth0/Keycloak）、RBAC 权限控制


**可观测性**: 

> 完整三大支柱覆盖。（1）日志：20+ 日志导出插件（Kafka、Elasticsearch、ClickHouse、Splunk HEC、TCP/UDP、Syslog、Google Cloud Logging 等），访问日志自动捕获模型名、Prompt Token、Completion Token、TTFT。（2）指标：Prometheus 插件（Pull 模式导出），含 AI 专属指标（llm_prompt_tokens、llm_completion_tokens、llm_latency、TTFT）；OTLP HTTP Push 模式支持；Grafana 面板含概览/吞吐量/延迟/Token 用量。（3）追踪：OpenTelemetry（OLTP over gRPC，支持 always_on/trace_id_ratio/parent_base 采样）、Zipkin、SkyWalking 插件


**提示词安全**: 

> 多层安全防护体系。（1）ai-prompt-guard 插件：基于 PCRE 正则表达式的 allow/deny 模式匹配，可检测并阻止 Prompt Injection 攻击（如 'ignore all previous instructions'、'reveal system prompt' 等），支持仅检查最新消息或全量对话历史，违反时返回 HTTP 400。（2）ai-prompt-decorator 插件：在用户输入前后追加预定义的提示词，引导模型行为。（3）ai-prompt-template 插件：预配置模板，用户仅填充变量。（4）ai-aws-content-moderation 插件：集成 AWS Comprehend 进行 6 类毒性检测（脏话/仇恨言论/侮辱/骚扰/色情/暴力威胁），每类可配 0-1 阈值。（5）ai-aliyun-content-moderation 插件：集成阿里云内容安全。推荐部署多层防线：ai-prompt-guard → ai-request-rewrite（PII 脱敏）→ ai-aws-content-moderation → ai-proxy


**插件扩展**: 

> 支持三种扩展机制。（1）Lua 原生插件：最高性能，直接在 OpenResty/Nginx 进程中运行，通过 extra_lua_path 加载自定义插件。（2）Wasm/Proxy-Wasm 插件：基于 Proxy-Wasm ABI 规范，支持 Go(TinyGo)/Rust/C/C++，在 Wasmtime/WasmEdge 沙箱 VM 中运行，插件崩溃不影响网关进程。（3）外部插件 Runner：Java/Go/Python/Node.js 通过 Flatbuffers over Unix Domain Socket 的 RPC 通信，支持 pre-req/post-req/post-resp 三个执行阶段。所有插件均支持毫秒级热加载（etcd 驱动），无需重启网关


**流式处理**: 

> 原生支持 LLM 流式响应处理。ai-proxy/ai-proxy-multi 保留上游 LLM 的 SSE（Server-Sent Events）流式响应，透传 Transfer-Encoding: chunked，不缓冲完整响应体以确保实时性。追踪首 Token 延迟（TTFT）记录在 ctx.llm_summary 中。mcp-bridge 插件将 stdio MCP Server 转为 HTTP SSE 流式服务。原生支持 WebSocket 代理。自 v3.15.0 起新增 max_stream_duration_ms（流式最大时长）和 max_response_bytes（最大响应字节数）安全限制，支持客户端断开时中止上游读取



### 3. Portkey

- **模型提供商支持**: 支持 250+ 模型提供商，涵盖 1600+ 模型（部分资料提及 3000+），包括 OpenAI、Anthropic、Google Gemini、Azure OpenAI、AWS Bedrock、Vertex AI、Cohere、Mistral、Groq、Together AI、Fireworks、Perplexity、Ollama、DeepSeek 等主流及开源模型
- **负载均衡**: 支持加权负载均衡（weighted load balancing），可按多目标（不同提供商/模型/API Key）配置权重分配流量；2026 年新增粘性路由（sticky routing），可将关联请求固定到同一后端；支持与 fallback 和条件路由组合使用
- **速率限制**: 支持多维速率限制：时间窗口包括每分钟（RPM）、每小时、每天、每周（rpw，2026年4月新增）；限制维度涵盖请求数和 Token 发送量；可按端点类型（chat completions/embeddings）分别配置；通过虚拟密钥实施，入口级执行（ingress enforcement）
- **缓存能力**: 支持精确匹配缓存（Simple Cache）和语义缓存（Semantic Cache）两种模式。语义缓存基于向量嵌入相似度匹配，可配置相似度阈值和 TTL（maxAge），增加约 10-30ms 延迟但大幅提升缓存命中率。支持 Redis 等缓存后端（自托管版），企业版支持 AWS ElastiCache 及自定义 Redis。2026年开源版已包含语义缓存功能
- **降级与重试**: 支持多级故障转移（fallback），可定义降级链（Provider A → Provider B → 缓存）；自动重试支持指数退避（exponential backoff）；2026年开源版新增断路器（circuit breaker），可按 P99 延迟或错误率配置，通过探针请求（probe request）检测恢复后自动恢复流量
- **认证与密钥管理**: 支持多租户虚拟密钥（Virtual Keys）管理，每密钥可关联独立的速率限制、预算上限和使用策略；支持 API Key 轮转（手动/自动）；企业版支持 JWT 认证、OAuth 2.1、SAML SSO、SCIM 自动用户配置、AWS KMS 密钥管理；RBAC 细粒度角色权限控制
**可观测性**: 

> 完整的 OpenTelemetry（OTel）原生集成，支持 OTLP 协议导出追踪和日志到 Jaeger/Tempo/Honeycomb 等后端；W3C Trace Context（traceparent/baggage）分布式追踪；Prometheus `/metrics` 端点暴露 15+ 自定义指标（请求数、延迟、Token 消耗、成本累计、缓存命中率、认证延迟等）；支持 GenAI 语义约定（semconv 1.40.0）；自动注入 x-portkey-trace-id、x-portkey-cache-status、x-portkey-retry-attempt-count 响应头；日志可导出至 Loki、GCS、LangSmith 等后端


**请求/响应转换**: 

> 支持通用 API 翻译层，客户端可使用 OpenAI（Chat Completions）、Anthropic（Messages）或 OpenAI Responses API 三种格式中的任意一种，Portkey 自动将请求参数和响应格式在 OpenAI↔Anthropic↔Gemini↔Bedrock 等格式间互转；支持 reasoning effort 自动映射到各提供商的 thinking budget；流式 SSE 响应在各提供商间标准化转换；缓存 JSON 响应可合成流式 SSE 输出


**提示词安全**: 

> 提供 50+ 内置 AI 护栏（Guardrails），支持三种执行模式：记录（Log）、标记（Flag）、阻断（Block）；新增 AI 专用 HTTP 状态码（246 表警告通过，446 表护栏拒绝）；集成 Qualifire（SLM 检测模型）、Prisma AIRS（Palo Alto Networks）、Prompt Security、Lasso Security 等多层防护；支持正则验证器、JWT 验证器、Webhook 验证器等确定性检测机制


- **插件扩展**: 支持自定义钩子（Hooks）中间件系统，可在请求/响应管道的多个阶段（预处理、后处理）插入自定义逻辑；支持外部护栏（External Guardrails）集成（Qualifire、Prompt Security、Lasso Security 等）；支持自定义插件（Custom Plugin）开发，可扩展网关功能
**流式处理**: 

> 支持 SSE（Server-Sent Events）流式响应处理，覆盖所有对话补全提供商；支持 WebSocket 实时语音 API（OpenAI Realtime API over WebSocket，xAI Grok-2-Voice）；企业版 gRPC（Beta）支持服务端流式传输（Server-side Streaming），原生 gRPC 连接 Google Gemini；流式转换器（Stream Transformers）实时标准化各提供商的 chunk 格式


- **Token 计数与成本追踪**: 支持实时 Token 使用量统计（输入/输出 Token），按模型和提供商维度累计；实时美元成本累加（llm_cost_sum 指标）；模型目录（Model Catalog）持续更新各模型最新定价；成本可归属到工作区、API Key、配置、团队维度；企业版提供成本管理面板和预算告警

### 4. Bifrost

**模型提供商支持**: 

> 支持 23+ 家模型提供商、1000+ 模型，包括：OpenAI（聊天/文本/嵌入/图片/TTS/STT/批处理/OCR/视频）、Anthropic（Claude全系列/聊天/批处理/计算机使用/结构化输出）、AWS Bedrock（聊天/文本/嵌入/图片生成编辑/重排序/50+ PII 实体类型防护）、Google Vertex AI（Gemini/PaLM/聊天/图片/嵌入/重排序/OCR/视频）、Azure OpenAI（聊天/文本/图片/嵌入/TTS/STT/视频/批处理）、Google Gemini（聊天/图片/嵌入/TTS/STT/视频/批处理/Token计数）、Groq（超低延迟聊天/TTS/STT）、Mistral（聊天/嵌入/STT/OCR）、Cohere（聊天/嵌入/重排序/Token计数）、Cerebras（高速推理）、Ollama（本地自托管模型）、Hugging Face（聊天/图片/嵌入/TTS/STT）、OpenRouter（聊天/文本/嵌入）、Perplexity（搜索增强聊天）、ElevenLabs（TTS/STT）、xAI/Grok（聊天/文本/图片）、Fireworks AI（聊天/文本/嵌入/图片）、Nebius（聊天/文本/嵌入/图片）、Parasail（聊天）、Replicate（聊天/文本/图片/视频）、vLLM（聊天/文本/嵌入/STT）、SGLang（聊天/文本/嵌入）、Runway（视频）。通过 provider-prefix 路由（如 openai/gpt-4o、anthropic/claude-sonnet-4.5）实现统一调用。


**负载均衡**: 

> 支持多层负载均衡：基础版提供加权随机选择（按配置权重分配流量，自动归一化）；企业版提供自适应负载均衡（每 5 秒动态计算路由得分，综合考虑错误率惩罚 50%、延迟评分 20%、利用率评分 5%、动量偏差），支持健康/降级/故障/恢复四种路由状态，含断路器模式。双层级路由：方向级（提供商+模型）和路由级（提供商+模型+密钥）。各提供商使用独立 Worker Pool 隔离队列，避免单提供商限速阻塞其他请求。注：不实现纯轮询（Round-Robin），而是加权随机选择。


- **速率限制**: 支持请求级（RPM）和 Token 级（TPM）速率限制。可在虚拟密钥、团队、客户多层级配置，与预算系统联动。健康感知限流：持续监控每个端点的 RPM/TPM/错误率，超限端点标记为不健康并暂时移出路由（断路器模式）。支持加权多 API 密钥分散限速压力。
- **降级与重试**: 支持自动故障转移（Fallback）：当主提供商不可用或预算耗尽时，无缝切换到备选提供商/模型，零停机。基于健康检查的断路器：持续监控错误率，自动标记和隔离故障端点。内置指数退避重试机制，连接弹性恢复。MCP 工具连接也支持自动退避重试。
**认证与密钥管理**: 

> 支持多种认证方式：Bearer Token、Basic Auth、API Key（x-api-key）、虚拟密钥（x-bf-vk）、Google API Key（x-goog-api-key）。虚拟密钥可配置：可访问的提供商和模型白名单、底层 API 密钥权重分配、独立预算和速率限制、MCP 工具访问范围。企业版支持 OIDC/OAuth SSO 集成（Okta、Microsoft Entra ID、GitHub、Google）。密钥安全存储集成 HashiCorp Vault、AWS Secrets Manager、Azure Key Vault。支持即时撤销密钥访问权限。


**可观测性**: 

> 三柱可观测性体系：1）指标：原生 Prometheus /metrics 端点，提供 HTTP 传输指标（请求总数/延迟/大小）、上游提供商指标（按提供商/模型/虚拟密钥/路由规则维度的请求数/成功数/错误数/延迟/Token 数/成本）、流式指标（首Token延迟/Token间延迟）、缓存指标。支持自定义标签注入（x-bf-prom-* 头）、Push Gateway。2）追踪：OpenTelemetry（OTLP）分布式追踪，兼容 Grafana/Honeycomb/New Relic/Datadog，传播 finish_reason、模型名、提供商名到根 Span（v1.5.0）。3）日志：全面的请求/响应日志，支持按请求覆盖内容日志级别，x-bf-dim-* 头自动转发到日志/追踪/指标。内置 Web UI 实时仪表盘。


**请求/响应转换**: 

> 完整的协议适配转换层。支持三种模式：1）Provider-Prefix 模式：用 OpenAI SDK 调用任意提供商，在模型名前加前缀（如 anthropic/claude-sonnet-4.5、gemini/gemini-2.0-flash），Bifrost 自动完成请求/响应格式转换。OpenAI→Claude 转换：映射 roles/max_tokens/tool_calls/stop_reason/usage 字段；OpenAI→Gemini 转换：映射 maxOutputTokens/stopSequences/responseMimeType/roles（assistant→model）/finishReason/thinkingConfig 等。2）Native Endpoint 模式：提供各提供商的原生 API 端点（/openai/v1/...、/anthropic/v1/...、/genai/v1beta/...）。3）Passthrough 模式：直接转发原生请求不做转换（/openai_passthrough/...）。兼容插件（Compat Plugin）：自动完成 Text↔Chat↔Responses API 互转、丢弃/转换不支持的参数。


**提示词安全**: 

> 通过 Guardrails 系统提供多层防御。架构：Rules（基于 CEL 表达式的触发策略）+ Profiles（外部防护提供商的凭证/端点/阈值配置），支持单 Rule 链接多 Profile 实现纵深防御。支持六大防护提供商：AWS Bedrock Guardrails（Prompt 攻击检测/内容过滤/50+ PII 类型脱敏，支持图片内容审核）；Azure Content Safety（越狱盾牌/间接攻击盾牌/基于严重级别（Safe/Low/Medium/High）的内容过滤/版权检测）；Patronus AI（Prompt 注入检测/PII 检测/幻觉检测/回答质量评估/偏见检测）；CrowdStrike AIDR（注入检测/PII 防护/自定义实体）；Google Model Armor（注入和越狱拦截/SDP 脱敏）；GraySwan Cygnal（间接 Prompt 注入 IPI 检测/突变检测/自定义自然语言规则）。支持双阶段验证：输入 Guardrails（请求到达 LLM 前）和输出 Guardrails（模型响应后），可配置采样率、异步校验、超时。


**插件扩展**: 

> 支持两种插件机制：1）Go 原生插件（.so 文件，推荐）：使用 Go plugin 包编译，进程内执行无 IPC 开销，运行时动态加载/卸载/重载。钩子点包括 PreLLMHook/PostLLMHook、HTTPTransportPreHook/PostHook/StreamChunkHook、PreMCPHook/PostMCPHook。支持 Plugin Sequencing 排序组（pre_builtin/builtin/post_builtin）。限制：仅 Linux/macOS，需 Go 版本和 CPU 架构匹配。2）WASM 插件（已弃用）：曾支持 Go/Rust/TypeScript 多语言沙箱执行。3）Webhook 插件（规划中）：未来跨语言扩展路径。不支持 Lua 脚本扩展。


**流式处理**: 

> 支持三种流式传输方式：1）SSE（Server-Sent Events）：Chat/Completions 流式（stream: true），Responses API 事件流（response.created/output_text.delta/completed），TTS/STT 音频流式。2）WebSocket：Responses API over WebSocket（v1.4.12，GET /v1/responses 升级连接），Realtime API WebSocket（/v1/realtime 双向会话，代理 OpenAI/Azure Realtime）。均通过完整推理管线（钩子/密钥选择/提供商路由/可观测性）。3）Streamable HTTP（MCP）：MCP 服务端的 SSE/Streamable HTTP 端点。Go channel（chan *schemas.BifrostStreamChunk）管道流块，流式累加器用于后处理钩子。注意：输出 Guardrails 对 SSE 流尚不支持。


**Token 计数与成本追踪**: 

> 完整的 Token 层级计量：bifrost_input_tokens_total 和 bifrost_output_tokens_total Counter 指标，按 provider/model 标签区分。流式指标包括首 Token 延迟和 Token 间延迟 Histogram。成本追踪：bifrost_cost_total Counter 指标，按 provider/model 维度，以 USD 计。四级分层预算系统自动累加消耗：Customer → Team → Virtual Key → Provider Config，每级独立扣减同步校验。支持灵活重置周期（1m/1h/1d/1w/1M/1Y），含日历对齐预算。



### 5. kgateway

**模型提供商支持**: 

> 支持 OpenAI、Anthropic、Google Gemini、Google Vertex AI、AWS Bedrock，以及任何兼容 OpenAI API 格式的提供商。通过 Backend CRD（类型 AI）声明式配置模型后端点，支持多模型优先级分组和故障转移。Envoy 版 AI Gateway 支持 prompt guard、prompt enrichment 等 LLM 流量治理。agentgateway（Rust 数据面，v2.1 集成）支持更深度的 AI 协议感知（Chat Completions/Messages 路由）。注意：Envoy 版 AI Gateway 在 v2.1 中已标记弃用（deprecated），计划 v2.2 移除，建议迁移至 agentgateway


**负载均衡**: 

> Envoy 数据面：支持标准 Envoy 负载均衡算法（round-robin、least-request、random、ring-hash 等）。agentgateway 数据面：采用 P2C（Power of Two Choices）智能算法，综合健康评分（EWMA）、请求延迟（EWMA）、待处理请求数动态打分。AI 路由：支持优先级顺序分组（多组间故障转移），高优先级模型不可用时自动切换到下一优先级组。v2.1 新增加权路由和会话亲和性（一致性哈希）支持


- **速率限制**: 支持请求级（按请求数/秒、分钟、小时、天）和 Token 级（按 Token/时间窗口）速率限制。通过 TrafficPolicy/RateLimitPolicy CRD 配置。支持按用户（X-User-ID）独立配额。Token 级限流实现成本控制（如设置为每日 Token 预算上限），到达硬上限后返回 HTTP 429。支持本地模式（进程内计数器）和全局模式（跨副本共享）
- **降级与重试**: 支持基于优先级分组的模型故障转移：主模型不可用、返回错误或触发限流时，自动切换至同一优先级组内其他模型，或切换至下一优先级组的备份模型。通过 Backend CRD 的 priorityGroups 配置多级故障转移链（如 gpt-4o → gpt-4-turbo → gpt-3.5-turbo）。Envoy 数据面原生支持重试策略（retry policy），可配置重试条件、次数、超时和退避策略
**认证与密钥管理**: 

> 支持多种认证方式：JWT 认证（JWKS 公钥验证，支持 Auth0、Keycloak 等标准 OIDC 提供商）、API Key 认证（内联/Secret 引用两种方式）、OAuth 2.0/OIDC 认证。支持外部授权服务（extAuth，通过 GatewayExtension CRD 配置 gRPC 外部授权后端）。LLM 提供商 API Key 通过 Kubernetes Secret 集中管理（SecretRef 引用）。v2.1+ 企业级认证功能（API Key、OAuth2/OIDC、JWT 验证等）已全部开源


**可观测性**: 

> OpenTelemetry 原生集成：Traces（完整分布式追踪含请求/响应负载、Token 用量、TTFT/TPOT 指标）、Metrics（Prometheus 端点，含 GenAI 语义约定指标）、Logs（结构化 JSON 格式，支持 stdout/stderr/文件/gRPC 多种导出方式）。AI 专用 Prometheus 指标：agentgateway_gen_ai_client_token_usage（Token 用量直方图，按 token_type/model/provider 分类）。官方 Grafana 仪表板：AgentGateway Overview（ID 24590），含 Token 用量、TTFT、TPOT、MCP 工具调用、错误率等面板。支持导出至 Jaeger、Grafana Tempo、Datadog、Honeycomb 等 OTel 兼容后端。提供 OTel Stack 一键部署方案（Grafana Tempo + Prometheus + Loki + Grafana）


**请求/响应转换**: 

> Envoy 版 AI Gateway 支持 Prompt Enrichment（预置/重写系统提示词和用户提示词，支持路由级默认值和请求级覆盖），可通过 TrafficPolicy 的 promptEnrichment.prepend 配置。agentgateway 支持 OpenAI Chat Completions 与 Anthropic Messages 格式双向转换（含 streaming/non-streaming/error 路径），处理工具定义映射、多模态内容转换、角色映射等。暂不支持 Structured Output 完整路由


**提示词安全**: 

> 支持多层纵深防御：第一层内置字符串/正则匹配（拦截包含敏感关键词或注入模式的请求，如 "Ignore all previous instructions" 等）；第二层外部审核 API（OpenAI omni-moderation-latest，检测有害内容并自动拒绝）；第三层自定义 Webhook Guardrail（pre-request 和 post-response 两个拦截点，支持 Pass/Mask/Reject 三种决策）。通过 TrafficPolicy CRD 的 promptGuard 字段配置。可作为 Kill-Switch 一键急停所有 AI 流量。agentgateway 额外支持工具投毒防护和 MCP Server 安全验证


**插件扩展**: 

> 基于 Envoy 扩展机制：支持 WASM 插件（Proxy-Wasm 规范，Rust/Go/C++ 多语言开发，沙箱隔离运行）；支持 ext_authz 外部授权 gRPC 服务（GatewayExtension CRD 配置）；支持 ext_proc 外部处理 gRPC 服务（请求/响应 Body 级别的深度处理）；支持 Envoy 内嵌 Lua 脚本过滤器。通过自定义 CRD（TrafficPolicy、RateLimitPolicy、GatewayExtension、HTTPListenerPolicy 等）实现声明式策略配置。agentgateway 额外支持 CEL（Common Expression Language）策略引擎含 20+ 自定义函数，支持 xDS 动态配置零停机更新


**流式处理**: 

> 全面支持 SSE（Server-Sent Events）流式响应处理。Envoy 数据面原生代理 SSE 流，处理 text/event-stream 和 application/x-ndjson 内容类型。agentgateway 原生支持 OpenAI/Anthropic Gemini 等提供商的 SSE/HTTP Stream 格式，实现流合并（多 SSE 流聚合）、反缓冲头处理。支持 Streamable HTTP（MCP 无状态传输模式）


**Token 计数与成本追踪**: 

> agentgateway 通过 Prometheus 指标 agentgateway_gen_ai_client_token_usage（直方图）自动提取 Token 用量，按 gen_ai_token_type（input/output）、gen_ai_system（openai/anthropic 等）、gen_ai_request_model、gen_ai_response_model 分类。支持 PromQL 成本计算公式：成本 = (input_tokens/1,000,000 * input_price) + (output_tokens/1,000,000 * output_price)。按用户 ID（user_id）聚合成本数据。OpenTelemetry Trace span 属性中记录 gen_ai.usage.input_tokens 和 gen_ai.usage.output_tokens。支持 Prometheus AlertManager 预算告警（如日消费超 $100）



### 6. agentgateway

- **模型提供商支持**: 支持 OpenAI、Anthropic Claude、Google Gemini、Google Vertex AI、AWS Bedrock，以及任何兼容 OpenAI API 格式的提供商；通过统一 OpenAI 兼容 API 对外暴露，支持 Chat Completions 和 Messages 两种 API 路由类型，暂不支持 Embeddings 和 Batch 接口
- **负载均衡**: 采用 Power of Two Choices (P2C) 智能算法，综合健康评分（EWMA）、请求延迟（EWMA）、待处理请求数进行动态打分，自动驱逐不健康或频繁限流的后端，支持优先级分组（多组间故障转移），无需手动选择策略
- **速率限制**: 支持请求级和 Token 级速率限制，可按秒/分钟/小时/天配置；支持本地模式（进程内计数器）和全局模式（跨副本共享，通过外部限流服务）；结合虚拟密钥可实现按用户/租户的独立配额；支持 CEL 表达式条件策略（可区分读写请求不同限流）
- **降级与重试**: 支持基于优先级分组的模型故障转移：同一优先级组内 P2C 负载均衡，组内所有后端被驱逐后自动切换到下一优先级组；支持 CEL 表达式定义不健康条件（如 5xx/429），可配置连续失败次数阈值和驱逐持续时间，支持乘法退避；429 响应可读取 Retry-After 头覆盖驱逐时间
- **认证与密钥管理**: 支持 JWT 认证（strict/optional/permissive 三种模式）、API Key 认证（内联/Secret 引用/透传三种方式）、OAuth 2.0/OIDC；支持虚拟密钥管理（按用户签发独立 API Key，绑定独立 Token 配额）；JWKS 公钥验证，支持 Auth0、Keycloak 及任何标准 OIDC 提供商
**可观测性**: 

> OpenTelemetry 原生集成为核心：Traces（完整分布式追踪含请求/响应负载和 Token 用量）、Metrics（Prometheus 端点，含 GenAI 语义约定指标如 token 使用直方图）、Logs（JSON 格式结构化日志）；可导出至 Jaeger、Grafana Tempo、Honeycomb、Datadog 等 OTel 兼容后端；支持 Langfuse、LangSmith 等 LLM 观测平台


- **请求/响应转换**: 支持 OpenAI Chat Completions ↔ Anthropic Messages 格式双向转换（含 streaming/non-streaming/error 路径），处理工具定义映射、多模态内容转换、角色映射（system/developer）；但 /v1/chat/completions 路由整体支持不完整，暂不支持 Structured Output
- **提示词安全**: 支持三层纵深防御：第一层正则表达式（快速检测系统覆盖/Jailbreak/Prompt 提取/编码绕过），第二层外部审核（OpenAI Moderation），第三层自定义 Webhook（任意语言实现的自定义审核服务）；可通过单个策略组合多层防线
- **流式处理**: 全面支持 SSE（Server-Sent Events）流式响应处理；支持 Streamable HTTP（MCP 无状态传输）；支持 stdio（本地 MCP 进程）；LLM Gateway 支持 OpenAI/Anthropic SSE 流、Google Gemini/Vertex AI HTTP Stream；具备反缓冲头处理和流合并（多 MCP 后端 SSE 合并为单流）
**Token 计数与成本追踪**: 

> 自动从 LLM 响应 usage 字段提取 Token 用量，通过 Prometheus 指标 agentgateway_gen_ai_client_token_usage（直方图）暴露按 token 类型（input/output）、模型、提供商、操作的用量；支持 PromQL 成本计算（多模型价格公式）；按用户（user_id）聚合成本数据；在 OpenTelemetry Trace 属性中记录每次请求的 Token 数



### 7. Lunar MCPX（Lunar MCP Gateway）

- **模型提供商支持**: 作为MCP专用网关，MCPX自身不直接代理LLM模型提供商API流量。其demo客户端支持Google Gemini和Anthropic Claude。通过配套的Lunar AI Gateway（Lunar Proxy）可统一管理OpenAI、Anthropic等LLM提供商的API流量，提供实时流量可见性、成本和Token使用量追踪。企业版明确标注OpenAI集成支持。
**负载均衡**: 

> 支持动态路由与多路复用（Dynamic Routing and Multiplexing），将工具调用按配置分发到多个MCP服务器并聚合响应。支持Consumer Tags（x-lunar-consumer-tag头）实现基于消费者身份的流量分发。通过Lunar Proxy提供优先级队列（Priority Queues）进行负载管理。传统round-robin/least-latency/weighted等负载均衡算法未明确记载。


- **速率限制**: 支持基于Consumer Tags（x-lunar-consumer-tag HTTP头）的精细化速率限制。通过Lunar Proxy提供Advanced Traffic Shaping，包括请求级速率限制、Agent动作节流和流量整形策略。可配置工具级（per-tool）和消费者级（per-consumer）访问控制与节流。支持IP级访问控制（CIDR格式IPv4/IPv6白名单）。
- **降级与重试**: 通过Lunar Proxy提供熔断器（Circuit Breaker）机制，自动切断故障连接防止级联失败。支持基于HTTP标准的重试机制，兼容service mesh。MCPX架构设计支持故障隔离（Failure Isolation），单个MCP服务器故障不影响其他客户端。作为HTTP原生中间件，天然兼容HTTP重试语义。无专门的fallback到备用模型或服务降级机制的明确记载。
**认证与密钥管理**: 

> 开源版支持：Basic API Key认证（基于token的接入认证）、OAuth（集成Okta/Microsoft Entra ID/Active Directory/Google Workspace/JumpCloud等IdP）、Static OAuth（OAuth 2.0 Device Authorization Grant + Client Credentials）。企业版额外提供：Secret Management（集成HashiCorp Vault，集中管理密钥和OAuth Token）、In-Client Authentication（客户端内嵌认证）、集中用户管理与SSO。Consumer Tags机制实现消费者身份传递。密钥轮转功能由企业版Secret Management覆盖。


**可观测性**: 

> 开源版提供：Prometheus指标暴露在 /metrics 端点（跟踪工具调用次数、延迟、错误等）；结构化持久审计日志（记录Agent工具使用和配置变更）。企业版额外提供：Usage Dashboard（用量仪表板）、Agent Inventory（Agent清单）、Full Auditability（不可变审计跟踪）。通过Lunar AI Gateway提供实时API流量可见性（延迟、错误、成本、Token使用）。OpenTelemetry集成未明确记载，但Prometheus指标可间接接入OTel Collector。


**请求/响应转换**: 

> 支持工具级参数覆写（Tool Customization / Tool Hardening）：通过app.yaml配置toolExtensions字段，可覆写工具参数值（overrideParams）、重写工具描述（description rewrite）以提升LLM准确性。支持创建子工具（childTools）变体。不支持跨LLM协议格式互转（如OpenAI↔Claude↔Gemini请求响应格式转换）。不支持通用的请求/响应body改写。


**提示词安全**: 

> 提供OWASP MCP Top 10对齐的多层安全防护：AI驱动的工具描述恶意模式扫描（检测'ignore previous instructions'等Prompt Injection模式）；五因子复合风险评分引擎（版本漂移检测+工具描述分析+敏感工具分类+认证授权审查+上下文最小化评估）；四层风险分级（Critical：任意代码执行、文件删除、恶意Prompt；High：关键数据写入、任意URL网络调用、PII访问；Medium：只读内部数据；Low：只读公开数据）。工具可通过Tool Hardening锁定参数、重写描述以消除注入风险。企业版提供Risk Scoring引擎。


- **插件扩展**: 不提供传统插件/Wasm扩展/Lua脚本等扩展机制。扩展通过声明式配置文件（app.yaml、mcp.json）实现：工具自定义（toolExtensions）进行参数覆写和描述重写；工具组（toolGroups）跨服务组织工具合集；访问控制列表（ACL YAML）定义权限策略。无自定义中间件管道或代码级扩展API。
- **流式处理**: 客户端侧支持两种传输协议：Streamable HTTP（推荐，使用/mcp端点，双HTTP连接模式——一条用于握手、一条用于收发操作）和SSE/HTTP+SSE（已弃用但保持向后兼容，使用/sse端点）。后端MCP服务器通过stdio子进程通信（标准MCP协议传输）。MCPX网关统一聚合多服务器的流式响应，客户端只需连接单一端点即可接收所有工具调用的流式结果。
- **Token 计数与成本追踪**: 通过配套的Lunar AI Gateway（Lunar Proxy）提供：实时Token使用量追踪（所有出站LLM和Agent调用）、实时成本指标（每次API调用的成本可见性）、Cost & Performance Optimization（识别浪费、平滑流量峰值、减少昂贵API过度使用）。MCPX自身不独立提供Token计数或成本追踪功能，这些能力依赖Lunar Proxy配合使用。

### 8. Gravitee Agent Mesh（现称 Gravitee AI Agent Management）

**模型提供商支持**: 

> 支持 6 大类 LLM 提供商：OpenAI（直接透传，完全兼容）、Google Gemini（自动转换为 generateContent/streamGenerateContent API）、AWS Bedrock（通过 Converse API，支持 Anthropic Claude 等模型，但流式不支持）、Anthropic（直接映射到 Messages API，v4.10+）、Google Vertex AI（复合提供商，同时支持 Google Gemini 和 Anthropic Claude 两种发布者模型）、OpenAI 兼容提供商（Ollama、Together AI、Mistral AI、Local AI 等遵循 OpenAI API 格式的服务）。所有 LLM 流量通过统一的 OpenAI 兼容 API 暴露给消费者，代理层自动将请求翻译为各提供商的原生格式。不支持多模态输入（图片/音频/视频）。


**负载均衡**: 

> 支持 4 种负载均衡策略：轮询（Round Robin）、随机（Random）、加权轮询（Weighted Round Robin）、加权随机（Weighted Random）。支持按端点组（Endpoint Group）配置权重，实现按比例流量分发。底层继承自 Gravitee v4 HTTP Proxy API 的通用负载均衡能力，在 LLM Proxy 和 MCP Proxy 的端点配置中均可使用。


**速率限制**: 

> 支持 Token 级速率限制（AI Token Rate Limit 策略，v4.10+）：按时间窗口（分钟/秒级）限制入站 Token 总数和出站 Token 总数。支持三种执行模式：阻断（blocking）、透传（pass-through）和异步（asynchronous）。限制判定延迟一个请求生效（当前请求超过限制时，下一个请求被阻断）。可与订阅计划（Subscription Plan）绑定，按消费者（Consumer）实施差异化限额。同时继承传统 API 网关的请求数级限流能力。


**缓存能力**: 

> 支持语义缓存（AI Semantic Caching 策略，v4.11）：不依赖精确文本匹配，而是将 Prompt 转化为向量嵌入（embedding），在向量存储中执行语义相似搜索。支持 cosine、euclidean、dot product 三种相似度度量。推荐阈值 0.90-0.98（高于 RAG 场景的 0.7），防止误匹配。缓存后端支持 Redis（HNSW 索引用于大规模场景的近似最近邻搜索，FLAT 索引用于小数据集）和 AWS S3。支持本地 ONNX BERT 模型生成嵌入以实现零网络开销。策略指标包括 cache-hit、cache-miss、cache-hit-score、cache-hit-tokens-saved、cache-error。同时继承传统 API 网关的 Data Cache 精确匹配缓存能力（支持 Redis/Memcached 后端）。仅企业版提供。


**降级与重试**: 

> 支持多层级故障转移：断路保护器（Circuit Breaker，可配置最大重试次数、慢调用时长阈值、开状态持续时间、最大失败次数和基于 Expression Language 的故障条件）；重试策略（Retry 策略，v3.1.0+，支持 LLM 和 MCP Proxy API，条件为 {#response.status > 500}，可配置 maxRetries 和 timeout）；失败时强制切换到下一个端点；底层负载均衡支持端点组级别的故障转移。实现跨提供商和跨端点的自动容错。


**认证与密钥管理**: 

> 支持多层认证体系：OAuth 2.1 + PKCE（短生命周期 Bearer Token 替代静态 API Key）；JWT Token 验证；mTLS 双向认证；API Key 管理（传统密钥认证）；动态客户端注册（DCR，Agent 通过标准 OAuth 流自动注册）；RFC 8693 Token Exchange（委托授权链，Agent 可代表用户操作，撤销用户会话即撤销所有下游 Agent Token）；每个 Agent 拥有独立的可验证身份（非共享服务账号），实现租户级隔离。提供商 API Key 在网关侧集中管理，客户端无需持有原始提供商密钥。


**可观测性**: 

> 基于 OpenTelemetry 的统一可观测体系，覆盖 LLM、MCP、A2A 全部三种流量路径。原生 OTel Span 在每个治理节点自动生成，携带 Agent 身份、工具名称、延迟、策略决策、成本和 Catalog 实体 ID 等元数据。支持跨 LLM→MCP→A2A 工作流的全链路追踪，形成单一可导航的链路图谱。两种追踪模式：标准追踪（请求/响应流、策略计时、后端调用 Span）和详细追踪（可选，额外捕获完整 headers 和上下文属性）。指标暴露于 Gateway 内部 API（/_node/metrics/prometheus，默认端口 18082），支持 Prometheus + Grafana 集成。v4.11+ 提供模板化 Grafana 仪表盘（HTTP Proxy、LLM、MCP 专用面板）。日志可导出到 Grafana Loki、Elastic、Fluentd。支持 Datadog、Jaeger、Splunk、Zipkin、AWS X-Ray 等后端。v4.11 新增 LLM Dashboard，提供 Token 用量、成本和模型消费的实时分析。告警引擎支持通过邮件/Slack/Webhook 触发延迟、错误率、策略违规和成本异常通知。


**请求/响应转换**: 

> LLM Proxy 将统一的 OpenAI 兼容 API 请求自动翻译为各提供商的原生 API 格式。消费者始终以 OpenAI Chat Completions API 格式（/chat/completions、/responses、/embeddings）发送请求，代理层隐式完成格式转换：Gemini→generateContent/streamGenerateContent；Anthropic→Messages API；Bedrock→Converse API；Vertex AI→预测端点路径重写。同时提供基于 Expression Language 的 Dynamic Routing 策略用于运行时路由决策。注意：不支持 Anthropic ↔ Gemini 等非 OpenAI 格式之间的互转，仅支持 OpenAI 入站 ←→ 提供商原生出站的单向转换模式。


**提示词安全**: 

> 提供多层 AI Prompt 防护：Guard Rails 策略（基于 AI 文本分类模型，检测亵渎/亵渎、性露骨内容、有害意图和越狱注入攻击（Jailbreak），可选择阻断或标记违规请求）；Prompt Token Tracking 策略（在响应阶段跟踪 Token 用量用于成本归属和异常检测）。底层集成 AWS Bedrock Guardrails 和 Google Vertex AI Safety 的本机内容过滤能力（如 Gemini 的 PROHIBITED_CONTENT 和 SPII 检测、Bedrock 的 guardrail_intervened 和 content_filtered 完成原因映射）。防护在 LLM 请求到达提供商之前强制执行。仅企业版（agent-mesh 包）提供。


**插件扩展**: 

> 支持 Java 原生插件扩展机制。使用 Maven Archetype（gravitee-policy-maven-archetype）引导自定义策略项目，基于 RxJava 3 响应式编程模型编写策略逻辑（onRequest/onResponse/onMessageRequest/onMessageResponse 钩子）。插件打包为 ZIP 分发并部署到 Gateway 的 plugins/ 目录。不支持 WASM（WebAssembly）或 Lua 脚本原生扩展。如需 WASM/Lua，需通过内嵌运行时（如 Chicory WASM 运行时或 LuaJ）到自定义 Java 策略中，或通过 REST/HTTP Callout 策略将处理卸载到外部服务。


**流式处理**: 

> 支持 SSE（Server-Sent Events）流式处理，通过 HTTP chunked transfer encoding 实现。LLM Proxy 在流式模式下逐 chunk 接收各提供商的原始响应，解包后重新规范化为 OpenAI 兼容的 SSE 事件流（增量文本 delta、finish reason + token 用量、[DONE] 终止标记）推送给消费者。Gemini 的流式转换完整支持，Anthropic 流式也完整支持（v4.10+ 直接 Messages API）。AWS Bedrock 不支持流式（缺少 AWS EventStream 二进制协议支持）。MCP Proxy 使用 Streamable HTTP 传输（HTTP + SSE）。A2A Proxy 原生支持 SSE 流式。



### 9. Gate22

- **模型提供商支持**: Gate22 是 MCP 工具治理网关，非 LLM 模型网关。它不直接代理 LLM API 调用，而是治理 Agent 对 MCP 工具的访问。平台设计为 LLM 无关（LLM-agnostic），可与任何支持 MCP 协议的 Agent（基于 OpenAI/Anthropic/Google 等任意模型）配合使用。ACI.dev 平台侧支持 200+ 模型
- **负载均衡**: 不适用。Gate22 定位为 MCP 治理控制平面，非数据平面流量网关，不提供跨模型实例的负载均衡功能
- **缓存能力**: 后端使用 PostgreSQL + pgvector 扩展提供向量相似性搜索（语义工具发现），但未实现独立的缓存层（不支持 Redis/Memcached 等缓存后端）。无 HTTP 响应缓存或语义缓存机制
**认证与密钥管理**: 

> 三层认证体系：（1）开发者认证 — PropelAuth（用户/组织管理）；（2）Agent 认证 — API Key（64 位十六进制字符串）；（3）外部服务认证 — OAuth2 + API Key + 无认证模式。管理员可设定凭证模式为「组织共享」或「按用户独立」，同一 MCP 服务器可发布两种凭证变体。OAuth2 全生命周期管理：授权发起、安全状态管理（CSRF 防护）、Token 交换、加密存储、自动刷新


**可观测性**: 

> （1）Usage & Logs Dashboard — 开发者门户内提供使用量和日志仪表板；（2）Weights & Biases（wandb）— 用于评估流水线的实验追踪和指标记录；（3）OpenTelemetry — Docker Compose 提供可选 otel profile（`docker compose --profile otel up`）；（4）审计日志 — 每次工具调用均被审计（谁/什么/何时/结果/延迟），近期路线图包含导出功能


- **请求/响应转换**: Gate22 工作在 MCP 协议层面，不进行 LLM 供应商 API 格式互转（如 OpenAI↔Claude↔Gemini）。核心转换能力是将任意数量的 MCP 服务器和工具压缩为统一的 search + execute 双函数接口（Bundle 机制），即使包含 20+ MCP 和 400+ 工具也能动态解析，保持 IDE 上下文窗口精简
- **提示词安全**: 路线图规划中，尚未实现。近期路线图包含「安全加固：对 MCP 服务器/配置的 Tool Poisoning 和 Prompt Injection 模式进行预检（pre-flight checks）」，远期路线图包含 OPA/Cedar 风格的 ABAC 策略。当前通过函数级 allow-list 权限实现最小权限控制
- **插件扩展**: （1）600+ 预构建集成（SaaS 平台、数据库、API），覆盖 Notion、Slack、Supabase、Render、GitHub、PostgreSQL、AWS S3 等；（2）Bring Your Own MCPs — 管理员可接入任意内部或外部远程 MCP 服务器；（3）Python SDK — 供开发者构建自定义集成
- **流式处理**: MCP 协议原生支持 SSE（Server-Sent Events）进行流式通信。Gate22 作为 MCP 网关代理，在 Agent 与 MCP Server 之间传输 MCP 协议流量，具体流式处理方式遵循 MCP 协议规范，未在文档中展开详细实现
- **Token 计数与成本追踪**: ACI.dev 平台侧集成了 Stripe 计费系统（API 版本 2025-02-24.acacia），支持 webhook 事件处理。远期路线图包含「配额与预算：按用户/团队/应用/函数」的 Token/金额预算管理，当前版本尚未实现 Token 级别的使用量统计和成本归属

### 10. WSO2 AI Gateway（WSO2 AI 网关）

- **模型提供商支持**: 内置支持 7 家 LLM 提供商：OpenAI（v2.0.0）、Azure OpenAI（v2.0.0）、AWS Bedrock、Anthropic（Claude）、Google Gemini、Mistral AI、Azure AI Foundry；支持通过自定义 AI 服务商连接器（Custom AI Service Provider）框架扩展任意第三方 LLM 提供商，提供接入引导文档
- **负载均衡**: 支持轮询（round-robin）、故障转移（failover）和加权（weighted）三种负载均衡策略；可在同一服务商内的多个模型之间以及跨服务商之间进行请求分发
- **速率限制**: 支持三层速率限制：（1）请求数级限制，（2）Token 级限制（max prompt tokens / max completion tokens / max total tokens 三项独立配置），（3）金额级成本上限；时间窗口支持按分钟/小时/天；支持后端级别和订阅级别的分布式限流（基于 Redis/Valkey CRDT）
**缓存能力**: 

> 支持语义缓存（Semantic Caching）：基于向量嵌入（Embedding）的语义相似度匹配缓存，非传统精确匹配缓存。使用 L2 欧氏距离度量相似度，可配置相似度阈值（推荐保守起步 0.95）和 TTL 过期时间。向量嵌入提供商支持 OpenAI、Azure OpenAI、Mistral。向量数据库后端支持 Zilliz（云托管 Milvus）和 Milvus（开源自托管）。官方宣称可减少 40%-60% 的 API 调用


- **降级与重试**: 支持自动故障转移（Failover）：主服务商不可用时自动切换到备用服务商；支持多模型降级路由策略；内置自动重试机制
- **认证与密钥管理**: 支持多种认证方式：OAuth2（含 audience binding、PKCE、资源指示符 RFC 8707）、API Keys、Basic Auth、双向 mTLS、JWT 令牌验证、PAT（个人访问令牌）；支持多租户虚拟密钥管理、密钥轮转、令牌过期与吊销、加密 OAuth2 令牌、多个活跃访问令牌、证书绑定访问令牌
**可观测性**: 

> 日志：支持 ELK Stack（Elasticsearch/Logstash/Kibana）、Datadog、OpenSearch、Choreo 分析；提供关联日志、HTTP 访问日志、审计日志、API 日志、WebSocket 日志。追踪：支持 OpenTelemetry 和 OpenTracing 分布式追踪。指标：JMX 指标监控，支持 Prometheus/Grafana 集成。AI 专用：Moesif 驱动的 AI API 分析仪表盘（Token 用量、成本估算、模型流量占比、Guardrail 触发统计、错误类型分布）


**提示词安全**: 

> 内置多层护栏体系：（1）语义提示护栏（Semantic Prompt Guardrail）：基于语义相似度检测有害/不当输入；（2）Regex 护栏：基于正则表达式的输入输出验证；（3）URL 验证护栏：检测链路中的幻觉 URL；（4）内容长度/词数/句子数护栏：控制输入输出规模；（5）JSON Schema 护栏：强制响应结构化合规；（6）语义工具过滤护栏：按语义相关性选择和排序可用 MCP 工具。外部集成：Azure Content Safety（仇恨言论/暴力/色情/自残/越狱检测）、AWS Bedrock Guardrails（内容安全验证和 PII 防护）


- **流式处理**: 原生支持 SSE（Server-Sent Events）流式响应代理，可代理 OpenAI 等提供商的 streaming 模式（stream=true）；支持 WebSocket 全双工实时通信；MCP Gateway 基于 Streamable HTTP 运行；Event Gateway 支持 WebSub/Webhook/Kafka 事件流；支持 AsyncAPI 定义的流式 API 管理
- **Token 计数与成本追踪**: 支持 Token 用量统计（prompt tokens / completion tokens 分项追踪）；多模型价格换算和成本估算；Moesif 驱动的 AI API 变现分析（可在仪表盘查看 Token 用量趋势、成本趋势、模型流量占比）；支持后端级别和消费者级别的成本上限配置；按时间窗口（每分钟/每小时/每天）追踪 Token 消耗

### 11. Plano（原名 Arch Gateway / archgw）

- **模型提供商支持**: 支持 OpenAI、Anthropic、DigitalOcean 自有模型等，通过 YAML 配置声明式添加任意兼容 OpenAI Chat Completions API 的提供商。实测支持 Ollama 等本地模型。采用统一 API 抽象，开发者无需处理各提供商的 API 差异。
**可观测性**: 

> 内置 W3C Trace Context 端到端追踪，通过 OpenTelemetry 协议（OTLP/gRPC）导出。支持随机采样（1%-100%）、span 属性自定义、traceparent Header 传播。提供 plannoai obs 命令实时查看流量和成本，plannoai trace 命令深入单请求追踪。可集成到兼容 OTel 的后端：Grafana Tempo、Jaeger、Signoz、Prometheus（通过 OTel Collector 桥接）。零代码自动捕获全链路追踪。


- **提示词安全**: 支持集中式 Prompt 护栏，通过 Filter Chains 机制实现。內建 jailbreak（越狱攻击）检测，可在配置文件中声明 input_guards 并自定义拒绝消息。支持自定义护栏规则（如领域/主题限制）。护栏作为独立 HTTP/MCP 服务运行在数据面中，可跨所有 Agent 和 LLM 统一应用。支持短路拒绝机制（4xx 返回）。
**插件扩展**: 

> 通过 Filter Chains 机制实现扩展：Filter 是独立的 HTTP 或 MCP 服务，支持用任意语言编写，返回标准 HTTP 状态码即可。Filter 可执行检查（Inspect）、修改（Mutate）、短路拒绝（Short-circuit）、日志追踪（Emit）四种操作。底层基于 Envoy proxy-wasm，Rust 代码编译为 .wasm 二进制，作为 Envoy HTTP Filter 加载。核心 Wasm 过滤插件：prompt_gateway.wasm（入站）、llm_gateway.wasm（出站）。



### 12. Docker MCP Gateway

- **模型提供商支持**: 不适用（Docker MCP Gateway 是 MCP 工具网关，非 LLM API 网关，不直接路由模型提供商 API 调用。MCP 协议本身与任何 AI 客户端兼容，包括可通过 Anthropic/OpenAI/Gemini 等模型驱动的客户端）
- **缓存能力**: 不支持语义缓存或精确匹配缓存；仅提供 MCP 客户端连接池缓存（长连接复用，通过 keptClients 映射和 sync.Once 延迟初始化实现）和 OAuth 令牌缓存（含自动失效刷新）
- **认证与密钥管理**: 支持 OAuth 2.1 认证（含 DCR 动态客户端注册和自动令牌刷新）；Docker Desktop Secrets Engine 密钥管理（密钥存储在 OS 原生密钥链）；`docker mcp secret set` CLI 安全注入密钥；`--block-secrets` 标志扫描载荷中泄露的 API 密钥/令牌并阻断传输；密钥从不在配置文件或环境变量中暴露
**可观测性**: 

> 集成 OpenTelemetry 分布式追踪（含自动 Trace Context 传播、结构化 Span 层级：gateway.run → mcp.tool.call → mcp.interceptor.*）；Prometheus 指标暴露于 /metrics 端点（含 mcp.tool.calls、mcp.tool.duration、mcp.tool.errors、mcp.gateway.starts 等直方图和计数器指标）；Zap 结构化日志（含 Trace ID 自动注入实现 Log-Trace 关联、分级日志 Debug/Info/Warn/Error、敏感 Header 自动脱敏）；中间件顺序：OTel → Metrics → Logger → Recovery → CORS


- **请求/响应转换**: 通过 Interceptor 拦截器中间件实现 MCP 请求/响应修改，支持 Exec（Shell 脚本通过 stdin 接收 JSON）、Docker（容器化安全处理）、HTTP（集成企业安全基础设施）三种拦截器模式；支持 jq 输出转换过滤；不支持 LLM 协议格式互转（OpenAI↔Claude↔Gemini），因为网关处理的是 MCP 工具调用而非 LLM API 调用
**提示词安全**: 

> 通过 Interceptor 拦截器实现多层 Prompt 注入防护：预调用参数检查和内容扫描、后调用响应扫描和 PII 清洗、跨仓库会话锁定（记录首次访问的仓库并阻断会话内跨仓库访问）、已知注入模式检测（'ignore previous instructions' 等）；`--verify-signatures` 验证容器镜像签名和 SBOM 溯源；Policy System 的 Allow/Block/Warn 三级决策


- **插件扩展**: 支持 Interceptor 拦截器作为扩展机制，包括 Exec（Shell 脚本）、Docker（容器化）、HTTP（Web 服务）三种模式；非传统 Wasm/Lua 插件系统；通过 Policy System 可实现自定义访问控制策略
- **流式处理**: 支持三种 MCP 传输方式：stdio（本地进程 stdin/stdout 通信，适合本地开发）、SSE Server-Sent Events（HTTP 持久连接，支持多客户端，适合生产环境）、Streamable HTTP（MCP 2025-03-26 规范新增，标准 HTTP 请求/响应 + Mcp-Session-Id 会话管理）

### 13. Envoy AI Gateway

**模型提供商支持**: 

> 支持 16+ 家 LLM 提供商：OpenAI、Anthropic（原生 + AWS Bedrock）、Azure OpenAI、Google Gemini、Google Vertex AI、AWS Bedrock、Mistral、Cohere、Groq、DeepSeek、Together AI、DeepInfra、Hunyuan（混元）、SambaNova、Grok、Tetrate Agent Router Service。通过统一的 OpenAI 兼容 API 接入，支持 Chat Completions、Embeddings、Rerank 等端点，以及原生 Anthropic Messages API


**负载均衡**: 

> 底层基于 Envoy 的加权轮询（Weighted Round Robin）、加权最少请求（Weighted Least Request/P2C）、后端利用率（ORCA 指标驱动）等通用策略；v0.3+ 集成 Gateway API Inference Extension（Endpoint Picker），支持推理感知路由：基于 GPU 队列深度、KV-cache 占用、LoRA 适配器、延迟等 AI 特定指标的智能负载分配


- **速率限制**: 支持基于 Token 的速率限制（区别于传统的请求数/秒），可配置输入 Token、输出 Token、总 Token 及自定义 CEL 表达式计费模型的限流（如 input_tokens * 0.5 + output_tokens * 1.5）。支持按用户、按模型、按时间窗口（小时/天）的精细化策略。超限返回 HTTP 429。需 Redis 作为全局速率限制后端存储
- **缓存能力**: 语义缓存（Semantic Caching）处于社区讨论阶段（GitHub Issue #10），尚未实现为正式功能。v0.5.0 起支持提供商原生 Prompt Caching（AWS Bedrock Claude、GCP Claude），通过统一 cache_control API 启用。Redis 被提议作为语义缓存元数据和嵌入向量存储后端，但目前无生产级语义缓存实现
**降级与重试**: 

> 支持基于优先级的跨提供商故障转移（Provider Fallback），通过 AIGatewayRoute 的 backendRefs 定义优先级列表。底层使用 Envoy 复合集群（Composite Cluster）机制实现重试感知的集群选择。BackendTrafficPolicy 支持配置重试次数（numRetries）、每优先级尝试次数（numAttemptsPerPriority）、指数退避（exponential backoff with jitter）、重试触发条件（5xx、connect-failure 等）。当主提供商不可用时自动切换至备选（如 OpenAI → AWS Bedrock → Anthropic）


**认证与密钥管理**: 

> 上游认证凭据注入（Upstream Auth/Credential Injection）：应用使用单一内部认证 Token，网关自动为不同 AI 提供商注入对应的 API Key。支持 API Key、OIDC、AWS Credential Chain、Azure Entra ID 等多种认证方式。MCP 网关支持 OAuth 2.0 和 JWT 认证。提供集中化的多租户密钥管理、凭据轮转和访问控制


**可观测性**: 

> 完整的 OpenTelemetry 集成：支持 GenAI Semantic Conventions 指标（gen_ai.client.token.usage、gen_ai.server.request.duration 等）；v0.3+ 集成 OpenInference Tracing，自动记录完整提示词、模型参数、Token 用量、流式事件（TTFT 作为 Span Event）；支持 Jaeger、Arize Phoenix、Apache SkyWalking 等后端。输出 Prometheus 格式指标，可集成 Grafana 预建仪表盘。提供结构化 JSON 访问日志，包含模型名、提供商、Token 用量、延迟、重试次数等字段


**请求/响应转换**: 

> 内置多提供商格式互转，以 OpenAI API 格式为统一入口。支持 OpenAI → AWS Bedrock（Converse API）、OpenAI → GCP Vertex AI（Gemini API）、OpenAI → Anthropic（Messages API）等路径的双向 Schema 转换。转换内容包括角色映射、Token 参数字段映射、路径重写、流式 SSE 响应归一化。支持跨提供商的统一 Thinking/Reasoning 配置。错误码自动映射为标准 OpenAI 错误格式


- **提示词安全**: Prompt Injection 防护和内容审核通过 Envoy 外部处理（ext_proc）扩展机制实现，Gateway 层面支持自定义 ext_proc 过滤器接入外部审核服务（如 OpenAI moderation endpoint），但 Envoy AI Gateway 本身不内置专用的 Prompt Injection 检测模型或 PII 脱敏引擎，需依赖外部集成
- **流式处理**: 完整支持 SSE（Server-Sent Events）流式响应。对不同提供商的原生流式格式（Gemini SSE、Bedrock eventstream、Anthropic SSE）自动归一化为 OpenAI 兼容的 SSE 格式。支持 MCP Streamable HTTP 传输协议（2025 年 6 月 MCP 规范）。流式处理过程中实时提取 Token 用量并更新速率限制计数器
**Token 计数与成本追踪**: 

> 自动从 LLM 响应中提取 Input Token、Output Token、Total Token，存储为 Envoy 动态元数据（io.envoy.ai_gateway 命名空间）。支持 CEL 表达式自定义成本计算公式（如加权定价）。Token 用量通过 OpenTelemetry 指标和访问日志暴露，可集成 Apache SkyWalking、Arize Phoenix 等工具进行多模型成本分析和归属



### 14. GPT-Load

**模型提供商支持**: 

> 原生支持3家核心提供商，以及众多OpenAI兼容服务：OpenAI（Chat Completions/Completions/Embeddings/Responses等端点）、Google Gemini（Gemini Pro/Pro Vision，v1beta接口）、Anthropic Claude（Messages接口）。额外支持Azure OpenAI及所有OpenAI格式兼容的第三方服务（如DeepSeek、硅基流动SiliconFlow、Groq、together.ai、novita.ai等）。因为是透明代理（透传原生格式），任何OpenAI兼容API均可通过GPT-Load代理。支持的渠道分为三种类型：openai（OpenAI格式）、gemini（Gemini原生格式）、anthropic（Claude原生格式）


- **负载均衡**: 支持平滑加权轮询（Smooth Weighted Round-Robin）负载均衡。分为两种分组：标准分组（直接包含API Key）和聚合分组（包含多个子分组）。聚合分组按权重分发流量到子分组，权重范围0-1000，按百分比计算流量分配。支持等比分配、容量比例分配、主备模式、金丝雀发布、地理分布、A/B测试等多种负载均衡模式。上游地址支持多地址加权轮询，异常节点自动剔除
- **降级与重试**: 支持智能故障处理机制：请求失败后自动重试（最多重试次数可配置，默认3次），每次重试自动选择不同的可用密钥。连续失败达到blacklist_threshold阈值（默认3次，可配置为0禁用）后自动将密钥加入黑名单。黑名单密钥由后台定时任务（CronChecker）定期验证恢复，验证间隔默认60分钟，验证并发度默认10，超时默认20秒。所有重试密钥均失败后返回503错误。支持密钥健康状态自动检测与恢复
**认证与密钥管理**: 

> 双重认证体系：管理端认证（AUTH_KEY环境变量，用于Web管理界面和REST API鉴权）与代理端认证（全局代理密钥或分组级别代理密钥，逗号分隔多个）。API密钥支持加密存储（通过ENCRYPTION_KEY环境变量启用AES加密），提供密钥加密迁移工具（migrate-keys命令）支持启用/禁用/更换加密密钥。密钥管理功能包括：分组管理（标准分组和聚合分组）、批量导入（v1.4.2起支持百万级Key导入优化）、自动去重、密钥健康验证、失效密钥自动检测和清理。密钥轮转：通过Redis RPOPLPUSH原子操作实现真正的队列式轮转，每次请求取队尾Key并放回队首


**请求/响应转换**: 

> 不进行任何格式转换。GPT-Load定位为透明代理（Transparent Proxy），完全透传上游API的原生请求和响应格式。OpenAI渠道直接透传OpenAI格式，Gemini渠道透传Gemini原生格式，Anthropic渠道透传Claude原生格式。支持模型重定向规则（将用户请求的模型名映射到不同模型），支持请求头规则（添加/删除/修改Header），但响应体不做任何解析或修改。这与New API等格式统一网关形成鲜明对比——GPT-Load追求零损耗透传


- **提示词安全**: 无内置Prompt注入检测与防护机制。项目专注于密钥池化和负载均衡，不涉及请求内容级别的安全检查。无Prompt注入特征库或检测模型
**流式处理**: 

> 核心支持SSE（Server-Sent Events，text/event-stream）流式传输。采用零拷贝流式传输（io.Copy()），从上游到客户端直接透传，不缓冲流式响应内容，避免大流式响应的内存压力。原生支持OpenAI的stream: true参数，以及Gemini和Claude的流式响应。不支持客户端WebSocket连接。不支持gRPC流式传输。不支持Streamable HTTP


- **Token 计数与成本追踪**: 不支持Token计数和成本追踪。GPT-Load仅记录请求级别指标（请求次数、成功/失败状态、响应时间、RPM），不解析请求和响应体中的token数量。无tiktoken集成。无Token消耗量统计。无成本归属功能。无按用户/模型的费用报表。这是GPT-Load与New API等完整网关项目最显著的功能差异——token计数和成本追踪需依赖上层工具（如New API）实现

### 15. Helicone

**模型提供商支持**: 

> 支持 100+ 模型，覆盖 20+ 提供商，包括 OpenAI、Anthropic、Google（Gemini/Vertex AI）、AWS Bedrock、Azure OpenAI、Meta（Llama）、Mistral、Groq、TogetherAI、DeepInfra、Fireworks AI、Anyscale、Ollama 等。统一提供 OpenAI 兼容格式接口（/v1/chat/completions），通过模型名前缀路由到不同提供商（如 anthropic/claude-3-5-sonnet）。支持 BYOK（自带密钥）和 Pass-Through Billing（平台代付）两种计费模式


- **负载均衡**: 支持多种负载均衡策略：延迟优先路由（P2C + PeakEWMA，自动选择最快提供商）、加权分布（按模型权重分配流量）、成本优化路由（选择最便宜的提供商）、故障转移感知（自动考虑提供商可用性和速率限制）。支持在 config.yaml 中配置路由策略和 fallback 链
- **速率限制**: 支持多级速率限制：按 API 密钥、按用户、按团队、全局级别。限制维度包括请求数（RPM）、Token 使用量（TPM）和金额（美元预算）。通过 config.yaml 中的 rate-limit 段配置容量（capacity）和补充频率（refill-frequency）。AI 网关层面支持请求级和 Token 级限流
**缓存能力**: 

> 支持精确匹配缓存（基于请求 URL、Body、Headers、Seed、Bucket Index 的哈希键）。平台层缓存后端为 Cloudflare Workers KV（300+ 全球边缘节点），AI 网关支持内存缓存、Redis、S3 三种后端。可配置 TTL（Cache-Control 头，默认 7 天，最长 365 天）。支持 Bucket 缓存（存储多条不同响应应对非确定性提示词）。支持缓存键定制（排除特定 JSON 键、按用户命名空间隔离）。缓存命中可降低 95% 延迟和成本。不支持语义缓存（基于向量嵌入的相似度匹配），仅支持精确匹配缓存


**降级与重试**: 

> 支持自动故障转移（Fallback）：通过模型名后缀配置 fallback 链（如 gpt-4o/openai,claude-sonnet-4/anthropic）。支持计费模式 fallback：优先 PTB（平台代付），失败后自动切换 BYOK（自带密钥）。重试机制：内置重试头（Helicone-Retry-Enabled: true）自动处理指数退避；支持手动重试逻辑（区分可重试错误：429/500/503，不可重试：401/403/400）。错误优先级排序：403 > 401 > 400 > 500 > 429


**认证与密钥管理**: 

> 多层次认证体系：1）Helicone API Key（统一密钥访问所有提供商）；2）密钥保管库（Key Vault）安全存储提供商 API 密钥；3）BYOK（自带密钥，用户管理自己的提供商密钥）；4）SAML SSO（Enterprise 版）。支持 Helicone-Auth Bearer Token 和 Authorization Bearer 双 Header 认证。Helm 部署中通过 Kubernetes Secret 管理 S3 密钥和数据库凭据。不支持 API 密钥轮转、虚拟密钥多租户体系、JWT/OIDC 联邦认证


**可观测性**: 

> Helicone 的核心强项。三支柱可观测性：1）日志（Logging）：每个请求自动记录完整 prompt/response、延迟、Token 使用量、成本、错误信息，支持自定义属性（Helicone-Property-* Header）进行多维度切片；2）指标（Metrics）：内置 Dashboard 展示使用量、成本、延迟趋势，支持 OpenTelemetry 导出到 Prometheus/Grafana/Datadog 等任意 OTLP 兼容后端；3）追踪（Tracing）：请求级追踪，按会话（Session）分组多轮对话，支持 HQL（Helicone Query Language）高级过滤。集成 Langfuse、LangSmith、Datadog、PostHog 等外部可观测性平台。提供告警功能（成本/Token 阈值触发）。注意：追踪为扁平请求列表，不支持 Agent 多层 Span 树（无父子嵌套追踪）


**请求/响应转换**: 

> 核心能力：将 OpenAI 兼容格式的请求自动转换为目标提供商的原生 API 格式（Anthropic、Google 等）。通过统一端点（https://ai-gateway.helicone.ai/v1）接收 OpenAI SDK 格式请求，内部转换为各提供商的专有格式。支持内容块翻译（文本、工具调用等）。支持模型名称路由转换（如 gpt-4o 路由到 OpenAI，claude-sonnet-4 路由到 Anthropic）。注意：格式转换主要面向 OpenAI ↔ 各提供商单向转换，非全双向任意格式互转


**提示词安全**: 

> 集成 Meta 的双层安全模型：1）基础层 Prompt Guard（86M 参数）：检测直接/间接 Prompt 注入、Jailbreak 攻击，支持 8 种语言，检出率约 97%；2）高级层 Llama Guard（3.8B 参数）：深度内容分析，覆盖 14 类威胁（暴力犯罪、仇恨言论、数据泄露、钓鱼、色情内容等）。通过 Header 启用（Helicone-LLM-Security-Enabled: true / Helicone-LLM-Security-Advanced: true）。检测到威胁时返回 403 并拦截请求。当前限制：仅支持 OpenAI 模型，不支持其他提供商的安全检测


- **插件扩展**: 不支持自定义插件/Wasm 扩展/Lua 脚本等扩展机制。扩展主要通过 HTTP Header 配置行为（缓存、安全、重试、Session 追踪、自定义属性等），无编程级扩展 API。不支持中间件链或 Hook 系统
**流式处理**: 

> 支持 SSE（Server-Sent Events）流式响应。通过 OpenAI 兼容的 streaming 接口实现，LangChain/LangGraph 集成中支持 chat.stream() 和 chat.astream()。AI 网关透明代理 SSE 流并记录完整可观测性数据（Token 计数、延迟、成本）。流式 Token 计数通过 OpenAI stream_options 的 usage flag 实现。不支持 WebSocket、WebRTC、MCP Streamable HTTP 流式协议


**Token 计数与成本追踪**: 

> 每次请求自动提取 Token 使用量（prompt_tokens + completion_tokens）。非流式请求：从 API 响应的 usage 对象直接获取；流式请求：通过 OpenAI stream_options usage flag 获取；Anthropic 请求：因 TypeScript SDK 限制，使用自定义 Python 服务计算 Token。内置 300+ 模型价格数据库（基于各提供商官方定价表），自动换算成本。多维度成本归因：按用户（Helicone-User-Id）、会话（Helicone-Session-Id）、自定义属性（Helicone-Property-* Header）进行花费切片。Dashboard 提供可视化花费看板，支持按模型/用户/时间/自定义属性筛选。AI 网关层面支持成本优化路由（自动选择最便宜提供商）



### 16. Higress

**模型提供商支持**: 

> 支持 25+ 家国内外模型提供商。涵盖：OpenAI、Azure OpenAI、Anthropic Claude、AWS Bedrock、Google Vertex AI、Google Gemini、通义千问（Qwen）、DeepSeek、智谱 AI（Zhipu）、月之暗面（Moonshot）、百川（Baichuan）、零一万物（Yi）、MiniMax、Groq、Grok（xAI）、OpenRouter、Fireworks AI、文心一言（ERNIE Bot / 百度）、360 智脑、Mistral、Ollama（自托管）、混元（腾讯）、阶跃星辰（Stepfun）、讯飞星火（Spark）、Cloudflare Workers AI、DeepL、Cohere、Together AI、Dify、豆包（Doubao / 字节跳动）、GitHub Models、NVIDIA Triton。通过 ai-proxy 插件统一 OpenAI 协议接入，同时原生支持 Claude Messages API 和 Gemini API 协议，并实现自动协议检测与互转。支持自定义 OpenAI 兼容端点（通配模式），可对接任意 OpenAI-compatible 后端。


**负载均衡**: 

> 支持多种通用负载均衡策略：轮询（Round-Robin）、加权轮询、最小连接数、加权最小连接数、最短响应时间、一致性哈希（基于 IP/Header/Cookie）、随机。针对 LLM 场景还提供三种 Wasm 插件级高级策略：① 全局最小请求数负载均衡（基于 Redis 全局视野，避免单节点过载）；② 前缀匹配负载均衡（将同会话请求路由到同一 Pod，充分利用 KV Cache，实测首 Token 延迟下降 50%）；③ GPU 感知负载均衡（根据 vLLM Prometheus Metrics，按 LoRA Adapter 亲和性、队列长度、KV Cache 使用率调度）。配置生效粒度支持实例级、域名级、路由级、服务级。


**速率限制**: 

> 支持三层速率限制能力：① 通用 key-rate-limit 插件（基于消费者 API Key 的 QPS 限制）；② ai-token-ratelimit 插件（Token 级速率限制，按 TPM - Token Per Minute 粒度，基于 Redis 分布式存储）；③ ai-quota 插件（硬配额管理，消费者配额耗尽即拦截，提供管理 API 用于查询/刷新/增减配额）。配合 key-auth 插件实现消费者级差异化限制策略。


**认证与密钥管理**: 

> 支持多种认证方式：key-auth（API Key 认证）、jwt-auth（JWT 令牌认证）、hmac-auth（HMAC 签名认证）、basic-auth（基础认证）、OIDC（OpenID Connect）、OAuth2。ai-proxy 插件支持多 API Key 池管理（虚拟密钥机制）：网关层为每个租户/消费者分配独立虚拟 Key，后端实际使用统一真实 API Key，实现多消费者密钥隔离。支持 Token 轮转（随机选择或故障转移）和健康检查。自身提供消费者管理系统（key-auth consumers 配置）。


**可观测性**: 

> 提供 AI 专属可观测能力。核心组件：① ai-statistics 插件（自动采集 input_token/output_token/reasoning_tokens/cached_tokens，按网关/路由/模型/消费者四维度标记，支持 OpenAI/Claude/Gemini/自定义协议格式）；② 内置 AI Dashboard 控制台（http://localhost:8001），实时展示 Token 吞吐量、各提供商/模型用量、消费者用量、TTFT 和总延迟；③ Prometheus Metrics 暴露（含 irate 聚合查询支持，可对接 Grafana）；④ 分布式追踪集成（SkyWalking、Zipkin、OpenTelemetry / ARMS，注入 gen_ai.* span attributes）；⑤ Agent Session Monitor（会话级监控，重建多轮对话，按 session_id 关联，提供 Token 分解、工具调用追踪、成本估算及 Web UI / CLI FinOps 报告）；⑥ 结构化 JSON 访问日志（含完整对话历史、模型、Token、延迟等字段）。


**请求/响应转换**: 

> 支持三层转换能力：① ai-proxy 插件自动协议检测与转换（Claude ↔ OpenAI ↔ Gemini 格式互转，零配置，含工具调用/推理参数/多模态内容/流式格式等双向映射）；② transformer 插件通用 HTTP 字段级转换（支持请求/响应头、查询参数、请求体 JSON 的增删改查 rename/replace/map/append/dedupe 操作）；③ ai-transformer 插件（通过 LLM 自身对请求/响应进行智能转换）。参数映射覆盖：max_tokens、temperature、top_p、top_k、seed、stop、safety settings 等。v2.2.2 新增 Bedrock Mantle Endpoint 直连 Claude 原生协议，避免双层转换数据丢失。


**插件扩展**: 

> 以 Wasm（WebAssembly）插件作为核心扩展机制，遵循 Proxy-Wasm ABI 规范。支持 Go（最主流，v2.x 升级至 Go 1.24 + 标准 Go WASI 编译）、Rust（性能最优，接近原生）、C++、AssemblyScript/JavaScript 等多语言开发。提供全流程开发工具链：Wasm 插件 SDK、构建工具（Go tinygo/std-wasi、Rust cargo-higress）、沙箱内存隔离、独立版本升级、流量无损热更新（无需重启网关）。插件通过 OCI 容器镜像分发，使用 WasmPlugin CRD 在 K8s 中部署。2025 年新增原生 Go 插件模式（双扩展路径）。插件分为三种 Filter 类型：Http Filter、Network Filter、Wasm Service。官方提供插件市场（Plugin Marketplace）。


**流式处理**: 

> 支持完整的流式处理能力：SSE（Server-Sent Events）完整流式处理请求/响应体，支持 HTTP/1.1 和 HTTP/2 的流式传输。ai-proxy 插件原生支持 OpenAI SSE 流式 chunk 解析（delta 增量），并支持 Claude event-stream、Gemini 流式等异质协议间的流式格式互转。v2.2.1 修复了流式响应 Token 泄露（断连时实时记录 Token 用量）、Claude 流式响应工具调用信息丢失、Bedrock/Vertex 流式截断等问题。MCP 支持 Streamable HTTP（2025-03-26 协议）和 POST+SSE（2024-11-05 协议）双模式，原生支持 WebSocket。



### 17. Langfuse

**模型提供商支持**: 

> 不适用——Langfuse 定位为 LLM 可观测性平台而非 API 网关。通过 SDK 封装和 OpenTelemetry 支持观测几乎所有 OpenAI 兼容接口的模型提供商，包括 OpenAI、Anthropic、Google Gemini、Azure、AWS Bedrock、Ollama、DeepSeek、Together AI 等。原生集成 80+ 框架和工具。通过 LiteLLM 可覆盖 100+ 模型提供商。


- **速率限制**: Langfuse Cloud 提供内置组织和项目级速率限制（根据套餐不同，从 1,000 到 20,000 请求/分钟不等）。自托管版本不内置速率限制，官方推荐使用 Nginx、HAProxy 等反向代理在外部实现。
- **降级与重试**: Langfuse 自身不提供模型故障转移（fallback）和自动重试能力。通过集成 LiteLLM Proxy、Portkey 等外部网关可实现多模型 fallback 策略。Langfuse SDK 对 Prompt 获取内置重试机制（客户端缓存+重试）。
- **认证与密钥管理**: 支持项目和用户级别的 API Key 管理（Public Key / Secret Key 对）。通过 Organization → Project 层级实现多租户隔离。Langfuse Cloud 支持 SSO（Okta、Azure AD/Entra ID，Teams 附加包）。企业版支持 SCIM 用户自动配置。不支持虚拟密钥或密钥轮转自动化。
**可观测性**: 

> 这是 Langfuse 的核心能力。提供全面的 LLM 可观测性：分布式追踪（Traces/Spans/Generations/Events）、多轮对话会话管理、Agent 图可视化、延迟时间线视图、Token 使用量和成本仪表盘、自定义评分和评估。原生集成 OpenTelemetry，支持 OTLP/HTTP（JSON 和 Protobuf）协议。支持 Prometheus metrics 导出。自 v3 版本起以 ClickHouse 为分析存储引擎，支持 10K+ spans/秒。


**提示词安全**: 

> Langfuse 自身不是安全防护库，而是通过可观测性层包裹第三方安全工具来实现防护。集成方式：通过 SDK 装饰器（@observe()）追踪 LLM Guard、Lakera Guard、NeMo Guardrails、Azure AI Content Safety 等安全库的检测结果，并在 Langfuse 中进行评分、评估和监控。支持 Prompt 注入检测（通过 Lakera Guard 效果较好，LLM Guard 对高级攻击效果有限）、BanTopics 话题过滤、毒性检测等。


**流式处理**: 

> Langfuse 通过 SDK 层面完整支持 SSE（Server-Sent Events）流式响应追踪。Python SDK 的 OpenAI 封装自动重组 SSE 数据块、捕获 usage 信息块、测量首 Token 时间（TTFT）。JS/TS SDK 同样支持流式生成追踪。平台自身使用 Next.js 提供 Web 界面，支持 Streamable HTTP。不直接代理 WebSocket 连接。


**Token 计数与成本追踪**: 

> Langfuse 的核心功能之一。支持双重 Token 计算：优先使用 API 返回的实际 usage 数据（最准确），其次通过内置 tokenizer（tiktoken 用于 OpenAI、@anthropic-ai/tokenizer 用于 Claude）推断。内置模型价格数据库覆盖 OpenAI、Anthropic、Google 等主要提供商。支持自定义模型定价定义（通过 API/UI）。2025年12月新增定价层级（Pricing Tiers）支持上下文相关的差异化定价（如 claude-sonnet-4-5-20250929 根据输入 Token 量级采用不同费率）。支持成本按 User/Session/Trace 归属到具体项目和用户。



### 18. LiteLLM

**模型提供商支持**: 

> 支持 140+ LLM 提供商及 2,500+ 模型，覆盖 OpenAI、Anthropic、Azure、AWS Bedrock、Google Vertex AI/Gemini、Groq、Cohere、DeepSeek、Mistral、Ollama、VLLM、Replicate、Together AI、Fireworks AI、xAI、NVIDIA NIM、Cloudflare Workers AI、Databricks、Snowflake、Oracle OCI 等。统一提供 Chat/Embeddings/Images/Audio/Batches/Rerank 接口，均以 OpenAI 兼容格式暴露


- **负载均衡**: 支持多种负载均衡策略：轮询（round-robin）、加权路由（weighted routing）、最低延迟路由（least-latency）、跨部署负载均衡（多个同模型实例间分流）、跨提供商负载均衡（如 OpenAI+Azure 间分配流量）。内置熔断器（circuit breaker）和健康检查，自动隔离不健康的部署端点。支持加权路由故障转移（v1.86+），可实现主备/金丝雀部署模式
- **速率限制**: 四级速率限制体系：全局服务器级 → 虚拟密钥级 → 用户级 → 团队级，均支持 RPM（请求/分钟）和 TPM（Token/分钟）限制。通过 Redis 分布式缓存或内存缓存实现，异步更新使用量计数器。支持在配置中自定义各级限制阈值，可在代理层面精确控制每个维度的并发和吞吐量
**缓存能力**: 

> 支持三层缓存体系：1）代理响应缓存（精确匹配，命中则直接返回缓存响应，无需调用 LLM）；2）语义缓存（基于 RedisVL/Qdrant 向量相似度匹配，相似提示词命中缓存，threshold 可配置 0.0-1.0）；3）提供商原生提示词缓存透传（OpenAI/Anthropic/Gemini/Bedrock/DeepSeek 的 KV-cache 优化）。缓存后端支持：内存缓存（InMemoryCache，10μs 延迟）、磁盘缓存、Redis（含 Redis Cluster/Sentinel）、Redis 语义缓存、Qdrant 语义缓存、S3、GCS、Azure Blob 共 8 种。采用 DualCache 双层架构（L1 本地 + L2 分布式），支持动态缓存控制（no-cache/no-store/ttl/s-maxage/namespace），实际案例中语义缓存可将命中率从 38% 提升至 62%


**降级与重试**: 

> 支持多级 Fallback 链（如 gpt-4 → claude-3-opus → gpt-4o-mini），配置简单（在请求选项中指定 fallbacks 列表）。自动重试机制：跨部署重试、跨提供商重试，在失败场景下自动切换到备用模型。支持 context window fallback（当上下文超长时自动切换到更大窗口模型）。Router 级别提供重试/fallback 逻辑，可配置重试次数和超时时间。需要注意 drop_params 模式可能在 fallback 时静默丢弃不兼容参数


**认证与密钥管理**: 

> 多层次认证体系：1）虚拟密钥（Virtual Keys）：支持用户级和团队服务账号密钥，可配置模型白名单、预算、速率限制；2）JWT 认证（支持 OIDC/OAuth2）；3）SSO 集成（Okta/Azure AD/Google Workspace，Enterprise 版）；4）SCIM 用户/组自动同步（Enterprise 版）；5）OAuth2 PKCE + M2M client_credentials（MCP 认证）；6）AWS SigV4签名认证。支持密钥轮转（key rotation）、密钥别名、按 IP CIDR 范围的访问控制列表（ACL）


**可观测性**: 

> 全面的三支柱可观测性：1）指标（Metrics）：内置 Prometheus 格式 /metrics 端点，暴露 30+ 指标族（litellm_proxy_total_requests_metric、litellm_llm_api_latency_metric、litellm_request_total_latency_metric、litellm_overhead_latency_metric、litellm_deployment_success_responses、litellm_spend_metric 等），支持 Grafana 可视化；2）追踪（Tracing）：OpenTelemetry v2 全请求追踪（单 Trace 展示 auth → guardrail → LLM call → DB 持久化 全链路），遵循 GenAI 语义约定，支持分布式追踪（traceparent header 传播），默认不捕获提示词/响应内容（安全优先），兼容 Arize/Phoenix/Langfuse/Weave/Langtrace/Levo/AgentOps 等后端；3）日志（Logging）：支持 Langfuse、LangSmith、Datadog、Helicone、MLflow、Weights & Biases、PostHog、SigNoz、AgentOps 等 10+ 回调集成。支持 S3/GCS/Azure Blob 日志导出。自定义回调基类（CustomLogger）允许实现任意日志后端


**请求/响应转换**: 

> 核心能力：将 140+ 提供商的 API 自动转换为统一的 OpenAI 兼容格式（/v1/chat/completions）。双向格式转换：OpenAI Chat Completions ↔ Anthropic Messages API ↔ Google Gemini。内容块自动翻译：文本块直接映射、工具调用（Anthropic tool_use ↔ OpenAI tool_calls ↔ Gemini functionCall）、工具结果（Anthropic tool_result ↔ OpenAI tool 角色消息）、图像块转换。流式事件翻译：Anthropic SSE 事件 ↔ OpenAI streaming chunks ↔ Gemini streaming 响应。支持 Claude Code 通过 LiteLLM 代理使用非 Anthropic 模型（如 GPT-4o、Gemini）


**提示词安全**: 

> 集成 20+ Guardrail 提供商，支持多层防护：Prompt Injection 检测与防护（Pillar Security 99%+ 检出率、CrowdStrike AIDR 99%+ 检出率、Pangea、PromptGuard 等）；Jailbreak 检测；内容审核（毒性/暴力/自残/NSFW）；密钥/凭证泄露检测；文件消毒（图像/PDF/文档中的嵌入式威胁扫描）；幻觉检测（Qualifire）。支持三种执行模式：pre_call（请求前拦截）、post_call（响应后过滤）、during_call（并行低延迟监控）。违规处置策略：block（拒绝）、monitor（记录但放行）、mask（脱敏后继续）。支持 guardrails default_on 全局启用，或请求级别按需指定


**插件扩展**: 

> 基于 CustomLogger 基类的 Hook 插件系统。核心生命周期 Hooks：async_pre_call_hook（认证后、LLM 调用前，可修改请求/拒绝/重新路由）、async_post_call_success_hook（修改非流式响应）、async_post_call_failure_hook（转换错误消息）、async_post_call_streaming_hook（修改流式响应）、async_moderation_hook（并行内容安全检查）。Agentic Loop Hooks：async_should_run_agentic_loop（决定是否执行工具循环）、async_build_agentic_loop_plan（声明式构建循环计划）、async_run_agentic_loop（全手动控制循环）。自定义 Guardrail 集成（CustomGuardrail 基类）。自定义 Prompt 管理（CustomPromptManagement）。不支持 Wasm/Lua 扩展


**流式处理**: 

> 全面支持多种流式协议：1）SSE（Server-Sent Events）：标准 /v1/chat/completions 流式响应，逐 token 推送；2）WebSocket：OpenAI Realtime API（/v1/realtime）用于语音/实时对话；3）WebRTC：v1.85+ 新增 WebRTC 支持（/v1/realtime/client_secrets、/v1/realtime/calls），音频直接在客户端与提供商之间 P2P 传输，代理仅签发加密令牌；4）MCP Streamable HTTP：MCP 协议的流式传输。流式处理中对非 OpenAI 提供商进行事件格式翻译和标准化。无需 proxy_buffering off 即可透明转发 SSE 流


**Token 计数与成本追踪**: 

> Per-request Token 计数（llm.token_count.prompt + completion tokens），自动从各提供商的响应中提取 token 使用量。多维度成本归属：按虚拟密钥、用户、团队、项目、自定义标签进行花费归因。内置 100+ 模型的价格数据库（支持自定义定价）。预算管理：硬限制（超预算立即拦截，返回 402）、软预算告警（邮件通知）、临时预算提升（时间限制）。Admin Dashboard 提供可视化花费看板。支持通过 /spend 接口编程查询花费。数据库持久化（PostgreSQL/RDS），每次请求后异步写入 LiteLLM_SpendLogs 表



### 19. LobeChat Plugin Gateway（@lobehub/chat-plugins-gateway）

- **模型提供商支持**: 不支持多模型提供商代理。该项目是 LobeChat 生态的插件代理网关，仅负责将插件调用请求验证并转发至外部插件 API，不代理任何 LLM 模型的调用（不涉及 OpenAI/Anthropic/Azure/Bedrock 等 LLM 提供商），不具备任何模型路由或提供商抽象能力
- **负载均衡**: 不支持。该网关不处理 LLM 请求分发，仅为插件调用提供的一对一请求转发，无负载均衡策略（无 round-robin/least-latency/weighted 等机制）
- **速率限制**: 不支持。网关本身没有内置任何速率限制功能，不提供 RPM/TPM 或任何维度的请求限流
- **缓存能力**: 不支持。网关没有实现任何缓存机制，包括：无精确匹配缓存（无请求哈希匹配）、无语义缓存（无向量嵌入相似匹配）、无 Redis/Memcached 等缓存后端。每次请求均实时转发至外部插件 API
- **降级与重试**: 不支持。网关没有故障转移（fallback）机制，无自动重试逻辑，若插件 API 返回错误则直接向调用方返回错误响应
- **认证与密钥管理**: 基本请求来源鉴权。通过 LOBE_CHAT_AUTH_HEADER 请求头验证请求是否来自合法的 LobeChat 实例。无多租户 API Key 管理体系、无虚拟密钥（Virtual Key）概念、无密钥轮转机制。认证粒度仅限「是否为合法 LobeChat 请求」，不区分用户/团队/项目
- **可观测性**: 基本链路追踪。通过 LobeChat SDK 的 TraceClient 将插件 API 调用记录为 trace 中的 span，用于插件调用链路的调试与监控。未集成 Prometheus 指标暴露、Grafana 可视化、OpenTelemetry 分布式追踪或结构化日志系统。无专用的 /metrics 端点或日志导出能力
- **请求/响应转换**: 不支持 LLM 格式互转。网关仅验证请求体（PluginRequestPayload）和插件参数是否符合 Schema 定义，然后原样转发，不进行 OpenAI/Anthropic/Gemini 等 LLM 协议的格式转换。无请求改写、模型切换或内容格式映射功能
- **提示词安全**: 不支持。网关不涉及 LLM Prompt 处理，因此无 Prompt 注入防护、无内容审核模块、无输出过滤或脱敏机制
- **插件扩展**: 不支持用户自定义扩展。网关本身是 LobeChat 插件系统的代理层（即它 IS 插件的网关），不提供 Wasm 扩展、Lua 脚本或自定义中间件等二次扩展框架。其行为由网关源代码定义，用户无法通过配置或插件扩展其功能
- **流式处理**: 不支持。网关的核心实现为同步的 HTTP POST 请求/响应模式（PluginRequestPayload → execute → PluginResponse），不涉及 SSE（Server-Sent Events）、WebSocket 或 Streamable HTTP 等流式协议处理。网关代码中未见 ReadableStream 或流式响应相关实现
- **Token 计数与成本追踪**: 不支持。网关不代理 LLM 调用，不涉及 Token 使用量统计、成本归属计算或多模型价格换算。无内置 Token 计数逻辑和花费追踪数据库

### 20. One API

**模型提供商支持**: 

> 支持30+家模型提供商，涵盖100+模型。主要包括：OpenAI ChatGPT系列（含Azure OpenAI）、Anthropic Claude系列（含AWS Claude）、Google Gemini/PaLM2、Mistral、DeepSeek、字节豆包（火山引擎）、百度文心一言、阿里通义千问、讯飞星火、智谱ChatGLM、360智脑、腾讯混元、Moonshot AI、百川智能、MINIMAX、Groq、Ollama、零一万物、阶跃星辰、Coze、Cohere、xAI、together.ai、novita.ai、硅基流动（SiliconFlow）、Cloudflare Workers AI、DeepL等。此外还支持配置第三方代理服务（如OpenAI-SB、API2D、OhMyGPT、AI Proxy、CloseAI等）及自定义渠道


- **负载均衡**: 支持多渠道负载均衡分发，采用优先级加权随机算法（基于渠道weight属性）。用户请求不加渠道ID时自动在多渠道间进行负载分发；管理员令牌可通过Authorization Header指定特定渠道（格式：Bearer ONE_API_KEY-CHANNEL_ID）。支持渠道自动故障转移与重试选择
- **速率限制**: 仅支持全局级别的IP速率限制：全局API速率限制（单IP每3分钟最多180次非中继请求，通过GLOBAL_API_RATE_LIMIT配置）、全局Web速率限制（单IP每3分钟最多60次，通过GLOBAL_WEB_RATE_LIMIT配置）。可配合Redis实现持久化限流。不支持用户/令牌级别的细粒度速率限制，也不支持Token级或金额级速率限制
**降级与重试**: 

> 支持失败自动重试机制：当某渠道触发rate limit或故障后，系统自动重新随机选择其他渠道，最多重试10-20次，重试期间仅记录warning日志不向用户直接报错。支持渠道可用性定期检测（CHANNEL_TEST_FREQUENCY配置），可基于请求成功率自动禁用渠道（ENABLE_METRIC开启后，成功率阈值METRIC_SUCCESS_RATE_THRESHOLD默认0.8）。渠道故障自动熔断与恢复


- **认证与密钥管理**: 多方式认证：邮箱注册/登录、GitHub OAuth、飞书OAuth、微信公众号授权登录。令牌管理：可设置令牌过期时间、使用额度上限、允许的IP范围白名单、允许访问的模型列表。系统访问令牌（管理API鉴权）。兑换码管理：批量生成和导出，用于账户充值。支持邮箱注册白名单。Cloudflare Turnstile用户验证。默认管理员账号root/123456，首次登录后需立即修改。不支持自动密钥轮转
**请求/响应转换**: 

> 核心能力是将所有模型提供商的原生API统一转换为标准OpenAI API格式（/v1/chat/completions等）。支持两种处理模式：对OpenAI兼容渠道直接透传请求体和响应体；对非OpenAI格式渠道（Claude、Gemini、文心一言等）进行双向格式转换。支持模型映射/重定向：用户可使用任意模型名称，背后映射到实际渠道模型。例如用户请求gpt-4映射到claude-3-opus实现成本节省70%或透明切换。注意开启模型映射后请求体会被重新构造而非透传，可能导致部分厂商私有字段（如OpenAI的response_format、Claude的thinking参数）无法透传


**流式处理**: 

> 核心支持SSE（Server-Sent Events，text/event-stream）流式传输，实现ChatGPT风格打字机效果。适配OpenAI的stream: true参数规范。与讯飞星火等使用WebSocket协议的厂商通信时，One API内部通过WebSocket连接后转换为标准SSE输出给客户端。支持ENFORCE_INCLUDE_USAGE参数强制在流模式返回usage数据。流式token计数：逐chunk累加token，流结束后统一写入计费记录。不直接支持客户端WebSocket连接或Streamable HTTP


**Token 计数与成本追踪**: 

> Token计数基于tiktoken库，启动时需下载分词数据文件（支持TIKTOKEN_CACHE_DIR离线缓存）。计费公式：额度消耗 = 分组倍率 × 模型倍率 × (提示token数 + 补全token数 × 补全倍率)。GPT-3.5补全倍率固定1.33，GPT-4补全倍率固定2（与OpenAI官方一致）。三层成本追踪：用户级别额度（总配额/月配额/日配额）、令牌级别额度、全局消耗统计。支持按用户/渠道/模型维度的调用日志和消耗报表。支持以美元为单位显示额度。非流模式下直接使用OpenAI官方返回的usage数据。支持预扣费机制（v0.5.5起修复了错误时预扣费返还问题）



### 21. OptiLLM

- **模型提供商支持**: 支持 5 类提供商接入：OpenAI、Cerebras、Azure OpenAI、本地推理（HuggingFace）、以及通过 LiteLLM 封装的 100+ 模型（含 Anthropic Claude、Google Gemini、Amazon Bedrock、Vertex AI 等）。LiteLLM 作为默认回退提供最高覆盖度。
- **负载均衡**: 支持（通过 proxy 插件）。提供 round-robin（轮询）、weighted（加权）、failover（故障转移）三种路由策略；后台健康检查（默认 30 秒间隔、5 秒超时），自动排除不健康节点；支持 fallback_only 备用提供商；支持 per-provider 并发限制（max_concurrent）。
- **降级与重试**: 支持（通过 proxy 插件）。自动故障转移机制：请求超时或提供商错误时自动切换至下一个健康提供商；支持 fallback_only 提供商作为最后防线；健康检查自动恢复机制使已恢复的提供商重新加入路由池。
- **认证与密钥管理**: 单一服务器级 API Key 认证（OPTILLM_API_KEY），客户端需在 Authorization: Bearer 头中传递。支持多提供商 API Key 环境变量管理（OPENAI_API_KEY、CEREBRAS_API_KEY、GEMINI_API_KEY 等）。无多租户密钥管理、虚拟密钥或密钥轮转机制。
**可观测性**: 

> 基础日志级别：标准输出（stdout）记录请求详情（HTTP 状态码、耗时、使用的优化策略等）；proxy 插件支持延迟追踪（最近 10 次请求平均延迟）和错误追踪；MCP 插件日志写入文件（~/.optillm/logs/mcp_plugin.log）；支持 DEBUG=mcp:* 环境变量启用 MCP 调试日志。无 Prometheus/Grafana/OpenTelemetry 集成，无结构化指标暴露端点。


- **请求/响应转换**: 支持。通过 LiteLLM 实现 OpenAI Chat Completions 格式与各提供商原生格式之间的双向自动转换（消息格式、工具/函数定义、推理内容、流式数据等均自动适配）。system message 支持检测及自动格式调整（如 Gemini 不支持 system role）。
- **提示词安全**: 无显式 Prompt 注入防护机制。privacy 插件可对请求中的 PII 数据进行匿名化处理，在响应中进行去匿名化还原，间接提供部分数据安全保障。
**插件扩展**: 

> 支持 Python 动态插件系统。插件通过 SLUG 标识和 run 函数定义，服务器启动时自动扫描和加载；支持本地插件覆盖包插件；内置 16 个插件（MCP、router、memory、privacy、web_search、deep_research、executecode、json、readurls、majority_voting、genselect、spl、deepthink、longcepo、coc、proxy）。不支持 Wasm 或 Lua 扩展。


- **流式处理**: 支持 SSE（Server-Sent Events）流式响应。处理 OpenAI 兼容的 stream=True 参数，将优化后的结果以流式方式返回客户端。

### 22. TensorZero

**模型提供商支持**: 

> 支持 20 家 LLM 提供商：OpenAI、Anthropic、AWS Bedrock、AWS SageMaker、Azure、DeepSeek、Fireworks、GCP Vertex AI（Anthropic/Gemini）、Google AI Studio（Gemini API）、Groq、Hyperbolic、Mistral、OpenRouter、SGLang、TGI、Together AI、vLLM、xAI（Grok），以及任意 OpenAI 兼容 API（如 Ollama）。统一提供 Chat Completions、工具调用（Tool Use）、结构化输出（JSON）、批量推理（Batch）、嵌入（Embeddings）、多模态（图像/文件）、缓存透传接口


**负载均衡**: 

> 支持静态路由（Static Routing）与回退链（Fallback Chain）：在 tensorzero.toml 中定义 routing 数组，按顺序尝试提供商，失败时自动切换到下一提供商。支持跨提供商 Fallback（如 OpenAI → Azure → Anthropic）。实验模块支持加权流量分配（静态权重和自适应自适应概率）。注意：TensorZero 官方文档明确承认不支持基于实时延迟、成本或剩余速率限制的动态路由（这是与 LiteLLM 的关键差异）。高可用场景下支持在 variants 间重新采样失败候选项


**速率限制**: 

> 支持精细的三级速率限制体系，资源维度：1）model_inferences（模型调用次数）；2）tokens（Token 消耗量，先按 max_tokens 预估借用，调用完成后按实际值归还差额）；3）cost（成本/美元，先按 default_cost 预估，调用后按提供商实际报价调整）。时间窗口覆盖每秒/分钟/小时/天/周/月。支持优先级规则（高优先级规则覆盖低优先级），多规则同时匹配时全部生效。作用域支持按标签（tag_key=user_id，支持 tensorzero::each 和 tensorzero::total）和 API 密钥（sk-t0-xxx 的公钥部分）隔离。后端可选 Valkey/Redis（高性能，<1ms P99 截止 10k+ QPS）或 Postgres（耐久性回退）。支持令牌桶自定义容量和补充速率，速率限制键享有 48 小时最小 TTL 防驱逐保护


**缓存能力**: 

> 支持推理结果缓存（Inference Caching），基于精确匹配（非语义缓存）。缓存后端默认使用 ClickHouse（若无 Valkey），推荐使用 Valkey/Redis 获得最佳性能。默认 TTL 为 24 小时（86,400 秒），可通过 gateway.cache.valkey.ttl_s 配置。支持独立缓存实例（TENSORZERO_VALKEY_CACHE_URL）与速率限制实例分离。缓存是性能优化层（非正确性保证），驱逐仅导致缓存未命中而重新请求提供商。不支持和 LiteLLM/Portkey 类似的基于向量嵌入的语义缓存（Semantic Cache）


**降级与重试**: 

> 支持多级 Fallback 故障转移：在 routing 数组中按顺序尝试提供商，失败时自动回退到下一提供商。实验层面：当选中的 variant 调用失败时，首先从剩余候选 variants 中重新采样，候选耗尽后按 fallback_variants 列表顺序尝试。支持细粒度超时配置：non_streaming.total_ms、streaming.ttft_ms（首 Token 超时）、streaming.total_ms，以及全局 global_outbound_http_timeout_ms 上限。支持可配置的自动重试逻辑。注意：Fallback 导致的变体切换会从自适应 A/B 测试计算中排除以保持统计完整性


**认证与密钥管理**: 

> 多层次认证体系：1）API 密钥认证（格式 sk-t0-xxxxxxxxxxxx-yyy...，12 位公钥 ID 用于速率限制作用域标识）；2）可通过 UI（localhost:4000/api-keys）或 CLI（--create-api-key）管理密钥创建/禁用，支持可选过期时间；3）动态凭证（dynamic::arg_name）：在每个推理请求中传递不同的提供商 API 密钥，支持多租户密钥隔离；4）凭证回退（credential fallbacks）：配置 default 和 fallback 多级凭证选择；5）环境变量凭证（env::MY_VAR）：静态全局密钥；6）Gateway Relay 中继架构：边缘网关使用 TensorZero API 密钥对中继网关认证，中继网关集中持有所有提供商密钥，实现组织级统一认证控制。支持通过命名空间（Namespace）限制模型/凭证仅服务于特定租户


**可观测性**: 

> 全面的三支柱可观测性：1）分布式追踪（Tracing）：支持 OTLP 协议通过 gRPC 导出到任何兼容 OpenTelemetry 的后端（Jaeger/Datadog/Grafana 等）；创建层级化 Span 覆盖 HTTP 请求 → 函数调度 → 变体执行 → 模型推理 → 提供商通信；支持 W3C Trace Context（traceparent header）分布式传播；支持 OpenInference 语义约定和 OpenTelemetry GenAI 语义约定；可自定义请求级 Headers、Span 属性和资源属性。2）指标（Metrics）：暴露 /metrics 端点供 Prometheus 抓取；指标类型包括按端点/状态码的请求计数、持续时间直方图、进行中请求仪表盘、按函数名的推理计数与延迟分布、缓存命中/未命中率、Token 使用量（tensorzero_input_tokens_total / tensorzero_output_tokens_total）、错误类型计数、活跃连接数和数据库连接池状态、TensorZero 自身处理延迟（tensorzero_inference_latency_overhead_seconds 直方图）。3）日志与持久化（Logging）：使用 Rust tracing 框架的结构化日志；推理和反馈数据持久化到 ClickHouse（推荐 >100 RPS）或 Postgres；支持同步、异步（默认）和批量（按 flush_interval_ms 和 max_rows 阈值）三种写入策略；调试模式下可记录与提供商的原始请求/响应载荷；每次推理/反馈记录附带确定性 config snapshot hash 实现完整配置溯源。存储推理和反馈数据的数据库为用户自有基础设施，不经过第三方


**请求/响应转换**: 

> 通过 Provider Abstraction Layer（提供商抽象层）实现统一格式与各提供商 API 之间的转换：1）出站请求标准化：将 TensorZero 统一的 RequestMessage 格式转换为各提供商的具体 API 请求格式（Message 翻译、Tool 翻译、推理参数映射，不支持的参数触发警告）；2）入站响应标准化：将所有提供商的响应统一为 ProviderInferenceResponse 结构，支持 Text/ToolCall/Thought/Unknown 四种内容块类型；3）用量标准化：DeepSeek（prompt_cache_hit/miss_tokens）、xAI（合并 reasoning tokens 到 output）、Mistral 等提供商的特定 Token 计数格式统一为标准 Usage 结构；4）流式标准化：各提供商的 SSE 事件通过 infer_stream() 方法转换为统一的 TextChunk/ToolCallChunk/ThoughtChunk/UnknownChunk 流。注意：TensorZero 的转换是归一化（normalization），侧重于将各提供商统一到内部格式；与 LiteLLM/Portkey 的 OpenAI ↔ Anthropic ↔ Gemini 全格式互转不同


**流式处理**: 

> 全面支持 SSE（Server-Sent Events）流式推理：客户端设置 stream: true 后，网关以增量方式逐块返回模型输出，以 [DONE] 消息结束。统一的流式内容块类型包括：TextChunk（增量文本输出）、ToolCallChunk（增量工具/函数调用，含 name/arguments/id）、ThoughtChunk（推理/思考输出，如 DeepSeek/o1 的思维链）、UnknownChunk（保留提供商特定数据用于调试）。最终块包含 usage 统计和 finish_reason。支持 JSON 函数流式调用（各块含部分 JSON，需拼接后解析）。每个提供商通过 impl InferenceProvider trait 的 infer_stream() 方法实现 SSE 事件处理。不支持 WebSocket / WebRTC / Streamable HTTP 等其他流式协议


**Token 计数与成本追踪**: 

> 完整的 Token 和成本追踪体系：1）每请求 input_tokens 和 output_tokens 自动提取；2）tensorzero.toml 中按模型配置每百万 Token 价格（支持 JSON Pointer 提取提供商响应中的价格字段）；3）支持负成本（如 Anthropic 缓存 Token 折扣）和批量/嵌入模型的独立价格配置；4）推理响应自动包含 tensorzero_cost 字段（或 SDK 中的 cost 字段）；5）UI 仪表盘可按单次推理和按模型提供商的聚合统计数据浏览成本；6）速率限制支持 cost 维度（cost_per_hour/day/month）进行预算控制；7）预借用（pre-borrowing）机制：先按 max_tokens × default_cost 预估借用成本额度，调用完成后按提供商实际报价调整。所有成本和用量数据存储于用户自有的 ClickHouse/Postgres 数据库



### 23. aisuite

**模型提供商支持**: 

> 支持 15 家以上 LLM 提供商（OpenAI、Anthropic、Google Vertex AI、AWS Bedrock、Azure OpenAI、Mistral、Groq、Hugging Face、Ollama、Cohere、Cerebras、DeepSeek、Fireworks、Together AI、IBM Watsonx、OpenRouter 等），外加 3 家 ASR 提供商（OpenAI Whisper、Deepgram、Google Speech）。采用 provider:model 命名约定统一路由，统一以 OpenAI 风格 Chat Completions 接口暴露。支持核心参数透传（temperature、max_tokens、tools 等）


- **负载均衡**: 不支持。aisuite 是轻量级客户端包装库，不具备负载均衡能力。如需跨提供商或多实例负载均衡，需在应用层自行实现或结合 LiteLLM 等代理方案
- **速率限制**: 不支持。无内建的请求速率限制或 Token 速率限制能力。依赖各提供商的 API 限流策略和用户自行在应用层实现
- **缓存能力**: 不支持。无响应缓存、语义缓存或提供商 Prompt Caching 透传机制。不集成 Redis/Memcached/Qdrant 等缓存后端
- **降级与重试**: 不支持。无内建的故障转移（fallback）链或自动重试机制。降级逻辑需由调用方在应用层自行实现。各提供商底层 SDK 可能有自己的重试逻辑，但 aisuite 本身不提供跨提供商的 fallback
- **认证与密钥管理**: 通过环境变量管理各提供商的 API Key（如 OPENAI_API_KEY、ANTHROPIC_API_KEY 等）。不支持多租户、虚拟密钥、密钥轮转或 SSO 集成。所有认证密钥由开发者自行配置和管理
- **可观测性**: Agent 场景下提供基本的 Artifacts & tracing（捕获 Agent 产出和每一步执行过程），支持 State Stores（内存/文件/Postgres）持久化运行状态。不支持 OpenTelemetry 集成、Prometheus/Grafana 指标暴露、或与 Langfuse/LangSmith 等第三方可观测性平台的原生集成
- **请求/响应转换**: 支持各提供商消息格式到 OpenAI 统一格式的转换与归一化（Message Normalization）。通过 Converter 层将各提供商的请求/响应格式翻译为 OpenAI 兼容结构。不提供跨模型格式互转（如 OpenAI ↔ Claude ↔ Gemini 双向语义格式转换）
- **提示词安全**: 不支持。无 Prompt 注入防护、内容审核、输出过滤或任何 Guardrail 集成。工具调用场景下提供 Tool Policies（RequireApprovalPolicy、allow/deny 列表）进行工具执行控制，但这是工具安全而非提示词安全
- **插件扩展**: 支持基于命名约定的提供商适配器扩展（<provider>_provider.py 文件 → <Provider>Provider 类），可添加自定义 LLM 提供商。不提供自定义插件 SDK、Wasm 扩展或 Lua 脚本机制
- **Token 计数与成本追踪**: 不支持。无 Token 使用量统计、成本归属、多模型价格换算或预算管理能力。Token 和成本信息仅在各提供商的原始响应中可见，aisuite 不进行提取、聚合或追踪

### 24. New API

**模型提供商支持**: 

> 支持 30-40+ 家 AI 服务提供商、100+ 模型，涵盖：国际主流（OpenAI 全系列、Anthropic Claude、Google Gemini、DeepSeek、Azure OpenAI、AWS Bedrock、Mistral AI、Groq、Together AI、Fireworks、Cohere）及国内厂商（阿里通义千问 Qwen、智谱 GLM、百度文心一言、字节豆包、腾讯混元、讯飞星火、硅基流动）。同时支持图像生成（DALL·E、Midjourney Proxy、Stable Diffusion）、音频（Whisper TTS、Suno API）、向量嵌入与重排序（Cohere/Jina Rerank）、Dify ChatFlow 及完全自定义渠道。统一封装为 OpenAI 兼容格式调用


- **负载均衡**: 优先级 + 权重随机选择机制：渠道按 Priority 分层，同优先级内按 Weight 加权随机选择；支持平滑因子使零权重渠道仍有选中概率；同一渠道支持多 API Key 轮询分发；核心函数为 CacheGetRandomSatisfiedChannel
- **速率限制**: 多层速率限制体系，支持三种算法：令牌桶（Redis + Lua 脚本原子操作）、漏桶（中间件层）、滑动窗口（内存/Redis 双实现）。限制层级包括全局 API 限流、全局 Web 限流、关键操作限流、按模型/用户组级别区分总尝试次数与成功次数的限流、搜索/上传/下载操作限流
**缓存能力**: 

> 双层缓存架构：Redis 缓存（用户配额、Token 信息、系统配置、限流计数器，采用 Cache-Aside 模式，未命中自动回退数据库）+ 内存缓存（渠道配置与能力映射表，启动时加载并定期同步刷新）。Redis 不可用时自动降级到数据库查询并异步更新缓存。支持缓存命中计费折扣（OpenAI/Azure/DeepSeek/Claude/Qwen 等模型可按设定比例折扣计费）。不支持语义缓存和 Memcached


- **降级与重试**: 完整降级与重试机制：请求失败自动重试（最多 RetryTimes 次），优先级回退重试（从高到低依次尝试渠道优先级），渠道自动禁用（AutoBan，持续失败后自动禁用），Redis 不可用时自动回退数据库，节点类型支持 slave 模式（仅处理请求转发、禁用数据库迁移和后台任务），失败时自动回滚已预扣配额
- **认证与密钥管理**: 多租户 API Key 管理体系：令牌分组管理 + 模型白名单/黑名单 + IP 白名单 + 配额上限/有效期控制 + 用户组级别隔离。支持多种认证登录方式：Discord 授权登录、LinuxDO 授权登录、Telegram 授权登录、OIDC 统一认证（OpenID Connect）。每个 Token 独立配置权限和额度；支持 neko-api-key-tool 工具查询密钥额度
**请求/响应转换**: 

> 完整的跨厂商格式互转矩阵：OpenAI Compatible ↔ Claude Messages 双向完整转换（含思考模式 thinking 的 thinking-to-content 处理）、OpenAI Compatible → Google Gemini 格式、Google Gemini → OpenAI Compatible（文本双向，函数调用仅支持单向 OpenAI→Gemini）、OpenAI Compatible ↔ OpenAI Responses 格式互转（开发中）。特殊功能：推理力度分级（模型名称后缀 -high/-medium/-low/-thinking 动态调整算力，支持 OpenAI/Coulde/Gemini 三系）、思考转内容（thinking-to-content）、System Prompt 注入覆写


**流式处理**: 

> SSE（Server-Sent Events）处理 Chat Completions 流式、Embeddings、Image 生成，使用 StreamScannerHandler 处理流数据输入，可扩展缓冲（StreamScannerMaxBufferMB），超时控制默认 300s，支持可选的 Keep-Alive SSE 注释。WebSocket 处理 OpenAI Realtime API（含 Azure 渠道）双向音频/文本低延迟交互，自动转换 https→wss，支持会话前后配额扣减。不支持 gRPC 和 Streamable HTTP 协议


**Token 计数与成本追踪**: 

> 输入/输出 Token 区分计数（PromptTokens/CompletionTokens），预消费 + 后消费双机制（预估 Token 预扣减 → 实际 Token 结算 → 差额自动调整）。三级倍率计费体系：模型倍率 × 补全倍率（输出 Token 额外乘数） × 分组倍率（用户组差异化倍率）。配额点数制（1 USD = 500,000 配额点）。支持分段计费（Token Tier Pricing，按 Token 数量范围设置不同倍率）。完整日志记录（每次请求的 Token 消耗、配额点数、耗时、请求 ID）



## 部署与架构

### 1. Kong AI Gateway

**部署方式**: 

> 以插件嵌入模式为主，作为 Kong Gateway 的原生插件集随网关一同部署。支持多种部署形态：独立服务（Traditional 模式，VM/裸金属/Docker 上的反向代理）；Kubernetes Ingress Controller（KIC + Gateway Discovery 模式，控制面和数据面分离部署；Sidecar 模式已弃用但支持）；Kong Konnect 全托管混合模式（控制面在云上，数据面在用户环境）；DB-less 声明式模式（无数据库，通过 YAML/JSON 配置）。所有部署模式均支持完整 AI 功能。快速启动命令：curl -Ls https://get.konghq.com/ai | bash（Docker 或 Konnect）。


**协议支持**: 

> 支持多种协议：REST（HTTP/1.1，核心协议）；SSE（Server-Sent Events，流式响应）；WebSocket（ws/wss，代理和升级）；gRPC（gRPCs，非流式 AI 流量）；MCP（Model Context Protocol，v3.14+，MCP Traffic Gateway）；A2A（Google Agent-to-Agent 协议，v3.14+，AI A2A Proxy 插件）；chunked transfer encoding（HTTP 流式传输）。注意：流式处理不支持 HTTP/2，需在 proxy_listen 配置中禁用。


**传统网关集成**: 

> 仅集成 Kong API Gateway 本身（原生插件）。Kong AI Gateway 就是 Kong Gateway 的 AI 插件扩展集，并非独立于 Kong 的产品。已部署 Kong Gateway 的用户升级到 3.6+ 版本即可获得 AI 能力。Kong Gateway 本身基于 OpenResty/NGINX 构建，因此底层兼容 NGINX 生态，但 AI 插件仅运行于 Kong 网关之上。不直接支持以插件形式嵌入 APISIX、Envoy、Traefik 等其他网关产品。


- **语言运行时**: Lua（运行于 OpenResty/NGINX 之上），利用 NGINX 的事件驱动架构实现高并发低延迟。AI 插件全部用 Lua 编写，基于 MetaPlugin 架构（kong/llm/plugin/base.lua）和 PDK（Plugin Development Kit）。LuaJIT 提供接近 C 的性能。对于扩展插件，也支持通过外部插件服务器使用 Go 或 JavaScript。
**扩展机制**: 

> Lua 插件开发（基于 PDK 稳定 API）+ 外部插件服务器（Go/JavaScript）+ Kong Vaults（密钥管理扩展）。插件通过 KongPlugin CRD（Kubernetes）或 Admin API（Traditional 模式）进行声明式配置。支持完整的自定义插件开发流程：handler.lua（核心逻辑）+ schema.lua（配置校验），通过 LuaRocks 或本地路径安装。decK 工具支持声明式配置管理和 GitOps 工作流。注意：Kong 当前暂无 Wasm 插件支持，自定义插件在 Konnect 托管环境存在安全策略限制。



### 2. Apache APISIX AI Gateway

**部署方式**: 

> 独立服务（standalone gateway），平台无关架构，支持裸金属服务器、虚拟机、Kubernetes（Helm Charts）等多种环境。采用无状态网关节点 + etcd 集中配置的架构，网关节点本身无状态（配置由 etcd 毫秒级推送）。支持 Control Plane/Data Plane 分离部署（API7 Enterprise）。也可作为 Sidecar 模式部署。支持国产化环境：华为鲲鹏 ARM64、麒麟 OS、openEuler


- **协议支持**: REST/HTTP、HTTP/3（QUIC）、gRPC、WebSocket、TCP/UDP、MQTT、Dubbo、SSE/Streamable HTTP、MCP（Model Context Protocol，通过 mcp-bridge 插件）。AI 侧支持 OpenAI 协议、Anthropic Messages API、AWS Bedrock Converse API 等 LLM 原生协议
- **传统网关集成**: APISIX 本身就是成熟的传统 API 网关，AI 插件是其原生插件体系的一部分，在同一 APISIX 实例上统一管理传统 API 流量和 AI/LLM 流量，无需额外部署独立的 AI 网关。AI 插件与已有 100+ 传统插件（认证、限流、可观测性、安全等）无缝协作，即插即用
- **语言运行时**: 核心引擎：LuaJIT on OpenResty/Nginx（C + Lua 组合）。插件扩展支持：Lua（原生）、Wasm（Go/Rust/C via Wasmtime/WasmEdge VM）、外部插件 Runner（Java/Go/Python/Node.js via RPC）
- **扩展机制**: 插件热加载（etcd 毫秒级配置推送，无需重启）。Lua 原生插件（最高性能，直接运行在 Nginx 生命周期中）。Proxy-Wasm SDK 插件（沙箱安全隔离，支持 Go/Rust/C）。外部插件 Runner（进程隔离，支持 Java/Go/Python/Node.js 通过 Flatbuffers RPC）。自定义上游负载均衡算法。自定义 SSL 证书管理和密钥存储集成

### 3. Portkey

**部署方式**: 

> 支持多种部署模式：（1）Portkey Cloud 托管 SaaS；（2）Docker 独立部署（docker pull portkeyai/gateway）；（3）Kubernetes Helm Chart 部署（Portkey-AI/helm）；（4）Cloudflare Workers 边缘部署；（5）Node.js 原生运行（npx @portkey-ai/gateway）；（6）AWS ECS Fargate / Marketplace；（7）GCP / Azure 混合部署；（8）完全气隙（Air-Gapped）私有部署。企业版支持 SaaS、混合部署（Hybrid）和完全气隙三种模式


- **协议支持**: REST/HTTP（通用可用性，OpenAI 兼容 API）；gRPC（Beta，企业自托管版，支持 gRPC→HTTP 代理模式和原生 gRPC 直连 Google Gemini）；WebSocket（通用可用性，OpenAI Realtime Voice API）；MCP（Model Context Protocol，2026年1月 GA）；SSE 流式传输
- **传统网关集成**: 可与 Kong、Apache APISIX、Envoy、Nginx 等传统网关互补部署。典型架构：Nginx/Envoy 边缘 TLS 终结 → Kong/APISIX 通用 API 管理 → Portkey 作为 LLM 专用层处理 AI 流量（路由、护栏、成本追踪）。Kong/APISIX 可将 /ai/* 路径路由至 Portkey
- **语言运行时**: TypeScript / Node.js，核心网关基于 Hono 框架构建，极轻量约 122KB 体积
- **扩展机制**: 自定义钩子（Hooks）中间件系统，可在请求前/后插入自定义处理逻辑；外部护栏集成接口（External Guardrails）；自定义插件开发支持；虚拟密钥策略引擎可扩展；Webhook 验证器集成

### 4. Bifrost

**部署方式**: 

> 支持多种部署模式：1）独立服务：Docker 容器（docker run maximhq/bifrost）、NPX 一行启动（npx -y @maximhq/bifrost）、裸机二进制部署；2）Kubernetes + Helm：集群部署支持多副本高可用，通过 Gossip 协议（SWIM）同步状态，支持 K8s API/DNS/Consul/etcd/mDNS 节点发现；3）Go SDK 嵌入：import github.com/maximhq/bifrost/core 将网关嵌入 Go 应用（类 Sidecar 模式）；4）Pod Sidecar：在同一 K8s Pod 中作为 sidecar 容器与应用共存（共享网络命名空间）。数据库支持 SQLite（单节点）和 PostgreSQL（集群模式）。


- **传统网关集成**: 可作为独立 AI 网关部署在 Nginx 等传统反向代理之后（官方提供 Nginx 反向代理配置指南，含 SSE/WebSocket 安全配置），但无针对 Kong/APISIX/Envoy/Traefik 的专用插件。Bifrost 定位为独立 AI 网关层，非传统 7 层网关的插件。
- **语言运行时**: Go（核心网关引擎，利用 goroutine 实现高并发和低延迟，无 GIL 限制，垃圾回收优化低延迟场景），React + Vite + TypeScript（Web UI），提供 Go SDK 用于嵌入集成
**扩展机制**: 

> Go 原生插件系统（.so 动态库）：通过 PreLLMHook/PostLLMHook/HTTPTransportPreHook/PostHook/StreamChunkHook/PreMCPHook/PostMCPHook 多个钩子点插入自定义逻辑。支持插件注册顺序控制（pre_builtin/builtin/post_builtin 三组排序）。WASM 插件已弃用。未来计划 Webhook 扩展。所有配置（提供商、密钥、路由规则、Guardrails、缓存）支持热加载（Hot Reload）。



### 5. kgateway

**部署方式**: 

> 1) Kubernetes Gateway API 模式（作为 GatewayClass 实现，是主要部署方式）；2) Helm Chart 部署（控制平面 + Envoy 数据面，OCI 仓库分发）；3) Istio Ambient Mesh waypoint 代理模式（作为 waypoint 代理提供 L7 特性，包括请求转换、重试、AI 流量控制）；4) 独立服务模式（agentgateway 作为独立 AI 数据面运行）。非 Kubernetes 环境受限（需 Kubernetes API Server）


**协议支持**: 

> HTTP/1.x、HTTP/2、gRPC（通过 Envoy 代理层原生支持）；WebSocket（通过 Envoy 代理支持）；MCP（Model Context Protocol，通过 agentgateway 数据面原生支持，含 stdio/SSE/HTTP/Streamable HTTP 四种传输）；A2A（Agent-to-Agent Protocol，通过 agentgateway 原生支持）


**传统网关集成**: 

> 本身就是完整的 Envoy-based API 网关，实现了 Kubernetes Gateway API 标准。可与 Istio Ambient Mesh 深度集成（作为 waypoint 代理替代 Envoy sidecar）。可与 Envoy Gateway 生态工具链集成。不可直接作为 Kong/APISIX/Nginx/Traefik 插件嵌入，但可作为前置代理（Front Proxy）或旁路部署。统一控制面同时管理 Envoy（传统 API 流量）和 agentgateway（AI/Agent 流量）


- **语言运行时**: 控制平面：Go（基于 krt 声明式控制器框架，替换了早期的快照模型，提升可扩展性和模块化）。Envoy 数据面：C++（CNCF 毕业项目，极低延迟）。agentgateway 数据面：Rust（基于 Tokio 异步运行时、Hyper HTTP 库，借鉴 Istio Ambient ztunnel 设计经验，无 GC 暂停、内存安全）
**扩展机制**: 

> 1) Envoy WASM 插件（Proxy-Wasm 规范，支持 Rust/Go/C++ 多语言开发，沙箱隔离，动态加载）；2) ext_authz 外部授权 gRPC 服务（GatewayExtension CRD 配置）；3) ext_proc 外部处理 gRPC 服务（请求/响应 Body 级深度处理）；4) Envoy 内嵌 Lua 脚本过滤器（轻量级请求/响应修改）；5) 自定义 CRD 策略框架（TrafficPolicy、RateLimitPolicy、GatewayExtension、HTTPListenerPolicy、Backend 等声明式 API）；6) agentgateway 的 CEL 策略引擎（20+ 自定义函数，条件分支策略，xDS 动态热加载）



### 6. agentgateway

**部署方式**: 

> 支持四种部署模式：1) Kubernetes Gateway API 模式（作为完整网关数据面，支持 InferencePool 和 Gateway API 资源）；2) Standalone 独立服务模式（Helm chart 部署，单租户/任务级场景）；3) Sidecar 模式（作为工作负载旁路代理，通过 localhost 通信）；4) Ambient Mesh 入口网关模式（实现 HBONE 连接、mTLS，当前为 Alpha 特性，需企业版许可）


- **协议支持**: HTTP/1.x、HTTP/2、gRPC、MCP（Model Context Protocol）、A2A（Agent-to-Agent Protocol）；计划支持 ACP（Agent Client Protocol）；支持 JSON-RPC over SSE/Streamable HTTP/stdio 等多种 MCP 传输
- **传统网关集成**: 通过 kgateway（CNCF 项目）统一控制面与 Envoy 数据面共存：同一控制面同时管理 Envoy（传统 API 流量）和 agentgateway（AI/Agent 流量）；被 Istio 采纳为 AI 网关数据面备选方案；在 Ambient Mesh 中可作为 waypoint 代理替代 Envoy；不可直接作为 Kong/APISIX/Nginx 插件嵌入，但可前置或旁路部署
- **语言运行时**: Rust（基于 Tokio 异步运行时、Hyper HTTP 库、Tonic gRPC 框架、cel-rust 表达式引擎），无 GC 暂停，内存安全，借鉴 Istio Ambient ztunnel 设计经验
- **扩展机制**: 1) CEL 策略引擎（含 20+ 自定义函数，支持条件分支策略）；2) extAuthz/extProc 外部 gRPC 服务集成（支持条件触发）；3) xDS 控制面协议（零停机动态热加载路由/策略/后端配置）；4) OpenAPI-to-MCP Code Mode（JavaScript 沙箱内 API 编排）；5) 请求/响应变换（基于 CEL 模板语法的 Header/Body 修改）

### 7. Lunar MCPX（Lunar MCP Gateway）

- **部署方式**: 独立服务部署模式。开源版通过Docker容器化部署，可在本地或Kubernetes上运行，支持滚动升级、自愈、零宕机部署。CI/CD友好的环境提升流水线（同一容器和配置在开发/预发/生产环境间流转）。企业版采用集中控制平面+多网关集群架构（每个身份独立隔离的网关实例），支持VPC/本地部署/air-gapped环境（AWS/GCP/Azure），提供Eco Mode休眠空闲实例。
- **协议支持**: 客户端→MCPX：Streamable HTTP（推荐）和SSE（已弃用但兼容）；后端MCPX→MCP服务器：stdio子进程通信（标准MCP协议传输）。不原生支持REST/gRPC/WebSocket协议。通过Lunar Proxy间接管理REST API流量。
- **传统网关集成**: 不直接集成Kong/APISIX/Envoy/Nginx/Traefik等传统7层API网关。MCPX与Lunar AI Gateway（Lunar Proxy）紧耦合集成，形成'AI Gateway + MCP Gateway'双层架构。与传统API网关是互补关系而非替代关系：团队可能同时使用传统API网关管理REST/gRPC流量，使用Lunar MCPX管理MCP工具调用流量。
- **语言运行时**: TypeScript（60.9%，主控平面/Web层）+ Go（29.7%，性能关键网络操作）+ Python（3.4%，辅助工具）。多语言混合仓库，Node.js运行时为主。
- **扩展机制**: 配置驱动扩展，无传统插件/中间件/自定义代码扩展API。通过app.yaml声明式配置：toolExtensions（工具自定义）、toolGroups（工具组）、permissions（ACL访问控制）、consumers（消费者分组）、auth（认证开关）。通过mcp.json声明式配置MCP服务器连接。客户端零代码集成——修改JSON配置即可接入新MCP服务器。

### 8. Gravitee Agent Mesh（现称 Gravitee AI Agent Management）

**部署方式**: 

> 支持独立服务（自托管，VM/裸金属/Docker 部署）、Kubernetes 部署（Helm Charts）、全托管混合模式（Gravitee Cloud 控制面 + 用户环境数据面）、Azure Marketplace 一键部署。Gravitee APIM 包含三个核心组件：Gateway（数据面，处理 API/AI 流量）、Management API（控制面，提供配置和管理接口）、Developer Portal（开发者门户）。AI Agent Management（Agent Mesh）作为 Enterprise Edition 的附加包在自托管和企业托管环境中均可部署，无 sidecar 依赖。


**协议支持**: 

> 支持 REST（HTTP/1.1，核心协议）、gRPC、WebSocket（ws/wss）、SSE（Server-Sent Events 流式处理）、Kafka、MQTT、Solace、RabbitMQ（消息/事件协议，企业版）、Webhook（企业版）、GraphQL、MCP（Model Context Protocol，JSON-RPC 2.0 over Streamable HTTP）、A2A（Google Agent-to-Agent 协议，HTTP + SSE + Push Notifications）。多协议统一入口，无需部署多个网关实例。


**传统网关集成**: 

> Gravitee 本身就是功能完整的 API 管理平台（传统 API 网关 + AI 网关统一平台）。Agent Mesh（AI 功能）作为 APIM 平台原生的功能模块，非插件形式嵌入第三方网关。已部署 Gravitee APIM 的用户升级到 4.8+ 版本即可获得 AI 治理能力。不直接支持以插件形式嵌入 Kong、APISIX、Envoy、Nginx、Traefik 等其他网关产品。但可通过常规网关路由将流量从其他网关转发到 Gravitee Gateway 实现集成。


**语言运行时**: 

> Java（运行于 Vert.x 响应式框架之上）。利用 Vert.x 的非阻塞、事件驱动架构实现高并发低延迟。AI Agent Management 所有策略和代理功能均以 Java 编写（基于 RxJava 3 响应式编程模型）。MCP 工具转换和 APIM MCP Server 组件亦为 Java 生态。部分 AI 资源（如 PII 脱敏的 ONNX 模型推理）依赖 ONNX Runtime（需要 Debian 系统，不支持 Alpine）。


**扩展机制**: 

> Java 策略插件（基于 Maven Archetype + RxJava 3 + plugin.properties 清单文件）+ 消息/事件插件（用于 Kafka/MQTT 等消息协议的策略扩展）+ API 资源扩展（OAuth 2.0 Provider 集成）。自定义策略通过 ZIP 分发包部署到 Gateway 的 plugins/ 目录，重启后生效。策略支持在线配置和 Expression Language 条件动态评估。Expression Language 基于 Spring SpEL（Spring Expression Language）实现网关内条件逻辑。不支持 WASM 或 Lua 原生脚本扩展，需自行嵌入运行时。



### 9. Gate22

**部署方式**: 

> （1）Docker Compose 本地部署 — 后端包含 control-plane、mcp、virtual-mcp、PostgreSQL（pgvector）、LocalStack（AWS 模拟）等服务，支持 OpenTelemetry profile；（2）前端支持 Vercel 或任意支持 Next.js 15 的 Node.js 托管平台部署；（3）云端托管版 — gate22.aci.dev；（4）支持本地化部署（on-premises），适用于数据驻留需求


- **协议支持**: REST API（FastAPI，路由前缀 /v1/）+ MCP（Model Context Protocol，原生支持）+ Python SDK（直接函数调用）。前端通过 REST API 与后端通信，Agent 通过 MCP 协议或 Python SDK 调用工具
- **语言运行时**: 前端：TypeScript（Next.js 15 App Router）；后端：Python 3.12+（FastAPI）。包管理：前端使用 pnpm，后端使用 uv。代码质量：Ruff（格式化/检查）、mypy（类型检查）、pre-commit hooks
**扩展机制**: 

> （1）ACI.dev 平台 600+ 预构建集成，按 App → Function 模型组织；（2）支持管理员接入任意远程 MCP 服务器（Bring Your Own MCPs）；（3）Python SDK 供开发者构建自定义工具集成；（4）每个集成可配置 OAuth2 / API Key / 无认证三种安全方案；（5）函数级 allow-list 权限控制作为核心扩展治理机制；（6）未提及 Wasm/Lua 脚本等自定义插件运行时



### 10. WSO2 AI Gateway（WSO2 AI 网关）

**部署方式**: 

> 支持多种部署模式：（1）独立服务：AI Gateway 作为独立组件运行；（2）插件嵌入：内嵌于 WSO2 API Manager（v4.4+ 控制面）；（3）Docker/Docker Compose：快速启动；（4）Kubernetes：通过 Helm Charts 部署（Gateway Helm Chart v1.1.3），支持 Gateway Operator 自动化管理；（5）SaaS：Bijira 云控制台（console.bijira.dev）；（6）本地/混合部署：数据面可完全本地化运行


- **协议支持**: REST、gRPC、GraphQL、WebSocket、SSE（Server-Sent Events）、MCP/JSON-RPC（Model Context Protocol）、Webhooks/WebSub、Kafka；AsyncAPI 规范支持
- **传统网关集成**: 原生集成 WSO2 Universal Gateway（内嵌于 WSO2 API Manager）；WSO2 Kubernetes Gateway 基于 Envoy Proxy 作为数据面；支持网关联邦（Gateway Federation），可统一管理以下第三方网关：Kong、AWS API Gateway、Azure API Management、Envoy Gateway
- **语言运行时**: Go（AI Gateway 数据面 + WSO2 APK 网关）+ Java（WSO2 API Manager 控制面，要求 JDK 21）；基于 Envoy Proxy（数据面热重载，无连接中断更新配置）

### 11. Plano（原名 Arch Gateway / archgw）

**部署方式**: 

> 支持三种部署模式：Native 独立服务（Linux x86_64/aarch64、macOS Apple Silicon）、Docker 容器化（使用 katanemo/plano 镜像）、Kubernetes（单容器 Deployment，内含 Envoy + WASM 插件 + brightstaff，由 supervisord 管理）。作为 out-of-process dataplane 运行，可作为 Sidecar 部署（项目定位明确为 AI-native sidecar）。


- **传统网关集成**: 直接构建于 Envoy Proxy 之上，共享 Envoy 的连接管理、HTTP 处理等基础能力。通过 proxy-wasm 机制嵌入 Envoy，无需修改 Envoy 构建。作为独立进程运行，不与 Kong/APISIX/Nginx/Traefik 等传统网关直接集成，但理论上可与这些网关组合部署（Plano 专注于 AI 流量处理，传统网关处理通用 HTTP 流量）。
- **语言运行时**: Rust（核心代理、WASM 插件、CLI 工具），编译目标 wasm32-wasip1。Wasm 运行时使用 Envoy 内置的 V8 引擎。Agent 可使用任意语言编写（Python、TypeScript、Go 等），只需实现 OpenAI 兼容的 Chat Completions 端点。Filter 可使用任意支持 HTTP/MCP 的语言实现。
**扩展机制**: 

> 双层次扩展：1) Filter Chains：通过 HTTP/MCP 服务实现自定义逻辑，用任意语言编写，可插拔挂载到 Agent 或 Listener 级别；2) Wasm 插件：基于 proxy-wasm 规范，用 Rust 编写并编译为 .wasm，作为 Envoy HTTP Filter 运行在核心数据路径中。Filter 支持四种操作语义：Inspect、Mutate、Short-circuit、Emit。



### 12. Docker MCP Gateway

**部署方式**: 

> 支持四种部署模式：1) 独立服务模式（Standalone，单二进制运行或 Docker 容器运行，挂载 Docker Socket 管理 MCP Server 容器）；2) Docker Desktop 集成模式（Docker Desktop 4.59+ 后台自动运行，通过 MCP Toolkit GUI 管理）；3) Docker Compose 编排模式（将 Gateway 与 MCP Server 容器定义在 Compose 文件中一键部署）；4) Docker-in-Docker (DinD) 模式（Gateway 在容器内通过环境变量 DOCKER_MCP_IN_CONTAINER=1 运行，管理子容器）


- **协议支持**: MCP（Model Context Protocol，基于 JSON-RPC 2.0）；支持 stdio、SSE、Streamable HTTP 三种 MCP 传输方式；不支持 REST/gRPC/WebSocket 协议直接使用
- **语言运行时**: Go 语言开发，编译为单二进制文件，运行时依赖 Docker Engine API 管理 MCP Server 容器，内存占用低，启动快速，适合容器化部署
- **扩展机制**: Interceptor 拦截器中间件（Exec 脚本/Docker 容器/HTTP 服务三种模式）；Policy System 策略系统（目录/服务器/工具/提示词四级访问控制，基于 Allow/Block/Warn 三级决策）；无传统插件系统（非 Wasm/Lua/动态加载 .so 文件）

### 13. Envoy AI Gateway

**部署方式**: 

> 主要部署模式：Kubernetes Gateway（Ingress 模式，通过 Envoy Gateway GatewayClass + AIGatewayRoute CRD 管理）；Sidecar 模式（ExtProc 通过 MutatingWebhook 注入 Envoy Pod）；独立模式（aigw run CLI，本地开发/测试，无需 K8s）；Standalone Sidecar 模式（EPP + Envoy 代理，用于批量推理场景）。支持多层级部署：中心化 Tier-1 网关 + 内部 Tier-2 网关的两层架构


- **语言运行时**: 控制面（Controller + ExtProc 外置处理器）：Go 语言，编译为静态二进制；数据面（Envoy Proxy）：C++；CLI 工具（aigw）：Go 语言；性能关键路径在 C++ 数据面处理，AI 业务逻辑在 Go ExtProc 中处理
**扩展机制**: 

> 基于 Envoy 生态的多层扩展机制：Wasm 插件（EnvoyExtensionPolicy CRD，支持 Rust/C++/Go 编译为目标代码，OCI 镜像分发）；Lua 脚本（LuaJIT，请求/响应头修改、路由逻辑）；External Processor ext_proc（gRPC 协议，全请求/响应体访问，用于 AI 特定处理）；External Auth ext_authz（gRPC/REST，认证授权）；Dynamic Modules（实验性，Rust 动态加载）；C++ 原生过滤器（需自定义编译 Envoy）



### 14. GPT-Load

**部署方式**: 

> 独立服务部署模式。提供多种部署方案：（1）Docker一键部署（ghcr.io/tbphp/gpt-load:latest，端口3001）；（2）Docker Compose部署（推荐方案，含数据库和Redis容器）；（3）源码编译部署（需Go 1.24+和Node.js 18+）；（4）分布式主从集群部署（共享MySQL/PostgreSQL + Redis，从节点设置IS_SLAVE=true）。从节点仅提供代理功能，主节点额外提供Web管理界面和后台定时任务。系统最低要求：128MB内存、1GB磁盘空间。非sidecar模式，非K8s Ingress插件模式


**语言运行时**: 

> 后端：Go语言（使用Gin HTTP框架、GORM ORM、Uber Dig依赖注入容器），编译为单个二进制文件（约20-30MB）。前端：Vue 3 + TypeScript + Naive UI组件库。运行时依赖：默认SQLite数据库（单实例）、可选MySQL 8.0+/PostgreSQL（集群模式），可选Redis 7.0+（集群模式必需，单实例推荐）。Go的goroutine并发模型支撑高并发连接处理


**扩展机制**: 

> REST管理API扩展：通过管理API（Bearer Token鉴权）实现分组CRUD、密钥管理、统计查询等功能的程序化操作。渠道适配器：按提供商划分独立channel模块（internal/channel/openai.go、gemini.go、anthropic.go），可通过代码贡献新增渠道支持。无热加载插件系统、无Wasm/Lua脚本扩展、无用户自定义中间件机制。社区fork版本可扩展额外功能



### 15. Helicone

**部署方式**: 

> 主要部署模式为独立服务（AI 网关），支持多种方式：1）Cloud 托管（SaaS）：直接使用 ai-gateway.helicone.ai 端点，最快速；2）NPX 本地运行：npx @helicone/ai-gateway@latest 一键启动；3）Docker：单容器部署，镜像约 42MB；4）Kubernetes/Helm：完整生产级部署（GKE 验证），含 Web UI + API + OpenAI Proxy + ClickHouse + PostgreSQL + MinIO 多服务栈；5）Docker Compose 自托管：单机部署完整平台（4 个核心容器）。AI 网关支持 Sidecar 模式（仓库含 SIDECAR.md），但主要推荐独立服务模式，非传统 Istio/Envoy sidecar 注入


**传统网关集成**: 

> 可部署于 Nginx/Kong/Envoy/APISIX 等传统 API 网关之后。典型拓扑：客户端 → Nginx/Kong（TLS 终止/全局限流）→ Helicone AI Gateway（AI 层：模型路由/成本控制/缓存）→ LLM 提供商。Helicone 本身不提供 Kong/APISIX 的原生插件，而是作为这些网关的后端 AI 专用层部署。Helm 部署中默认使用 Ingress NGINX 作为前置入口


**语言运行时**: 

> 双语言架构：1）主平台（Helicone/helicone）：TypeScript（Next.js + Express + Cloudflare Workers + Supabase），运行时特点为 JavaScript 事件循环，Cloudflare Workers 边缘执行（全球低延迟）；2）AI 网关（Helicone/ai-gateway）：Rust（93%+），编译为约 30MB 二进制，内存占用约 64MB，冷启动约 100ms，P95 延迟 <5ms。Rust 网关性能优异，适合高吞吐场景


- **扩展机制**: 无编程级插件/中间件系统。扩展主要通过：1）HTTP Header 配置行为（缓存 TTL、安全检测、重试开关、Session 追踪、自定义属性等）；2）config.yaml 文件配置路由策略、负载均衡、速率限制、缓存后端；3）OpenTelemetry 导出集成外部可观测性平台。不支持 Wasm、Lua 脚本或自定义中间件链。非插件化架构，功能扩展需修改源码或等待官方更新

### 16. Higress

**部署方式**: 

> 支持三种部署模式：① K8s Ingress 模式（云原生，推荐生产使用）：Helm 一键部署，作为 K8s Ingress Controller 运行，兼容 Gateway API v1.4.0 和 Inference Extension，支持 Nginx Ingress 注解平滑迁移；② Standalone 独立部署模式（脱离 K8s）：基于 Docker Compose 或 All-in-One 单容器部署（含 apiserver/controller/pilot/gateway/console 五个组件），不使用 K8s 资源作为配置来源，改用 Nacos 或文件系统存储配置，适用于本地开发和测试；③ Sidecar 模式：在 K8s 云原生部署中，Controller 和 Pilot 本身以 Sidecar 容器形式运行在同一 Pod 内。架构为控制面（Istio Pilot xDS 协议动态下发）+ 数据面（Envoy C++ 高性能代理）分离。


**协议支持**: 

> REST（HTTP/1.1、HTTP/2）、gRPC（通过 Envoy gRPC 代理）、WebSocket（原生支持，用于 MCP 全双工通信）、MCP（Model Context Protocol，支持 2024-11-05 版 POST+SSE 模式和 2025-03-26 版 Streamable HTTP 模式，跟进 2025-06-18 版 Output Schema + Structured Content）、SSE（Server-Sent Events 完整流式处理）、Dubbo（协议转换支持 HTTP 转 Dubbo）。


**传统网关集成**: 

> 基于 Envoy 内核 + Istio 控制面构建，原生兼容 Envoy 生态系统（xDS 协议、EnvoyFilter CRD）。可作为：Kubernetes Ingress Controller（兼容 Nginx Ingress 注解迁移）、Gateway API 实现、微服务网关（对接 Nacos/Zookeeper/Consul/Eureka，集成 Dubbo/Sentinel）、安全网关（WAF + 多种认证鉴权）。不与 Kong/APISIX/Traefik 作为传统网关层直接集成，而是作为独立替代方案。与 Nacos 3.0 MCP Registry 深度集成形成完整方案。


**语言运行时**: 

> 控制面：Go 语言开发（higress-controller、配置翻译、CRD 处理）。数据面：基于 Envoy（C++ 内核），Wasm 插件运行时支持 Go（编译为 wasip1/wasm）、Rust（编译为 wasm32-wasi）、C++（编译为 Wasm）、JavaScript/AssemblyScript。控制台：前后端分离（前端 React，后端 Go）。整体架构为 Go + C++(Envoy) + Wasm 多语言栈。


**扩展机制**: 

> 以 Proxy-Wasm 规范（ABI 标准）为核心扩展机制。插件可在三种生命周期中运行：Http Filter（HTTP 请求/响应处理）、Network Filter（TCP/UDP 底层流量处理）、Wasm Service（单例跨请求服务）。支持 Go（proxy-wasm-go-sdk）、Rust（higress crate）、C++（Proxy-Wasm C++ SDK）、JS/AssemblyScript 多语言。插件通过 OCI 镜像分发，WasmPlugin CRD 部署，支持沙箱隔离和流量无损热更新。2025 年新增原生 Go 插件模式作为双扩展路径。官方提供 Wasm 插件市场和 Higress AI 网关开发挑战赛（20 万奖金池）推动插件生态建设。



### 17. Langfuse

**部署方式**: 

> 独立服务部署，支持两种模式：(1) Langfuse Cloud SaaS——多区域托管服务（EU 爱尔兰、US 俄勒冈、JP 东京、HIPAA 美国），即开即用；(2) 自托管——Docker Compose（测试/低流量）或 Kubernetes Helm Chart（生产环境）。架构包含 4 个核心组件：Langfuse Web（Next.js，处理 UI 和数据摄入 API）、Langfuse Worker（Node.js，异步处理消息队列中的事件）、PostgreSQL（元数据/事务数据）、ClickHouse（OLAP 分析——Traces、Observations、Scores）、Redis/Valkey（BullMQ 任务队列+缓存）、S3（多模态载荷和原始事件存储）。


**协议支持**: 

> REST API（公共 API 提供完整的数据和功能访问）。OpenTelemetry OTLP/HTTP 协议（支持 JSON 和 Protobuf 序列化格式，端点 /api/public/otel 和 /api/public/otel/v1/traces）。明确不支持 gRPC。不支持原生 WebSocket（Agent 检测通过 SDK 实现）。MCP 协议通过内置 MCP Server 支持（StreamableHttp 传输，端点 /api/public/mcp）。


- **语言运行时**: TypeScript（Next.js 框架，Node.js 后端 Worker）。SDK 支持：Python（v4+，OpenTelemetry 原生）、JavaScript/TypeScript（v5+）。社区 SDK：Rust（langfuse-rs）、Ruby（langfuse-ruby）、Go（第三方）。
- **扩展机制**: 主要通过 OpenTelemetry 生态系统扩展：(1) OTel Span Processor——自定义 Span 处理和路由；(2) 自定义 Evaluator——通过 Python/JS SDK 编写评分逻辑；(3) 自定义模型定价——通过 API/UI 添加模型；(4) Webhook（2026年路线图）——支持事件驱动的外部集成。无 Wasm/Lua 插件沙箱。

### 18. LiteLLM

**部署方式**: 

> 主要部署模式为独立服务（AI Gateway），支持：1）Docker（单容器部署，docker-compose 一键启动含 PostgreSQL + Prometheus）；2）Kubernetes 原生部署（Deployment + ConfigMap + Secret）；3）Helm Chart（单体部署，支持 HPA 自动伸缩 min=1/max=10）；4）组件化 Helm Chart（v1.86+ 实验性，将 gateway/backend/ui 拆分为独立微服务，各自独立扩缩容）；5）Python SDK 嵌入模式（非代理，直接引入代码中使用 Router 进行负载均衡和 fallback）。不支持 Sidecar 注入模式（非 Istio/Envoy sidecar 方式）


**传统网关集成**: 

> 可与 Nginx/Envoy/Kong/APISIX 等传统 API 网关配合使用，典型拓扑为：客户端 → Nginx/Kong（TLS 终止、WAF、全局限流）→ LiteLLM（AI 层：模型路由、成本控制、语义缓存、提供商归一化）。LiteLLM 本身不提供 Kong/APISIX 的原生插件，而是作为这些网关的后端服务部署。可通过 SERVER_ROOT_PATH 环境变量适配网关路径前缀（如 /llmproxy 前缀）


- **语言运行时**: Python（基于 FastAPI + uvicorn 异步框架），运行时特点：CPU 密集型中间件链（认证 → 限流 → 路由 → 格式转换，均在单线程事件循环中执行），受 Python GIL 约束。Proxy 模式下单进程 RPS 约 175，需水平扩展满足高吞吐需求。内存占用约 1.1GB 以上
**扩展机制**: 

> 基于 CustomLogger 基类的 Hook 扩展系统（详见插件扩展字段）。可扩展点：pre_call（请求修改/拒绝）、post_call（响应修改）、streaming_hook（流式响应修改）、moderation_hook（并行安全检查）、agentic_loop_hook（Agent 工具循环控制）。自定义 Guardrail 集成和自定义回调（日志/监控）集成。基础设施级 Hooks：max_budget_limiter（预算拦截）、parallel_request_limiter（并发限制）、cache_control_check（缓存控制校验）。回调通过 config.yaml 的 callbacks 配置注册



### 19. LobeChat Plugin Gateway（@lobehub/chat-plugins-gateway）

**部署方式**: 

> Vercel Edge Function（Serverless 部署）。核心 API POST /api/v1/runner 以 Vercel Edge Function 形式运行。同时提供 npm 包（@lobehub/chat-plugins-gateway v1.9.0），可嵌入 Next.js 项目作为 API Route。支持 Vercel 一键部署按钮。不支持 sidecar 模式、K8s Ingress 集成或独立服务部署（无 Docker 镜像/Docker Compose/Kubernetes Helm Chart）


- **协议支持**: REST（HTTP/POST）。核心协议为 HTTP POST 请求/响应模式（JSON 格式的 PluginRequestPayload）。支持 OpenAPI 规范的 API 调用（通过 swagger-client 依赖执行 OpenAPI 定义的操作）。不支持 gRPC、WebSocket、MCP 或 SSE 协议
- **语言运行时**: TypeScript（Vercel Edge Runtime 或 Node.js Serverless）。Edge 函数导出 createGatewayOnEdgeRuntime，Node 函数导出 createGatewayOnNodeRuntime。使用 Bun 作为本地开发工具链（bun install / bun dev）。运行时轻量，无持久化数据库依赖
- **扩展机制**: 无扩展机制。网关作为 LobeChat 插件生态的代理中间件，是封闭式设计：不支持用户自定义插件（网关本身即为插件代理层）、不支持中间件链、无 Hook 系统或自定义策略注入点。所有行为由源代码硬编码定义

### 20. One API

**部署方式**: 

> 独立服务部署模式。提供单可执行文件（Go编译的二进制约40MB），支持Docker一键部署、Docker Compose（MySQL方案）、手动编译部署、宝塔面板一键部署、Sealos云平台一键部署、Zeabur Git部署、Render直接部署。支持多机主从架构（master/slave节点），通过NODE_TYPE、SYNC_FREQUENCY、FRONTEND_BASE_URL等环境变量配置。非sidecar模式，非K8s Ingress插件模式


- **语言运行时**: 后端：Go语言（使用Gin Web框架），编译为单个二进制文件。前端：JavaScript（Vue.js / Bootstrap UI）。运行时依赖：可选SQLite（默认，单机部署）/MySQL/PostgreSQL数据库，可选Redis缓存。Go的goroutine并发模型支撑高并发连接
- **扩展机制**: 管理API扩展：通过REST API（Bearer Token/Cookie鉴权）调用系统接口实现扩展功能（如充值、用户管理、渠道管理）。Relay模块扩展：供应商通信层按厂商划分为独立relay模块，可通过PR贡献新的模型适配。无热加载插件系统，无中间件链机制。有社区提议供应商插件模块化重构（Issue #779）和自定义接口透传功能（Issue #806）

### 21. OptiLLM

- **部署方式**: 独立服务（透明代理模式）。支持四种部署方式：pip install 命令行启动、Docker 容器（三种镜像变体：latest/latest-proxy/latest-offline）、Docker Compose 编排、源码安装。默认绑定 127.0.0.1:8000，作为 OpenAI API 兼容的透明代理运行。
- **协议支持**: REST（OpenAI API 兼容的 /v1/chat/completions 和 /v1/models 端点），SSE 流式协议，MCP 协议支持 stdio/SSE/WebSocket 三种传输方式。不支持 gRPC。
- **语言运行时**: Python（>=3.10），基于 Flask Web 框架。异步处理能力有限，本地推理可选 GPU 加速。
- **扩展机制**: Python 动态插件系统：插件目录中的 Python 模块通过 SLUG（标识名）+ run（执行函数）约定自动注册；支持插件链式调用（& 操作符串行流水线）和并行调用（| 操作符）；本地插件优先于包安装插件；支持 request_config 参数传递插件级配置。

### 22. TensorZero

**部署方式**: 

> 支持四种部署模式：1）独立 HTTP 网关服务（Standalone Gateway）：通过 Docker Compose 一键部署（含网关 + UI + ClickHouse + PostgreSQL + Valkey），或 Kubernetes Helm Chart 生产级部署（含 Deployment/Service/ConfigMap/Secret/Ingress/ServiceMonitor，默认资源限制 gateway: 2000m CPU/4096Mi 内存）；2）Sidecar 容器模式：官方推荐用于高吞吐/低延迟场景，网关可作为与应用容器同 Pod 的 sidecar 部署，利用 Rust 的 <1ms P99 延迟优势消除网络跳转；3）嵌入模式（Embedded Mode）：通过 Rust 客户端的 ClientMode::EmbeddedGateway 在应用进程内运行网关逻辑；4）Gateway Relay 多层中继架构：边缘网关（团队各自管理 prompts/functions）→ 中继网关（集中管控认证、速率限制、凭证），适用于大型组织的多团队场景


- **协议支持**: 以 REST/HTTP 为核心协议（基于 Rust Axum HTTP 框架）。支持 SSE（Server-Sent Events）流式传输。内置 MCP 端点（/mcp，使用 rmcp Rust crate，Streamable HTTP 传输）。支持 OpenTelemetry OTLP 协议（gRPC 传输，HTTP 不支持）。不支持 gRPC 推理接口、WebSocket 或 WebRTC
**传统网关集成**: 

> Kubernetes Helm Chart 支持 Nginx/Traefik 作为 Ingress 控制器。未发现与 Kong、APISIX、Envoy 等传统 API 网关的原生插件或深度集成文档。典型部署拓扑为：客户端 → Nginx/Traefik Ingress（TLS 终结）→ TensorZero Gateway（AI 层推理路由）→ LLM 提供商。TensorZero 作为独立 AI 网关层部署在传统网关之后


- **语言运行时**: Rust（核心网关基于 Axum HTTP 框架），运行时特点：编译为原生二进制，无 GC，内存安全且性能极高。官方基准测试在 c7i.xlarge（4 vCPU/8GB RAM）上实现 <1ms P99 延迟开销和 10,000+ QPS 稳定吞吐。TypeScript 用于 UI 前端（React Dashboard），Python 和 Go 用于客户端 SDK
- **扩展机制**: 主要通过声明式配置驱动（tensorzero.toml 文件，支持热重载），遵循 GitOps 理念。可扩展点包括：1）自定义评估器（启发式规则、LLM 裁判）；2）自定义指标（metrics 配置）；3）Autopilot 工具框架（供 Autopilot AI 工程师内部使用）；4）客户端 SDK 程序化集成。不支持传统插件/中间件/Wasm/Lua 等扩展机制

### 23. aisuite

**部署方式**: 

> 库级 SDK 嵌入模式。通过 pip install aisuite 在应用中导入使用，不提供独立的服务进程（无 HTTP 代理/网关服务器）。无 Docker 镜像、Kubernetes 部署或 Sidecar 模式。架构为薄包装层（thin wrapper），嵌入在应用代码中直接调用各提供商的 Python SDK。桌面端 OpenCoworker 应用作为参考实现展示 aisuite 的 Agent 能力（macOS/Windows）


- **协议支持**: REST（通过各提供商 SDK 发起 HTTPS 调用）。不支持 gRPC、WebSocket 或自定义传输协议。支持通过 MCP 协议的 stdio 和 HTTP/SSE 传输与 MCP Server 通信。aisuite 本身不暴露任何网络端口或 API 端点
- **传统网关集成**: 不适用。aisuite 作为嵌入式 SDK，不暴露网络服务端口，因此不存在与传统 API 网关（Kong/APISIX/Envoy/Nginx/Traefik）集成的场景。与 LiteLLM 等代理型网关不同，aisuite 直接运行在应用进程中，传统网关无法感知或管理其流量
- **语言运行时**: Python（基于各提供商的官方 Python SDK 构建轻量适配层），同时提供 TypeScript/JavaScript 版本。运行时特点：纯客户端库，无事件循环或 HTTP 服务器依赖，性能消耗极低，延迟开销仅来自适配器层的消息格式转换。GIL 约束在此场景下影响极小（主要为同步 SDK 调用）
- **扩展机制**: 基于命名约定的提供商适配器扩展：创建 <provider>_provider.py 文件，实现 <Provider>Provider 类即可添加自定义提供商。无插件市场、中间件链或 Hook 系统。MCP Server 可通过 MCPClient 类手动注册扩展。扩展性聚焦于添加新 LLM 提供商，而非功能扩展

### 24. New API

**部署方式**: 

> 独立服务（Docker/Docker Compose 一键部署，推荐方式）；裸机部署（Node.js ≥18，支持 SQLite/MySQL/PostgreSQL）；生产环境推荐 Nginx 反向代理 + HTTPS。支持多实例集群部署（需共享相同的 SESSION_SECRET、CRYPTO_SECRET、Redis 和数据库）。不支持 sidecar 模式、K8s Ingress 控制器原生集成和 Helm Chart 官方支持


- **协议支持**: REST（HTTP，标准请求/响应，主要协议）、SSE（Server-Sent Events，流式响应，Chat Completions/Embeddings/Image）、WebSocket（OpenAI Realtime API，双向音频/文本低延迟）。不支持 gRPC、MCP 原生协议
- **传统网关集成**: 可与 Nginx（推荐，反向代理 + SSL 终止 + 基础限流 + 流式响应透传）、Kong（企业级 API 生命周期管理 + 插件生态）、APISIX（云原生高性能动态配置 + 流式路由）集成使用。典型架构为传统网关处理通用流量管理层（TLS/WAF/全局限流），New API 作为后端 AI 聚合网关层（模型路由/格式转换/计费）。分层解耦、各司其职的组合部署模式
- **语言运行时**: Go（后端核心，基于 Gin 框架）；React/Next.js（前端 UI，基于 Base UI 完全重写）

## Agent 与生态集成

### 1. Kong AI Gateway

**MCP 支持**: 

> 原生支持 MCP（Model Context Protocol）。v3.14+（2026年4月发布，代号 Agent Gateway）新增 MCP Traffic Gateway，支持 MCP 服务器自动生成（从 Kong 管理的 API 零代码生成安全的 MCP Server）、集中化 MCP 认证（专用 MCP OAuth 2.1 插件）、MCP 可观测性与分析（在 Kong Konnect Dashboard 中捕获 MCP 工具、工作流和 prompt）、MCP 启用的开发者门户（将 Konnect Developer Portal 转为 MCP Server，供 Cursor 等 AI 编码助手发现 API）。2025年10月 Kong 同时开源了 Volcano SDK（github.com/Kong/volcano-sdk），提供构建 MCP 驱动的 AI Agent 的轻量框架。Kong Konnect 内的 MCP Registry 支持 MCP Server 的注册、发现和治理。目前处于行业领先地位——是首个将 MCP 治理纳入统一网关控制面的产品。


**A2A 支持**: 

> 原生支持 Google Agent-to-Agent（A2A）协议。v3.14+（2026年4月发布，Agent Gateway）新增 AI A2A Proxy 插件，透明代理 A2A 协议流量。支持完整的 A2A HTTP 端点集：/message/send、/message/sendStreaming、/tasks/{taskId}、/tasks、/tasks/{taskId}/cancel、/tasks/{taskId}/subscribe、/agentCard、/extendedAgentCard。配套支持 SSE 流式传输、结构化日志记录（捕获每次 A2A 交互的负载和统计信息）、统一可观测性（Kong Konnect 作为单一仪表盘）、认证与速率限制、成本可见性（Agent 工作流中的 Token 消耗追踪）、合规审计（完整 A2A 对话审计日志）。Kong 宣称是市场上唯一同时支持 LLM/MCP/A2A 三种 AI 流量模式的网关。



### 2. Apache APISIX AI Gateway

**MCP 支持**: 

> 原生支持 Model Context Protocol。（1）mcp-bridge 插件：将基于 stdio 的本地 MCP Server 转换为 HTTP SSE 流式服务，支持子进程生命周期管理、Session 管理（session id + ping 保活）、多 worker 间 Session 共享。（2）apisix-mcp：npm 包（@iflow-mcp/apisix-mcp），AI 客户端可通过自然语言管理 APISIX（创建/修改路由、上游、插件、消费者、SSL 证书等），支持自动验证配置是否生效。（3）MCP 客户端流量代理：支持 MCP Streamable HTTP（无状态模式）和 SSE 模式间的代理转换。（4）API7 企业版提供 openapi-to-mcp 插件，将 OpenAPI 3.x 规范零代码转换为 MCP 工具，支持工具自动发现和透明代理



### 3. Portkey

**MCP 支持**: 

> 原生 MCP Gateway（2025年9月 Beta，2026年1月 GA）。支持集中式 MCP Server 注册与发现（MCP Registry）；统一认证（OAuth 2.1、API Key、Okta、Entra、Client Credentials）；按团队/成员的 RBAC 访问控制；完整可观测性（工具调用日志、追踪、40+ 指标）；支持 Remote MCP Server（通过 Responses API 和 Messages API 连接远程 MCP 服务器）；与 Claude Desktop、Cursor、VS Code Copilot 等 MCP 客户端兼容


**A2A 支持**: 

> 支持 Google Agent-to-Agent（A2A）协议。通过 Agent Gateway 提供 A2A Agent 注册与管理（Agent Registry），为每个 A2A Agent 提供受控端点（https://agents.portkey.ai/v1/agent/<agent-slug>），自动验证 Agent Card 的传输和认证方案，提供完整的 Agent 运行追踪（含内部 MCP 调用）


- **Agent 框架集成**: 原生集成 LangChain、LlamaIndex、CrewAI、AutoGen、Phidata、OpenAI Agents SDK、Vercel AI SDK 等主流 Agent 框架；提供 Python、Node.js SDK；支持 OpenAI SDK 和 Anthropic SDK 直接指向 Portkey 端点

### 4. Bifrost

**MCP 支持**: 

> 原生 MCP 全面支持。Bifrost 既是 MCP Client（连接外部 MCP 兼容工具服务器），也是 MCP Server（向 Claude Desktop 等外部 MCP 客户端暴露工具）。支持多协议传输：STDIO（~1-10ms 延迟）、HTTP（~10-500ms）、SSE（实时推送）、InProcess（~0.1ms 直接调用）。核心功能包括：工具发现与注册、按请求/客户端/虚拟密钥的细粒度工具过滤、Agent Mode（可配置白名单工具的自动执行）、Code Mode（AI 编写 TypeScript 代码在沙箱中编排多工具调用，宣称节省 50%+ Token 和 40-50% 延迟）、连接弹性（指数退避自动重试）。安全模型：默认拒绝（工具调用仅建议不自动执行），需显式配置才能自动执行。企业级 MCP 支持联邦认证（MCP with Federated Auth）。


**API-to-MCP 转换**: 

> 支持。功能名称为'MCP with Federated Auth'（MCP 联邦认证）。可将现有 REST API 零代码转换为 MCP 工具。支持导入 OpenAPI 规范（Swagger/OAS 文件）、Postman Collections、cURL 命令。Bifrost 自动完成：同步现有认证系统、将每个端点转换为 MCP 兼容工具、保留安全上下文。支持的认证类型：Bearer Token（JWT/OAuth）、API Key（Header/Query）、自定义 Header、Basic Auth。导入后所有端点立即可被 LLM 通过 MCP 协议发现和调用。



### 5. kgateway

**MCP 支持**: 

> 通过 agentgateway 数据面原生支持 MCP（Model Context Protocol），v2.1 集成。三大能力：1) MCP 工具联邦（聚合多个后端 MCP Server 为统一端点，自动重写工具名避免冲突）；2) MCP 安全治理（JWT/OAuth 认证、细粒度工具级授权、会话管理）；3) MCP 可观测性（分布式追踪含工具调用详情）。支持 stdio/SSE/HTTP/Streamable HTTP 四种 MCP 传输。注意：Envoy 版 AI Gateway 仅有有限的 MCP 路由支持且已弃用


**A2A 支持**: 

> 通过 agentgateway 原生支持 Google A2A（Agent-to-Agent）协议。支持 Agent Card 自动发现与重写、任务全生命周期管理（created/in-progress/completed/failed）、多模态协商、OAuth 2.0/JWT/mTLS 安全通信。兼容 Google ADK、LangGraph、CrewAI、Microsoft Agent Framework、BeeAI 等框架构建的 A2A Agent


**Agent 框架集成**: 

> 通过 MCP 和 A2A 协议层面集成以下框架和工具：LangGraph、OpenAI Agents SDK、Claude Desktop、kagent（Solo.io 自研的 CNCF Sandbox Agent 框架）、Google ADK、CrewAI、Microsoft Agent Framework、BeeAI。作为基础设施/运维层位于框架之下，提供统一的认证、授权、限流、可观测性等横切关注点，不与特定 Agent 框架耦合


**API-to-MCP 转换**: 

> 通过 agentgateway 支持 OpenAPI 规范到 MCP 工具的零代码转换。三种模式：1) 直接暴露（基于 operationId 自动生成工具，参数扁平化）；2) 自定义暴露（筛选端点、自定义工具名/描述、CEL 响应整形、多 API 链式调用）；3) Code Mode（Agent 在沙箱 JavaScript 运行时内编排多个 API 调用）。kgateway Envoy 版控制面不直接提供此功能，需通过 agentgateway 数据面实现



### 6. agentgateway

**MCP 支持**: 

> 原生支持 MCP 协议（最早最完善的核心功能），三大能力：1) MCP 工具联邦（聚合多个后端 MCP Server 为统一端点，多路复用 tools/list 请求并自动重写工具名为 ${backend_name}_${tool_name}）；2) API-to-MCP 转换（三种方式：直接 1:1 暴露、自定义暴露含 CEL 转换和 API 链式调用、Code Mode 含 JS 沙箱编排）；3) MCP 安全治理（基于 JWT/OAuth 的会话认证、细粒度 CEL 授权、工具级访问控制、每会话虚拟化工具列表）。支持 stdio/SSE/HTTP/Streamable HTTP 四种传输。当前默认有状态（SessionManager 本地存储），社区计划支持无状态模式


**A2A 支持**: 

> 原生支持 Google A2A 协议（与 MCP 同级核心功能），支持能力发现（Agent Card 自动重写指向网关）、模态协商（文本/表单/媒体/多模态）、任务协作（全生命周期管理含 created/in-progress/completed/failed）、安全通信（OAuth 2.0/JWT/mTLS/JWS 数字签名）；兼容 Google ADK、LangGraph、CrewAI、Microsoft Agent Framework、BeeAI 等框架构建的 A2A Agent


- **Agent 框架集成**: 通过 MCP 和 A2A 协议层面集成以下框架：LangGraph、OpenAI Agents SDK、Claude Desktop、kagent、Google ADK、CrewAI、Microsoft Agent Framework、BeeAI。作为基础设施/运维层位于框架之下，提供统一的认证、授权、限流、可观测性等横切关注点，不与特定框架耦合
**API-to-MCP 转换**: 

> 支持完整的 OpenAPI 规范到 MCP 工具零代码转换，三种模式：1) 直接暴露（基于 operationId 自动生成工具，参数扁平化，认证信息对 AI 透明）；2) 自定义暴露（筛选端点、自定义工具名/描述、CEL 响应整形、多 API 链式调用封装为单工具）；3) Code Mode（Agent 在沙箱 JS 运行时内编排多 API 调用，中间响应不经过模型上下文窗口，解决 Token 浪费和上下文膨胀问题）



### 7. Lunar MCPX（Lunar MCP Gateway）

**MCP 支持**: 

> 原生MCP支持——MCPX本身就是一个MCP Server（MCP聚合器）。核心MCP能力包括：多MCP服务器聚合到统一端点（零代码JSON配置接入）；动态工具路由与多路复用（按配置分发工具调用并聚合响应）；意图驱动的工具发现（Intent-based Tool Discovery，Agent仅接收当前任务所需工具）；标准MCP目录（预审查的公共MCP服务器即连即用）；动态工具发现（Dynamic Tool Discovery）；工具注册与发现（Tool Registration & Discovery）；工具自定义（Tool Hardening，覆写参数和描述）。客户端兼容所有MCP兼容的Agent和IDE。


- **A2A 支持**: 不支持Google Agent-to-Agent协议。MCPX是垂直Agent-to-Tool集成层（MCP），不提供水平Agent-to-Agent通信（A2A）。如需A2A，需配合Google ADK或LangGraph等框架实现。
**Agent 框架集成**: 

> 通过标准MCP协议（Streamable HTTP/SSE）支持所有MCP兼容的Agent框架和IDE，但文档未提供LangChain/LangGraph/AutoGen/CrewAI/OpenAI Agents SDK的专用集成教程。官方文档列出的已测试客户端包括：Claude Code（CLI）、Claude Desktop（mcp-remote over HTTP）、Cursor、VS Code/GitHub Copilot、ChatGPT、n8n、Warp、Codex Desktop、自定义MCP SDK。任何支持MCP协议的Agent框架均可通过Streamable HTTP连接MCPX。


- **API-to-MCP 转换**: 不支持——未发现将现有REST API（OpenAPI规范）零代码转换为MCP工具的功能。MCPX定位为MCP服务器聚合中间件，而非API转换层。

### 8. Gravitee Agent Mesh（现称 Gravitee AI Agent Management）

**MCP 支持**: 

> 原生支持 Model Context Protocol（MCP），构成三大 MCP 支柱能力。支柱一——MCP Tool Server（v4.8+）：将现有 REST API（v4 Proxy API）通过导入 OpenAPI 3.x 规范零代码转换为 MCP 兼容工具，操作自动生成为工具定义，参数成为输入、响应 Schema 成为输出，认证要求得以保留；启用后可通过 {context-path}/mcp 的 Streamable HTTP 端点访问，兼容 MCP Inspector、Claude、Cursor、LangChain、LangGraph 等客户端。支柱二——MCP Proxy（v4.10+，新增原生 MCP Proxy API 类型）：协议原生代理上游 MCP Server，深度内省 MCP 负载以理解调用的方法、工具和 Prompts，支持方法级 ACL（tools/list、tools/call、resources/read 等细粒度访问控制），支持工具调用节流（Tool Invocation Throttling），提供专用 MCP Analytics。支柱三——APIM MCP Server（v4.9+，开源）：将 Gravitee Management API 暴露为 MCP 工具，允许通过 Claude Desktop、Cursor 等 AI 编码助手管理 Gravitee 自身。三大支柱共享统一的 OAuth 2.1 认证、OpenFGA 细粒度授权和 OpenTelemetry 可观测性。


**A2A 支持**: 

> 原生支持 Google Agent-to-Agent（A2A）协议。A2A Proxy 作为 v4 Message API 类型（v4.8+），透明代理 Agent 间的对等通信。支持完整的 A2A HTTP 端点集（标准请求/响应、SSE 流式传输、推送通知）。后端 Agent 通过发布 Agent Card（能力声明）注册到 Agent Catalog，其他 Agent 通过 Proxy 发现并调用。支持可配置心跳间隔维持持久连接感知。支持基于声明技能（Declared Skill）的细粒度授权，而非仅按端点级别。支持 RFC 8693 Token Exchange，委托的 Actor 声明在多 Agent 工作流中保持可追溯。强制速率限制、日志记录和可观测性于 Agent 间调用。Gravitee 与 Google 合作共同推进 A2A 协议的标准化（已提交至 Linux Foundation）。


**API-to-MCP 转换**: 

> 原生支持将现有 REST API（基于 OpenAPI 3.x 规范）零代码转换为 MCP 工具。操作流程：创建或选择 v4 Proxy API → 导航到 Entrypoints → MCP Entrypoint → 启用 MCP → 粘贴 OpenAPI 规范 → 自动生成工具 → 部署即可。完成后 API 同时服务人类开发者（REST）和 AI Agent（MCP），使用同一网关、同一策略。无需编写任何包装代码、修改后端或额外配置。嵌入式 MCP Server 在 Gateway 级别运行。Gravitee 宣称从 REST API 到受治理 MCP 工具的转换只需几分钟。适用于将企业内部已有的 REST API 基础设施立即变为 Agent 可调用的工具。



### 9. Gate22

**MCP 支持**: 

> Gate22 是 MCP 原生网关和控制平面，MCP 支持是其核心能力：（1）MCP Server 代理 — 管理员可接入任意内部或外部远程 MCP 服务器；（2）Bundle 组合 — 开发者可将多个 MCP 配置组合为 Bundle，通过单一远程 MCP 端点暴露，统一为 search 和 execute 两个函数，即使跨 20+ MCP 和 400+ 工具也能动态解析；（3）MCP 工具列表刷新与差异视图 — 使用前查看 MCP 服务器的工具变更；（4）函数级 allow-list 权限 — 按 MCP 配置精细管控可调用的工具函数；（5）虚拟 MCP 服务器（Virtual MCP Service）— 后端独立服务组件，支持托管虚拟 MCP 服务器


**Agent 框架集成**: 

> 框架无关（framework-agnostic）设计。Gate22 作为 MCP 协议网关，理论上可与任何支持 MCP 协议的 Agent 框架配合使用。明确提及支持的客户端包括 Cursor、Claude Desktop 等 Agentic IDE。由于采用标准 MCP 协议，LangChain/LangGraph、AutoGen、OpenAI Agents SDK、CrewAI 等框架均可通过 MCP 客户端接入，但未提供针对特定框架的深度适配或 SDK


**API-to-MCP 转换**: 

> Gate22 本身不提供 API-to-MCP 转换功能。但 ACI.dev 生态支持 600+ 预构建集成（将 SaaS/REST API 封装为 MCP 工具），通过 App → Function 模型实现。管理员可将现有 REST API 以 MCP 服务器形式接入（Bring Your Own MCPs），但需手动构建 MCP 服务器适配层，不提供零代码 OpenAPI → MCP 自动转换



### 10. WSO2 AI Gateway（WSO2 AI 网关）

**MCP 支持**: 

> 全面原生支持 Model Context Protocol：（1）MCP Gateway 模式：作为 MCP 客户端与 MCP 服务器之间的治理代理，提供认证、访问控制、速率限制、可观测性；（2）MCP Hub：集中式工具发现目录，作为企业 AI 能力的'黄页'，提供工具文档、输入输出 Schema、预格式化配置片段；（3）API-to-MCP 零代码转换：指向已有 REST API 或 OpenAPI 规范，自动生成 MCP 工具定义（将 REST 端点映射为 MCP tools）；（4）MCP Authorization 规范合规：OAuth2 scope 级工具访问控制，支持 PKCE、audience binding、资源指示符；（5）MCP Inspector/Playground：交互式测试环境，在上线前验证工具交互；（6）外部 MCP Server 代理：代理第三方 MCP 服务器，统一施加认证和限流；（7）工具生命周期管理：创建→测试→发布→版本化全流程


- **API-to-MCP 转换**: 是，支持将现有 REST API（OpenAPI 规范或已有 API 代理）零代码自动转换为 MCP 兼容的工具服务器：自动从 OpenAPI 定义提取工具定义（将 GET/POST/PUT/DELETE 映射为 MCP 工具），无需编写包装器或自定义集成代码，转换后的 MCP 服务器继承所有网关策略（安全、限流等），通过 MCP Hub 发布供 Agent 发现和调用

### 11. Plano（原名 Arch Gateway / archgw）

- **MCP 支持**: Filter Chains 原生支持 MCP 协议作为过滤器类型（type: mcp），Filter 可以是 MCP Server，Plano 通过 MCP 工具调用与之通信。Filter 默认 transport 为 streamable-http。但项目并非完整的 MCP 网关（如 MCP Server 代理注册发现、API-to-MCP 工具转换等高级功能未文档化）。

### 12. Docker MCP Gateway

**MCP 支持**: 

> 原生深度支持 MCP（Model Context Protocol），作为 MCP Server 代理和聚合层：聚合多个 MCP Server 为统一入口、自动协议转换（stdio↔SSE↔Streamable HTTP）、MCP 工具注册发现（集中化工具列表和能力聚合）、动态 MCP 管理工具（`mcp-find` 运行时搜索 MCP Catalog、`mcp-add` 动态添加 Server、`mcp-remove` 移除 Server、`mcp-config-set` 配置管理、`mcp-create-profile` 创建配置文件）


**Agent 框架集成**: 

> 通过标准 MCP 协议与任何支持 MCP 的 AI 客户端兼容：直接支持 VS Code、Cursor、Claude Desktop、Docker Desktop MCP Toolkit 等客户端；通过 langchain-mcp-adapters 包集成 LangChain/LangGraph；通过 autogen-ext-mcp 包集成 AutoGen；支持 OpenAI Agents SDK（通过 MCP 标准化工具接口）；支持 CrewAI（通过 crewai-tools 库）；支持 LlamaIndex（原生 MCP 工具集成）；由于基于标准 MCP 协议，理论上兼容所有支持 MCP 的 Agent 框架



### 13. Envoy AI Gateway

**MCP 支持**: 

> 是，第一级（First-Class）支持。v0.4.0（2025 年 11 月）引入 MCP Gateway。支持 MCP Streamable HTTP 传输协议（2025 年 6 月规范）；支持 OAuth 2.0/JWT 认证和授权；支持多 MCP 服务器复用（Server Multiplexing，聚合多个后端 MCP 服务器到单一端点）；支持工具过滤（Tool Filtering，精确匹配和正则表达式）；支持无状态会话管理（会话信息加密编码到客户端 Session ID，无需 Redis 共享存储），水平扩展简便；提供 OpenTelemetry 追踪和 Prometheus 指标；支持 MCPRoute CRD 进行声明式配置


- **A2A 支持**: 否，尚无 Google Agent-to-Agent（A2A）协议的原生支持。A2A 协议（2025 年 4 月 Google 发布）用于 Agent 间协作通信，与 MCP（Agent 到工具）互补。Envoy AI Gateway 当前聚焦于 LLM 流量路由和 MCP 协议，A2A 可作为未来演进方向但无官方公告或路线图
**Agent 框架集成**: 

> 间接支持，未直接集成。Envoy AI Gateway 提供 OpenAI 兼容 API 端点，任何使用 OpenAI SDK 的 Agent 框架（LangChain、LangGraph、CrewAI、AutoGen、OpenAI Agents SDK 等）均可通过设置 OPENAI_BASE_URL 指向网关实现透明代理。网关层面自动注入凭据、执行速率限制、记录审计日志，无需 Agent 框架层面修改代码。原生支持 Tetrate Agent Router Service（TARS）作为后端


**API-to-MCP 转换**: 

> 否，Envoy AI Gateway 本身不支持将 REST API（OpenAPI 规范）零代码转换为 MCP 工具。该能力由生态项目提供：ING Bank 开源了 envoy-mcp-openapi-processor（Envoy 外部处理器，将 MCP 请求转换为基于 OpenAPI 规范的 HTTP API 调用）；Higress（阿里云，基于 Envoy 的 AI 网关）内置 openapi-to-mcp 工具。AutoMCP 学术项目实现了 OpenAPI → MCP Server 的编译器（99.9% 成功率）



### 14. GPT-Load

- **A2A 支持**: 不支持Google Agent-to-Agent（A2A）协议

### 15. Helicone

**MCP 支持**: 

> MCP 支持分为两个层面：1）消费侧 - 提供 @helicone/mcp 官方 MCP Server（npm 包），可将 Helicone 可观测性数据（请求日志、错误分析、性能指标）暴露为 MCP 工具，供 Claude Desktop、Cursor、Codex 等 MCP 客户端通过自然语言查询。支持 query_requests 和 query_sessions 两个 MCP 工具；2）观测侧 - 可为用户自定义 MCP Server 添加可观测性，通过将 MCP Server 中的 LLM 调用路由经过 Helicone 代理，自动记录成本、Token、性能指标。不支持作为 MCP 网关（代理 MCP 工具调用、MCP Server 注册管理、工具级访问控制）


- **A2A 支持**: 不支持 Google Agent-to-Agent（A2A）协议。Helicone 不提供 A2A Agent 发现、消息传递、Agent 卡片等 A2A 协议能力
**Agent 框架集成**: 

> 主要集成 LangChain 和 LangGraph（一级支持，有官方文档）。集成方式：将 ChatOpenAI/ChatAnthropic 等模型实例的 baseURL 指向 Helicone AI Gateway，实现透明可观测性。间接支持 CrewAI（底层基于 LangChain，可透传集成）。支持 Vercel AI SDK、LlamaIndex、Semantic Kernel、ModelFusion、PostHog、RAGAS、Open WebUI、MetaGPT、Dify、Mem0、EmbedChain 等框架。不支持 OpenAI Agents SDK、AutoGen 的原生集成



### 16. Higress

**API-to-MCP 转换**: 

> 完整支持。核心能力：① 零代码转换（仅需提供符合 OAS 3.0 规范的 OpenAPI 文档即可自动生成 MCP Server）；② 三种接入路径（OpenAPI→MCP、Database→MCP 支持 MySQL/PostgreSQL/ClickHouse/SQLite、直接路由已有 MCP 后端）；③ Go Template + GJSON 模板化调优（对请求/响应模板做精细化定制，配置变更流量无损、SSE 连接不中断）；④ 统一 MCP 入口（所有转换后的 MCP 服务通过 Higress 网关统一接入，享受认证/限流/可观测/审计等企业级能力）。2025 年 4 月正式发布 MCP Marketplace，加速存量 API 跨入 MCP 时代。



### 17. Langfuse

**MCP 支持**: 

> 原生支持 MCP（Model Context Protocol）。2025年11月发布内置 MCP Server（端点 /api/public/mcp，使用 StreamableHttp 传输，遵循 MCP 2025-03-26 规范）。提供 5 个工具：getPrompt（按名称/标签/版本获取 Prompt）、listPrompts（带过滤和分页浏览）、createTextPrompt（创建文本 Prompt 版本）、createChatPrompt（创建 Chat Prompt 版本）、updatePromptLabels（管理 Prompt 标签）。使用 BasicAuth 认证（项目级 API Key）。当前 MCP 能力聚焦于 Prompt 管理，官方计划扩展至 Traces、Observations、Datasets、Evaluations。2026年3月社区发布 langfuse-mcp-server（PyPI，56 个工具，覆盖完整可观测性）和 langfuse-agent（80+ 工具，含 Graph Agent 和 ACP 支持）。


**Agent 框架集成**: 

> Langfuse 原生集成以下 Agent 框架：LangChain（Callback Handler）、LangGraph（图节点追踪）、OpenAI Agents SDK（原生 Python SDK 集成+OpenTelemetry）、LlamaIndex（Callback Handler）、CrewAI（OpenTelemetry）、AutoGen（OpenTelemetry via OpenLit）、Haystack、Google ADK（OpenTelemetry）、Vercel AI SDK、Mastra、TanStack AI。总计 80+ 集成。



### 18. LiteLLM

**MCP 支持**: 

> 原生 MCP Gateway 支持（v1.80+ 引入，v1.81+ 增强）。核心能力：1）MCP Server 注册与管理（在 config.yaml 的 mcp_servers 段配置，与 LLM 模型统一管理）；2）MCP 端点（/mcp、/{server}/mcp、/sse、/toolset/{name}/mcp、/mcp-rest/）；3）MCP 工具在 /chat/completions 中直接调用（LLM 可像调用函数一样调用 MCP 工具）；4）认证支持：api_key、bearer_token、basic、OAuth2 PKCE + M2M client_credentials、OAuth2 token exchange（RFC 8693 On-Behalf-Of）、AWS SigV4；5）安全：mcp_jwt_signer guardrail 对出站工具调用进行 JWT 签名，IP-based ACL（控制公网/内网可访问的 MCP Server）；6）语义过滤（v1.81.9）：基于语义相似度过滤 MCP 工具，减少工具泛滥；7）细粒度权限：按虚拟密钥/团队的 object_permission.mcp_tool_permissions 对工具级访问控制。支持公共 MCP Server（available_on_public_internet: true）和内网 MCP Server 的区分


**A2A 支持**: 

> 支持 Google Agent-to-Agent（A2A）协议（v1.80.10+ 引入）。A2A Agent 提供商支持：LangGraph Agents、AWS Bedrock AgentCore、Azure AI Foundry Agents、Google Vertex AI Agent Engine、以及通用 A2A 协议兼容的任何 Agent。端点：/a2a/{agent_id}、/a2a/{agent_id}/message/send、/a2a/{agent_id}/message/stream。支持通过 /chat/completions 调用 A2A Agent（v1.81.9+）。Agent 卡片发现（GET /.well-known/agent.json）。A2A 认证模式包括 Bearer/JWT、AWS SigV4（AgentCore）、提供商原生认证。支持按请求传递用户凭证（x-a2a-{agent_name}-{header_name} 约定）。子 Agent 身份传播：X-LiteLLM-Trace-Id 和 X-LiteLLM-Agent-Id 自动转发。Agent 访问控制：object_permission.agents 和 agent_access_groups。成本追踪：按查询/按 Token 计费，Dashboard 中可见 Agent 使用成本


**Agent 框架集成**: 

> SDK 级别原生支持 LangChain（主要集成框架）。社区支持 LangGraph、AutoGen、OpenAI Agents SDK、CrewAI、Google ADK 等。多种 Agent 框架通过 LiteLLM 作为统一的 LLM 后端来调用 140+ 提供商。Claude Code 通过 LiteLLM 代理使用非 Anthropic 模型（GPT-4o/Gemini 等）。Python 生态中大量 Agent 项目将 LiteLLM 作为默认 LLM 调用层。A2A 协议支持 LangGraph Agents、Bedrock AgentCore、Azure AI Foundry Agents 作为远程 Agent 提供商



### 19. LobeChat Plugin Gateway（@lobehub/chat-plugins-gateway）

- **MCP 支持**: 不支持。该网关仓库（chat-plugins-gateway）本身不含任何 MCP（Model Context Protocol）相关代码。MCP 集成是后续在 LobeChat 主仓库（lobehub/lobe-chat）中独立实现的功能，与本网关无关。网关不提供 MCP Server 代理、API-to-MCP 转换或 MCP 工具注册发现能力
- **A2A 支持**: 不支持。网关未实现 Google Agent-to-Agent（A2A）协议，无 Agent 卡片发现端点或 A2A 消息传递机制
- **Agent 框架集成**: 仅限 LobeChat 生态。网关专为 LobeChat 框架设计，仅作为 LobeChat 前端与外部插件 API 之间的请求代理层。不支持 LangChain/LangGraph/AutoGen/OpenAI Agents SDK/CrewAI 等通用 Agent 框架的集成。其他 Agent 框架无法直接使用本网关作为 LLM 调用层或工具代理
- **API-to-MCP 转换**: 不支持。网关无将 REST API（OpenAPI 规范）零代码转换为 MCP 工具的能力。尽管网关依赖 swagger-client 可执行 OpenAPI 定义的操作，但这是用于 LobeChat 插件执行，而非 MCP 工具转换

### 20. One API

- **A2A 支持**: 不支持Google Agent-to-Agent（A2A）协议

### 21. OptiLLM

**MCP 支持**: 

> 原生支持 MCP（通过 mcp 插件）。完整支持 MCP 三大核心能力：Tools（可执行函数调用，含 JSON Schema 自动注入系统提示）、Resources（结构化数据源上下文）、Prompts（可复用提示模板）。支持三种传输方式：stdio（本地进程）、SSE（远程 HTTP）、WebSocket（远程双向连接）。通过 ~/.optillm/mcp_config.json 配置，支持 ${VARIABLE_NAME} 环境变量注入。启动时自动发现和连接所有配置的 MCP 服务器。


- **Agent 框架集成**: 通过 OpenAI 兼容 API 接口实现广泛兼容。任何使用 OpenAI Python SDK 的 Agent 框架均可直接集成，包括 LangChain、LangGraph、AutoGen、OpenAI Agents SDK、CrewAI 等。无针对特定框架的专用适配器，但 Patchwork 已在实际工作流中验证集成效果。

### 22. TensorZero

**MCP 支持**: 

> 内置 MCP Server 端点（/mcp），通过 rmcp Rust crate 实现，基于 Streamable HTTP 传输提供服务。核心能力：向 AI 编码 Agent（如 OpenCode、Cursor、Claude 等 MCP 兼容客户端）暴露 TensorZero 内部工具，包括查询可观测性数据、获取推理性能指标（如平均响应时间）、管理数据集、访问 Autopilot 工具。支持可选 API 密钥认证。注意：TensorZero 的 MCP 实现是'自身作为 MCP Server'，让 Agent 可以编程查询 TensorZero 的运行状态，而非'作为 MCP Gateway'托管和代理外部的第三方 MCP Server。不支持 MCP Server 注册、发现或管理外部 MCP Server 的功能



### 23. aisuite

**MCP 支持**: 

> 原生支持 Model Context Protocol（MCP）。两种使用模式：1）Config Dict 模式（简单）：在 tools 参数中直接传入 MCP Server 配置（command + args），aisuite 自动完成连接、工具发现和执行；2）MCPClient 模式（高级）：显式创建 MCPClient 实例，支持 stdio 和 HTTP/SSE 传输，提供工具过滤（allowed_tools）和工具前缀（use_tool_prefix）。通过 mcp.get_callable_tools() 将 MCP 工具包装为 Python 可调用对象。需 pip install 'aisuite[mcp]'。不支持 MCP Server 代理部署或 API-to-MCP 自动转换


- **A2A 支持**: 不支持 Google Agent-to-Agent（A2A）协议。aisuite 的 Agent 能力内建于自身 Agents API，不依赖外部 A2A 协议进行 Agent 间通信
**Agent 框架集成**: 

> 自带内建 Agents API（Agent + Runner 类），支持自动多轮工具调用（max_turns）、Tool Policies（RequireApprovalPolicy、allow/deny 列表）、State Stores（内存/文件/Postgres）持久化。不专门集成 LangChain、LangGraph、AutoGen、OpenAI Agents SDK、CrewAI 等第三方 Agent 框架。但作为统一的 LLM 调用层，理论上可被这些框架作为模型后端使用（通过 OpenAI 兼容接口）


- **API-to-MCP 转换**: 不支持。无将现有 REST API（OpenAPI 规范）零代码转换为 MCP 工具的功能。MCP 支持仅限于连接和调用现有的 MCP Server，不提供 API 到 MCP 的自动转换层

### 24. New API

_（该类别无确定的字段值）_


## 性能特征

### 1. Kong AI Gateway

**官方性能声明**: 

> Kong 官方于 2025年7月发布的 Benchmark 报告（AWS EKS，c5.4xlarge 实例，WireMock 模拟 LLM 后端）：Kong Konnect 数据面吞吐量比 Portkey 高 228% 以上，比 LiteLLM 高 859%；延迟比 Portkey 低 65%，比 LiteLLM 低 86%。独立第三方 Benchmark（2026年，GCP n2-standard-8，60ms 固定模拟延迟）：Kong 在 1000 VU 下实现约 15,891 RPS，P50 延迟约 68ms（网关开销仅约 8ms），内存恒定 43MB；Portkey 在 50 VU 时 P50 62.6ms，150 VU 时升至 174ms，吞吐量上限约 850 RPS；LiteLLM 硬上限约 175 RPS，1000 并发时 P99 延迟达 28 秒。注意：这些测试均使用模拟后端，实际部署中推理延迟通常远大于网关开销。


**延迟开销**: 

> 官方 Benchmark（AWS EKS，模拟 OpenAI 端点）中 WireMock 基线 RPS 29,005.51、P95 24.07ms、P99 30.35ms。Kong 数据面距离基线非常接近（具体绝对数值未公开）。第三方测试（GCP n2-standard-8，60ms 模拟后端）中：低负载（150 VU）下 Kong P50 约 61ms（开销约 1ms）；高负载（1000 VU）下 P50 约 68ms（开销约 8ms），P99 约 112ms（开销约 52ms）。实际部署中网关开销通常低于 10ms（非流式请求）或 10-50ms（流式处理）。TTFT（首 Token 时间）开销可忽略不计。



### 2. Apache APISIX AI Gateway

**官方性能声明**: 

> 单核 QPS 18,000（含 limit-count 和 prometheus 插件），单核平均延迟 0.2ms。16 核 vCPU（AWS EKS c5.4xlarge）全量基准：无插件 + 1 条路由：167,019 QPS（P99 延迟 2.30ms）；含 key-auth + limit-count + 100 条路由：133,782 QPS（P99 延迟 2.48ms）；Mock 模式（无上游转发）：310,392 QPS（P99 延迟 1.16ms）。与 Kong 对比吞吐量约为 10 倍，延迟约为 1/10。已用于支撑 1 万亿+ 日 API 调用量（Zoom、Airwallex、vivo 等用户）


**社区评价**: 

> LuaJIT 引擎性能被广泛认可为 APISIX 的核心竞争力之一。毫秒级配置热加载（etcd 驱动）是其与 Kong（PostgreSQL 轮询）相比的显著架构优势。插件生态丰富（100+ 插件）且性能开销极小（插件组合仅降低 10-20% 吞吐量）。Apache 基金会顶级项目治理增强企业信心。AI 插件集从 3.12.0 起快速迭代（3.15.0 已覆盖主流 LLM 提供商），社区活跃度高。劣势：Lua 作为主要语言对不少团队构成技术栈门槛；AI 语义缓存等高级功能目前缺失



### 3. Portkey

- **官方性能声明**: 官方宣称 <1ms 延迟开销，~122KB 极轻量体积（基于 Hono 框架），日处理超 1 万亿 Token（2026年3月），生产环境累计管理超 1.8 亿美元 AI 支出，服务 24,000+ 组织。独立测试中单节点可达约 850 RPS（TypeScript/Node.js，Docker 部署）
- **延迟开销**: 独立基准测试（Ferro Labs，2025年，GCP n2-standard-8）：网关自身 P50 延迟开销约 62-343ms（随并发 VU 增长），在 50 VU 时 P50 为 62.6ms（含上游 60ms 模拟延迟，实际网关开销约 2.6ms），在 500 VU 时 P50 增至 293ms（网关开销约 233ms）。Node.js 事件循环在高并发下出现拥塞，是延迟增长的主因
- **社区评价**: 社区普遍认为 Portkey 在 TypeScript/Node.js AI 网关中性能领先，吞吐量约 5 倍于 LiteLLM（Python 实现）；但相比 Go/Rust 原生网关（如 Kong AI Gateway、Ferro Labs），单节点吞吐量低约 18-91 倍。优势在于功能完整性和易用性，平衡了性能与开箱即用体验；劣势在于高并发场景（>500 VU）延迟明显劣化，需水平扩展补偿

### 4. Bifrost

**官方性能声明**: 

> 官方宣称的性能指标（基于 t3.xlarge AWS 实例自测）：网关自身开销约 11µs（5,000 RPS 持续负载下）；相比 LiteLLM 的 P99 延迟快约 50 倍（500 RPS 下 Bifrost 1.68s vs LiteLLM 90.72s）；吞吐量高 9.5 倍（424 req/s vs 44.84 req/s）；内存占用低 68%（120MB vs 372MB）；5,000 RPS 下成功率 100%（LiteLLM 不稳定）；加权 API 密钥选择约 10ns；InProcess MCP 工具调用约 0.1ms。性能优势归因于：Go 语言（goroutine 原生并发，无 GIL 限制）vs Python、sync.Pool 对象池减少 GC 压力、HTTP 连接复用 95%+、异步批量日志。



### 5. kgateway

**官方性能声明**: 

> agentgateway（Rust）对比传统 Envoy+Go sidecar retrofit 方案：约 100 倍平均延迟降低（2.34ms vs 245.58ms）、约 100 倍吞吐提升（41,947 req/s vs 406 req/s）、P95 延迟仅 3.53ms（100 并发 MCP 请求）。性能优势源于 Rust 无 GC、零成本抽象、Tokio+Hyper 高性能异步栈设计。Envoy C++ 数据面在传统 L4/L7 代理场景下性能优异（约 50,000+ QPS、次毫秒级延迟）。独立 Gateway API Benchmark 中路由传播速度最快、零错误（最高 3,000 路由测试）。开源基准测试代码：github.com/howardjohn/gateway-api-bench


**社区评价**: 

> 整体正面：作为最成熟、部署最广泛的 Envoy-based Gateway 获行业广泛认可（服务 T-Mobile、BMW、ADP、SAP 等企业级客户）。统一 API+AI 网关定位获好评，单一控制面管理传统和 AI 流量的架构受认可。agentgateway Rust 重写的技术决策获社区认可。主要批评：Envoy 版 AI Gateway 弃用导致已有用户需迁移；agentgateway 当前默认有状态（SessionManager 本地存储），多实例场景下 MCP 粘性会话无保证；文档和功能仍在快速迭代中，部分已实现功能未文档化。中文社区讨论主要集中在 InfoQ/掘金/微信公众号的技术分析文章，主要结论：纯 AI 推理场景推荐 kgateway，混合微服务+AI 场景建议与 Istio 组合使用



### 6. agentgateway

**官方性能声明**: 

> 宣称相比传统 Envoy+Go 外部进程 retrofit 方案：300 倍内存优化（30MB vs 9GB），35 倍吞吐提升（165,000 QPS vs 4,600 QPS），122 倍延迟降低（0.09ms vs 11ms）。独立基准测试显示约 500,000 QPS（512 连接）、P99 < 0.2ms（30,000 QPS/512 并发）。性能优势源于 Rust 无 GC、零成本抽象、基于 Tokio+Hyper 的高性能异步栈



### 7. Lunar MCPX（Lunar MCP Gateway）

- **官方性能声明**: P99网关延迟约4ms（生产级规模）。官方宣称'production scale with ~4ms p99 gateway overhead'。强调HTTP原生架构（兼容retries和service mesh），Kubernetes原生部署（滚动升级、自愈、零宕机）。未公开吞吐量（QPS/TPS）基准数据。
- **延迟开销**: P99网关额外延迟约4ms。无P50延迟数据公开。

### 8. Gravitee Agent Mesh（现称 Gravitee AI Agent Management）

**社区评价**: 

> 社区评价呈现两面性。优势：被 Gartner 评为 2025 年 API Management 魔力象限领导者（连续两年），在 Critical Capabilities 报告的 6 个场景中全部进入 Top 5（AI Enablement 排名第 2，Event-Driven & Streaming 获得唯一的 5/5 评分）；Gartner Peer Insights 评分 4.5/5（76 条评论），G2 评分 4.6/5（35 条评论）；客户高度评价其成本效益、多协议支持和客户服务响应速度。劣势：管理控制台 UI 需要改进（多个评论提及调试体验不佳）；Spring Expression Language（SpEL）使用繁琐，缺乏强测试工具；高级功能学习曲线陡峭；某些 AI 功能属于企业版（Enterprise Edition），开源社区版（CE）仅支持基础 REST/SOAP 管理。AI Agent Management 作为相对新功能（2025 年 6 月首发），社区积累的生产实践反馈有限。



### 9. Gate22

_（该类别无确定的字段值）_


### 10. WSO2 AI Gateway（WSO2 AI 网关）

_（该类别无确定的字段值）_


### 11. Plano（原名 Arch Gateway / archgw）

_（该类别无确定的字段值）_


### 12. Docker MCP Gateway

**社区评价**: 

> 优势：Go 语言编译为单二进制、内存占用低、启动快速；容器沙箱隔离提供安全性优势；MCP 协议原生兼容性好；与 Docker MCP Catalog（300+ 服务器）深度集成降低配置复杂度。局限：无内置缓存导致每次工具调用需完整往返；按需启动 MCP Server 容器引入冷启动延迟；无反压（Backpressure）机制处理 MCP Server 过载；功能聚焦于 MCP 协议层面，非通用 AI 网关



### 13. Envoy AI Gateway

**官方性能声明**: 

> 未发布独立的综合性基准测试报告。官方博客提供了以下性能数据：MCP 流量路由基准测试（MacBook Pro M1）：Envoy AI Gateway 经 KDF 迭代调优后延迟约 380-400 微秒（基线无代理约 80 微秒），与 Rust 实现的 Agent Gateway（约 380 微秒）差距可忽略不计（~0.2ms）。控制面扩展基准测试：2,000 条 AIGatewayRoute 规则下，路由就绪延迟约 5 秒（配置轮询间隔），推理延迟无退化，Envoy 代理内存稳定在约 430 MiB


**延迟开销**: 

> 通用 HTTP/REST 路由：P50 约 8.2ms，P99 约 45ms（Envoy Proxy 基准，来自第三方博主 Kirito 测试）。MCP 路由（默认安全配置，100K KDF 迭代）：P50 约 241ms，P90 约 328ms（第三方 SegmentFault 测试），主要瓶颈是 Go ExtProc 侧的 PBKDF2 会话加密。MCP 路由（调优配置，100 次 KDF 迭代）：开销降至约 0.3-2ms，与 Rust 代理差距仅约 0.2ms。流式 ChatGPT API 场景：网关延迟远小于 LLM 推理延迟（秒级），实际影响可忽略


**社区评价**: 

> 优势：基于 CNCF 毕业项目 Envoy 的成熟代理基础设施（十年生产验证），数据面 C++ 性能可靠；无状态 MCP 会话架构（无共享存储依赖）带来运维简洁性和水平扩展能力；功能迭代快速（约每 2-3 个月一次大版本）。劣势：项目相对年轻（2025 年初首次发布），企业级大规模生产案例仍在积累；默认安全配置下的 MCP 会话加密开销较高（需手动调优 KDF 参数）；ExtProc + Go Sidecar 架构相比纯 Rust 数据面有天然延迟开销；核心部署依赖 Kubernetes（CLI 模式仅限开发测试）。第三方评论（SegmentFault）指出默认配置下性能与 Rust 方案差距约 100 倍（调优后可缩小至 15 倍差距）



### 14. GPT-Load

**官方性能声明**: 

> 官方宣称的核心性能特性：零拷贝流式传输（io.Copy透传，无缓冲）、连接池复用（默认最大空闲连接100，每主机50）、原子操作（Redis RPOPLPUSH无锁并发安全轮转）、Go goroutine高并发模型。系统最低128MB内存可运行。单进程可支撑高并发连接。支持分布式主从集群水平扩展。配置了多级超时控制：请求超时默认600秒、连接超时默认15秒、空闲超时默认120秒、响应头超时默认600秒、优雅关闭超时10秒


**社区评价**: 

> 优点：极轻量部署（128MB内存可运行，Docker一键启动）、零损耗透明代理（透传无格式转换开销）、密钥轮转机制高效（Redis原子操作）、支持海量Key管理（v1.4.2起百万级Key优化）、部署灵活（单实例SQLite到集群MySQL/Redis弹性伸缩）、Web管理界面简洁实用、文档完善（中英文双语）。适合管理大量同厂商免费或低成本API Key（如Gemini免费Key）规避限流。常与New API搭配形成完整方案。缺点：功能定位窄（仅做密钥池化和负载均衡，不做格式转换/计费/用户管理）、移动端Web管理UI体验较差、偶有流式响应截断问题（可能与上游相关）、无内置Token计数和成本追踪、密钥导入历史有单次5000条限制（已优化）、SQLite高并发场景可能成为瓶颈（生产建议换MySQL/PostgreSQL）。LINUX DO社区普遍建议：密钥少+多厂商聚合用New API，密钥多用GPT-Load，两者搭配是最佳实践



### 15. Helicone

- **官方性能声明**: AI 网关官方基准测试：P95 延迟 <5-10ms，内存占用约 64MB，吞吐量约 2,000-3,000 RPS，二进制大小约 15-30MB，冷启动时间约 100ms。对比典型 AI 网关（P95: 60-100ms / 内存: 512MB / 吞吐: 500 RPS / 二进制: 200MB / 冷启动: 2s）有显著优势。Cloud 托管版本代理延迟约 30-80ms
- **延迟开销**: AI 网关自身引入的延迟：P95 <5-10ms（Rust 二进制本地部署）。Cloud 托管代理往返延迟约 30-80ms（含 Cloudflare Workers 网络传输）。缓存命中场景下延迟可比直接调用更低。整体延迟开销在 AI 网关品类中属较轻量级。注意：自托管部署下延迟受网络拓扑和基础设施影响
**社区评价**: 

> 优势：一键集成体验最佳（仅改 baseURL 即获完整可观测性），Dashboard UI 设计精良（用户广泛称赞），免费层慷慨（10K 请求/月），Rust AI 网关性能卓越（极低内存和延迟），Apache 2.0 开源可自托管，0% 模型价格加价。劣势：2026 年 3 月被 Mintlify 收购后进入维护模式，新功能开发冻结，长期路线图不确定；不支持 Agent 多层 Span 追踪（扁平请求列表，无父子嵌套），不适合复杂 Agent 工作流；缺少内联 Guardrail（无运行时 PII 脱敏和内容过滤）；缺少优化器闭环（不能基于观测结果自动改进 Prompt 或路由策略）；Prompt 注入检测仅支持 OpenAI 模型。综合评价：适合需要快速低成本上线的轻量级 LLM 可观测性和基础网关路由场景，不适合需要深度 Agent 治理和长期平台演进的团队



### 16. Higress

**官方性能声明**: 

> 官方宣称：① 基于 Envoy C++ 内核支持 100k+ RPS 吞吐量（数十万请求/秒的大规模场景）；② 配置变更毫秒级生效（相比 Nginx Ingress 路由变更生效速度提升十倍）；③ Wasm 空插件性能损耗约 3.8%，限流插件约 15.2%（与原生 Nginx C 模块对比）；④ 结合前缀匹配负载均衡，实测首 Token 延迟（TTFT）下降 50%（240ms→120ms），KV Cache 命中率从 40%+ 提升至 80%+。


**社区评价**: 

> 社区总体评价正面：优点方面，高性能（Envoy 内核、C++ 数据面）、云原生深度集成（K8s Ingress 替代方案、Gateway API 支持）、三合一网关（流量+微服务+安全统一）、多注册中心支持、Dubbo 协议转换被评价为「业界完成度最高」、国内社区活跃（钉群/微信群讨论积极）。不足方面：国际社区规模和影响力有限、插件生态相比 Kong 等成熟网关仍偏少（建设中）、架构较重（Envoy 学习门槛高）、多租户/RBAC 企业级能力待完善、与阿里云 MSE 商业化版本绑定较深存在供应商锁定风险、控制台功能相对基础、非 K8s 独立部署（Docker Compose 模式）仅适合测试非生产使用。



### 17. Langfuse

**官方性能声明**: 

> SDK 客户端侧性能目标：Trace 创建开销 <1ms（实测 P50 0.197ms）、刷新延迟 <100ms、内存占用 <1KB/trace、CPU 开销 <1%。SDK 采用异步 fire-and-forget 批处理架构，对 LLM 调用关键路径零延迟影响。服务端：V3 架构迁移至 ClickHouse 后，Prompts API P99 从 7 秒降至 100ms（70 倍提升）。Dashboard 查询 P99 目标 <1 秒（7 天内）/ <4 秒（更长周期）。经测试可支撑 10K+ spans/秒的摄入吞吐量。


**社区评价**: 

> 优点：开源 MIT 许可、框架无关的 SDK 覆盖广、生产级追踪和评估能力、慷慨的免费云层、活跃的社区和维护、被 19 家 Fortune 50 和 63 家 Fortune 500 使用。缺点：UI/UX 被认为不够完善（'由技术人为技术人打造的工具'）、缺乏实时/主动告警（Alerting feature request #714 自 2023 年 12 月起开放）、Dataset 运行对比功能弱、大批量 Trace 查询速度慢、无离线模式。社区共识：最佳开源 LLM 可观测性平台，但 UI 和主动告警仍是短板。



### 18. LiteLLM

**官方性能声明**: 

> 官方基准测试（4 CPU/8GB RAM, PostgreSQL, 无 Redis）：单实例 475 RPS，P50 延迟 100ms，LiteLLM 自身开销 P50: 3ms、P99: 31ms；4 实例线性扩展至 1,170 RPS，P99: 240ms，自身开销 P50: 2ms、P99: 13ms。GitHub 页面声明：1k RPS 下 P95 延迟 8ms。已代理 10 亿+ 请求，Docker 拉取量 2.4 亿+。与 Portkey 对比基准（4 实例）：总请求 312,405 vs 293,796，P95: 150ms vs 230ms，LiteLLM 在携带数据库的情况下仍优于未加载 DB 的 Portkey。v1.77.7 路由优化后中位延迟降低 2.9 倍（O(M×N) → O(1)）


**延迟开销**: 

> P50 额外延迟：2-3ms（优化场景）、10-22ms（实际生产场景，含认证/限流/DB 查询）。P99 额外延迟：13ms（4 实例理想场景）至 40ms（生产环境），高并发默认配置下可达 240ms。v1.77.7 将中位延迟从 320ms 降至 110ms。aiohttp 传输层切换（PR #11097）将中位延迟降低 97%（2500ms → 74ms）。缓存命中时 P50 从 520ms 降至 45ms（91% 改进）。注意：实际延迟受数据库查询路径影响（认证缓存可大幅减少 DB 调用：8 Pod 场景下 1249 次 DB 调用 → 52 次）


**社区评价**: 

> 优势：社区最活跃的 AI 网关项目（50k+ Stars, 39k+ commits），功能覆盖面广（140+ 提供商支持、多层缓存、20+ Guardrail 集成），企业采用案例丰富（Stripe、Netflix、Adobe、Google ADK、Samsara、Rocket Money、Lemonade），积极的性能优化节奏（多次中位延迟大幅降低的版本发布）。劣势：Python 运行时受 GIL 约束，单进程 RPS 仅约 175（对比 Nginx 15,000+ RPS），高并发需水平扩展大量实例（成本较高）；内存占用较高（约 1.1GB+）；配置复杂度随功能启用而显著增加（模型别名、环境密钥、缓存、重试规则均需仔细管理）；数据库在请求热路径中，持久化和请求处理紧耦合；GitHub Issues 1,400+（体量较大）。综合评价：适合作为 AI 治理层部署在传统网关之后，而不适合直接替代高性能边缘网关



### 19. LobeChat Plugin Gateway（@lobehub/chat-plugins-gateway）

- **官方性能声明**: 无官方性能基准数据。项目 README 及文档中未公开任何吞吐量（RPS）、延迟（P50/P95/P99）或资源消耗（CPU/内存）的性能指标。作为 Vercel Edge Function 部署，理论上利用边缘计算节点的低延迟特性，但无实测数据支持
**社区评价**: 

> 社区影响力极小。项目规模小（25 Stars、14 Forks、98 commits、4 位贡献者），在 LobeChat 生态中属于辅助组件。2023 年 12 月后停止更新，2024 年被 LobeChat 主仓库废弃（PR #13512 移除了整个插件 SDK 和网关系统），功能合并入 LobeChat 主仓库的 builtin 工具执行路径。npm 月下载量约 3.9 万次（主要来自旧版 LobeChat 自托管实例的依赖拉取）。综合评价：作为 LobeChat 早期插件系统的配套组件运行稳定但功能范围极窄，现已进入存档/仅维护模式



### 20. One API

- **官方性能声明**: 官方无具体性能基准数据。项目声明支持'高并发&动态伸缩'（Sealos部署场景）。编译后二进制约40MB，内存常驻约100MB，峰值约300MB，冷启动时间小于1秒。单进程可支撑数万个goroutine并发连接
**社区评价**: 

> 优点：Go性能出色、极致轻量（40MB/100MB）、冷启动快、部署简单、资源占用极低（512MB内存低配VPS可稳定运行）。高并发下goroutine模型优势明显。缺点：默认SQLite高并发易锁库（生产环境建议换MySQL/PostgreSQL）；每个请求伴随3次同步数据库写操作导致并发瓶颈在数据库IO（实测约240-333 RPS上限）；默认HTTP连接池参数保守（MaxIdleConnsPerHost=2）；首屏加载速度慢（前端一次性加载所有数据）。社区普遍建议高并发场景启用Redis缓存+批量更新聚合+调整连接池参数以缓解性能瓶颈



### 21. OptiLLM

**官方性能声明**: 

> 未提供网关自身延迟开销数据，但提供了多项推理质量基准测试：MARS + Gemini 2.5 Flash Lite 在 AIME 2025 上从 43.3% 提升至 73.3%（+30 分），CePO + Llama 3.3 70B 在 Math-L5 上从 51.0% 提升至 69.6%（+18.6 分），MOA + GPT-4o-mini 在 Arena-Hard-Auto 上匹配 GPT-4o 水平，PlanSearch + GPT-4o-mini 在 LiveCodeBench 上提升 20% pass@5。



### 22. TensorZero

**官方性能声明**: 

> 官方基准测试（c7i.xlarge，4 vCPU/8GB RAM）：P99 延迟开销 <1ms（实测 0.94ms @ 10,000 QPS），平均延迟开销 0.37ms @ 10,000 QPS，最大吞吐量 10,000+ QPS 稳定运行，100% 成功率。与 LiteLLM 对比：相同硬件下 LiteLLM 在 1,000 QPS 时完全失败（大量请求超时），TensorZero 在 10,000 QPS 时延迟比 LiteLLM 在 100 QPS 时的延迟低 25-100 倍。Docker 官方镜像：tensorzero/gateway 和 tensorzero/ui


**延迟开销**: 

> P50 延迟开销：<0.37ms（10,000 QPS 下均值）；P99 延迟开销：<1ms（0.94ms @ 10,000 QPS）；延迟直方图（tensorzero_inference_latency_overhead_seconds）可精确度量网关自身处理时间（不含模型调用时间），支持自定义桶配置。得益于 Rust 的原生编译、Axum 异步运行时和无 GC 特性，延迟极低且高度稳定。在 sidecar 模式下几乎感觉不到网关的存在


**社区评价**: 

> 优势：1）性能业界领先 — Rust 编译的网关在 AI 网关性能基准测试中远超 Python/TypeScript 实现，是所有开源 AI 网关中延迟最低的项目之一；2）统一平台理念 — 将网关、可观测性、评估、实验、优化五大功能整合于同一代码库，减少了工具链碎片化；3）数学严谨的实验系统 — Track-and-Stop 多臂老虎机算法和 anytime-valid 统计检验避免了传统 A/B 测试的 p-hacking 问题，识别最优变体速度快 37%；4）Learning Flywheel 闭环 — 生产数据 → 评估 → 优化 → 实验 → 更优模型的正反馈循环；5）完全开源（Apache 2.0）无企业版功能保留；6）创始人负责任地在公司停止运营时退还剩余资金。劣势：1）项目已于 2026 年 6 月 12 日归档，不再维护，仅有社区分支 Agentify Gateway 维持；2）功能覆盖偏窄 — 缺少动态路由、语义缓存、Guardrails 集成、Agent 框架适配等 LiteLLM/Portkey 常见功能；3）UX 受到社区批评 — 有用户反馈'数据模型和 UI 繁琐且不直观'；4）无托管服务 — 纯自托管，运维负担较重（需管理 ClickHouse + PostgreSQL + Valkey + 网关 + UI 五个组件）；5）公司运营仅约 2.5 年后关闭，商业可持续性未验证；6）约 20 家提供商支持远少于 LiteLLM 的 140+ 家。综合评价：适合追求极致推理性能和内置实验优化能力的团队，但项目已停止维护，需评估社区分支的活跃度或考虑其他替代方案



### 23. aisuite

- **官方性能声明**: 无官方性能基准测试或吞吐量声明。作为薄包装层（thin wrapper），aisuite 自身不引入明显的计算开销，性能主要取决于底层提供商 SDK 和网络延迟
- **延迟开销**: 可忽略不计。aisuite 仅对所有请求进行 provider:model 字符串解析 + 消息格式转换（Converters 层），均为轻量内存操作。无独立 HTTP 代理转发延迟（不经过额外网络跳转）。实际延迟由提供商 API 响应时间和提供商 SDK 性能决定
**社区评价**: 

> 优势：以简洁性和易用性获得社区认可（14K+ Stars），API 设计直观（OpenAI 风格），一行代码切换模型，适合快速原型开发和模型对比实验。提供 Agent 工作流支持（max_turns 自动工具循环）和原生 MCP 集成。劣势：缺少生产级功能（无速率限制、负载均衡、缓存、fallback、可观测性集成），不适合直接用于生产环境的 API 网关。部分早期用户反馈功能不完整（如缺少流式支持、Token 使用统计等）。社区普遍将其定位为开发/实验工具而非生产级网关



### 24. New API

- **官方性能声明**: 无官方发布的性能基准数据（如吞吐量 QPS 对比、延迟 SLO 保证等）。官方功能中内置了性能追踪指标（延迟、TTFT、TPS、成功率），但用于模型排名和渠道质量评估，非网关自身性能宣传
- **延迟开销**: 网关层额外延迟约 5-20ms（同地域部署场景），与上游 One API 处于同一量级。因新增功能（数据看板、阶梯定价、格式转换、推理力度分级等），同等条件下 CPU 和内存占用略高于 One API（约 5-10% 资源增量），实际使用中通常可忽略。最低内存需求 512MB-1GB
**社区评价**: 

> 优点：功能极其丰富（格式互转、Midjourney/Suno 媒体接口、在线支付、数据看板），社区活跃（38k+ Stars），在国内生态中已取代 One API 成为主流选择，适合搭建商业化 AI API 运营平台。缺点：更新激进偶尔引入版本不稳定问题（部分版本存在 bug，需关注 Release Notes 后升级），功能丰富带来代码路径更长，极端高并发下理论开销略大于 One API；AGPLv3 协议对闭源商业使用有限制；社区规模虽大但遇到冷门问题可参考的解决方案可能少于 One API



## 治理与合规

### 1. Kong AI Gateway

**多租户支持**: 

> 支持多租户隔离。基于 Consumer 模型（每个开发者/团队/服务定义为 Consumer）配合 Workspace 实现团队级隔离。认证方式包括 Key Auth API Key、OIDC/SSO、ACL 和 RBAC 插件。支持虚拟密钥模式（客户端使用 Kong 颁发的 API Key，真实提供商 API Key 存储于网关内部）。Consumer Groups 支持按租户配置差异化的速率限制和 Token 预算策略。Konnect 平台提供 Teams/RBAC 级别的控制面板权限隔离。注意：Kong 不原生使用'虚拟密钥'术语，对应功能通过 Consumer+credential 加 Key Auth 模式实现，比 LiteLLM/Portkey 的虚拟密钥系统更依赖对 Kong 安全模型的整体理解。


**审计日志**: 

> 提供完整的审计日志能力。Kong Konnect 控制面提供配置变更、策略更新和管理操作的审计日志；AI Proxy Advanced 插件的 log_payloads 选项可捕获请求/响应体到日志；请求级日志可通过插件生态导出到 Datadog、Splunk、HTTP Log 等外部系统；Prometheus 指标包含 consumer、workspace、provider、model 等标签实现请求归属。AI A2A Proxy 插件（v3.14+）提供完整 A2A 对话审计记录用于合规。Metering & Billing 系统提供 Token 消耗审计（支持 Stripe 对接的计费审计）。注意：完整的 AI 特定审计视图（prompt 文本、响应内容、每个 Consumer 的 Token 计数趋势）通常需要将原始数据导入外部工具（Looker/Metabase）构建定制仪表盘。


**预算管理**: 

> 支持多层级 Token/金额预算管理。AI Rate Limiting Advanced 插件支持按总 Token（total_tokens）、输入 Token（prompt_tokens）、输出 Token（completion_tokens）和成本（美元金额）进行速率限制，使用 local/cluster/redis 策略存储。支持全局 Token 预算与单模型子上限组合（如'每日 100 万 Token，GPT-4o 最多 20 万'）。Konnect Metering & Billing 提供基于计划的预算管理：定义功能与费率卡→套餐→订阅→发票→Stripe 支付。Entitlement 机制限制每个计划层级的总 Token/月（如：Starter 50 万、Pro 500 万、Enterprise 无限制）。v3.14+ 支持基于 Consumer Tier 的 dollar budget 限制（如标准层 $10/小时，高级层 $100/小时）。注意：超预算时网关不会自动拦截流量，需通过 Webhook 通知规则在自有基础设施中实现截止。


**数据驻留**: 

> 支持完全本地化部署，满足数据驻留合规要求。支持全本地部署（VM/裸金属/Docker/Kubernetes），所有数据不出企业网络；支持离线/气隙环境部署。2026年5月推出 Dedicated Cloud Gateways，新增新加坡（AWS/Azure）区域控制面，API 和 AI 流量保持在主权边界内，采用单租户基础设施。通过 PII 脱敏插件（AI PII Sanitizer）实现数据匿名化后再发送到云模型提供商的混合模式。具备 RBAC 访问控制、完整审计日志等 GDPR 第 32 条技术和组织措施支持。注意：网关本身不改变模型位置——如果后端是云 LLM 提供商，需要通过本地匿名化+网关代理的混合模式实现真正的数据防泄露。



### 2. Apache APISIX AI Gateway

**多租户支持**: 

> 开源版 APISIX 不具备原生多租户隔离能力。API7 Enterprise（企业版）提供完整的多租户方案：Gateway Groups（逻辑分组，完全隔离的数据平面配置，可按环境/区域/租户划分）、Workspaces（超级管理员可创建多个工作空间并分配细粒度用户权限）、RBAC（基于角色的访问控制，支持组织/网关组/资源级别）。Consumer/Consumer Group 机制提供用户级别的认证和配额管理


- **审计日志**: 开源版 APISIX 无内置审计日志功能。API7 Enterprise（企业版）提供完整审计日志：记录所有 CREATE/UPDATE/DELETE 操作（操作者/时间/操作类型/目标资源/前后差异对比），敏感数据（密码等）自动脱敏后保存，默认保留 60 天（可配置），日志防篡改，支持导出到 SIEM 平台进行集中分析。企业版已通过 SOC 2 Type 1 审计
**数据驻留**: 

> 开源 APISIX 支持本地化部署（裸金属/VM/K8s on-premise），数据不出本机/本地集群，满足基础数据驻留需求。API7 Enterprise 额外提供：Multi-Layer Network 按地域路由流量（根据 Cookie/Header 将不同地区用户路由到对应区域的数据平面，确保数据驻留合规）；通过 GDPR 合规审核、SOC 2 Type 1 审计、FIPS 140-2 标准；数据加密（AES-256 加密敏感字段、mTLS 保护 CP-DP 通信）；支持国产化部署（华为鲲鹏 ARM64、麒麟 OS、openEuler），满足中国数据安全法合规要求



### 3. Portkey

- **多租户支持**: 支持完整的多租户隔离：工作区（Workspace）级别组织隔离；团队（Team）级别协作；虚拟密钥（Virtual Keys）按团队/项目/用户分配，每密钥可绑定独立的速率限制、使用策略和预算上限；RBAC 细粒度角色权限（管理员/成员/只读）；企业版支持多工作区（Multi-Workspace）跨组织治理
- **审计日志**: 企业版提供合规级审计日志，可记录：谁（用户/API Key）、何时（时间戳）、调用什么模型、消耗多少 Token、执行了哪些工具/MCP 调用；支持日志导出至外部后端；完整请求/响应负载记录与元数据关联；SOC2 Type 2 / HIPAA / GDPR 合规认证（企业版）
- **预算管理**: 支持多级预算管理：按虚拟密钥设置 Token 或美元金额硬性上限，超预算立即返回 429 状态码；使用策略在请求入口级执行（Ingress Enforcement），确保预算在调用模型前即被检查；支持预算告警通知；企业版按团队/项目进行预算归因和追踪
**数据驻留**: 

> 支持完整的数据本地化部署：完全气隙（Air-Gapped）部署模式下，100% 组件和数据留在客户环境（含指标数据）；混合部署（Hybrid）模式下数据平面在客户 VPC，控制平面由 Portkey 托管；支持 AWS/Azure/GCP/OpenShift/Kubernetes 私有化部署；企业版提供 SOC2 Type 2、HIPAA、GDPR、CCPA 合规认证；支持 AWS KMS 加密密钥管理



### 4. Bifrost

**多租户支持**: 

> 完整的多租户隔离架构，支持四级组织层级：Customer（组织级）→ Team（部门级）→ User（用户级，含 SSO 和个人预算）→ Virtual Key（API 级租户凭证）。虚拟密钥是核心治理实体：每个虚拟密钥可配置独立的提供商/模型白名单、底层 API 密钥权重、独立预算和速率限制、MCP 工具访问范围。企业身份集成：OIDC/OAuth SSO（Okta、Microsoft Entra ID、GitHub、Google）、RBAC 角色权限控制、IdP 群组自动同步团队、访问配置文件（Access Profiles）自动为每个用户生成虚拟密钥实现用户级隔离。支持即时撤销任何层级的访问权限。


**审计日志**: 

> 不可变审计追踪系统，提供四类审计报告：Access Audit（用户登录/登出/认证失败/权限提升/异常模式）、Usage Audit（API 请求/模型使用/预算消耗/速率限制违规）、Data Audit（数据访问/修改/导出/删除/同意管理）、Compliance Reports（SOC 2 Type II/GDPR/ISO 27001/HIPAA 合规证据）。支持 PDF/CSV/JSON 多格式导出，可按日期范围/用户/团队/客户/模型/提供商/事件类型过滤。提供 REST API（/api/enterprise/audit/reports）程序化报告生成。持续监控配自动告警（Email/Slack/Webhook）。合规仪表盘实时展示安全评分、合规健康检查、风险评估和近期活动。


**预算管理**: 

> 四级分层预算体系：Customer → Team → Virtual Key → Provider Config。每级预算独立检查，所有适用级别同时扣减，任一级别余额不足即阻断整个请求。支持金额预算（如 $50/月）和 Token 预算。灵活重置周期：1 分钟/1 小时/1 天/1 周/1 月/1 年，含日历对齐模式（按 UTC 日历边界重置）。提供商级预算：同一虚拟密钥内可为不同提供商设独立预算上限（如 OpenAI 70% 权重+$50/月，Anthropic 30% 权重+$30/月），超出后自动 Fallback。超预算行为：可配置为告警或直接阻断请求。


**数据驻留**: 

> 支持多种数据本地化部署方案确保数据驻留合规：1）VPC 内部署：完全在客户的 AWS/GCP/Azure 私有云内运行，所有数据处理在受控环境内完成，无外部依赖；2）气隙（Air-Gapped）部署：完全离线运行，零外拨连接，零遥测，Docker 镜像通过物理介质传输加载到内网私有仓库；3）自托管：完全自主可控基础设施部署。声明合规框架覆盖：GDPR（数据主权/技术和组织措施/审计/访问与删除权）、SOC 2 Type II、HIPAA、ISO 27001。支持多区域部署以实现数据地理定位，所有 prompts/completions 和源代码不离开受控网络边界。



### 5. kgateway

**多租户支持**: 

> 通过 Kubernetes 命名空间实现租户级资源隔离。通过独立 Gateway 实例实现流量隔离和独立配额管理。支持按用户（X-User-ID / API Key）的身份识别和配额管理。支持虚拟密钥（Virtual Key）机制按用户签发独立 API Key。CEL 策略引擎可基于租户/用户身份进行细粒度访问控制。agentgateway 联邦层允许不同团队暴露不同 MCP Server 并在统一策略管控下共享基础设施


**预算管理**: 

> 支持 Token 级硬上限（按用户/时间窗口配置 Token 配额，到达上限返回 HTTP 429）。通过 Prometheus AlertManager 设置预算阈值告警（如日消费超 $100 触发告警）。支持 PromQL 自定义成本公式实现按用户/团队的金额预算监控。流式请求中预算为软限制（当前请求即使超预算仍完成，后续请求被阻止）。响应头包含速率限制信息（x-ratelimit-limit/remaining/reset）。无原生内置的分级预算审批流程或充值机制



### 6. agentgateway

- **多租户支持**: 通过虚拟密钥实现多租户隔离：按租户 ID（tenant_id）+ 用户 ID（user_id）签发独立 API Key，每个密钥绑定独立 Token 预算和配额；支持按用户/团队的 Token/请求量限额；CEL 策略引擎可基于租户身份进行细粒度访问控制；联邦层（federation layer）允许不同团队暴露不同 MCP Server 并在统一策略管控下共享基础设施
**预算管理**: 

> 支持按用户/租户的 Token 和金额预算：预算通过 Token 限流 + 价格计算实现，硬上限到达后返回 HTTP 429；支持多种刷新间隔（秒/分钟/小时/天）；可通过 Prometheus AlertManager 设置预算阈值告警（如日消费超 $100）；流式请求中预算为软限制（当前请求即使超预算仍完成，后续请求被阻止）；响应头包含 x-ratelimit-limit/remaining/reset 信息



### 7. Lunar MCPX（Lunar MCP Gateway）

**多租户支持**: 

> 支持Consumer级别隔离（开源版），通过Consumer Tags（x-lunar-consumer-tag HTTP头）区分不同消费者身份，配合ACL YAML实现per-consumer工具访问控制。企业版提供更完整的多租户：集中用户管理+SSO、Groups（团队分组）、Profiles（角色和工具集映射）、每个身份独立隔离的专用网关集群（Dedicated Gateway Clusters per Identity）。虚拟密钥由企业版Secret Management提供。


- **审计日志**: 开源版提供结构化持久审计日志，跟踪Agent工具使用行为和配置变更。企业版提供Full Auditability（不可变审计跟踪），包含所有Prompt负载、工具响应和使用归属的完整记录。审计日志可区分谁/何时/调用什么工具/执行了哪些操作。

### 8. Gravitee Agent Mesh（现称 Gravitee AI Agent Management）

**多租户支持**: 

> 支持多租户隔离机制。组织（Organization）→ 环境（Environment）→ 团队（Team）→ 应用（Application）→ 订阅计划（Subscription Plan）的层级模型实现租户隔离。每个 Agent 拥有独立的可验证身份（非共享服务账号），支持按 Agent 粒度撤销而不影响其他 Agent。OAuth 2.1 + PKCE 的短生命周期 Token 替代静态 API Key，支持动态客户端注册（DCR）。基于 Plan/Subscription 机制为不同租户配置差异化的速率限制和 Token 预算策略。OpenFGA 关系型访问控制（ReBAC，v4.10+）实现工具级权限颗粒度（如 agent-alpha 可为 customer-123 调用 tool:get_orders）。仅企业版提供完整多租户功能。


**审计日志**: 

> 提供多层审计日志体系：OpenTelemetry 原生 Span 携带 Agent 身份、工具名称、策略决策和成本字段，形成跨 LLM/MCP/A2A 的可审计链路图谱；Kafka 审计报告（AM 4.10+）支持将选定的审计事件类型推送到 Kafka 集群，对接 SIEM 系统；PERMISSION_EVALUATED 审计条目（v4.10 新增）捕获每次 AI 授权决策的完整请求/响应负载；传统 API 管理审计日志覆盖配置变更、策略更新和管理操作。每个 Tool 调用均可追溯到特定 Agent 身份 → OAuth Client → 注册的 MCP 应用，消除传统'服务账号做了所有事'的黑盒问题。



### 9. Gate22

**多租户支持**: 

> 支持多租户隔离：（1）Organizations → Projects 两级租户层级 — Organizations 为顶级隔离单元，Projects 为次级组织单元；（2）PropelAuth 提供多租户用户认证和权限管理；（3）RBAC — 基于角色的访问控制，管理员与开发者分离；（4）虚拟密钥/凭证模式 — 管理员可为同一 MCP 服务器设置「组织共享」或「按用户独立」两种凭证模式；（5）Bundle 机制 — 每个 Bundle 生成独立的远程 MCP 端点 URL，当前仅对创建者可见（私有），路线图规划团队/工作空间内共享


**审计日志**: 

> 审计日志是 Gate22 的核心设计原则之一：（1）设计声称「每次调用均被审计」；（2）近期路线图 — 工具调用日志（谁/什么/何时/结果/延迟）+ 导出功能；（3）近期路线图 — MCP 工具变更审计（服务器刷新时持久化差异，可搜索历史）；（4）远期路线图 — SIEM 导出、不可变审计日志；（5）ACI.dev 云端版提供实时监控和流式日志，可配置日志保留策略。当前 v0 版本审计日志功能尚未完全产品化


- **预算管理**: 远期路线图（RFC 阶段），尚未实现。规划功能包括：按用户/团队/应用/函数的配额与预算管理，超预算告警或截断。ACI.dev 平台侧已有 Stripe 计费集成（订阅付费），但未整合到 Gate22 的工具级预算管控中
- **数据驻留**: 支持数据本地化部署。Gate22 为 100% 开源（Apache 2.0），可完全自托管部署于私有基础设施。后端使用 PostgreSQL 数据库存储所有配置、凭证和审计数据，前端可部署于 Vercel 或自有 Node.js 服务器。支持 on-premises 部署，满足数据驻留合规需求（GDPR/数据安全法等）。ACI.dev 云端版已通过 SOC 2 合规认证

### 10. WSO2 AI Gateway（WSO2 AI 网关）

- **多租户支持**: 是，完整多租户隔离：支持租户级隔离、按租户使用量计费、租户自定义策略；支持订阅级配额管理和虚拟密钥；租户可通过 API 控制面独立管理 AI 服务订阅和应用；支持团队/项目/用户多级隔离
- **审计日志**: 是，完整审计日志体系：记录谁（用户/Agent 身份）、何时（时间戳）、调用什么模型/工具、消耗多少 Token、执行了哪些操作；支持 ELK Stack、Splunk、Prometheus 集成；API 变更审计追踪；WebSocket 访问日志和调试日志可路由到集中式监控系统
- **预算管理**: 是，支持多层预算管控：（1）后端级别成本上限（单次请求 max prompt/completion/total tokens）；（2）消费者级别 Token/金额预算；（3）订阅级别配额；（4）团队/项目级别 Token 智能分配；（5）时间窗口预算（每分钟/每小时/每天）。支持趋势分析和消费预测，防止失控 LLM 支出
- **数据驻留**: 是，支持完全本地化部署：数据面（含 AI 流量和可观测性数据）可在自有基础设施运行，确保数据不离开组织网络边界；GDPR 合规：内置伪名化映射系统，支持'被遗忘权'；HIPAA/PSD2 合规框架支持；可通过部署区域控制数据处理地理位置；WSO2 公开次级处理商列表供合规审查

### 11. Plano（原名 Arch Gateway / archgw）

_（该类别无确定的字段值）_


### 12. Docker MCP Gateway

**多租户支持**: 

> 通过 Profile/WorkingSet 机制实现配置级隔离（不同的 Profile 可配置不同的 MCP Server 集合和工具白名单）；支持 OAuth 2.1 服务级认证（每个 MCP Server 独立认证）和 Dynamic Client Registration (DCR)；Policy System 可在服务器/工具/提示词级别实现访问控制；但非传统多租户架构（无独立的团队/项目/用户级租户管理、无虚拟密钥、无租户级配额管理）


- **审计日志**: `--log-calls` 标志启用 MCP 工具调用日志（记录谁、何时、调用什么工具）；Policy System 所有评估（Allow/Block/Warn）均生成审计事件（含 Action 类型、资源标识、决策结果、时间戳）；Zap 结构化日志支持 Trace ID 关联（可将单次请求的日志、追踪、指标串联）；OpenTelemetry 分布式追踪提供完整的调用链可视化
**数据驻留**: 

> 支持完全自托管部署（本地物理机、私有云、混合云环境）；可配置私有 MCP Catalog（fork 官方 Docker MCP Catalog + 自有 OCI 容器注册表）；所有 MCP 工具调用和数据流经自托管 Gateway 实例；密钥存储在 OS 原生密钥链（Docker Desktop Secrets Engine）不从外部传输；支持 GDPR/中国数据安全法等数据驻留合规要求的本地化部署



### 13. Envoy AI Gateway

- **多租户支持**: 支持多租户隔离。每个 API 密钥解析为对应的所有者、项目和团队；支持 100+ 租户的独立配置；各租户拥有独立的 Token 配额（按用户、按模型、按时间窗口）；支持基于角色的模型和提供商访问控制（每个租户仅可见被授权的模型）；租户间策略和配置完全隔离
**审计日志**: 

> 支持完整的审计日志能力。每条请求输出结构化 JSON 访问日志，记录：团队、Agent、模型、提供商身份，Token 用量（输入/输出），延迟（含 TTFT），重试次数，最终状态码，请求与响应模型（追踪原始请求模型与实际后端服务模型的差异）。OpenTelemetry 原生：每个请求自动生成 Trace Span，无需 Agent 代码插装。支持 OpenInference 格式，可对接 Arize Phoenix、Kibana、Elastic 等合规审计工具。日志输出到可配置的 Sink（Prometheus、Grafana、Elastic 等）


**预算管理**: 

> 支持按用户/团队/项目的 Token 和成本预算管理。通过 Usage-based Rate Limiting 实现消费硬限制（超预算请求返回 HTTP 429，在实际调用前拦截）。支持预算模板（标准化配置，可分配给不同团队/场景）；支持使用量告警（团队接近预算阈值时通知）；支持成本归属（花销归属到特定团队、项目）；支持按用户/API 密钥的细粒度限制；支持时间窗口配额（日/周/月）。通过结构化日志聚合实现花销汇总报告


**数据驻留**: 

> 架构层面支持数据本地化部署，但不作为一级功能明确文档化。通过两层网关架构（Tier-1 中心化 + Tier-2 内部集群）实现：Tier-2 网关可部署在私有云/本地数据中心，将敏感流量路由到自托管模型（通过 KServe 集成 vLLM、HuggingFace TGI），确保推理数据不离开组织控制的基础设施。支持在任何云环境或本地部署。Tetrate 治理页面提到支持 GDPR 等法规合规框架的风险管理，但数据驻留相关配置需组织根据具体合规要求自行实施



### 14. GPT-Load

**多租户支持**: 

> 分组级别多租户隔离：通过分组（Group）机制实现不同租户的密钥池、配置和统计隔离。每个分组可独立配置代理密钥、模型重定向规则、请求头规则、超时参数、黑名单阈值等。支持聚合分组（Aggregate Group）将多个子分组的流量按权重统一分发。官方应用场景包含多租户服务（租户隔离、配置自定义、用量统计）。不原生支持用户认证、团队/项目/工作空间级别的层级租户体系。无虚拟密钥重映射机制（即无法对外暴露统一API Key并在后端映射到不同租户）



### 15. Helicone

**多租户支持**: 

> 支持组织和用户维度的请求隔离。通过自定义属性（Helicone-Property-* Header）实现多租户数据切分，可将不同团队/用户/项目的请求标记不同属性值，在 Dashboard 中按属性筛选。支持按用户 ID（Helicone-User-Id）进行请求归属。Enterprise 版支持组织级隔离。不支持传统 RBAC 多租户（无独立团队/项目/用户层级管理、无团队级配额和速率限制管理界面、无组织管理员角色）。多租户能力主要依赖 Header 标记 + 数据筛选，而非系统级隔离


**审计日志**: 

> 每次请求自动记录详细信息：谁（Helicone-User-Id）、何时（时间戳）、调用什么模型（model 字段）、消耗多少 Token（prompt/completion/total tokens）、花费多少成本（美元）、延迟、请求/响应内容（可选存储）。会话级聚合（多轮对话归组）。支持 Dashboard 查询和 HQL（Helicone Query Language）高级过滤。无独立管理审计日志（不记录密钥创建/更新/删除、团队变更、配置修改等管理操作）。审计数据存储于 ClickHouse（分析）和 PostgreSQL（元数据）


- **预算管理**: 支持预算告警功能。可按成本阈值（美元）、Token 使用量、时间窗口设置告警。支持按自定义属性过滤告警（如特定租户超预算时通知）。告警触发后发送通知。不支持硬预算止付（超预算不自动拦截请求），不支持按用户/团队/项目的独立预算额度设置，不支持临时预算提升。预算管理为被动告警模式，非主动门控模式
**数据驻留**: 

> 支持数据本地化部署。自托管模式：完整平台（含 Web UI、API、ClickHouse、PostgreSQL、MinIO）部署在用户自有基础设施上，所有提示词和响应数据不经过第三方服务器。Cloud 托管版支持美国和欧盟两个数据区域选择，满足 GDPR 数据驻留要求。支持 Omit Logs（不存储请求/响应体内容）、异步日志（仅记录元数据不记录内容）以满足严格合规需求。获取 SOC 2 Type II、HIPAA、GDPR 合规认证。Enterprise 版支持 SAML SSO、专用实例部署。自托管架构简化为 4 个核心容器（主应用 + ClickHouse + 认证 + 邮件），T2 中型 EC2 即可支持 90% 工作负载



### 16. Higress

_（该类别无确定的字段值）_


### 17. Langfuse

**多租户支持**: 

> 支持 Organization → Project 两级多租户模型。Organization 为顶层管理/计费单元，Project 为操作隔离单元（API Key、Traces、配置按 Project 隔离）。组织级 RBAC 角色：Owner、Admin、Member、Viewer、None（MIT 免费提供）。项目级细粒度 RBAC（按项目分配角色）：企业版/Teams 附加包提供。Langfuse Cloud 为逻辑隔离；严格基础设施级隔离推荐自托管专用部署。


**审计日志**: 

> 企业版（Enterprise，$2,499/月）独有功能。记录 30+ 资源类型的不可变审计记录：API Key、Prompt、Trace、Score、Dataset、组织/项目成员变更、计费变更等。区分用户发起和 API Key 发起的操作。捕获谁（who）、什么（what）、何时（when）、何地（where）、完整的前/后状态（before/after state）。支持按时间和项目过滤、分页查看。需要 auditLogs:read 权限（通常为 Owner/Admin）。


**数据驻留**: 

> 支持完整的数据本地化部署。Langfuse Cloud 提供三个专用数据区域：EU（爱尔兰，AWS eu-west-1）、US（俄勒冈，AWS us-west-2）、JP（东京，AWS ap-northeast-1），以及 HIPAA 合规区域（US HIPAA）。各区域数据、用户账户和基础设施完全隔离。GDPR 合规：提供数据处理协议（DPA）、数据脱敏/保留/删除功能、SOC 2 Type II 和 ISO 27001 认证。自托管可完全离线/气隙（air-gapped）部署，满足最严格的数据主权要求。



### 18. LiteLLM

**多租户支持**: 

> 四层多租户隔离架构：组织（Organization，Enterprise 版）→ 团队（Team，OSS 支持）→ 用户（User，OSS 支持）→ 虚拟密钥（Virtual Key，OSS 支持）。每层独立配置：模型白名单/黑名单、预算限制、速率限制（RPM/TPM）、IP ACL 范围限制。虚拟密钥支持用户级和团队服务账号两种类型。支持多管理员角色：Proxy Admin（全局）、Org Admin（组织级）、Team Admin（团队级）、Viewer（只读）。SSO/SCIM 用户自动同步（Enterprise 版，支持 Okta/Azure AD/Google Workspace）。JWT/OIDC 联邦认证


**审计日志**: 

> 多层次审计能力：1）管理审计日志（Enterprise 版）：记录每次管理操作（密钥/团队/用户/模型的创建、更新、删除、重新生成），含 changed_by、before_value、updated_values 字段；2）已删除密钥/团队日志：保留删除实体的花费、预算、删除时间戳和操作者信息；3）Spend 日志（LiteLLM_SpendLogs 表）：请求级追踪，含 API 密钥、用户、团队维度；4）属性管理变更：支持 LiteLLM-Changed-By Header 归因操作到具体用户。审计数据持久化到 PostgreSQL 数据库，不可变花费历史用于成本分摊（Chargeback/Showback）


**预算管理**: 

> 全层级预算控制：组织/团队/用户/密钥/标签五个维度均可设置预算。支持 Token 预算（总 Token 数）和金额预算（美元）。硬限制：超预算立即拦截请求（返回 402）。软预算：达到告警阈值发送邮件通知。临时预算提升：时间限制的临时额度提升（time-boxed）。模型级预算：按虚拟密钥设置特定模型预算。实时花费追踪：每次请求后异步更新花费计数器，阻塞发生在预算超限时。Prometheus 指标暴露 litellm_remaining_api_key_budget 和 litellm_remaining_team_budget 仪表盘。支持按密钥/团队/标签/模型编程查询花费报告


**数据驻留**: 

> 完全支持数据本地化部署：开源版 LiteLLM 完全在用户自有基础设施上运行，所有提示词和响应数据不经过 BerriAI 或任何第三方服务器。支持多区域部署架构（Enterprise 版控制平面）。每团队独立日志路由：可将不同团队的日志路由到各自的 Langfuse 项目或独立的可观测性回调（满足 GDPR/数据安全法隔离要求）。支持按团队禁用日志记录（GDPR 退出选项）。日志可导出到 GCS/Azure Blob Storage 进行合规持久存储。密钥外部化管理：集成 AWS KMS、Azure Key Vault、HashiCorp Vault、CyberArk。自托管模式满足 SOC 2/GDPR/HIPAA 等合规需求（需用户自行验证和配置）



### 19. LobeChat Plugin Gateway（@lobehub/chat-plugins-gateway）

- **多租户支持**: 不支持。网关无多租户隔离架构设计。认证仅通过 LOBE_CHAT_AUTH_HEADER 做简单的请求来源验证，不区分组织/团队/用户/项目级别。无虚拟密钥管理、无配额分配或无租户级别的资源隔离
- **预算管理**: 不支持。网关不涉及 Token 或金额的计量，因此无预算设置、超预算告警或截断机制。无 Token 预算或金额预算的管理功能
- **数据驻留**: 部分支持。作为 MIT 开源项目，用户可通过 Vercel 一键部署自托管实例或通过 npm 包在自有 Next.js 项目中嵌入网关，实现数据的本地化控制。但网关本身无数据驻留合规相关的专门设计（如无多区域部署、无 GDPR 退出选项、无数据导出/删除 API）。插件的请求数据可能经由网关转发时经过 Vercel Edge 节点，用户需自行评估合规性

### 20. One API

- **多租户支持**: 支持多层级租户隔离：用户分组管理（为不同分组设置不同倍率，实现差异化定价）、渠道分组管理、令牌级别隔离（每个API Key独立设置过期时间、额度上限、允许IP范围白名单、允许访问的模型列表）、系统管理员全局管理。支持虚拟密钥机制：对外提供统一API Key，后端自动映射到多渠道。支持主从多机部署架构。租户粒度覆盖用户/分组/令牌级别，不原生支持项目/工作空间级别隔离

### 21. OptiLLM

_（该类别无确定的字段值）_


### 22. TensorZero

**多租户支持**: 

> 支持三级多租户隔离：1）命名空间（Namespaces）：可为特定租户（如客户）限制可访问的模型和凭证，非匹配命名空间的推理请求将被拒绝；2）API 密钥作用域（Key Scoping）：每个 API 密钥可独立配置速率限制、模型访问权限；3）Gateway Relay 多团队架构：各团队运行独立边缘网关（管理各自的 prompts/functions/metrics/experiments），中继网关集中执行组织级认证和速率限制。支持按标签（tags）的多维度使用量追踪和速率限制隔离。不包含传统的 Team/Organization/User 层级 RBAC 角色权限管理


**预算管理**: 

> 通过速率限制系统实现预算控制：1）cost_per_hour / cost_per_day / cost_per_week / cost_per_month：按美元成本的硬性限制，超限立即拒绝请求；2）预借用（pre-borrowing）机制：使用 max_tokens × default_cost 预估消耗并预占额度，调用完成后按实际成本调整；3）按 API 密钥和标签（如 user_id）的作用域独立设置预算；4）always = true 规则无条件执行全局预算限制。注意：TensorZero 的预算管理本质上是速率限制的 cost 维度，而非独立的、含告警通知、临时提升、多级审批的预算管理系统。超预算行为是请求被拒绝（返回错误），而非发送邮件告警或软限制


**数据驻留**: 

> 完全支持数据本地化部署：所有组件（网关 + UI + ClickHouse + PostgreSQL + Valkey）均在用户自有基础设施上运行，无任何数据经过 TensorZero 公司或第三方服务器。支持 ClickHouse 和 Postgres 两种数据库选择，数据完全由用户控制。支持气隙（Air-Gapped）部署。但未发现 TensorZero 宣称或取得 SOC 2、HIPAA、GDPR、PCI DSS 等正式合规认证。无按地理区域的数据路由或数据驻留策略配置功能



### 23. aisuite

- **多租户支持**: 不支持。aisuite 作为客户端库，无多租户隔离、团队/项目/用户级别管理、虚拟密钥或配额管理能力。所有 API Key 通过环境变量全局配置，无法在单实例内区分不同租户
- **审计日志**: 不支持。无内建的审计日志能力（谁/何时/调用什么模型/消耗多少 Token）。Agent 场景下的 Artifacts & tracing 可记录 Agent 执行步骤，但这是开发调试用途而非企业审计
- **预算管理**: 不支持。无按用户/团队/项目的 Token 或金额预算设置、超预算告警或截断能力。成本控制完全依赖各提供商的原生计费系统和用户自行管理
- **数据驻留**: 部分支持。通过 Ollama 本地模型运行可实现完全数据本地化，数据不离开用户设备。OpenCoworker 桌面应用支持 BYO API Key 或全本地 Ollama 模式。但无显式的数据驻留策略配置、GDPR 合规功能或跨区域数据路由控制

### 24. New API

- **多租户支持**: 完整多租户管理体系：令牌分组隔离（不同 Token 绑定不同用户组）、用户组级别模型白名单/黑名单、独立配额与有效期控制、IP 白名单限制、用户级个体倍率（优先级高于分组倍率）。支持管理员全局视图与用户自身视图分离。三级倍率体系实现不同租户差异化计费
**审计日志**: 

> 完整审计日志能力：记录每次 API 请求的 UserId、Username、CreatedAt（Unix 时间戳）、Content（摘要/错误文本）、RequestId、UpstreamRequestId、PromptTokens、CompletionTokens、Quota（消耗配额点数）、UseTime（请求耗时秒数）。日志类型分类：消费日志（LogTypeConsume）、错误日志（LogTypeError）、充值日志（LogTypeTopup）、退款日志（LogTypeRefund）。管理员可全局查看（GetAllLogs），用户可查看自身日志（GetUserLogs）。支持按时间戳清理历史日志（DeleteHistoryLogs）以管理数据库大小


**数据驻留**: 

> 完全私有化部署架构（Docker/Docker Compose），所有数据存储在自建数据库中（可选 SQLite 本地文件存储、MySQL 或 PostgreSQL）。无数据经过第三方服务。项目声明要求面向公众提供服务时，使用者须自行完成《生成式人工智能服务管理暂行办法》等法规要求的备案、许可、内容安全审核、实名认证、日志留存、税务及上游 API 授权等合规义务。不提供 GDPR/数据安全法等特定法规的内置合规工具



## 内容安全

### 1. Kong AI Gateway

**Prompt 注入防护**: 

> 提供多层 Prompt 注入防护体系：AI Prompt Guard（基于正则的允许/拒绝列表，阻止匹配拒绝模式的请求）；AI Semantic Prompt Guard（v3.10+，基于语义的智能检测，超越正则匹配理解语义意图）；AI Azure Content Safety（集成 Azure AI 内容安全）；AI AWS Guardrails（验证 Prompt 注入）；AI GCP Model Armor（检测越狱尝试）；AI Custom Guardrail（v3.14+，集成任意第三方护栏 API，如 NVIDIA NeMo Guardrails，支持输入和输出双端防护）；第三方集成包括 CrowdStrike AIDR（宣称对 Prompt 注入攻击防御效力 > 99%）和 Pangea AI Guard（使用'recipe'组合多个检测器，包括代码注入检测、乱码检测、异常语言检测等混淆向量）。所有防护均在网关层强制执行，无需修改应用代码。


**PII 脱敏**: 

> 支持。AI PII Sanitizer 插件（Kong Gateway 3.10+）提供输入和输出双侧的敏感信息检测与脱敏。支持预构建脱敏模型，检测类型包括：SSN（社保号）、信用卡号、邮箱地址、电话号码、银行账户信息、驾驶证号、国民身份证号、医疗数据、加密货币地址、IP 地址、自定义正则模式等。脱敏模式支持三种方向：INPUT（仅输入脱敏）、OUTPUT（仅输出脱敏）、BOTH（双向脱敏）。脱敏方式选项：占位符替换（如 <US_SSN>）或合成数据生成。block_if_detected 选项可完全拒绝包含 PII 的请求并返回 400 报文中检测到的 PII 类型。skip_logging_sanitized_items 控制器防止脱敏数据出现在日志中。第三方集成（CrowdStrike AIDR / Pangea AI Guard）额外支持 50+ PII 类型及格式保留加密（FPE）、哈希和部分掩码。仅企业版提供。


**内容审核**: 

> 支持多重内容审核机制：AI Azure Content Safety 插件（在代理前审核消息，检测仇恨言论、暴力、自残和性内容）；AI GCP Model Armor（检测仇恨言论、色情内容、骚扰和越狱尝试）；AI AWS Guardrails（验证请求和响应的内容安全违规）；AI LLM as Judge（评估 LLM 输出的准确性和安全性）；CrowdStrike AIDR / Pangea AI Guard 第三方集成（检测毒性、暴力、自残、亵渎、角色扮演、特定主题（武器/政治）和 100+ 种口语）。支持自定义安全策略（通过模式匹配和语义分析定义组织的可接受使用范围）。所有审核在网关层执行，不依赖应用层代码。



### 2. Apache APISIX AI Gateway

**Prompt 注入防护**: 

> ai-prompt-guard 插件提供基于 PCRE 正则表达式的 Prompt Injection 检测与防护。支持 allow 白名单模式（仅允许以 what/how/why/explain/summarize/translate 等开头的查询）和 deny 黑名单模式（拦截 'ignore all previous instructions'、'reveal system prompt'、'bypass guardrails'、'developer mode' 等已知注入和越狱短语）。可配置 match_all_roles（是否检查所有角色消息，默认仅检查用户消息）和 match_all_conversation_history（是否检查全量对话历史，默认仅检查最新消息）。违规请求在网关层直接返回 HTTP 400 拒绝


**PII 脱敏**: 

> ai-request-rewrite 插件提供双向（请求侧 + 响应侧）PII 检测与脱敏。利用配置的下游 LLM（支持 OpenAI/DeepSeek/Anthropic/Gemini/Vertex AI 等）对用户输入中的敏感信息进行识别和脱敏：邮箱 → [REDACTED_EMAIL]、电话号码 → [REDACTED_PHONE]、支付卡号 → [REDACTED_CARD]、政府 ID（SSN/护照/驾照等）→ [REDACTED_ID]。在请求到达上游 LLM 前完成脱敏，同时在 LLM 输出返回前进行响应侧过滤。API7 Enterprise 额外提供 data-mask 插件进行日志级别的 PII 脱敏（脱敏 Header/Body/Query 参数）但不修改实际流量


**内容审核**: 

> 提供两个内容审核插件。（1）ai-aws-content-moderation：集成 AWS Comprehend，对 Prompt 内容进行 6 类毒性评分：PROFANITY（脏话）、HATE_SPEECH（仇恨言论）、INSULT（侮辱）、HARASSMENT_OR_ABUSE（骚扰霸凌）、SEXUAL（色情内容）、VIOLENCE_OR_THREAT（暴力威胁）。每类可独立配置 0-1 阈值，另有全局 moderation_threshold 提供总体毒性截断。（2）ai-aliyun-content-moderation：集成阿里云内容安全服务。推荐与其他安全插件组合形成多层防线



### 3. Portkey

**Prompt 注入防护**: 

> 多层 Prompt Injection 防护机制：Qualifire 专用 SLM 检测模型实时检测注入/越狱/上下文篡改攻击；Prisma AIRS（Palo Alto Networks 集成）阻断角色扮演攻击、载荷拆分、混淆和对抗后缀等高级注入；Prompt Security 集成扫描和清理用户提示；Lasso Security 'Deputies' 实时行为异常检测引擎；正则表达式验证器和 JWT 验证器作为确定性防护补充


- **PII 脱敏**: 输入和输出双侧 PII 检测与脱敏：Qualifire 原生 PII 检测作为核心护栏检查项；Prisma AIRS 防止 PII、密钥、信用卡数据、机密信息意外泄露；Prompt Security 提供敏感数据和密钥检测器，支持可选的自动脱敏（Redaction），在数据到达模型前完成 PII 清理；Lasso Security 双向检测提示和响应中的敏感数据泄露
- **内容审核**: 多层次内容安全审核：Qualifire 护栏原生过滤不当/有毒/有害内容；Prisma AIRS 阻断模型生成恶意软件、恶意 URL、有毒内容等不安全输出；Prompt Security 包含有害内容审核器，覆盖仇恨言论、色情内容、非法活动等类别；Lasso Security 监控有害内容并执行组织策略和监管标准；Portkey 内置不安全内容过滤器（基于 LLM 分类器）；支持自定义安全策略配置

### 4. Bifrost

**Prompt 注入防护**: 

> 通过 Guardrails 系统提供多层 Prompt 注入防护。支持六大防护提供商：1）AWS Bedrock Guardrails：Prompt 攻击检测，识别直接注入和越狱尝试；2）Azure Content Safety：Jailbreak Shield（输入）+ Indirect Attack Shield（间接攻击盾牌），检测隐藏在工具结果或检索内容中的恶意指令，非仅用户消息；3）GraySwan Cygnal：间接 Prompt 注入（IPI）检测 + 突变检测；4）Patronus AI：基于裁判模型的 prompt-injection 评估；5）CrowdStrike AIDR：基于策略的注入/越狱检测和阻断；6）Google Model Armor：Google Cloud 检测模板拦截注入和越狱。支持 CEL（Common Expression Language）自定义触发规则（如按 role/消息长度/模型过滤）。多 Profile 可链式串联形成纵深防御。


**PII 脱敏**: 

> 支持输入输出双侧 PII 检测与脱敏：1）内置自定义 Regex：进程内（无外部调用，~11µs 开销）识别邮件/美国电话/SSN/信用卡/IPv4 地址，可添加自定义正则；2）AWS Bedrock Guardrails：检测并脱敏 50+ PII 实体类型（SSN/护照/驾照/信用卡/银行账户/邮件/电话/地址/医疗记录/IP/MAC 地址），脱敏后替换为占位符（如 [PERSON]/[ACCOUNT]/[AMOUNT]），单向不可逆；3）Google Cloud Model Armor SDP：敏感数据保护脱敏模板，可配置脱敏或阻断；4）CrowdStrike AIDR：检测并转换含 PII/敏感数据/自定义实体的内容；5）Patronus AI：PII 评估器。三种处置结果：clean pass（HTTP 200）/ blocked（HTTP 446）/ warning with redaction（HTTP 246）。注意：Regex PII 仅为模式匹配，可能产生误报/漏报，尤其是国际格式。Gateway 进程内可看到明文 PII，极端安全需求需在上游提前脱敏。


**内容审核**: 

> 支持多提供商内容审核能力，覆盖毒性检测、违规内容过滤和自定义安全策略。通过 Guardrails 系统集成以下提供商的内容过滤能力：1）AWS Bedrock Guardrails：仇恨言论/性内容/暴力/自残检测，支持自定义词汇过滤器，支持图片内容审核（PNG/JPEG）；2）Azure Content Safety：四严重级别分类（Safe/Low/Medium/High），可配置阈值，支持自定义文本屏蔽列表和版权检测（仅输出）；3）GraySwan Cygnal：支持自定义自然语言审核规则（如禁止亵渎/保持专业语气）；4）Patronus AI：回答质量评估（简洁性/帮助性/礼貌性/JSON-CSV代码有效性）和偏见检测（年龄/性别/种族）；5）CrowdStrike AIDR：策略化内容过滤和阻断。支持双阶段验证（输入+输出），可配置采样率（如仅检查 25% 请求），异步非阻塞验证以优化性能。含幻觉检测（Patronus AI 独有）和语境锚定验证（AWS Bedrock 验证回答与源文档一致性）。



### 5. kgateway

**Prompt 注入防护**: 

> 支持多层 Prompt 注入防护：1) 内置字符串/正则匹配（拦截 "Ignore all previous instructions"、"DAN mode" 等常见注入模式，支持 REJECT 拦截返回 403）；2) 外部审核 API 集成（OpenAI omni-moderation-latest，检测有害/注入内容）；3) 自定义 Webhook Guardrail API（pre-request 拦截点，任意语言实现专用检测服务）；4) Kill-Switch 机制（一键急停所有 AI 流量）。agentgateway 额外提供工具投毒防护（工具伪造/命名冲突/影子工具检测）和 MCP Server 指纹验证


**PII 脱敏**: 

> 支持输入和输出双侧敏感信息检测与脱敏。内置 PII 检测模式：CREDIT_CARD（信用卡号）、EMAIL（邮箱）、PHONE_NUMBER（电话号码）、SSN（美国社保号）。支持 MASK 操作（将检测到的敏感信息替换为占位符如 <CREDIT_CARD>）和 REJECT 操作（拦截含敏感信息的请求返回 403）。支持自定义正则模式扩展 PII 检测规则。agentgateway 额外内置凭证/密钥检测（AWS AKIA、OpenAI sk-、JWT Token、私钥、数据库连接串等）


**内容审核**: 

> 支持三层内容审核体系：1) 内置正则/字符串匹配（有害内容检测，支持 REJECT/MASK 两种操作）；2) 外部模型审核 API 集成（OpenAI omni-moderation-latest，检测暴力/自残/色情等违规内容并自动拒绝）；3) 自定义 Webhook Guardrail API（pre-request 和 post-response 两个拦截点，支持 Allow/Modify/Reject 三种决策）。agentgateway 额外支持 AWS Bedrock Guardrails、Google Model Armor 等外部审核服务集成



### 6. agentgateway

**Prompt 注入防护**: 

> 支持多层 Prompt 注入防护：1) 内置正则规则集（系统覆盖检测如 'Ignore all previous instructions'、Jailbreak 检测如 'DAN mode'、系统提示提取检测、编码绕过和分隔符注入检测）；2) 外部审核 API 集成（OpenAI omni-moderation-latest）；3) 自定义 Webhook（任意语言实现的专用检测服务）。多层防线按声明顺序依次评估


- **PII 脱敏**: 支持输入和输出双侧敏感信息检测：内置 PII 检测模式覆盖邮箱、电话号码、SSN（美国社保号）、信用卡号、加拿大 SIN；支持 Reject（拦截请求/响应返回 403/422）和 Mask（替换为 <CREDIT_CARD> 等占位符）两种操作；额外内置凭证/密钥检测模式（AWS AKIA、OpenAI sk-、JWT Token、私钥、数据库连接串等）
**内容审核**: 

> 支持三层内容审核体系：1) 内置正则规则（有害内容检测：武器/控制物质/黑客攻击/恶意软件/钓鱼）；2) 外部模型审核集成（OpenAI Moderation、AWS Bedrock Guardrails、Google Model Armor）；3) 自定义 Webhook Guardrail API（pre-request 和 post-response 两个拦截点，支持 Allow/Modify/Reject 三种决策）。企业版额外提供工具投毒防护（工具伪造、命名冲突、影子工具检测）和 MCP Server 指纹/版本管理



### 7. Lunar MCPX（Lunar MCP Gateway）

**Prompt 注入防护**: 

> 提供多层Prompt注入防护：AI驱动的工具描述分析引擎自动扫描'ignore previous instructions'等指令覆盖模式并标记为Critical风险；OWASP MCP Top 10（MCP03:2025 Tool Poisoning）对齐的复合风险评分；工具硬化（Tool Hardening）允许管理员锁定不安全参数、重写工具描述消除注入点；上下文最小化评估（限制上下文大小、会话分离、内存TTL强制）；端点白名单阻止向未批准域名的出站调用。企业版Risk Scoring引擎自动评估所有已注册MCP服务器的安全风险。



### 8. Gravitee Agent Mesh（现称 Gravitee AI Agent Management）

**PII 脱敏**: 

> 支持 AI 驱动的 PII 脱敏（PII Filtering 策略，v4.11+，企业版）。使用本地 ONNX 分类模型（dslim/distilbert-NER 通用 NER 模型和 gravitee-io/bert-small-pii-detection 量化 PII 专用模型）检测 13 类敏感信息：人名（PERSON）、组织（ORGANIZATION）、位置（LOCATION）、邮箱（EMAIL）、电话（PHONE）、网络标识（NETWORK_IDENTIFIER）、设备标识（DEVICE_IDENTIFIER）、金融账号（FINANCIAL_ACCOUNT）、政府 ID（GOVERNMENT_ID）、车辆 ID（VEHICLE_ID）、凭证（CREDENTIAL）、人口统计（DEMOGRAPHIC）、其他（MISCELLANEOUS）。支持输入和输出双侧脱敏、可配置置信度阈值（0.0-1.0）、流式检测和自定义标签到类别映射。同时提供传统规则型 Data Logging Masking 策略（企业版，基于 JSON-Path/XML-Path/正则表达式/内置模式（EMAIL、CREDIT_CARD、IP、URI）的日志脱敏，仅适用于 v2 API）。需要 Debian 系统（ONNX Runtime 不支持 Alpine）。



### 9. Gate22

- **Prompt 注入防护**: 路线图规划中，尚未实现。近期路线图包含「安全加固：对 MCP 服务器和配置进行 Tool Poisoning 及 Prompt Injection 模式预检（pre-flight checks）」。当前通过函数级 allow-list 最小权限机制作为间接防护手段，但不具备 Prompt 注入检测引擎。远期规划策略即代码 v2（OPA/Cedar 风格 ABAC + 审批集成）以增强安全防护

### 10. WSO2 AI Gateway（WSO2 AI 网关）

**Prompt 注入防护**: 

> 是，多层防护机制：（1）语义提示护栏（Semantic Prompt Guardrail）：通过语义相似度模型检测有害/越狱输入；（2）Regex 护栏：自定义正则模式黑名单匹配；（3）外部集成：Azure Content Safety（含越狱/ Jailbreak 检测）、AWS Bedrock Guardrails；（4）语义工具过滤护栏（Semantic Tool Filtering Guardrail）：防止 Agent 调用不相关的工具


**PII 脱敏**: 

> 是，内置 Regex PII 脱敏护栏：（1）支持两种模式：Masking（可逆脱敏，占位符还原）和 Redaction（不可逆脱敏，永久替换为 *****）；（2）内置检测器：EMAIL、PHONE、SSN（美国社会安全号）；（3）支持自定义 PII 正则实体（信用卡号、IP 地址、姓名、地址等）；（4）输入输出双侧脱敏：请求侧对发往 LLM 的内容脱敏，响应侧将占位符还原为原始值；（5）通过 JSONPath 精确指定扫描目标字段


**内容审核**: 

> 是，多层内容审核能力：（1）Azure Content Safety 集成：检测仇恨言论、暴力、色情、自残等违规内容；（2）AWS Bedrock Guardrails 集成：实时内容安全验证；（3）内置护栏：内容长度/词数/句子数控制、URL 验证（检测和过滤幻觉 URL）、JSON Schema 输出校验；（4）Regex 自定义内容过滤规则；（5）语义意图检测：评估输入提示的语义意图是否符合安全策略



### 11. Plano（原名 Arch Gateway / archgw）

_（该类别无确定的字段值）_


### 12. Docker MCP Gateway

**Prompt 注入防护**: 

> 通过 Interceptor 拦截器实现多层防护：预调用拦截（参数类型检查、内容安全分类器、已知注入模式检测如 'ignore previous instructions'）；后调用拦截（响应内容扫描、输出脱敏、恶意载荷过滤）；会话锁定（跨仓库/跨资源访问阻断，记录首次访问的上下文并限制后续工具调用范围）；序列分析（检测可疑工具调用模式如 issue 枚举 → 仓库扫描 → 数据外泄）。`--verify-signatures` 验证容器镜像签名防止供应链投毒


- **PII 脱敏**: 通过自定义 Interceptor 可实现输入和输出双侧敏感信息检测与脱敏（后调用响应扫描、正则模式匹配等），但非内置开箱即用的自动化 PII 脱敏引擎；需用户自行编写 Exec/Docker/HTTP 拦截器实现
- **内容审核**: 通过 Interceptor 可实现毒性检测和违规内容过滤（自定义安全分类器、外部安全服务集成）；Policy System 支持 Allow/Block/Warn 三级决策实现内容级拦截；但非内置内容审核模型，依赖用户自定义拦截逻辑或企业安全基础设施集成

### 13. Envoy AI Gateway

**Prompt 注入防护**: 

> 通过 Envoy external processor（ext_proc）扩展机制实现，支持将提示词数据传入外部审核端点（如 OpenAI omni-moderation-latest 模型）进行检查。支持自定义正则表达式规则拒绝含危险模式的请求。Envoy AI Gateway 本身不内置专用的 Prompt Injection 检测模型，安全防护依赖外部审核服务集成和 ext_proc 管道配置。OWASP LLM Top 10（2025）中 Prompt Injection 排名第一，网关层的多层防护架构（正则 + AI 审核 + 应用层检测）提供防御纵深


**PII 脱敏**: 

> 通过 Envoy ext_proc 和 Wasm/Lua 扩展机制可实现 PII 检测和脱敏。支持内置正则匹配器（信用卡号 CREDIT_CARD、电话号码 PHONE_NUMBER、SSN 等）。集成第三方安全平台（如 Pangea AI Guard）后可支持 50+ 种 PII 类型检测，提供脱敏（Masking）、部分脱敏、替换、哈希、格式保留加密（FPE）等转换选项。但 Envoy AI Gateway 核心项目不内置这些脱敏引擎，需通过扩展机制集成



### 14. GPT-Load

_（该类别无确定的字段值）_


### 15. Helicone

**Prompt 注入防护**: 

> 通过集成 Meta Prompt Guard（86M 参数）实现 Prompt 注入检测与防护。检测类型包括：直接注入（adversarial instructions）、间接注入（embedded malicious instructions）、Jailbreak 攻击。支持 8 种语言（英/法/德/印地/意/葡/西/泰），检出率约 97%。违规处置方式为 block（请求被拦截并返回 403 错误）。高级模式集成 Llama Guard（3.8B 参数），额外覆盖数据泄露、钓鱼、代码解释器滥用等 14 类威胁。通过 Header 启用：Helicone-LLM-Security-Enabled: true / Helicone-LLM-Security-Advanced: true。当前限制：仅支持 OpenAI 模型的安全检测


- **PII 脱敏**: 无原生 PII 检测与脱敏功能。多个第三方对比网站将 Helicone 的 PII 遮盖能力列为“无”。可通过以下方式间接处理：1）Omit Logs（不存储请求/响应内容避免 PII 泄露）；2）异步日志（仅记录元数据）；3）自托管部署（数据不离开自有基础设施）。开源代码中无 Presidio 或类似 PII 脱敏工具的集成。无输入/输出双侧敏感信息自动检测和遮盖能力
**内容审核**: 

> 通过 Llama Guard（高级模式）提供内容审核能力。覆盖 14 类违规内容检测：暴力犯罪、非暴力犯罪、性相关犯罪、儿童剥削、诽谤、专业建议滥用、隐私侵犯、知识产权侵犯、无差别武器、仇恨言论、自杀与自残、色情内容、选举干预、代码解释器滥用。基础模式仅提供 Prompt 注入检测，不含内容审核。审核在 pre_call（请求到达 LLM 前）执行，违规则拦截。无 post_call 响应后审核、无自定义安全策略配置。不支持第三方内容审核平台集成（如 Azure Content Safety、AWS Bedrock Guardrails 等）



### 16. Higress

**PII 脱敏**: 

> 完整支持：① ai-data-masking 插件提供输入双侧检测与脱敏+输出双侧还原，支持手机号、电子邮箱、IP 地址、身份证号、API Key 等 PII 类型；② 使用 GROK 正则规则（%{MOBILE}、%{EMAILLOCALPART}、%{IP}、%{IDCARD} 等预定义模式）和自定义正则；③ 支持 replace（替换）和 hash（哈希+还原）两种脱敏策略；④ 基于 jieba 分词 + double-array trie 实现高效敏感词匹配；⑤ 内置敏感词库（源自 github.com/houbb/sensitive-word）；⑥ 支持 JSONPath 精确字段脱敏；⑦ 开源插件源码为 Rust 语言 Wasm 实现。限制：流式模式下若脱敏词被多个 SSE chunk 拆分可能影响还原效果。



### 17. Langfuse

**Prompt 注入防护**: 

> Langfuse 自身不内置 Prompt 注入检测引擎。通过集成第三方安全库实现：(1) LLM Guard 的 PromptInjection scanner——对'Grandma trick'等高级越狱攻击检测效果有限；(2) Lakera Guard——在 Langfuse 官方的对比测试中成功检测到 LLM Guard 漏掉的 Prompt 注入（含恶意 URL 注入）；(3) Prompt Armor、NeMo Guardrails、Azure AI Content Safety。Langfuse 通过 @observe() 装饰器追踪安全库的检测调用、评分和拦截动作，在 Dashboard 中提供安全评分可视化和自动化评估。推荐纵深防御策略。


**PII 脱敏**: 

> 提供两层 PII 保护：(1) 内置 Masking 功能——可在 Langfuse 客户端构造函数中传入自定义脱敏函数，所有事件的输入/输出/元数据在发送到 Langfuse 服务器之前经脱敏函数处理。支持正则脱敏（信用卡号、邮箱、电话、身份证号等）和集成 LLM Guard 的 Anonymize scanner（基于 NER 的 PII 检测——姓名、组织、地点等）。(2) 运行时 Anonymize/Deanonymize 模式——数据发给 LLM 前脱敏（使用 LLM Guard Vault），响应中恢复，全程被 Langfuse 追踪。


**内容审核**: 

> 通过集成第三方安全库实现，Langfuse 负责追踪和评估：(1) LLM Guard BanTopics scanner——零样本分类过滤违禁话题（如暴力、色情）；(2) 毒性检测（Toxicity scanner）；(3) 输出质量扫描——NoRefusal、Relevance、Sensitive、Bias、Gibberish、Factual consistency、URL Reachability；(4) 输入/输出双侧扫描——scan_prompt() 可堆叠多个 scanner。所有检测结果作为 Langfuse Score 存储，支持构建安全评分仪表盘和自动化评估流水线。



### 18. LiteLLM

**Prompt 注入防护**: 

> 通过集成 20+ Guardrail 提供商实现 Prompt Injection 检测与防护。主要集成方：Pillar Security（99%+ 检出率，含 jailbreak 检测）、CrowdStrike AIDR（99%+ 检出率）、Pangea（99%+ 检出率，支持 100+ 语言）、PromptGuard（可自托管，含注入检测和 PII 脱敏）、EnkryptAI（含 sponge attack 检测）、Lasso Security（含自定义策略和代码安全分析）、Lakera AI、HiddenLayer、PANW Prisma AIRS。支持 pre_call 模式在请求到达 LLM 前拦截，during_call 模式并行检测。违规处置方式：block（拒绝）/monitor（记录放行）/mask（脱敏后继续）


**PII 脱敏**: 

> 支持输入和输出双侧 PII 检测与脱敏。集成 Microsoft Presidio（开源 PII/PHI 脱敏工具）。第三方 Guardrail 提供商的 PII 能力：Prompt Security（支持 PII 脱敏，将检测到的敏感信息替换为 [REDACTED]）、Pangea（50+ PII 类型检测）、Pillar Security（含 PII 和密钥检测）、EnkryptAI（PII 检测）、Lasso Security（PII 遮盖）。支持 post_call 模式对 LLM 输出进行二次校验和脱敏。PII 脱敏规则可通过 guardrail 配置的 on_flagged_action: mask 启用


**内容审核**: 

> 通过多提供商整合实现内容审核多层防护。毒性检测：Pillar Security、Pangea（毒性/暴力/自残检测）、EnkryptAI（毒性/NSFW）、CrowdStrike AIDR。违规内容过滤：Pangea（恶意链接检测，100+ 语言）、EnkryptAI（关键词检测、策略违规）、Lasso Security（有害内容）。自定义安全策略：Qualifire（自定义断言和合规检查）、Google Cloud Model Armor（GCP 原生审核整合）、Azure Content Safety（Azure 原生内容过滤）、AWS Bedrock Guardrails（Bedrock 原生安全护栏）。支持 pre_call + post_call 双端审核，确保输入和输出双重安全



### 19. LobeChat Plugin Gateway（@lobehub/chat-plugins-gateway）

- **Prompt 注入防护**: 不支持。网关不处理 LLM Prompt 内容，无 Prompt Injection 检测或防护机制
- **PII 脱敏**: 不支持。网关不进行输入或输出内容的敏感信息检测与脱敏处理。请求体（arguments）直接转发至插件 API，无 PII 检测中间层
- **内容审核**: 不支持。网关无毒性检测、违规内容过滤或自定义安全策略功能。不集成任何内容安全审核提供商

### 20. One API

_（该类别无确定的字段值）_


### 21. OptiLLM

- **PII 脱敏**: 支持（通过 privacy 插件）。可对请求中的个人身份信息（PII）进行自动检测和匿名化处理，在模型返回响应后将匿名化占位符还原为原始 PII 数据，实现输入和输出双侧的敏感信息保护。

### 22. TensorZero

_（该类别无确定的字段值）_


### 23. aisuite

- **Prompt 注入防护**: 不支持。无 Prompt Injection 检测与防护机制。aisuite 不集成任何 AI 安全 Guardrail 提供商（如 Pillar Security、Pangea、PromptGuard 等）。工具调用安全性仅通过 Tool Policies（RequireApprovalPolicy、allow/deny 列表）控制工具执行，不涉及 Prompt 层面的安全防护
- **PII 脱敏**: 不支持。无输入或输出双侧的敏感信息检测与脱敏能力。不集成 Microsoft Presidio 或其他 PII 检测工具
- **内容审核**: 不支持。无毒性检测、违规内容过滤或自定义安全策略。不集成任何内容审核提供商或 AI Safety 框架

### 24. New API

**内容审核**: 

> 内置可配置的敏感词检测机制。通过系统设置中的 ShouldCheckPromptSensitive 开关启用，调用 CheckSensitiveText 扫描用户 Prompt 输入。检测到敏感词后返回 ErrorCodeSensitiveWordsDetected 错误码直接拦截请求，并在日志中记录被拒绝的详细原因。支持自定义敏感词列表。不支持基于机器学习的内容毒性检测和多类别内容评分（如色情/暴力/仇恨言论等细分）



## AI 网关 vs 传统 7 层网关对比

### 1. Kong AI Gateway

**架构层级定位**: 

> Kong AI Gateway 定位为 L7+ / AI 应用层网关。基于传统 L7 反向代理（NGINX/OpenResty，处理 HTTP/HTTPS 层面的路由、负载均衡、限流）之上叠加 AI 专用插件层（理解 LLM 协议语义、Token 计算、语义路由、Prompt 安全检测）。与传统 L4 负载均衡（处理 TCP/UDP 连接级分发）和纯 L7 API 网关（仅关心 HTTP 路由和认证）相比，Kong AI Gateway 深入解析 LLM 请求/响应体内容（JSON 格式的 chat completions、SSE 流式事件），理解模型名、Token 用量、Prompt 语义等 AI 特定元数据。


**协议感知能力**: 

> 传统 L7 网关（如 Nginx/Envoy）仅进行 HTTP 层面的通用处理（header 解析、URL 路由、body 透传），不具备 LLM 协议感知。Kong AI Gateway 具备深度 LLM 协议感知：理解 SSE 流式协议并逐 chunk 解析和重规范化；能提取和计算 Prompt Token 和 Completion Token 数量；理解不同 LLM 提供商（OpenAI/Anthropic/Gemini/Bedrock 等）的原生 API 格式并在其间自动转换；感知 provisioned throughput 和模型速率限制特性；支持 A2A（Agent-to-Agent）协议和 MCP（Model Context Protocol）协议；理解 streaming vs batch 请求模式。实现了传统 HTTP proxy 无法做到的语义级流量治理。


**状态模型**: 

> 传统网关通常为无状态设计（每个请求独立处理，不维护会话上下文）。Kong AI Gateway 引入有状态能力：Consumer 级 Token 预算跟踪（跨请求持续追踪累计 Token 消耗）；Metering & Billing 计费状态（按 Consumer/Customer 聚合 Token 消耗用于计费）；路由状态维护（consistent-hashing 需要的粘性会话、lowest-usage/lowest-latency 需要的统计状态）；语义缓存状态（向量数据库中的嵌入向量和缓存的 LLM 响应）；断路器状态（健康检查统计和故障计数）。然而，Kong 仍保留大量无状态特性（无原生对话窗口跟踪、无 Agent 上下文管理），核心代理路径偏向无状态高性能设计，有状态逻辑集中在特定插件中。


**计费模型**: 

> 传统 L7 网关采用请求级计费（按 API 调用次数计费，与请求 body 内容和大小无关）。Kong AI Gateway 支持三层计费模型：请求级计费（继承传统网关能力，按请求数限流/计费）、Token 级计费（按 prompt_tokens 和 completion_tokens 分别计价，基于 input_cost 和 output_cost 每百万 Token 的配置，自动计算实际美元成本）、金额预算计费（按 Consumer Tier 设定美元预算上限，实时扣减并超限告警，通过 Konnect Metering & Billing 与 Stripe 对接实现从 Token 消耗→聚合→定价→发票→支付的完整货币化流水线）。Token 级计费是 AI 网关区别于传统网关的核心计费维度差异。


**路由粒度**: 

> 传统 L7 网关路由基于 HTTP 层元数据（URL 路径、Header 值、Host 域名、Method）。Kong AI Gateway 支持更丰富的路由粒度：基于模型名的路由（model_alias 字段，客户端使用'powerful'/'fast'/'cheap'等友好名称，网关映射到实际模型）；基于 Token 预算和成本优化的路由（lowest-usage 策略选择 Token 消耗最少的模型）；基于延迟优先的路由（lowest-latency 策略选择当前响应最快的模型）；基于语义的路由（嵌入 incoming prompt 并在向量数据库中进行语义相似匹配，简单查询→廉价模型，复杂查询→高级模型）；基于优先级的路由（高优先级组优先，低优先级组作为备降）；支持跨不同 LLM 提供商的统一路由（无需客户端感知后端拓扑）。


**缓存策略**: 

> 传统 L7 网关的 HTTP 缓存依赖标准 HTTP 缓存头部（ETag、Cache-Control、CDN 边缘缓存、Vary 头），基于 URL 精确匹配。Kong AI Gateway 提供两种扩展缓存策略：精确匹配缓存（基于完全相同提示词的匹配，与传统 HTTP 缓存类似但应用于 LLM 请求/响应对）和语义缓存（基于向量嵌入的语义相似匹配——使用 cosine similarity 在 Redis 向量数据库中查找语义相似的历史请求，即使措辞完全不同也可命中缓存。例如'纽约意大利餐厅'和'纽约市意大利菜'可共享同一缓存）。语义缓存不依赖 HTTP cache headers，而是依赖 embedding 模型（如 text-embedding-3-small）将 prompt 转换为向量并与 Redis VSS 比较，threshold 参数控制语义匹配严格度。


**安全模型**: 

> 传统 L7 网关的安全模型以 Web 应用防火墙（WAF）、DDoS 防护、请求速率限流、CORS、IP 黑白名单等面向通用 Web 流量的防护手段为主。Kong AI Gateway 在继承上述传统安全能力的基础上，扩展了 AI 专用安全层：Prompt Injection 防护（基于正则和语义的双层检测，阻止恶意 Prompt 注入攻击）；数据防泄露（AI PII Sanitizer 在输入/输出双侧脱敏，防止敏感数据泄露到云模型）；Token 级滥用检测（基于 Token 消耗量和成本的速率限制，防止通过高频调用或高 Token 消耗攻击耗尽 API 配额）；语义级内容审核（检测仇恨言论、暴力、自残等有害内容）；AI 专用护栏集成（Azure Content Safety、AWS Guardrails、GCP Model Armor、NVIDIA NeMo Guardrails 等第三方集成）。安全边界从 HTTP 流扩展到 Prompt 语义和 Token 经济两个维度。


**内容转换**: 

> 传统 L7 网关的内容转换仅限于 HTTP 层面的请求改写和响应修改（如修改 header、URL 重写、body 替换）。Kong AI Gateway 提供更深层的 AI 内容转换能力：请求改写（AI Prompt Decorator 自动在对话首尾注入组织级上下文/规则/合规指令，AI Request Transformer 调用 LLM 对请求进行中继转换）；模型切换（运行时根据路由策略在不同 LLM 提供商和模型间无缝切换，客户端无感知）；格式互转（OpenAI↔Anthropic↔Cohere↔Gemini↔Bedrock↔Azure 等十余种 API 格式自动互转）；降级 Fallback（主要模型不可用时自动降级到备选提供商，甚至跨 API 格式降级）；响应后处理（AI Response Transformer 调用 LLM 对上游响应进行二次处理，如翻译、摘要、格式转换，但流式时不可用）。


**限流单位**: 

> 传统 L7 网关的核心限流单位是请求数/秒（RPS，requests per second），即限制单位时间内允许通过的 HTTP 请求数量。Kong AI Gateway 将限流维度扩展到三个层级：请求数/秒（继承传统能力）；Token/分钟（ai-rate-limiting-advanced 插件，按 prompt_tokens/completion_tokens/total_tokens 分别在可配置时间窗口内限流，如'每分钟最多 10 万输入 Token'）；金额预算/月（按美元成本限制，基于 input_cost/output_cost 配置计算，如'标准层每月 $10 预算、高级层每月 $100 预算'，包含全局预算和单模型子上限）。这是 AI 网关区别于传统网关最核心的差异维度之一——传统 RPS 限流对 LLM 调用不准确（一个请求可能消耗 10 个 Token 或 100000 个 Token），而 Token 级限流直接对齐到实际成本和资源消耗。


**流量特征**: 

> 传统 L7 网关主要处理同步短连接（HTTP request→response→connection close，延迟通常在 10-100ms 级别，payload 大小在 KB 级别）。Kong AI Gateway 面临不同的流量特征：流式长连接（SSE streaming 模式下 TCP 连接保持打开数秒甚至数分钟，逐 token 推送响应，对连接池和资源管理提出不同要求）；秒级延迟（LLM 推理延迟通常在 1-60 秒，远超传统 API 的毫秒级延迟，网关的超时和连接管理策略需相应调整）；大载荷（单次请求的 JSON payload 可能包含完整对话历史和大型 Prompt，达到数百 KB，对 body 缓冲和内存管理有更高要求）；异步处理（长时间运行的 LLM 请求需异步处理模式支持，避免阻塞 worker）。这些流量特征直接影响了 Kong AI Gateway 的架构设计（如流式管道优化、buffer 和内存指导、HTTP/2 支持限制等）。


**生态定位**: 

> Kong AI Gateway 定位于'API 网关 AI 插件'——即传统 API 网关之上叠加的 AI 专用插件层，而非独立 AI 网关或全新平台。它是 Kong Gateway 的一部分（六到十几个 AI 插件），任何 Kong 3.6+ 部署均可启用。在生态谱系中处于'API 网关 + AI 扩展'的位置：通过已有 Kong 基础设施为 AI 流量提供治理能力，适合已部署 Kong 的组织快速为 AI 工作负载添加统一认证、安全、可观测性和成本控制。Kong 2025-2026年的产品演进表明其正向'统一 API+AI+Event 网关'方向扩展（新增 MCP Gateway、Agent Gateway、Event Management），但核心架构仍基于传统 API 网关的插件模型。与独立 AI 网关（如 LiteLLM、Portkey、Future AGI）相比，Kong 的 AI 能力深度和 AI 原生体验有所不足（无原生评估/优化器/提示注册表）；与纯 MCP 网关或 Agent 治理平台相比，Kong 的 Agent 能力以协议代理和策略执行为主，缺少深度的 Agent 拓扑感知和管理。



### 2. Apache APISIX AI Gateway

- **架构层级定位**: 传统 API 网关定位在 L7（HTTP/应用层）或 L4（TCP/UDP 传输层）。APISIX 作为统一 API+AI 网关，在传统 L4/L7 代理能力之上叠加 AI 应用层感知：通过 AI 插件解析 LLM 请求/响应中的 Token 用量、模型标识、流式进度（TTFT），实现 LLM 协议层面的深度感知。定位为 L7+ AI 应用层网关
**协议感知能力**: 

> 传统网关仅处理 HTTP 通用语义（Method/URL/Header/Body/Status Code）。APISIX AI 插件深度感知 LLM 协议：解析 SSE 流式响应（不缓冲、保持 chunked 传输）、提取 Token 用量（prompt/completion tokens）、追踪首 Token 延迟（TTFT）、识别模型名、处理 Provider 特定协议（OpenAI Chat Completions、Anthropic Messages API、AWS Bedrock Converse API），并在不同协议格式间进行转换


**状态模型**: 

> 传统网关通常以无状态方式运行（每个请求独立处理）。APISIX AI 网关本身仍为无状态架构（通过 etcd 集中管理配置，网关节点不存储状态），但通过 Redis 支持分布式 Token 计数器（ai-rate-limiting cluster 模式）实现跨节点的 Token 预算追踪。MCP 协议场景下通过 mcp-bridge 管理有状态 Session（session id + ping 保活）。SSE 长连接场景下网关需要维持客户端连接直到流结束或超时


- **计费模型**: 传统网关按请求数计费（如 QPS、RPM）。APISIX AI 网关扩展到 Token 级别计费：通过 ai-rate-limiting 的 cost_expr 支持自定义 Token 计费公式（如区分缓存命中 Token 和新 Token）、按模型实例差异化配额、通过访问日志和 Prometheus 指标导出 Token 用量，由外部系统结合模型价格表完成金额换算。不是原生金额预算系统
- **路由粒度**: 传统网关路由基于 URL/Header/Host/Method 等 HTTP 属性。APISIX AI 网关在传统路由基础上提供 AI 特有的路由维度：基于模型名称路由（同一路由可配置多个模型实例）、基于优先级和权重的多 LLM 实例负载均衡、基于 Token 配额消耗和成本的动态路由选择、基于延迟优化的路由（动态权重调整）、基于故障状态的自动降级路由
**安全模型**: 

> 传统网关安全模型：API Key 认证、JWT/OAuth2/OIDC、CORS、CSRF、IP 黑白名单、WAF、DDoS 限流、请求校验。APISIX AI 网关在传统安全之上增加 AI 专属安全层：Prompt Injection 防护（ai-prompt-guard 正则模式匹配）、数据防泄露（ai-request-rewrite PII 脱敏，阻止敏感数据发送到外部 LLM）、内容审核（ai-aws-content-moderation 毒性检测）、Token 级别滥用检测（ai-rate-limiting 按 Token 消费限流）


**内容转换**: 

> 传统网关的内容转换能力：HTTP 请求改写（URL Rewrite/Redirect）、Header 增删改、响应体修改。APISIX AI 网关的增强内容转换：基于 LLM 的智能请求改写（ai-request-rewrite：PII 脱敏、内容丰富、格式重构）、多模型协议自动转换（ai-proxy provider driver 实现 OpenAI↔Anthropic↔Bedrock 协议桥接）、多模型故障切换（ai-proxy-multi 基于优先级的自动降级到备用模型）


**限流单位**: 

> 传统网关限流单位：请求数/秒、并发连接数、带宽。APISIX AI 网关最核心的差异维度——支持混合限流模型：传统请求级限流（limit-count/limit-conn/limit-req 插件）与 Token 级限流（ai-rate-limiting 插件）共存。Token 级限流细分为 total_tokens（总 Token）/prompt_tokens/completion_tokens 以及基于 Lua expression 的自定义成本表达式，可按 Route/Service/Consumer/Consumer Group 和模型实例多维度配额管理。集群级别支持 Redis 分布式计数


**流量特征**: 

> 传统 API 流量特征：同步短连接为主、请求-响应模式、载荷通常较小（KB 级）、延迟敏感度中等。AI/LLM 流量特征：流式长连接（SSE/WebSocket 持续数秒至数分钟）、对首 Token 延迟（TTFT）极度敏感、响应载荷可能很大（自 v3.15.0 起支持 max_response_bytes 限制）、客户端可能随时断开连接（自 v3.15.0 起支持 abort upstream read on client disconnect）。这些特征影响网关架构设计：需要避免缓冲响应体、需管理长连接生命周期、需追踪流式指标（TTFT）


**生态定位**: 

> APISIX 定位为统一 API+AI 网关。不是独立的纯 AI 网关（如 Portkey/Helicone/LiteLLM），也不是 MCP 专用网关，而是将 AI 插件（ai-proxy/ai-proxy-multi/ai-prompt-guard/ai-rate-limiting/ai-rag 等）作为原生扩展叠加在成熟 API 网关之上。同一 APISIX 实例同时服务传统 REST API 和 AI/LLM 流量，实现统一控制平面管理。在生态中位于传统 API Gateway 向 AI-aware Gateway 演进的中间地带



### 3. Portkey

- **架构层级定位**: L7+ / AI 应用层。Portkey 位于传统 L7 API 网关之上，不替代而是互补；传统网关（Nginx/Kong/Envoy）负责 TLS 终结、通用限流、API 路由；Portkey 专注 AI 特定需求：模型路由、Token 成本追踪、提示词护栏、语义缓存等 AI 应用层治理
**协议感知能力**: 

> 深度 LLM 协议感知 vs 传统 HTTP 通用处理。Portkey 理解 OpenAI/Anthropic/Gemini 三套 API 协议的完整语义：SSE 流式 chunk 标准化、Token 使用量实时计算（input/output tokens）、provisioned throughput 管理、推理参数跨模型映射（reasoning effort、thinking budget）、多模态（文本/图像/音频/视频）统一处理


- **状态模型**: 有状态 vs 传统无状态。Portkey 需维护会话状态：多轮对话上下文窗口跟踪、Token 消耗累计计数（跨请求累积）、语义缓存状态（向量嵌入相似度匹配）、粘性会话路由（sticky routing）、断路器状态跟踪（open/half-open/closed）
- **计费模型**: Token 级 + 金额预算计费 vs 传统请求级计费。Portkey 的核心计费单位为 Token（精确到 input/output tokens）和美元金额（基于各模型实时定价），支持按分钟/小时/天/周的多级速率限制（RPM/TPM/TPD/TPW），以及按月的硬性金额预算。传统 7 层网关以请求数/秒（RPS）为主要计量单位
- **路由粒度**: 基于模型名/Token预算/成本优化/延迟优先的多维路由 vs 传统 URL/Header/Host 路由。Portkey 支持：按目标模型名称路由（模型切换）、按成本预算自动选择同一能力的更便宜模型、按延迟优先选择最快响应模型、加权负载均衡以分散速率限制风险、条件路由（if-then 规则）、粘性路由保持会话一致性、降级链式 fallback
- **缓存策略**: 语义缓存（基于向量嵌入的语义相似匹配） vs 传统 HTTP 缓存（ETag/CDN/Vary）。Portkey 核心差异在于语义缓存：对每次请求计算文本嵌入向量，在缓存中查找语义相似（非精确匹配）的历史请求，命中后返回缓存响应。可配置相似度阈值和 TTL，命中率远高于精确匹配。同时保留精确匹配缓存（Simple Cache），支持 Redis 等传统缓存后端
**安全模型**: 

> Prompt Injection 防护 + 数据防泄露 + Token 级别滥用检测 vs 传统 WAF/DDoS/限流/CORS。Portkey AI 安全模型面向 LLM 特有威胁：提示注入检测与阻断（含专用 HTTP 状态码 446）、PII/密钥/机密数据防泄露（输入输出双侧）、Token 级别滥用检测（异常 Token 消耗模式识别）、LLM 输出有害内容过滤。与传统安全（WAF/DDoS/IP黑白名单）为补充关系


**内容转换**: 

> 请求改写 + 模型切换 + 格式互转 + 降级 fallback vs 传统 HTTP 请求改写/响应修改。Portkey 的内容转换面向 AI 语义：OpenAI↔Anthropic↔Gemini 三方 API 格式自动互转（参数映射和响应标准化）、reasoning effort 到 thinking budget 的智能映射、模型无感切换（用户代码不变，后端模型透明替换）、多提供商降级 fallback 链、缓存 JSON→SSE 流式合成等 AI 特有转换


- **限流单位**: Token/分钟 + 金额预算/月 vs 传统请求数/秒。这是 AI 网关与传统 API 网关最核心的差异维度之一。Portkey 的限流以 LLM 语义单位为基础：Token（RPM/TPM/TPD/TPW）——精确控制模型调用成本和配额；金额预算（$/月）——业务级成本控制，超限即拒绝；传统网关以 HTTP 协议层面 RPS 为限流单位，无法感知单次请求的 Token 消耗和实际成本
- **流量特征**: 流式长连接 + 秒级延迟 + 大载荷 vs 传统同步短连接。AI 网关需处理：SSE 流式长连接（单次请求可持续数分钟）、大载荷传输（多模态：图像/音频/视频/文件上传）、Token 级别实时计数（需要在流式传输过程中累加 token 数）、WebSocket 持久连接（实时语音）、gRPC 服务端流等特殊性，深刻影响网关的连接管理、内存模型和超时策略设计
**生态定位**: 

> 独立 AI 网关 → 被 PAN 收购整合为安全平台。Portkey 最初定位为独立 AI 网关（2023-2026），与 LiteLLM、Kong AI Gateway、Cloudflare AI Gateway 等竞争。2026年5月被 Palo Alto Networks 以约 1.4 亿美元收购后，重新定位为 Prisma AIRS 安全平台的核心 AI 网关，聚焦 AI Agent 安全治理、运行时防护和身份安全（Idira），从通用 AI 网关转型为企业级 AI 安全基础设施



### 4. Bifrost

**架构层级定位**: 

> Bifrost 定位于 L7+/AI 应用层。传统 7 层网关（Nginx/Kong/Envoy）工作在 HTTP 协议层（OSI L7），处理 HTTP 请求路由、TLS 终止、Header 修改等。Bifrost 工作在 LLM 协议层之上，深度理解 AI 请求语义（模型名/Token 量/流式事件/工具调用），属于 AI 应用层网关。在网络栈中可部署在传统 L7 网关之后，形成 L7（传统网关）+ L7+（AI 网关）双层架构。


**协议感知能力**: 

> 传统网关：通用 HTTP 处理，不理解请求体语义，将 LLM API 请求视为普通 HTTP POST/PUT。Bifrost：深度 LLM 协议感知，能解析和理解 OpenAI/Anthropic/Gemini 等 AI 专用 API 格式，自动完成 SSE 流式事件解析与重建、不同提供商间的消息格式转换（roles/parameters/response 结构映射）、Token 实时计数与成本核算、provisioned throughput 管理、MCP 工具调用协议的解析和执行。


**状态模型**: 

> 传统网关：无状态设计，每个 HTTP 请求独立处理，依赖外部存储（Redis/DB）维持会话。Bifrost：有状态 AI 流量管理。维护会话级上下文窗口跟踪、跨请求的 Token 预算累计扣减（如在一次对话中连续跟踪消耗的 Token）、MCP 工具会话管理（工具注册/调用/结果消费）、流式连接的有状态管理（SSE/WebSocket 长连接生命周期）。Gossip 协议在集群节点间同步这些有状态信息。


**计费模型**: 

> 传统网关：按请求数/带宽/API 调用次数计费，计费粒度粗。Bifrost：原生支持 Token 级计费和金额预算计费。自动统计每次请求的 input tokens 和 output tokens，换算为实际金额（USD），支持四级预算实体（Customer/Team/Virtual Key/Provider Config）的精准成本归属。支持多模型不同定价的自动换算，可配置按时间周期（1min~1year）的预算重置。这是 AI 网关区别于传统网关最核心的维度之一。


**路由粒度**: 

> 传统网关：基于 URL 路径/Host Header/HTTP Method/Cookie 等 HTTP 层信息路由，路由决策简单且静态。Bifrost：基于模型名路由（如选择 gpt-4o vs claude-sonnet vs gemini-pro 的不同提供商和版本）、基于 Token 预算路由（余额不足时自动切换备选）、基于成本优化路由（优先使用廉价模型，溢出到高级模型）、基于延迟优先路由（自适应负载均衡动态选择最快端点）、基于安全策略路由（PII 检测/合规需求可能限制可用模型范围）。多级路由：方向级（选提供商）+ 路由级（选具体 API 密钥）。


**缓存策略**: 

> 传统网关：HTTP 级别缓存，基于 ETag/Last-Modified/Cache-Control Header、CDN 边缘缓存、Vary Header 内容协商。缓存键为 URL+Headers 组合，无法识别语义相似的请求。Bifrost：语义缓存，基于向量嵌入的语义相似匹配，即使请求措辞不同但含义相似也能命中缓存，显著提高大语言模型调用的缓存命中率。同时保留精确匹配缓存（确定性请求哈希）用于完全相同的查询。缓存命中指标按 cache_type（direct/semantic）分类暴露，可量化语义缓存的增量价值。


**安全模型**: 

> 传统网关：WAF（Web 应用防火墙）规则、DDoS 流量清洗、IP 级别限流/黑名单、CORS 跨域控制、基本的 API 认证鉴权（JWT/OAuth/API Key），安全关注点在网络和 HTTP 层面。Bifrost：在传统安全之上叠加 AI 专属安全层：Prompt 注入防护（检测并阻断恶意 Injection/越狱尝试）、数据防泄露（PII/敏感数据双侧检测脱敏，阻止敏感信息到达外部 LLM 或从响应中泄露）、Token 级别滥用检测（异常的 Token 消耗模式/速率异常检测）、内容安全审核（毒性/暴力/自残/仇恨内容过滤）、幻觉检测（验证模型输出的事实准确性）。安全策略基于 CEL 表达式可编程。


**内容转换**: 

> 传统网关：HTTP 请求改写（路径重写/Header 注入/Query 参数修改）、响应修改（Body 替换/Header 过滤）、协议转换（HTTP→gRPC 桥接）。转换操作限于 HTTP 语义层，不涉及业务内容。Bifrost：AI 请求的语义级内容转换。能在不同 LLM 提供商协议间自动转换请求和响应格式（OpenAI↔Claude↔Gemini），包括角色映射（user/assistant/system/developer→model）、参数重命名（max_tokens/maxOutputTokens/max_completion_tokens）、停止原因标准化、Token 使用量字段统一。支持模型切换（在请求中动态更换目标模型无需改代码）、格式互转（Text↔Chat↔Responses API）。Passthrough 模式保留原始请求不做任何转换。降级 Fallback 自动切换到备选模型/提供商时格式自动适配。


**限流单位**: 

> 传统网关：以请求数/秒（RPS/RPM）为基本限流单位，这是传统 API 网关最核心的限流维度。Bifrost：以 Token/分钟（TPM）和金额预算/月为核心限流单位，这是 AI 网关区别于传统网关最本质的差异之一。原因：LLM 调用的成本由 Token 数量决定而非请求次数（一次请求可能消耗 10 tokens 或 100,000 tokens）。Bifrost 同时保留请求级限流（RPM）作为辅助维度，但核心治理逻辑围绕 Token 消耗和金额预算展开。


**流量特征**: 

> 传统网关：处理典型同步短连接 HTTP 流量，请求-响应模式，连接生命周期通常亚秒级到秒级。Bifrost：处理 LLM 应用特有的流量模式：1）流式长连接：SSE 和 WebSocket 连接可能持续数秒到数分钟（模型生成完整回答），网关需高效管理大量并发的长期连接；2）秒级延迟：端到端 LLM 推理延迟通常在秒级（非毫秒级），网关开销需在亚毫秒级才不成为瓶颈；3）大载荷：单个请求/响应可达数十万 tokens（相当于数百KB到数MB的文本），JSON 序列化/反序列化和内存管理成为关键性能因素。这些特征深刻影响了 Bifrost 的 Go 语言选择、sync.Pool 对象池、连接复用等架构决策。


**生态定位**: 

> Bifrost 定位为独立 AI 网关 + MCP 网关 + Agent 治理平台的融合体。非传统 API 网关的 AI 插件（不像 Kong AI Plugin 那样依附于现有网关），而是独立的、专用的 AI 基础设施层。生态定位涵盖三大角色：1）独立 AI 网关：统一多模型提供商访问、路由、负载均衡、缓存；2）MCP 网关：集中管理 MCP 工具的发现/连接/安全/认证，是 Agent 工具链的控制平面；3）Agent 治理平台：提供企业级 Agent 治理（预算/审计/Guardrails/SSO/RBAC），涵盖从 LLM API 代理到 Agent 工具编排的完整治理能力。与 Kong/APISIX/Envoy 等传统网关形成互补而非竞争关系：L7 网关处理通用 HTTP 流量管理，Bifrost 在其后处理 AI 专属流量治理。



### 5. kgateway

**架构层级定位**: 

> kgateway 传统定位在 OSI 第 7 层（HTTP/gRPC 应用层），通过 Envoy 数据面处理通用 API 流量。AI 能力扩展至 L7+/AI 应用层：深度理解 LLM 请求/响应 Body 语义（模型名称、Token 用量、提示词、工具调用）、MCP 协议（JSON-RPC/tools/list/tools/call）、A2A 协议（Agent Card/任务状态）。agentgateway Rust 数据面从第一性原理为有状态、双向流式 Agent 协议设计，实现协议感知路由和策略执行


**协议感知能力**: 

> 传统模式仅感知 HTTP 通用协议（method/URL/headers/status code）。AI 模式深度感知：LLM 协议（OpenAI Chat Completions 格式、Anthropic Messages 格式自动识别和转换）、MCP 协议（JSON-RPC 方法路由、工具发现联邦）、A2A 协议（Agent Card 解析与重写）、流式协议（SSE/HTTP Stream 格式解析、TTFT/TPOT 延迟指标自动计算）、Token 用量自动提取（从各提供商响应体中统一提取 input/output token 计数）


**状态模型**: 

> 传统 Envoy 数据面为无状态代理（请求-响应即结束，无会话上下文，无跨请求状态持久化）。agentgateway 数据面为有状态代理：MCP 会话管理（SessionManager 维护长期 SSE 连接生命周期）、Token 预算计数器跨请求持久化、Agent Card 注册和工具发现元数据有状态存储。注意：agentgateway 当前默认使用本地 SessionManager（多实例场景下需外部粘性路由保证会话一致性），社区计划支持无状态模式


- **计费模型**: 传统模式按请求级/连接数/带宽计费（单位：RPS、并发连接数）。AI 模式支持 Token 级计费（按 input/output Token 分别计量，不同模型不同价格公式）、金额级计费（Token 数 * 模型单价 = 美元成本）、按时段聚合成本（小时/天/月级按用户/团队的消费报表）。支持 PromQL 多模型价格换算和 AlertManager 预算告警
**路由粒度**: 

> 传统模式基于 URL/Header/Host/Path 的静态规则路由。AI 模式扩展至：基于模型名的路由（同一 HTTP 路径按请求 Body 中的 model 字段路由到不同后端）、基于优先级的故障转移路由（多级 fallback 链）、推理感知路由（基于 GPU 队列深度/显存利用率/KV Cache 状态等实时 Prometheus 指标智能路由至最优推理 Pod）、基于 Token 预算的路由（超预算用户直接拒绝而不消耗后端资源）


**安全模型**: 

> 传统模式提供 WAF/DDoS 防护/API 限流/CORS/mTLS/IP 黑白名单等通用安全能力。AI 模式扩展至 AI 特有威胁防护：Prompt 注入检测（系统覆盖/Jailbreak/提示提取/编码绕过）、PII 和凭证数据防泄露（输入输出双侧检测脱敏）、Token 级滥用检测（超预算自动拒绝）、Kill-Switch 机制（一键急停 AI 流量）、工具投毒防护（agentgateway）、MCP Server 指纹签名验证（agentgateway）


**内容转换**: 

> 传统模式支持 HTTP 请求改写（Header 重写/URL 重写/路径前缀移除）和响应修改（Body 过滤/Header 注入）。AI 模式扩展至：Prompt Enrichment（系统/用户提示词自动预置和路由级默认值注入）、OpenAI↔Anthropic 格式双向转换（agentgateway，含工具定义映射/多模态内容转换/流式转换）、MCP 工具联邦（多后端工具名自动重写避免冲突、Agent Card URL 重写）、OpenAPI-to-MCP 完整协议转换（agentgateway，三种模式）


**限流单位**: 

> 传统模式限流单位为请求数/秒（RPS）、连接数/并发数。AI 模式扩展至 Token/时间窗口（Token/分钟、Token/小时、Token/天），支持金额预算/月（通过 PromQL 成本公式 + Token 硬上限组合实现）。这是 AI 网关与传统网关最核心的差异维度之一：AI 服务成本主要由 Token 消耗量驱动（单次请求可消耗数万 Token），而非请求次数。流式请求无法预先得知总 Token 量（仅能在流完成后扣除），增加了限流实现的复杂性


**流量特征**: 

> 传统模式处理同步短连接为主（毫秒级 RTT、小载荷 JSON、请求-响应模式）。AI 模式处理：流式长连接（SSE 持续数分钟推送 Token 流、TTFT 优化关键）、大载荷（多模态请求含图片/音频 base64 编码）、突发并发（批量 Agent 任务同时触发工具调用扇出模式）、有状态双向流（MCP server-initiated events 推送至客户端）、推理批处理（Inference Extension 基于 GPU 指标的路由调度）


**生态定位**: 

> 统一 API+AI 网关：单一控制面同时管理 Envoy（传统 API 流量）和 agentgateway（AI/Agent 流量），是传统网关 AI 插件升级为统一网关的典型案例。通过 CNCF 厂商中立治理，与 Envoy、Istio、Kubernetes Gateway API、Gateway API Inference Extension 等 CNCF 项目深度整合。已加入 Agentic AI Foundation (AAIF) 与 MCP、Goose、Agents.md 共同构成 Agentic AI 基础设施栈。kubernetes 生态中的定位：kagent（Agent 框架）+ kgateway（网关基础设施）+ agentgateway（AI 数据面）= 完整的云原生 Agentic AI 基础设施方案



### 6. agentgateway

- **架构层级定位**: 传统 L7 网关（Envoy/Nginx/Kong）定位在 OSI 第 7 层（HTTP/gRPC 应用层），对请求内容无感知（body-blind）；agentgateway 定位在 L7+ / AI 应用层，深度理解 JSON-RPC 请求体、MCP 工具名称/参数语义、A2A Agent Card 和任务状态等 AI 专用上下文，实现协议感知路由和策略执行
**协议感知能力**: 

> 传统网关仅感知 HTTP 通用协议（method/URL/headers），SSE 流处理能力有限；agentgateway 深度感知 LLM 协议（Chat Completions/Messages）、MCP 协议（JSON-RPC/tools/list/tools/call）、A2A 协议（Agent Card/任务生命周期）、流式协议（SSE/Streamable HTTP 流合并）、AWS Bedrock 专有事件流格式、Token 用量自动提取和 TTFT 指标计算


- **状态模型**: 传统网关为无状态代理（请求-响应即结束，无会话上下文）；agentgateway 为有状态代理（SessionManager 维护 MCP 会话状态，管理长期 SSE 连接生命周期，维护 Token 预算计数器跨请求持久化，支持 Agent 卡注册和工具能力发现等有状态元数据）
- **计费模型**: 传统网关按请求级/带宽级计费或限流（RPS/连接数）；agentgateway 支持 Token 级计费（按 input/output Token 分别计量，多模型多价格公式）、金额预算计费（Token 数 x 模型单价 = 美元成本）、按时段聚合（小时/天级按用户/团队的消费报表）
- **路由粒度**: 传统网关基于 URL/Host/Header 静态规则路由；agentgateway 支持基于模型名的路由（同请求中按模型选择不同后端）、基于 Token 预算的路由（超预算用户拒绝而非消耗资源）、基于成本优化的路由（P2C 综合打分含延迟/健康/负载）、基于 KV Cache 状态的路由（GPU 推理场景），以及优先级组故障转移路由
- **缓存策略**: 传统网关使用 HTTP 缓存（ETag/Cache-Control/CDN/Vary 头）；agentgateway 目前无内置语义缓存（无基于向量嵌入的语义相似匹配），但有 KV Cache 感知路由（将推理请求路由到已缓存 KV 状态的 GPU 节点以减少重复计算），这是 AI 推理专用的缓存优化维度，是 HTTP 缓存无法覆盖的
- **安全模型**: 传统网关以 WAF/DDoS 防护/API 限流/CORS/IPS/IDS 为核心；agentgateway 安全模型扩展至 AI 特有威胁：Prompt 注入防护（系统覆盖/Jailbreak/提示提取）、数据防泄露（PII/凭证检测脱敏）、Token 级滥用检测（超预算自动拒绝）、工具投毒防护（工具伪/影子工具/命名冲突）、MCP Server 指纹签名验证、逐工具级 CEL 授权策略
- **内容转换**: 传统网关支持 HTTP 请求改写（Header/URL 重写）和响应修改（Body 过滤/注入）；agentgateway 扩展至：AI 请求/响应格式互转（OpenAI↔Anthropic 双向转换含工具定义/多模态/流式）、MCP 工具名称重写（多后端前缀合并）、Agent Card URL 重写、OpenAPI-to-MCP 完整协议转换、多 API 链式编排聚合为单工具
- **限流单位**: 传统网关限流单位为请求数/秒（RPS）或连接数；agentgateway 扩展至 Token/分钟、Token/天，也可配置金额预算/月。这是 AI 网关与传统网关最核心的差异维度之一：AI 服务的成本驱动因素不是请求数量而是 Token 消耗量（一次请求可能消耗数万 Token），且流式请求无法预先得知总 Token 量（仅能在流完成后扣除）
**流量特征**: 

> 传统网关处理同步短连接为主（毫秒级 RTT、小载荷 JSON）；agentgateway 处理 AI 特有流量模式：流式长连接（SSE 持续数分钟推送 Token 流）、大载荷（多模态请求含图片/音频 base64）、突发并发（批量 Agent 任务同时触发工具调用）、有状态双向流（MCP server-initiated events 推送）、MCP 扇出模式（单客户端请求触发多后端并行调用并合并流）


**生态定位**: 

> 独立 AI 网关（非传统网关插件），定位为 Agent-to-Agent 和 Agent-to-Tool 通信专用基础设施。同时兼具统一网关愿景（单一代理面处理 AI 流量+传统 API 流量），通过 kgateway 与 Envoy 在统一控制面下共存。已加入 Agentic AI Foundation (AAIF) 与 MCP、Goose、Agents.md 共同构成 Agentic AI 基础设施栈：MCP 为工具协议标准，agentgateway 为安全治理与连接基础设施层。属于独立 AI 网关 + 部分 Agent 治理平台定位



### 7. Lunar MCPX（Lunar MCP Gateway）

**架构层级定位**: 

> MCP应用层（L7+ / AI应用层）——位于AI Agent和MCP Server之间，专门处理MCP协议语义的工具调用路由与治理。与传统L4/L7网关（如Nginx/Envoy/Kong处理通用HTTP流量）处于不同层级，是互补而非替代关系。与Lunar AI Gateway组成双层AI网关架构：AI Gateway处理LLM API流量（L7+AI感知），MCPX处理MCP工具调用流量（应用层）。


- **协议感知能力**: MCP协议深度感知——原生理解MCP协议语义（工具声明、工具调用请求/响应、资源引用、Prompt模板）。统一管理Streamable HTTP和SSE两种MCP传输协议。通过Lunar Proxy扩展LLM协议感知（SSE流处理、Token计算、provisioned throughput监控）。传统网关（Nginx/Kong/Envoy）处理通用HTTP语义，需要自定义插件才能理解MCP协议。
- **状态模型**: 有状态——维护Consumer身份状态（通过Consumer Tags跟踪）、工具调用审计状态（持久审计日志）、配置状态（app.yaml/mcp.json）。企业版进一步加强状态管理：Eco Mode休眠空闲实例（保留状态）、Profiles和Groups映射关系持久化、不可变审计跟踪。传统网关通常无状态（或仅维护连接状态如sticky session）。
- **计费模型**: 混合计费模式——MCPX层追踪工具调用次数（Prometheus metrics和审计日志）。Lunar AI Gateway层提供Token级计费和金额级成本追踪（实时成本可见性、按模型/API的成本归属）。整体支持请求级+Token级+金额级的成本计量。无独立的计费系统或发票/结算功能。
- **路由粒度**: 工具级路由——基于MCP工具名、工具组（Tool Groups）、Consumer身份（Consumer Tags）进行路由决策。支持意图驱动路由（Agent仅接收当前任务相关工具）。Lunar AI Gateway扩展基于模型名、成本优化、延迟优先的LLM API路由。传统网关基于URL/Header/Host的通用路由。MCPX路由粒度从'请求'下沉到'工具调用'级别。
**安全模型**: 

> 工具级安全治理模型——不同于传统WAF/DDoS/限流/CORS模式，MCPX聚焦于：Prompt Injection检测与防护（AI驱动恶意模式扫描）；数据防泄露（端点白名单、风险分级阻止PII/数据外泄工具）；Tool级滥用检测（每工具每日调用次数监控、Consumer级别访问审计）；OWASP MCP Top 10对齐的复合风险评分；基于身份的工具最小权限访问控制（RBAC-like）。传统WAF/DDoS防护由Lunar AI Gateway或前置传统API网关处理。


- **内容转换**: 工具参数级转换——支持工具参数覆写（overrideParams）和工具描述重写（description rewrite）以提升LLM调用准确性。不支持跨LLM协议格式互转（OpenAI↔Claude↔Gemini请求响应格式转换）。不支持通用的HTTP请求/响应body改写。传统API网关提供丰富的HTTP请求改写/响应修改能力。MCPX的内容转换聚焦于'工具语义'级别而非'HTTP载荷'级别。
- **限流单位**: 消费者级工具调用限流——以Consumer（通过Consumer Tags标识）为粒度，按工具/工具组实施访问节流。不同于传统网关的'请求数/秒'限流，MCPX限流更关注'谁可以调用什么工具'而非'每秒多少请求'。通过Lunar Proxy扩展请求数/秒和Token/分钟的限流能力。无金额预算/月的限流单位（预算管理功能缺失）。
**流量特征**: 

> MCP工具调用流量+LLM API流量双模——MCPX处理MCP协议工具调用（流式长连接Streamable HTTP/SSE，工具声明和响应载荷）。Lunar Proxy处理LLM API流量（流式长连接SSE、秒级延迟、大载荷Token流）。架构需同时应对：低延迟工具调用（4ms P99开销要求）、流式响应聚合（多MCP服务器结果合并）、工具声明元数据管理（非负载性流量但影响Agent行为）。与传统API网关的同步短连接HTTP REST流量模式有本质区别。


- **生态定位**: MCP专用网关——纯MCP协议网关和聚合器，位于AI Agent → MCP Server路径中作为治理中间件。可与传统API网关并行使用（传统API网关管理REST/gRPC流量，MCPX管理MCP流量）。配合Lunar AI Gateway形成统一AI+API网关平台。属于MCP专用网关品类，不试图替代传统API网关。生态定位为Agent工具治理基础设施层。

### 8. Gravitee Agent Mesh（现称 Gravitee AI Agent Management）

**架构层级定位**: 

> Gravitee Agent Mesh 定位为 AI 应用层/L7+ 网关——即统一 API + AI + Agent 治理平台。它不是在传统 L7 网关之上叠加的 AI 插件层，而是将 AI 协议原生代理（LLM Proxy、MCP Proxy、A2A Proxy）与成熟的企业 API 管理平台（Gravitee APIM）深度耦合在同一运行时中。架构上位于 L7（处理 HTTP/HTTPS 路由和负载均衡）和 AI 应用层（深度解析 LLM/MCP/A2A 协议语义）之间。与传统 L4（TCP/UDP 连接级分发）和纯 L7 API 网关（仅关心 HTTP 路由和认证）不同，Agent Mesh 深入解析 AI 协议负载，理解 Token 用量、工具调用、Agent 身份和委托链等 AI 特定元数据。被 Gartner 认可为 AI 网关市场代表厂商（2025 Market Guide for AI Gateways）。


**协议感知能力**: 

> 传统 L7 网关仅进行 HTTP 通用处理（Header 解析、URL 路由、Body 透传），不具备 AI 协议感知。Gravitee Agent Mesh 具备深度 AI 协议感知：理解 LLM 协议语义（自动识别和转换 OpenAI/Gemini/Anthropic/Bedrock/VertexAI 各提供商格式）；理解 SSE 流式协议并逐 chunk 解析和规范化；理解 MCP JSON-RPC 2.0 协议并深度内省工具调用负载；理解 A2A 协议并识别 Agent Card 和任务委托流；理解 Token 经济（提取和计算各提供商的 prompt/completion Token 用量）；感知各提供商的速率限制和合规安全特性。实现了传统 HTTP proxy 无法做到的协议级流量治理。


**状态模型**: 

> 传统网关通常为无状态设计（每个请求独立处理）。Gravitee Agent Mesh 引入有状态能力：Token 预算跟踪状态（AI Token Rate Limit 策略跨请求持续追踪累计 Token 消耗）；语义缓存状态（向量存储中维护嵌入向量索引）；断路器状态（健康检查统计和故障计数）；Agent 身份会话状态（OAuth 2.1 Token 有效期和 RFC 8693 委托链状态）；OpenFGA 关系状态（ReBAC 元组定义的工具访问关系）。然而，核心代理路径仍保持响应式无阻塞的无状态设计理念，有状态逻辑集中在特定策略中，不存在原生的对话窗口跟踪或 Agent 上下文管理。


**路由粒度**: 

> 传统 L7 网关路由基于 HTTP 层元数据（URL 路径、Header、Host）。Gravitee Agent Mesh 支持更丰富的路由粒度：基于模型名的路由（LLM Proxy 根据消费者请求中的 model 字段自动映射到对应提供商和模型端点）；基于提供商的路由（同一模型可能路由到不同提供商，如 Claude 可通过 Anthropic 直连、AWS Bedrock 或 Vertex AI）；基于成本优化的路由（通过加权轮询将流量偏向低成本提供商）；基于 Expression Language 的动态路由条件。但与专用 AI 网关相比，缺少基于语义（向量嵌入匹配）、基于延迟优先或基于 Token 预算的路由策略。


**缓存策略**: 

> 传统 L7 网关的 HTTP 缓存依赖标准 HTTP 缓存头部（ETag、Cache-Control、CDN 边缘缓存），基于 URL 精确匹配。Gravitee Agent Mesh 提供两种扩展缓存策略：精确匹配缓存（Data Cache 策略，基于 key 的精确匹配，适用于完全相同的请求体）；语义缓存（AI Semantic Caching 策略，v4.11+，基于向量嵌入的语义相似匹配——将 Prompt 转换为向量嵌入后在 Redis HNSW 索引中查找语义最近邻，即使措辞完全不同也可命中缓存）。语义缓存支持 cosine、euclidean、dot product 相似度度量，阈值可配置，缓存命中返回零 Token 消耗的缓存响应。


**安全模型**: 

> 传统 L7 网关的安全模型以 WAF、DDoS 防护、请求速率限流、CORS、IP 黑白名单为主。Gravitee Agent Mesh 在继承上述全部传统安全能力的基础上扩展 AI 专用安全层：Prompt Injection 防护（Guard Rails 基于 AI 分类模型检测越狱和恶意 Prompt 注入）；数据防泄露（PII Filtering 基于 ONNX 模型在输入/输出双侧脱敏 13 类敏感信息）；Token 级滥用检测（AI Token Rate Limit 策略防止通过高频高 Token 消耗攻击耗尽配额）；Agent 身份治理（OpenFGA ReBAC 实现工具级细粒度授权，RFC 8693 Token Exchange 防止委托链滥用）。安全边界从 HTTP 流量层扩展到 Prompt 语义、Token 经济和 Agent 委托关系三个维度。


**内容转换**: 

> 传统 L7 网关的内容转换限于 HTTP 层面（header 改写、URL 重写、body 替换）。Gravitee Agent Mesh 提供更深层的 AI 内容转换能力：请求改写（LLM Proxy 将统一的 OpenAI 格式请求自动翻译为各提供商原生格式）；模型切换（运行时根据请求参数动态路由到不同提供商和模型）；提供商格式互转（Gemini↔OpenAI↔Anthropic↔Bedrock↔VertexAI 自动双向转换）；降级 Fallback（通过断路器和重试策略在提供商不可用时自动切换）；API-to-MCP 转换（将 REST API 零代码转换为 MCP 工具，让人类和 Agent 共享同一 API 基础设施）。


**流量特征**: 

> 传统 L7 网关主要处理同步短连接（HTTP request→response→close，毫秒级延迟，KB 级载荷）。Gravitee Agent Mesh 面临不同的流量特征：流式长连接（SSE streaming 模式下 TCP 连接可能保持数秒至数分钟，逐 Token 推送响应）；秒级延迟（LLM 推理延迟通常在 1-60 秒远超传统 API 的毫秒级，网关超时和连接池管理策略需相应调整）；大载荷（请求 JSON 可能包含完整对话历史和大型 Prompt，达数百 KB）；协议多样性（同时处理 REST/SSE/WebSocket/MCP/A2A 五种协议流量，对统一运行时提出更高要求）。Gravitee 基于 Vert.x 的非阻塞响应式架构在理论上适合处理此类长连接、大并发的混合流量特征。


**生态定位**: 

> Gravitee Agent Mesh 定位于'统一 API+AI+Agent 治理平台'——即全栈 API 管理平台中深度集成的 AI 原生治理层，而非独立 AI 网关或插件式 AI 扩展。在三层生态谱系中处于最完整的层级：同时涵盖传统 API 管理（REST/SOAP/GraphQL/事件流）+ AI 网关（LLM Proxy 含 Token 治理和安全）+ Agent 治理（MCP Proxy + A2A Proxy + Agent Catalog + OpenFGA 授权）。与独立 AI 网关（LiteLLM/Portkey/Helicone）相比，Gravitee 在传统 API 管理成熟度上领先，但在 AI 专用功能深度（评估/优化器/提示注册表）上不足；与 API 网关 AI 插件方案（Kong AI Gateway）相比，Gravitee 提供更原生的 AI 协议支持和更完整的 Agent 治理能力；与纯 MCP 网关相比，Gravitee 覆盖 LLM + MCP + A2A 全协议栈，形成单一控制面治理的差异化优势。



### 9. Gate22

- **架构层级定位**: AI 应用层（L7+）。Gate22 位于 Agent 与 MCP Server 之间，工作在 MCP 协议层（基于 JSON-RPC），不处理传统 HTTP/HTTPS 请求路由。与传统 L4/L7 网关的网络层定位不同，Gate22 专注于 AI Agent 工具调用的治理——权限校验、凭证注入、工具发现和审计
**协议感知能力**: 

> MCP 协议深度感知。Gate22 理解 MCP 协议语义（工具列表、工具调用、资源暴露），可将多 MCP 服务器聚合为统一的 search + execute 双函数接口。支持 MCP 工具列表刷新与差异视图。与传统网关仅处理 HTTP 请求/响应不同，Gate22 深度感知 Agent 与工具的交互语义。但不处理 LLM 供应商 API 协议（如 OpenAI/Anthropic API 格式），不进行 SSE 流解析优化或 provisioned throughput 管理


- **状态模型**: 有状态。Gate22 维护丰富的持久化状态：（1）组织/项目/用户层级关系；（2）MCP 服务器配置和凭证（OAuth2 Token 加密存储）；（3）函数级 allow-list 权限策略；（4）Bundle 组合配置；（5）审计日志记录（每次工具调用）。与传统网关的无状态或弱状态模式（仅限连接跟踪）有本质区别
- **计费模型**: 治理层计费。Gate22 本身不对工具调用进行 Token 级计费，其计费模式体现在：（1）ACI.dev 平台侧的订阅计费（Stripe 集成）—— 按团队规模定价（Free → Team $29/月 → Enterprise）；（2）远期路线图规划按用户/团队/应用/函数的配额与预算管控。传统网关采用请求数/带宽计费，Gate22 采用与 AI 治理维度对齐的计费思路
**路由粒度**: 

> 基于函数级权限和 Bundle 配置的路由。Gate22 的路由决策基于：（1）函数级 allow-list — 按 MCP 配置精细化控制可调用工具；（2）Bundle 组合 — 开发者选择被授权的 MCP 配置组装个人 Bundle；（3）运行时动态工具解析 — search + execute 在调用时动态发现和路由工具。与传统网关基于 URL/Header/Host 的路由完全不同，不涉及模型名/成本/延迟等 AI 网关典型路由维度


- **缓存策略**: 语义工具发现，非响应缓存。Gate22 使用 PostgreSQL + pgvector 实现向量相似性搜索用于工具发现和匹配；不实现 HTTP 级缓存（ETag/CDN）或 LLM 语义缓存（基于向量嵌入的语义相似响应匹配）。与传统网关和 AI 模型网关的缓存策略均有显著差异：Gate22 的「缓存」服务于治理层的工具发现，而非加速响应或降低成本
**安全模型**: 

> Agent 工具访问治理安全模型。核心安全维度：（1）函数级最小权限 — 管理员预设 allow-list，开发者仅能调用被授权的工具；（2）凭证隔离 — 组织共享 vs 按用户独立的凭证模式；（3）审计日志 — 追踪每次工具调用；（4）权限分离 — 管理员管理配置和凭证，开发者组装 Bundle；（5）路线图中的 Prompt 注入防护和策略即代码。与传统网关的 WAF/DDoS/限流/CORS 安全模型正交互补，与传统 AI 网关的 Prompt 注入 + 数据防泄露 + Token 级滥用检测相比，更侧重于组织治理和访问控制，内容安全检查尚在规划中


- **内容转换**: MCP 协议级别工具聚合。Gate22 的核心转换是将多 MCP 服务器的多工具聚合为统一的 search + execute 双函数接口（Bundle 机制），属于 MCP 协议级别的转换，而非 HTTP 请求改写或 LLM 格式互转。不进行模型供应商 API 格式互转（OpenAI↔Claude↔Gemini），不实现降级 fallback 或模型切换
**流量特征**: 

> MCP 协议流量。Gate22 处理的是 Agent 与工具间的 MCP 协议流量（基于 JSON-RPC，支持 SSE 流式传输），而非直接 LLM API 调用流量。流量模式特征：（1）工具发现请求（list tools）— 低频率；（2）工具调用请求（call tool）— 中等频率，包含结构化参数；（3）流式工具响应 — 通过 SSE 推送。与传统 HTTP 短连接 API 调用和 AI 网关的流式长连接大载荷场景均有差异


**生态定位**: 

> MCP 专用网关 + Agent 治理平台。Gate22 定位为团队级 AI Agent 工具治理控制平面，区别于：（1）独立 AI 网关（如 Portkey/Helicone）— Gate22 不代理 LLM API；（2）API 网关 AI 插件（如 Kong AI Plugin）— Gate22 是独立 MCP 网关，非传统网关的扩展；（3）统一 API+AI 网关 — Gate22 仅处理 MCP 工具调用治理；（4）Agent 框架内置网关 — Gate22 是独立部署的外部治理层。其独特生态位是「组织级 MCP 工具治理中间件」，聚焦于谁可以用什么工具、如何审计，而非 LLM 调用的路由/缓存/成本优化



### 10. WSO2 AI Gateway（WSO2 AI 网关）

- **架构层级定位**: L7+ AI 应用层：WSO2 AI Gateway 构建于 WSO2 API Manager（传统 L7 网关）之上，形成 AI 专用治理层。数据面基于 Envoy Proxy（WSO2 Kubernetes Gateway）提供高性能代理，控制面由 WSO2 API Manager 提供全生命周期管理。本质上是在传统 L7 网关基础上叠加 AI 语义感知层的融合架构
- **协议感知能力**: 传统 HTTP 通用处理（继承自 WSO2 API Manager）+ LLM 协议深度感知：能够解析和代理 SSE 流式响应、统计 Token 计算（prompt/completion）、管理 provisioned throughput、理解 LLM 请求-响应语义结构；额外原生支持 MCP JSON-RPC 协议用于 Agent 工具交互；具备 gRPC/WebSocket 等多协议处理能力
- **状态模型**: 有状态设计：AI Gateway 需要维护 Token 预算累积状态（跨请求追踪 Token 消耗）、语义缓存状态（向量嵌入索引 + 缓存条目 TTL）、会话上下文（请求-响应关联、占位符映射用于 PII 还原）、MCP 连接桥接状态（Streamable HTTP 会话）。相比传统网关的无状态请求-响应模型有本质区别
- **计费模型**: Token 级计费为核心，提供三层计费模型：（1）请求级计费（传统请求计数）；（2）Token 级计费（prompt tokens + completion tokens 分别计量）；（3）金额预算计费（基于多模型价格换算的成本估算和上限）。支持按时间窗口（每分钟/小时/天）聚合和多模型价格换算，区别于传统网关的纯请求计数模型
- **路由粒度**: 基于 AI 语义的路由决策，粒度远超传统网关：（1）基于模型名路由（选择特定 LLM 模型）；（2）基于 Token 预算路由（消费预算接近上限时切换到低成本模型）；（3）基于成本优化路由（简单查询→低成本模型，复杂任务→高性能模型）；（4）基于延迟优先路由；区别于传统网关基于 URL/Header/Host 的简单路由
**缓存策略**: 

> 语义缓存（Semantic Caching）：基于向量嵌入（Embedding）的语义相似匹配，使用 L2 欧氏距离而非精确 URL 匹配。'如何重置密码'和'密码更换流程'被视为相同语义，命中同一缓存。配置项包括：嵌入提供商选择、向量数据库后端（Zilliz/Milvus）、相似度阈值、TTL。官方宣称减少 40%-60% 的 API 调用。区别于传统 HTTP 缓存（ETag/CDN/Vary/精确 URL 匹配）


**安全模型**: 

> AI 原生安全模型，超越传统 WAF/DDoS/CORS：（1）Prompt Injection 防护（语义护栏检测越狱和恶意注入）；（2）数据防泄露（输入输出双侧 PII 脱敏）；（3）Token 级别滥用检测（异常 Token 消耗模式识别）；（4）语义意图检测；（5）工具调用级访问控制（MCP scope 粒度）；（6）幻觉 URL 检测（URL 护栏验证 URL 可达性）。同时继承传统 WAF/DDoS/限流/CORS 能力


**内容转换**: 

> AI 感知的内容转换能力：（1）请求改写：通过 Regex 护栏和提示模板统一格式化请求；（2）模型切换：基于路由策略动态切换 LLM 模型；（3）PII 双向脱敏还原：请求侧脱敏 → LLM 处理 → 响应侧还原；（4）Guardrails 格式校验：JSON Schema 输出强制、内容长度/词数控制；（5）降级 Fallback：自动切换到备用模型或返回缓存。区别于传统 HTTP 请求改写/响应修改


- **限流单位**: 核心差异维度之一，WSO2 AI Gateway 支持多维度限流：（1）请求数/秒（传统维度）；（2）Token/分钟（prompt tokens + completion tokens 分离限流）；（3）金额预算/月（基于多模型价格换算的成本上限）。传统网关仅有请求数/秒维度
- **流量特征**: AI 网关需处理与传统网关迥异的流量特征：（1）流式长连接：SSE/WebSocket 持久连接，响应时间可能长达数十秒；（2）秒级延迟敏感：LLM 推理延迟叠加网关处理延迟需要优化；（3）大载荷：LLM 请求/响应体可能包含大量上下文（数十 KB 至数 MB）；（4）突发性：Agent 可能在短时间内发起大量 MCP 工具调用。这些特征要求网关在连接管理、缓冲策略、背压控制等方面做专门设计
**生态定位**: 

> 统一 API + AI 网关模式（传统 API 管理平台 + AI 插件扩展）：WSO2 AI Gateway 不是独立 AI 网关，也不是纯传统 API 网关，而是将 AI 治理能力内嵌于 WSO2 API Manager 这个成熟的 API 全生命周期管理平台中。其定位是'AI 就绪的 API 平台'——在同一控制面下统一管理传统 API（REST/GraphQL/gRPC）、LLM 调用（出向）和 MCP 工具（入向），实现 API 管理与 AI 治理的融合。区别于纯 AI 网关（如 Portkey、Helicone）和 AI 插件网关（如 Kong AI Gateway 插件），WSO2 的优势在于完整的 API 生命周期 + AI 治理 + MCP Hub 三合一



### 11. Plano（原名 Arch Gateway / archgw）

- **架构层级定位**: 定位为 L7+/AI 应用层。Plano 构建在 Envoy（L7 代理）之上，但处理的是 AI 特定的语义层（Prompt 意图理解、Agent 路由、Token 级追踪），而非仅 HTTP 协议层。团队表述：'Kong 为 API 设计，Envoy 为微服务构建，Arch 为 Agent 构建。' 作为 out-of-process dataplane，等同于 AI 时代的 Envoy。
- **协议感知能力**: 与标准 HTTP 代理不同，Plano 深度感知 LLM 协议：理解 OpenAI Chat Completions API 语义、SSE 流式响应、Token 使用量、模型路由决策、工具调用（Function Calling）。内置轻量 LLM 模型用于 Prompt 意图分析和路由决策。可自动提取 Prompt 参数并映射到后端 API 调用。
**路由粒度**: 

> 支持多层级路由：1) 基于模型名称的显式路由（如 anthropic/claude-sonnet-4-5）；2) 基于语义别名路由（Model Aliases）；3) 基于偏好自动路由（Arch-Router 1.5B 模型，通过自然语言偏好策略实现 Domain-Action 映射）；4) Agent 级别路由（Plano Orchestrator 4B 模型，基于 Agent 描述做意图分类）。路由策略可动态调整，无需重新训练路由器（偏好策略与模型绑定解耦）。


- **生态定位**: 独立 AI 网关 + Agent 治理平台的混合定位。作为 AI-native dataplane，Plano 不依附于任何传统 API 网关，独立处理 AI 流量。同时具备 Agent 编排能力（多 Agent 路由与协调），向 Agent 治理平台方向演进。团队愿景是成为「AI Agent 的 Envoy」——一个通用的、与框架无关的 Agent 数据面基础设施。

### 12. Docker MCP Gateway

- **架构层级定位**: MCP 应用层网关，位于 AI 客户端与 MCP 工具服务器之间（AI Client → MCP Gateway → MCP Servers/Docker Containers），属于 L7+ AI 应用层。专注处理 MCP 协议（JSON-RPC 2.0），与传统 L4（TCP/UDP 负载均衡）和 L7（HTTP 反向代理）网关层级不同。不处理通用 HTTP 流量，仅处理 MCP 标准协议通信
**协议感知能力**: 

> 深度感知 MCP 协议语义而非通用 HTTP：理解 MCP 初始化握手（Initialize → ListTools/ListPrompts/ListResources → CallTool/GetPrompt/ReadResource）；感知 MCP 能力协商（Capabilities）、工具描述（Tool Schema）、提示词模板（Prompt Templates）、资源 URI 体系；理解 MCP 传输层差异（stdio 进程通信 vs SSE 持久连接 vs Streamable HTTP 会话管理）。传统网关仅理解 HTTP Method/Header/Body


**状态模型**: 

> 有状态网关：管理 MCP 客户端会话（每个 AI 客户端独立的连接池和 OAuth 令牌生命周期）、OAuth 2.1 令牌缓存和自动刷新、Profile/WorkingSet 配置状态（当前启用的 MCP Server 集合和工具白名单）、动态 MCP Server 生命周期（启动/停止容器）。但会话状态不同于 LLM 级别的上下文窗口跟踪或 Token 预算管理。传统网关通常无状态或仅维护连接级状态


- **计费模型**: 不涉及 LLM 计费（非 LLM API 代理网关）。Docker MCP Gateway 定位为 MCP 工具调用的基础设施层代理，处理的是工具调用请求（如搜索网页、读写文件、查询数据库）而非 LLM 推理请求，因此无 Token 级计费或金额预算计费。传统 API 网关按请求数计费
**路由粒度**: 

> 基于 MCP 语义的路由：按 MCP Server 名称路由（如 brave-search、github、duckduckgo）、按 MCP 工具名路由（如 brave_web_search、github.create_issue）、按 Profile/WorkingSet 配置路由（不同会话启用不同的 MCP Server 集合）、Policy System 基于目录/服务器/工具/提示词四级的策略路由。支持动态工具发现（`mcp-find`）和运行时按需加载（`mcp-add`）。传统网关基于 URL Path/Header/Host/Cookie 路由


- **缓存策略**: 无语义缓存（基于向量嵌入的语义相似匹配）、无精确匹配响应缓存、无 HTTP 缓存（ETag/CDN/Vary）。仅提供 MCP 客户端连接池缓存（通过 keptClients 映射实现长连接复用，避免重复握手）和 OAuth 令牌缓存（带自动失效刷新）。传统 API 网关通常支持 HTTP 级缓存（基于 URL 的响应缓存）
**安全模型**: 

> 以 Agentic AI 安全为核心的多层防御体系：容器沙箱隔离（受限权限、网络、资源）+ Docker Content Trust 镜像签名验证（`--verify-signatures`，含 SBOM 溯源）+ Interceptor 拦截器链（Prompt 注入检测、密钥泄露扫描 `--block-secrets`、跨仓库会话锁定）+ Policy System 四级访问控制（目录/服务器/工具/提示词、Allow/Block/Warn）+ OAuth 2.1 认证（含 DCR）+ 密钥不落盘（Secrets Engine）。传统网关安全模型为 WAF/DDoS/CORS/限流


- **内容转换**: 基于 Interceptor 拦截器的 MCP 请求/响应修改（非 LLM 格式互转如 OpenAI↔Claude↔Gemini）。支持 jq 输出过滤、Exec（Shell 脚本处理 JSON stdin/stdout）、Docker（容器化处理）、HTTP（外部服务调用）三种拦截器模式实现内容转换。传统 API 网关支持 HTTP 请求改写/响应修改/Header 注入
- **限流单位**: 无内置速率限制机制。不涉及请求数/秒（传统网关限流单位）或 Token/分钟（AI 网关限流单位）或金额预算/月的限流概念。Policy System 提供的是访问控制（允许/阻止/警告）而非流量控制（速率/并发/配额）
**流量特征**: 

> MCP 工具调用流量特征：stdio 模式为本地子进程通信（低延迟、单客户端）；SSE 模式为 HTTP 持久长连接（多客户端、适合远程访问）；Streamable HTTP 模式为标准 HTTP 请求/响应（带 Mcp-Session-Id 会话亲和性）。非 LLM API 典型的高并发流式大载荷场景（如数千 token 的流式生成响应）。工具调用请求负载通常较小（函数参数），响应大小因工具类型而异


**生态定位**: 

> MCP 专用网关，容器原生 MCP 网关事实标准。生态定位为：与 Docker MCP Catalog（300+ 已验证 MCP 服务器，100 万+ pulls）深度绑定的 MCP Server 聚合与安全管理平台；部署在 Docker 容器生态内（Docker Desktop/Docker Engine/Docker Compose）；非通用 AI 网关（不支持直接路由 LLM API 请求）、非传统 API 网关插件（非 Kong/APISIX 生态）、非 Agent 治理平台（无 Agent 行为监控、任务编排）。是 MCP 协议生态中的基础设施层，类似 Docker 在容器生态中的角色



### 13. Envoy AI Gateway

**架构层级定位**: 

> L7+ / AI 应用层网关。Envoy AI Gateway 构建在 Envoy Proxy 的 L7 HTTP 过滤器之上，通过 ext_proc 外部处理器扩展出 AI 应用层语义感知能力（解析请求体中的模型名称、Token 计数、提示词内容），实现 L7 HTTP 协议处理与 AI 业务逻辑的分离架构。底层 Envoy 处理标准 L4/L7 流量代理（TLS 终结、连接池、HTTP 路由），AI 逻辑由 Go ExtProc Sidecar 处理（Schema 转换、凭据注入、Token 追踪）


**协议感知能力**: 

> 超越传统 HTTP 通用处理，具备 LLM 协议深度感知能力：自动解析 OpenAI/Anthropic/AWS Bedrock 等 16+ 提供商的专有 API Schema；实时提取 Token 用量（Input/Output/Total Token 及 CEL 自定义计费公式）；处理 SSE 流式响应（逐 Token 输出场景下的格式转换和 Token 累计）；归一化不同提供商的流式事件格式为统一的 OpenAI SSE 格式；感知 Streamable HTTP 长连接（MCP）的会话管理；不感知 provisioned throughput 概念（此为提供商侧资源预配能力，非网关范畴）


**状态模型**: 

> 有状态 AI 网关。区别于传统网关的无状态设计（每个 HTTP 请求独立处理），Envoy AI Gateway 维护：会话状态（MCP Streamable HTTP 会话，通过加密编码到客户端 Session ID 实现无共享存储的状态管理）；Token 预算状态（全局速率限制需 Redis 存储累计 Token 消耗量，跨代理副本共享）；上下文窗口追踪（通过 OpenInference 分布式追踪关联多轮对话的 Session ID）；KV-cache 亲和状态（通过 Endpoint Picker 维护 Pod 与缓存状态的路由关联）


**计费模型**: 

> Token 级计费 + 金额预算计费。区别于传统网关的请求级计费（按请求次数），Envoy AI Gateway 支持：Token 级计费（自动提取 Input/Output/Total Token，支持按用户/模型/时间窗口累计）；金额预算计费（通过 CEL 表达式自定义成本公式，如加权计费 input_tokens * 0.5 + output_tokens * 1.5）；Token 消耗实时追踪和超预算 429 拦截（在向昂贵提供商发起实际调用前拒绝）；支持不同模型的差异化配额（GPT-4 严格限制 1,000 Token/小时 vs GPT-3.5 宽松 5,000 Token/小时）


**缓存策略**: 

> 混合缓存策略。提供商原生 Prompt 缓存（v0.5.0+）：通过统一 cache_control API 启用 AWS Bedrock Claude 和 GCP Claude 的 Prompt 缓存，针对重复前缀的请求减少 Token 消耗，但此缓存由提供商侧管理。语义缓存（社区讨论中）：基于向量嵌入的语义相似匹配，复用相似请求的响应，预计可降低 API 成本 40-65%，Redis + Vector DB 作为缓存后端。差异对比：传统网关使用 HTTP 缓存（ETag/CDN/Vary）基于 URL/Header 匹配，AI 网关语义缓存基于内容语义相似度匹配，可命中字面不同但含义相同的请求


**安全模型**: 

> AI 专用安全扩展。区别于传统网关的 WAF/DDoS/限流/CORS 安全模型，Envoy AI Gateway 扩展了：Prompt Injection 防护（通过 ext_proc 接入审核服务）；数据防泄露（通过扩展机制实现 PII 检测和脱敏）；Token 级别滥用检测（Token 消耗模式异常检测，关联用户行为）；集中化的多提供商凭据管理（凭据注入而非透传，减少密钥泄露面）。与传统安全模型属于互补叠加关系，非替代。Envoy 的 DDoS、WAF、限流能力在底层 L4/L7 层面仍然可用


**内容转换**: 

> AI 语义转换。区别于传统网关的 HTTP 请求改写/响应修改（Header 修改、URL 重写、Body 正则替换），Envoy AI Gateway 执行：多提供商 API Schema 互转（OpenAI ↔ Anthropic ↔ Gemini ↔ Bedrock 格式的双向转换）；角色映射（system/developer ↔ system_instruction）；路径重写（/v1/chat/completions → provider-specific 路径）；流式格式归一化（不同 SSE 流格式统一输出）；模型名称虚拟化（客户端使用统一模型名，网关映射到提供商实际模型名）；跨提供商降级 Fallback（自动切换备选提供商并重新执行 Schema 转换和认证注入）


**限流单位**: 

> Token/分钟 + 金额预算/月 + 请求数辅助限制。最核心的差异维度之一：传统网关限流单位为请求数/秒或并发连接数，Envoy AI Gateway 的限流单位为 Token/时间窗口（Input Token、Output Token、Total Token 分别配置额度），支持 CEL 自定义金额预算（如每月每团队 $500 等价 Token 额度），保留请求数限制作为辅助维度。使得超预算拦截发生在实际调用前，避免昂贵的无效调用


**流量特征**: 

> 流式长连接 + 大载荷 + 秒级延迟的 AI 流量特征。区别于传统网关的同步短连接（请求-响应在毫秒内完成、固定响应大小），Envoy AI Gateway 处理：流式 SSE 长连接（持续数秒至数分钟的 Token 逐字输出）；大载荷请求（提示词可达数万 Token，远大于传统 API JSON Body）；高延迟容忍（LLM 推理延迟秒级，网关延迟开销意义不同）；流式连接的中间状态处理（TTFT 作为延迟关键指标，TPOT 作为吞吐指标）；MCP 的持久化 Streamable HTTP 连接（Agent 与工具间长会话）。流量特征差异驱动了 ExtProc + Sidecar 的分离架构设计（避免 AI 处理阻塞高吞吐数据面）


**生态定位**: 

> 传统网关 AI 插件（基于 Envoy 生态的 AI 网关扩展）。Envoy AI Gateway 不是独立 AI 网关，而是深度嵌入 Envoy Gateway 生态的 AI 扩展层：它利用 Envoy 成熟的 L7 过滤器架构、xDS 配置管理、Redis 全局速率限制等基础设施；通过 CRD 和 Admission Webhook 注入 AI 处理逻辑（ExtProc Sidecar）；聚焦于 LLM 流量管理而非替代通用 API 管理。市场定位介于纯独立 AI 网关（如 LiteLLM、Portkey）和统一 API+AI 网关（如 Kong AI、APISIX AI 插件）之间——它属于传统网关的 AI 插件生态定位，且因其 CNCF Envoy 背景具有独特的社区中立性和可移植性优势



### 14. GPT-Load

**架构层级定位**: 

> L7+/AI应用层。GPT-Load定位为AI API透明代理层，工作在HTTP/7层之上。与传统L4/L7网关（Nginx/Envoy等）不同，GPT-Load深度理解AI API的认证方式（Bearer Token/Query Param/x-api-key等）和路由语义（分组/模型重定向/上游地址），但相比完整AI网关（如LiteLLM/Kong AI Gateway），其功能聚焦在密钥池化与轮转这一垂直领域，不做协议转换、Token计数等更宽泛的AI网关能力


**协议感知能力**: 

> 特定AI协议感知：理解不同AI提供商的认证注入方式（OpenAI的Authorization Bearer、Gemini的Query Param key、Anthropic的x-api-key头），根据渠道类型自动注入正确的认证凭据。感知SSE流式协议，支持零拷贝流式透传。相较于传统7层网关的通用HTTP处理（仅处理请求头/响应头/Body透传），GPT-Load有AI特定的认证感知和路由能力。但不感知Token数量、不解析请求/响应的AI语义内容


- **状态模型**: 半有状态设计：维护密钥池状态（活跃/黑名单/失败计数）、分组配置状态（热重载）、密钥选择循环状态（Redis队列位置）。请求处理本身是无状态的（每个请求独立选择密钥并转发）。传统网关通常为无状态或仅维护连接级状态。GPT-Load的密钥失败计数、黑名单定时恢复、聚合分组权重轮询均需维护持久化状态
- **计费模型**: 请求级计费为主：仅记录请求次数和成功/失败状态，无Token消耗量统计。不支持Token级计费，不支持金额预算计费。这与传统7层网关的请求级计费类似，但与完整AI网关（如LiteLLM的Token级计费、Kong AI Gateway的按模型定价）有本质区别
**路由粒度**: 

> 基于AI特定维度的路由：按分组名称路由（URL路径中的/proxy/{group_name}）、按模型名称重定向（group内配置模型映射规则）、按上游地址权重路由（多个上游端点加权选择）、按密钥可用性路由（跳过黑名单密钥）。支持请求头规则（修改/添加/删除Header）。相较于传统网关基于URL/Host/Header的通用路由，GPT-Load增加了分组级模型重定向和基于密钥健康状态的智能路由能力，但不支持基于Token预算、成本优化或延迟优先的复杂路由策略


**缓存策略**: 

> 内存缓存+Redis缓存策略：缓存活跃密钥池列表（Redis LIST）、分组配置（Pub/Sub同步）、系统设置。目标是实现密钥选择的快速无锁原子操作。配置变更通过Redis Pub/Sub实时广播到所有集群节点，实现热重载。缓存内容为元数据和密钥池，不缓存AI响应内容。不支持HTTP语义缓存（ETag/CDN/Vary等），不支持基于向量嵌入的语义缓存（语义相似匹配缓存），不支持Prompt-Response精确匹配缓存


**安全模型**: 

> API Key级别的访问控制安全：密钥加密存储（AES）、双重认证分离（管理端/代理端）、代理密钥分组级别隔离、请求路径中的分组名鉴权。安全模型侧重于API Key的安全管理和防滥用（黑名单/失败计数）。不像传统网关具备WAF（Web应用防火墙）、DDoS防护、CORS策略（虽然支持CORS配置）、通用IP限流等网络层/HTTP层安全能力。无Prompt注入防护、无PII数据防泄露检测、无Token级别的异常使用行为检测


**内容转换**: 

> 零转换透明代理：绝对不修改请求和响应内容。仅做必要的认证注入（在请求中添加/修改Authorization头或query param）和请求头规则处理。模型重定向仅在请求路径层面进行，不进行请求体级别的格式转换。降级fallback通过密钥轮转实现（而非模型切换）。这与完整AI网关的请求/响应格式深度转换（OpenAI↔Claude↔Gemini互转）形成鲜明对比。传统网关的HTTP改写（Header修改/URL重写）与之相似但不涉及AI认证注入


- **限流单位**: 以最大并发连接数为限流单位（默认100），辅以基于失败计数的密钥级熔断黑名单。不按Token消耗量限流，不按金额预算限流。核心限流策略是：通过多密钥轮转规避上游提供商的RPM/TPM限制，而非在网关层自主实施细粒度限流。这与传统网关的RPS限流（请求/秒）类似，但与AI网关的Token级限流有本质区别——无法感知单次请求的Token消耗差异（一次调用可能消耗10 Token或10万Token）
**流量特征**: 

> 面向LLM流量但处理方式相对简单：支持流式长连接（SSE持续推送，零拷贝透传），连接超时默认600秒以适应长推理时间。连接池复用（max_idle_conns=100, per_host=50）优化频繁的API调用。请求到达率受限于上游API的RPM限制（通过密钥轮转缓解）。相较于传统网关的短连接、毫秒级延迟模型，GPT-Load适配了AI API的长连接和大响应特征。但相比完整AI网关，缺少对Token预算追踪、上下文窗口管理、provisioned throughput调度等更高级的AI流量特性处理


**生态定位**: 

> 独立AI密钥池代理：定位为垂直领域的AI API密钥高可用方案。核心功能包括密钥池化管理（批量导入、分组管理、加密存储）、智能轮转（Redis原子操作、自动黑名单恢复）、负载均衡（平滑加权轮询、聚合分组）。属于AI网关生态中的轻量级组件，专注于解决密钥可用性问题，而非完整的AI网关平台。典型使用模式：作为New API/One API的下游层，负责密钥轮转和防限流。也可独立使用于简化场景（大量同厂商Key的轮询代理）。不等同于传统API网关的AI插件，也不等同于MCP专用网关或Agent治理平台



### 15. Helicone

**架构层级定位**: 

> Helicone AI 网关定位在 L7+/AI 应用层。传统 L4/L7 网关（Nginx/Envoy/Kong）处理通用 HTTP 负载均衡和反向代理，Helicone 在此基础上增加了 AI 专用感知层：理解 LLM 协议语义、Token 计数、模型路由、缓存策略。典型部署中 Helicone 位于传统 L7 网关之后作为 AI 专用层，形成分层架构：L4/L7 边缘网关（TLS/WAF/连接管理）→ Helicone AI 网关（模型路由/成本控制/可观测性/缓存）→ LLM 提供商。Helicone 不替代传统网关，而是增加一个 AI 感知的治理和可观测层


**协议感知能力**: 

> 传统 L7 网关：通用 HTTP 处理，将请求视为不透明字节流，无法区分 Token 边界或理解 LLM API 语义。Helicone：深度 LLM 协议感知。解析 OpenAI/Anthropic/Google 等 API 格式并自动转换；感知 SSE 流中的 Token 和 finish_reason；实时计算 Token 消耗和成本；支持模型名称路由（如 gpt-4o → OpenAI, claude-sonnet-4 → Anthropic）；理解不同提供商的错误码和速率限制语义。核心差异：传统网关看到请求数和字节数，Helicone 看到 Token 和模型语义


**状态模型**: 

> 传统 L7 网关：本质上无状态（请求之间独立），不追踪会话或累积使用量。Helicone：有状态 AI 网关。维护多维度状态：1）会话管理（通过 Session ID 将多轮对话归组）；2）Token 使用量累积统计；3）成本累积和预算告警；4）速率限制计数器。状态通过 Cloudflare Workers KV（平台层）、内存/Redis/S3（网关层）和 ClickHouse/PostgreSQL（持久化）实现。核心差异：传统网关不需要追踪 Token 和成本状态，Helicone 必须维护这些 AI 特定状态才能实现可观测性和治理


**计费模型**: 

> 传统 L7 网关：请求级计费（按请求数/秒计费，与调用实际资源消耗无关）。Helicone：双计费模型。1）Pass-Through Billing（PTB）：按实际 Token 消耗计费，基于 300+ 模型价格数据库自动换算美元成本，0% 加价（仅代付）；2）BYOK：用户使用自己的提供商密钥，Helicone 不计费但追踪 Token 和成本。计费归因支持多维度：按用户/会话/自定义属性切片成本。核心差异：传统网关按调用次数限流和计费，Helicone 按 Token 消耗计费——这是最根本的差异，因为 1 次请求可能消耗 10 tokens 或 100K tokens，成本差异极大


**路由粒度**: 

> 传统 L7 网关：基于 URL 路径、HTTP Header、Host 域名进行路由决策，路由规则是静态的正则匹配。Helicone：基于 AI 语义的多维路由。1）模型名路由：根据 model 参数自动路由到对应提供商；2）成本优化路由：自动选择最便宜的提供商；3）延迟优先路由：P2C + PeakEWMA 选择延迟最低的提供商；4）加权路由：按配置权重分配流量；5）Fallback 路由：主模型不可用时自动切换备用模型。核心差异：传统网关看 URL 和 Header，Helicone 看模型名、成本、延迟和可用性


**缓存策略**: 

> 传统 L7 网关：HTTP 级缓存（ETag/If-None-Match、Cache-Control max-age、CDN 边缘缓存、Vary Header）。基于 URL 精确匹配，缓存完整 HTTP 响应。Helicone：AI 专用精确匹配缓存。缓存键基于请求 URL + Body + Headers + Seed + Bucket Index 的哈希生成。支持 Bucket 缓存（存储多条不同响应应对非确定性提示词）。缓存后端：Cloudflare Workers KV（平台层，300+ 全球边缘节点），内存/Redis/S3（AI 网关卡）。可配置 TTL（默认 7 天，最长 365 天）。缓存命中可降低 95% 延迟和成本。不支持语义缓存（基于向量嵌入的相似匹配，如'How do I reset my password?'命中'Password reset instructions'的缓存）。核心差异：传统网关缓存相同 URL 的响应，Helicone 缓存相同提示词的 LLM 输出——缓存粒度从 URL 级别提升到 Prompt 级别


**安全模型**: 

> 传统 L7 网关：通用 Web 安全（WAF 规则、DDoS 防护、IP 黑白名单、CORS 策略、mTLS、OAuth/JWT 认证、请求频率限流）。关注网络层和应用层通用威胁。Helicone：AI 特定安全模型。1）Prompt Injection 防护（Meta Prompt Guard + Llama Guard，双层检测）；2）Jailbreak 检测（97% 检出率）；3）数据防泄露（14 类威胁检测含数据泄露和钓鱼）；4）按用户隔离的数据访问（通过 Header 属性标记和筛选）；5）密钥保管库（安全存储提供商 API 密钥）。安全检测仅支持 OpenAI 模型。核心差异：传统网关防网络攻击，Helicone 防 Prompt 注入和 AI 特定威胁——这是两种不同的威胁模型


**内容转换**: 

> 传统 L7 网关：HTTP 层面请求改写和响应修改（Header 注入/改写、URL 重写、Body 正则替换、响应压缩/gzip）。转换目标是 HTTP 元数据和传输格式。Helicone：AI 语义层面内容转换。1）格式转换：OpenAI 兼容格式 → 目标提供商原生格式（Anthropic/Google 等）自动转换；2）模型路由：根据 model 参数自动选择提供商；3）降级 Fallback：主模型不可用时自动切换到备用模型；4）Header 注入：自动添加可观测性 Header（Session ID/User ID/自定义属性）。不支持响应后内容脱敏/审核处理。核心差异：传统网关操作 HTTP 层，Helicone 操作 LLM API 语义层


**限流单位**: 

> 这是 AI 网关与传统 L7 网关最核心的差异维度之一。传统 L7 网关：限流单位为请求数/秒（RPS）、并发连接数、带宽（Mbps）。如'每 IP 100 RPS'，无法区分高消耗和低消耗请求。Helicone：支持三种限流维度。1）Token/分钟（TPM）：基于实际 Token 消耗的速率限制——LLM 场景的核心成本度量；2）请求/分钟（RPM）：与传统网关类似但面向 LLM 调用；3）金额预算：按美元设置告警阈值。限流粒度可按 API 密钥/用户/团队/全局配置。核心差异：传统网关限制调用频率，Helicone 限制 Token 消耗和成本——LLM API 的成本由 Token 决定而非请求数


**流量特征**: 

> 传统 L7 网关：主要处理同步短连接（HTTP 请求-响应周期通常 <1s）、小载荷（KB 级别）、高并发短连接池。Helicone：处理流式长连接（SSE 流可持续数秒至数十秒，逐 Token 推送）、大载荷（上下文窗口可达 1M+ tokens）、延迟敏感（TTFT 首 Token 时间影响用户体验）。Cloudflare Workers 边缘架构天然适合全球低延迟代理。AI 网关 Rust 二进制专为 LLM 流量优化（低内存、高并发）。核心差异：传统网关优化连接数/秒吞吐，Helicone 优化流式长连接管理和 Token 实时追踪


**生态定位**: 

> Helicone 定位为'独立 AI 可观测性 + 网关平台'——以可观测性为核心，网关为辅助功能。在更广的生态光谱中：1）Kong AI Gateway / APISIX AI Plugin 属于'L7 网关 + AI 插件'模式；2）Envoy AI Gateway extension 属于'服务网格 AI 扩展'模式；3）LiteLLM 属于'开源自托管独立 AI 网关'模式（功能最全面）；4）Portkey 提供'托管 AI 网关'；5）Langfuse 属于'AI 可观测性平台'（无网关路由能力）；6）Helicone 属于'AI 可观测性 + 轻量网关'的跨界定位——可观测性强于 LiteLLM，网关能力弱于 LiteLLM，更轻量易用。典型使用场景：中小团队快速获取 LLM 调用全链路可见性和基础网关控制



### 16. Higress

**架构层级定位**: 

> Higress 定位在 L7 应用层到 AI 应用层的完整覆盖。数据面基于 Envoy（L4/L7 网络代理），控制面基于 Istio（L7 流量管理），在此之上构建 AI 原生能力层（LLM 协议解析、Token 感知路由、语义缓存、MCP 服务托管等），形成 L7 传统网关 + L7+ AI 应用网关的统一架构。与传统网关（如 Nginx/Kong/Envoy 原生）的最大区别是 Higress 将 AI 流量视为一等公民，在 L7 处理层面对 LLM 协议深度感知（SSE 流解析、Token 计算、provisioned throughput 感知），而非仅作为通用 HTTP 流量透明代理。


**协议感知能力**: 

> 传统 7 层网关：仅感知 HTTP/1.1、HTTP/2、gRPC 等通用 L7 协议，对请求体内容不感知，将 LLM 请求视为普通 HTTP POST。Higress AI 网关：① 深度解析 OpenAI Chat Completions、Anthropic Messages、Gemini Generative AI 等 LLM 专属协议格式；② 实时解析 SSE 流式 chunk 进行 Token 计数（delta 增量）；③ 自动识别并转换跨 LLM 协议（Claude→OpenAI→Gemini 双向互转）；④ 感知模型特有参数（max_tokens/temperature/top_p/thinking/reasoning 等）并在路由和流控中使用；⑤ 计算 provisioned throughput（TPM/QPM/并发数），实现模型级别的精确流控和负载调度；⑥ 支持 MCP 协议深度解析（Tool Call 发现/路由/管控）。


**状态模型**: 

> 传统 7 层网关：主要无状态（stateless），基于 HTTP 请求-响应模型，一次请求完成后即释放上下文。Higress AI 网关：有状态处理（stateful），需要维护：① 会话管理（基于 session_id 关联多轮对话上下文）；② 上下文窗口跟踪（多轮对话的 Token 累计消耗计入同一会话预算）；③ Token 预算跟踪（消费者/API Key 级别的累计 Token 配额状态，基于 Redis 持久化）；④ KV Cache 亲和状态（前缀匹配负载均衡将同一会话路由到同一 Pod，保持 Prompt KV Cache 预热状态）；⑤ 实时连接状态（流式 SSE 长连接管理，断连时确保 Token 用量正确结算）；⑥ MCP 会话状态（SSE/Streamable HTTP 连接生命周期管理）。


**计费模型**: 

> 传统 7 层网关：请求级别计费（按请求次数/并发连接数/带宽流量计费）。Higress AI 网关：三维度计费模型：① 请求级（QPM - Query Per Minute 限制）；② Token 级（TPM - Token Per Minute 限制，区分 input_token/output_token/reasoning_tokens/cached_tokens）；③ 金额预算级（基于模型定价×Token 用量的消费金额估算，Session 级成本聚合）。传统网关完全无法做到 Token 级计费，因为需要深度解析 LLM 协议响应体中的 usage 字段并进行实时累计。


**路由粒度**: 

> 传统 7 层网关：基于 URL/Header/Host/Cookie/Query 等 HTTP 元数据进行路由。Higress AI 网关：在上述基础上增加 AI 专属路由粒度：① 基于模型名路由（gpt-4o→azure/gpt-4o→local-llm 模型名映射和前缀/正则匹配）；② 基于 Token 预算路由（消费者剩余 Token 配额不足时路由到限速或降级模型）；③ 基于成本优化路由（优先路由到性价比最高的模型提供商）；④ 基于延迟优先路由（根据各模型实例的 TTFT 响应时间选择最快路径）；⑤ 基于 KV Cache 亲和性路由（将相同 Prompt 前缀的请求路由到已缓存 KV Cache 的实例）；⑥ 基于 GPU 状态路由（根据 vLLM Prometheus Metrics 的队列长度/KV Cache 使用率/LoRA Adapter 亲和性调度）。


**缓存策略**: 

> 传统 7 层网关：HTTP 层面缓存，基于 ETag/If-None-Match、Cache-Control 头、CDN 边缘缓存、Vary 头变体缓存。缓存粒度是完整 HTTP 响应（字节级匹配），无法理解语义内容相似性。Higress AI 网关：引入语义缓存：① 精确匹配缓存（相同 Prompt 请求直接返回缓存结果，降低 API 调用成本）；② 语义缓存（基于向量嵌入计算 Prompt 语义相似度，相似意图请求命中缓存）；③ KV Cache 亲和性（路由层优化而非存储缓存，将同会话请求通过一致性前缀哈希路由到同一 GPU Pod，充分利用 GPU 显存中已计算的 KV Cache，避免重复计算）；④ 缓存粒度从「完整 HTTP 响应」变为「语义对话意图」级别，大幅提升 AI 场景下的缓存命中率。


**安全模型**: 

> 传统 7 层网关：WAF（SQL 注入/XSS/CSRF/DDoS 防护）、IP 黑名单/白名单、CORS、请求速率限流（req/s）、TLS 终止、认证鉴权。防护对象是 HTTP 请求本身。Higress AI 网关：在上述 WAF 基础上增加 AI 专属安全层：① Prompt Injection 防护（检测恶意 Prompt 攻击如指令覆盖/角色篡改）；② 数据防泄露（PII 脱敏-敏感信息在输入 LLM 前脱敏，防止训练数据泄露和第三方模型获取）；③ Token 级别滥用检测（基于 TPM 异常模式检测 API Key 盗用或加密货币挖矿式 LLM 滥用）；④ 内容输出安全（模型响应侧的毒性检测/违规内容过滤）；⑤ 模型安全护栏（MCP Tool 调用的输入输出参数校验和脱敏）；⑥ AI 特有攻击面防护（如 MCP Server 工具注入、多模态文件内容安全扫描）。


**内容转换**: 

> 传统 7 层网关：HTTP 请求/响应改写（Header 增删改、URL 重写/重定向、请求体修改、响应体压缩）。转换操作对象是 HTTP 报文结构，不感知应用层语义。Higress AI 网关：在 HTTP 报文改写基础上增加：① 跨 LLM 模型协议格式互转（Claude Messages ↔ OpenAI Chat Completions ↔ Gemini GenerateContent）；② 模型切换（客户端无感地从一个模型切换到另一个模型，网关自动适配参数和响应格式）；③ 请求改写（基于 Prompt Template 对用户输入进行增强/模板化处理）；④ 降级 Fallback 转换（主模型不可用时自动切换到备用模型，网关完成所有协议适配）；⑤ MCP 工具协议转换（REST API ↔ MCP Tool 格式双向转换）。


**限流单位**: 

> 传统 7 层网关：请求数/秒（RPS/QPS）、并发连接数、带宽流量（MB/s）。限流对象是 HTTP 连接或请求，粒度粗。Higress AI 网关：三层限流单位：① 请求数/分钟（QPM - Query Per Minute，消费者级）；② Token/分钟（TPM - Token Per Minute，区分 input/output 方向）；③ 金额预算/月（基于消费者累计 Token 消耗 × 模型价格的金额预算封顶）。从「请求维度」到「AI 消费维度」的转变是 AI 网关最核心的区别之一：传统网关无法理解一个 HTTP POST 请求实际消耗了多少 Token（需解析流式响应体），更无法将其转换为货币成本。


**流量特征**: 

> 传统 7 层网关：同步短连接为主（HTTP 请求-响应，连接即释放）、微服务 RPC（gRPC 流式）、文件上传/下载（大带宽持久连接）。延迟容忍度为毫秒级，断连影响小。Higress AI 网关：流式长连接为主：① SSE 流式连接可持续数十秒至数分钟（LLM Token 逐个生成）；② 首 Token 延迟（TTFT）对用户体验影响大（亚秒级到秒级），网关架构需优化；③ 大载荷（单次 LLM 响应可达数十万 Token，JSON 响应体可能数 MB）；④ 连接生命周期管理复杂（SSE 断连时需正确结算已生成 Token，v2.2.1 修复了断连 Token 漏记问题）；⑤ MCP 全双工实时通信（WebSocket/Streamable HTTP）对网关连接管理提出更高要求。这些流量特征直接影响网关的内存管理（流式 buffer 策略）、连接池配置和服务质量保障。


**生态定位**: 

> 生态定位为统一 API+AI 网关。Higress 同时具备传统 API 网关能力（K8s Ingress Controller、微服务路由、WAF 安全网关）和 AI 原生网关能力（LLM 多模型代理、Token 流控、语义缓存、MCP 服务托管与 Marketplace）。它不是纯 AI 插件的传统网关（如 Kong AI 插件），也不是独立 AI 网关（如 LiteLLM/OneAPI），而是将两者融合在同一个平台中，通过 Envoy + Wasm 架构在 L7 数据面原生执行 AI 流量处理。在生态层面同时定位为 MCP 网关（MCP Server 托管/MCP Marketplace/API-to-MCP 转换），作为 Agent 治理平台的网关层基础设施。与 Nacos 3.0 MCP Registry 深度集成形成 MCP Proxy（Higress）+ MCP Registry（Nacos）的完整解决方案。



### 17. Langfuse

- **架构层级定位**: AI 应用层（可观测性层）——Langfuse 定位为 LLM 应用的可观测性和工程平台，非 L4/L7 网络代理。其架构为旁路异步采集模式：应用通过 SDK 将 Trace 数据异步发送至 Langfuse，不影响 LLM 请求的关键路径。与位于 L7 的传统网关（Kong、Nginx、Envoy）不同，Langfuse 不代理、不路由、不终结网络连接。
**协议感知能力**: 

> 具备 LLM 协议深度感知能力，但通过 SDK 层面而非网络代理层面实现。SDK 封装能解析 OpenAI/Anthropic 等 API 的请求/响应格式，自动提取模型名称、Token 用量（input/output/cached_tokens）、成本、延迟（含 TTFT）、Tool Calls 等 AI 语义字段。支持 SSE 流式数据的重组和 usage 块捕获。原生支持 OpenTelemetry GenAI Semantic Conventions。不同于传统网关仅做 HTTP 层面的通用处理。


**状态模型**: 

> 有状态——Langfuse 管理丰富的会话和应用状态：(1) Trace/Session 级上下文——多轮对话跨请求关联；(2) Token 预算跟踪——累计 Token 消耗按 User/Session/Trace 统计；(3) Prompt 版本管理——追踪每个请求使用的 Prompt 版本和标签；(4) Evaluation 评分——持续跟踪质量指标变化。传统 7 层网关通常为无状态（或仅有简单的会话粘性）。


**计费模型**: 

> Token 级计费——Langfuse 追踪的是 Token 粒度的使用量和成本，而非请求数。内置多模型价格数据库支持按模型、按 Token 类型（input/output/cached/audio/image）的精确成本计算。支持按 User/Session/Trace/Project 的成本归因。2025年12月新增定价层级支持上下文敏感的差异化计价。自托管 MIT 版本无用量限制。这与传统网关的请求级计费模型有本质区别。


- **路由粒度**: 不适用——Langfuse 不执行请求路由，因此不存在路由粒度概念。实际路由由应用层或外部网关（LiteLLM、Portkey、Helicone）处理。但 Langfuse 的 Prompt 管理支持基于标签（Label）的版本路由（如 production 标签对应特定 Prompt 版本），这是应用层的配置路由而非网络层请求路由。
**缓存策略**: 

> 不适用——Langfuse 自身不提供 LLM 响应缓存（精确匹配缓存或语义缓存）。其关注点在于缓存行为的可观测性（追踪哪些请求命中缓存、缓存命中率等）。语义缓存需通过外部网关（如 Portkey 的语义缓存模式）实现，Langfuse 可观测这些缓存操作。Langfuse 内部使用 Redis 缓存 API Key 和 Prompt 数据以加速平台自身性能。与传统 HTTP 缓存（ETag/CDN/Vary）不在同一维度。


**安全模型**: 

> 观测驱动安全——Langfuse 的安全模型侧重于：(1) 集成第三方安全库（LLM Guard、Lakera、NeMo Guardrails）进行 Prompt 注入检测和内容审核；(2) 在 Dashboard 中追踪和评分安全检测结果；(3) 自动化安全评估流水线。这与传统网关的 WAF/DDoS/限流/CORS 安全模型是互补而非替代关系。Langfuse 不做请求拦截/阻断（由安全库在执行层完成），但提供安全态势的全景视图。


**内容转换**: 

> 不适用——Langfuse 不执行请求改写、模型切换或不同提供商格式互转。其 SDK 封装（langfuse.openai.OpenAI）支持修改 base_url 指向任意 OpenAI 兼容端点，但格式保持一致（OpenAI 格式）。不同提供商之间的格式互转（如 Anthropic ↔ OpenAI ↔ Google Gemini）需依赖外部 AI 网关（LiteLLM、Portkey）。Langfuse 的价值在于转换行为的可观测性而非转换本身。


- **限流单位**: 不适用——Langfuse 自身不执行请求级限流。其 Cloud 套餐的速率限制是以 '请求数/分钟' 为单位（传统请求级限流），目的是保护平台基础设施而非控制 LLM 调用量。Token 级或金额预算级的硬性限制不在 Langfuse 产品范围内。这与 AI 网关以 Token/分钟或金额/月为限流单位有本质差异。
**流量特征**: 

> 异步旁路采集——Langfuse 的流量处理特征为：(1) SDK 异步 fire-and-forget 批处理发送 Trace 数据；(2) Worker 通过 Redis BullMQ 队列异步消费并写入 ClickHouse；(3) 不在 LLM 请求的同步关键路径上。这种架构天然适配流式长连接（SSE）场景——SDK 监听流事件而不阻塞响应返回。与代理型网关需要处理同步短连接和长连接代理不同，Langfuse 的数据流是单向（应用→Langfuse）、异步、批量化的。


**生态定位**: 

> LLM 可观测性平台——Langfuse 在生态中的定位是独立 LLM 可观测性和工程平台，而非 API 网关。它提供 Tracing、Evaluation、Prompt Management、Datasets、Playground 等能力。在架构上推荐与 AI 网关（LiteLLM、Portkey、Helicone、Vercel AI Gateway）配合使用：AI 网关处理路由/缓存/限流/fallback → Langfuse 处理可观测性/评估/Prompt 管理。不属于 MCP 专用网关或 Agent 治理平台，但在可观测性维度上支持 Agent 应用的全面追踪。



### 18. LiteLLM

**架构层级定位**: 

> LiteLLM 定位在 L7+/AI 应用层，而非传统 L4（传输层）或 L7（HTTP 应用层）网关。传统 L7 网关（Nginx/Envoy/Kong）处理 HTTP 请求/响应的路由和转发，是通用 HTTP 代理；LiteLLM 理解 LLM 协议语义（Token 计数、模型路由、语义缓存），是 AI 应用层网关。典型部署中 LiteLLM 位于传统 L7 网关之后作为 AI 专用层，形成分层架构：L4/L7 边缘网关（TLS/WAF/连接管理）→ AI 应用网关（模型路由/成本控制/提供商抽象）→ LLM 提供商。LiteLLM 不替代 Kong/Nginx，而是增加了一个 AI 感知的治理层


**协议感知能力**: 

> 传统 L7 网关：通用 HTTP 处理，无 LLM 协议感知。HTTP 请求视为不透明的字节流，无法理解 SSE 流中的 Token 边界、无法区分 prompt tokens 和 completion tokens。LiteLLM：深度 LLM 协议感知。解析 SSE 流事件并逐 Token 计数；理解 OpenAI/Anthropic/Gemini 三方 API 格式差异并自动转换；感知 provisioned throughput（如 Bedrock 的预置吞吐量模式）；解析流式响应中的 finish_reason 判断调用终止状态；集成 provider-native prompt caching 透传；实时计算请求中的 Token 消耗和成本。核心差异：传统网关看到请求和字节数，AI 网关看到 Token 和模型语义


**状态模型**: 

> 传统 L7 网关：本质上无状态（请求之间独立），不追踪会话上下文或使用量累积。LiteLLM：有状态 AI 网关。维护多维度状态：1）会话管理（MCP 会话、A2A Agent 会话、WebSocket 持久连接）；2）上下文窗口跟踪（模型的最大上下文窗口、当前使用量）；3）Token 预算跟踪（密钥/用户/团队/组织的累积 Token 消耗）；4）花费状态（实时预算余额、花费历史）；5）速率限制计数器（RPM/TPM 多级计数）。这些状态通过 PostgreSQL（持久化）+ Redis（分布式缓存）实现共享和持久化。核心差异：传统网关不需要持久化状态，AI 网关必须维护 Token/预算/会话状态才能实现治理


**计费模型**: 

> 传统 L7 网关：请求级计费（按请求数/秒计费或限流），与 API 调用的实际资源消耗（Token 数）无关。LiteLLM：三级计费模型。1）Token 级计费：根据实际 prompt tokens + completion tokens 计算成本，不同模型对应不同价格表，内置 100+ 模型定价数据库；2）金额预算：按美元设置硬/软预算限制，超预算自动拦截；3）请求级限制作为补充（RPM 限流）。支持按虚拟密钥/用户/团队/项目/标签多维度成本归属。核心差异：传统网关按调用次数限流和计费，AI 网关按 Token 消耗计费——这是最根本的差异之一，因为 1 次请求可能消耗 10 tokens 或 100k tokens，成本差异极大


**路由粒度**: 

> 传统 L7 网关：基于 URL 路径、HTTP Header、Host 域名进行路由决策。路由规则是静态的通配符/正则匹配。LiteLLM：基于 AI 语义的多维路由。1）模型名路由：根据请求中的 model 参数路由到实际提供商部署；2）成本优化路由：选择最便宜的提供商处理相同模型请求；3）延迟优先路由：选择 P50 延迟最低的部署；4）Token 预算路由：跳过已超预算的密钥或部署；5）加权路由：金丝雀部署/主备模式（weighted-routing failover）；6）Context Window 路由：根据请求 Token 量自动选择窗口大小合适的模型；7）Conditional 路由：基于请求属性动态选择路由策略。核心差异：传统网关看 URL 和 Header，AI 网关看模型名、Token 预算、成本和延迟


**缓存策略**: 

> 传统 L7 网关：HTTP 级缓存（ETag/If-None-Match、Cache-Control max-age、CDN 边缘缓存、Vary Header）。基于 URL 精确匹配，缓存的单位是完整 HTTP 响应。LiteLLM：三层 AI 缓存策略。1）精确匹配缓存：相同请求体哈希匹配（与传统网关类似但面向 LLM 请求）；2）语义缓存：核心差异化能力——基于向量嵌入的余弦相似度匹配，'How do I reset my password?' 可命中 'Password reset instructions' 的缓存响应。使用 RedisVL/Qdrant 作为向量存储，支持可配置的相似度阈值（0.0-1.0）。实际案例中语义缓存将命中率从 38% 提升至 62%；3）提供商原生 Prompt Caching 透传：理解并正确转发 Anthropic/OpenAI/Gemini/Bedrock/DeepSeek 的 prompt caching 机制。核心差异：传统网关缓存相同 URL 的响应，AI 网关缓存语义相似提示词的 LLM 输出


**安全模型**: 

> 传统 L7 网关：通用 Web 安全（WAF 规则、DDoS 防护、IP 黑白名单、CORS 策略、mTLS、OAuth/JWT 认证、请求频率限流）。安全关注点在于网络层和应用层的通用威胁。LiteLLM：AI 特定安全模型。1）Prompt Injection 防护（20+ 专业 Guardrail 提供商集成）；2）数据防泄露（输入/输出双侧 PII 检测脱敏，密钥/凭证泄露检测）；3）Token 级别滥用检测（通过 Token 速率限制和预算跟踪，识别异常的 Token 消耗模式——仅按请求数限流无法检测到单个请求中大量 Token 消耗的滥用）；4）模型级访问控制（虚拟密钥可限制可访问的模型列表，防止越权使用昂贵模型）；5）Agent 工具调用安全（MCP JWT 签名、工具级权限控制、IP ACL）。核心差异：传统网关防网络攻击，AI 网关防 Prompt 注入和 Token 滥用——这是两种完全不同的威胁模型


**内容转换**: 

> 传统 L7 网关：HTTP 层面的请求改写和响应修改（Header 注入/改写、URL 重写、Body 正则替换、响应压缩/gzip）。转换目标是 HTTP 元数据和传输格式。LiteLLM：AI 语义层面的内容转换。1）请求改写：动态修改 prompt 内容（通过 pre_call_hook 实现注入安全策略/上下文）；2）模型切换：根据 fallback 链自动切换模型，处理不同模型的参数差异；3）格式互转：OpenAI ↔ Anthropic ↔ Gemini 全格式双向转换（不仅是 JSON 结构转换，还包括 tool_use/function_call 语义块映射、流式事件翻译）；4）降级 Fallback：当主模型不可用时自动降级到备用模型；5）响应后处理：通过 post_call_hook 对 LLM 输出进行脱敏/审核/格式化。核心差异：传统网关操作 HTTP 层，AI 网关操作 LLM 语义层


**限流单位**: 

> 这是 AI 网关与传统 L7 网关最核心的差异维度之一。传统 L7 网关：限流单位为请求数/秒（RPS）、并发连接数、带宽（Mbps）。例如'每 IP 100 RPS'。无法区分 1 次高消耗请求和 1 次低消耗请求。LiteLLM：三层限流单位。1）Token/分钟（TPM）：基于实际 Token 消耗的速率限制——这是 LLM 场景的核心成本度量；2）请求/分钟（RPM）：与传统网关类似但面向 LLM 调用；3）金额预算/月：按美元计费的硬/软预算（如'Team Engineering 每月 $500 预算'），超预算立即拦截。三级限流可以同时生效（如限制每密钥 10K TPM + 500 RPM + $200/月预算）。核心差异：传统网关限制调用频率，AI 网关限制 Token 消耗和成本——因为 LLM API 的成本由 Token 决定而非请求数


**流量特征**: 

> 传统 L7 网关：主要处理同步短连接（HTTP 请求-响应周期通常 < 1s）、小载荷（KB 级别）、高并发短连接池。连接和请求基本一一对应。LiteLLM：处理流式长连接（SSE 流可持续 30s+，逐 Token 推送）、大载荷（上下文窗口可达 1M+ tokens）、延迟敏感（TTFT 即首 Token 时间影响用户体验）。流式连接的生命周期管理与传统短连接有根本区别：需要 proxy_buffering off、长超时（proxy_read_timeout 300s+）、流式事件解析与 Token 计数并发进行、连接中断时不影响已计费的 Token 追踪。实时语音（WebRTC/WebSocket）场景要求更低延迟和持久连接管理。核心差异：传统网关优化连接数/秒吞吐，AI 网关优化流式长连接管理和 Token 实时追踪


**生态定位**: 

> LiteLLM 定位为'独立 AI 网关'（Standalone AI Gateway）——一个独立的服务层专门处理 LLM 流量治理，部署在传统 L7 网关之后。在更广的生态定位光谱中：1）Kong AI Gateway/APISIX AI Plugin 属于'L7 网关 + AI 插件'模式——在已有网关中嵌入 AI 能力；2）Envoy 生态（如 AI Gateway extension）属于'服务网格 AI 扩展'模式；3）Portkey 提供'托管 AI 网关'；4）LiteLLM 代表'开源自托管独立 AI 网关'模式——功能最全面但需要自行运维；5）Stacklok/ToolHive 等新兴项目代表'MCP 专用治理平台'；6）LangChain/LangGraph 代表'Agent 治理平台'。LiteLLM 的核心生态定位是：作为 LLM 流量的统一控制平面，不替代传统网关，而是作为中间层提供模型路由、成本控制、安全防护和可观测性



### 19. LobeChat Plugin Gateway（@lobehub/chat-plugins-gateway）

- **架构层级定位**: L7 应用层（HTTP 请求代理）。架构定位为 LobeChat 前端与外部插件 API 之间的中间代理层，本质上是 HTTP 请求的验证与转发层。不涉及 LLM 协议深度感知，不拥有 Token 计算、SSE 流解析或模型路由等 AI 专有能力。与传统 AI 网关（如 LiteLLM 定位在 L7+/AI 应用层）有本质区别：它不是 AI 网关，而是一个插件系统的 HTTP 代理中间件
**协议感知能力**: 

> 仅限于 HTTP 通用处理。网关解析 LobeChat 自定义的 PluginRequestPayload 格式（含 identifier、apiName、arguments），使用 JSON Schema 验证参数格式，然后通过 HTTP POST 或 OpenAPI 客户端转发请求。无 LLM 协议感知能力：不理解 SSE 流式事件结构、不进行 Token 计数、不识别 provisioned throughput 概念、不解析流式响应中的 finish_reason


- **状态模型**: 完全无状态。网关不维护任何请求间的状态信息：无会话管理（每个请求独立处理）、无上下文窗口跟踪、无 Token 预算累计、无花费状态持久化、无速率限制计数器。每次 execute() 调用均为无状态的独立事务
- **计费模型**: 无计费模型。网关本身不进行任何形式的计费或成本归因。不涉及请求级计费、Token 级计费或金额预算计费。作为免费 MIT 开源组件，无商业计费模块
- **路由粒度**: 基于插件名称的简单路由。网关根据请求中的 identifier（插件标识符）查找插件 manifest 中的 api.url 或 OpenAPI 定义，将请求转发至目标 URL。路由决策仅基于「插件名 → 目标 URL」的静态映射。无基于模型名、Token 预算、成本优化或延迟优先的动态路由能力
- **缓存策略**: 无任何缓存策略。网关不实施 HTTP 缓存（无 ETag/Cache-Control/CDN 边缘缓存）、无语义缓存（无向量嵌入存储和相似度匹配）、不利用任何缓存后端。每次请求均实时调用外部插件 API 获取最新结果。这是该项目与传统 L7 网关和 AI 网关都不同的地方——传统 L7 网关至少可实现 HTTP 级别缓存，而本网关连这一层都不具备
**安全模型**: 

> 简单的请求来源验证。安全模型仅包含：1）请求来源验证（通过 LOBE_CHAT_AUTH_HEADER 验证请求来自合法的 LobeChat 实例）；2）CORS 策略配置（默认允许所有来源 origin: '*'）；3）参数 Schema 验证（确保请求参数格式符合定义）。与传统 L7 网关的安全模型（WAF/DDoS/IP 黑白名单/mTLS/JWT 认证）相比极为简单，与 AI 网关的安全模型（Prompt Injection 防护/PII 脱敏/content moderation）相比更是完全缺失。本质上是一个「信任内网」的安全假设，不适合暴露在公网直接使用


- **内容转换**: 无任何内容转换。网关仅进行：1）参数格式校验（JSON Schema 验证）；2）请求体透传（将 validated payload 作为 POST body 转发）。不进行请求改写、响应修改、模型格式互转或降级 fallback 等任何形式的内容操作。是最小化的「验证 + 转发」模式，不具备传统 L7 网关的 Header 注入/URL 重写/Body 正则替换能力
- **限流单位**: 无限流。网关不实施任何形式的限流策略（无请求数限制、无 Token 限制、无金额预算限制）。对调用方完全开放，依赖 LobeChat 主仓库层面的调用控制。这是该项目与传统 L7 网关（请求数/秒限流）和 AI 网关（Token/分钟限流）的最显著差异之一
- **流量特征**: 同步短连接（HTTP POST 请求/响应）。处理模式为标准的同步请求-响应周期：接收 JSON 请求体 → 验证 → 转发 → 等待响应 → 返回 JSON 结果。不处理 SSE 流式长连接、不逐 Token 推送、不涉及大载荷上下文窗口管理。连接超时依赖 Vercel Edge Function 的平台限制
**生态定位**: 

> 非 AI 网关，属于 LobeChat 插件代理中间件。在更广的生态定位光谱中，本项目的定位严格限定在「LobeChat 插件系统的 HTTP 代理层」：1）它不是独立 AI 网关（不代理 LLM 调用）；2）它不是 L7 网关 AI 插件（不基于 Kong/APISIX/Envoy 等传统网关）；3）它不是 MCP 专用网关（不含 MCP 协议支持）；4）它不是 Agent 治理平台（不管理 Agent 生命周期）。它仅服务于 LobeChat 的 function calling 插件执行流程，且已于 2024 年被官方废弃，功能并入 LobeChat 主仓库的 builtin 工具执行路径。npm 下载量约 3.9 万/月，但主要来自旧版依赖残留



### 20. One API

- **架构层级定位**: L7+/AI应用层。One API定位为LLM API管理与分发系统，工作在HTTP/7层之上，提供AI特定的协议适配、模型路由、Token计费等AI应用层能力。不同于传统L4/L7网关（如Nginx/Envoy）的通用HTTP反向代理定位，One API深度理解LLM请求和响应的语义结构
- **协议感知能力**: 深度LLM协议感知：理解并处理SSE流式协议（text/event-stream）、Token数量计算（tiktoken编码）、不同模型提供商的专有API格式（OpenAI/Claude/Gemini/文心一言等格式互转）、流式chunk解析与重组。传统7层网关仅做通用HTTP处理（请求/响应头、Body透传），不感知负载内容的AI语义
- **状态模型**: 有状态设计：维护用户额度状态（已用/剩余Token额度）、令牌生命周期状态（过期时间/IP绑定）、渠道健康状态（可用性/余额）、用户分组倍率配置。跟踪会话级别的计费上下文。传统网关通常为无状态或仅维护连接级状态（如会话保持sticky session），不维护业务级状态
- **计费模型**: Token级计费为主：按照额度公式（分组倍率×模型倍率×(提示Token+补全Token×补全倍率)）进行计量扣费，支持按不同模型设置不同价格倍率。可配合用户分组倍率实现差异化定价。支持兑换码充值、美元计价显示。传统网关仅做请求级计费（按调用次数），无法感知单次请求内的Token消耗量
- **路由粒度**: 基于AI语义的路由：可按模型名称路由到不同渠道、按渠道权重和优先级负载均衡、基于Token预算选择渠道（避免超过TPM/RPM限制）、基于成本优化（优先选择价格更低的渠道）、基于延迟优先的路由。支持模型映射（对用户暴露一个模型名，实际路由到不同模型）。传统网关路由基于URL路径、HTTP Header、Host等通用维度
- **缓存策略**: 内存缓存+Redis缓存策略：缓存Token验证信息、用户分组配置、渠道列表等元数据，降低数据库查询频率。目标是在用户请求响应路径上实现零数据库访问。缓存同步频率可配置（默认600秒）。不支持基于向量嵌入的语义缓存（语义相似匹配缓存），不支持HTTP语义缓存机制（如ETag/CDN/Vary等）
- **安全模型**: API Key级别的访问控制安全：令牌过期/额度/IP白名单/模型访问权限四重限制。Cloudflare Turnstile人机验证。多方式OAuth认证。安全模型侧重于防止API Key滥用和越权访问。不像传统网关具备WAF（Web应用防火墙）、DDoS防护、CORS策略、通用限流等网络层/HTTP层安全能力。无Prompt注入防护、无PII数据防泄露检测、无Token级别的异常使用行为检测
- **内容转换**: 深度AI内容转换：模型请求/响应格式双向转换（OpenAI↔Claude↔Gemini↔国产模型格式互转）、模型名称映射与重定向、请求体重构造与适配。支持降级fallback（渠道故障时自动切换到备用渠道）。传统网关仅做通用HTTP改写（Header修改、URL重写、Body微调），不涉及AI语义级别的格式转换
- **限流单位**: 以Token消耗量（额度）为限流单位：用户/令牌配额以额度点数计量，非简单的请求数/秒。同时提供IP级别的请求频率限流（每3分钟窗口）。最核心差异：Token消耗量才是AI API的真正成本度量，传统网关的RPS（请求/秒）限流无法反映单次请求的Token消耗差异（如一次调用可能消耗10 Token或10万Token）
- **流量特征**: 面向LLM特有的流量模式：流式长连接（SSE持续推送，连接可能持续数十秒到数分钟）、秒级延迟容忍（模型推理时间通常1-10秒）、大载荷传输（长上下文可达128K Token以上）。请求到达率和处理时长高度不均衡。传统网关面向短连接、毫秒级延迟的同步HTTP请求，流量模型差异显著
**生态定位**: 

> 独立AI网关：定位为LLM API统一管理与分发系统，核心功能包括API聚合（30+厂商统一接口）、Key池化管理（多渠道Key统一配置和分发）、计费系统（多级倍率、兑换码、额度管理）。属于独立的AI网关类别，不等同于传统API网关的AI插件，也不等同于MCP专用网关或Agent治理平台。2025年初停止维护后，社区fork版New API接替演进并增加了数据看板、在线支付等更丰富的AI资产管理功能



### 21. OptiLLM

- **架构层级定位**: L7+/AI 应用层。OptiLLM 工作在 HTTP 应用层之上，作为 LLM API 调用链中的中间件层，专注于推理质量的语义优化而非通用 HTTP 流量管理。与传统 L7 网关（如 Nginx/Envoy）的 TCP/HTTP 代理定位有本质区别。
**协议感知能力**: 

> LLM 协议深度感知。理解 OpenAI Chat Completions API 的完整语义结构（messages、tools、temperature、stream、model 等字段），能解析和操作 LLM 特有的 SSE 流格式、Token 级参数（logprobs、top_logprobs）、推理内容标记（thinking blocks）。传统网关仅做 HTTP 层面的通用解析，不感知 API 语义。


- **状态模型**: 混合状态模型。基础代理层无状态（每个请求独立处理），但通过 memory 插件可启用有状态会话管理（维护对话历史、支持无界上下文窗口）。传统 L7 网关通常完全无状态，仅依靠外部存储（如 Redis）实现会话粘性。
- **计费模型**: 调用次数计费模型（无自身计费系统）。OptiLLM 本身不管理计费，直接转发原始 API 调用，计费由上游提供商处理。优化技术可能成倍增加 API 调用次数（如 Best-of-N 产生 N 次调用），间接影响成本但无内建预算控制。传统网关按请求数或带宽计费。
- **路由粒度**: 基于模型名 + 优化策略 + 内容语义的多维路由。通过模型名前缀选择优化技术（如 moa-gpt-4o），proxy 插件按模型名映射到不同提供商，router 插件使用 ModernBERT 对提示内容分类以选择最优优化策略。传统网关仅按 URL/Header/Host 做路由。
- **缓存策略**: 无缓存机制。不提供 HTTP 层缓存（ETag/CDN/Vary）或 AI 层语义缓存（基于向量嵌入的语义相似匹配）。传统网关通常有成熟的 HTTP 缓存能力。
- **安全模型**: 基础 API 认证 + SSL 验证 + 选择性 PII 保护。与传统网关的 WAF/DDoS/限流/CORS 安全模型不同，OptiLLM 的安全关注点在于 API Key 管理和数据隐私（PII 匿名化），缺少传统网关标配的流量攻击防护和访问控制。
- **内容转换**: 推理增强型内容转换。不仅做请求/响应格式转换（OpenAI 格式与各提供商格式互转），更核心的是对请求进行推理优化处理：多轮采样（BON）、搜索探索（MCTS）、多代理协作（MARS）、计划搜索（PlanSearch）等。传统网关仅做 HTTP 层面的请求改写和响应修改。
- **限流单位**: 无显式限流单位。OptiLLM 不提供请求数/秒、Token/分钟或金额预算/月级别的限流。proxy 插件提供的并发限制（max_concurrent）是一种粗粒度的并发控制，与传统网关的精确限流（速率/配额/令牌桶）有本质区别。
- **流量特征**: 流式长连接、高延迟、大载荷。LLM 推理请求涉及 SSE 长连接（秒至分钟级）、大体积 Token 流负载、对延迟更敏感的交互场景。优化技术（如多次采样、搜索）会进一步放大延迟和 API 调用量。传统网关主要处理同步短连接请求/响应。
- **生态定位**: 推理优化代理（独立 AI 中间件）。OptiLLM 的核心定位是通过 test-time compute 提升 LLM 推理质量，而非替代或增强传统 API 网关。它属于 AI 中间件层的推理优化工具，可与传统网关组合使用（传统网关做流量管理，OptiLLM 做推理质量优化），形成分层架构。生态分类：独立 AI 推理优化代理 / 透明网关中间件。

### 22. TensorZero

**架构层级定位**: 

> L7+/AI 应用层。TensorZero 作为 AI 推理网关位于传统 L7 网关（Nginx/Envoy）之上，不替代传统网关而是互补。典型部署中 Nginx/Traefik 负责边缘 TLS 终结和通用 HTTP 路由，TensorZero 负责 LLM 特定的模型选择、变体实验、速率限制、Token 成本追踪。TensorZero 理解 LLM 推理语义（函数调度、变体采样、反馈循环），是 AI 应用层的治理平台而非通用 HTTP 代理


**协议感知能力**: 

> 深度 LLM 协议感知 vs 传统 HTTP 通用处理。TensorZero 理解：1）SSE 流式协议并实现统一的 TextChunk/ToolCallChunk/ThoughtChunk 内容块拆分和标准化；2）各提供商的 Token 计数格式差异（DeepSeek 缓存 Token、xAI reasoning Token、Mistral usage 等）并统一标准化；3）推理参数（temperature/max_tokens/structured output JSON schema）的提供商级映射和验证；4）TTFT（首 Token 时间）独立的超时控制。传统网关仅看到 HTTP 字节流，不理解 LLM 协议语义


**状态模型**: 

> 有状态 AI 网关 vs 传统无状态。TensorZero 维护多维状态：1）速率限制状态（令牌桶、预借用额度，通过 Valkey/Redis 分布式存储）；2）缓存状态（推理响应缓存，Valkey/ClickHouse 持久化）；3）实验状态（变体权重、采样概率、Bandit 算法收敛状态，持久化到 Postgres）；4）配置状态（tensorzero.toml 变体的 snapshot_hash 溯源）；5）优雅关闭状态（进行中请求计数和最终数据库刷新）。传统 L7 网关的请求间通常无状态共享


**计费模型**: 

> Token 级 + 请求级 + 成本级计费 vs 传统请求级计费。TensorZero 计费维度：1）model_inferences（请求次数）；2）tokens（input + output tokens 实际消耗，含缓存 Token 折扣）；3）cost（美元成本，基于可配置的模型价格表自动计算）。三级计费可同时生效且通过预借用机制实施。传统网关仅以请求数/秒（RPS）作为计费和限流单位，无法感知单次请求的 Token 消耗差异（1 token vs 100k tokens 成本差异可达数千倍）


**路由粒度**: 

> 基于模型名和变体策略的路由 vs 基于 URL/Header/Host 路由。TensorZero 路由决策基于：1）模型名（model 参数匹配 routing 配置）；2）变体实验策略（静态权重/自适应 Bandit 算法选择最优变体）；3）命名空间覆盖（tenant-specific 路由规则）；4）静态回退链（故障时自动切换提供商）。不支持基于实时延迟/成本/剩余速率限制的动态路由。传统网关仅基于 URL 路径、HOST Header、HTTP 方法等做路由匹配


**缓存策略**: 

> 精确匹配推理缓存 vs 传统 HTTP 缓存（ETag/CDN/Vary）。TensorZero 的推理缓存基于请求体的精确匹配，缓存 LLM 的完整推理响应，使用 Valkey/Redis 作为高性能缓存后端，默认 TTL 为 24 小时。不支持基于向量嵌入的语义缓存（相似但不完全相同的提示词无法命中缓存）。传统 HTTP 缓存关注 HTTP 语义（ETag/If-None-Match/Cache-Control/Vary），缓存粒度是整个 HTTP 响应，不感知 LLM 语义


**安全模型**: 

> API 密钥认证 + 速率限制 vs 传统 WAF/DDoS/CORS。TensorZero 的安全模型以访问控制和资源保护为核心：API 密钥认证（sk-t0-xxx）、命名空间隔离、多层速率限制、凭证集中管理（Gateway Relay）。传统 L7 网关安全覆盖 WAF 规则、DDoS 防护、IP 黑白名单、mTLS、OAuth/JWT 等通用 Web 安全。二者为互补关系：传统网关防护网络层和 HTTP 层攻击，TensorZero 防护 API 滥用和 Token 过度消耗。注意：TensorZero 缺少 AI 特有安全防护（Prompt 注入检测、PII 脱敏、有害内容过滤），这在 AI 网关 vs 传统网关对比中是一个显著空白


**内容转换**: 

> 请求/响应的提供商归一化 vs 传统 HTTP 请求改写/响应修改。TensorZero 的内容转换面向 LLM 语义：将统一的内部格式（RequestMessage）转换为各提供商的 API 特定格式，再将提供商响应标准化回统一格式（ProviderInferenceResponse）。涵盖 Message 翻译、Tool Schema 映射、推理参数验证、Token 用量标准化、流式事件翻译。传统网关的转换操作在 HTTP 层（Header 注入、URL 重写、Body 正则替换、gzip 压缩）。TensorZero 不支持 OpenAPI ↔ Anthropic ↔ Gemini 等面向用户的全格式互转


**限流单位**: 

> Token/分钟 + 请求/小时 + 成本/月 vs 传统请求数/秒。这是 AI 网关与传统 L7 网关最核心的差异之一。TensorZero 的三级限流单位：1）model_inferences_per_second/minute/hour/day/week/month（请求数）；2）tokens_per_second/minute/hour/day/week/month（Token 消耗）；3）cost_per_hour/day/week/month（美元成本）。每个维度可独立配置，多规则可同时生效。传统网关以 RPS（请求/秒）和并发连接数为限流单位，无法区分 1 token 与 100k tokens 请求的资源消耗差异


**流量特征**: 

> 流式长连接 + 低延迟 + 批量推理 vs 传统同步短连接。TensorZero 处理的 AI 流量特征：1）SSE 流式长连接（单次请求可持续数十秒甚至数分钟，逐 Token 推送）；2）极低延迟要求（TTFT 直接影响用户体验）；3）批量推理（Batch Inference）大批量异步处理；4）多模态大载荷传输（图像/文件上传在请求体内）；5）配置驱动的热重载（修改 tensorzero.toml 无需重启即生效）。传统网关面向 HTTP 短连接 + 小载荷 + 高并发短连接池，流量特征根本不同


**生态定位**: 

> 独立 AI 网关 + LLMOps 平台（已归档）。TensorZero 在生态光谱中定位为'统一 AI 推理与优化平台'——不仅是网关，还整合了可观测性、评估、实验和优化（微调/RLHF/DICL/GEPA）五个模块。与传统 AI 网关定位的差异：1）vs Kong AI Plugin / APISIX AI Plugin：TensorZero 是独立部署的 AI 专用层，非传统网关的插件扩展；2）vs LiteLLM：两者均为独立 AI 网关，但 TensorZero 核心差异化在于内置实验系统和优化闭环，LiteLLM 则在提供商覆盖和网关运维功能（动态路由/Guardrails）方面更丰富；3）vs Portkey：Portkey 为 SaaS 优先的托管网关（后转向安全平台），TensorZero 纯自托管；4）vs Langfuse/Weights & Biases：TensorZero 整合了 LLMOps 平台功能但以网关为入口而非仅作为可观测性工具。2026 年 6 月项目归档后，生态定位转为社区维护的遗产项目，社区分支 Agentify Gateway 尝试延续其方向



### 23. aisuite

**架构层级定位**: 

> aisuite 定位在 AI 应用层（库级 SDK 嵌入），而非传统网络栈的 L4 或 L7 层。传统 L7 网关（Nginx/Envoy/Kong）是独立运行的网络代理进程，处理 HTTP 流量的路由和转发。aisuite 是完全嵌入在应用代码中的客户端库（通过 import aisuite 使用），不存在独立的网络进程或端口监听。核心差异：传统网关是网络基础设施，aisuite 是应用代码依赖。典型场景中 aisuite 与 L7 网关位于完全不同的抽象层级——aisuite 在应用进程内调用，L7 网关在网络边界拦截流量


**协议感知能力**: 

> 传统 L7 网关：通用 HTTP 处理，请求视为不透明字节流，通过 URL/Header/Host 进行路由决策，不理解 LLM 协议语义（SSE 流、Token 计数、模型参数等）。aisuite：通过底层提供商 SDK 进行 LLM 协议感知，理解不同提供商的 API 格式差异并进行消息归一化（Converter 层），支持 provider:model 路由解析，支持 MCP 协议的 stdio 和 HTTP/SSE 传输。但 aisuite 不进行流量拦截或代理——所有通信由提供商 SDK 直接发起，aisuite 仅做请求组装和响应解析。核心差异：传统网关不理解 LLM 语义但控制网络流量，aisuite 理解 LLM 语义但不控制网络流量


**状态模型**: 

> 传统 L7 网关：本质无状态（请求之间独立），不追踪会话上下文或资源累积使用量。aisuite：Agent 场景下有状态——通过 State Stores（内存/文件/Postgres）持久化 Agent 运行状态，支持会话恢复（resume），记录 intermediate_messages 追踪工具调用历史。但 Chat Completions 基本调用无状态（无 Token 预算跟踪、无用户级使用量累积）。核心差异：传统网关完全无状态，aisuite 在 Agent 场景下有状态但非全场景


**计费模型**: 

> 传统 L7 网关：请求级计费（按请求数/秒计费或限流），不对 API 调用的实际 LLM 资源消耗（Token 数）进行计量。aisuite：无内建计费模型。不追踪 Token 消耗、不计算成本、不管理预算。费用完全由各 LLM 提供商的计费系统独立处理。核心差异：传统网关和 aisuite 都不进行 Token 级计费——前者按请求计数，后者完全不计数（依赖提供商），这与 LiteLLM 等全功能 AI 网关的 Token 级计费形成鲜明对比


**路由粒度**: 

> 传统 L7 网关：基于 URL 路径、HTTP Header、Host 域名进行路由决策，规则为静态通配符/正则匹配。aisuite：基于 provider:model 字符串进行路由——解析 model 参数中的 provider 前缀，分发到对应提供商的适配器。路由粒度在模型级别，不支持成本优化路由、延迟优先路由、Token 预算路由或多实例负载均衡。核心差异：传统网关按 HTTP 属性路由，aisuite 按模型标识路由——但两者都是单维度路由，缺少生产级 AI 网关的多维智能路由


**缓存策略**: 

> 传统 L7 网关：HTTP 级缓存（ETag/If-None-Match、Cache-Control max-age、CDN 边缘缓存、Vary Header），基于 URL 精确匹配。aisuite：无任何缓存能力。不提供响应缓存、语义缓存（基于向量嵌入的相似匹配）或提供商 Prompt Caching 透传。核心差异：传统网关有 HTTP 级缓存，aisuite 无缓存——这与 LiteLLM 等支持语义缓存的 AI 网关形成显著差距


**安全模型**: 

> 传统 L7 网关：通用 Web 安全（WAF 规则、DDoS 防护、IP 黑白名单、CORS 策略、mTLS、OAuth/JWT 认证、请求频率限流）。aisuite：安全模型极简——仅通过环境变量管理 API Key，无 WAF、DDoS 防护、Prompt 注入检测、数据防泄露或 Token 级别滥用检测。安全完全依赖各 LLM 提供商的原生认证机制和用户在应用层的自行实现。核心差异：传统网关有丰富 Web 安全层，aisuite 基本无安全层——这是库级 SDK 定位的固有局限


**内容转换**: 

> 传统 L7 网关：HTTP 层面请求改写和响应修改（Header 注入/改写、URL 重写、Body 正则替换、响应压缩/gzip）。aisuite：AI 语义层面的消息格式转换——通过 Converter 层将各提供商的请求/响应转换为 OpenAI 统一格式（消息归一化）。不支持跨模型格式互转（如 Anthropic tool_use ↔ OpenAI tool_calls 语义映射）、模型自动切换或 fallback 降级。核心差异：传统网关操作 HTTP 层，aisuite 操作 LLM 消息格式层——但转换能力仅限于归一化，不如 LiteLLM 的全语义双向转换


**限流单位**: 

> 传统 L7 网关：限流单位为请求数/秒（RPS）、并发连接数、带宽（Mbps）。如'每 IP 100 RPS'。aisuite：无任何限流能力。既无传统请求级限流（RPS），也无 Token 级限流（TPM），更无金额预算（如每月 $500）。限流完全依赖各 LLM 提供商的 API 限流策略。核心差异：传统网关有限流但单位是请求数，aisuite 完全无限流——这是 AI 网关最核心的差异维度。LiteLLM 等全功能 AI 网关引入 Token/分钟和金额/月的限流单位，aisuite 均不支持


**流量特征**: 

> 传统 L7 网关：优化同步短连接（HTTP 请求-响应 通常 <1s）、小载荷（KB 级）、高并发短连接池。aisuite：流量特征由底层提供商 SDK 管理——支持通过 SDK 发起的长连接请求（包括 ASR 流式长连接）。Chat 场景为同步请求-响应模式，ASR 支持流式传输。aisuite 本身不管理连接池或 TCP 连接生命周期（完全委托给提供商 SDK）。核心差异：传统网关直接管理网络连接，aisuite 通过 SDK 间接发起请求——连接管理在 SDK 层而非 aisuite 层


**生态定位**: 

> aisuite 定位为'独立 AI 网关（Library-style Gateway）'——一个嵌入应用代码的轻量级 Python/TypeScript 客户端库，不部署为独立服务。在 AI 网关生态光谱中：1）LiteLLM/Portkey 代表'独立服务型 AI 网关'（Proxy 部署，提供完整的治理、安全、可观测性）；2）Kong AI Plugin/APISIX AI Plugin 代表'L7 网关 + AI 插件'模式；3）aisuite 代表'库级 AI 网关'模式——不替代也不依赖传统网关，直接嵌入应用代码作为多模型调用的统一适配层。核心定位：适合需要快速切换和对比多家 LLM 提供商的开发者和研究者，快速原型和实验阶段的最佳选择。不适合需要企业级治理（多租户、预算、审计、安全）或独立网关服务（负载均衡、缓存、限流）的生产场景



### 24. New API

- **架构层级定位**: New API 定位为 L7+ AI 应用层网关，与传统 L7 网关（Nginx/Kong/APISIX）是不同层级的互补组合。传统 L7 网关负责通用 HTTP 流量管理（反向代理/TLS终止/全局限流/WAF），New API 在之上处理 AI 特有逻辑（模型路由/格式转换/Token计费）。典型部署为前端 L7 网关 → 后端 New API 的分层架构
**协议感知能力**: 

> New API 具有深度 LLM 协议感知能力：理解 OpenAI、Claude Messages、Gemini 三种原生 LLM 协议格式，能进行语义级别的格式互转；感知 SSE 流式事件的 Token 边界，能从流中提取 usage 数据和 thinking 内容；理解 OpenAI Realtime API 的 WebSocket 协议；基于 Token 消耗而非请求数计费。传统 L7 网关仅做 HTTP 层面通用处理，无法理解 LLM 特有的协议语义、SSE 事件解析、Token 计算和 provisioned throughput 等概念


- **状态模型**: New API 具有有状态管理能力：会话亲和性（多轮对话尝试使用同一渠道 Affinity）、Token 配额跟踪（预扣减→实际结算的状态机）、令牌预算生命周期管理（启用/禁用/过期/耗尽状态自动流转）、用户余额与消费历史跟踪。传统 L7 网关基本上是无状态的（或仅维持简单的连接级会话粘性）
- **计费模型**: New API 采用 Token 级 + 金额级组合计费模型：配额点数制（1 USD = 500,000 配额点）、三级倍率计费（模型倍率 × 补全倍率 × 分组倍率）、预消费+后消费差额调整、缓存命中折扣计费、分段计费（Token Tier Pricing）、按次计费（Midjourney/Suno 等固定价格接口）。传统 L7 网关通常是请求级计费或无计费功能
- **路由粒度**: New API 路由基于 AI 语义维度：模型名称路由（按模型能力匹配渠道）、优先级+权重选择（按成本/延迟优化渠道选择）、推理力度后缀路由（-high/-medium/-low）、会话亲和性路由（多轮对话保持同一渠道）。传统 L7 网关路由基于 URL/Header/Host/Path 等 HTTP 通用维度
- **缓存策略**: New API 缓存为传统键值缓存（Redis 配额/Token/配置缓存 + 内存渠道缓存），缓存命中时按比例折扣计费。不支持基于向量嵌入的语义缓存（语义相似匹配）。传统 HTTP 缓存策略基于 ETag/CDN/Vary/Cache-Control 等标准 HTTP 缓存头
- **安全模型**: New API 安全模型侧重 AI 场景：敏感词内容过滤、令牌级访问控制（模型白名单/IP白名单/配额限制）、自动化渠道滥用检测与禁用。传统 L7 网关安全模型侧重通用 Web 安全：WAF（Web Application Firewall）、DDoS 防护、IP/请求级限流、CORS 跨域控制。New API 缺乏专门的 Prompt 注入防护和数据防泄露能力
**内容转换**: 

> New API 内容转换为语义级别的 AI 协议转换：OpenAI ↔ Claude Messages ↔ Gemini 格式双向互转（含 thinking 模式/推理力度/函数调用等高级特性转换）、thinking-to-content 转换（思考过程转为内容输出）。传统 L7 网关内容转换为语法级别：HTTP 请求/响应头改写、请求体重写/JSON 字段修改、响应改写。New API 的转换是跨 LLM 协议的深度语义转换，传统网关不具备此能力


- **限流单位**: New API 限流单位为多维组合：请求次数/分钟（全局 API 限流）、Token/分钟（模型级别 TPM 限流）、配额点数/生命周期（用户/令牌预算总额）。传统 L7 网关限流单位以请求数/秒（RPS）为基本单位。这是 AI 网关与传统网关最核心的差异之一——AI 网关需要理解 Token 维度的消耗与限制
**流量特征**: 

> New API 处理的流量特征为 AI 典型模式：流式长连接（SSE 持续 30-300s）、大载荷（多模态请求可达 32MB）、秒级延迟容忍（LLM 推理本身需数秒），需要网关支持代理缓冲关闭（proxy_buffering off）、长超时配置（proxy_read_timeout 300s）、WebSocket 协议升级。传统 L7 网关主要处理同步短连接、毫秒级延迟、小载荷的 REST API 流量，连接模型与 AI 流量有本质差异


- **生态定位**: New API 定位为独立 AI 网关 + AI 资产管理平台，形态上属于统一 API+AI 网关。与传统 API 网关是互补关系而非替代（共同构成前端 L7 网关 + 后端 AI 网关的分层架构）。非 MCP 专用网关、非 Agent 治理平台、非 AI 插件嵌入传统网关形态。在生态中主要解决多模型统一接入、格式转换、运营计费三大核心问题

## 不确定字段汇总

### Kong AI Gateway

- features.插件扩展.Wasm
- agent_ecosystem.Agent 框架集成

### Apache APISIX AI Gateway

- 缓存能力-语义缓存
- 请求/响应转换-OpenAI与Claude与Gemini完整格式互转
- A2A 支持-原生支持
- Agent 框架集成-专用SDK或直接集成
- API-to-MCP 转换-开源版内置
- 延迟开销-AI插件单独开销基准
- 预算管理-原生金额预算管理
- Token 计数与成本追踪-内置多模型价格换算

### Portkey

- API-to-MCP 转换

### Bifrost

- 缓存能力（Redis/Memcached 缓存后端支持情况）
- 延迟开销（P50 和 P99 数据来自官方自测，缺乏第三方独立验证）
- 社区评价（Reddit 等社区讨论较少，评价信息有限）
- Agent 框架集成（除 LangChain 外，CrewAI/AutoGen/OpenAI Agents SDK 的实际兼容性和集成深度未验证）
- A2A 支持（确认无支持，但未来路线图不确定）
- gRPC 客户端协议支持（明确为规划中，但具体上线时间不确定）
- 语义缓存后端技术（使用 Weaviate 还是其他向量数据库，具体实现细节不确定）

### kgateway

- 缓存能力（agentgateway 是否计划内置语义缓存/Redis 后端支持，Envoy 版 AIPolicy 语义缓存已随 AI Gateway 弃用）
- 数据驻留（是否存在正式的 GDPR/数据安全法/等保合规认证或区域数据存储策略声明）
- 审计日志（是否存在内置不可变审计日志存储方案，当前依赖外部系统）
- 延迟开销（P50 延迟未单独公布，仅知 P95/P99 数据）
- Stars 数量（不同数据源显示 4.2k~5.6k，以 GitHub 页面直接抓取数据为准）

### agentgateway

- 缓存能力（是否计划内置语义缓存/Redis 后端）
- 插件扩展（未来是否计划支持 WASM/Lua 插件）
- 审计日志（是否存在专用不可变审计日志存储）
- 数据驻留（是否正式支持区域数据存储或数据驻留合规认证）
- 社区评价（Reddit/Hacker News 等社区讨论极少，主要源为两篇评测文章）
- 延迟开销（P50 延迟未公布，仅知 P99）

### Lunar MCPX（Lunar MCP Gateway）

- 缓存能力
- 预算管理
- 数据驻留
- PII 脱敏
- 内容审核
- 社区评价

### Gravitee Agent Mesh（现称 Gravitee AI Agent Management）

- performance.延迟开销
- performance.官方性能声明
- governance.预算管理
- governance.数据驻留
- content_safety.Prompt 注入防护
- content_safety.内容审核
- ai_vs_l7_gateway.计费模型
- ai_vs_l7_gateway.限流单位
- features.Token 计数与成本追踪
- agent_ecosystem.Agent 框架集成

### Gate22

- 速率限制
- 降级与重试
- 传统网关集成
- A2A 支持
- 官方性能声明
- 延迟开销
- 社区评价
- PII 脱敏
- 内容审核
- 限流单位

### WSO2 AI Gateway（WSO2 AI 网关）

- 请求/响应转换（LLM 格式互转）
- 插件扩展（Wasm/Lua 支持）
- A2A 支持
- Agent 框架集成（直接 SDK）
- 官方性能声明
- 延迟开销
- 社区评价

### Plano（原名 Arch Gateway / archgw）

- 负载均衡
- 速率限制
- 缓存能力
- 降级与重试
- 认证与密钥管理
- 请求/响应转换
- 流式处理
- Token 计数与成本追踪
- A2A 支持
- Agent 框架集成
- API-to-MCP 转换
- 官方性能声明
- 延迟开销
- 社区评价
- 多租户支持
- 审计日志
- 预算管理
- 数据驻留
- Prompt 注入防护
- PII 脱敏
- 内容审核
- 状态模型
- 计费模型
- 缓存策略
- 安全模型
- 内容转换
- 限流单位
- 流量特征

### Docker MCP Gateway

- 负载均衡
- 速率限制
- 降级与重试
- Token 计数与成本追踪
- 传统网关集成
- A2A 支持
- API-to-MCP 转换
- 官方性能声明
- 延迟开销
- 预算管理

### Envoy AI Gateway

- ws协议支持

### GPT-Load

- 可观测性_是否集成Prometheus_Grafana_OpenTelemetry
- 可观测性_是否支持外部告警推送
- 协议支持_是否原生支持WebSocket
- 传统网关集成_是否原生集成Kong_APISIX_Envoy_Traefik
- MCP 支持_是否可通过第三方工具使用
- Agent 框架集成_是否可通过OpenAI兼容接口间接支持
- API-to-MCP 转换_是否有第三方扩展
- 延迟开销_精确的P50_P99延迟数据
- 审计日志_是否记录完整请求和响应内容
- 审计日志_是否记录具体使用的上游密钥标识
- 预算管理_是否有超预算告警或截断功能
- 数据驻留_GDPR合规功能
- Prompt 注入防护_是否有内置检测机制
- PII 脱敏_是否有内置脱敏功能
- 内容审核_是否有内置内容过滤功能
- 速率限制_是否支持Token级速率限制
- 缓存能力_是否支持语义缓存
- 插件扩展_是否支持Wasm_Lua脚本扩展

### Helicone

- 协议支持-是否支持 gRPC
- API-to-MCP 转换

### Higress

- 缓存能力 - 是否支持 Redis/Memcached 等外部缓存后端的详细配置方式
- 降级与重试 - 流式请求的重试机制处理细节
- 提示词安全 - 「ai-guard」插件是否专门针对 Prompt Injection 攻击模式（如忽略系统指令、角色转换等检测）还是仅覆盖通用敏感词过滤
- 提示词安全 - Prompt Injection 检测算法的技术细节
- Token 计数与成本追踪 - 是否需要用户手动配置各模型价格，还是内置价格表自动换算
- MCP 支持 - 开源版是否已支持 Tool 粒度鉴权/限流/可观测/安全护栏
- A2A 支持 - Python Agent 的 A2A 支持阶段（官方文档标注为「即将支持」）
- Agent 框架集成 - AutoGen、OpenAI Agents SDK、CrewAI 等框架的具体集成验证
- 延迟开销 - 具体量化的 P99/P50 延迟开销数字，Wasm 插件额外开销测试数据是否为官方正式基准
- 治理与合规 - 开源版的具体 RBAC 实现程度
- 治理与合规 - 开源版是否内置告警通知能力用于预算超支
- 治理与合规 - 是否有官方 GDPR/数据安全法等合规认证声明
- 审计日志 - 开源版是否有独立审计日志模块
- 内容审核 - 是否有 LangFuse/LangSmith 等外部内容安全平台的直接集成
- 缓存能力 - AI 语义缓存的具体向量嵌入实现方案和缓存后端技术栈

### Langfuse

- 负载均衡
- 缓存能力
- 请求/响应转换
- 插件扩展
- 传统网关集成
- A2A 支持
- API-to-MCP 转换
- 延迟开销
- 预算管理

### LiteLLM

- API-to-MCP 转换
- 协议支持-是否支持 gRPC

### LobeChat Plugin Gateway（@lobehub/chat-plugins-gateway）

- 传统网关集成
- 延迟开销
- 审计日志

### One API

- 缓存能力_是否支持Memcached
- 可观测性_是否集成Prometheus_Grafana_OpenTelemetry
- 提示词安全_是否有后续版本添加内容安全检查
- 插件扩展_是否支持Wasm_Lua脚本扩展
- 协议支持_是否原生支持gRPC
- 传统网关集成_是否原生集成Kong_APISIX_Envoy_Traefik
- MCP 支持_MCP Client支持程度
- Agent 框架集成_是否可通过OpenAI兼容接口间接支持
- API-to-MCP 转换_是否有第三方扩展
- 延迟开销_精确的P50_P99延迟数据
- 审计日志_是否记录完整请求和响应内容
- 预算管理_是否有超预算告警或截断功能
- 数据驻留_GDPR合规功能
- Prompt 注入防护_是否有内置检测机制
- PII 脱敏_是否有内置脱敏功能
- 内容审核_是否有内置内容过滤功能

### OptiLLM

- 速率限制
- 缓存能力
- 官网
- Token 计数与成本追踪
- 传统网关集成
- A2A 支持
- API-to-MCP 转换
- 延迟开销
- 社区评价
- 多租户支持
- 审计日志
- 预算管理
- 数据驻留
- Prompt 注入防护
- 内容审核

### TensorZero

- 提示词安全
- 插件扩展
- A2A 支持
- Agent 框架集成
- API-to-MCP 转换
- 审计日志
- Prompt 注入防护
- PII 脱敏
- 内容审核

### aisuite

- 流式处理-Chat Completions 流式支持状态

### New API

- 可观测性（Prometheus/Grafana/OpenTelemetry 集成）
- 提示词安全（Prompt 注入防护）
- 插件扩展（Wasm/Lua 动态扩展机制）
- MCP 支持（原生 MCP Server 代理）
- A2A 支持（Google Agent-to-Agent 协议）
- Agent 框架集成（LangChain/LangGraph/AutoGen 等专门集成）
- API-to-MCP 转换（OpenAPI 零代码转 MCP 工具）
- 预算管理（超预算告警或截断功能）
- Prompt 注入防护（专门机制）
- PII 脱敏（自动检测与脱敏机制）

## 其他信息
