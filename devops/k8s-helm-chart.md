# K8s Helm chart

## 公共 Chart：bitnamicharts

registry-1.docker.io/bitnamicharts 是一个OCI（Open Container Initiative）注册表地址，专门用于存储和分发由 Bitnami 维护的 Helm charts。 

具体来说：

- Bitnami 是一个广受欢迎的开源软件打包平台，提供各种应用程序（如 MySQL, Kafka, WordPress 等）的即用型镜像和安装包。
- Helm charts 是 Kubernetes 的包管理器 Helm 使用的打包格式，用于在 Kubernetes 集群上部署应用程序、定义、安装和管理应用。
- registry-1.docker.io 是 Docker 官方的公共镜像注册表 Docker Hub 的主机名。
- bitnamicharts 是 Docker Hub 上的一个组织或仓库名称，其中包含了 Bitnami 提供的各种 Helm charts。 

用户通常使用 Helm 命令行工具，结合 oci:// 前缀和这个地址，来安装或升级 Kubernetes 集群上的应用程序。例如，安装 Kafka 的命令可能如下所示

```
helm install my-release oci://registry-1.docker.io/bitnamicharts/kafka
```

- [Bitnami Helm Charts](https://github.com/bitnami/charts)

也可以在自己的 Helm chart 中将 bitnamicharts 中的 chart 包直接作为依赖来使用，参考：langfuse/langfuse-k8s 项目。

## 优秀实践

- [langfuse-k8s](https://github.com/langfuse/langfuse-k8s)
