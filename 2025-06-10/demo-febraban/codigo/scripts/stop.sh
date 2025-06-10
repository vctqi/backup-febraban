#!/bin/bash

# Script para parar o Analisador de Risco de Cliente PJ via CNPJ

# Definir cores para saída
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Definir caminho base do projeto
BASE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
BACKEND_PID_FILE="$BASE_DIR/scripts/backend.pid"
FRONTEND_PID_FILE="$BASE_DIR/scripts/frontend.pid"

echo -e "${GREEN}=== Analisador de Risco de Cliente PJ via CNPJ ===${NC}"
echo -e "${GREEN}=== Script de encerramento ===${NC}"

# Verificar e parar o backend
if [ -f "$BACKEND_PID_FILE" ]; then
    BACKEND_PID=$(cat "$BACKEND_PID_FILE")
    echo -e "${YELLOW}Parando o backend (PID: $BACKEND_PID)...${NC}"
    
    if ps -p "$BACKEND_PID" > /dev/null; then
        kill "$BACKEND_PID"
        sleep 2
        
        # Verificar se o processo ainda está em execução
        if ps -p "$BACKEND_PID" > /dev/null; then
            echo -e "${YELLOW}Processo não encerrou normalmente. Forçando encerramento...${NC}"
            kill -9 "$BACKEND_PID" 2>/dev/null
        fi
        
        echo -e "${GREEN}Backend parado com sucesso!${NC}"
    else
        echo -e "${YELLOW}Processo do backend não está em execução.${NC}"
    fi
    
    rm -f "$BACKEND_PID_FILE"
else
    echo -e "${YELLOW}Arquivo PID do backend não encontrado.${NC}"
    
    # Tentar encontrar e matar processos Node.js relacionados ao backend
    echo -e "${YELLOW}Tentando encontrar processos do backend...${NC}"
    BACKEND_PIDS=$(ps aux | grep 'node.*backend' | grep -v grep | awk '{print $2}')
    
    if [ -n "$BACKEND_PIDS" ]; then
        echo -e "${YELLOW}Processos encontrados: $BACKEND_PIDS${NC}"
        for PID in $BACKEND_PIDS; do
            echo -e "${YELLOW}Parando processo $PID...${NC}"
            kill "$PID" 2>/dev/null
            sleep 1
            kill -9 "$PID" 2>/dev/null
        done
        echo -e "${GREEN}Processos do backend parados!${NC}"
    else
        echo -e "${YELLOW}Nenhum processo do backend encontrado.${NC}"
    fi
fi

# Verificar e parar o frontend
if [ -f "$FRONTEND_PID_FILE" ]; then
    FRONTEND_PID=$(cat "$FRONTEND_PID_FILE")
    echo -e "${YELLOW}Parando o frontend (PID: $FRONTEND_PID)...${NC}"
    
    if ps -p "$FRONTEND_PID" > /dev/null; then
        kill "$FRONTEND_PID"
        sleep 2
        
        # Verificar se o processo ainda está em execução
        if ps -p "$FRONTEND_PID" > /dev/null; then
            echo -e "${YELLOW}Processo não encerrou normalmente. Forçando encerramento...${NC}"
            kill -9 "$FRONTEND_PID" 2>/dev/null
        fi
        
        echo -e "${GREEN}Frontend parado com sucesso!${NC}"
    else
        echo -e "${YELLOW}Processo do frontend não está em execução.${NC}"
    fi
    
    rm -f "$FRONTEND_PID_FILE"
else
    echo -e "${YELLOW}Arquivo PID do frontend não encontrado.${NC}"
    
    # Tentar encontrar e matar processos Node.js relacionados ao frontend
    echo -e "${YELLOW}Tentando encontrar processos do frontend...${NC}"
    FRONTEND_PIDS=$(ps aux | grep 'node.*frontend' | grep -v grep | awk '{print $2}')
    
    if [ -n "$FRONTEND_PIDS" ]; then
        echo -e "${YELLOW}Processos encontrados: $FRONTEND_PIDS${NC}"
        for PID in $FRONTEND_PIDS; do
            echo -e "${YELLOW}Parando processo $PID...${NC}"
            kill "$PID" 2>/dev/null
            sleep 1
            kill -9 "$PID" 2>/dev/null
        done
        echo -e "${GREEN}Processos do frontend parados!${NC}"
    else
        echo -e "${YELLOW}Nenhum processo do frontend encontrado.${NC}"
    fi
fi

# Matar todos os processos do Node.js relacionados à aplicação (fallback)
echo -e "${YELLOW}Verificando se ainda existem processos relacionados à aplicação...${NC}"
NODE_PIDS=$(ps aux | grep 'node' | grep -E 'backend|frontend' | grep -v grep | awk '{print $2}')

if [ -n "$NODE_PIDS" ]; then
    echo -e "${YELLOW}Ainda existem processos Node.js: $NODE_PIDS${NC}"
    echo -e "${YELLOW}Parando todos os processos relacionados...${NC}"
    
    for PID in $NODE_PIDS; do
        echo -e "${YELLOW}Parando processo $PID...${NC}"
        kill -9 "$PID" 2>/dev/null
    done
    
    echo -e "${GREEN}Todos os processos relacionados foram parados!${NC}"
else
    echo -e "${GREEN}Nenhum processo relacionado encontrado.${NC}"
fi

echo -e "\n${GREEN}=== Aplicação encerrada com sucesso! ===${NC}"

exit 0