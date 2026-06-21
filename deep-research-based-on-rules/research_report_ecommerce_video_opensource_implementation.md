# 电商产品图转视频广告工具：开源实现方案深度研究报告

## 执行摘要

基于对 30 个以上开源视频生成模型和工具、8 个端到端开源管线项目、6 个 GPU 云平台的系统评估，本报告为独立开发者构建"电商产品图转视频广告工具"提供了一条完整且经济可行的开源实现路径。核心结论是：使用 MIT 或 Apache 2.0 许可的开源组件，可以在月度 GPU 成本低至 100 至 300 美元的情况下，构建一个从商品图到平台就绪视频广告的完整自动化流水线，单视频边际成本逼近零元。最关键的三个技术选型是：以 Wan2.2（Apache 2.0，阿里通义实验室）或 LTX-2.3（Apache 2.0，Lightricks）作为核心视频生成模型，以带货剪手（MIT）或 Pixelle-Video（Apache 2.0）作为管线基础代码，以 video-arrange（MIT）配合 Hyperframes（Apache 2.0）和 FFmpeg 作为视频组装工具链。本报告提供了完整的 9 阶段管线蓝图、逐阶段成本测算、以及面向中国开发者的国内部署与合规方案。

## 一、开源视频生成模型选型

### 1.1 模型能力对比

当前（2026 年 6 月）真正开源且适合商品视频生成的模型仅 4 个，其余标记为"开源"的模型实为闭源或仅提供 API。

| 模型 | 许可 | 最低 GPU | 5s 视频速度 | 画质 | 商品一致性 | 每视频 GPU 成本 |
|------|------|----------|------------|------|-----------|----------------|
| LTX-2.3 (Lightricks) | Apache 2.0 | RTX 4090 24GB | 1-2 分钟 | 7.5/10 | 较好 | ~$0.009 |
| Wan2.2 I2V 14B (阿里) | Apache 2.0 | RTX 4090 24GB (量化) | 3-4 分钟 | 8.5/10 | 最佳 | ~$0.004 |
| SkyReels-V3 (昆仑万维) | 自定义(需审查) | RTX 4090 24GB | 2-3 分钟 | 8/10 | 参考图一致性最佳 | ~$0.017 |
| Bernini (字节跳动) | Apache 2.0 | RTX 4090 24GB+ | 未充分验证 | 未知 | 统一编辑框架 | 待评估 |

LTX-2.3 是 2026 年 1 月发布的首个真正生产级音视频联合生成开源模型，原生 4K 输出、50fps、最长 20 秒，仅需 12 至 16GB 显存（NVFP8 量化后模型缩小约 30%），速度约为 Wan2.2 的 10 至 14 倍。其 Apache 2.0 许可对年收入低于 1000 万美元的商业使用完全免费。推荐的选型策略是两阶段路由：LTX-2.3 用于快速草稿和迭代（约每视频 0.009 美元），Wan2.2 用于最终高质量输出。

Wan2.2 于 2026 年 3 月被选为 MLPerf Inference v6.0 的文本到视频基准模型，采用 MoE 架构（约 27B 总参、约 14B 每推理步激活）。图像到视频（I2V）变体是在 RTX 4090 上原生运行的最佳画质模型。可通过阿里云 ModelScope（modelscope.cn）国内高速下载模型权重。

SkyReels-V3 于 2026 年 1 月开源，支持 1 至 4 张参考图引导视频生成，这与"上传商品图生成视频广告"的使用场景最为吻合。参考一致性评分 0.6698，视觉质量评分 0.8119，均超过同期商业模型。但其 skywork-license 需要法律审查才能确认商业使用条件。

需要特别注意的误导信息：Wan 2.5 和 Wan 2.6 不是开源的——它们是仅提供 API 的闭源模型。Seedance 2.0（字节跳动）、HappyHorse 1.0（阿里）、Kling 3.0（快手）均为闭源。CogVideoX（智谱）2026 年无更新。Stable Video Diffusion（Stability AI）已过时。

