## Agent 记忆系统

### 记忆系统

#### 1. 记忆系统是什么？

记忆系统是指通过特定机制存储、管理和检索信息，以增强模型在长期交互或复杂任务中的上下文连贯性、个性化响应及知识持久化的技术框架。其核心目标是解决大模型因固定上下文窗口限制导致的“失忆”问题，并模拟人类记忆的分层与动态更新特性。

#### 2. 为什么需要记忆系统？

大模型本身不存在记忆能力——如果开发agent应用，需要外挂记忆系统进行信息的记忆

大模型本身的上下文阈值是有限的——开发过程中没有办法直接给它所有的对话或者文本内容，超出后早期对话内容会被丢弃，导致多轮对话中出现“断片”或重复提问。记忆系统通过分层存储（短期/长期记忆）和动态检索（如向量数据库），将历史信息压缩后注入当前上下文，确保对话连贯性。

#### 3. 记忆系统的分层架构：

记忆系统通常借鉴人类记忆的三层结构，分为短期、中期和长期记忆：

- 短期记忆（STM）：存储当前对话或任务的即时信息，受限于模型的上下文窗口长度（如GPT-4的2048 tokens）。实现技术：将对话历史直接嵌入提示词中，但容量有限。
- 中期记忆（MTM）：整合短期记忆中的主题信息，通过分段分页策略组织（如MemoryOS将同一主题的对话归并为“段”），并基于热度算法（访问频率、时间衰减等）动态更新。
- 长期记忆（LPM）：持久化存储用户偏好、角色特征等个性化数据。例如，MemoryOS的LPM模块包含用户画像和智能体特征，通过向量数据库或知识图谱实现长期存储，然后通过RAG手段来进行提取。

#### 4. 开源方案
- [Awesome-LLM-Resources-List](https://github.com/ilsilfverskiold/Awesome-LLM-Resources-List) 这里收集了记忆系统（Long-Term Memory）相关的开源项目
- [awesome-ai-memory](https://github.com/XiaomingX/awesome-ai-memory) AI长期记忆的开源和商业项目列表,列举了2024-2025年社区认可度高、技术前沿的AI记忆及智能体相关工具
- [超越“金鱼脑”：深度剖析四大主流 AI Agent 记忆管理技术](https://zhuanlan.zhihu.com/p/1943700805099185953) 深入剖析了为什么传统的 RAG 还不够，以及 Agent 引入记忆系统的必要性。
  
常用开源方案（以下方案均为 Python 实现）：

| Provider     | Community             | Founded     | GitHub                                                                                          | ⭐ Stars | Open Source                 |
|--------------|------------------------|-------------|--------------------------------------------------------------------------------------------------|---------|-----------------------------|
| Mem0         | 🚀 Fast-growing        | June 2023   | [![GitHub followers](https://img.shields.io/github/followers/mem0ai?style=flat-square&color=teal)](https://github.com/mem0ai/mem0)         | 35.2k   | ✅ Apache-2.0               |
| Letta        | 💬 Active dev community| Oct 2023    | [![GitHub followers](https://img.shields.io/github/followers/letta-ai?style=flat-square&color=teal)](https://github.com/letta-ai/letta)     | 17k     | ✅ Apache-2.0               |
| Zep          | 🤝 Moderate community  | Aug 2024    | [![GitHub followers](https://img.shields.io/github/followers/getzep?style=flat-square&color=teal)](https://github.com/getzep/graphiti)      | 11.6k   | ⚠️ Graphiti CE (Apache-2.0) |
| MemoRAG      | 🧪 Small research group| Sep 2024    | [![GitHub followers](https://img.shields.io/github/followers/qhjqhj00?style=flat-square&color=teal)](https://github.com/qhjqhj00/MemoRAG)    | 1.8k    | ✅ Apache-2.0               |
| Memary       | 🧠 Niche community     | April 2024  | [![GitHub followers](https://img.shields.io/github/followers/kingjulio8238?style=flat-square&color=teal)](https://github.com/kingjulio8238/Memary) | 2.3k    | ✅ MIT                      |
| Cognee       | 🔄 Moderate            | Aug 2023    | [![GitHub followers](https://img.shields.io/github/followers/topoteretes?style=flat-square&color=teal)](https://github.com/topoteretes/cognee)     | 5.8k    | ✅ Apache-2.0               |
| EverMemOS - 陈天桥盛大团队，推出最强开源记忆系统EverMemOS       | EverMind-AI            | Nov 2025    | https://github.com/EverMind-AI/EverMemOS   | 166    | ✅ Apache-2.0               |

记忆功能对比：

| Provider  | Based   | Optional KG | Self-Editing / Agentic | Rolling Summaries            | Categories |
|-----------|---------|-------------|-------------------------|-------------------------------|------------|
| Mem0      | 🧮 Vector | ✅ Yes       | ✅ Yes                  | ❌ Not explicit               | ✅ Yes     |
| Letta     | 🧮 Vector | ⚠️ Partial  | ✅ Yes                  | ⚠️ Partial (memory blocks)    | ✅ Yes     |
| Zep       | 🧠 KG     |  -         | ✅ Yes                  | ✅ Auto chat summarization     | ✅ Yes     |
| MemoRAG   | 🧮 Vector | ❌ No       | ✅ Yes                  | ❌ Uses long-range model      | ❌ No      |
| Memary    | 🧠 KG     | -         | ✅ Yes                  | ⚠️ Plans “rewind” feature     | ✅ Yes     |
| Cognee    | 🧠 KG     | -         | ✅ Yes                  | ❌ No auto summaries          | ✅ Yes     |


