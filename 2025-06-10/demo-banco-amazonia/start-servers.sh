#!/bin/bash

# Iniciar o backend
echo "Iniciando o servidor backend na porta 5019..."
cd ~/demo-banco-amazonia/backend && PORT=5019 node server.js &
BACKEND_PID=$!

# Aguardar um momento para o backend iniciar
sleep 2

# Iniciar o frontend
echo "Iniciando o servidor frontend na porta 8087..."
cd ~/demo-banco-amazonia/frontend && PORT=8087 npx react-scripts start &
FRONTEND_PID=$!

# Função para lidar com encerramento
cleanup() {
  echo "Encerrando servidores..."
  kill $BACKEND_PID $FRONTEND_PID
  exit 0
}

# Configurar trap para sinais de encerramento
trap cleanup SIGINT SIGTERM

# Mensagem de sucesso
echo "Servidores iniciados com sucesso!"
echo "Backend: http://localhost:5019"
echo "Frontend: http://localhost:8087"
echo "Pressione Ctrl+C para encerrar os servidores"

# Manter o script rodando
wait