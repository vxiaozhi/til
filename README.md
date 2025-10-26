# til
📝 Today I Learned

建立本仓库动机参考了： [jbranchaud/til](https://github.com/jbranchaud/til)

## 目录

## 设计模式

**架构模式——黑板模式**

参考：[架构模式——黑板模式（Blackboard）](https://github.com/luoway/blog/issues/24)

黑板架构背后的理念是：一系列独立的程序携手合作，致力于处理同一个数据结构。每个程序善于解决整项任务的某一部分；所有程序合作致力于找到解决之道。系统前进的方向主要取决于当前的进展状态。一个中央控制组件负责评估当前状态并协调各个专业程序。

之所以命名“黑板”，是因为它让人想起专家们站在黑板前协作解决问题的情形。每位专家都独立地对当前状态做出评估，随时可能到黑板前添加、修改或删除信息。专家们通常自行决定接下来由谁来到黑板前，在黑板模式中，如果有多个程序都能提供帮助，将由调停者（moderator）组件决定这些程序的执行顺序。

## 建站
- NGINX 原生 ACME 支持啦， NGINX 官方发布 ngx_http_acme_module 模块。 参考：[NGINX 原生 ACME 支持：从根本上重塑 TLS 自动化部署](https://sconts.com/post/nginx-native-acme-support/) 

## 开发者

**支付**

- [apple-refund-assistant](https://github.com/seth-shi/apple-refund-assistant) 一个开源的 Web 应用，用于即时处理苹果回传的消费数据，帮助开发者防范欺诈退款。

**登录**

- [casdoor]()
- [草梅 Auth](https://github.com/CaoMeiYouRen/caomei-auth) 基于 Nuxt 框架的登录平台，支持 OAuth2.0 协议，有邮箱、用户名、手机、验证码、社交媒体等多种登录方式。

## AI网关

- [AxonHub](https://github.com/looplj/axonhub) 开源的 AI 网关应用，为不同的 AI 模型提供统一的 API 兼容层，配备 Web 控制面板。

## 开源项目

### 开源复刻
- [Clone-Wars](https://github.com/GorvGoyl/Clone-Wars) 这个仓库收集了各种流行网站（Airbnb, Amazon, Instagram, Netflix, TikTok 等）、流行软件（2048，MsPaint, Mac Finder等）的开源克隆，已经超过100多个网站了。

### 英语学习
- [NCE Flow](https://github.com/luzhenhua/NCE-Flow) 《新概念英语》点读，可以选择任一句开始播放，也可以自动朗读。
- [Type Words](https://github.com/zyronon/TypeWords) 开源的 Web 应用，通过打字学习英语单词，加深记忆，有发音和例句，内置多个常用词库
- [binglish：AI 桌面英语](https://github.com/klemperer/binglish) 一个 Python 脚本，自动为 Windows 更换必应 Bing 每日壁纸，并在壁纸上添加“每日单词”，AI 生成单词解释和例句。
    
### 语音ASR
- [Handy](https://github.com/cjpais/Handy) 开源的跨平台桌面应用，用来语音转文本, Rust + ts 实现。支持 ParakeetV3、Whisper 系列模型进行语音识别，但对中文的识别效果较差。
- [FlyCut Caption - 智能视频字幕裁剪工具](https://github.com/x007xyz/flycut-caption) 一个基于 Web 的 AI 视频字幕编辑工具，可以视频语音自动转文本，生成字幕

### 语音 TTS
- [index-tts-lora](https://github.com/asr-pub/index-tts-lora) 网友基于 B 站开源的 Index-TTS 语音合成模型的微调模型，提升语音的韵律感和自然度。
  
## ASR模型
- [Wisper](https://github.com/openai/whisper) OpenAI开源的语音识别模型， 默认对中文的效果较差，这里有改进介绍：[Whisper对于中文语音识别与转写中文文本优化的实践(Python3.10)](https://www.cnblogs.com/v3ucn/p/17987069)
- [Whisper-Finetune](https://github.com/shuaijiang/Whisper-Finetune) 微调Whisper语音识别模型
- [FunASR](https://github.com/modelscope/FunASR) FunASR是一个基础语音识别工具包，提供多种功能，包括语音识别（ASR）、语音端点检测（VAD）、标点恢复、语言模型、说话人验证、说话人分离和多人对话语音识别等。
