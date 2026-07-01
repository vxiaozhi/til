# Visword Prototype

基于 `spec_visword_product.md` 生成的产品原型。纯静态 HTML/CSS/JS，可在浏览器中直接打开。

## 使用方式

```bash
open index.html
# 或
python3 -m http.server 8080
# 然后访问 http://localhost:8080
```

## 原型覆盖的功能

- **首页**: Hero 输入区、示例芯片、How It Works、三种输出预览、定价卡片
- **创建/处理**: 粘贴文字或 URL → 点击生成 → 处理进度动画（5 步模拟）
- **结果页 - 思维导图**: 交互式 SVG 思维导图（树形布局、缩放提示、配色切换）
- **结果页 - 信息卡**: 社交分享卡片（4 种尺寸、4 套配色、3 种字体）
- **结果页 - 词云**: AI 语义加权词云（4 种形状、4 套配色、频率滑块）
- **分享模态**: 复制分享链接、一键分享到 Twitter / LinkedIn / Facebook
- **导出菜单**: PNG / SVG / PDF 导出入口（Demo）
- **定价页**: Free / Pro ($12/mo) / Team ($25/seat)
- **响应式**: 移动端 / 平板 / 桌面全适配
- **键盘快捷键**: Esc 关闭弹窗、1/2/3 切换结果标签

## 文件结构

```
visword-prototype/
├── index.html    # 主文件（所有视图）
├── style.css     # 样式表
├── app.js        # 交互逻辑
└── README.md     # 本文件
```
