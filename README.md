# til
📝 Today I Learned

建立本仓库动机参考了： [jbranchaud/til](https://github.com/jbranchaud/til)

## 目录

## 设计模式

**架构模式——黑板模式**

参考：[架构模式——黑板模式（Blackboard）](https://github.com/luoway/blog/issues/24)

黑板架构背后的理念是：一系列独立的程序携手合作，致力于处理同一个数据结构。每个程序善于解决整项任务的某一部分；所有程序合作致力于找到解决之道。系统前进的方向主要取决于当前的进展状态。一个中央控制组件负责评估当前状态并协调各个专业程序。

之所以命名“黑板”，是因为它让人想起专家们站在黑板前协作解决问题的情形。每位专家都独立地对当前状态做出评估，随时可能到黑板前添加、修改或删除信息。专家们通常自行决定接下来由谁来到黑板前，在黑板模式中，如果有多个程序都能提供帮助，将由调停者（moderator）组件决定这些程序的执行顺序。

## 开源项目

### 开源复刻
- [Clone-Wars](https://github.com/GorvGoyl/Clone-Wars) 这个仓库收集了各种流行网站（Airbnb, Amazon, Instagram, Netflix, TikTok 等）、流行软件（2048，MsPaint, Mac Finder等）的开源克隆，已经超过100多个网站了。
  
### 语音ASR
- [Handy](https://github.com/cjpais/Handy) 开源的跨平台桌面应用，用来语音转文本, Rust + ts 实现。支持 ParakeetV3、Whisper 系列模型进行语音识别，但对中文的识别效果较差。

## ASR模型
- [Wisper](https://github.com/openai/whisper) OpenAI开源的语音识别模型， 默认对中文的效果较差，这里有改进介绍：[Whisper对于中文语音识别与转写中文文本优化的实践(Python3.10)](https://www.cnblogs.com/v3ucn/p/17987069)
- [Whisper-Finetune](https://github.com/shuaijiang/Whisper-Finetune) 微调Whisper语音识别模型
- [FunASR](https://github.com/modelscope/FunASR) FunASR是一个基础语音识别工具包，提供多种功能，包括语音识别（ASR）、语音端点检测（VAD）、标点恢复、语言模型、说话人验证、说话人分离和多人对话语音识别等。
