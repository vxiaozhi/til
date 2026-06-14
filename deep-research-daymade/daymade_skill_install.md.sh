mkdir -p .claude/skills
mkdir -p .claude/agents

git clone https://github.com/daymade/claude-code-skills.git 
cd claude-code-skills

cp -rv deep-research ../.claude/skills/

