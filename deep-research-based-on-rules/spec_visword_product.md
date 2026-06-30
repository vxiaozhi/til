# Visword Product Specification

## 1. 产品概述

### 1.1 产品名称与定位

**产品名**: Visword
**域名**: visword.com
**Slogan**: Turn any text into visual insights. / 把任何文字变成看得见的洞察。
**定位**: AI 驱动的文字转多形态可视化工具。用户粘贴一段文字或一个链接，Visword 在数秒内生成三种互补的视觉输出——交互式思维导图（帮助理解结构）、可分享信息卡片（便于社交传播）、以及智能词云（提供快速印象）。不做通用设计工具，不做演示文稿，只做"文字→可视化理解"这一件事。

### 1.2 核心差异化

与竞品的本质区别：(a) 单一输入同时输出三种视觉形态，覆盖"理解-传播-印象"全链路，而非 Mapify 只做思维导图、Napkin AI 只做图表、WordArt 只做词云；(b) 所有输出均可编辑（结构化渲染而非像素），对齐 Seede AI 的技术路线而非 GPT-Image 2 的位图路线；(c) 首次使用无需注册（借鉴 Flowodo），降低激活摩擦；(d) 分享传播内建在产品 DNA 中——每张信息卡底部带 Visword 品牌标记和"Made with Visword"链接。

### 1.3 目标用户

| 用户画像 | 核心场景 | 付费意愿 | 规模 |
|---|---|---|---|
| 内容营销人员 | 将博客文章转为社交媒体视觉素材 | 高（$19-25/月）| 大 |
| 学生/研究者 | 阅读论文/教材后生成视觉笔记 | 中低（$9-12/月，教育折扣）| 极大 |
| 知识工作者 | 会议记录/长邮件转为结构化摘要 | 中高（$15-25/月）| 大 |
| 读书爱好者 | 书籍章节生成视觉摘要分享 | 低（免费为主，偶尔付费）| 中 |

---

## 2. 用户旅程

### 2.1 核心用户流程

```
访客进入首页
    │
    ▼
看到简洁输入框（hero区）+ 示例展示
    │
    ├─ 粘贴文字 ──┐
    ├─ 粘贴URL  ──┤
    └─ 上传文件  ──┘
         │
         ▼
    AI 处理中（3-15秒，视文字长度）
    │  展示进度动画：提取关键词 → 分析结构 → 生成视觉
         │
         ▼
    结果页 —— 三栏/三标签布局
    │
    ├─ Tab 1: 思维导图（交互式，可缩放/拖拽/编辑节点）
    ├─ Tab 2: 信息卡片（多尺寸：方/横/竖，可切换配色）
    └─ Tab 3: 智能词云（多形状，多配色，词频调节）
         │
         ▼
    编辑与导出
    │
    ├─ 编辑：点击节点改文字、调配色、换模板
    ├─ 导出：PNG / SVG / PDF（免费带水印，付费去水印）
    ├─ 分享：生成分享链接 / 直接分享到 Twitter/LinkedIn/微信
    └─ 保存：注册/登录后可保存到个人库
```

### 2.2 关键页面路径

- `/` — 首页（输入框 + 示例 + 定价）
- `/create` — 创建页（输入区 + 处理进度）
- `/view/[id]` — 结果查看页（三态切换 + 编辑 + 导出）
- `/library` — 个人库（需登录，历史记录）
- `/pricing` — 定价页
- `/share/[id]` — 公开分享页（只读，带品牌标记）

---

## 3. 功能规格

### 3.1 MVP 功能（Phase 1，4-6 周）

#### 输入模块
- 文字输入：textarea，支持纯文本粘贴，上限 15,000 字符
- URL 输入：粘贴文章链接，服务端抓取正文（Readability 算法提取）
- 示例快速体验：提供 3 个预置示例（产品评论 / 学术摘要 / 新闻文章），点击即可查看效果

#### AI 处理流水线
- 步骤1 文本提取：URL → HTML → 正文提取（Mozilla Readability / Trafilatura）
- 步骤2 关键概念提取：LLM 提取核心主题、关键实体、概念层级
- 步骤3 结构分析：识别段落逻辑关系（因果、并列、递进、对比）
- 步骤4 视觉生成：根据结构生成三种输出

#### 输出类型 A：交互式思维导图
- 核心渲染：基于 D3.js 或 Cytoscape.js 的力导向/树形布局
- 交互：缩放（滚轮）、平移（拖拽）、节点折叠/展开、节点点击高亮
- 层级：根节点（文章主题）→ 一级节点（章节/段落主题）→ 二级节点（关键概念）→ 叶节点（细节/示例）
- 节点内容：自动截断过长文字，hover 显示全文
- 编辑：双击节点可编辑文字、右键删除/添加子节点、拖拽调整层级

