# 在 Claude Code 中使用 Deep Research 的完整方案指南

## 执行摘要

Claude Code 目前提供了一套完整的 deep research 解决方案，从原生内置到第三方生态扩展均有覆盖。核心是 2026 年 5 月随 Claude Opus 4.8 发布的 Dynamic Workflows 与内置 `/deep-research` 命令；此外还有丰富的 Skills/Plugin 生态、MCP 工具集成方案，以及可独立部署的开源研究框架。用户可根据任务复杂度和研究深度需求，在"零配置开箱即用"与"深度定制扩展"之间灵活选择。

---

## 背景：Claude Code 的多代理执行体系

在介绍具体方案前，理解 Claude Code 的分层架构有助于选型。从底层到顶层依次是：MCP（工具连接协议）→ Skills（可复用技能文件）→ Agent（单一会话代理）→ Subagents（委派工作进程）→ Agent Teams（多个对等代理协同）→ Dynamic Workflows（大规模脚本编排，2026 年 5 月新增）。

Dynamic Workflows 是这一体系中最新的层次，它将编排逻辑从"每轮询问 LLM 下一步做什么"改为"一次性生成可执行 JavaScript 脚本，由运行时负责控制流"，中间状态存储在脚本变量而非 Claude 的上下文窗口，因此能支持数百个并发子代理、长时间运行，并可在同一会话内断点续跑。

---

## 一、原生内置方案：Dynamic Workflows 与 /deep-research

### 1.1 内置 /deep-research 命令

`/deep-research` 是目前最直接的开箱即用方案，随 Claude Code v2.1.154 发布，属于 Dynamic Workflows 体系内预置的研究工作流，无需任何额外配置即可触发。

```bash
/deep-research <研究问题>

# 示例
/deep-research 2024年以来国内三大运营商在5G专网领域的市场策略对比
/deep-research What changed in the Node.js permission model between v20 and v22?
```

工作机制分四个阶段：首先把研究问题拆成约 5 个独立搜索方向并行启动子代理；接着抓取每个方向找到的网页来源并提取内容；然后对每条核心论断额外派 3 个子代理从反驳角度做对抗式交叉验证，淘汰未通过检验的声明；最后汇聚所有通过验证的信息，输出带引用标注的综合研究报告。

**系统要求：** Claude Code v2.1.154+，需要 WebSearch 工具可用（配置 Tavily MCP 或其他搜索 MCP）。Pro 用户需在 `/config` 中手动开启 Dynamic workflows 开关。

**实测体验（2026 年 6 月用户反馈）：** 优点是真正的开箱即用，无需配置，适合中等复杂度的行业研究问题。缺点是 token 消耗极快，有用户反映单次研究即耗尽当日 Pro 配额；研究深度相比 Perplexity、Manus 等专业工具仍有差距。建议先用小问题验证效果，再投入完整研究任务。

工作流的监控与复用：

```bash
/workflows          # 查看所有运行状态
                    # p 暂停/恢复；x 停止；s 保存脚本为可复用命令

# 保存后的调用路径
.claude/workflows/my-research.js    # 项目级，团队共享
~/.claude/workflows/my-research.js  # 个人级，跨项目可用
```

### 1.2 ultracode 模式与自定义工作流

ultracode 模式将 Dynamic Workflows 的判断权交给 Claude，由它自动决定何时启用工作流编排：

```bash
/effort ultracode         # 整个会话自动决策
ultracode: <任务描述>      # 单次触发工作流
```

也可以完全用自然语言描述工作流逻辑，Claude 会现场生成对应的 JavaScript 编排脚本：

```
# 示例：自定义多阶段研究工作流
Run a workflow to research "LLM推理优化最新进展":
- Phase 1: Use 10 parallel agents to search 10 sub-questions (use Haiku)
- Phase 2: Cross-validate findings with 3 adversarial agents per claim
- Phase 3: Synthesize all verified findings into a structured report with citations
```

Anthropic 披露的标志性案例是：Bun 作者 Jarred Sumner 用 Dynamic Workflows 将 Bun 从 Zig 迁移到 Rust，11 天内产出约 75 万行代码，由四段串联工作流分别处理 lifetime 映射、并行文件转换、构建修复循环和 PR 清理。

