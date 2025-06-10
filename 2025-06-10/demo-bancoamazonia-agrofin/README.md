# Sistema de Financiamento Agropecuário - Banco da Amazônia

Este projeto é uma demonstração funcional de um sistema de financiamento agropecuário, seguindo o padrão de layout do Banco da Amazônia.

## ⚡ Início Rápido

```bash
# Iniciar toda a aplicação
./start.sh

# Parar toda a aplicação
./stop.sh
```

Acesse:
- Frontend (Interface de usuário): http://localhost:8099
- Backend (API): http://localhost:5099

## ✨ Funcionalidades

- **Simulador de Financiamento:** Permite simular financiamentos com base em valor, renda, tipo de financiamento e prazo
- **Sugestão Personalizada:** Utiliza a faixa de renda do cliente para otimizar o risco e diminuir taxas
- **Informações Detalhadas:** Apresenta taxas, valores, parcelas e condições de pagamento
- **Interface Responsiva:** Layout adaptável para diferentes dispositivos

## 🏗️ Estrutura do Projeto

O projeto está dividido em duas partes:

### Backend

- **Tecnologia:** Node.js com Express
- **Porta:** 5099
- **Arquivos principais:**
  - `minimal-server.js`: Servidor simplificado para demonstração
  - `simple-server.js`: Implementação mais completa com todas as regras de negócio
  - `test-api.js`: Script para testar a API de opções
  - `test-simulacao.js`: Script para testar a simulação de financiamento

### Frontend

- **Tecnologia:** React.js
- **Porta:** 8099
- **Arquivos principais:**
  - `src/App.simple.js`: Implementação simplificada da interface
  - `src/index.simple.js`: Ponto de entrada simplificado
  - `src/App.css`: Estilos da aplicação

## 🧪 Como Testar

Para testar a API manualmente:

```bash
# Testar API de opções
node test-api.js

# Testar simulação de financiamento
node test-simulacao.js
```

## 📋 Instalação Manual

### Requisitos

- Node.js (versão 12 ou superior)
- npm (versão 6 ou superior)

### Passos para Execução Manual

1. **Iniciar o Backend:**

```bash
cd backend
npm install
node minimal-server.js
```

2. **Iniciar o Frontend:**

```bash
cd frontend
npm install
PORT=8099 npm start
```

## 📚 Regras de Negócio

### Classificação de Risco

- **Baixo:** Renda mensal acima de R$ 5.000
- **Médio:** Renda mensal abaixo de R$ 5.000

### Cálculo de Taxas

- Classificação de risco "Baixo": 7,5% ao ano
- Classificação de risco "Médio": 9,5% ao ano

### Cálculo do Valor Máximo

- Baseado na capacidade de pagamento (30% da renda mensal)
- Considera o prazo total do financiamento
- Aplica fator de segurança de 80%

## 📝 Notas Técnicas

1. **Versão Simplificada**
   - Esta é uma versão simplificada para demonstração
   - O sistema completo incluiria mais recursos e telas

2. **Dados Simulados**
   - Todos os dados e cálculos são simulados
   - Em um ambiente real, seria necessário integração com sistemas de crédito

3. **Layout**
   - O layout segue o padrão visual do Banco da Amazônia
   - Cores principais: Verde (#006B3F) e branco

## 📅 Próximos Passos

- Implementação de autenticação de usuários
- Armazenamento de simulações realizadas
- Dashboard administrativo para análise de dados
- Integração com sistemas de aprovação de crédito