#### 输出类型 B：可分享信息卡片
- 卡片布局：标题 + 摘要 + 3-5 个关键要点（图标+文字）+ 底部来源
- 尺寸预设：Instagram 1:1 (1080x1080)、LinkedIn 1.91:1 (1200x627)、Twitter 16:9 (1200x675)、Pinterest 2:3 (1000x1500)
- 配色方案：6 套预设（暖色/冷色/极简/渐变/暗黑/学术）
- 字体组合：4 套预设（现代无衬线/优雅衬线/活泼圆体/专业正式）
- 渲染方式：Fabric.js Canvas 渲染 → 导出 PNG/SVG，保证文字可编辑

#### 输出类型 C：智能词云
- 关键词提取：TF-IDF + LLM 语义加权（核心概念权重更高）
- 布局算法：spiral / rectangular / 自定义形状（圆形、心形、星形）
- 字体缩放：词频线性映射到字号（14px-72px），支持手动调节
- 配色：基于提取的 6 套方案，用户可切换
- 停用词：中文/英文内置停用词表，用户可自定义排除词

#### 导出与分享
- 免费用户：PNG 导出（带 Visword 水印，右下角半透明）
- 付费用户：PNG/SVG 高清无水印导出、PDF 导出
- 分享链接：生成 visword.com/share/[id]，展示思维导图 + 信息卡预览
- 一键分享：Twitter/X、LinkedIn、Facebook 的 Share Intent

#### 用户系统
- 无需注册即可使用（1 次免费生成）
- 注册/登录：Email + 密码、Google OAuth、GitHub OAuth
- 免费层：每日 3 次生成、带水印导出、基础模板
- Pro 层（$12/月）：无限生成、无水印、全模板、SVG 导出、保存历史
- Team 层（$25/人/月）：团队共享模板、协作编辑、管理面板

### 3.2 Phase 2 功能（7-12 周）

- PDF 上传：上传 PDF 文件，自动提取文字后生成可视化
- YouTube 视频：粘贴 YouTube 链接，获取字幕/转写后生成可视化
- Chrome 扩展：一键将当前网页转为可视化摘要
- 自定义品牌工具包：上传 Logo、设定品牌色和字体，所有输出自动套用
- 更多信息卡模板：时间线、对比表、流程图、阶梯图
- 多语言：中文/英文/日文输入输出优化
- 导出到 Notion：一键将思维导图导出为 Notion 页面

### 3.3 Phase 3 功能（13-24 周）

- 协作编辑：多人同时编辑同一张思维导图
- 播客转文字 → 可视化：上传音频文件，Whisper 转写后生成
- AI 语音讲解：为生成的思维导图自动生成语音讲解
- API 开放：开发者可将 Visword 嵌入到自己的应用中
- 企业单点登录（SSO）：SAML/OIDC
- 分析仪表板：查看分享链接的访问数据

### 3.4 不做的事情（明确的 Scope 边界）

- 不做通用演示文稿（不进入 Gamma 的市场）
- 不做手动画布/白板（不进入 Miro 的市场）
- 不做项目管理/甘特图（不进入 Mindomo 的市场）
- 不做深度知识库管理（不进入 Obsidian/Notion 的市场）
- 不做 AI 写作助手（不进入 Jenni AI 的市场）

---

## 4. 技术架构

### 4.1 总体架构

