#!/bin/bash

# Script para parar o Analisador de Risco de Cliente PJ via CNPJ

# Define o diretório base
BASE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
LOG_DIR="$BASE_DIR/logs"

# Função para exibir mensagens
log() {
  echo "$(date '+%Y-%m-%d %H:%M:%S') - $1"
}

# Função para parar um processo
stop_process() {
  if [ -f "$LOG_DIR/$1.pid" ]; then
    PID=$(cat "$LOG_DIR/$1.pid")
    if ps -p $PID > /dev/null; then
      log "Parando $1 (PID: $PID)..."
      kill $PID
      sleep 2
      
      # Verifica se o processo ainda está em execução
      if ps -p $PID > /dev/null; then
        log "Forçando parada de $1 (PID: $PID)..."
        kill -9 $PID
      fi
      
      log "$1 parado com sucesso."
    else
      log "$1 não está em execução."
    fi
    rm -f "$LOG_DIR/$1.pid"
  else
    log "Arquivo PID para $1 não encontrado."
  fi
}

# Para o frontend
stop_process "frontend"

# Para o backend
stop_process "backend"

log "Sistema parado com sucesso!"