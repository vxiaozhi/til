# DeepSeek-V4-Pro 与 DeepSeek-V4-Flash 模型架构深度研究报告

## 执行摘要

DeepSeek-V4 系列于 2026 年 4 月 24 日发布，包含两个基于混合专家架构（MoE）的模型：DeepSeek-V4-Pro（1.6 万亿总参数，每 token 激活 490 亿参数）和 DeepSeek-V4-Flash（2840 亿总参数，每 token 激活 130 亿参数）。两者共享相同的核心架构创新——混合注意力机制（压缩稀疏注意力 CSA 与重度压缩注意力 HCA）、流形约束超连接（mHC）、Muon 优化器以及 FP4 量化感知训练。核心区别在于规模：Pro 拥有 61 层和 768 维隐藏层，Flash 拥有 43 层和 4096 维隐藏层，Pro 的总参数是 Flash 的 5.6 倍，激活参数是 Flash 的 3.8 倍。两者原生支持 100 万 token 上下文窗口。在基准测试中，Pro 在推理密集型任务上领先 1-5 个百分点，在事实知识回忆（SimpleQA）上领先 23.8 个百分点，但在非推理模式下两者几乎持平。技术论文发表于 arXiv:2606.19348。

## 背景与发布历程

DeepSeek-V4 系列是 DeepSeek-AI 自 2024 年 12 月发布 V3 以来最重要的模型更新，两者相隔约 484 天。V4 的技术报告由梁文锋署名发表于 arXiv（论文编号 2606.19348），模型权重以 MIT 协议开源，发布在 Hugging Face 上。

V4 的发布分为两个阶段。2026 年 3 月初，微信公众号开始流传 V4 即将发布的消息，当时预测其为万亿参数 MoE 架构并支持原生多模态。4 月 24 日，DeepSeek 正式发布 V4-Pro 和 V4-Flash 两个版本，同时提供 API 服务（api-docs.deepseek.com）。6 月 27 日，DeepSeek 进一步发布了 DSpark 推测性解码模块，将推理速度提升 80% 至 85%。

## 模型架构：总体设计理念

DeepSeek-V4 系列的核心设计目标是在百万 token 超长上下文场景下实现高效推理。与 V3 系列的多头潜在注意力（MLA）不同，V4 引入了全新的混合注意力架构，将单 token 推理 FLOPs 压缩至 V3.2 的 10% 至 27%，KV 缓存压缩至 V3.2 的约 10%。这一效率飞跃使得在消费级硬件上运行超长上下文推理成为可能。

V4 架构由四大核心创新组成：混合注意力机制（CSA + HCA）、流形约束超连接（mHC）、Muon 优化器的首次万亿参数级部署、以及 FP4 量化感知训练。以下逐一解析。

## 混合注意力机制：CSA 与 HCA

V4 彻底抛弃了 V3 的 MLA 架构，转而采用一种分层混合注意力策略。每一层解码器根据其位置采用三种注意力类型之一。

压缩稀疏注意力（CSA）是主力机制，用于大多数中间层。其工作流程分为四个阶段。第一阶段，每 4 个 KV token 通过 softmax 门控池化压缩为一个条目（压缩比 m=4），池化权重通过可学习的位置偏置调整。第二阶段，一个称为 Lightning Indexer 的轻量级组件（FP4 精度运行）对查询和压缩后的 KV 池进行 ReLU 评分的多头点积运算，选出 top-k 个最相关的压缩块（Pro 中 index_topk=1024，Flash 中为 512）。第三阶段，仅在选出的 top-k 压缩块上执行核心注意力计算，使用多查询注意力（1 个 KV 头）。第四阶段，通过分组低秩输出投影控制计算开销（Pro 中 O 分组数为 16，Flash 中为 8）。同时，一个大小为 128 的滑动窗口保留对最近未压缩 token 的直接访问。对于 100 万 token 的序列，CSA 将注意力目标从 100 万压缩至约 1024 个压缩块。

