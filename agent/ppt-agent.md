# PPT Agent

- [这篇文档用时序图说明了 skill PPT 实现原理](https://mp.weixin.qq.com/s/KZOATWKPzvGDDelsavOl4Q)

## PPT Agent 开源方案

### 1. PPTAGent
- [PPTAgent](https://github.com/icip-cas/PPTAgent) PPTAgent 是由中国科学院软件研究所的中文信息处理实验室（ICIP-CAS）研发的 AI 驱动系统，通过精密的两阶段工作流，能够自动从文档生成专业演示文稿。该系统受人类演示文稿创作方法启发，结合先进的语言模型与视觉处理技术，提供超越简单文本到幻灯片转换的高质量、内容丰富的幻灯片。
- [TrainPPTAgent](https://github.com/johnson7788/TrainPPTAgent) TrainPPTAgent 是一款基于 AI 的智能演示文稿生成工具。用户只需输入主题，系统即可自动通过微信搜索网络内容，生成结构完整、内容丰富的 PPT 大纲与逐页内容。项目采用 前后端分离架构：前端负责交互、大纲编辑与模板选择，后端则借助大语言模型（LLM）与强化学习（GRPO）完成内容生成与优化，使生成的 PPT 更贴合用户目标。

### 2. Claude skills

- [document skills - pptx]()
  
## AI PPT 产品

- [z.ai/](https://chat.z.ai/) 基于 GLM 模型
- [KIMI PPT](https://www.kimi.com/slides)
- [Gemini PPT](https://gemini.google.com/app)  Canvas 模式下，指令包含：生成 PPT
- [智谱清言 PPT 模式](https://chatglm.cn/main/alltoolsdetail?lang=zh)

试用体验：

- [Gemini](https://gemini.google.com/share/a43cc1b0f674) 生成最快
- [z.ai](https://chat.z.ai/c/3a97d9f8-0934-4129-b58b-98412521a272) 速度慢
- [kimi](https://www.kimi.com/chat/d4l7rfhb9p5ah4gsn9o0) 效果一般
- [智谱清言](https://chatglm.cn/main/alltoolsdetail?lang=zh&cid=692a7d06774fa0827bd9d7f5) 效果炸裂，完全遵从了我发送的 outline 结构。而且生成的结果提供 html 源码，支持下载 pdf、pptx 格式。

## 提示词案例

App原型设计
```
我想开发一个酷炫的音乐APP，现在需要采用 skill 输出高保真的原型图，最终需要 PPT 保留，请通过以下方式帮我完成所有界面的原型设计，并确保这些原型界面可以直接用于开发：
1、用户体验分析：先分析这个 App 的主要功能和用户需求，确定核心交互逻辑。
2、产品界面规划：作为产品经理，定义关键界面，确保信息架构合理。
3、高保真 UI 设计：作为 UI 设计师，设计贴近真实 iOS/Android 设计规范的界面，使用现代化的 UI 元素，使其具有良好的视觉体验。
4、HTML 原型实现：使用 HTML + Tailwind CSS（或 Bootstrap）生成所有原型界面，并使用 FontAwesome（或其他开源 UI 组件）让界面更加精美、接近真实的 App 设计。拆分代码文件，保持结构清晰：
5、每个界面应作为独立的 HTML 文件存放，例如 home.html、profile.html、settings.html 等。
index.html 作为主入口，不直接写入所有界面的 HTML 代码，而是使用 iframe 的方式嵌入这些 HTML 片段，并将所有页面直接平铺展示在 index 页面中，而不是跳转链接。
真实感增强：
界面尺寸应模拟 iPhone 16 Pro，并让界面圆角化，使其更像真实的手机界面。
使用真实的 UI 图片，而非占位符图片（可从 Unsplash、Pexels、Apple 官方 UI 资源中选择）。
添加顶部状态栏（模拟 iOS 状态栏），并包含 App 导航栏（类似 iOS 底部 Tab Bar）。
请按照以上要求生成完整的 HTML 代码，并确保其可用于实际开发。
```

## AI生成的 PPT 大纲示例

- [Higress 云原生 API 网关 PPT 大纲](../ppt-outline/higress-ai-native-gateway.md)
