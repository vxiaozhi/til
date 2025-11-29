# Higress 云原生 API 网关 PPT 大纲

## 第一部分：产品概览

### 1. Higress 简介
- **什么是 Higress**
  - 云原生 API 网关
  - 基于 Istio 和 Envoy 内核
  - 支持 Go/Rust/JS 编写 Wasm 插件
  - 提供开箱即用的控制台

- **发展历程**
  - 阿里巴巴内部孵化
  - 解决 Tengine reload 对长连接业务的损耗问题
  - 解决 gRPC/Dubbo 负载均衡能力不足
  - 已服务通义千问、百炼大模型、零一万物等 AI 业务

### 2. AI 网关新时代
- **AI Gateway = AI Native API Gateway**
  - AI 是一等公民
  - API 研发、供应、消费全面支持 AI 场景
  - 统一协议对接国内外所有 LLM 模型厂商
  - AI 可观测、多模型负载均衡、AI token 流控、AI 缓存

### 3. 核心优势
- **生产等级**
  - 支持每秒数十万级请求
  - 配置变更毫秒级生效，无流量抖动
  - 彻底摆脱 Nginx reload 问题
  
- **便于扩展**
  - 丰富的官方插件库
  - Wasm 插件扩展，沙箱隔离
  - 支持多种编程语言
  - 插件版本独立升级
  
- **安全易用**
  - 基于 Ingress API 和 Gateway API 标准
  - WAF 防护、IP/Cookie CC 防护
  - 支持 Let's Encrypt 自动签发证书
  - 脱离 K8s 部署，一行 Docker 命令启动
  
- **流式处理**
  - 真正的完全流式处理
  - 支持 SSE（Server-Sent Events）
  - 显著降低内存开销

## 第二部分：使用场景

### 4. AI 网关场景
- 统一协议对接所有 LLM 模型
- AI 可观测能力
- 多模型负载均衡/fallback
- AI token 流控
- AI 缓存

### 5. Kubernetes Ingress 网关
- 兼容 K8s Nginx Ingress 注解
- 支持 Gateway API 标准
- 资源开销大幅下降
- 路由变更速度提升 10 倍

### 6. 微服务网关
- 对接多种注册中心
  - Nacos
  - ZooKeeper
  - Consul
  - Eureka
- 深度集成 Dubbo、Nacos、Sentinel
- 显著降低资源使用率

### 7. 安全防护网关
- WAF 能力
- 多种认证鉴权策略
  - key-auth
  - hmac-auth
  - jwt-auth
  - basic-auth
  - oidc

## 第三部分：快速开始

### 8. 在 K8s 中部署
- **标准 K8s 集群部署**
  - Helm 安装方式
  - 获取 LoadBalancer IP
  - 配置说明
  
- **本地 K8s 环境**
  - kubectl & kind 安装
  - 创建本地集群
  - 端口映射配置

### 9. 脱离 K8s 部署
- **云上一键部署**
  - 阿里云 ComputeNest 部署
  
- **Docker 本地部署**
  - 基于本地文件配置存储
  - 对接 Nacos 配置存储
  - 端口说明（8001/8080/8443）

### 10. 配置和验证
- **控制台配置**
  - 初始化管理员账号
  - 域名管理
  - 路由管理
  - 服务来源管理
  
- **Ingress CRD 配置**
  - YAML 配置方式
  - 请求验证

## 第四部分：核心功能

### 11. 插件系统
- **插件使用方式**
  - 全局配置
  - 域名级配置
  - 路由级配置
  - 优先级：路由 > 域名 > 全局
  
- **官方插件库**
  - AI 相关插件
  - 流量管理插件
  - 安全防护插件
  - 协议转换插件

### 12. Wasm 插件开发
- **支持的开发语言**
  - Go（推荐 1.24+）
  - Rust
  - JavaScript
  
- **开发流程**
  - 工具准备
  - 插件开发
  - 本地测试
  - 构建镜像
  - 部署验证

### 13. 协议转换能力
- **HTTP 转 Dubbo**
  - 支持 Dubbo 2.x
  - McpBridge 服务发现
  - Http2Rpc CRD 配置
  - 参数映射

- **Spring Cloud 集成**
  - Nacos 注册中心对接
  - ZooKeeper 注册中心对接
  - 命名空间和服务分组

## 第五部分：运维管理

### 14. 部署架构
- **组件说明**
  - higress-controller（控制面）
  - higress-gateway（数据面）
  - higress-console（控制台）
  
