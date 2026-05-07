#!/usr/bin/env bash
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ENV_FILE="$SCRIPT_DIR/.env"

if [ ! -f "$ENV_FILE" ]; then
  echo "错误: 未找到 .env 文件"
  exit 1
fi

# shellcheck disable=SC1090
source "$ENV_FILE"

SSH_PORT="${SERVER_PORT:-22}"
SSH_TARGET="$SERVER_USER@$SERVER_IP"
SSHPASS="sshpass -p $SSH_PASS"

echo ">>> 停止并移除容器..."
$SSHPASS ssh -p "$SSH_PORT" -o StrictHostKeyChecking=no "$SSH_TARGET" bash <<EOF
  set -e
  cd $DEPLOY_PATH
  docker compose down
  echo "--- 容器已停止"
EOF

read -rp "是否同时删除服务器上的部署目录 $DEPLOY_PATH？[y/N] " confirm
if [[ "$confirm" =~ ^[Yy]$ ]]; then
  $SSHPASS ssh -p "$SSH_PORT" -o StrictHostKeyChecking=no "$SSH_TARGET" "rm -rf $DEPLOY_PATH"
  echo "部署目录已删除"
fi

echo "完成"
