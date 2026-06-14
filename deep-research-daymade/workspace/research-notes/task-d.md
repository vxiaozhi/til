---
task_id: d
role: Gateway Architecture Comparatist
status: complete
sources_found: 4
---

## Sources

[1] API Gateway vs. AI Gateway: Key Differences & Best Use Cases | https://konghq.com/blog/learning-center/api-gateway-vs--ai-gateway | Source-Type: Vendor Blog (Kong Inc.) | As Of: 2025-11 | Authority: 8/10
[2] AI Gateway vs API Gateway Differences Explained | https://apisix.incubator.apache.org/blog/2025/03/21/ai-gateway-vs-api-gateway-differences-explained/ | Source-Type: Open-Source Project Blog (Apache APISIX) | As Of: 2025-03 | Authority: 8/10
[3] Why Traditional Gateways Failed AI Workloads | https://www.solo.io/blog/why-traditional-gateways-failed-ai-workloads-and-how-kgateways-rust-powered-agentgateway-fixes-it | Source-Type: Vendor Blog (Solo.io) | As Of: 2025-12 | Authority: 7/10
[4] AI Gateway, MCP Gateway, API Gateway — What's the Difference? | https://api7.ai/ja/learning-center/api-gateway-guide/ai-gateway-vs-mcp-gateway-vs-api-gateway | Source-Type: Vendor Learning Center (API7.ai) | As Of: 2025-06 | Authority: 7/10

## Findings

- AI gateways are not a replacement for traditional API gateways but an evolutionary extension of them, adding AI-specific capabilities such as token-aware rate limiting, semantic caching, and prompt-level security. [1][2]
- The five fundamental mismatches that make traditional API gateways insufficient for LLM traffic are: (1) synchronous vs. streaming traffic patterns, (2) request-count vs. token-based billing, (3) exact-match vs. semantic caching, (4) authentication-only vs. content-aware security, and (5) request metrics vs. token-cost observability. [1][2][3]
- The global AI gateway market was valued at USD 3,911 million in 2024 and is projected to reach USD 9,843 million by 2031 at a 14.3% CAGR, while the broader AI market is estimated at USD 638.23 billion in 2025 (projected to USD 3,680.47 billion by 2034 at 19.20% CAGR). [1]
- Semantic caching can reduce LLM inference costs by 20-40% by recognizing semantically equivalent prompts rather than requiring exact text matches, a capability absent from traditional API gateways. [1]
- Prompt injection was ranked the #1 risk in the 2025 OWASP Top 10 for LLM Applications, driving the need for AI gateways that perform content-level security inspection (pre-call prompt sanitization and post-call output moderation) beyond what traditional gateway authentication provides. [1]
- Envoy's core architecture is stateless and unidirectional, which fundamentally clashes with stateful, bidirectional AI protocols like MCP (Model Context Protocol) and agentic agent-to-agent (A2A) communication, creating a structural limitation that cannot be resolved through plugins or sidecars. [3]
- Gartner estimates that converged API+AI gateway systems reduce operational costs by 30-50% compared to running separate gateways, and predicts over 75% of enterprises now use AI models in production as of 2023. [2]
- The industry is converging on three architectural patterns: (A) layered/two-gateway deployments with separate API and AI gateways, (B) unified API+AI gateways via plugins (Kong, APISIX, Tyk), and (C) AI-native standalone gateways built from scratch in Rust (Solo.io agentgateway, AISIX). [1][2][3]
- Traditional API gateways treat traffic as "opaque envelopes, inspecting headers only" while critical AI context (model name, prompts, token counts, MCP tool calls) lives deep inside JSON payload bodies requiring deep body parsing. [3]
- Kong forecasts that within 18-24 months (from Nov 2025), unified platforms with single control planes will manage both traditional API and AI traffic, and the CNCF is leading formal specification efforts for AI gateway standards expected by 2026. [1]

## Deep Read Notes