```
┌─────────────────────────────────────────────────────────┐
│                    Frontend (Next.js)                    │
│  ┌──────────┐  ┌──────────┐  ┌───────────────────────┐  │
│  │  Landing  │  │  Editor  │  │  Result View          │  │
│  │  (SSG)    │  │  (CSR)   │  │  (ISR for share pg)   │  │
│  └──────────┘  └──────────┘  └───────────────────────┘  │
│                          │                               │
│  ┌──────────────────────┴────────────────────────────┐  │
│  │              State Management (Zustand)             │  │
│  └───────────────────────────────────────────────────┘  │
├─────────────────────────────────────────────────────────┤
│                    API Layer (Next.js API Routes)        │
│  ┌──────────┐  ┌──────────┐  ┌───────────────────────┐  │
│  │  Auth    │  │  Content │  │  Generation            │  │
│  │  Routes  │  │  Routes  │  │  Routes                │  │
│  └──────────┘  └──────────┘  └───────────────────────┘  │
├─────────────────────────────────────────────────────────┤
│                    Service Layer                         │
│  ┌──────────┐  ┌──────────┐  ┌───────────────────────┐  │
│  │  Content │  │  AI      │  │  Render                │  │
│  │  Service │  │  Service │  │  Service               │  │
│  └──────────┘  └──────────┘  └───────────────────────┘  │
├─────────────────────────────────────────────────────────┤
│                    Data Layer                            │
│  ┌──────────┐  ┌──────────┐  ┌───────────────────────┐  │
│  │ Supabase │  │  Redis   │  │  S3/Cloudflare R2      │  │
│  │ (PG+Auth)│  │ (Cache)  │  │  (Exports & Assets)    │  │
│  └──────────┘  └──────────┘  └───────────────────────┘  │
├─────────────────────────────────────────────────────────┤
│                    External APIs                         │
│  ┌──────────┐  ┌──────────┐  ┌───────────────────────┐  │
│  │ LLM API  │  │ Text-    │  │  Content               │  │
│  │ (Claude/ │  │ Extract   │  │  Fetch                 │  │
│  │  GPT)    │  │ (Trafil)  │  │  (Playwright/Puppet)  │  │
│  └──────────┘  └──────────┘  └───────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

### 4.2 技术栈

| 层 | 选型 | 理由 |
|---|---|---|
| 框架 | Next.js 14 (App Router) | SSR/SSG/ISR 混合渲染、API Routes、Vercel 原生部署 |
| 语言 | TypeScript (strict mode) | 类型安全、更好的 DX |
| 样式 | Tailwind CSS 3.4 + shadcn/ui | 开发效率高、主题可定制、组件成熟 |
| 状态管理 | Zustand | 轻量、TypeScript 友好、无 boilerplate |
| 数据库 | Supabase (PostgreSQL) | 自带 Auth、Row-Level Security、免费层慷慨 |
| 缓存 | Redis (Upstash) | 缓存 AI 结果、限流、Serverless 友好 |
| 文件存储 | Cloudflare R2 | S3 兼容、零出口费、便宜 |
| 图表渲染 | D3.js + Cytoscape.js | 思维导图内核，灵活可控 |
| Canvas 渲染 | Fabric.js | 信息卡和词云的 Canvas 操作与导出 |
| 内容提取 | Trafilatura (Python) + Mozilla Readability | 正文提取，处理各种网页 |
| AI/LLM | Anthropic Claude API + OpenAI GPT API | 双模型备选，根据任务选择 |
| 支付 | Stripe | 订阅管理、webhook、客户门户 |
| 部署 | Vercel (前端) + Railway/Fly.io (微服务) | 前端免费、后端按需 |
| 监控 | Sentry + PostHog | 错误追踪 + 产品分析 |
| 邮件 | Resend + React Email | 事务邮件和营销邮件 |

### 4.3 AI 流水线详细设计

```
INPUT (text / url / file)
    │
    ▼
┌──────────────────────────┐
│ Step 1: Content Extraction│
│ ─────────────────────────│
│ - URL → Trafilatura 抓取  │
│ - File → 解析 PDF/txt     │
│ - Text → 直接传递         │
│ Output: clean_text, title,│
│         source_url        │
└──────────┬───────────────┘
           │
           ▼
┌──────────────────────────┐
│ Step 2: Concept Analysis  │
│ ─────────────────────────│
│ LLM Prompt:               │
│ "Analyze the text. Return │
│  JSON with:               │
│  - main_topic (string)    │
│  - sections (array of {   │
│      heading, key_points, │
│      importance_1to5 })   │
│  - key_entities (array)   │
│  - logical_flow (tree)"   │
│                            │
│ Model: Claude Haiku (fast)│
│ Output: structured JSON   │
└──────────┬───────────────┘
           │
           ▼
┌──────────────────────────┐
│ Step 3: Multi-Output Gen  │
│ ─────────────────────────│
│ 3a. Mindmap Gen:          │
│   Convert section tree →  │
│   D3-compatible hierarchy │
│                            │
│ 3b. Infocard Gen:         │
│   Select top 5 points +   │
│   title → card template   │
│                            │
│ 3c. Wordcloud Gen:        │
│   TF-IDF + LLM re-rank →  │
│   weighted word list       │
│                            │
│ Output: 3 structured JSONs│
└──────────┬───────────────┘
           │
           ▼
    Return to client →
    Client renders using
    D3 / Fabric.js
```

---

## 5. 数据模型

### 5.1 PostgreSQL 表结构

```sql
-- 用户表 (Supabase Auth 管理，此处为扩展属性)
CREATE TABLE user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id),
    display_name TEXT,
    avatar_url TEXT,
    plan TEXT DEFAULT 'free',       -- 'free' | 'pro' | 'team' | 'enterprise'
    daily_generations INT DEFAULT 0,
    last_generation_date DATE,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 生成记录表
