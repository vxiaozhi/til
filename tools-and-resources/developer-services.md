# 独立开发者服务

## 支付

- [apple-refund-assistant](https://github.com/seth-shi/apple-refund-assistant) 一个开源的 Web 应用，用于即时处理苹果回传的消费数据，帮助开发者防范欺诈退款。

### stripe

- [stripe-mock](https://github.com/stripe/stripe-mock) stripe-mock是一款模拟HTTP服务器，其响应方式与真实的Stripe API一致。它可用于替代Stripe的测试模式，从而让集成Stripe的测试套件运行更快速、稳定性更高。
- [stripe-ruby-mock](https://github.com/stripe-ruby-mock/stripe-ruby-mock) Stripe Ruby Mock 是一个功能强大的测试库，旨在帮助 Ruby 开发者在无需实际调用 Stripe 服务器 API 的情况下测试其 Stripe 集成。该库会拦截官方 Stripe Ruby gem 发出的请求并返回模拟响应，从而实现对支付处理逻辑的快速、可靠且离线的测试。 该库的核心原理是重写stripe-ruby的请求方法，跳过所有实际HTTP调用并直接返回测试数据。这使您能够在不实际连接Stripe服务器的情况下编写和运行测试。
- [stripe-go](https://github.com/stripe/stripe-go) Go library for the Stripe API.

## 登录

- [casdoor]()
- [草梅 Auth](https://github.com/CaoMeiYouRen/caomei-auth) 基于 Nuxt 框架的登录平台，支持 OAuth2.0 协议，有邮箱、用户名、手机、验证码、社交媒体等多种登录方式。

## AI网关

- [AxonHub](https://github.com/looplj/axonhub) 开源的 AI 网关应用，为不同的 AI 模型提供统一的 API 兼容层，配备 Web 控制面板。

## AI编程
- [Open Lovable](https://github.com/firecrawl/open-lovable) 一个开源的前端应用，使用自然语言生成网站 UI，类似于 V0/Lovable。
- [coro-code](https://github.com/Blushyes/coro-code) Rust 实现的基于终端的 AI 编码代理，Claude Code 的开源替代品。

## 建站

- NGINX 原生 ACME 支持啦， NGINX 官方发布 ngx_http_acme_module 模块。 参考：[NGINX 原生 ACME 支持：从根本上重塑 TLS 自动化部署](https://sconts.com/post/nginx-native-acme-support/)
- [traefik](https://github.com/traefik/traefik) 云原生应用代理 。核心特性：  
  1. 持续更新配置（无需重启！）  
  2. 支持多种负载均衡算法  
  3. 利用Let's Encrypt为微服务提供HTTPS（支持通配符证书）  
  4. 断路器、重试机制  
  5. 通过简洁的Web界面体验其魔力  
  6. 支持WebSocket、HTTP/2、gRPC就绪状态监控  
  7. 开放Rest API接口   
  8. 采用Go语言精心编译为单文件可执行程序，并提供官方Docker镜像
- [Shipany.ai]() 
- [nexty.dev](https://nexty.dev/zh/docs) 与 shipany 相比，不支持 cloudflare workers 部署 [nexty.dev克隆版代码参考](https://github.com/leoleoaabbcc/nexty.dev-template)


## 全栈框架

- [remix]()

## Remix 打包成 Android & iOS 方案

| 方案 | 代码复用率 | 商店上架 | 原生功能 | 开发复杂度 | 适合场景 |
|------|-----------|---------|---------|-----------|---------|
| **PWA** | 100% | ❌ 不能 | 有限 | 低 | 内容型应用，内部工具 |
| **Capacitor** | 100% | ✅ 可以 | 中等 | 中 | 需要商店上架的中等复杂度应用 |
| **React Native** | 30-50% | ✅ 可以 | 完整 | 高 | 对性能/原生功能要求高的应用 |
| **Tauri 移动端** | 100% | ❌ 实验性 | 有限 | 中 | 技术尝鲜，非生产项目 |

## 部署

### 商业

- Vercel
- [Cloudflare Workers](https://workers.cloudflare.com/)

### 开源

- [Dokploy](https://github.com/dokploy/dokploy) Vercel、Netlify和Heroku的开源替代方案。

### [OpenNext](https://github.com/opennextjs)

OpenNext Next.js与Remix、Astro等其他现代前端框架不同，它不具备跨平台自托管的能力。虽然可以将其作为Node.js应用程序运行，但这与在Vercel上的运行方式存在差异。多年来业界曾多次尝试解决这一问题，主要分为两类方案：开源框架的特定实现或闭源产品的定制化方案。由于Next.js持续更新迭代，这些分散的方案往往难以独立维护。OpenNext正是为了整合各方努力而发起的倡议项目。

## 开源网站监控

- [openpanel](https://github.com/Openpanel-dev/openpanel) Openpanel是一款开源网页与产品分析平台，它融合了Mixpanel的强大功能、Plausible的易用性，堪称谷歌分析的最佳替代方案之一。
- [Plausible](https://github.com/plausible/analytics) 简单、开源、轻量且注重隐私的网站分析工具，是谷歌分析的替代选择。

## 值得参考的开源项目

- [banana-prompt-quicker](https://github.com/glidea/banana-prompt-quicker) 一个开源的浏览器插件，收集 Nano Banana 模型的热门提示词，方便复用
- [CattoPic](https://github.com/Yuri-NagaSaki/CattoPic) 开源图床，支持直接部署 cloudflare worker。
- [](https://github.com/antvis/Infographic) AntV Infographic 是 AntV 推出的新一代声明式信息图可视化引擎，通过精心设计的信息图语法，能够快速、灵活地渲染出高质量的信息图，让信息表达更高效，让数据叙事更简单。可以参考来实现 visword.com 网站
