---
task_id: a
role: Open-Source Ecosystem Mapper
status: complete
sources_found: 8
---

## Sources

[1] Best 7 Open Source AI Gateways in 2026 | https://futureagi.com/blog/best-open-source-ai-gateways/ | Source-Type: secondary-industry | As Of: 2026-05 | Authority: 6/10
[2] awesome-ai-gateway curated list | https://github.com/cuihuan/awesome-ai-gateway | Source-Type: community | As Of: 2026-06-14 | Authority: 7/10
[3] LiteLLM Alternatives: Best Open-Source and Secure LLM Gateways in 2025 | https://www.pomerium.com/blog/litellm-alternatives | Source-Type: secondary-industry | As Of: 2025-08 | Authority: 5/10
[4] Best 5 LiteLLM Alternatives in 2026 | https://futureagi.com/blog/best-litellm-alternatives-2026/ | Source-Type: secondary-industry | As Of: 2026-05 | Authority: 6/10
[5] 10+ API Gateways That Support MCP | https://nordicapis.com/10-api-gateways-that-support-mcp/ | Source-Type: journalism | As Of: 2025-06 | Authority: 7/10
[6] OpenRouter Alternatives in 2026: 5 LLM Gateway Platforms Compared | https://futureagi.com/blog/openrouter-alternatives-2026/ | Source-Type: secondary-industry | As Of: 2026-05 | Authority: 5/10
[7] LiteLLM vs Portkey, Kong & Cloudflare: AI Gateways Compared | https://contabo.com/blog/litellm-vs-ai-gateways/ | Source-Type: secondary-industry | As Of: 2026-05 | Authority: 5/10
[8] pingcap/ossinsight Issue #2169 — LLM Gateway Collection Request | https://github.com/pingcap/ossinsight/issues/2169 | Source-Type: community | As Of: 2025 | Authority: 6/10

## Findings

- The open-source AI gateway ecosystem spans at least 35+ cataloged projects, with the tier-1 projects being LiteLLM (50.3k stars, Python/MIT), Kong AI Gateway (43.6k stars, Go-Lua/Apache 2.0 open-core), new-api (38.7k stars, Go/AGPL-3.0), one-api (34.9k stars, Go/MIT), Portkey Gateway (12.1k stars, TypeScript/MIT core acquired by Palo Alto Networks Apr 2026), TensorZero (11.6k stars, Rust/Apache 2.0), and Higress (8.6k stars, Go-Envoy/Apache 2.0, joined CNCF Sandbox Mar 2026). [1][2]
- The 2026 Q1-Q2 period saw three major acquisitions reshaping the ecosystem: Helicone acquired by Mintlify (Mar 3, 2026, now in maintenance mode), Portkey acquired by Palo Alto Networks (Apr 30, 2026, roadmap merging into Prisma AIRS), and OpenRouter raising $113M Series B at $1.3B valuation (May 2026) — signaling consolidation and enterprise security integration as dominant trends. [1][2][4]
- A supply-chain security crisis hit the ecosystem on March 24, 2026, when LiteLLM's PyPI releases v1.82.7 and v1.82.8 shipped a credential-harvesting payload that scanned environments for API keys and database URLs, exfiltrating via DNS tunneling — LiteLLM had over 9 million downloads in the prior 90 days and the compromise window was under 12 hours, but it triggered widespread calls for commit-pinning and Sigstore verification across all gateway projects. [1][4]
- CVE-2026-30623 (April 15, 2026) disclosed an MCP STDIO command injection vulnerability affecting LiteLLM and at least 14 other projects, accelerating the push for built-in guardrails and input sanitization at the gateway layer — Future AGI's Agent Command Center ships 18+ built-in guardrail scanners as a direct response. [1]
- Performance benchmarks published by vendors show Bifrost (Go) at ~11 microseconds P50 overhead at 5,000 RPS and Future AGI ACC (Go) at ~29,000 req/s with P99 21ms and guardrails on, both substantially outperforming Python-based LiteLLM under GIL contention — however, none of these benchmarks have been independently reproduced by a neutral third party as of mid-2026. [1][4]
- The MCP (Model Context Protocol) gateway subcategory has emerged as a distinct vertical with projects including Lunar MCPX (~454 stars, agent governance and cost analysis), MCP Ecosystem MCP Gateway (zero-code API-to-MCP translation), WunderGraph MCP Server (GraphQL bridging), IBM MCP Context Forge (~3.5k stars, MCP/A2A/REST registry), and agentgateway (~3.3k stars, CNCF agentic proxy part of kgateway) — Nordic APIs identified 10+ gateways with MCP support as of June 2025. [2][5]
- China's AI gateway ecosystem has developed independently with projects like new-api (38.7k stars, Go/AGPL-3.0, key distribution and billing), one-api (34.9k stars, Go/MIT, original relay platform), GPT-Load (6.2k stars, Go/MIT, key-pool rotation), and Higress (8.6k stars, Alibaba-backed, CNCF Sandbox) — these focus heavily on multi-tenant key management, billing integration, and Chinese LLM provider support rather than guardrails or evals. [2]
- Licensing fragmentation is a defining characteristic: MIT (LiteLLM core, Portkey gateway core, one-api, aisuite, GPT-Load), Apache 2.0 (Kong core, TensorZero, Bifrost, Higress, Helicone, Envoy AI Gateway, APISIX, Future AGI ACC), and AGPL-3.0 (new-api) — with AGPL-3.0 flagged as "a procurement disqualifier for most enterprise buyers" due to the network clause; Kong's open-core model also gates AI-specific plugins (semantic cache, prompt guard, RAG injector) behind Enterprise licensing. [1][2]
- Self-hosted high-performance options in Go and Rust are rapidly gaining ground against the Python-dominated LiteLLM: Bifrost claims approximately 50x LiteLLM throughput with adaptive load balancing and MCP support; TensorZero (Rust) uniquely bakes evals, experimentation, and a data/feedback flywheel for optimization directly into the gateway rather than as external observability; Portkey Gateway (TypeScript) supports 1,600+ models and 50+ guardrails. [1][2][4]
- The "API gateway meets AI" convergence is accelerating: Envoy AI Gateway (v0.5, Apache 2.0, Tetrate+Bloomberg backed), kgateway v2.1 with agentgateway (Kubernetes Gateway API v1.3.0 + Inference Extension v1.0.0), Apache APISIX (ai-proxy, ai-prompt-guard, ai-rate-limiting plugins), and Kong AI Gateway all build on existing API gateway infrastructure, with APISIX stating "the future isn't AI gateways — it's API gateways that speak AI." [2][5]

