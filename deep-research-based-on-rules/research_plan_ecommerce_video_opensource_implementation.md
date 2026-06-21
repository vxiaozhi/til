# Research Plan: Open-Source Implementation for E-commerce Product-to-Video-Ad Tool

## Query Type: Depth-First (Technical Deep Dive)

Deep technical research into open-source tools, models, and pipelines that can be assembled to build the product-to-video-ad SaaS without heavy API dependency.

## Research Objectives

Identify every viable open-source component (models, libraries, frameworks, end-to-end pipelines) that a solo developer can use to build the e-commerce product image to short video ad generator. Focus on: licensing (must be commercial-friendly), self-hosting cost, integration complexity, output quality.

## Subagents (4 parallel)

### Agent 1: Open-Source Video Generation Models Deep Dive
- All open-source image-to-video and text-to-video models with commercial-friendly licenses
- WAN 2.5/2.6, LTX 2.0/2.3, Bernini, SkyReels-V3, Hunyuan Video, MOVA, Stable Video Diffusion, etc.
- Compare: quality, speed, GPU requirements, license, GitHub stats, community activity
- Self-hosting cost calculation on RunPod/Vast.ai/own hardware

### Agent 2: Video Editing/Assembly & Pipeline Tools
- FFmpeg-based video compositing tools (video-arrange, mcp-video, etc.)
- Programmatic video editing frameworks (Remotion, editly, etc.)
- Subtitle/caption generation tools (open-source ASR + subtitle rendering)
- TTS/voiceover open-source options (Coqui TTS, Piper, edge-tts, etc.)
- Music/sound effects (royalty-free + generated)

### Agent 3: End-to-End Open-Source Pipelines & GitHub Projects
- ClipForge, 带货剪手, VidMuse, and similar projects on GitHub
- Multi-model aggregation architectures
- Complete pipeline blueprints: input → script → keyframes → video → subtitles → output
- Real-world self-hosting cost case studies

### Agent 4: Chinese Open-Source Ecosystem & WeChat Search
- Use wechat-article-search for Chinese open-source AI video tools
- Chinese GPU cloud pricing (阿里云, 火山引擎, etc.)
- Chinese open-source community projects and their commercial viability