重度压缩注意力（HCA）用于少数特定层（V4-Pro 的第 0-1 层以及与其他层交替使用），其压缩比更为激进（m'=128），即每 128 个 token 压缩为一个条目，然后对所有压缩条目执行密集注意力而非稀疏选择。HCA 不进行 top-k 筛选，其职责是聚合全局信号。

所有注意力层共享一套基础设施：64 个索引注意力头（head_dim=128）、Partial RoPE（仅作用于最后 64 维，qk_rope_head_dim=64）、RMSNorm 前置归一化、每个头一个可学习的注意力汇（attention sink，StreamingLLM 风格）、以及共享 K=V 的多查询注意力结构。

效率方面：在 100 万 token 上下文下，V4-Pro 的单 token 推理 FLOPs 为 V3.2 的 27%，KV 缓存为 10%；V4-Flash 分别为 10% 和 7%。相对于 BF16 GQA8 基线，KV 缓存仅为约 2%。

## 流形约束超连接（mHC）

V4 用 mHC 替代了传统的残差连接。每个模块（注意力和 FFN）维护 4 条并行的残差流（hc_mult=4），通过一个混合矩阵 B 在流之间传递信息。B 不是自由参数，而是通过 Sinkhorn-Knopp 迭代（20 次迭代）投影到 Birkhoff 多胞形（双随机矩阵空间）上。这一约束确保 B 的谱范数不超过 1（非膨胀信号传播）且满足乘法封闭性（组合操作保持在流形内），从而在深层网络中保持训练稳定性。mHC 的墙钟开销通过融合 CUDA 核与选择性重计算控制在重叠流水线的约 6.7%。

## Muon 优化器

V4 是 Muon 优化器首次在万亿参数 MoE 模型上的部署。Muon 采用混合 Newton-Schulz 迭代策略：前 8 步为激进步骤（推动奇异值趋向 1），后 2 步为保守步骤。只有二维矩阵参数使用 Muon；嵌入层、预测头和 RMSNorm 层仍使用 AdamW。为适配 MoE 架构，DeepSeek 设计了自定义混合 ZeRO 策略。值得注意的是，V4 不需要 Kimi 等模型在 Muon 中使用的 QK-Clip，因为 V4 原生通过 RMSNorm 对查询和 KV 进行了归一化。

## FP4 量化感知训练

V4 在训练时即采用混合精度方案。MoE 专家权重和 Lightning Indexer 的 QK 通路使用 MXFP4 格式（4 比特）；其余大多数参数使用 FP8（e4m3 格式，动态激活缩放 ue8m0，权重块大小 [128,128]）。FP4 x FP8 的混合精度 GEMM 运算在未来的专用硬件上有望再提速约三分之一。

## MoE 路由策略

V4 的 43 层（Flash）或 61 层（Pro）中，大多数层采用标准 top-6 路由 MoE，部分早期层采用 Hash MoE（固定 token-ID 到专家-ID 的查找表）。路由亲和度评分从 V3 的 Sigmoid 改为 sqrt(softplus)，且去掉了 V3 中的路由目标节点约束。专家负载均衡通过 e_score_correction_bias 缓冲区实现无辅助损失策略。路由专家使用带限幅的 SwiGLU 激活函数（clamp limit=10.0）。

## DeepSeek-V4-Pro 与 DeepSeek-V4-Flash 详细架构对比

以下为从 Hugging Face config.json 和 arXiv 技术报告中提取的完整架构参数对比表。