CREATE TABLE generations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id),  -- nullable (未注册用户)
    session_id TEXT,                          -- 匿名用户追踪
    input_type TEXT NOT NULL,                 -- 'text' | 'url' | 'file'
    input_source TEXT,                        -- URL 或文件名
    input_text_preview TEXT,                  -- 前 500 字符
    title TEXT,                               -- 提取的标题
    status TEXT DEFAULT 'processing',         -- 'processing' | 'completed' | 'failed'
    
    -- AI 分析结果 (JSONB)
    concept_analysis JSONB,                   -- 概念分析结构化结果
    mindmap_data JSONB,                       -- 思维导图节点树
    infocard_data JSONB,                      -- 信息卡片内容
    wordcloud_data JSONB,                     -- 词云加权词表
    
    -- 元数据
    word_count INT,
    processing_time_ms INT,
    error_message TEXT,
    
    -- 分享
    share_id TEXT UNIQUE,                     -- 短 ID 用于公开分享
    is_public BOOLEAN DEFAULT false,
    
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 编辑记录表 (用户编辑后的版本)
CREATE TABLE generation_edits (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    generation_id UUID REFERENCES generations(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id),
    edit_type TEXT NOT NULL,         -- 'mindmap' | 'infocard' | 'wordcloud'
    edited_data JSONB NOT NULL,      -- 编辑后的数据
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 分享分析表
CREATE TABLE share_analytics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    generation_id UUID REFERENCES generations(id) ON DELETE CASCADE,
    views INT DEFAULT 0,
    unique_visitors INT DEFAULT 0,
    last_viewed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 订阅表 (Stripe 同步)
CREATE TABLE subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) UNIQUE,
    stripe_customer_id TEXT,
    stripe_subscription_id TEXT,
    plan TEXT NOT NULL,              -- 'pro_monthly' | 'pro_yearly' | 'team_monthly'
    status TEXT NOT NULL,            -- 'active' | 'past_due' | 'canceled' | 'trialing'
    current_period_end TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 品牌工具包表 (Phase 2)
CREATE TABLE brand_kits (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id),
    name TEXT NOT NULL,
    logo_url TEXT,
    primary_color TEXT DEFAULT '#6366f1',
    secondary_colors JSONB DEFAULT '[]',
    font_family TEXT DEFAULT 'Inter',
    created_at TIMESTAMPTZ DEFAULT now()
);
```

### 5.2 Redis 缓存结构

```
# 限流
rate_limit:{session_id}         → count (TTL: 24h)
rate_limit:{user_id}            → count (TTL: 24h)

# AI 结果缓存 (相同输入返回缓存)
generation:{sha256(input_text)} → generation_id (TTL: 7d)

# 会话临时存储 (未注册用户)
session:{session_id}            → { generations: [...], created_at }

# URL 内容缓存 (避免重复抓取)
url_content:{sha256(url)}       → { title, text, extracted_at } (TTL: 1h)
```

### 5.3 TypeScript 核心类型定义

```typescript
// 概念分析结果
interface ConceptAnalysis {
  mainTopic: string;
  summary: string;            // 1-2 句摘要
  sections: Section[];
  keyEntities: KeyEntity[];
  logicalFlow: FlowNode;
}

interface Section {
  heading: string;
  keyPoints: string[];
  importance: 1 | 2 | 3 | 4 | 5;
}

interface KeyEntity {
  name: string;
  type: 'person' | 'organization' | 'concept' | 'term' | 'event';
  mentions: number;
}

interface FlowNode {
  label: string;
  relation: 'root' | 'cause' | 'effect' | 'contrast' | 'parallel' | 'sequence';
  children: FlowNode[];
}

// 思维导图节点树
interface MindmapNode {
  id: string;
  label: string;
  level: number;
  children: MindmapNode[];
  metadata?: {
    importance: number;
    entityType?: string;
  };
}

// 信息卡片
interface InfocardData {
  title: string;
  subtitle: string;
  keyPoints: InfocardPoint[];
  sourceLabel: string;
  sourceUrl?: string;
  colorScheme: string;
  fontFamily: string;
  size: 'instagram' | 'linkedin' | 'twitter' | 'pinterest';
}

interface InfocardPoint {
  icon: string;         // emoji or icon name
  text: string;
}

// 词云
interface WordcloudData {
  words: WeightedWord[];
  shape: 'circle' | 'rectangle' | 'heart' | 'star' | 'custom';
  colorScheme: string;
}

interface WeightedWord {
  text: string;
  weight: number;       // 0-100, relative frequency + AI importance
}

