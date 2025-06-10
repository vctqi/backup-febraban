#!/bin/bash

# Script principal para parar o Analisador de Risco de Cliente PJ via CNPJ
# Este script chama o script de encerramento interno

# Definir caminho base do projeto
BASE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SCRIPT_PATH="$BASE_DIR/codigo/scripts/stop.sh"

# Verificar se o script interno existe
if [ -f "$SCRIPT_PATH" ]; then
    # Tornar o script executável, caso não esteja
    chmod +x "$SCRIPT_PATH"
    
    # Executar o script interno
    "$SCRIPT_PATH"
else
    echo "Erro: Script interno não encontrado em $SCRIPT_PATH"
    exit 1
fi