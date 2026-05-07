#!/usr/bin/env bash
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ENV_FILE="$SCRIPT_DIR/.env"

if [ ! -f "$ENV_FILE" ]; then
  echo "错误: 未找到 .env 文件，请复制 .env.example 并填写"
  exit 1
fi

# shellcheck disable=SC1090
source "$ENV_FILE"

# 检查必填变量
for var in SERVER_USER SERVER_IP SSH_PASS DOMAIN DEPLOY_PATH REPO_URL; do
  if [ -z "${!var}" ]; then
    echo "错误: .env 中 $var 未填写"
    exit 1
  fi
done

SSH_PORT="${SERVER_PORT:-22}"
SSH_TARGET="$SERVER_USER@$SERVER_IP"
SSHPASS="sshpass -p $SSH_PASS"

echo ">>> 检查本地依赖 sshpass..."
if ! command -v sshpass &>/dev/null; then
  echo "错误: 未安装 sshpass，请执行: sudo apt install sshpass"
  exit 1
fi

echo ">>> 生成 nginx.conf..."
envsubst '${DOMAIN}' < "$SCRIPT_DIR/nginx.conf.template" > "$SCRIPT_DIR/nginx.conf"

echo ">>> 同步配置文件到服务器..."
$SSHPASS rsync -avz --delete \
  -e "ssh -p $SSH_PORT -o StrictHostKeyChecking=no" \
  "$SCRIPT_DIR/docker-compose.yml" \
  "$SCRIPT_DIR/nginx.conf" \
  "$SSH_TARGET:$DEPLOY_PATH/"

echo ">>> 在服务器上拉取博客内容并启动容器..."
$SSHPASS ssh -p "$SSH_PORT" -o StrictHostKeyChecking=no "$SSH_TARGET" bash <<EOF
  set -e
  cd $DEPLOY_PATH

  if [ -d "dist/.git" ]; then
    echo "--- 更新博客内容..."
    cd dist && git pull && cd ..
  else
    echo "--- 首次克隆博客内容..."
    rm -rf dist
    git clone --depth=1 --branch master $REPO_URL dist
  fi

  echo "--- 启动容器..."
  docker compose up -d --pull always
  echo "--- 容器状态:"
  docker compose ps
EOF

echo ""
echo "部署完成，访问 http://$DOMAIN"
