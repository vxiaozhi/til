# Open-Source AI Video Generation Models for E-Commerce Product-to-Video SaaS (2026)

## Executive Summary

As of June 2026, only four open-source video generation models are genuinely viable for building a self-hosted e-commerce product-to-video-ad SaaS: LTX-2.3 (Lightricks), Wan2.2 (Alibaba), SkyReels-V3 (Kunlun Qianwei), and the newly released Bernini (ByteDance). LTX-2.3 offers the best balance of speed, GPU efficiency, and licensing friendliness for solo developers, running on a single RTX 4090 with FP8 quantization and generating 5-second 720p clips in approximately 1-2 minutes. Wan2.2 delivers the highest open-source visual quality but requires an H100 GPU (80GB) at roughly $2.00-2.40/hour for production use. Critically, Wan 2.5 and 2.6 are closed-weight API-only products, not available for self-hosting. For product-image-to-video specifically, SkyReels-V3's reference-image-to-video pipeline (supporting 1-4 product images) is the most architecturally suited, though its custom skywork-license requires careful legal review before commercial deployment.

## Background and Scope

This research evaluates all open-source AI video generation models suitable for building an e-commerce SaaS that converts product photos into video advertisements. The evaluation covers license compatibility for solo commercial developers, GPU hardware requirements for self-hosting, generation speed and quality metrics, and cost analysis comparing self-hosting against commercial API services. The research identifies 11 candidate models and determines which are actually open-source and production-ready as of mid-2026.

## Model-by-Model Analysis

### Tier 1: Production-Ready with Clean Commercial Licensing

#### LTX-2.3 (Lightricks) -- Top Recommendation for Solo SaaS

GitHub: https://github.com/Lightricks/LTX-Video. Stars: approximately 10,400. Latest major release: March 2026 as LTX-2.3, an upgrade from LTX-2 (October 2025). Last commit: active as of June 2026.

License: The inference and training code is Apache 2.0. The model weights use the custom "LTXV Open Weights License" which is free for commercial use by entities with annual revenue under $10 million USD. Entities exceeding $10M revenue must contact Lightricks for a paid license. For a solo developer or early-stage SaaS, this license is effectively free and commercially safe.

GPU requirements: The full dev model requires 80GB+ VRAM at bf16. However, the distilled FP8 variant runs on an RTX 4090 (24GB), consuming approximately 16-24GB VRAM. GGUF Q4/Q8 quantized variants run on as little as 12-16GB. For production, the RTX 4090 with the distilled FP8 model is the practical minimum, while an A100 80GB would allow running the full-quality dev model.

Generation speed: On an RTX 4090 with FP8 distilled model, a 5-second 720p clip takes approximately 60-120 seconds. Optimized pipelines with 8-step distillation can produce short clips in as little as 23 seconds. A 10-second 1080p clip takes 2-6 minutes on the RTX 4090. On an H100, a 5-second clip generates in roughly 2 seconds according to Lightricks' benchmarks.

Image-to-video quality: Rated 7.5/10 for e-commerce products. LTX-2.3 supports both text-to-video and image-to-video, with a dedicated I2V distilled model released in March 2026. Product consistency is reasonable but not as strong as SkyReels-V3 for multi-reference scenarios. Key features include native synchronized audio generation, 4K resolution support, and up to 60 seconds of video generation. Notably, it is 18 times faster than WAN 2.2 in inference speed comparisons from community benchmarks.

Known issues: Cross-frame product consistency is weaker than models specifically designed for reference-image-to-video (like SkyReels-V3). Text rendering within generated videos remains unreliable. The $10M ARR threshold on the weights license means a successful SaaS would eventually need to negotiate a commercial license, though this would be a good problem to have.

API availability: Available on Replicate, fal.ai (LTX 2.0 Pro at $0.06/sec and LTX 2.0 Fast at $0.04/sec for 1080p), and via Lightricks' own LTX Studio web app.

#### Wan2.2 (Alibaba) -- Best Open-Source Visual Quality