### 1.2 自托管经济模型

自托管在几乎所有规模上都比 API 调用便宜。以月生成 1 万个视频计算：

| 方案 | 月成本（仅视频生成） | 每视频成本 |
|------|-------------------|-----------|
| Veo 3.1 Lite API（5s, $0.05/s） | $2,500 | $0.25 |
| fal.ai Kling 3.0 API | $2,000 | $0.20 |
| 自托管 LTX-2.3（1x RTX 4090） | ~$85（GPU 毛成本） | $0.009 |
| 自托管 Wan2.2 I2V（1x RTX 4090 量化） | ~$40（GPU 毛成本） | $0.004 |
| 自托管 7x RTX 5090 家用集群 | ~$834/月全含 | ~$0.003 |

自托管 GPU 的启动方案：如果月生成量在 500 个视频以下，从 RunPod（RTX 4090 每小时 0.34 美元）或 AutoDL（RTX 4090 每小时约 1.5 至 2.6 元人民币）开始；如果月生成量超 500 个视频，评估购买自用 RTX 3090（约 700 美元二手价）或 RTX 4090 部署 LTX-2.3；如果目标服务国内用户，优先使用 AutoDL 或恒源云避免跨境延迟。

## 二、视频组装与后期制作工具链

### 2.1 推荐工具栈概览

| 环节 | 推荐工具 | 许可 | 每视频边际成本 |
|------|---------|------|--------------|
| 视频剪辑拼接 + 转场 | video-arrange | MIT | ~$0.0001 (CPU) |
| 富文本动画叠加 | Hyperframes | Apache 2.0 | ~$0.0005 (CPU) |
| 语音识别/字幕生成 | faster-whisper (int8) | MIT | ~$0.0002 (GPU 批处理) |
| TikTok 风格动态字幕 | pycaps (Python) 或 remotion-captioneer | MIT | ~$0.0001 (CPU) |
| 字幕烧录至视频 | FFmpeg ass filter | LGPL | ~$0.0001 (CPU) |
| 语音合成配音 | edge-tts (主) + Azure TTS (备) | MIT / 商用免费层 | ~$0 |
| 背景音乐 | Pixabay API (主) + MusicGen (备) | Pixabay 许可 / MIT | ~$0 |
| 品牌叠加层 | FFmpeg drawtext + overlay | LGPL | ~$0.0001 (CPU) |
| 多格式导出编码 | FFmpeg libx264 / libaom-av1 | LGPL | ~$0.0002 (CPU) |
| 总装配成本 | — | — | ~$0.001/视频 |

### 2.2 关键工具详解

video-arrange（MIT）采用声明式时间线 API，将所有操作编译为单次 FFmpeg filter_complex 调用，不在 Python 内存中拉取帧数据。渲染一个 2 分钟、4 个素材的项目约需 25 秒——这匹配了原生 FFmpeg 的墙钟时间。支持拼接、画中画、分屏、文字叠加和转场效果。

Hyperframes（Apache 2.0，HeyGen 开源，29200 颗星）是一个范式级工具——它渲染 HTML 加 CSS 加 JS 为确定性 MP4 视频。这意味着可以用纯前端代码定义复杂的文字动画（倒计时、促销闪动、品牌片头片尾），不依赖任何视频编辑框架。生成的叠加层动画再通过 FFmpeg overlay 滤镜合成到主视频。这对商品视频广告中的动态价格标签、折扣倒计时和文字动效特别适用。

faster-whisper（MIT）配合 int8 量化和批量处理达到约 48 倍实时速度，显存占用比 OpenAI Whisper 低约 38%。对 15 至 30 秒商品广告配音的语音识别在 GPU 批处理下约需 0.5 秒。需注意这是一个 CPU 密集型的语音识别引擎，在低功耗 CPU 上长音频性能会下降，但对电商视频场景完全够用。