### 1.3 claude.ai Research 模式（仅网页版，供参考）

Anthropic 于 2025 年 5 月为 claude.ai 网页版推出了 Research 模式，最长运行 45 分钟（大多数报告 5-15 分钟完成），可遍历数百个内外部数据源，并集成了 Atlassian、Zapier、Asana、Sentry 等 10+ 第三方服务。目前仅限 Max、Team、Enterprise 计划，与 Claude Code CLI 是不同的产品入口，但共享相同的底层模型能力。

---

## 二、Skills 与 Plugin 生态方案

Claude Code 的 Skills 机制（2025 年 10 月正式发布）以 SKILL.md 文件为核心，支持渐进式加载：启动时仅加载名称和描述（约 100 词），触发后才加载完整内容（上限 5,000 词），大幅降低 token 消耗。以下是几个专注于 deep research 的代表性 Skills/Plugin 方案。

### 2.1 Weizhena/Deep-Research-skills（最原生的 Claude Code Skills 方案）

GitHub: https://github.com/Weizhena/Deep-Research-skills，MIT 协议，2026 年 5 月仍活跃更新。

这是专为 Claude Code、OpenCode 和 Codex 设计的结构化研究工作流 Skill，采用两阶段 Human-in-the-loop 设计：先生成研究大纲（可审核修改），再并行深度调研，最后生成 Markdown 报告。支持中英双语版本。

安装方式：

```bash
git clone https://github.com/Weizhena/deep-research-skills.git
cd deep-research-skills

# 英文版
cp -r skills/research-en/* ~/.claude/skills/
# 中文版
cp -r skills/research-zh/* ~/.claude/skills/

# 安装必要的 web-search-agent
cp agents/web-search-agent.md ~/.claude/agents/
cp -r agents/web-search-modules ~/.claude/agents/

pip install pyyaml
```

使用命令（Claude Code v2.1.0+）：

```bash
/research <研究主题>        # 生成研究大纲（含研究项目和字段定义）
/research-add-items         # 追加研究项目
/research-add-fields        # 追加字段定义
/research-deep              # 并行深度调研每个项目（自动调用 web-search-agent）
/research-report            # 生成带目录的 Markdown 报告
```

典型使用流程示例：

```bash
# 研究 "AI Agent Demo 2025" 主题
/research AI Agent Demo 2025
# → 生成含 17 个 Agent 的研究清单（ChatGPT Agent、Claude Computer Use、Cursor 等）
# 人工审核，确认后：
/research-deep
# → 自动搜索每个 Agent 的公司、发布日期、定价、技术规格
/research-report
# → 输出 report.md，含目录和完整对比数据
```

### 2.2 daymade/claude-code-skills deep-research（Plugin 市场方案）

可通过 Claude Code Plugin 市场直接安装（无需 git clone），是经过社区验证的 deep research 插件，当前版本 v6.1，支持来源可访问性验证（禁止循环引用，鼓励独特信息源）和企业研究模式（六维数据采集、SWOT/壁垒/风险框架、三级质量控制）。

```bash
/plugin install deep-research@daymade-claude-code-skills
```

### 2.3 synaptiai/deep-research（"时间验证扩散法"）

GitHub: https://mcpmarket.com/zh/tools/skills/deep-research-2

采用独特的"时间验证扩散（Time-Tested Diffusion）"方法论：从基于已有知识的初稿开始，通过多轮红队批评→定向网络搜索→来源置信度评分的循环逐步"去噪"，量化来源评分（1-100），自动处理矛盾信息，最终生成含执行摘要和来源归因的专业报告。适合需要高准确度的技术尽职调查、市场分析和行业白皮书场景。

### 2.4 academic-research-skills（学术研究全流程套件）

GitHub: https://github.com/Imbad0202/academic-research-skills，CC BY-NC 4.0，当前版本 v3.9.4.2，GitHub Stars 约 10,300+，2026 年 5 月仍活跃。

