# 阿里巴巴 Agent 生态系统

- [阿里巴巴发布的 AI 原生应用架构白皮书](https://developer.aliyun.com/ebook/8479)
- [这篇官方博客是对《AI 原生应用架构白皮书》 内容的简要说明](https://sca.aliyun.com/en/blog/sca-gvr7dx_awbbpb_ksx4ge93i5zcflry/)
- [Development Trends and Architecture Evolution of AI Agents](https://www.alibabacloud.com/blog/development-trends-and-architecture-evolution-of-ai-agents_602529)
- [Development Trends and Architecture Evolution of AI Agents - 中文翻译](https://www.cnblogs.com/alisystemsoftware/p/19061466) AI Agent 发展趋势与架构演进 


## Higress

- [Higress Demo体验](https://demo.higress.io/route)
- [Higress 文档及博客仓库 higress-group.github.io](https://github.com/higress-group/higress-group.github.io)
- [vxiaozhi - AI网关-Higress简介](https://github.com/vxiaozhi/vxiaozhi.github.io/blob/main/docs/_posts/zh/gateway/2025-03-23-ai-gateway-higress-intro.md)
- [Dify 性能瓶颈？Higress AI 网关为它注入「高可用之魂」！](https://www.cnblogs.com/alisystemsoftware/p/19057287)
- [Higress Plugin Server](https://github.com/higress-group/plugin-server) http server for higress wasmplugin

### Higress 对 MCP 的支持

- [MCP Server 插件配置](https://higress.cn/ai/mcp-server/?spm=36971b57.21353015.0.0.58687095MCpdmO)
- [Higress 开源 Remote MCP Server 托管方案，并将上线 MCP 市场](https://www.cnblogs.com/alisystemsoftware/p/18804540)

## NaCos

- [nacos](https://github.com/alibaba/nacos)
- [手把手带你玩转基于 Nacos + Higress 的 MCP 开发新范式](https://higress.cn/blog/higress-gvr7dx_awbbpb_lup4w7e1cv6wktac/?source=blog)
- [nacos-mcp-router](https://github.com/nacos-group/nacos-mcp-router)  一个提供MCP Server推荐、分发、安装及代理功能的MCP Server.
- [mcp.nacos.io/](https://mcp.nacos.io/) 这里提供将 MCP Stdio 模式转换成 Streamable 或 SSE 协议 , 主要是 通过 nacos-mcp-router 这个项目实现的。
- [Dify 发现 Nacos MCP 服务](https://nacos.io/docs/latest/manual/user/ai/dify-nacos-mcp/?spm=5238cd80.6a0fa1b0.0.0.ad975508Qnmeps)

部署：

- [nacos-docker 部署](https://github.com/nacos-group/nacos-docker)
- [nacos-k8s 部署](https://github.com/nacos-group/nacos-k8s)


K8s 部署时，需编辑/deploy/nacos/nacos-quick-start.yaml文件，添加如下3个环境变量：

```
NACOS_AUTH_TOKEN: Nacos 用于生成JWT Token的密钥，使用长度大于32字符的字符串，再经过Base64编码。
NACOS_AUTH_IDENTITY_KEY: Nacos Server端之间 Inner API的身份标识的Key，必填。
NACOS_AUTH_IDENTITY_VALUE: Nacos Server端之间 Inner API的身份标识的Value，必填。
```
参考：[Nacos Kubernetes 快速开始](https://nacos.io/docs/latest/quickstart/quick-start-kubernetes/?spm=5238cd80.674e7612.0.0.228c3b83sskXyj)

控制台体验地址：

- https://console.nacos.io/
- 默认用户名密码为： nacos/nacos@demo。

## HiMarket

HiMarket 是一个开箱即用的 AI 开放平台解决方案，可以用于构建企业级的 AI 能力市场与开发者生态中心。

它由三大核心组件构成，完美匹配企业内不同角色的需求：

- AI 开放平台管理后台 (for 管理员/运营)：在这里将底层的模型服务、MCP Server、Agent 等多样化的 AI 能力，以 API 的形式轻松打包成标准化的“AI 产品”，并配上完善的文档、示例，最终一键发布到门户。
- AI 开放平台门户 (for 开发者/企业内部用户)：门户是面向内外开发者的“店面”。开发者可以在此完成开发者注册、创建消费者、获取凭证、浏览和订阅 AI 产品、在线测试，并清晰地监控自己的调用状态和成本。
- AI 网关：作为 Higress 社区的子项目，Higress AI 网关承载所有 AI 调用的认证、安全、流控、协议转换以及可观测性等能力。

详细介绍：[HiMarket 正式开源，为企业落地开箱即用的 AI 开放平台](https://higress.cn/blog/higress-gvr7dx_awbbpb_qp271vn6iw24huxv/?source=blog)

代码仓库：

- [HiMarket](https://github.com/higress-group/himarket)  HiMarket 是一个开箱即用的 AI 开放平台解决方案，可以用于构建企业级的 AI 能力市场与开发者生态中心。
- [HiMarket 市场官网](https://mcp.higress.ai/) 这里收集了众多开源 mcp server

## Agent 
- [Spring AI Alibaba](https://github.com/alibaba/spring-ai-alibaba) 阿里开源 java 版本 Agent 框架

## 可观测：

- [loongsuite-python-agent](https://github.com/alibaba/loongsuite-python-agent) LoongSuite ，会针对更多的主流的开源框架，比如说 Python 的一些框架提供完善的支持。最近在做 Dify 的可观测性的支持，很快就会发布。
- [loongsuite-go-agent](https://github.com/alibaba/loongsuite-go-agent)

## 相关博文

- [MCP Registry 官方发布：Nacos 原生支持，借助 HiMarket 构建企业级私有 MCP 市场 ](https://www.cnblogs.com/alisystemsoftware/p/19107143)
