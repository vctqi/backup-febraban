#!/bin/bash

# Inicia o back-end
echo "Iniciando o servidor back-end na porta 5999..."
cd backend
npm start &
BACKEND_PID=$!

# Aguarda o back-end iniciar
sleep 3

# Inicia o front-end
echo "Iniciando o servidor front-end na porta 8999..."
cd ../frontend
npm start &
FRONTEND_PID=$!

# Função para encerrar os processos quando o script for interrompido
cleanup() {
    echo "Encerrando servidores..."
    kill $BACKEND_PID
    kill $FRONTEND_PID
    exit 0
}

# Captura o sinal de interrupção (Ctrl+C)
trap cleanup SIGINT

# Mantém o script em execução
echo "Servidores em execução. Pressione Ctrl+C para encerrar."
wait