这是一套完整的学术研究流水线，包含 4 大模块（研究调研、论文写作、同行评审、流程编排），32 个独立 agent，覆盖从文献检索到投稿的全链路。核心特色是将学术写作中的七类 AI 失败模式（引用幻觉、实验结果幻觉、方法论伪造等）做成可观察、可配置、可阻断的两道"完整性门控"（Integrity Gate）。

```bash
/plugin install academic-research-skills

# 主要命令
/ars-plan           # 苏格拉底式引导梳理研究问题（零 token 成本热身）
/ars-lit-review     # 文献综述（Stage 1，验证搜索质量）
/ars-write          # 论文写作（Stage 2，含大纲→正文→引用）
/ars-review         # 多视角评审（EIC + 3 位评审 + 魔鬼代言人）
/ars-finalize       # 最终整合输出（Stage 4.5 全量完整性检验 + 格式化导出）
```

完整流水线运行约消耗 450K–750K tokens，折算约 $4–6 API 费用（12K-15K 词论文规模）。

### 2.5 phyr97/deep-research（通用深度研究插件）

专注通用研究场景（非学术），采用 Orchestrator-Scraper 双层架构：一个 Opus 协调器 agent 管理两类 Scraper（web 搜索抓取、codebase 代码库分析），支持 web / codebase / knowledge synthesis / mixed 四种研究模式，并追踪每次运行指标到 `~/.claude/deep-research/metrics.jsonl`。

```bash
claude plugin marketplace add phyr97/phyr97-marketplace
claude plugin install deep-research@phyr97

/deep-research "Caching strategies for Phoenix applications"
/deep-research --mode codebase "Map all GenServer processes in this project"
```

---

## 三、MCP 工具方案

MCP（Model Context Protocol）是 Anthropic 推出的开放标准，让 Claude Code 能连接外部搜索、爬取等服务。以下是 deep research 场景最常用的 MCP 工具。

### 3.1 核心搜索类

**Tavily MCP**（https://github.com/tavily-ai/tavily-mcp）是专为 AI agent 设计的搜索 API，提供实时网络搜索（tavily_search）、网页内容提取（tavily_extract）、网站地图生成（tavily_map）和网页爬取（tavily_crawl）四个工具，支持 `advanced` 深度搜索模式，可同时返回多个 URL 的提取内容。2026 年 5 月新增 keyless 模式和远程 HTTP MCP 支持，无需本地安装。

```bash
# 推荐方式：远程 HTTP，一行添加
claude mcp add --transport http tavily \
  "https://mcp.tavily.com/mcp/?tavilyApiKey=YOUR_KEY" --scope user
```

**Exa MCP**（https://exa.ai/mcp）提供语义网络搜索，专门划分了 company、news、people、financial report、research paper、personal site 等搜索类别，可直接搜索 arXiv 预印本、SEC 财报等学术资源。

```bash
claude mcp add --transport http exa https://mcp.exa.ai/mcp --scope user
```

**Brave Search MCP**（https://github.com/brave/brave-search-mcp-server）隐私优先，提供 `brave_llm_context` 工具为 AI 预处理网页内容，支持按时间（24h/周/月/年）过滤搜索结果，有免费层级，v2.0.83 版本（2026 年 6 月）持续维护。

**Perplexity MCP**（https://github.com/Alcova-AI/perplexity-mcp）整合 Sonar Pro 实时搜索与 Sonar Reasoning Pro 推理能力，不仅检索还能分析，适合需要深度推理的复杂研究问题。

```bash
brew tap alcova-ai/tap && brew install perplexity-mcp
claude mcp add-json --scope user perplexity-mcp \
  '{"type":"stdio","command":"perplexity-mcp","env":{"PERPLEXITY_API_KEY":"pplx-YOUR-KEY"}}'
```

### 3.2 网页内容提取类

**Firecrawl MCP**（https://github.com/firecrawl/firecrawl-mcp-server）是内容提取首选，返回干净的 Markdown（去除广告和无关 HTML），支持 JavaScript 渲染，内置 `firecrawl_agent` 自主研究代理。

```bash
# Claude Code .mcp.json 配置
{
  "mcpServers": {
    "mcp-server-firecrawl": {
      "command": "npx",
      "args": ["-y", "firecrawl-mcp"],
      "env": { "FIRECRAWL_API_KEY": "YOUR_KEY" }
    }
  }
}
```