edge-tts（MIT）是对接微软 Edge 免费 TTS API 的 Python 库，提供 400 种以上语音、50 种以上语言，零 API 密钥、零设置成本。质量约 6 分（10 分满分），语音自然可懂，对电商旁白完全可接受。它是推荐的首要配音方案。当需要更高质量时，Azure TTS 的免费层（每月 50 万字符免费——约 5 小时语音）覆盖约每月 1666 个 30 秒广告的配音需求。

### 2.3 许可证合规警戒点

预训练模型权重需特别注意。F5-TTS 的代码是 MIT，但预训练权重是 CC-BY-NC，禁止商业使用——要么在商业许可数据上重新训练，要么使用备选方案如 Fish Speech（Apache 2.0）或 Piper TTS（BSD）。ChatTTS 类似——代码 AGPLv3、权重 CC-BY-NC。MusicGen 的权重为 CC BY-NC 4.0，同样禁止商业使用，推荐使用 Pixabay API 获取商业许可音乐。

## 三、端到端开源管线项目

### 3.1 带货剪手（daihuo-jianshou）——最直接可用的基础代码

GitHub 95 颗星，MIT 许可，TypeScript（Next.js 16）。这是与商品图转视频需求最直接匹配的项目。其核心架构包括：Next.js 16 前端加 SQLite 加 Drizzle ORM、AI 提供商抽象层（聚合 5 个平台 20 种以上模型到统一接口）、FFmpeg 视频合成引擎、以及 5 个品类模板乘以 4 种风格的脚本生成系统。

最关键的技术资产是 AI 提供商抽象层——它将 fal.ai、火山引擎、阿里百炼、Atlas Cloud 和硅基流动 5 个不同 API 格式归一化为统一接口。用户可以为不同场景路由不同模型，例如商品特写走 Wanxiang 2.6 的 I2V 模型，背景场景走 Kling 3.0。

该项目的流水线是：用户上传商品图到素材库、AI 生成带货脚本（5 品类乘以 4 风格）、逐镜头素材生成（每镜头独立调用相应模型）、FFmpeg 视频合成（H.264 High Profile 编码加转场加 Ken Burns 运动效果加音频混音）、导出带平台 SEO 元数据的视频。

### 3.2 Pixelle-Video——模块化最佳选择

GitHub 约 22000 颗星，Apache 2.0 许可，Python（FastAPI 加 ComfyUI）。其核心设计理念是"原子化能力组合"——每个阶段独立可替换。四阶段架构为：LLM 生成分镜脚本、ComfyUI 生成视觉素材、TTS 语音合成、HTML 模板视频合成加 FFmpeg 最终组装。部署方式包括 Windows 一键启动、Docker Compose 和源码安装。全本地部署时每视频成本为零（仅电费），使用 Qwen API 加本地 ComfyUI 时每视频仅几分钱。

### 3.3 ClipForge (AGPL-3.0) 和 OpenShorts (MIT)

ClipForge 提供了一个独特的零 API 密钥回退路径——通过 Openverse（免密钥素材库）和 Microsoft Edge TTS 在不使用任何 AI API 的情况下生成基础商品展示视频，适合快速原型验证。但 AGPL-3.0 许可对 SaaS 产品有限制——要么保持独立服务并构建自有 API 层包裹它，要么从作者获取商业许可。

OpenShorts (MIT) 包含一个专门的 AI Shorts 管线，从网站 URL 开始，抓取商品信息、Gemini 生成脚本、FLUX 2 Pro 生成 AI 演员、Hailuo 2.3 生成说话头像、Kling Avatar 唇形同步、FFmpeg 组装，低成本版约 0.65 美元每视频。

### 3.4 生产级参考架构

AWS 加 Bark.com 的 7 阶段 SageMaker 管线是为数不多公开了完整架构细节的生产部署案例。使用 8x A100（ml.p4d.24xlarge）部署 Wan 2.1 T2V-14B、Amazon Bedrock（Claude Sonnet 3.7）处理全部 LLM 任务、AWS Step Functions 管理跨阶段工作流状态。一个 15 至 30 秒广告从输入到完成约需 12 至 15 分钟。