// 生成记录
interface Generation {
  id: string;
  userId?: string;
  sessionId?: string;
  inputType: 'text' | 'url' | 'file';
  inputSource?: string;
  title: string;
  status: 'processing' | 'completed' | 'failed';
  conceptAnalysis: ConceptAnalysis;
  mindmapData: MindmapNode;
  infocardData: InfocardData;
  wordcloudData: WordcloudData;
  shareId?: string;
  isPublic: boolean;
  createdAt: Date;
}
```

---

## 6. API 设计

### 6.1 REST API 端点

```
POST   /api/generations             创建生成任务（异步）
GET    /api/generations/:id         获取生成状态和结果
PATCH  /api/generations/:id         保存编辑后的数据（需登录）
DELETE /api/generations/:id         删除生成记录（需登录）

GET    /api/generations             列出用户的生成历史（需登录）
GET    /api/share/:shareId          获取公开分享内容（无需登录）

POST   /api/auth/register           注册
POST   /api/auth/login              登录
POST   /api/auth/logout             登出
GET    /api/auth/me                 当前用户信息

GET    /api/user/usage              用户今日使用量和限制
GET    /api/user/library            用户保存的所有生成
PATCH  /api/user/profile            更新用户信息

POST   /api/stripe/webhook          Stripe 事件处理
POST   /api/stripe/checkout         创建结账会话
GET    /api/stripe/portal           客户管理门户

GET    /api/brand-kits              获取用户的品牌工具包列表
POST   /api/brand-kits              创建品牌工具包
PATCH  /api/brand-kits/:id          更新品牌工具包
DELETE /api/brand-kits/:id          删除品牌工具包
```

### 6.2 核心 API 详情

#### POST /api/generations

```
Request:
{
  "input_type": "text" | "url" | "file",
  "content": "string",                  // 文本内容或 URL
  "options": {
    "language": "zh" | "en" | "auto",  // 默认 auto
    "detail_level": "brief" | "standard" | "detailed",  // 默认 standard
    "brand_kit_id": "uuid | null"      // Phase 2
  }
}

Response (202 Accepted):
{
  "generation_id": "uuid",
  "status": "processing",
  "estimated_time_ms": 8000
}

Poll Response (GET /api/generations/:id, status=completed):
{
  "generation_id": "uuid",
  "status": "completed",
  "title": "提取的标题",
  "input_type": "url",
  "input_source": "https://example.com/article",
  "concept_analysis": { ... },
  "mindmap_data": { ... },
  "infocard_data": { ... },
  "wordcloud_data": { ... },
  "share_id": "abc123",
  "processing_time_ms": 7200,
  "word_count": 3200
}
```

### 6.3 限流策略

```
未注册用户:  每个 session 每天 1 次生成
免费注册用户: 每天 3 次生成
Pro 用户:    每天 50 次生成
Team 用户:   每席位每天 100 次生成
```

---

## 7. UI/UX 规格

### 7.1 设计系统

- 主色: `#6366f1` (Indigo-500) — 代表智慧与创造力
- 辅助色: `#8b5cf6` (Violet-500), `#06b6d4` (Cyan-500), `#f59e0b` (Amber-500)
- 中性色: Tailwind Gray 色阶
- 字体: Inter (UI), Noto Sans SC (中文 UI), JetBrains Mono (代码/技术内容)
- 圆角: `rounded-xl` (卡片), `rounded-lg` (按钮), `rounded-full` (标签)
- 阴影: `shadow-sm` (卡片默认), `shadow-lg` (hover)

### 7.2 首页布局

```
┌─────────────────────────────────────────────────────┐
│ [Logo] Visword                    [Pricing] [Login] │
├─────────────────────────────────────────────────────┤
│                                                     │
│       Turn any text into visual insights            │
│                                                     │
│  ┌─────────────────────────────────────────────┐    │
│  │  Paste article URL or text here...     [Go] │    │
│  └─────────────────────────────────────────────┘    │
│                                                     │
│  Or try an example:                                 │
│  [Product Review] [Research Paper] [News Article]    │
│                                                     │
├─────────────────────────────────────────────────────┤
│  How it works                                       │
│  ┌─────┐    ┌─────┐    ┌─────┐    ┌─────┐          │
│  │Input│ → │Analyze│ → │Visualize│ → │Share│          │
│  └─────┘    └─────┘    └─────┘    └─────┘          │
├─────────────────────────────────────────────────────┤
│  Three visual formats, one click                    │
│                                                     │
│  [Mindmap preview]  [Infocard preview]  [Wordcloud] │
│                                                     │
├─────────────────────────────────────────────────────┤
│  Pricing                                            │
│  Free ($0)    Pro ($12/mo)    Team ($25/seat/mo)   │
├─────────────────────────────────────────────────────┤
│  Footer                                             │
└─────────────────────────────────────────────────────┘
```