- **组件编译**
  - Controller 编译
  - Gateway 编译（快速/完整）
  - Envoy 本体构建

### 15. 配置参数
- **Global 参数**
  - ingressClass
  - watchNamespace
  - enableIstioAPI
  - enableGatewayAPI
  
- **Gateway 参数**
  - replicas
  - httpPort/httpsPort
  - resources
  - autoscaling
  
- **Controller 参数**
  - replicas
  - resources
  - probe 配置
  
- **控制台参数**
  - replicaCount
  - 可观测套件配置

### 16. 日志和监控
- **日志管理**
  - 日志级别配置
  - 日志路径设置
  - Wasm 插件日志
  
- **可观测性**
  - Prometheus 集成
  - Grafana 仪表板
  - SkyWalking 集成

### 17. 运维工具
- **hgctl 工具**
  - 安装和升级
  - Dashboard 管理
  - 配置管理
  - 日志查看
  
- **升级和回滚**
  - 版本升级流程
  - 配置备份
  - 回滚策略

## 第六部分：高级特性

### 18. 高可用和性能
- **高可用设计**
  - 多副本部署
  - 健康检查
  - 自动故障转移
  
- **性能优化**
  - 资源限制配置
  - 连接池管理
  - 并发控制

### 19. 安全特性
- **认证鉴权**
  - 多种认证方式
  - Consumer 管理
  - 权限控制
  
- **WAF 防护**
  - OWASP 规则
  - 自定义规则
  - IP 黑白名单

### 20. 流量管理
- **路由策略**
  - 基于路径的路由
  - 基于 Header 的路由
  - 权重路由
  
- **限流降级**
  - 请求限流
  - 并发限流
  - 熔断降级
  
- **灰度发布**
  - 金丝雀发布
  - A/B 测试
  - Kruise Rollout 集成

## 第七部分：电子书专题

### 21. Wasm 插件开发深入
- **Wasm 插件原理**
  - 沙箱隔离机制
  - 生命周期管理
  - 内存管理
  
- **Higress WasmPlugin CRD**
  - defaultConfig 配置
  - matchRules 规则
  - phase 和 priority
  
- **开发最佳实践**
  - HTTP 处理挂载点
  - 工具方法使用
  - Header 状态管理
  - 外部服务调用
  - Redis 集成

### 22. 实战案例
- **easy-logger 插件开发**
  - 需求分析
  - 环境准备
  - 代码实现
  - 本地测试
  - 部署验证

## 第八部分：社区与生态

### 23. 版本规划
- **历史版本**
  - v0.6.0 - v1.4.0 演进
  
- **当前版本**
  - v2.0.0 - v2.1.0 特性
  
- **未来规划**
  - v2.2.0 Higress Agent
  - v2.3.0 及后续

### 24. 开发者社区
- **开发者角色**
  - Maintainer
  - Approver
  - Reviewer
  - Member
  
- **贡献方式**
  - 架构设计
  - 代码贡献
  - Bug 修复
  - 文档翻译
  - 社区建设

### 25. 企业支持
- **开源版 vs 企业版**
  - 功能对比
  - 性能差异
  - 适用场景
  
- **MSE 云原生网关**
  - 阿里云托管服务
  - 99.99% 高可用保障
  - 企业级功能

## 第九部分：常见问题

### 26. FAQ 精选
- 生产环境适用性
- 与 Envoy Gateway 的区别
- 与 Tengine 的区别
- 离线部署方案
- 弹性伸缩能力
- 贡献指南

## 第十部分：总结与展望

### 27. Higress 价值总结
- 三合一网关架构
- 云原生标准化
- AI 时代的选择
- 开源社区力量

### 28. 未来发展方向
- Gateway API 完整支持
- Higress Agent 能力
- 更丰富的插件生态
- 更好的 AI 原生支持

### 29. 行动号召
- 快速开始体验
- 加入开源社区
- 参与贡献
- 关注项目发展

---

## 附录

### 术语表
- Ingress 注解（Annotation）
- 下游（Downstream）
- 上游（Upstream）
- WasmPlugin
- McpBridge

### 参考资源
- GitHub 仓库
- 官方文档
- 插件市场
- 开发者指南
- 企业版文档

### 联系方式
- GitHub Issues
- 邮件列表：higress@googlegroups.com
- 社区论坛
- 在线 Demo
