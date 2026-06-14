---
task_id: c
role: AI Gateway Technology Analyst
status: complete
sources_found: 12
---

## Sources

[1] Bifrost AI Gateway Overview | https://docs.getbifrost.ai/overview | Source-Type: Official Documentation | As Of: 2026-06 | Authority: 8/10
[2] Bifrost: The LLM Gateway That's 40x Faster Than LiteLLM | https://dev.to/varshithvhegde/bifrost-the-llm-gateway-thats-40x-faster-than-litellm-1763 | Source-Type: Technical Blog | As Of: 2026-05 | Authority: 7/10
[3] Portkey AI Gateway Documentation | https://portkey.ai/docs/product/ai-gateway | Source-Type: Official Documentation | As Of: 2026-06 | Authority: 8/10
[4] Portkey's Gateway is Now Fully Open Source | https://www.benzinga.com/pressreleases/26/03/g51436964/portkeys-gateway-is-now-fully-open-source-processing-over-1-trillion-tokens-every-day | Source-Type: Press Release | As Of: 2026-03 | Authority: 7/10
[5] Portkey Alternatives in 2026: 6 LLM Gateway and Observability Tools | https://futureagi.com/blog/portkey-alternatives-2026/ | Source-Type: Industry Analysis | As Of: 2026-06 | Authority: 7/10
[6] MLflow AI Gateway | https://mlflow.org/genai/ai-gateway | Source-Type: Official Documentation | As Of: 2026-06 | Authority: 8/10
[7] Open Source LLM Gateways Compared | https://contabo.com/blog/litellm-vs-ai-gateways/ | Source-Type: Industry Analysis | As Of: 2026-05 | Authority: 6/10
[8] awesome-ai-gateway: Curated List of AI Gateways | https://github.com/cuihuan/awesome-ai-gateway | Source-Type: Curated Index (Community) | As Of: 2026-06 | Authority: 7/10
[9] Envoy AI Gateway Official Site | https://aigateway.envoyproxy.io/ | Source-Type: Official Documentation | As Of: 2026-06 | Authority: 9/10
[10] Tetrate and Bloomberg Release Open Source Envoy AI Gateway | https://www.bloomberg.com/company/press/tetrate-and-bloomberg-release-open-source-envoy-ai-gateway-built-on-cncfs-envoy-gateway-project/ | Source-Type: Press Release | As Of: 2025-02 | Authority: 9/10
[11] Higress Joins CNCF | https://www.cncf.io/blog/2026/03/25/higress-joins-cncf-delivering-an-enterprise-grade-ai-gateway-and-a-seamless-path-from-nginx-ingress/ | Source-Type: CNCF Official Blog | As Of: 2026-03 | Authority: 9/10
[12] OpenRouter Alternatives in 2026: 5 LLM Gateway Platforms Compared | https://futureagi.com/blog/openrouter-alternatives-2026/ | Source-Type: Industry Analysis | As Of: 2026-06 | Authority: 7/10

## Findings