Genflow Ad Studio（ACM CAIS 2026 论文）展示了一个可量化的质量提升方案——对抗式多智能体质量控制回路。两个 VLM 评估器智能体（导演智能体和品牌安全智能体）对每帧进行审查并触发自动重新生成，将品牌合规率从 42% 提升至 89%。代价是延迟从 9.4 秒增加到 38.6 秒，每次运行成本从约 0.003 美元增加到约 0.044 美元。这对 B 端客户的品牌视频场景有参考价值，对中小卖家的批量场景可以标准化为模板降低质检成本。

## 四、GPU 部署与成本优化

### 4.1 GPU 云平台对比

| 平台 | RTX 4090 时价 | A100 80GB 时价 | 冷启动 | 适合场景 |
|------|-------------|---------------|--------|---------|
| RunPod | $0.34 | $1.39 | 200ms-12s (FlashBoot) | 国际用户、弹性伸缩 |
| Vast.ai | $0.20-0.31 | $0.73 | 视主机而定 | 最低价格（P2P 市场） |
| fal.ai | —（队列模式） | —（H100 $1.89） | 几秒 | 无需管理 GPU 的开发体验 |
| AutoDL | 1.5-2.6 CNY/hr | 18-25 CNY/hr | 视机型 | 国内用户首选 |
| 恒源云 | 1.3-2.6 CNY/hr | — | 视机型 | 国内最低消费者 GPU 价格 |
| 华为云 Ascend 910B | — | 2.1 CNY/hr | 较慢 | 国产芯片、合规最优 |

关键洞察：对于消费者 GPU（RTX 4090 或 3090），中国平台与 Vast.ai 价格相当（1.5 至 2.6 元比 1.4 至 2.2 元）。对于数据中心 GPU（A100 或 H100），美国平台显著更便宜（18 至 25 元比 5 至 10 元）。但如果终端用户在国内，国内部署的必要性压倒了 GPU 价格差异。

### 4.2 成本优化策略

多级模型路由是效果最显著的优化手段。预览和草稿使用最快的 LTX-2.3（约每视频 0.009 美元），最终交付使用最高画质的 Wan2.2（约每视频 0.004 美元——反而更便宜但更慢）。用户交互层面的草稿即时生成提升体验，后台的最终渲染异步完成。这同时优化了感知性能和实际成本。

视频缓存基于商品 ID 加模板 ID 加平台格式作为键。对于 1000 个 SKU 乘以 5 个模板的目录，80% 的缓存命中率能有效降低 80% 的 GPU 成本。视频文件在 Cloudflare R2 上的存储成本仅为每月每 GB 0.015 美元（出口免费），每个 10MB 视频存储一年仅需约 0.0018 美元。

异步队列处理使用 Inngest 生产级模式——用户提交请求即返回 jobId、提交至 fal.ai 队列（或自建队列）、通过 step.waitForEvent 在零计算成本下挂起等待 GPU 完成、Webhook 回调恢复执行、存储结果到 R2、更新数据库、通知用户。每一步独立可重试且可 memoize（如果 S3 上传步骤失败，fal.ai 推理步骤不会被重新触发）。对于视频生成这尤其关键——生成步骤是最贵的，它的重试保护直接转化为成本保护。

### 4.3 多 GPU 自托管参考

一位独立开发者公开了使用 7 张 RTX 5090（32GB 每张）在自家客厅搭建 GPU 集群的数据。一次性硬件成本约 23350 美元，每月电费约 302 美元（3kW 平均负载，0.14 美元每度），每月冷却费约 45 美元，4 年摊销后月均总成本约 834 美元。等效云成本（A100 按需）约为每月 17250 至 45120 美元。自托管比云端便宜 20 至 55 倍。这套配置每日可处理约 35000 张图片和约 4000 个视频，尚有 40% 至 50% 的算力余量。建议的起步策略是先租用云端 GPU 验证需求，月生成量稳定超过 500 个视频后再评估自购 GPU。