**deep-research-mcp**（https://github.com/pminervini/deep-research-mcp）是专门的 deep research MCP 服务，通过 MCP 协议把 OpenAI Deep Research、Gemini Deep Research、Allen AI DR-Tulu 等多个专业研究后端接入 Claude Code，配置一次即可在 Claude Code 中调用商业级深度研究 API。

```bash
# stdio 方式
claude mcp add deep-research -- uv run \
  --directory /path/to/deep-research-mcp deep-research-mcp

# HTTP 方式（推荐，支持长时运行）
# 先启动服务器，再添加
claude mcp add --transport http deep-research-http \
  http://127.0.0.1:8080/mcp
```

### 3.3 官方免费 MCP 工具（无需 API Key）

以下三个官方维护的 MCP 工具不需要 API Key，与搜索 MCP 组合使用可大幅提升研究能力：

**Fetch MCP** 从任意 URL 获取并清洗内容（HTML/JSON/文本/PDF），与搜索 MCP 配合时充当"先搜索找 URL，再 Fetch 读全文"的第二阶段工具：`npx -y @modelcontextprotocol/server-fetch`

**Memory MCP** 提供跨会话持久化知识图谱，多轮研究时可记住已有发现、来源和关系，避免重复研究同一主题：`npx -y @modelcontextprotocol/server-memory`

**Sequential Thinking MCP** 帮助 Claude 动态分解复杂问题、规划研究策略、在多来源间验证事实：`npx -y @modelcontextprotocol/server-sequential-thinking`

### 3.4 推荐 MCP 组合配置

根据不同需求推荐三种组合配置（存入项目根目录 `.mcp.json` 即可生效）：

| 组合 | 包含工具 | 适用场景 |
|------|---------|---------|
| 免费入门组合 | Brave Search + Fetch + Memory + Sequential Thinking | 无预算，验证方案 |
| 推荐标准组合 | Tavily + Exa + Firecrawl + Memory + Sequential Thinking | 日常研究主力 |
| 技术研究专用 | 标准组合 + Context7 MCP | 研究特定技术栈文档 |

完整的推荐标准组合配置（`.mcp.json`）：

```json
{
  "mcpServers": {
    "tavily-mcp": {
      "command": "npx",
      "args": ["-y", "tavily-mcp@latest"],
      "env": {
        "TAVILY_API_KEY": "${TAVILY_API_KEY}",
        "DEFAULT_PARAMETERS": "{\"search_depth\": \"advanced\", \"max_results\": 10}"
      }
    },
    "fetch": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-fetch"]
    },
    "memory": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-memory"]
    },
    "sequential-thinking": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-sequential-thinking"]
    },
    "firecrawl": {
      "command": "npx",
      "args": ["-y", "firecrawl-mcp"],
      "env": { "FIRECRAWL_API_KEY": "${FIRECRAWL_API_KEY}" }
    }
  }
}
```

注意：`.mcp.json` 中使用 `${ENV_VAR}` 引用系统环境变量，避免明文 API Key 提交到 git。MCP 输出默认限制 25,000 tokens，长报告场景可设置 `export MAX_MCP_OUTPUT_TOKENS=50000`。

---

## 四、开源 Deep Research 框架

除 Claude Code 原生方案外，以下开源框架可独立部署或与 Claude Code 集成。

### 4.1 GPT Researcher（综合评测第一名）

GitHub: https://github.com/assafelovic/gpt-researcher，Stars ~17,000+，Apache 2.0。

卡内基梅隆大学 DeepResearchGym（2025 年 5 月，1,000 个复杂查询）评测中，GPT Researcher 在引用质量（85.36% Precision / 90.82% Recall）、报告质量（Clarity 83.70%）、信息覆盖率（Key Point Recall 64.67%）三项指标均排名第一，优于 Perplexity、OpenAI 和 HuggingFace。

架构采用 Planner（规划子问题）→ Execution（并行搜索）→ Publisher（综合报告）三层，支持树状递归 Deep Research，支持超过 100 种 LLM（包括 Claude），可连接 Google、Bing、Tavily、DuckDuckGo 等搜索引擎，支持本地文档混合搜索，并可导出 PDF、DOCX、Markdown、JSON 等格式。

