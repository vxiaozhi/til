#!/usr/bin/env bash
#
# setup_zellij_web.sh
# 一键配置 Zellij Web 服务：
#   - 使用 mkcert 生成自签 SSL 证书
#   - 监听地址改为 0.0.0.0
#   - 创建登录令牌
#
# 前置条件：已安装 zellij（>= 0.43.0）
#

set -euo pipefail

ZELLIJ_CONFIG="$HOME/.config/zellij/config.kdl"
CERT_DIR="$HOME/.config/zellij/certs"
CERT_FILE="$CERT_DIR/zellij-web.pem"
KEY_FILE="$CERT_DIR/zellij-web-key.pem"
WEB_PORT="${ZELLIJ_WEB_PORT:-8088}"

# ---- 工具函数 ----
red()    { printf '\033[31m%s\033[0m\n' "$*"; }
green()  { printf '\033[32m%s\033[0m\n' "$*"; }
yellow() { printf '\033[33m%s\033[0m\n' "$*"; }
blue()   { printf '\033[34m%s\033[0m\n' "$*"; }

die() { red "[ERROR] $*" >&2; exit 1; }

require() {
    command -v "$1" >/dev/null 2>&1 || die "$1 is not installed. Please install it first."
}

# ---- Step 0: 环境检查 ----
echo ""
blue "=========================================="
blue " Zellij Web 一键配置脚本"
blue "=========================================="
echo ""

require zellij

ZELLIJ_VER=$(zellij --version | grep -oP '[\d.]+' | head -1)
green "[OK] zellij version: $ZELLIJ_VER"

# ---- Step 1: 安装/检查 mkcert ----
echo ""
blue "[1/5] 检查 mkcert ..."

if ! command -v mkcert >/dev/null 2>&1; then
    yellow "  mkcert 未安装，正在安装..."
    if command -v brew >/dev/null 2>&1; then
        brew install mkcert
    elif command -v apt-get >/dev/null 2>&1; then
        sudo apt-get update && sudo apt-get install -y libnss3-tools
        MKCERT_URL="https://github.com/FiloSottile/mkcert/releases/latest/download/mkcert-v$(curl -sL https://github.com/FiloSottile/mkcert/releases/latest | grep -oP 'v[\d.]+' | head -1 | sed 's/^v//')-linux-amd64"
        curl -fsSLo /tmp/mkcert "$MKCERT_URL" && chmod +x /tmp/mkcert && sudo mv /tmp/mkcert /usr/local/bin/mkcert
    elif command -v dnf >/dev/null 2>&1; then
        sudo dnf install -y mkcert
    else
        die "无法自动安装 mkcert，请手动安装后重试。"
    fi
    green "  mkcert 安装完成"
else
    green "  mkcert 已安装: $(mkcert --version 2>/dev/null || echo 'ok')"
fi

# ---- Step 2: 生成 SSL 证书 ----
echo ""
blue "[2/5] 生成 SSL 证书 ..."

mkdir -p "$CERT_DIR"

# 获取本机局域网 IP
LOCAL_IPS="localhost 127.0.0.1 0.0.0.0"
if command -v hostname >/dev/null 2>&1; then
    LAN_IP=$(hostname -I 2>/dev/null | awk '{print $1}' || true)
    if [ -n "${LAN_IP:-}" ]; then
        LOCAL_IPS="$LOCAL_IPS $LAN_IP"
    fi
fi

# 安装本地 CA（首次需要 sudo）
if [ ! -f "$(mkcert -CAROOT 2>/dev/null)/rootCA.pem" ]; then
    yellow "  首次使用 mkcert，正在安装本地 CA..."
    mkcert -install
fi

# 生成证书
# shellcheck disable=SC2086
mkcert -key-file "$KEY_FILE" -cert-file "$CERT_FILE" $LOCAL_IPS 2>&1
green "  证书已生成:"
green "    证书: $CERT_FILE"
green "    私钥: $KEY_FILE"

# ---- Step 3: 更新 Zellij 配置 ----
echo ""
blue "[3/5] 更新 Zellij 配置文件 ..."

if [ ! -f "$ZELLIJ_CONFIG" ]; then
    die "配置文件不存在: $ZELLIJ_CONFIG，请先运行 zellij 初始化配置。"
fi

# 备份原配置
BACKUP="$ZELLIJ_CONFIG.bak.$(date +%Y%m%d_%H%M%S)"
cp "$ZELLIJ_CONFIG" "$BACKUP"
green "  原配置已备份到: $BACKUP"

