#!/bin/bash

echo "Iniciando o Sistema de Financiamento Agropecuário do Banco da Amazônia"
echo "-----------------------------------------------------------------------"

# Verificar se os processos já estão rodando
BACKEND_PID=$(ps aux | grep "node minimal-server.js" | grep -v grep | awk '{print $2}')
FRONTEND_PID=$(ps aux | grep "PORT=8099 BROWSER=none npm start" | grep -v grep | awk '{print $2}')

# Matar processos existentes se necessário
if [ ! -z "$BACKEND_PID" ]; then
  echo "Parando backend existente (PID: $BACKEND_PID)..."
  kill -9 $BACKEND_PID
fi

if [ ! -z "$FRONTEND_PID" ]; then
  echo "Parando frontend existente (PID: $FRONTEND_PID)..."
  kill -9 $FRONTEND_PID
fi

# Iniciar backend
echo "Iniciando backend na porta 5099..."
cd /home/aicube/demo-bancoamazonia-agrofin/backend
node minimal-server.js > ../backend.log 2>&1 &
BACKEND_PID=$!
echo "Backend iniciado com PID: $BACKEND_PID"

# Iniciar frontend
echo "Iniciando frontend na porta 8099..."
cd /home/aicube/demo-bancoamazonia-agrofin/frontend
PORT=8099 BROWSER=none npm start > ../frontend.log 2>&1 &
FRONTEND_PID=$!
echo "Frontend iniciado com PID: $FRONTEND_PID"

echo "-----------------------------------------------------------------------"
echo "Sistema iniciado com sucesso!"
echo "Frontend: http://localhost:8099"
echo "Backend API: http://localhost:5099"
echo "-----------------------------------------------------------------------"
echo "Logs:"
echo "  - Backend: $(dirname "$0")/backend.log"
echo "  - Frontend: $(dirname "$0")/frontend.log"
echo "-----------------------------------------------------------------------"
echo "Para parar o sistema, execute: ./stop.sh"