### 7.3 结果页布局

```
┌──────────────────────────────────────────────────────┐
│ [Logo]  ← Back    Title: "Article Title"    [Share]  │
├──────────────────────────────────────────────────────┤
│ [Mindmap Tab] [Infocard Tab] [Wordcloud Tab]         │
├──────────────────────────────────────────────────────┤
│                                                      │
│  ┌─ Mindmap View ────────────────────────────────┐   │
│  │                                                │   │
│  │         ┌──────┐                               │   │
│  │         │ MAIN │                               │   │
│  │         └──┬───┘                               │   │
│  │    ┌───────┼───────┐                           │   │
│  │  ┌─┴─┐   ┌─┴─┐   ┌─┴─┐                        │   │
│  │  │ A │   │ B │   │ C │                        │   │
│  │  └───┘   └─┬─┘   └───┘                        │   │
│  │        ┌───┴───┐                               │   │
│  │      ┌─┴─┐   ┌─┴─┐                             │   │
│  │      │B1 │   │B2 │                             │   │
│  │      └───┘   └───┘                             │   │
│  │                                                │   │
│  └────────────────────────────────────────────────┘   │
│                                                      │
│  Sidebar / Bottom bar (mobile):                      │
│  ┌────────────────────────────────────────────────┐  │
│  │ Layout: [Tree] [Radial] [Force]  Zoom: [-][+]  │  │
│  │ Color: [●][●][●][●][●][●]   Export: [PNG][SVG] │  │
│  └────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────┘
```

### 7.4 移动端适配

- 输入页：全屏 textarea 或 URL 输入，大按钮
- 结果页：三标签在顶部，单列滚动
- 思维导图改为可折叠树形列表（适合小屏）
- 信息卡全宽显示，左右滑动切换尺寸
- 词云全宽渲染，下方设形状和配色选择器

---

## 8. 开发路线图

### Milestone 1: 基础框架 (第 1 周)
- 项目初始化：Next.js + Tailwind + shadcn/ui + TypeScript
- Supabase 集成：Auth + 数据库 schema 建立
- 部署流水线：Vercel 自动部署 + GitHub CI
- 文件结构：按 feature 组织 (见 Section 9)
- 交付物：可访问的空白首页 + 登录流程

### Milestone 2: 文字输入与 AI 处理 (第 2-3 周)
- 输入组件：textarea + URL input + 示例按钮
- 内容提取服务：Trafilatura (Python 微服务，或 Playwright)
- AI 流水线 v1：Claude/OpenAI API → 概念分析 JSON → 结构化存储
- 处理进度展示：轮询状态 + 进度动画
- 交付物：输入文字 → 获得 JSON 分析结果

### Milestone 3: 思维导图渲染 (第 3-4 周)
- D3.js/Cytoscape.js 树形布局集成
- 节点交互：缩放、拖拽、折叠、编辑
- 布局切换：树形 / 放射形 / 力导向
- 导出：SVG/PNG (html-to-image / dom-to-image)
- 交付物：JSON → 可交互思维导图 + 导出

### Milestone 4: 信息卡与词云 (第 4-5 周)
- Fabric.js Canvas 渲染管线
- 信息卡模板：4 种尺寸 + 6 套配色 + 4 套字体
- 智能词云：布局算法 + 形状选择 + 停用词
- 导出：PNG/SVG/PDF
- 交付物：JSON → 信息卡 + 词云 + 导出

### Milestone 5: 用户系统与变现 (第 5-6 周)
- 注册/登录流程（Email + Google OAuth）
- 免费层限制：每日计数 + 水印
- Stripe 订阅集成：Checkout + Customer Portal + Webhook
- 定价页
- 交付物：可注册、可付费的 MVP

### Milestone 6: 分享与上线 (第 6 周)
- 分享页面：visword.com/share/[id]
- 社交分享按钮
- 个人库页面（登录后）
- 分享分析基础统计
- SEO 优化 (OG meta, sitemap)
- 交付物：可上线的完整产品

### Post-MVP (第 7 周以后)
- Phase 2 功能按优先级迭代
- 性能优化：AI 结果缓存、CDN 优化
- 内容营销：产品博客、SEO 内容

---

## 9. 项目文件结构