## 五、面向中国开发者的部署方案

### 5.1 合规要求

在中国运营 AI 视频生成 SaaS 需要完成四项核心合规要求：ICP 备案（1 至 2 周，全在线流程）；算法备案（3 至 6 个月，AI 视频生成属于深度合成算法，必须备案）；AI 内容标识（根据 2025 年 9 月《人工智能生成内容标识办法》，需双重标识——可见水印加不可见元数据）；以及大模型备案（仅在使用自训练或微调模型时需要，纯 API 调用他人模型仅需登记）。2026 年 4 至 8 月的"清朗"专项行动对 AI 生成内容的合规审查力度加强，建议在开发早期就内置合规能力而非事后补救。

### 5.2 国内技术栈推荐

前端和后端建议使用 Next.js 加腾讯 CloudBase 替代 Vercel 加 Supabase 的国际方案——CloudBase 支持 Next.js SSR 和 ISR，并内置微信登录、微信支付和支付宝集成。数据库可选择 CloudBase PostgreSQL 或自托管 Supabase 的开源版本。AI 模型权重通过 ModelScope（modelscope.cn）而非 Hugging Face 下载（Hugging Face 在国内被限速）。GPU 算力开发阶段使用 AutoDL 或恒源云，生产阶段使用阿里云 PAI-EAS（支持弹性伸缩和缩容至零）或华为云 ModelArts（昇腾 NPU 成本约为 NVIDIA GPU 的三分之一）。

### 5.3 上海临港 AI 算力补贴

2026 年上海临港新片区推出了针对"超级个体"的 AI 算力补贴政策——对 GPU 算力、数据集、模型 API 和 AI 工具链的综合成本提供最高 80% 的补贴，所有申请人可获 100 卡时免费算力，学生群体额外加 20%（上限每年 30 万元），向国际开源社区发布 AI 工具最高可获 100 万元奖励。对于一个每月 GPU 成本 3000 元的独立开发者产品，补贴后实际成本仅为 600 元。如果开发者有条件（团队 10 人以下、从事跨境数据、数字文创、直播营销、软件信息或智能网联汽车等领域），这是显著的成本优势。

### 5.4 支付方案

针对国内用户，微信支付加支付宝是必需的——Stripe 在中国大陆不可用。但两者的订阅自动扣款支持有限，推荐方案是：年度预付（国内独立 SaaS 最常见模式），或首次支付走钱包、续费走绑卡，或定期推送续费提醒。建议采用双通道架构：面向国际用户走 Stripe，面向国内用户走微信支付加支付宝。

## 六、MVP 实施路线图

### 第一阶段：基础搭建（第 1 至 2 周）

Fork 带货剪手（MIT 许可）作为基础代码，实现 Shopify API 对接加 CSV 上传的商品数据接入，实现基于 DeepSeek API 的脚本生成（约每脚本 0.00007 美元，是目前最具性价比的选择），实现 Cloudflare R2 存储。此阶段结束时，系统能接收商品数据并生成带货脚本，成本接近零。

### 第二阶段：视频组装（第 3 至 4 周）

实现 video-arrange 加 FFmpeg 视频组装管线，使用 ClipForge 的免费素材引擎（Pexels 和 Pixabay 免版税素材）作为 B-roll 来源，实现 edge-tts 语音合成，实现 faster-whisper 字幕生成。此阶段结束时，系统能在不使用任何付费 AI API 的情况下生成基础商品展示视频（商品图加文字叠加加语音配音加字幕），完全零 API 成本。

### 第三阶段：AI 视频片段（第 5 至 6 周）

接入 fal.ai API 调用 Kling 3.0 Pro 或 Wan2.2 I2V 进行图像到视频生成，实现商品图预处理（rembg 背景去除加 Pillow 格式转换），使用分级路由——免费素材作为 B-roll、付费 API 用于商品特写镜头。此阶段结束时，系统能生成专业质量的商品视频广告，API 费用约每视频 0.15 至 0.30 美元。

