# JS/TS


## JS 引擎

- [v8]()
- [JavaScriptCore]()
- [Hermes]()
- [QuickJS]()

## JS 后端运行时

- [nodejs](https://github.com/nodejs/node) 基于 V8 引擎
- [Bun](https://github.com/oven-sh/bun)  Zig 语言开发，Incredibly fast JavaScript runtime, bundler, test runner, and package manager – all in one 。已被 Anstropic 收购。基于JavaScriptCore
- [deno](https://github.com/denoland/deno) Rust开发的适用于JavaScript和TypeScript的现代运行时。基于 V8 引擎
- [workerd, Cloudflare's JavaScript/Wasm Runtime](https://github.com/cloudflare/workerd) 基于 V8 引擎
- [fibjs](https://github.com/fibjs/fibjs) JavaScript on Fiber（基于Chrome的V8 JavaScript引擎构建）

## Node多版本管理

以下是 Node.js 多版本管理工具的详细对比：

| 工具 | 跨平台 | 安装方式 | 切换速度 | 生态兼容性 | 推荐场景 |
|------|--------|----------|----------|------------|----------|
| **nvm** (Mac/Linux) | ❌ Unix系 | 脚本安装 | 快 | 优秀 | Unix/Linux/Mac |
| **nvm-windows** | ❌ Windows | 安装包 | 中等 | 良好 | Windows专用 |
| **fnm** (Fast Node Manager) | ✅ 全平台 | 脚本/包管理 | 极快 | 优秀 | 全平台，追求速度 |
| **n** | ❌ Unix系 | npm安装 | 快 | 良好 | 简单易用 |
| **volta** | ✅ 全平台 | 脚本安装 | 快 | 优秀 | 项目级锁定，现代工具 |
| **asdf** | ✅ 全平台 | 脚本安装 | 中等 | 优秀 | 多语言版本管理 |


## 全栈框架

- [astro](https://github.com/withastro/astro) The web framework for content-driven websites. 
- [remix-run/remix](https://github.com/remix-run/remix) Remix 包在 Node.js、Bun、Deno、Cloudflare Workers 及其他环境中均能无缝运行。
- [remix-run/react-router](https://github.com/remix-run/react-router) React声明式路由
- [TanStack/router](https://github.com/TanStack/router) 以客户为先、具备服务器能力，完全类型安全的网络路由器和全栈框架（支持React等）。

## Web框架

- [honojs/hono](https://github.com/honojs/hono) Hono - 在日语中意为火焰🔥 - 是一个基于Web标准构建的小巧、简洁且极速的Web框架。它可在任何JavaScript运行时上运行：包括Cloudflare Workers、Fastly Compute、Deno、Bun、Vercel、AWS Lambda、Lambda@Edge以及Node.js。