GitHub: https://github.com/Wan-Video/Wan2.2. Stars: approximately 15,900. The Wan-Video organization has 16,200 stars on Wan2.1. Released July 2025. Last commit: active as of March 2026.

License: Apache 2.0 for both code and weights. This is the cleanest, most permissive license among all production-quality video generation models, making it ideal for commercial SaaS use with no revenue caps or usage restrictions.

Critical clarification: Wan 2.5 (September 2025) and Wan 2.6 (December 2025) are NOT open-source. They are closed-weight, API-only models available through Alibaba Cloud's Bailian platform. Wan 3.0 (mid-2026, 60B parameters, 4K, 30-second clips) is promised to return to open-source Apache 2.0 but is not yet available. For self-hosting purposes, Wan2.2 is the latest open-source version.

GPU requirements: The 14B I2V-A14B model requires 65-80GB VRAM for native operation, meaning an A100 80GB or H100 80GB is necessary for production. The consumer TI2V-5B model runs on an RTX 4090 (24GB) but at significantly longer generation times. With aggressive optimizations (TensorRT FP16), the A14B model can be squeezed onto an RTX 4090 using approximately 5.2GB VRAM, but this requires significant engineering effort.

Generation speed: The TI2V-5B on an RTX 4090 takes approximately 9 minutes for a 5-second 720p 24fps clip. The A14B with TensorRT optimization generates a 5-second 720p clip in approximately 40-45 seconds on an RTX 4090. On an H100 SXM5, the full A14B model takes 10-12 minutes for 5-second 720p, according to Spheron benchmarks. Community-optimized forks like Wan2.2-14B-Rapid-AllInOne claim approximately 10 seconds for a 5-second clip at 1024x576 using FP8 quantization in roughly 7.8GB VRAM.

Image-to-video quality: Rated 8.5/10 for e-commerce products. Wan2.2 uses a Mixture-of-Experts architecture with 27B total parameters (14B active per step). It offers dedicated I2V models (I2V-A14B and the unified TI2V-5B) with strong visual fidelity, cinematic aesthetics, and good motion coherence. Alibaba claims the training data was expanded by 65.6% for images and 83.2% for videos compared to Wan2.1. The model supports 60-plus controllable aesthetic parameters including lighting, color, and composition.

Known issues: Cross-frame product consistency can degrade with rapid camera movements. Text rendering in generated videos is unreliable. The massive GPU requirements for the full-quality model make self-hosting expensive compared to LTX-2.3. The 5B consumer model's 9-minute generation time is too slow for a SaaS product serving multiple users concurrently.

API availability: Available on fal.ai (Wan 2.6 at $0.05/sec), Alibaba Cloud Model Studio, and various community wrappers. Not extensively available on Replicate.

#### Bernini (ByteDance) -- Promising Newcomer, Too Early for Production

GitHub: https://github.com/bytedance/Bernini. Open-sourced in stages during June 2026 (Renderer on June 1, full model with Planner on June 11). Stars: very new, limited count. Paper: arXiv:2605.22344.

License: Apache 2.0. Cleanly commercial-friendly.

Architecture: Bernini uses a two-stage decoupled pipeline: an MLLM-based Semantic Planner (Qwen2.5-VL-7B) that understands user instructions and produces a semantic sketch, combined with a DiT-based Renderer (fine-tuned from Wan2.1, 14B parameters) that converts the sketch into video. A lighter 1.3B Renderer variant is also available for simpler tasks. The architecture introduces Segment-Aware 3D Rotary Positional Embedding (SA-3D RoPE) to handle multi-segment visual inputs while preserving spatiotemporal relationships.

GPU requirements: The full 7B Planner plus 14B Renderer requires an H100-class GPU (80GB recommended). The Renderer-only 1.3B variant can run on more modest hardware. CUDA 12.4 and Hopper-generation GPUs (H100/H800/H200) are recommended for FlashAttention-3 support.