### 第四阶段：生产加固（第 7 至 8 周）

实现 Inngest 加 fal.ai 的异步队列生产模式（step-level memoization、每用户并发控制），添加 Webhook 视频完成通知，实现基于商品 ID 加模板的视频缓存（目标 80% 命中率），添加多平台导出配置（TikTok 9 比 16、Instagram 1 比 1、YouTube 16 比 9、小红书 3 比 4）。此阶段结束时，系统能每天可靠处理 100 个以上的视频。

### 第五阶段：质量与规模（第 3 个月起）

实现 Genflow 风格的质量控制回路（使用开源 VLM 如 Qwen2.5-VL 评估生成视频并触发自动重新生成），实现同一个产品的 A 或 B 多版本生成（不同开场、不同音乐、不同 CTA），实现离峰时段批量处理，评估自托管 GPU 经济性——如月生成量超过 500 个视频，购买二手 RTX 3090（约 700 美元加 5000 元人民币）用于 LTX-2.3 推理可有效降低长期成本。

## 七、关键决策记录与风险提示

技术上需要注意的几点。首先，Wan 2.5 和 Wan 2.6 不是开源的——这是最容易混淆的信息点，很多资料将它们与开源的 Wan2.2 相混淆。只有 Wan2.2 是真正的 Apache 2.0 开源模型。其次，F5-TTS 和 ChatTTS 的代码是开源的但预训练权重禁止商业使用——这是最常见的许可证陷阱。第三，AGPL-3.0 许可对 SaaS 产品有强烈的"传染性"——使用 ClipForge 代码时必须隔离服务或获取商业许可。

GPU 自托管的经济拐点约在月生成量 500 个视频时——低于此数量使用 API 更方便也更便宜（省去了运维 GPU 基础设施的时间成本），高于此数量应考虑购买自用 GPU。但自托管引入了运维负担（一位有经验的独立开发者报告每周需要 3 至 5 小时维护 7 张 GPU 的集群），这个时间成本也需要纳入考虑。

在商业上，API 依赖风险需要通过多模型抽象层来缓解——带货剪手的 AI 提供商抽象层是实现这一目标的现成参考架构。如果某个底层 API（如 fal.ai）涨价或某个模型（如 Kling）调整使用策略，只需要在抽象层更换路由配置，不影响产品体验。

## 八、结论

构建一款电商产品图转视频广告工具的开源实现路径不仅可行，而且在经济上极具吸引力。核心的四大组件——视频生成（Wan2.2 或 LTX-2.3）、管线编排（带货剪手或 Pixelle-Video）、视频组装（video-arrange 加 Hyperframes 加 FFmpeg）和音频制作（edge-tts 加 faster-whisper）——全部拥有商业友好的开源许可，且可以在一张 RTX 4090 消费级 GPU 上完整运行。

MVP 阶段（6 至 8 周）的总开发成本主要投入在管线集成和产品化上，月度 GPU 运营成本可在 100 至 300 美元的极低水平上起步。每个视频的边际生成成本约 0.001 至 0.01 美元（装配阶段）加上 0.004 至 0.25 美元（AI 视频生成阶段，取决于使用自托管还是 API）。对于一款定价每月 49 美元的 SaaS 产品，即使每个用户每月生成 200 个视频，毛利润空间仍然充裕。

对于中国独立开发者，额外建议优先利用国内开源生态（ModelScope 模型库、AutoDL 或恒源云 GPU 平台、带货剪手和 ClipForge 等中文项目）、尽早启动 ICP 备案和算法备案流程（需要 4 至 8 个月，是上市时间的关键路径）、以及探索上海临港 AI 算力补贴等政策（可降低高达 80% 的算力成本）。

## 参考资料