# 辅助函数：设置或替换 KDL 配置项
# 用法: set_kdl_option <key> <value> [is_quoted]
set_kdl_option() {
    local key="$1"
    local value="$2"
    local quoted="${3:-false}"

    if [ "$quoted" = "true" ]; then
        value="\"$value\""
    fi

    # 注释掉所有已存在的行（包括注释行和未注释行）
    sed -i "s|^\([[:space:]]*\)${key}[[:space:]].*|// \0|" "$ZELLIJ_CONFIG"

    # 在 web_server 相关注释区域后追加新配置
    # 找到 "web_server_ip" 的注释行区域后插入
    if grep -q "^[[:space:]]*web_server_ip" "$ZELLIJ_CONFIG" 2>/dev/null || \
       grep -q "^//.*web_server_ip" "$ZELLIJ_CONFIG" 2>/dev/null; then
        # 在最后一个 web_server 相关行后添加
        :
    fi

    # 直接在文件末尾追加（Zellij 支持任意顺序）
    echo "${key} ${value}" >> "$ZELLIJ_CONFIG"
}

# 设置各项配置
set_kdl_option "web_server" "true" false
set_kdl_option "web_server_ip" "0.0.0.0" true
set_kdl_option "web_server_port" "$WEB_PORT" false
set_kdl_option "web_server_cert" "$CERT_FILE" true
set_kdl_option "web_server_key" "$KEY_FILE" true

green "  已更新以下配置项:"
green "    web_server: true"
green "    web_server_ip: \"0.0.0.0\""
green "    web_server_port: $WEB_PORT"
green "    web_server_cert: \"$CERT_FILE\""
green "    web_server_key: \"$KEY_FILE\""

# ---- Step 4: 配置防火墙（如果启用） ----
echo ""
blue "[4/5] 检查防火墙 ..."

if command -v ufw >/dev/null 2>&1 && ufw status | grep -q "active" 2>/dev/null; then
    yellow "  ufw 防火墙已启用，正在开放端口 $WEB_PORT..."
    sudo ufw allow "$WEB_PORT"/tcp 2>/dev/null || true
    green "  已开放端口 $WEB_PORT"
elif command -v firewall-cmd >/dev/null 2>&1 && systemctl is-active --quiet firewalld 2>/dev/null; then
    yellow "  firewalld 已启用，正在开放端口 $WEB_PORT..."
    sudo firewall-cmd --add-port="$WEB_PORT/tcp" --permanent 2>/dev/null || true
    sudo firewall-cmd --reload 2>/dev/null || true
    green "  已开放端口 $WEB_PORT"
else
    yellow "  未检测到防火墙或防火墙未启用，跳过。"
fi

# ---- Step 5: 创建令牌 ----
echo ""
blue "[5/5] 创建访问令牌 ..."

# 先检查 Web 服务是否已在运行
if zellij web --status 2>/dev/null; then
    yellow "  Web 服务已在运行"
else
    yellow "  Web 服务尚未启动。"
    yellow "  正在以后台模式启动 Web 服务..."
    if zellij web --daemonize 2>&1; then
        sleep 2
        if zellij web --status 2>/dev/null; then
            green "  Web 服务启动成功"
        else
            red "  Web 服务启动失败，请手动执行: zellij web --daemonize"
        fi
    else
        red "  Web 服务启动失败，请手动执行: zellij web --daemonize"
    fi
fi

# 先撤销旧令牌（如果存在）
echo ""
yellow "  正在清理旧令牌..."
EXISTING_TOKENS=$(zellij web --list-tokens 2>/dev/null | grep -oP '^\S+' || true)
if [ -n "${EXISTING_TOKENS:-}" ]; then
    echo "$EXISTING_TOKENS" | while read -r t; do
        [ -n "$t" ] && zellij web --revoke-token "$t" 2>/dev/null || true
    done
fi

# 创建新令牌
echo ""
green "  创建读写令牌（仅显示一次，请立即保存）:"
echo "  ========================================"
zellij web --create-token 2>&1
echo "  ========================================"

echo ""
green "  创建只读令牌（仅显示一次，请立即保存）:"
echo "  ========================================"
zellij web --create-read-only-token 2>&1
echo "  ========================================"

# ---- 完成 ----
echo ""
blue "=========================================="
blue " 配置完成！"
blue "=========================================="
echo ""
green "  访问地址: https://<服务器IP>:$WEB_PORT"
green "  （本地访问: https://127.0.0.1:$WEB_PORT）"
echo ""
yellow "  重要提醒:"
yellow "  1. 令牌仅显示一次，请务必保存到安全位置。"
yellow "  2. 如果浏览器提示证书不受信任，请将 CA 根证书导入系统信任存储。"
yellow "     CA 根证书位置: $(mkcert -CAROOT 2>/dev/null)/rootCA.pem"
yellow "  3. 如需撤销令牌: zellij web --revoke-token <token-name>"
echo ""
yellow "  如需启动 Web 服务，请运行:"
yellow "    zellij web"
echo ""