与 Claude Code 集成的三种方式：

```bash
# 方式一：作为 Claude Code Skill 安装（最快）
npx skills add assafelovic/gpt-researcher

# 方式二：通过 gptr-mcp 作为 MCP 服务接入（Claude Desktop/Code 均可）
claude mcp add gpt-researcher -- npx -y gptr-mcp

# 方式三：环境变量配置 Claude 作为 LLM 后端，独立部署
# 在 .env 中设置 ANTHROPIC_API_KEY + LLM_PROVIDER=anthropic
```

```python
# Python 直接调用（pip install gpt-researcher）
from gpt_researcher import GPTResearcher

researcher = GPTResearcher(
    query="2025年大模型推理优化最新进展",
    report_type="research_report"
)
research_result = await researcher.conduct_research()
report = await researcher.write_report()
```

### 4.2 LangChain/open_deep_research（官方原生支持 Claude）

GitHub: https://github.com/langchain-ai/open_deep_research，Stars ~11,500，MIT 协议。

在 Deep Research Bench 排行榜（100 道博士级研究题）中排名第 6，总体评分 0.4344。官方性能表专门测试了 `anthropic:claude-sonnet-4-20250514`，RACE 评分 0.4401，略优于默认 GPT-4.1 配置的 0.4309。

架构为四层模型（总结/研究/压缩/报告），各层可独立配置不同模型，支持 Tavily、MCP 兼容工具、Anthropic 和 OpenAI 原生网络搜索。完全支持 MCP 服务器集成，通过 `mcp_config` 字段配置。

```bash
# 安装并切换为 Claude 后端
git clone https://github.com/langchain-ai/open_deep_research.git
cd open_deep_research && uv venv && source .venv/bin/activate
uv sync && cp .env.example .env
# .env 中设置：
# RESEARCH_MODEL=anthropic:claude-sonnet-4-20250514
# ANTHROPIC_API_KEY=your_key

uvx --refresh --from "langgraph-cli[inmem]" \
  --with-editable . --python 3.11 \
  langgraph dev --allow-blocking
```

### 4.3 HuggingFace smolagents/open-deep-research（最接近 OpenAI 原版的开源复现）

GitHub: https://github.com/huggingface/smolagents，GAIA 基准达到 55% pass@1（OpenAI 原版 67%），是目前最接近原版的开源复现。基于 smolagents CodeAgent 框架，框架层可接入 Claude（非默认），更适合作为学习 agent 编排设计的参考实现。

### 4.4 Perplexica / Vane（开源本地 AI 搜索引擎）

GitHub: https://github.com/ItzCrazyKns/Perplexica，Stars ~24,000+，MIT 协议，2026 年 4 月升级为 Vane 继续维护。Next.js + SearxNG + LangChain 架构，支持 Claude 作为 LLM 后端，定位为隐私优先的本地 AI 搜索引擎，更适合需要私有化部署的场景。

### 4.5 开源项目对比

| 项目 | Stars | 支持 Claude | Claude Code 集成方式 | 最适合场景 |
|------|-------|------------|---------------------|-----------|
| GPT Researcher | ~17K | 原生支持 | Skill / MCP / 独立部署 | 通用研究报告，学术评测第一 |
| open_deep_research | ~11.5K | 原生支持 | 独立部署 + API | 可配置、可评测的研究管道 |
| smolagents open-dr | N/A | 框架支持 | 独立部署 | 学习编排设计 |
| Perplexica / Vane | ~24K | 支持 | 浏览器 / API | 私有化部署搜索引擎 |
| deep-research-mcp | N/A | 通过 MCP | `claude mcp add` | 代理调用多个商业 DR API |

---

## 五、方案选型指南

### 5.1 按需求快速选型

