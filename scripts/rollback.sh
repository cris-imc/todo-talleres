#!/bin/bash
# ===========================================
# rollback.sh — Restaurar versión anterior
# Uso en servidor: bash rollback.sh
# ===========================================
cd ~/todo-talleres

echo "Iniciando rollback..."

if [ ! -d ".next.bak" ]; then
  echo "ERROR: No se encontro backup (.next.bak). Ejecuta un deploy primero."
  exit 1
fi

rm -rf .next.failed 2>/dev/null || true
mv .next .next.failed 2>/dev/null || true
mv .next.bak .next

pm2 reload all

echo "Rollback completado. La version anterior esta activa."
echo "Version fallida guardada en .next.failed (borrar con: rm -rf ~/todo-talleres/.next.failed)"