- Bifrost (Go, Apache 2.0, ~5.7k stars) achieves ~11 microseconds gateway overhead at 5,000 RPS sustained load, approximately 40x less than LiteLLM's 440 microseconds, with ~50 MB memory (10x less than LiteLLM's ~500 MB) and zero gateway-level failures versus LiteLLM's 11% failure rate under the same load. [1][2]
- Portkey open-sourced its entire gateway core under Apache 2.0 in March 2026 (processing over 1 trillion tokens/day), covering 250+ providers and 1,600+ model variants, while keeping its observability control plane and enterprise features (SOC 2, HIPAA, SSO, PII redaction) closed-source behind paid SaaS tiers starting at $49-$99/month. [3][4][5]
- MLflow AI Gateway (part of MLflow, ~26.5k stars) provides unified endpoints for 50+ LLM providers directly inside the MLflow tracking server with no separate process needed, supports traffic splitting for A/B testing, automatic fallback chains, and records every request as an MLflow trace with cost and latency dashboards -- but lacks built-in guardrails, semantic caching, and detailed rate limiting compared to dedicated gateways. [6][8]
- Kong AI Gateway (Lua/Go, Apache 2.0, ~43.6k stars) extends Kong's mature API gateway with AI plugins (AI Proxy, Prompt Decorator, Prompt Guard, Semantic Cache) but carries high operational overhead unless Kong is already deployed; the semantic cache and advanced routing plugins require Enterprise licensing, and LLM calls are treated largely as opaque HTTP requests with less token-level visibility than AI-native gateways. [7][8]
- One API (Go, MIT, ~34.9k stars) and its more active fork New API (Go, AGPL-3.0, ~38.7k stars) dominate the Chinese-ecosystem LLM relay market, offering 10-minute Docker setup with 50+ channel support (excellent coverage of Chinese models like DeepSeek, Tongyi Qianwen, Zhipu GLM), built-in user billing, virtual key management, and per-key quotas -- but lack semantic caching, guardrails, and require manual DB edits for advanced configuration. [7][8]
- Envoy AI Gateway (CNCF-backed, developed by Tetrate and Bloomberg, v0.7.0 as of June 2026) is a Kubernetes-native AI gateway built on Envoy Gateway, supporting 16+ providers with CRD-based configuration, token-based rate limiting, MCP Gateway for agent traffic, the Gateway API Inference Extension for inference-aware routing, and two-tier gateway architecture for centralized entry plus per-cluster fine-grained traffic control. [9][10]
- Higress (Alibaba-origin, CNCF Sandbox since March 2026, Apache 2.0, ~8.6k stars) is an AI-native gateway built on Envoy/Istio that combines traffic gateway, microservices gateway, and AI gateway into a single control plane, featuring Wasm plugin sandbox with hot reload, token-based rate limiting, semantic caching via DashVector, model-aware routing using Gateway API Inference Extension, and 90%+ Nginx Ingress annotation compatibility for migration. [8][11]
- The AI gateway landscape has stratified into three architectural tiers: lightweight proxies (LiteLLM, Bifrost), enterprise API platforms with AI plugins (Kong, Envoy AI Gateway, Higress), and API distribution/resale platforms (One API, New API) -- each optimizing for different deployment contexts and governance requirements. [1][5][7][8]
- MCP (Model Context Protocol) gateway support emerged as a distinct required capability in 2025-2026, with Bifrost, Portkey, Envoy AI Gateway, and Higress all adding native MCP routing, tool aggregation, and per-consumer MCP tool filtering -- signaling that LLM gateways are evolving beyond simple API proxying into agent governance infrastructure. [1][9][11]
- Performance benchmarks show Go-based gateways (Bifrost at ~11 us overhead, ~50 MB memory) significantly outperform Python-based alternatives under sustained load, while Rust-based gateways (TensorZero ~11.6k stars, Helicone's ai-gateway) occupy a middle ground with stronger type safety guarantees but smaller ecosystems. [1][2][8]

## Deep Read Notes

### Source [2]: Bifrost: The LLM Gateway That's 40x Faster Than LiteLLM
Key data: Under 5,000 RPS sustained load on t3.xlarge: gateway overhead 11 us (Bifrost) vs 440 us (LiteLLM); memory 50 MB vs 500 MB; queue wait 1.67 us vs 47 us; gateway failures 0% vs 11%; total latency 1.61s vs 2.12s (24% improvement). Semantic cache hit returns in ~5ms (50ms embedding + 10ms search) vs ~2,000ms LLM call. Binary size ~20MB. Startup in milliseconds.
Key insight: The 40x claim applies specifically to gateway overhead, not end-to-end latency (where the improvement is 24%). The Go concurrency model (goroutines at ~2KB each, no GIL) is the primary architectural advantage, not algorithm optimization -- channel-based async queuing replaces mutex-based coordination entirely.
Useful for: Performance benchmarking and understanding why language choice (Go vs Python) matters for gateway infrastructure.

### Source [5]: Portkey Alternatives in 2026: 6 LLM Gateway and Observability Tools
Key data: Feature coverage matrix across FutureAGI, Portkey, LiteLLM, Helicone, OpenRouter, Cloudflare AI Gateway, and Kong AI Gateway. Only FutureAGI provides full-stack coverage (gateway + evals + simulation + prompt optimization + guardrails). Only Helicone and FutureAGI clear OSI bar for fully self-hosted plane. Common pricing: free tier 10K-100K requests/month, production $49-$799/month plus overage.
Key insight: The article explicitly warns that "gateway" is not a single capability -- platforms differ fundamentally on whether they are proxies (LiteLLM), observability-first gateways (Helicone), full-stack eval + gateway platforms (FutureAGI), or enterprise API platforms with AI plugins (Kong). Picking by provider count alone is a mistake.
Useful for: Comparative feature analysis and understanding the "gateway vs platform" distinction.

### Source [8]: awesome-ai-gateway Curated List
Key data: 50+ AI gateway projects cataloged. GitHub stars (mid-2026): LiteLLM 50.3k, New API 38.7k, One API 34.9k, MLflow 26.5k, Portkey 12.1k, TensorZero 11.6k, Higress 8.6k, Bifrost 5.7k, Helicone 5.8k, Envoy AI Gateway 1.7k. Key 2026 events: Palo Alto Networks acquired Portkey (May 2026), OpenRouter raised $113M at $1.3B valuation, new-api overtook one-api in activity.
Key insight: The China-ecosystem projects (One API, New API, Higress) collectively have more stars and community activity than Western-focused projects (Bifrost, Portkey, TensorZero) when excluding LiteLLM -- reflecting different market structures where API key distribution/resale is a primary use case.
Useful for: Comprehensive landscape overview, star counts as community-health proxy, and understanding geographic market segmentation.

### Source [9][10]: Envoy AI Gateway
Key data: First CNCF-backed open source AI gateway. v0.1 released Feb 2025, v0.7.0 released Jun 6 2026 (23 total releases). Two-tier architecture: Tier 1 (centralized auth/routing/rate-limiting), Tier 2 (per-cluster endpoint picking, internal model management). Kubernetes-native with CRDs (AIGatewayRoute, MCPRoute, BackendSecurityPolicy). Standalone Docker/CLI mode available. MCP Gateway with full spec compliance (streamable HTTP, JSON-RPC 2.0, OAuth 2.0, JWKS validation) since v0.4.0 (Nov 2025).
Key insight: The two-tier architecture and Gateway API Inference Extension integration make Envoy AI Gateway uniquely suited for organizations that self-host models on Kubernetes and need inference-aware routing (KV-cache hit rate, queue depth, LoRA adaptor placement) -- a capability absent from pure proxy gateways like LiteLLM and Bifrost.
Useful for: Kubernetes-native deployment patterns, inference-aware routing, and CNCF ecosystem alignment.

### Source [11]: Higress Joins CNCF
Key data: CNCF Sandbox accepted March 2026, coinciding with Nginx Ingress retirement. Built on Envoy/Istio, used at Alibaba Double 11 scale. 100+ Wasm plugins. Production users: Alibaba, Ant Group, Ctrip, DJI, Kuaishou, Boss Zhipin. Ctrip's implementation integrates multiple LLM providers with per-consumer token rate limiting, model degradation rules, and Prometheus-Grafana-Kafka-ClickHouse-Kibana observability pipeline.
Key insight: Higress is uniquely positioned at the intersection of traditional API gateway migration (Nginx Ingress replacement) and AI-native gateway -- organizations can consolidate onto one platform for both REST/gRPC API management and LLM/MCP traffic management, reducing operational footprint.
Useful for: Organizations planning Nginx Ingress migration, China-market deployments, and unified API + AI gateway consolidation strategies.

## Gaps

- No direct head-to-head benchmark data found comparing Bifrost vs Portkey vs Envoy AI Gateway vs Higress under identical conditions -- all performance claims come from each project's own documentation or vendor-adjacent blogs.
- Kong AI Gateway's AI-specific plugin performance (latency overhead, throughput ceiling) was not found in any source -- only general Kong API gateway benchmarks exist, making quantitative comparison against AI-native gateways impossible.
- Licensing complexity remains a significant research gap: LiteLLM's switch to BSL 1.1 (not OSI-approved), Portkey's split Apache 2.0/closed model, Kong's split OSS/Enterprise plugins, and New API's AGPL-3.0 create a fragmented compliance landscape that no single source systematically analyzes.
- The "MCP Gateway" capability is claimed by Bifrost, Portkey, Envoy AI Gateway, and Higress but no independent evaluation of MCP protocol compliance, performance, or interoperability between these implementations was found.
- Pricing data for enterprise/K8s-native gateways (Envoy AI Gateway, Higress commercial, Kong Enterprise) is opaque -- all sources say "contact sales" or list only self-hosted OSS costs without quantifying operational overhead of self-management.
- The June 2026 status of Helicone post-Mintlify acquisition (described as "maintenance mode") creates uncertainty that could not be resolved through available sources.

## END