1. [Wan2.2 - Alibaba Tongyi Video Generation (Apache 2.0)](https://github.com/Wan-Video/Wan2.2)
2. [LTX-2.3 - Lightricks Open-Source Video Model (Apache 2.0)](https://github.com/Lightricks/LTX-Video)
3. [SkyReels-V3 - Kunlun Qianwei Multimodal Video Model](https://github.com/SkyworkAI/SkyReels-V3)
4. [Bernini - ByteDance Unified Video Generation Framework (Apache 2.0)](https://github.com/bytedance/Bernini)
5. [daihuo-jianshou (带货剪手) - E-commerce Video Generator (MIT)](https://github.com/witty-suckerpunch492/daihuo-jianshou)
6. [Pixelle-Video - AI Automated Short Video Engine (Apache 2.0)](https://github.com/AIDC-AI/Pixelle-Video)
7. [ClipForge - Open-Source Short-Form Video Generator (AGPL-3.0)](https://github.com/xixihhhh/clipforge)
8. [OpenShorts - Free Open Source AI Video Platform (MIT)](https://github.com/mutonby/openshorts)
9. [video-arrange - Declarative Timeline Video Editing (MIT)](https://pypi.org/project/video-arrange/)
10. [Hyperframes - HTML/CSS/JS to MP4 by HeyGen (Apache 2.0)](https://github.com/heygen-com/hyperframes)
11. [mcp-video - 119 FFmpeg Tools (Apache 2.0)](https://github.com/KyaniteLabs/mcp-video)
12. [faster-whisper - CTranslate2 ASR (MIT)](https://github.com/Purfview/faster-whisper)
13. [remotion-captioneer - TikTok Style Captions for Remotion (MIT)](https://www.npmjs.com/package/remotion-captioneer)
14. [pycaps - Python Animated Subtitle Tool (MIT)](https://github.com/francozanardi/pycaps)
15. [Inngest + fal.ai Production AI Video Generation Pipeline](https://inngest.vercel.app/blog/how-to-build-a-production-ai-image-generation-pipeline-with-fal-ai-and-inngest)
16. [Genflow Ad Studio - Compound AI Architecture (arXiv 2605.16748)](https://export.arxiv.org/abs/2605.16748)
17. [Bark.com + AWS Scalable Video Generation Solution](https://aihub.hkuspace.hku.hk/2026/03/18/how-bark-com-and-aws-collaborated-to-build-a-scalable-video-generation-solution/)
18. [Self-Hosted AI: 7 RTX 5090s Instead of AWS - Cost Analysis](https://dev.to/zsky/self-hosted-ai-i-bought-7-rtx-5090s-instead-of-renting-from-aws-heres-the-math-53pd)
19. [AutoDL GPU Cloud Platform](https://www.autodl.com/home)
20. [2026 Domestic GPU Cloud Platform Pricing Comparison](https://post.smzdm.com/p/arz4lvrg/)
21. [Shanghai Lingang AI Compute Subsidy Policy 2026](https://finance.eastmoney.com/a/202606023757517912.html)
22. [AI-Generated Content Labeling Regulations China 2025-2026](https://hankunlaw.com/portal/article/index/cid/8/id/16455.html)
23. [Alibaba Cloud PAI-EAS Billing](https://www.alibabacloud.com/help/zh/pai/product-overview/billing-of-eas)
24. [RunPod vs Vast.ai GPU Price Comparison 2026](https://computeprices.com/compare/runpod-vs-vast)
25. [The Real Cost of AI Video Generation - Complete Breakdown](https://dev.to/sitra_cressman_c8304a5e4e/the-real-cost-of-ai-video-generation-a-breakdown-54b1)
26. [Chinese AI Video Generation Models Technical Analysis 2026](https://36kr.com/p/3726499682646400)
27. [WeChat AI Ecosystem Opening for Mini Programs June 2026](https://www.36kr.com/p/3845617217505539)
28. [Video Generation API Cost Comparison 2026 - WaveSpeed](https://wavespeed.ai/blog/posts/best-ai-video-generator-2026)