```
visword/
├── .github/
│   └── workflows/
│       └── ci.yml                    # CI/CD 流水线
├── public/
│   ├── favicon.ico
│   ├── og-image.png                 # 社交分享 OG 图
│   └── robots.txt
├── src/
│   ├── app/                         # Next.js App Router
│   │   ├── layout.tsx               # 根布局
│   │   ├── page.tsx                 # 首页 (SSG)
│   │   ├── create/
│   │   │   └── page.tsx             # 创建页 (CSR)
│   │   ├── view/
│   │   │   └── [id]/
│   │   │       └── page.tsx         # 结果查看页
│   │   ├── share/
│   │   │   └── [shareId]/
│   │   │       └── page.tsx         # 公开分享页 (ISR)
│   │   ├── library/
│   │   │   └── page.tsx             # 个人库
│   │   ├── pricing/
│   │   │   └── page.tsx             # 定价页 (SSG)
│   │   ├── auth/
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   └── callback/
│   │   │       └── route.ts         # OAuth 回调
│   │   └── api/
│   │       ├── generations/
│   │       │   ├── route.ts         # POST (创建) + GET (列表)
│   │       │   └── [id]/
│   │       │       └── route.ts     # GET + PATCH + DELETE
│   │       ├── share/
│   │       │   └── [shareId]/
│   │       │       └── route.ts
│   │       ├── auth/
│   │       │   └── [...nextauth]/
│   │       │       └── route.ts
│   │       ├── stripe/
│   │       │   ├── checkout/
│   │       │   │   └── route.ts
│   │       │   ├── portal/
│   │       │   │   └── route.ts
│   │       │   └── webhook/
│   │       │       └── route.ts
│   │       └── user/
│   │           ├── usage/
│   │           │   └── route.ts
│   │           └── profile/
│   │               └── route.ts
│   ├── components/
│   │   ├── ui/                      # shadcn/ui 组件
│   │   ├── landing/                 # 首页专用组件
│   │   │   ├── hero-input.tsx
│   │   │   ├── example-cards.tsx
│   │   │   ├── how-it-works.tsx
│   │   │   └── pricing-section.tsx
│   │   ├── editor/                  # 编辑器通用组件
│   │   │   ├── input-area.tsx
│   │   │   ├── processing-progress.tsx
│   │   │   └── result-tabs.tsx
│   │   ├── mindmap/                 # 思维导图组件
│   │   │   ├── mindmap-canvas.tsx
│   │   │   ├── mindmap-node.tsx
│   │   │   ├── mindmap-toolbar.tsx
│   │   │   └── mindmap-export.tsx
│   │   ├── infocard/                # 信息卡组件
│   │   │   ├── infocard-canvas.tsx
│   │   │   ├── infocard-template.tsx
│   │   │   ├── infocard-size-picker.tsx
│   │   │   └── infocard-color-picker.tsx
│   │   ├── wordcloud/               # 词云组件
│   │   │   ├── wordcloud-canvas.tsx
│   │   │   ├── wordcloud-shape-picker.tsx
│   │   │   └── wordcloud-word-list.tsx
│   │   ├── share/                   # 分享组件
│   │   │   ├── share-modal.tsx
│   │   │   └── social-buttons.tsx
│   │   └── layout/                  # 布局组件
│   │       ├── header.tsx
│   │       ├── footer.tsx
│   │       └── mobile-nav.tsx
│   ├── lib/                         # 工具库
│   │   ├── supabase/
│   │   │   ├── client.ts
│   │   │   ├── server.ts
│   │   │   └── admin.ts
│   │   ├── ai/
│   │   │   ├── pipeline.ts          # AI 流水线编排
│   │   │   ├── concept-analyzer.ts  # 概念分析 prompt
│   │   │   ├── mindmap-builder.ts   # 思维导图构建
│   │   │   ├── infocard-builder.ts  # 信息卡构建
│   │   │   ├── wordcloud-builder.ts # 词云构建
│   │   │   └── prompts/             # Prompt 模板
│   │   │       ├── concept-analysis.ts
│   │   │       ├── mindmap-gen.ts
│   │   │       ├── infocard-gen.ts
│   │   │       └── wordcloud-gen.ts
│   │   ├── content/
│   │   │   ├── extractor.ts         # 内容提取接口
│   │   │   ├── url-extractor.ts     # URL → 正文
│   │   │   └── file-extractor.ts    # 文件 → 文字
│   │   ├── render/
│   │   │   ├── mindmap-renderer.ts  # D3 渲染逻辑
│   │   │   ├── infocard-renderer.ts # Fabric.js 渲染逻辑
│   │   │   └── wordcloud-renderer.ts
│   │   ├── stripe/
│   │   │   ├── client.ts
│   │   │   └── server.ts
│   │   ├── rate-limit/
│   │   │   └── index.ts
│   │   ├── analytics/
│   │   │   └── posthog.ts
│   │   └── utils/
│   │       ├── cn.ts                # className 合并
│   │       ├── format.ts            # 格式化工具
│   │       └── constants.ts         # 常量定义
│   ├── hooks/                       # React Hooks
│   │   ├── use-generation.ts        # 生成任务管理
│   │   ├── use-mindmap.ts           # 思维导图交互
│   │   ├── use-infocard.ts          # 信息卡编辑
│   │   ├── use-wordcloud.ts         # 词云编辑
│   │   ├── use-auth.ts              # 认证状态
│   │   └── use-subscription.ts      # 订阅状态
│   ├── stores/                      # Zustand Stores
│   │   ├── generation-store.ts
│   │   ├── user-store.ts
│   │   └── ui-store.ts
│   └── types/                       # TypeScript 类型
│       ├── generation.ts
│       ├── mindmap.ts
│       ├── infocard.ts
│       ├── wordcloud.ts
│       └── user.ts
├── services/                        # 微服务 (可选，复杂逻辑可独立部署)
│   └── content-extractor/           # Python 内容提取服务
│       ├── main.py                  # FastAPI 服务
│       ├── extractor.py             # Trafilatura 调用
│       ├── requirements.txt
│       └── Dockerfile
├── supabase/
│   └── migrations/                  # 数据库迁移文件
│       └── 001_initial_schema.sql
├── .env.local.example
├── .eslintrc.js
├── .prettierrc
├── tailwind.config.ts
├── tsconfig.json
├── next.config.js
├── package.json
└── README.md
```

