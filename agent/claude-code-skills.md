# Claude Code Skills

Skills 是近期 Anthropic 发布了一个新特性——Claude Skills，它的目标，是让 Claude 不再只是一个「能聊天的模型」，而是一个具备可扩展、可执行技能体系的代理式 Agentic AI 工具。

- [Claude官方 Skills](https://github.com/anthropics/skills)
- [Claude官方 Skills 对应的中文版本](https://github.com/vxiaozhi/Claude_skills_zh-CN)

其它有用 skills：

- [内容研究撰稿人](https://github.com/ComposioHQ/awesome-claude-skills/blob/master/content-research-writer/SKILL.md)


## Skills 架构

Skill 架构代表了一个模块化系统，通过自包含的指令包来扩展 Claude 的能力。该架构使 Claude 能够动态加载专门的知识、工作流和工具，以更高的精度和可靠性执行特定任务。

Skill 架构遵循渐进式披露设计原则(Progressive Disclosure Design Principle)，在保持可访问性的同时优化上下文使用。该系统在三个不同的加载级别上运行：

- 元数据层 - 始终可用（约 100 个词），包含技能的名称和描述
- 指令层 - 在技能触发时加载（<5k 个词），包含核心 SKILL.md 内容
- 资源层 - 按需加载，包含捆绑的资源、脚本和引用

这种分层方法确保 Claude 能够快速识别相关技能，同时为复杂任务保持上下文窗口效率。

## Skill_Seekers

- [Skill_Seekers](https://github.com/vxiaozhi/Skill_Seekers)

修复 log 问题：https://github.com/yusufkaraaslan/Skill_Seekers/pull/187/commits/4137c737a0194f5436bba65d71c7e176a30689b6

```
uv build
uv tool install .
```

## 自定义 Skills 实践

### 1. md-to-ppt-outline_PPT大纲生成

```
创建一个新技能：读取当前项目下所有 md 文件，生成 ppt 中文大纲，技能指令文件也用中文
```

生成的技能：https://github.com/vxiaozhi/Claude_skills_zh-CN/tree/main/md-to-ppt-outline_PPT%E5%A4%A7%E7%BA%B2%E7%94%9F%E6%88%90


### 2. proto-generator_需求生成Protobuf

生成的技能： https://github.com/vxiaozhi/Claude_skills_zh-CN/tree/main/proto-generator_%E9%9C%80%E6%B1%82%E7%94%9F%E6%88%90Protobuf


