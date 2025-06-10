#!/bin/bash

# Script para iniciar o Analisador de Risco de Cliente PJ via CNPJ
# Este script verifica os requisitos, instala dependências se necessário e inicia a aplicação

# Definir cores para saída
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Definir caminho base do projeto
BASE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
BACKEND_DIR="$BASE_DIR/backend"
FRONTEND_DIR="$BASE_DIR/frontend"

echo -e "${GREEN}=== Analisador de Risco de Cliente PJ via CNPJ ===${NC}"
echo -e "${GREEN}=== Script de inicialização ===${NC}"
echo -e "Diretório base: $BASE_DIR"

# Verificar se o Node.js está instalado
echo -e "\n${YELLOW}Verificando se o Node.js está instalado...${NC}"
if ! command -v node &> /dev/null; then
    echo -e "${RED}Node.js não encontrado. Instalando...${NC}"
    curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
    sudo apt-get install -y nodejs
    echo -e "${GREEN}Node.js instalado com sucesso!${NC}"
else
    NODE_VERSION=$(node -v)
    echo -e "${GREEN}Node.js já está instalado: $NODE_VERSION${NC}"
fi

# Verificar se o npm está instalado
echo -e "\n${YELLOW}Verificando se o npm está instalado...${NC}"
if ! command -v npm &> /dev/null; then
    echo -e "${RED}npm não encontrado. Instalando...${NC}"
    sudo apt-get install -y npm
    echo -e "${GREEN}npm instalado com sucesso!${NC}"
else
    NPM_VERSION=$(npm -v)
    echo -e "${GREEN}npm já está instalado: $NPM_VERSION${NC}"
fi

# Instalar dependências do backend
echo -e "\n${YELLOW}Instalando dependências do backend...${NC}"
cd "$BACKEND_DIR" || { echo -e "${RED}Diretório do backend não encontrado!${NC}"; exit 1; }
npm install
echo -e "${GREEN}Dependências do backend instaladas com sucesso!${NC}"

# Instalar dependências do frontend
echo -e "\n${YELLOW}Instalando dependências do frontend...${NC}"
cd "$FRONTEND_DIR" || { echo -e "${RED}Diretório do frontend não encontrado!${NC}"; exit 1; }
npm install
echo -e "${GREEN}Dependências do frontend instaladas com sucesso!${NC}"

# Criar diretório para o banco de dados
echo -e "\n${YELLOW}Verificando diretório para banco de dados...${NC}"
mkdir -p "$BACKEND_DIR/data"
echo -e "${GREEN}Diretório para banco de dados verificado!${NC}"

# Iniciar o backend
echo -e "\n${YELLOW}Iniciando o backend...${NC}"
cd "$BACKEND_DIR" || { echo -e "${RED}Diretório do backend não encontrado!${NC}"; exit 1; }
npm start &
BACKEND_PID=$!
echo $BACKEND_PID > "$BASE_DIR/scripts/backend.pid"
echo -e "${GREEN}Backend iniciado com PID: $BACKEND_PID${NC}"

# Aguardar alguns segundos para o backend iniciar
echo -e "${YELLOW}Aguardando o backend iniciar...${NC}"
sleep 5

# Iniciar o frontend
echo -e "\n${YELLOW}Iniciando o frontend...${NC}"
cd "$FRONTEND_DIR" || { echo -e "${RED}Diretório do frontend não encontrado!${NC}"; exit 1; }
npm start &
FRONTEND_PID=$!
echo $FRONTEND_PID > "$BASE_DIR/scripts/frontend.pid"
echo -e "${GREEN}Frontend iniciado com PID: $FRONTEND_PID${NC}"

echo -e "\n${GREEN}=== Aplicação iniciada com sucesso! ===${NC}"
echo -e "${GREEN}Backend disponível em: http://localhost:3001${NC}"
echo -e "${GREEN}Frontend disponível em: http://localhost:3000${NC}"
echo -e "${YELLOW}Para parar a aplicação, execute o script stop.sh${NC}"

exit 0