---

## 10. 竞品对标与防御策略

| 竞品 | 他们做什么 | 我们不做什么 | 我们比他们多什么 |
|---|---|---|---|
| Mapify | AI 思维导图（多格式输入）| 不覆盖所有文件格式的输入 | 同时输出信息卡 + 词云，更强的分享属性 |
| Napkin AI | 文字转图表/信息图 | 不做通用图表库 | 交互式思维导图 + 可编辑结构化输出 |
| Gamma | AI 演示文稿 | 不做幻灯片 | 更轻量、更快、更便宜的即时可视化 |
| WordArt.com | 传统词云（手动配置）| 不做打印物料 | AI 驱动的内容理解 + 三合一输出 |
| XMind | 手动思维导图 | 不做重型桌面应用 | AI 自动生成替代手动绘制 |
| Effie | 写作 + 一键导图 | 不做写作编辑器 | 多格式输入 + 多格式输出 |

**防御策略**：(a) 结构化可编辑输出是核心技术护城河（不输出像素，输出可操作的数据），需要持续投入渲染引擎；(b) 三合一输出形态建立用户习惯后，单功能工具难以替代；(c) 分享链接和品牌水印形成的病毒传播网络是获客护城河；(d) 深度垂直而非横向扩展，在"文字→可视化理解"这一狭窄领域做到世界最好。

---

## 11. 关键指标

| 指标 | 目标 (6 个月) | 目标 (12 个月) |
|---|---|---|
| 月活跃用户 (MAU) | 5,000 | 25,000 |
| 付费用户数 | 150 | 800 |
| MRR | $1,800 | $10,000 |
| 付费转化率 | 3% | 3.2% |
| 月流失率 | < 8% | < 5% |
| 免费用户日均生成数 | 2.5 | 2.8 |
| 分享链接创建率 | 15% | 20% |
| AI 处理平均耗时 | < 10 秒 | < 6 秒 |
| 页面加载时间 (LCP) | < 2.5 秒 | < 1.8 秒 |
| 自然搜索流量占比 | 20% | 40% |

---

## 12. 成本预估

| 成本项 | 月成本 (MVP, 0-500 用户) | 月成本 (5000 用户) |
|---|---|---|
| Vercel 部署 | $0 (免费层) | $20 (Pro) |
| Supabase 数据库 | $0 (免费层) | $25 (Pro) |
| Upstash Redis | $0 (免费层) | $10 |
| Cloudflare R2 | $0 | $5 |
| LLM API (Claude/GPT) | $50-150 | $800-1500 |
| Stripe 手续费 | 2.9% + $0.30/笔 | 同左 |
| Resend 邮件 | $0 (免费层) | $20 |
| Sentry | $0 (免费层) | $0 (免费层) |
| PostHog | $0 (免费层) | $0 (免费层) |
| 域名 | $12/年 | $12/年 |
| **合计** | **$60-170/月** | **$900-1600/月** |

以 Pro 定价 $12/月计算，约 15 个付费用户即可覆盖 MVP 阶段的运营成本。70% 毛利率目标在 5000 用户阶段可实现。

---

*本文档为 Visword 产品的完整规格说明。开发过程中应以本文档为蓝图，各阶段的实现细节可在不偏离核心定位的前提下灵活调整。*