### Source [1]: API Gateway vs. AI Gateway: Key Differences & Best Use Cases (Kong Inc.)
Key data: AI gateway market USD 3,911M (2024) to USD 9,843M (2031), 14.3% CAGR; semantic caching yields 20-40% cost reduction; Gartner predicts 80% of GenAI business apps built on existing data platforms by 2028; OWASP 2025 ranks prompt injection as #1 LLM risk.
Key insight: The convergence forecast — unified platforms predicted within 18-24 months where "single control planes will manage all traffic types" and OpenAI-compatible interfaces become the de facto standard with CNCF formalizing specifications by 2026.
Useful for: Market sizing, cost-reduction benchmarks, security gap analysis, and the decision framework (when to use API gateway alone vs. add AI gateway vs. go AI-first).

### Source [2]: AI Gateway vs API Gateway Differences Explained (Apache APISIX, by Yilia Lin)
Key data: Gartner 2023 stat — over 75% of enterprises use AI models in production; converged systems reduce costs by 30-50% (Gartner 2023); two architectural approaches contrasted (purpose-built vs. evolved API gateways).
Key insight: The evolution thesis — "The future isn't AI gateways — it's API gateways that speak AI." Purpose-built standalone AI gateways will decline because they lack the mature observability, scalability, and enterprise features of evolved API gateways. The MCP protocol is showcased as the concrete integration point between AI agents and data services.
Useful for: Understanding the strategic trajectory — why standalone AI gateways lose to unified platforms — and the specific MCP integration pattern.

### Source [3]: Why Traditional Gateways Failed AI Workloads (Solo.io, by Sebastian Maniak)
Key data: Specific technical failures catalogued — Envoy's stateless architecture vs. stateful AI protocols, body-blind routing, fragile out-of-process workarounds that add latency and complexity; performance compound effect where "every millisecond of gateway latency compounds" in agentic loops with dozens of rapid round-trips.
Key insight: The architectural innovation argument — that fixing AI gateway problems at the Envoy plugin level is fundamentally insufficient. The solution requires a "pure Rust data plane purpose-built from scratch for stateful, bidirectional agentic protocols," with deep body inspection as a first-class feature, not an afterthought.
Useful for: The counter-argument to the unified/evolved approach — provides the strongest case for why starting from first principles (rather than bolting AI features onto existing proxies) may be necessary for high-performance agentic workloads.

### Source [4]: AI Gateway, MCP Gateway, API Gateway — What's the Difference? (API7.ai)
Key data: Published June 11, 2025; MCP gateways are classified as a specialized application of API gateways (not a distinct technology); all three share identical core components — the only architectural delta is streaming semantics (optional in API gateways, mandatory in AI/MCP).
Key insight: The taxonomy unification argument — "AI gateways and MCP gateways are not fundamentally new technologies" but rather domain-specific configurations layered onto traditional API gateway architecture. Recommends treating them as "specialized routes and plugins on top of an API gateway core."
Useful for: The classification debate — whether AI/MCP gateways are truly new categories or merely rebranded configurations, and the practical recommendation to unify rather than fragment the gateway layer.

## Gaps

- Comprehensive performance benchmarks comparing traditional API gateways (Kong, Envoy, APISIX) under AI workloads versus purpose-built AI gateways (LiteLLM Proxy, Portkey, agentgateway) were not found. Solo.io references benchmark repos but does not publish specific numbers in the blog post.
- Independent third-party analysis (non-vendor, non-project-affiliated) is scarce. All four deep-read sources are vendor or project blogs with inherent positioning interests — Kong and APISIX advocate unified platforms (preserving their market position), Solo.io argues for greenfield Rust rearchitecture (differentiating their product), and API7.ai downplays differentiation (aligning with their APISIX-based offering).
- Quantitative data on the failure rates of traditional gateways handling streaming AI traffic in production (e.g., connection drop percentages, latency overhead measurements, error rates under concurrent SSE load) was not found in any source.
- The environmental/power-consumption dimension of AI gateway vs. API gateway infrastructure was not addressed in any source — a gap given the energy intensity of LLM inference compared to traditional API calls.
- No source provided concrete case studies of organizations that migrated from a traditional API gateway to an AI gateway, with before/after metrics on cost, latency, or developer productivity.

## END
