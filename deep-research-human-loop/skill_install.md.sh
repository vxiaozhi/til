mkdir -p .claude/skills
mkdir -p .claude/agents

git clone https://github.com/Weizhena/deep-research-skills.git
cd deep-research-skills

# 英文版
cp -r skills/research-en/* ../.claude/skills/
# 中文版
cp -r skills/research-zh/* ../.claude/skills/

# 安装必要的 web-search-agent
cp agents/web-search-agent.md ../.claude/agents/
cp -r agents/web-search-modules ../.claude/agents/

pip install pyyaml
