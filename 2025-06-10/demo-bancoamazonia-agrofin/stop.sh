#!/bin/bash

echo "Parando o Sistema de Financiamento Agropecuário do Banco da Amazônia"
echo "-----------------------------------------------------------------------"

# Encontrar e matar processos
BACKEND_PID=$(ps aux | grep "node minimal-server.js" | grep -v grep | awk '{print $2}')
FRONTEND_PID=$(ps aux | grep "npm start" | grep "PORT=8099" | grep -v grep | awk '{print $2}')

# Parar backend
if [ ! -z "$BACKEND_PID" ]; then
  echo "Parando backend (PID: $BACKEND_PID)..."
  kill -9 $BACKEND_PID
  echo "Backend parado com sucesso!"
else
  echo "Backend não está em execução."
fi

# Parar frontend
if [ ! -z "$FRONTEND_PID" ]; then
  echo "Parando frontend (PID: $FRONTEND_PID)..."
  kill -9 $FRONTEND_PID
  echo "Frontend parado com sucesso!"
else
  echo "Frontend não está em execução."
fi

echo "-----------------------------------------------------------------------"
echo "Sistema parado com sucesso!"
echo "Para iniciar novamente, execute: ./start.sh"