| 需求 | 推荐方案 | 上手成本 |
|------|---------|---------|
| 立即使用，无需配置 | 内置 `/deep-research` 命令 | 零配置 |
| 搜索能力更强的内置工作流 | `/deep-research` + Tavily MCP | 5 分钟配置 |
| 结构化研究，可审核大纲 | Weizhena/Deep-Research-skills | 10 分钟安装 |
| 通用深度研究，性能最优 | GPT Researcher（Skill 方式） | 5 分钟安装 |
| 学术论文全流程 | academic-research-skills | 30 分钟安装+配置 |
| 调用商业 DR API（OpenAI/Gemini） | deep-research-mcp | 20 分钟配置 |
| 多源搜索+内容提取 | Tavily + Exa + Firecrawl MCP 组合 | 15 分钟配置 |
| 私有化部署本地搜索 | Perplexica / Vane | 独立部署 |
| 学习 agent 编排设计 | LangChain open_deep_research | 独立部署 |

### 5.2 分层搭配最佳实践

推荐按以下分层思路搭配：底层配置 **Tavily MCP**（主力搜索）+ **Firecrawl MCP**（内容提取）+ **Memory MCP**（跨会话记忆），覆盖搜索-提取-记忆核心链路。研究工作流层根据场景选择：日常通用研究用内置 `/deep-research`；需要可审核大纲的结构化研究用 Weizhena/Deep-Research-skills；学术场景用 academic-research-skills。对于需要超越 Claude Code 原生能力的场景（如需调用 OpenAI Deep Research API、需要学术基准评测），使用 deep-research-mcp 或独立部署 GPT Researcher。

### 5.3 Token 成本注意事项

使用任何 deep research 方案前，需要对 token 消耗有合理预期。内置 `/deep-research` 单次研究可达数十万 token；academic-research-skills 完整流水线约 450K–750K tokens；GPT Researcher 等开源框架的成本取决于所用 LLM 和搜索 API 定价。建议在 `/workflows` 视图实时监控每个子代理的 token 消耗，并通过模型配置（如 Haiku 用于搜索子代理、Sonnet 用于综合）控制成本。

---

## 结论

Claude Code 的 deep research 生态已从早期"靠 prompt 指导搜索"发展为完整的分层体系。2026 年 5 月 Dynamic Workflows 的发布是关键节点，它让 Claude Code 从"每轮决策的对话代理"升级为"能够自主编排数百个并行子代理、完成长时间多阶段研究任务的工作流引擎"。

对于大多数用户，推荐的起步路径是：先配置 Tavily MCP 解决搜索工具问题，然后直接使用内置 `/deep-research` 命令；如果研究结构需要更精细控制，安装 Weizhena/Deep-Research-skills 或 phyr97/deep-research；学术研究场景直接选 academic-research-skills；需要定制化集成或评测的高级用户选择 GPT Researcher 或 open_deep_research。

---

## 参考资料

1. [Claude Code Dynamic Workflows 官方文档](https://code.claude.com/docs/en/workflows)
2. [Weizhena/Deep-Research-skills - GitHub](https://github.com/Weizhena/deep-research-skills)
3. [academic-research-skills - GitHub](https://github.com/Imbad0202/academic-research-skills)
4. [deep-research-mcp - GitHub](https://github.com/pminervini/deep-research-mcp)
5. [GPT Researcher 官网](https://gptr.dev/)
6. [langchain-ai/open_deep_research - GitHub](https://github.com/langchain-ai/open_deep_research)
7. [Tavily MCP Server - GitHub](https://github.com/tavily-ai/tavily-mcp)
8. [Exa MCP Server](https://exa.ai/mcp)
9. [Firecrawl MCP Server - GitHub](https://github.com/firecrawl/firecrawl-mcp-server)
10. [Claude Code Dynamic Workflows 深度解析 - SimonAKing](https://simonaking.com/blog/claude-code-dynamic-workflows/)
11. [Building a Deep Research Agent Using MCP-Agent - The AI Alliance](https://the-ai-alliance.github.io/enterprise-MCP/developing-mcp-servers/deep-research-mcp-agent/)
12. [academic-research-skills 框架深度分析 - txtmix.com](https://txtmix.com/posts/tech/academic-research-skills-claude-code-research-pipeline/)
13. [DeepResearchGym 评测论文 - arXiv:2505.19253](https://arxiv.org/abs/2505.19253)
14. [MCP 官方服务器列表 - GitHub](https://github.com/modelcontextprotocol/servers)
