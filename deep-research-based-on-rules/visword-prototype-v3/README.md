# Visword Prototype v3 — Studio

基于 `research_report_visword_export_scenarios_v2.md` 的产品原型。
聚焦"AI 生成 → 编辑 → 导出为社交平台最优格式"。

## 使用方式

```bash
python3 -m http.server 8080
# 访问 http://localhost:8080
```

## 与 v1/v2 的区别

| 维度 | v1 | v2 | v3 |
|---|---|---|---|
| 产品形态 | 三合一可视化工具 | 信息流卡片浏览器 | **动态视频场景工厂** |
| 核心流程 | 粘贴→生成→三标签 | 浏览信息流→编辑卡片 | **选场景→AI生成→编辑→导出MP4** |
| 输出类型 | 静态图片 | 静态图片 | **动态视频 (MP4)** |
| 架构扩展性 | 无 | 无 | **场景插件式架构** |

## 原型覆盖

### 场景广场
- 4 个可用场景: Bar Chart Race / Ranking Reveal / VS Comparison / Quote Card
- 4 个"即将推出"场景: Map Trajectory / News Brief / Year Wrapped / Chat Story
- 展示可扩展的架构设计

### 工作室
- 左侧场景侧边栏（可切换场景）
- 中央手机框预览区 + 播放/暂停/拖拽进度条
- 右侧 Widget 式编辑器（每场景独立编辑控件）
- 编辑器改动实时反映到预览

### 导出
- 通用格式 + 6 个平台预设 (TikTok/Douyin/Reels/Shorts/视频号/小红书)
- 每个预设展示精确的导出参数 (编码/分辨率/帧率/码率/音频/文件大小)
- 模拟导出流程

## 场景扩展架构

新增场景只需在 `app.js` 的 `scenes` 对象中添加一个条目:

```js
'new-scene': {
  name: 'Scene Name',
  icon: '🎯',
  data: { /* scene-specific data */ },
  renderPreview: function(data) { /* return HTML */ },
  renderEditor: function(data) { /* return HTML */ }
}
```

## 文件结构
```
visword-prototype-v3/
├── index.html    # 场景广场 + 工作室 + 导出模态框
├── style.css     # 暗色主题，三栏工作台布局
├── app.js        # 场景数据 + 渲染 + 编辑 + 导出
└── README.md
```
