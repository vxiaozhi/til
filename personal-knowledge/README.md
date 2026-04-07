# 个人知识库

缘起 Karpathy公开个人知识管理新范式：让大模型把你的一切资料「编译」成一部活的百科全书——RAG已死，人类只需负责思考。
原文链接：https://mp.weixin.qq.com/s/zOAsp5uZh_JTUb4VDliC0A?mpshare=1&scene=1&srcid=0406G0owb5DwRZOFJpQCVkR0&sharer_shareinfo=0043d4e6d7686ab6763354afd7b04eeb&sharer_shareinfo_first=94e3be4a6c4fbbeb3ee3cc798f24161d&version=5.0.7.99844&platform=mac#rd

卡帕西背后的意思是：大模型的下一个战场，不是写更多代码，而是管理更多知识。

而他给出的方案，叫做「LLM Wiki」——一种让大模型当你的全职知识管家、24小时不间断整理、更新、自检个人知识库的全新范式。

GitHub上他附带的一份[想法文件](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f)

## 索引和日志记录

随着知识库的不断扩充，有两个特殊文件可以帮助LLM（以及您）更好地浏览知识库。它们各有不同的用途：

- index.md是一个面向内容的索引。它是一个维基百科所有内容的目录——每个页面都包含一个链接、一行摘要，以及可选的元数据，例如日期或来源数量。索引按类别（实体、概念、来源等）组织。LLM 会在每次数据摄取时更新它。当响应查询时，LLM 首先读取索引以查找相关页面，然后深入查看这些页面。这种方法在中等规模（约 100 个来源，约数百个页面）下效果出奇地好，并且避免了使用基于嵌入的 RAG 架构。

- log.md 文件按时间顺序排列。它仅追加记录事件及其发生的时间——例如内容导入、查询和代码检查。一个实用技巧：如果每个条目都以一致的前缀开头（例如 `/` ## [2026-04-02] ingest | Article Title），则可以使用简单的 Unix 工具解析该日志——例如，`log.md -5` 即可grep "^## \[" log.md | tail -5获取最近的 5 个条目。该日志提供了 wiki 的发展历程，并有助于 LLM 了解最近的工作内容。

## 相关工具

- [tobi/qmd](https://github.com/tobi/qmd) QMD（Query Markup Documents）是一个本地混合搜索引擎，专为完全在你的设备上索引和搜索 Markdown 内容而设计
- Obsidian
