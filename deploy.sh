#!/usr/bin/env bash
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ENV_FILE="$SCRIPT_DIR/.env"

if [ ! -f "$ENV_FILE" ]; then
  echo "错误: 未找到 .env 文件，请复制 .env.example 并填写"
  exit 1
fi

# set -a 让 source 的变量自动 export，envsubst 才能读到
set -a
# shellcheck disable=SC1090
source "$ENV_FILE"
set +a

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
  echo "--- 未安装 sshpass，正在安装..."
  sudo apt-get install -y sshpass
fi

echo ">>> 初始化服务器环境..."
$SSHPASS ssh -p "$SSH_PORT" -o StrictHostKeyChecking=no "$SSH_TARGET" bash <<'SETUP'
  set -e
  echo "--- 运行环境: $(whoami)@$(hostname)"

  # 安装 Docker（使用阿里云镜像，适配国内服务器）
  if ! command -v docker &>/dev/null; then
    echo "--- 安装 Docker..."
    curl -fsSL https://get.docker.com | bash -s docker --mirror Aliyun
  else
    echo "--- Docker 已安装: $(docker --version)"
  fi

  # 配置 Docker 国内镜像源
  if [ ! -f /etc/docker/daemon.json ]; then
    echo "--- 配置 Docker 镜像源..."
    sudo tee /etc/docker/daemon.json > /dev/null <<'JSON'
{
  "registry-mirrors": [
    "https://docker.m.daocloud.io",
    "https://dockerpull.org",
    "https://hub-mirror.c.163.com"
  ]
}
JSON
    sudo systemctl restart docker
  fi

  # 安装 git（通常已有，以防万一）
  if ! command -v git &>/dev/null; then
    echo "--- 安装 git..."
    apt-get install -y git 2>/dev/null || yum install -y git
  fi
SETUP

echo ">>> 创建部署目录..."
$SSHPASS ssh -p "$SSH_PORT" -o StrictHostKeyChecking=no "$SSH_TARGET" "mkdir -p $DEPLOY_PATH"

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

  echo "--- 启动/重启容器..."
  sudo docker compose up -d --pull always
  sudo docker compose restart
  echo "--- 容器状态:"
  sudo docker compose ps
EOF

echo ""
echo "部署完成，访问 http://$DOMAIN"
