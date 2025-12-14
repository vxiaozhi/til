# Cloudflare Workers

主页： https://workers.cloudflare.com/

## 核心技术

workerd 是 Cloudflare 的开源 JavaScript/Wasm 服务器运行时，为 Cloudflare Workers 提供支持。这个强大的运行时使你能够使用与全球规模部署相同的技术来构建、测试和部署无服务器应用程序。

workerd（发音为 "worker-dee"）是基于 V8 的独立 JavaScript 和 WebAssembly 运行时，提供与 Cloudflare Workers 相同的执行环境。它设计用于多种使用场景：

- 应用服务器：自托管为 Cloudflare Workers 设计的应用程序
- 开发工具：本地开发和测试 Workers 代码
- 可编程代理：高效拦截、修改和路由网络请求

开源代码：

- [workerd, Cloudflare's JavaScript/Wasm Runtime](https://github.com/cloudflare/workerd)
- [Cloudflare Workers SDK](https://github.com/cloudflare/workers-sdk)


## Web框架

Cloudflare workers 原生支持的 web 框架：

- [astro](https://github.com/withastro/astro) The web framework for content-driven websites. 
- [remix-run/remix](https://github.com/remix-run/remix) Remix 包在 Node.js、Bun、Deno、Cloudflare Workers 及其他环境中均能无缝运行。
- [remix-run/react-router](https://github.com/remix-run/react-router) React声明式路由
