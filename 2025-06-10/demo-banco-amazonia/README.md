# Simulador de Financiamento Agropecuário - Banco da Amazônia

Este projeto é uma demonstração de um sistema de financiamento agropecuário, inspirado no layout do Banco da Amazônia.

## Funcionalidades

- Simulação de financiamento agropecuário com base em diferentes parâmetros
- Análise de perfil de risco e sugestão de melhores opções de financiamento
- Comparativo visual entre diferentes linhas de crédito
- Interface adaptada ao estilo visual do Banco da Amazônia

## Estrutura do Projeto

O projeto está dividido em duas partes principais:

- **Backend**: API REST desenvolvida com Node.js e Express
- **Frontend**: Interface de usuário desenvolvida com React

## Tecnologias Utilizadas

### Backend
- Node.js
- Express
- Cors
- Morgan

### Frontend
- React
- React Router
- React Bootstrap
- Chart.js
- Axios
- React Icons
- React Toastify

## Portas de Serviço

- Backend: 5019
- Frontend: 8087

## Como Executar

1. Certifique-se de ter Node.js instalado em seu sistema
2. Clone este repositório
3. Execute o script de inicialização:

```bash
./start-servers.sh
```

Ou inicie manualmente cada serviço:

```bash
# Iniciar o backend
cd backend
PORT=5019 node server.js

# Em outro terminal, iniciar o frontend
cd frontend
PORT=8087 npm start
```

4. Acesse o aplicativo em: http://localhost:8087

## Endpoints da API

- `GET /api/linhas-credito`: Retorna todas as linhas de crédito disponíveis
- `GET /api/perfis-risco`: Retorna informações sobre os perfis de risco
- `POST /api/simulacao`: Realiza a simulação de financiamento com base nos dados fornecidos

## Observações

Este é um projeto de demonstração para fins educacionais e não representa o site oficial do Banco da Amazônia. Todos os dados de simulação são fictícios.