#!/bin/bash

# Script para iniciar o Analisador de Risco de Cliente PJ via CNPJ
# Este script verifica as dependências necessárias e inicia os serviços

# Define o diretório base
BASE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKEND_DIR="$BASE_DIR/backend"
FRONTEND_DIR="$BASE_DIR/frontend"
LOG_DIR="$BASE_DIR/logs"

# Função para exibir mensagens
log() {
  echo "$(date '+%Y-%m-%d %H:%M:%S') - $1"
}

# Função para verificar se um comando está disponível
check_command() {
  if ! command -v $1 &> /dev/null; then
    log "ERRO: $1 não está instalado. Instalando..."
    if [ "$1" = "node" ]; then
      log "Instalando Node.js..."
      curl -sL https://deb.nodesource.com/setup_18.x | sudo -E bash -
      sudo apt-get install -y nodejs
    elif [ "$1" = "npm" ]; then
      log "npm será instalado junto com o Node.js"
    else
      sudo apt-get update
      sudo apt-get install -y $1
    fi
    
    # Verifica se a instalação foi bem-sucedida
    if ! command -v $1 &> /dev/null; then
      log "ERRO: Falha ao instalar $1. Abortando."
      exit 1
    fi
  else
    log "$1 já está instalado."
  fi
}

# Cria diretório de logs se não existir
mkdir -p "$LOG_DIR"

# Verifica dependências
log "Verificando dependências..."
check_command node
check_command npm

# Verifica a versão do Node.js
NODE_VERSION=$(node -v | cut -d 'v' -f 2)
MAJOR_VERSION=$(echo $NODE_VERSION | cut -d '.' -f 1)

if [ "$MAJOR_VERSION" -lt 14 ]; then
  log "AVISO: Versão do Node.js ($NODE_VERSION) pode ser muito antiga. Recomendamos Node.js 14 ou superior."
fi

# Cria diretórios necessários para o backend
mkdir -p "$BACKEND_DIR/logs"

# Instala dependências do backend
log "Instalando dependências do backend..."
cd "$BACKEND_DIR"
npm install --silent

# Instala dependências do frontend
log "Instalando dependências do frontend..."
cd "$FRONTEND_DIR"
npm install --silent

# Inicia o backend
log "Iniciando o backend..."
cd "$BACKEND_DIR"
NODE_ENV=production nohup npm start > "$LOG_DIR/backend.log" 2>&1 &
BACKEND_PID=$!
echo $BACKEND_PID > "$LOG_DIR/backend.pid"
log "Backend iniciado com PID $BACKEND_PID"

# Aguarda o backend iniciar
log "Aguardando o backend inicializar..."
sleep 5

# Inicia o frontend
log "Iniciando o frontend..."
cd "$FRONTEND_DIR"
REACT_APP_API_URL=http://localhost:3001/api nohup npm start > "$LOG_DIR/frontend.log" 2>&1 &
FRONTEND_PID=$!
echo $FRONTEND_PID > "$LOG_DIR/frontend.pid"
log "Frontend iniciado com PID $FRONTEND_PID"

log "Sistema iniciado com sucesso!"
log "Backend disponível em: http://localhost:3001"
log "Frontend disponível em: http://localhost:3000"
log "Para parar o sistema, execute: ./stop.sh"