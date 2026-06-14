---
task_id: b
role: AI Infrastructure Analyst
status: complete
sources_found: 8
---

## Sources

[1] LiteLLM GitHub Repository | https://github.com/BerriAI/litellm | Source-Type: Primary (official repo) | As Of: 2026-06 | Authority: 10/10
[2] LiteLLM Official Documentation | https://docs.litellm.ai/docs/ | Source-Type: Primary (official docs) | As Of: 2026-06 | Authority: 10/10
[3] FutureAGI: LiteLLM vs Alternatives in 2026 | https://futureagi.com/blog/litellm-llms-comparison-2025/ | Source-Type: Independent Analysis | As Of: 2026-06 | Authority: 7/10
[4] Pomerium: LiteLLM Alternatives | https://www.pomerium.com/blog/litellm-alternatives | Source-Type: Vendor Blog (Pomerium) | As Of: 2025 | Authority: 6/10
[5] InfoWorld: LiteLLM Article | https://www.infoworld.com/article/3975290 | Source-Type: Tech Media | As Of: 2025 | Authority: 7/10
[6] Dev.to: Bifrost vs LiteLLM Performance Comparison 2025 | https://dev.to/kuldeep_paul/llm-gateway-comparison-bifrost-vs-litellm-2025-4elk | Source-Type: Independent Benchmark | As Of: 2025 | Authority: 6/10
[7] PyPI: litellm Package | https://pypi.org/project/litellm/ | Source-Type: Primary (package registry) | As Of: 2026-06 | Authority: 10/10
[8] Datadog Security Labs: LiteLLM Supply Chain Compromise Analysis | https://securitylabs.datadoghq.com/articles/litellm-compromised-pypi-teampcp-supply-chain-campaign/ | Source-Type: Security Vendor Analysis | As Of: 2026-03 | Authority: 9/10

## Findings

- LiteLLM is an open-source (MIT license) AI Gateway maintained by BerriAI (YC W23 batch) that provides a unified OpenAI-compatible API to call 100+ LLM providers, including OpenAI, Anthropic, AWS Bedrock, Azure, Google Vertex AI, and many more. [1][2]
- The project has ~50,300 GitHub stars, ~7,000 forks, 39,600+ commits, 1,360+ releases, and over 1,000 contributors. Docker Hub reports 240M+ pulls and PyPI shows 470,000+ downloads. [1][7]
- Architecture consists of two deployment surfaces: a Python SDK (pip install litellm) and a Proxy Server (FastAPI-based AI Gateway deployable via Docker). A componentized microservices deployment (gateway + backend + UI) with Helm chart support is available experimentally, isolating the LLM data plane from the management control plane. [2]
- Key enterprise features include: virtual keys with scoped permissions and rate limits, multi-tenant hierarchy (Organization > Team > User > Key) with RBAC, per-call cost tracking and spend management with real-time budget enforcement, load balancing with latency-based and least-busy routing strategies, automatic fallbacks across providers, Redis-backed caching, and OpenTelemetry observability callbacks. [2]
- Adopted by Netflix, Adobe, Samsara, Lemonade, and Rocket Money for day-zero access to new models, multi-cloud LLM orchestration, and centralized cost governance. BerriAI raised a $1.6M seed round from Y Combinator, Gravity Fund, and Pioneer Fund. [5]
- Performance claims 8ms P95 latency at 1,000 RPS under ideal conditions. However, independent third-party benchmarks on t3.xlarge instances show P99 latency of 28,000ms at 500 RPS and crashes at 1,000 RPS due to memory exhaustion (4.3 GB usage). The Go-based alternative Bifrost achieves 520ms P99 at 500 RPS with only 1.4 GB memory. [2][6]
- A major supply chain compromise occurred on March 24, 2026: malicious versions v1.82.7 and v1.82.8 were published to PyPI by the TeamPCP threat actor group, triggered via a poisoned Trivy scanner in CI/CD. The payload included credential harvesting (SSH keys, cloud credentials, .env files), encrypted exfiltration to a C2 domain, and persistence via systemd services and Kubernetes privileged pods. The packages were live for 40 minutes to 5.5 hours before PyPI quarantine. [8]
- In response to the compromise, BerriAI rotated all credentials, rebuilt CI/CD with Trusted Publishers and ephemeral credentials, implemented Cosign release signing, removed 6,000+ open branches, and commissioned an external audit by Veria Labs. v1.83.0 was published as the verified clean release. [8]
- LiteLLM supports A2A Agent protocol (LangGraph, Vertex AI Agent Engine, Azure AI Foundry, Bedrock AgentCore) and MCP (Model Context Protocol) Gateway integration, enabling tool calls through the gateway with per-key and per-team access controls. The v1.74.9 release introduced Auto-Router for content-based model routing, and v1.78.0 added MCP Gateway with per-team tool access controls. [2]
- Primary limitations include: enterprise features (SSO, advanced RBAC, audit logs) locked behind paid tiers; no built-in guardrails or evaluator catalog in OSS edition; performance ceiling at high concurrency compared to Go-based alternatives; security risks from self-hosting requirements; rapid release cadence introducing regression risk; and the need to pair with external observability tools (Langfuse, Datadog) for production visibility. [3][4]