## Deep Read Notes

### Source [1]: Best 7 Open Source AI Gateways in 2026
Key data: 7-dimension rubric (provider breadth, latency overhead, guardrail depth, observability, deployment flexibility, cost governance, TCO) plus 3 open-source overlays (license verification, acquisition status, supply chain hygiene). LiteLLM PyPI compromise Mar 24, 2026 (v1.82.7/1.82.8, TeamPCP actor, DNS-tunneled exfiltration). Portkey acquired by PAN Apr 30, 2026. Helicone acquired by Mintlify Mar 3, 2026. Envoy AI Gateway at v0.5 with only ~5 providers. Bifrost ships ~23 providers vs 100+ for LiteLLM/Future AGI. All benchmarks vendor-published, not independently reproduced.
Key insight: The three Q1-Q2 2026 acquisitions (Helicone, Portkey) plus the LiteLLM supply-chain compromise collectively represent a structural shift — the field is maturing from grassroots OSS to enterprise-secured infrastructure, but at the cost of community independence.
Useful for: Understanding the broader ecosystem dynamics and structural risks beyond feature comparisons.

### Source [2]: awesome-ai-gateway curated list
Key data: 35+ cataloged open-source gateways, 15 with full comparison columns (stars, license, multi-provider, fallback/LB, caching, guardrails, cost tracking). Stars as of Jun 2026: LiteLLM 50.3k, Kong 43.6k, new-api 38.7k, one-api 34.9k, APISIX 16.7k, aisuite 14.1k, Portkey 12.1k, TensorZero 11.6k, Higress 8.6k, Plano 6.6k, GPT-Load 6.2k, Helicone 5.8k, Bifrost 5.7k, kgateway 5.6k, RouteLLM 5.0k, AIBrix 4.9k, OptiLLM 4.1k. Updated daily via GitHub Actions. Includes 4-axis scorecard (compliance, price, security, stability) with raw CSV data. Also catalogs 25+ commercial/SaaS AI gateways (OpenRouter, Vercel, Cloudflare, Requesty, Eden AI, nexos.ai, TrueFoundry, Tyk, Gravitee, WSO2, F5, IBM, MuleSoft, AWS Bedrock, Azure, Google Apigee, Databricks, Not Diamond, Martian, Inworld, Unify, Zuplo, NetFoundry, Tetrate, Traefik).
Key insight: This is the most comprehensive and frequently updated catalog of the AI gateway landscape — it captures the long tail of smaller projects (uni-api 1.2k stars, BricksLLM stale, Pydantic AI Gateway 189 stars) that are invisible in most blog comparison articles.
Useful for: Building a complete project inventory and tracking star-based community momentum.

