## Python语言

- [uv](https://github.com/astral-sh/uv) Rust实现的 python 包管理器，比 Pip 快 10-100 倍。
- [sqlalchemy/alembic](https://github.com/sqlalchemy/alembic) SQLAlchemy的数据库迁移工具。


## Python 多版本虚拟环境

Python 3.3+ 内置了 venv 模块，无需额外安装。

```
# 创建虚拟环境
python3.{version} -m venv myenv

# 激活虚拟环境
source myenv/bin/activate  # macOS/Linux
# 或 Windows: myenv\Scripts\activate

# 在虚拟环境中安装包
pip install 你的包名
```