| 参数 | V4-Pro | V4-Flash |
|---|---|---|
| 总参数量 | 1.6T（16,000 亿）| 284B（2,840 亿）|
| 每 token 激活参数 | 49B（490 亿）| 13B（130 亿）|
| 隐藏层数 | 61 | 43 |
| 隐藏维度 | 7,168 | 4,096 |
| 注意力头数 | 128 | 64 |
| KV 头数 | 1（多查询注意力）| 1（多查询注意力）|
| 头维度 | 512 | 512 |
| Q LoRA 秩 | 1,536 | 1,024 |
| O LoRA 秩 | 1,024 | 1,024 |
| O 分组数 | 16 | 8 |
| 路由专家数 | 384 | 256 |
| 共享专家数 | 1 | 1 |
| 每 token 激活专家数 | 6 | 6 |
| MoE 中间层大小 | 3,072 | 2,048 |
| 路由缩放因子 | 2.5 | 1.5 |
| 滑动窗口大小 | 128 | 128 |
| Index Top-K | 1,024 | 512 |
| 词表大小 | 129,280 | 129,280 |
| 最大位置嵌入 | 1,048,576（100 万）| 1,048,576（100 万）|
| CSA 压缩比 (m) | 4 | 4 |
| HCA 压缩比 (m') | 128 | 128 |
| Hash MoE 层数 | 3 | 3 |
| MTP 层数 | 1 | 1 |
| 最大输出 token 数 | 384,000 | 384,000 |

两者的架构创新完全一致，差异纯粹来自规模缩放。Pro 比 Flash 多 50% 的层数、75% 的隐藏维度、50% 的路由专家、以及 5.6 倍的总参数量。

## 训练细节

两个模型均采用四阶段序列长度增长策略进行预训练：从 4K 到 16K 到 64K 到最终 100 万 token。前 1 万亿 token 使用密集注意力作为预热，稀疏注意力（CSA/HCA）在扩展至 64K 时引入。V4-Pro 预训练语料超过 33 万亿 token，V4-Flash 超过 32 万亿 token（作为对比，V3 为 14.8 万亿 token）。

训练过程中出现了一次严重的损失尖峰，DeepSeek 采用了两个经验有效但机制未明的方法应对：预期路由（Anticipatory Routing，在尖峰传播前调整专家路由）和 SwiGLU 限幅（clamp limit=10.0，截断门控/上投影预激活值）。

训练硬件方面，V3 使用 2,048 张 H800 GPU，成本约 560 万美元；V4 的训练硬件未公开披露。后训练阶段，DeepSeek 在华为昇腾 910C 上完成了 V4-Pro 的全参数续训练和 SFT，达到超过 30% 的 MFU（模型浮点利用率），这是国产算力首次跑通万亿参数级模型的完整训练流程。训练基础设施还包括 MegaMoE（1.5 至 1.73 倍加速）、TileLang DSL 和确定性核等技术。

后训练采用两阶段策略。第一阶段：独立训练领域专用专家（数学、代码、Agent 任务、指令遵循），通过 SFT + GRPO 强化学习。支持三种推理模式：Non-think（不思考）、Think High（高思考）和 Think Max（最大思考）。第二阶段：通过 On-Policy Distillation（OPD）将多个教师专家整合为统一学生模型，使用逆 KL 散度损失。出于规模考虑，教师权重卸载至分布式存储并按需加载。

## 基准测试性能对比

### 基础模型（学术基准）

| 基准 | V3.2-Base | V4-Flash-Base | V4-Pro-Base |
|---|---|---|---|
| MMLU (EM) | 87.8 | 88.7 | 90.1 |
| MMLU-Pro (EM) | 65.5 | 68.3 | 73.5 |
| GSM8K (8-shot) | 91.1 | 90.8 | 92.6 |
| HumanEval (Pass@1) | 62.8 | 69.5 | 76.8 |

### V4-Pro-Max（最大推理模式）与前沿闭源模型对比

| 基准 | V4-Pro-Max | GPT-5.4 xHigh | Gemini-3.1-Pro High | Opus-4.6 Max |
|---|---|---|---|---|
| LiveCodeBench (Pass@1) | 93.5 | -- | 91.7 | 88.8 |
| Codeforces Rating | 3,206 | 3,168 | 3,052 | -- |
| GPQA Diamond (Pass@1) | 90.1 | 93.0 | 94.3 | 91.3 |
| SWE-Bench Verified | 80.6 | -- | 80.6 | 80.8 |
| MMLU-Pro (EM) | 87.5 | -- | -- | -- |
| MRCR 1M（长上下文）| 83.5 | -- | -- | -- |

### Pro 与 Flash 直接对比（Max Thinking 模式）

| 基准 | V4-Pro Max | V4-Flash Max | 差距 | 类别 |
|---|---|---|---|---|
| MMLU-Pro (EM) | 87.5 | 86.2 | 1.3 | 世界知识 |
| GPQA Diamond (Pass@1) | 90.1 | 88.1 | 2.0 | 研究生科学 |
| HLE (Pass@1) | 37.7 | 34.8 | 2.9 | 困难推理 |
| LiveCodeBench (Pass@1) | 93.5 | 91.6 | 1.9 | 代码生成 |
| Codeforces Rating | 3,206 | 3,052 | 154 Elo | 竞赛编程 |
| HMMT 2026 Feb (Pass@1) | 95.2 | 94.8 | 0.4 | 数学竞赛 |
| IMOAnswerBench (Pass@1) | 89.8 | 88.4 | 1.4 | 数学竞赛 |
| SWE-bench Verified | 80.6 | 79.0 | 1.6 | 软件工程 |
| SWE-bench Pro | 55.4 | 52.6 | 2.8 | 软件工程 |
| MRCR 1M (MMR) | 83.5 | 78.7 | 4.8 | 长上下文检索 |
| Terminal Bench 2.0 | 67.9 | 56.9 | 11.0 | 多步 Agent 任务 |
| BrowseComp (Pass@1) | 83.4 | 73.2 | 10.2 | 网页浏览 |
| Toolathlon | 51.8 | 47.8 | 4.0 | 工具使用 |
| Apex Shortlist (Pass@1) | 90.2 | 85.7 | 4.5 | Agent 编程 |
| SimpleQA-Verified | 57.9 | 34.1 | 23.8 | 事实回忆 |

### Non-Think 模式对比

| 基准 | V4-Pro Non-Think | V4-Flash Non-Think |
|---|---|---|
| MMLU-Pro | 82.9 | 83.0 |
| GPQA Diamond | 72.9 | 71.2 |
| LiveCodeBench | 56.8 | 55.2 |
| SWE-bench Verified | 73.6 | 73.7 |

基准数据分析揭示了清晰的性能梯度。在数学和编程等有界推理任务上，差距很小（1 至 3 个百分点），Flash 几乎可以媲美 Pro。在长上下文检索和多步 Agent 任务上，差距适中（4 至 11 个百分点），Pro 的更大容量在规划和记忆方面体现出优势。在 SimpleQA-Verified 事实知识回忆上，差距最大（23.8 个百分点），说明 Flash 因参数较少而世界知识存储显著不足。值得注意的是，在 Non-Think 模式下两者几乎无法区分——Flash 在 MMLU-Pro 上甚至略高 0.1 分——两者的质量差距主要在推理链路中体现，而非基础能力。

## NIST/CAISI 独立评估

美国国家标准与技术研究院（NIST）下属的 CAISI 对 V4-Pro 进行了独立评估。其估计的总体能力 Elo 约为 800（±28），处于 GPT-5.4 mini（749）和 Opus 4.6（999）之间，距离 GPT-5.5（1,260）约 8 个月的差距。V4-Pro 在非公开基准测试上的最大差距出现在：网络安全（32% vs 71%）、抽象推理（46% vs 79%）和 PortBench（44% vs 78%）。数学能力则接近持平。

## API 定价与推理性能

DeepSeek 官方 API 定价（截至 2026 年 6 月）：

| 项目 | V4-Flash | V4-Pro | 比例 |
|---|---|---|---|
| 输入（缓存未命中）| $0.14 / 百万 token | $0.435 / 百万 token | 1:3.1 |
| 输入（缓存命中）| $0.0028 / 百万 token | $0.003625 / 百万 token | 1:1.3 |
| 输出 | $0.28 / 百万 token | $0.87 / 百万 token | 1:3.1 |
| 并发限制 | 2,500 请求 | 500 请求 | 5:1 |

缓存命中时享有约 50 倍的折扣（Flash: $0.0028 vs $0.14），要求至少 1,024 个匹配前缀 token 且逐字节完全匹配。

第三方 API 提供商的价格存在显著差异：CoreWeave 以 $0.01/百万 token 的统一价格提供 Flash，而 Makora 为 $0.15/百万 token，价格差距达 15 倍。

推理速度方面，Artificial Analysis 的第三方测试显示 V4-Flash 非推理模式输出速度因提供商而异：Makora 286.8 t/s，GMI 222.4 t/s，DeepSeek 官方 108.4 t/s，CoreWeave 62.0 t/s。速度差异高达 362%。在 2 张 NVIDIA RTX PRO 6000 Blackwell（96 GB 每张）自托管场景下，V4-Flash 使用 MTP + GPTQ 在 524K 上下文下达到 85.52 t/s。

## 部署生态与硬件

V4 系列支持主流推理框架：vLLM v0.20.0+（单节点与多节点）、SGLang（提供低延迟、均衡和高吞吐三种配置）、NVIDIA NIM 容器。自托管全精度 V4-Pro 通常需要 4 卡张量并行，NVIDIA B200（Blackwell）为目标平台。

社区量化方案丰富：官方 FP8（约 284 GB），官方 MXFP4（约 146 GB，仅限 B200），社区 INT4（约 156 GB，4 张 H100），社区 INT2 G64（约 75 GB，单张 96 GB 显存 GPU 可运行，0-shot MMLU 72.46%）。

V4-Flash 已针对主流 Agent 框架进行优化，包括 Claude Code、OpenClaw、OpenCode、CodeBuddy、NVIDIA NemoClaw 和 AI-Q Blueprint，原生支持函数调用、JSON 模式和结构化输出。

## 已知局限

V4 系列存在以下局限。在 AA-Omniscience 幻觉基准上达到 94% 的幻觉率（模型很少拒绝回答），表明事实可靠性仍有较大改进空间。仅支持文本输入，不支持多模态（视觉功能官方称为"进行中"）。在网络安全、抽象推理和部分软件工程任务上与前沿闭源模型存在明显差距。V4-Flash 在代理和工具使用等复杂多步任务上相比 Pro 有 4-11 个百分点的能力下降。两个模型目前均为"预览版"，定价和行为可能变动。Engram 条件记忆模块虽已发表独立论文，但未纳入 V4，预计将在 V5 中集成。

## 结论

DeepSeek-V4-Pro 和 DeepSeek-V4-Flash 共享同一套核心架构创新——混合注意力（CSA + HCA）、流形约束超连接（mHC）、Muon 优化器和 FP4 量化感知训练——两者的唯一区别在于规模。Pro 以 1.6 万亿总参数和 490 亿激活参数瞄准能力上限，可与前沿闭源模型竞争；Flash 以 2840 亿总参数和 130 亿激活参数优化速度和成本效率，在推理任务上接近 Pro 的表现。

在实践中，两者的主要能力差距体现在三个维度：复杂多步 Agent 任务（差距 4-11 个百分点）、事实知识回忆（差距 23.8 个百分点）和推理链路质量。在非推理模式下两者几乎无法区分。工业界推荐的部署策略是以 Flash 为默认模型处理大多数请求，仅在触发条件（工具调用失败、置信度不足、用户反馈错误）时升级至 Pro——这一策略使升级率保持在 5% 以下时说明 Flash 适配良好，若超过 30% 则应以 Pro 为基线。

V4 系列代表了开源模型在超长上下文效率方面的重要里程碑，将百万 token 推理的 FLOPs 和 KV 缓存压缩至上一代的十分之一量级，同时保持了与世界顶级闭源模型的竞争力。

## 参考文献

1. [DeepSeek-V4: Towards Highly Efficient Million-Token Context Intelligence (arXiv:2606.19348)](https://arxiv.org/abs/2606.19348)
2. [DeepSeek V4 Preview Release - Official API Docs](https://api-docs.deepseek.com/news/news260424)
3. [Models and Pricing - DeepSeek API Docs](https://api-docs.deepseek.com/quick_start/pricing)
4. [DeepSeek-V4-Pro on Hugging Face](https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro)
5. [DeepSeek-V4-Flash on Hugging Face](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash)
6. [DeepSeek V4 Pro: Model Overview, Features and Performance Guide (DeepInfra)](https://deepinfra.com/blog/deepseek-v4-pro-model-overview)
7. [Build with DeepSeek V4 Using NVIDIA Blackwell (NVIDIA Developer Blog)](https://developer.nvidia.com/blog/build-with-deepseek-v4-using-nvidia-blackwell-and-gpu-accelerated-endpoints/)
8. [DeepSeek V4 Pro vs Flash Comparison (WaveSpeed)](https://wavespeed.ai/blog/posts/deepseek-v4-pro-vs-flash/)
9. [DeepSeek V4 Flash Provider Benchmarks (Artificial Analysis)](https://artificialanalysis.ai/models/deepseek-v4-flash-non-reasoning/providers)
10. [CAISI Evaluation of DeepSeek V4 Pro (NIST)](https://www.nist.gov/news-events/news/2026/05/caisi-evaluation-deepseek-v4-pro)
11. [DeepSeek-V4 1.6T 架构解析与跨硬件平台推理性能分析 (AI4F 公众号)](https://weixin.sogou.com/weixin?type=2&query=DeepSeek-V4-Pro%20%E6%9E%B6%E6%9E%84)
12. [DeepSeek-V4-Pro on Ascend 910C (SLAI)](https://www.slai.edu.cn/zh-hans/article/495)
13. [DeepSeek V4 Technical Report Analysis (BAAI Hub)](https://hub.baai.ac.cn/view/54241)
14. [DeepSeek-V4 Deep Dive: Engineering Details (Alibaba Cloud Developer)](https://developer.aliyun.com/article/1731447)
15. [DeepSeek V4 Pro and Flash Launch (HPC-AI)](https://www.hpc-ai.com/blog/DeepSeek_V4_Pro_and_Flash)
16. [面向 DeepSeek-V4 的 FlashMemory：长上下文 KV Cache 如何压到约 1/10 (七牛云技术团队公众号)](https://weixin.sogou.com/weixin?type=2&query=DeepSeek-V4%20FlashMemory%20KV%20Cache)
17. [DeepSeek V4 旗舰大模型技术升级与能力解析 (曾老师讲透易经的智慧 公众号)](https://weixin.sogou.com/weixin?type=2&query=DeepSeek%20V4%20MoE)
18. [Kimi vs DeepSeek: 2026 国产双雄架构拆解 (旷野清欢 公众号)](https://weixin.sogou.com/weixin?type=2&query=DeepSeek-V4%201.6T%20%E6%9E%B6%E6%9E%84%E8%A7%A3%E6%9E%90)
19. [梁文锋署名论文：DeepSeek 首轮融资后大动作，生成速度大涨 85% (智东西 公众号)](https://weixin.sogou.com/weixin?type=2&query=DeepSeek-V4-Pro%20%E6%9E%B6%E6%9E%84)
20. [DeepSeek 混合专家系统详解 (绿树山庄 公众号)](https://weixin.sogou.com/weixin?type=2&query=DeepSeek-V4%201.6T%20%E6%9E%B6%E6%9E%84%E8%A7%A3%E6%9E%90)
21. [Deploy DeepSeek V4 Flash on NVIDIA GPUs (Vultr Docs)](https://docs.vultr.com/models/deepseek-v4/deepseek-v4-flash/nvidia)
22. [Hugging Face Transformers Docs: DeepSeek-V4](https://huggingface.co/docs/transformers/v5.10.2/model_doc/deepseek_v4)
