# deep_research

这是深度研究记录的根目录。
你每次的深度研究任务都是独立的。除非我明确说明基于或参考已有的文件，否则你研究过程中不要参考引用已有文件。

## 研究完成后的提交与推送

每次深度研究任务完成、研究报告文件保存后，必须执行以下操作：

1. 更新 `README.md`，将新生成的研究报告文件条目添加到目录中（提取报告的 H1 标题作为链接文本，按文件名排序）。
2. 使用 `git add` 将生成的研究报告文件（及研究计划文件）和 `README.md` 加入暂存区
3. 使用 `git commit` 提交，commit message 格式为：
   ```
   docs: add research report - <研究主题简短描述>
   ```
4. 使用 `git push` 推送到远程仓库

示例：
```bash
# 先更新 README.md（提取新报告的 H1 标题，追加到目录，按文件名排序）
git add research_report_*.md research_plan_*.md README.md
git commit -m "docs: add research report - <topic>"
git push
```
