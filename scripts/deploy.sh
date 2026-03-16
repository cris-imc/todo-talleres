#!/bin/bash
# ===========================================
# deploy.sh — Deploy con backup para rollback
# Uso: bash scripts/deploy.sh
# ===========================================
set -e

SSH_KEY="C:/Users/marti/Downloads/ssh-key-2026-03-14.key"
SERVER="ubuntu@159.112.130.22"
REMOTE_DIR="~/todo-talleres"

echo "📦 Compilando proyecto..."
npm run build

echo "📁 Generando paquete..."
tar.exe -czf build-full.tar.gz --exclude=".next/cache" .next src scripts

echo "🚀 Subiendo al servidor..."
scp -i "$SSH_KEY" -o StrictHostKeyChecking=no build-full.tar.gz ${SERVER}:${REMOTE_DIR}/

echo "🔄 Aplicando en servidor (con backup)..."
ssh -i "$SSH_KEY" -o StrictHostKeyChecking=no $SERVER "
  cd $REMOTE_DIR

  # Guardar copia anterior como backup para rollback
  if [ -d '.next' ]; then
    echo 'Creando backup de versión anterior...'
    rm -rf .next.bak 2>/dev/null || true
    cp -r .next .next.bak
    echo '✅ Backup creado en .next.bak'
  fi

  # Applying new build
  rm -rf .next
  tar -xzf build-full.tar.gz

  # Restart app
  pm2 reload all

  echo '✅ Deploy completado.'
  echo '↩️  Para rollback: ssh -i [key] $SERVER \"cd $REMOTE_DIR && bash rollback.sh\"'
"

echo "🎉 Deploy finalizado con éxito!"