Quality assessment: Rated 7.5/10 for e-commerce (preliminary, given the model's extreme newness). Benchmark scores show Bernini achieving an EditVerse score of 8.02, OpenVE 4.03, and VBench 84.37 for the full 7B+14B configuration -- competitive with but not clearly surpassing the top tier. Bernini-R 14B scores 7.99 on EditVerse and 3.78 on OpenVE.

Key differentiator: Bernini is not just a video generator but a unified generation and editing framework. It can perform environment editing, reference-guided style transfer, video inpainting and object insertion, and multi-element composition. This editing capability is uniquely valuable for e-commerce, where a user might want to place a product in different environments or edit an existing video.

Known issues: Being only days old as of this writing, Bernini has essentially zero community battle-testing. Production reliability is completely unknown. The two-stage architecture introduces additional latency compared to single-pass models. Multi-GPU inference requires Open-VeOmni, adding infrastructure complexity.

Recommendation: Monitor closely but do not build production on Bernini until at least Q3 2026, when community experience and optimizations will have matured. Its editing capabilities make it a strong candidate for version 2 of an e-commerce video SaaS.

#### SkyReels-V3 (Kunlun Qianwei / Skywork AI) -- Best for Product Image-to-Video, License Concerns

GitHub: https://github.com/SkyworkAI/SkyReels-V3. Released January 2026. Stars: growing community, not as large as Wan or LTX.

License: Custom "skywork-license" -- this is NOT a standard open-source license. It is classified as "other" on Hugging Face. The repository README does not clearly specify commercial terms, and independent analysis on sourcepulse.org flags this as "a significant adoption blocker for commercial or proprietary use." Earlier versions (V1) used Apache 2.0. You must review the specific LICENSE file carefully before commercial deployment. SkyReels V4 (February 2026) is not yet fully open-sourced.

GPU requirements: Minimum 24GB VRAM (RTX 4090) for 720p inference. A low-vram mode using FP8 quantization plus block offloading can reduce requirements to approximately 20GB. Python 3.12+ and CUDA 12.8+ are required. Multi-GPU inference uses xDiT Unified Sequence Parallelism.

Generation speed: For reference-to-video (R2V) at 720p with 5-second duration, approximately 2-4 minutes on an RTX 4090 depending on the number of reference images. The similar SkyReels-A2 model generates a 544p video in 80 seconds on an RTX 4090.

Image-to-video quality: Rated 9/10 for e-commerce products -- the strongest among open-source models for this specific use case. SkyReels-V3 was designed from the ground up for reference-image-to-video, supporting 1-4 reference images plus text prompts. Its reference consistency score is 0.6698 and visual quality score is 0.8119, outperforming many commercial closed-source models. The model maintains subject identity fidelity across frames and produces coherent multi-subject interactions. It supports aspect ratios of 1:1, 3:4, 4:3, 16:9, and 9:16 -- covering all major e-commerce and social media formats.

Additional capabilities include video extension (5-second clips extended to 30 seconds with cinematic shot switching) and audio-driven talking avatars (up to 200 seconds of audio). These features could support additional SaaS product tiers beyond basic product-to-video conversion.

Known issues: License uncertainty is the primary blocker. The model can struggle with very complex multi-subject scenes. Generation speed is slower than LTX-2.3.

API availability: Available via API at apifree.ai. Not widely available on Replicate or fal.ai.

### Tier 2: Viable with Caveats

#### HunyuanVideo 1.5 (Tencent)

GitHub: https://github.com/Tencent/HunyuanVideo. Stars: approximately 12,000 for the original repo. HunyuanVideo-1.5 released November 2025. Actively maintained as of June 2026.

License: Custom "Tencent Hunyuan Community License Agreement." This license prohibits use in the European Union, United Kingdom, and South Korea. Commercial use is free for products with fewer than 100 million monthly active users. Must include attribution "Powered by Tencent Hunyuan." This territorial restriction makes it effectively unusable for a global SaaS product serving EU/UK customers.

GPU requirements: The original 13B model requires 60-80GB VRAM (A100/H100). HunyuanVideo 1.5 (8.3B parameters, November 2025) reduces this to 14GB VRAM with CPU offloading, making it run on an RTX 4090. GGUF Q4/Q6/Q8 quantized versions run on 8-16GB. A step-distilled I2V variant (December 2025) generates video in approximately 75 seconds on an RTX 4090 using 8-12 denoising steps.

Image-to-video: HunyuanVideo-I2V released March 2025 as a dedicated 13B image-to-video model. Quality is good but the territorial license restrictions are fatal for a global SaaS.

Recommendation: Not viable for global SaaS due to EU/UK territorial restrictions. The license terms create unacceptable legal risk for any product serving international customers.

#### MOVA (OpenMOSS)

GitHub: https://github.com/OpenMOSS/MOVA. Released January 2026. Stars: growing community.

License: Described as "fully open-source" with weights, training code, inference code, and LoRA fine-tuning scripts all released. Exact license type requires verification but appears to be permissive.

GPU requirements: 12-24GB VRAM minimum with CPU offloading and tiered strategies for reducing VRAM. Compatible with RTX 4090, H100, and Huawei Ascend NPU. The model uses a 32B MoE architecture with 18B active parameters during inference.

Core capability: Native synchronized video and audio generation in a single inference pass, with film-grade multilingual lip-sync (Chinese and English). Generates up to 8 seconds at 720p. Its ELO score of 1113.8 and win rate exceeding 70% against LTX-2, OVI, and WAN2.1+MMAudio in arena evaluations indicate strong overall quality.

Image-to-video for e-commerce: Not specifically designed for image-to-video product generation. The primary value proposition is audio-visual synchronization, which matters more for talking-head and narrative content than product showcase videos. For a product-to-video SaaS, MOVA is less directly applicable than LTX-2.3 or SkyReels-V3.

#### CogVideoX 1.5 (Zhipu AI / THUDM)

GitHub: https://github.com/THUDM/CogVideoX. The 1.5 version (5B parameters) was released in 2025. Stars: approximately 8,000-9,000.

License: The original CogVideoX code is under Apache 2.0, but newer versions use a custom license similar to Tencent's approach. The CogVideoX-1.5-5B model from zai-org uses their own license terms.

GPU requirements: 24-32GB VRAM, runnable on RTX 4090. Generation takes 8-12 minutes for a 5-second 720p clip.

Status in 2026: CogVideoX received no major 2026 updates. The 5B parameter scale limits quality compared to newer 14B-plus models. It has been largely superseded by LTX-2.3 and Wan2.2 in quality benchmarks.

Recommendation: Not recommended for a new SaaS. The model is outdated and its quality has been surpassed by newer alternatives at similar GPU requirements.

#### Stable Video Diffusion (Stability AI)

Status: Effectively obsolete in 2026. Released in November 2023 with a non-commercial research license (Stability AI Non-Commercial Research Community License). No major updates since 2024. The model's 1.1B parameter scale and maximum resolution of 576x1024 are significantly behind current models. While Stability AI later adopted more permissive licensing for other models, SVD's original non-commercial license makes it unsuitable. It has been comprehensively surpassed by every model in Tier 1.

### Models Confirmed as NOT Open Source

Several models discussed in the community are not viable for self-hosting:

Wan 2.5 and Wan 2.6 are closed-weight, API-only models available through Alibaba Cloud's commercial platform. They cannot be self-hosted or downloaded. Their pricing is approximately $0.05-0.15 per second depending on resolution. Wan 3.0 is promised as open-source under Apache 2.0 in mid-2026 but is not yet available.

Seedance 2.0 (ByteDance) is entirely closed-source with no model weights or code released. It is accessible only through ByteDance's platforms (Dreamina/Jimeng, Doubao, CapCut) and select API partners. It commands approximately 80% of the Chinese video generation market by compute consumption but cannot be self-hosted.

HappyHorse 1.0 (Alibaba ATH Innovation) was announced as "open-source, Apache 2.0" in April 2026 and topped the Artificial Analysis Video Arena leaderboard with a 1333 ELO score, but as of June 2026 the actual model weights and code remain marked "Coming Soon" and have not been released. It is effectively a press release, not a deployable model.

daVinci (WaveSpeedAI) is described in WeChat articles as an "open-source king" with 15B parameters and native audio-video synchronization, but its actual open-source status and GitHub repository availability could not be verified.

Kairos 3.0-4B (Daxiao Robot) is an embodied AI world model for robotics, not a general-purpose video generation model. Not relevant to the e-commerce use case.

## GPU Self-Hosting Cost Analysis

### GPU Cloud Pricing (June 2026)

RunPod Community Cloud:
- RTX 4090 (24GB): $0.34/hour
- A100 PCIe (80GB): $1.19/hour
- A100 SXM (80GB): $1.39/hour
- H100 PCIe (80GB): $1.99/hour
- H100 SXM (80GB): $2.69/hour

Vast.ai (marketplace, prices fluctuate):
- RTX 4090 (24GB): $0.31-0.50/hour
- A100 80GB: $1.27-2.00/hour
- H100 80GB: $1.77-3.50/hour

RunPod Secure Cloud (SOC2, dedicated):
- RTX 4090: $0.59/hour
- A100 PCIe: $1.39/hour
- H100 PCIe: $2.39-2.89/hour

### Cost Per Video by Model and GPU Tier

LTX-2.3 on RTX 4090 ($0.34/hr, distilled FP8):
- 5-second 720p clip: approximately 1.5 minutes per video, yielding approximately 40 videos per hour
- Cost per video: approximately $0.0085
- At 1,000 videos/month: $8.50 in GPU costs
- At 10,000 videos/month: $85.00 in GPU costs

LTX-2.3 on H100 ($1.99/hr, full quality):
- 5-second clip: approximately 2-5 seconds per video (Lightricks claims real-time on H100), yielding approximately 720-1,800 videos per hour at maximum throughput
- Cost per video: $0.001-0.003 at full throughput
- At 10,000 videos/month: approximately $10-28 in GPU costs

Wan2.2 TI2V-5B on RTX 4090 ($0.34/hr):
- 5-second clip: approximately 9 minutes, yielding approximately 6.7 videos per hour
- Cost per video: approximately $0.051
- At 1,000 videos/month: $34.00 in GPU costs
- At 10,000 videos/month: $340.00 in GPU costs

Wan2.2 A14B on H100 SXM5 ($2.40/hr, from Spheron benchmarks):
- 5-second 720p clip: 10-12 minutes, yielding approximately 5-6 videos per hour
- Cost per video: approximately $0.40-0.48
- This is uneconomical for SaaS without multi-GPU parallelism

Wan2.2 A14B on RTX 4090 with TensorRT FP16 optimization ($0.34/hr):
- 5-second 720p clip: approximately 40-45 seconds, yielding approximately 80-90 videos per hour
- Cost per video: approximately $0.0038-0.0043
- This requires significant engineering effort for TensorRT optimization
- At 1,000 videos/month: $3.80-4.30 in GPU costs
- At 10,000 videos/month: $38-43 in GPU costs

SkyReels-V3 on RTX 4090 ($0.34/hr):
- 5-second 720p R2V clip: approximately 3 minutes, yielding approximately 20 videos per hour
- Cost per video: approximately $0.017
- At 1,000 videos/month: $17.00 in GPU costs
- At 10,000 videos/month: $170.00 in GPU costs

### Break-Even Analysis: Self-Hosting vs Commercial APIs

Comparison baseline: Veo 3.1 Lite at $0.05/second for 720p with audio. For a 5-second product video, that is $0.25 per video. Veo 3.1 Fast at $0.10/second for 720p gives $0.50 per 5-second video. Veo 3.1 Standard is $0.40/second (with audio).

LTX-2.3 on RTX 4090 versus Veo 3.1 Lite:
- Self-hosting cost: $0.0085/video. Veo 3.1 Lite: $0.25/video.
- Self-hosting is 29.4 times cheaper at any scale.
- Break-even occurs immediately. There is no volume threshold where the API becomes cheaper.

LTX-2.3 on RTX 4090 versus fal.ai LTX 2.0 Fast:
- Self-hosting cost: $0.0085/video. fal.ai: $0.20/video (5s x $0.04/sec at 1080p).
- Self-hosting is 23.5 times cheaper.
- However, this does not account for the engineering cost of setting up and maintaining self-hosted infrastructure.

Wan2.2 TI2V-5B on RTX 4090 versus Veo 3.1 Lite:
- Self-hosting cost: $0.051/video. Veo 3.1 Lite: $0.25/video.
- Self-hosting is 4.9 times cheaper.

Wan2.2 A14B on H100 versus Veo 3.1 Standard (quality-equivalent comparison):
- Self-hosting cost: $0.40-0.48/video. Veo 3.1 Standard: $1.60/video (5s x $0.40/sec, no audio).
- Self-hosting is approximately 3.3-4.0 times cheaper.

Infrastructure overhead considerations: The raw GPU cost does not include the cost of building and maintaining the inference server, queue management, monitoring, error handling, and the engineering time required. For a solo developer, the true cost of self-hosting should add 20-50% overhead for DevOps and infrastructure management time, or subtract from product development velocity. At very low volumes (under 500 videos/month), using an API wrapper like fal.ai may be more economical when factoring in engineering time, despite higher per-video GPU costs.

## Recommended Model Selection Strategy

### For the Solo Developer (Primary Recommendation)

Use LTX-2.3 on an RTX 4090 instance ($0.34/hour on RunPod Community Cloud, approximately $245/month for continuous operation). This provides the best balance of generation speed, quality, GPU cost, and license clarity. The $10M ARR revenue threshold on the LTX Open Weights License gives a solo developer years of runway before needing to renegotiate. The distilled FP8 model's 1-2 minute generation time per 5-second clip supports a viable SaaS with reasonable queue times for early customers.

The key risk is the custom weights license, which is not a pure open-source license. However, for a pre-revenue or early-revenue SaaS, the free tier is perfectly adequate. If the SaaS succeeds and exceeds $10M ARR, negotiating a commercial license with Lightricks is a high-quality problem.

### For Maximum Product Visual Fidelity

If visual quality for product representation is the paramount concern and cost is secondary, use Wan2.2 A14B with TensorRT optimization on RTX 4090 instances. At approximately $0.004 per video with optimizations, the per-unit cost is extremely competitive. However, the engineering effort required for TensorRT optimization is substantial -- expect 2-4 weeks of dedicated work to achieve the reported 40-45 second generation times. Alternatively, rent H100 instances but accept the higher per-video cost of approximately $0.40-0.48.

### For the Product-Image-to-Video Specialist

If the core value proposition is specifically converting product photographs into videos with high identity fidelity (the "product photo to video ad" use case), SkyReels-V3's reference-image-to-video pipeline is architecturally superior. The 1-4 reference image support directly maps to e-commerce workflows where a seller provides product images from multiple angles. However, the custom skywork-license must be reviewed by a lawyer before commercial deployment. If the license proves commercially viable, SkyReels-V3 on RTX 4090 at approximately $0.017 per video is an excellent choice.

### For the Future (Monitor in Q3-Q4 2026)

Bernini's unified generation and editing framework could become the ideal architecture for e-commerce video SaaS, as it would allow features like "place this product in a beach setting" or "change the background from white studio to lifestyle kitchen" without requiring separate models for each task. Watch for community optimizations, third-party benchmarks, and real-world production experience reports. If Bernini's community matures and GPU optimizations emerge (similar to the TensorRT optimizations for Wan2.2), it could become the definitive choice.

Wan 3.0, promised for mid-2026 under Apache 2.0 with 60B parameters, 4K resolution, and 30-second clips, could also reset the quality baseline for open-source video generation if delivered as promised. Monitor the Wan-Video GitHub organization for the release.

HappyHorse 1.0, if its promised Apache 2.0 release materializes, could become a strong option given its top-tier benchmark performance, but given the "Coming Soon" status since April 2026 without delivery, it should not be factored into near-term planning.

## Summary Comparison Table

| Model | License | Commercial-Friendly | Min GPU | Speed (5s 720p) | Quality (1-10) | Product Consistency | Cost/Video (Best GPU) | Active Maintained |
|-------|---------|---------------------|---------|-----------------|----------------|---------------------|-----------------------|-------------------|
| LTX-2.3 | Apache 2.0 code, Custom Weights ($10M cap) | Yes (under $10M) | RTX 4090 24GB | 1-2 min | 7.5 | Moderate | $0.009 (4090) | Yes (Jun 2026) |
| Wan2.2 | Apache 2.0 | Yes, unlimited | A100 80GB or RTX 4090 (optimized) | 9 min (5B) / 40s (14B opt) | 8.5 | Good | $0.004 (4090 opt) / $0.44 (H100) | Yes (Mar 2026) |
| SkyReels-V3 | Custom skywork-license | Lawyer review needed | RTX 4090 24GB | 3 min | 9.0 (I2V) | Excellent (multi-ref) | $0.017 (4090) | Yes (Jan 2026) |
| Bernini | Apache 2.0 | Yes, unlimited | H100 80GB | Too early to benchmark | 7.5 (preliminary) | Unknown | Unknown | Brand new (Jun 2026) |
| HunyuanVideo 1.5 | Custom Tencent | No (EU/UK blocked) | RTX 4090 14GB | 75 sec (distilled) | 7.0 | Moderate | $0.043 (4090) | Yes (Dec 2025) |
| MOVA | Open source | Likely yes | 12-24GB | Unknown for I2V | 6.5 (I2V weak) | Weak (not I2V focused) | Unknown | Yes (May 2026) |
| CogVideoX 1.5 | Custom/varies | Check terms | RTX 4090 24GB | 8-12 min | 5.0 | Weak | $0.10 (4090) | Low activity in 2026 |
| HappyHorse 1.0 | Promised Apache 2.0 | N/A (unreleased) | H100 48GB+ | 38 sec (1080p, H100) | N/A | N/A | N/A | Not released |
| Wan 2.5/2.6 | Closed, API-only | N/A | N/A (API only) | API only | 8.0-8.5 | Good | $0.25/video (API, 5s) | N/A (API) |
| Seedance 2.0 | Closed source | N/A | N/A (API only) | API only | 9.0 | Good | $0.60/video (API, 10s) | N/A (API) |

## Cost Comparison: 100 Videos Per Month vs 10,000 Videos Per Month

At 100 videos of 5 seconds each per month:
- Self-hosted LTX-2.3 on RTX 4090: $0.85 in GPU costs, plus infrastructure
- Self-hosted Wan2.2 optimized on RTX 4090: $0.40 in GPU costs, plus infrastructure
- fal.ai LTX 2.0 Fast: $20.00
- Veo 3.1 Lite: $25.00
- Veo 3.1 Standard: $160.00
- Seedance 2.0 API: $30.00 (estimated for 5s)

At 10,000 videos per month:
- Self-hosted LTX-2.3 on RTX 4090: $85.00 (need multiple GPUs or queue management)
- Self-hosted Wan2.2 optimized on RTX 4090: $40.00 (need multiple GPUs)
- fal.ai LTX 2.0 Fast: $2,000.00
- Veo 3.1 Lite: $2,500.00
- Veo 3.1 Standard: $16,000.00

The economic advantage of self-hosting becomes overwhelming at scale, roughly 25-50 times cheaper than API alternatives. However, at 10,000 videos per month, a single RTX 4090 cannot keep up with demand for Wan2.2 TI2V-5B (6.7 videos/hour, would require 62 GPUs running continuously for 10,000 videos), making this specific configuration impractical. LTX-2.3 on a single RTX 4090 can handle approximately 28,800 videos per month at 40 videos/hour, making it viable for a growing SaaS without horizontal scaling.

## Limitations of This Research

Generation speed benchmarks for video models are highly dependent on specific configurations (batch size, resolution, frame count, quantization level, and pipeline optimizations), and reported numbers vary by 10x or more between conservative and aggressively optimized setups. Real-world production throughput will likely fall between the optimistic and conservative estimates presented here.

Model quality ratings for e-commerce product videos are based on general image-to-video benchmarks and community reports, not on a controlled A/B test with actual product images in an e-commerce context. Product-specific evaluations (especially around cross-frame consistency of logos, text, and product details) are not available in published benchmarks.

License analysis is based on publicly available documentation and should not be considered legal advice. The skywork-license for SkyReels-V3 and the LTX Open Weights License both contain nuanced terms that require professional legal review before commercial deployment.

GPU pricing fluctuates significantly across providers and over time. The prices quoted represent June 2026 snapshots and should be verified at the time of infrastructure procurement.

## Conclusion

For building an e-commerce product-to-video-ad SaaS as a solo developer in June 2026, the recommended strategy is to build on LTX-2.3 as the primary engine. It runs on affordable RTX 4090 instances at approximately $0.34/hour, generates product videos in 1-2 minutes, costs under $0.01 per video in raw GPU expense (roughly 25-30 times cheaper than the cheapest commercial API), and has a commercially viable license for any SaaS under $10M annual revenue. The self-hosting economics are compelling: at any scale above approximately 100 videos per month, self-hosting beats API pricing by an order of magnitude or more, even accounting for infrastructure overhead. Wan2.2 serves as a quality upgrade path when visual fidelity becomes the competitive differentiator, and Bernini should be monitored as a potential v2 architecture that unifies generation with editing capabilities. The key near-term risk is model licensing: LTX-2.3's custom weights license, while free for early-stage use, is not a perpetual open-source guarantee, and tracking Wan 3.0's promised Apache 2.0 release provides a hedge against future licensing changes.

## References

1. [Wan-Video/Wan2.2 GitHub Repository](https://github.com/Wan-Video/Wan2.2)
2. [Lightricks/LTX-Video GitHub Repository](https://github.com/Lightricks/LTX-Video)
3. [ByteDance/Bernini GitHub Repository](https://github.com/bytedance/Bernini)
4. [SkyworkAI/SkyReels-V3 GitHub Repository](https://github.com/SkyworkAI/SkyReels-V3)
5. [Tencent/HunyuanVideo GitHub Repository](https://github.com/Tencent/HunyuanVideo)
6. [OpenMOSS/MOVA GitHub Repository](https://github.com/OpenMOSS/MOVA)
7. [THUDM/CogVideoX GitHub Repository](https://github.com/THUDM/CogVideoX)
8. [Best GPU for AI Video Generation 2026 - Spheron Blog](https://www.spheron.network/blog/ai-video-generation-gpu-guide/)
9. [Image-to-Video AI on GPU Cloud - Spheron Blog](https://www.spheron.network/blog/image-to-video-gpu-cloud-ltx-wan-hunyuan/)
10. [RunPod GPU Pricing](https://www.runpod.io/pricing)
11. [Vast.ai GPU Cloud](https://vast.ai)
12. [fal.ai Video Generation Models](https://fal.ai)
13. [Google Veo 3.1 Lite API Pricing](https://openrouter.ai/google/veo-3.1-lite)
14. [Wan 2.5/2.6 API Documentation - Alibaba Cloud](https://www.alibabacloud.com/help/en/model-studio/text-to-video-guide/)
15. [Seedance 2.0 vs Wan 2.5 Comparison](https://wan2.video/seedance2-vs-wan2.5)
16. [HappyHorse 1.0 Open Source Status Analysis - WaveSpeed Blog](https://wavespeed.ai/blog/posts/is-happyhorse-1-0-open-source-2026/)
17. [SkyReels-V3 Technical Report (arXiv:2601.17323)](https://arxiv.org/abs/2601.17323)
18. [Bernini Technical Report (arXiv:2605.22344)](https://arxiv.org/abs/2605.22344)
19. [GPU Cloud Comparison 2026: RunPod, Vast.ai - NerdLevelTech](https://nerdleveltech.com/gpu-cloud-comparison-2026-the-ultimate-cost-performance-guide/)
20. [Open Source Text-to-Video Models Compared 2026 - Apatero](https://apatero.com/blog/text-to-video-open-source-models-compared-2026)