### Source [4]: Best 5 LiteLLM Alternatives in 2026
Key data: Future AGI ACC at 986 GitHub stars, guardrails at ~67 ms median text-mode latency (citing arXiv 2510.13351), six optimizers including ProTeGi, GEPA, Bayesian, MetaPrompt, RandomSearch, PromptWizard. Portkey pricing escalation from $499/month at 4M requests to $2,400-$3,200/month at 12M requests. Kong migration timeline estimated at 10-15 engineering days (vs 5-8 for Future AGI, 3-5 for Helicone, 5-7 for Portkey). LiteLLM compromise had a window under 12 hours; BerriAI published postmortem Mar 26, 2026.
Key insight: Migration cost (engineering days for cutover) is now a formal comparison dimension — the article quantifies this for each alternative, suggesting the ecosystem is mature enough that switching costs between gateways are a real competitive factor.
Useful for: Understanding switching costs and the practical implications of the LiteLLM compromise for teams considering migration.

### Source [5]: 10+ API Gateways That Support MCP
Key data: Published Jun 18, 2025 by Nordic APIs. 12 gateways cataloged: Lunar MCPX (fully open, strongest MCP aggregation), APIPark (open, auto-wraps AI prompts into REST), Apache APISIX (open, Wasm + etcd, MCP header injection), Kong Konnect (open API server, natural language API interaction), Solo.io Agent Gateway (partially open, A2A + MCP), Moesif (commercial, analytics companion), WunderGraph MCP Server (open, GraphQL bridging), MCP Ecosystem MCP Gateway (open, zero-code API-to-MCP, Docker-ready), Tyk API Gateway (open, API-to-MCP bridge), Gravitee Agent Mesh (open, A2A protocol, agent autonomy), Zuplo (commercial, full MCP, monetization), Azure API Management (commercial, OAuth + MCP metadata routing). No specific version numbers or license types stated for most.
Key insight: MCP gateway support has diversified into three distinct patterns: (1) API-to-MCP translation (MCP Ecosystem Gateway, Zuplo, Tyk), (2) agent-to-agent/A2A governance (Solo.io, Gravitee), and (3) MCP server aggregation with cost/governance overlay (Lunar MCPX) — indicating the MCP gateway space is already fragmenting into specialized sub-niches.
Useful for: Mapping the MCP-specific subcategory of the AI gateway landscape that general AI gateway comparisons often miss.

## Gaps

- Independent third-party benchmarks: All published performance numbers (Bifrost's 11 microsecond P50, Future AGI's 29k req/s, LiteLLM's throughput ceiling) are vendor-published and have not been independently reproduced by a neutral entity as of mid-2026 — this is a significant gap for objective comparison.
- Counter-claim candidate: The "7 best" / "5 best" framing used by vendor-published comparison articles (Sources 1, 4, 6 from Future AGI, plus Pomerium and Contabo) systematically excludes China-ecosystem projects (new-api at 38.7k stars, one-api at 34.9k stars) from their rankings despite these having higher community adoption by star count than most ranked gateways — suggesting geographic and language bias in English-language industry coverage.
- No source provides a systematic comparison of total cost of ownership (TCO) for self-hosted deployments beyond vendor pricing pages; infrastructure costs (compute, storage, operational overhead) for each gateway at scale are undocumented.
- The MCP gateway subcategory (Source 5) was last comprehensively cataloged by Nordic APIs in June 2025 — the 2026 MCP landscape has evolved considerably (CVE-2026-30623, new entrants) but no updated landscape review exists.
- License compliance risks for AGPL-3.0 projects (new-api) and open-core models (Kong) are mentioned but not legally analyzed in any source — no source provides definitive guidance on what constitutes a "derivative work" in the context of an AI gateway deployment.

## END
