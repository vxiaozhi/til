# Research Plan: AI 网关开源项目全景调研

## Query
AI 网关的开源项目有哪些（包括但不限于 LiteLLM、Bifrost），以及 AI 网关与以往 7 层网关的异同。

## Query Type: Breadth-first
可分解为独立的子主题：不同类别的 AI 网关项目调研 + AI 网关 vs L7 网关对比。

## Research Sub-topics

### Subtopic 1: 独立 AI 网关核心项目
- LiteLLM, Bifrost, Portkey, Helicone, TensorZero, Arch Gateway, agentgateway, OptiLLM, aisuite
- 关注：基本信息、功能特性、部署架构、Agent 生态集成、性能特征

### Subtopic 2: 传统网关 AI 插件
- Kong AI Gateway, Apache APISIX AI Gateway, kgateway, Envoy AI Gateway, Higress, WSO2 AI Gateway, Gravitee Agent Mesh
- 关注：与传统网关集成方式、功能覆盖度、生态定位

### Subtopic 3: 国产/中文社区项目 + MCP 专用网关
- One API, new-api, GPT-Load
- Docker MCP Gateway, Lunar MCPX, Gate22
- 关注：社区活跃度、功能特色、适用场景

### Subtopic 4: AI 网关 vs 传统 7 层网关对比
- 架构层级定位、协议感知、状态模型、计费模型、路由粒度、缓存策略、安全模型、内容转换、限流单位、流量特征、生态定位

## Information Sources
1. WeChat Official Account articles (via wechat-article-search skill)
2. GitHub repos (Stars, README, issues)
3. Official documentation and websites
4. Technical blogs and community discussions
5. Web search for latest news and comparisons

## Search Keywords
- "AI Gateway 开源"、"大模型网关"、"AI 网关对比"、"LiteLLM vs Bifrost"
- "传统 API 网关 AI 扩展"、"Kong AI Gateway"、"APISIX AI 插件"
- "MCP 网关"、"Agent Gateway 开源"
- "AI 网关 vs 7层网关"、"AI Gateway vs API Gateway"

## Execution Plan
1. Load wechat-article-search skill
2. Deploy 4 parallel subagents for each subtopic
3. Synthesize findings into comprehensive report
4. Save report and update README