## Deep Read Notes

### Source [1]: LiteLLM GitHub Repository
Key data: 50.3k stars, 39,697 commits, 1,361 releases, v1.89.0 (June 14, 2026), Python 86.4% + TypeScript 12.7% codebase, MIT license (core) + commercial license (enterprise)
Key insight: The repository structure reveals three distinct sub-projects (litellm SDK, backend, gateway) plus enterprise/, docker/, helm/, terraform/ directories — indicating a full-stack production architecture beyond a simple library.
Useful for: Authoritative baseline for project scope, community size, and technology stack.

### Source [6]: Dev.to: Bifrost vs LiteLLM Performance Comparison
Key data: Bifrost (Go) vs LiteLLM (Python) on identical t3.xlarge: P99 at 500 RPS: 520ms vs 28,000ms; gateway overhead per request: 11us vs 600us; memory usage: 1.4GB vs 4.3GB; max stable throughput: 5,000+ RPS vs <1,000 RPS; container size: 50MB vs 500MB
Key insight: LiteLLM's Python/async architecture imposes a 54x P99 latency penalty at moderate concurrency and a hard throughput ceiling around 1,000 RPS where it crashes from memory exhaustion. This is the most concrete, independently measured performance data available.
Useful for: Understanding LiteLLM's practical scalability limits and when to consider Go-based alternatives for high-throughput workloads.

### Source [8]: Datadog Security Labs — Supply Chain Compromise Analysis
Key data: v1.82.7 (12 malicious lines in proxy_server.py, trigger: import) and v1.82.8 (added .pth file, trigger: any Python interpreter startup). Both published March 24, 2026, live ~40 min-5.5 hrs. Attack chain: Trivy PR workflow exploit -> credential exfil -> PyPI publish token theft -> direct upload. Payload: credential harvester (SSH, cloud, K8s, .env, crypto wallets), AES-256-CBC + RSA-4096 encrypted exfil to models.litellm.cloud, systemd persistence + K8s node-level escape.
Key insight: The root cause was an unpinned `apt-get install trivy` in CI/CD. This single omission enabled a cascading supply chain attack that compromised the PyPI publishing pipeline and affected downstream consumers at OS startup level.
Useful for: Risk assessment for teams considering self-hosting LiteLLM — demonstrates the operational security burden inherent in self-managed gateways and the critical importance of version pinning both the gateway itself and its CI dependencies.

## Gaps

- No independent, publicly audited pricing information for the Enterprise tier — only feature lists, no dollar amounts. The total cost of ownership (self-hosted infrastructure + ops + enterprise license) is opaque.
- Performance benchmarks are contradictory: official claims of 8ms P95 at 1,000 RPS conflict sharply with independent third-party measurements showing 28,000ms P99 at lower concurrency. No neutral benchmark under standardized conditions exists.
- Enterprise adoption claims (Netflix, Adobe, etc.) are cited only by the vendor and a single tech media article — no independent confirmation or case study details (scale, deployment model, specific use case) are publicly available.
- The supply chain compromise's downstream impact (how many users actually had credentials exfiltrated during the 40min-5.5hr window) has not been independently quantified.
- Comparison with managed gateways (Portkey, Cloudflare AI Gateway) lacks latency data at equivalent scale — the trade-off between self-hosted control and managed convenience remains qualitative rather than quantitative.

## END
