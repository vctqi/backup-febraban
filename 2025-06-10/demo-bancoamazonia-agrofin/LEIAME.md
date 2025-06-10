# Sistema de Financiamento Agropecuário - Banco da Amazônia

Este é um sistema de simulação de financiamento agropecuário para o Banco da Amazônia, com interface web e API.

## Funcionalidades

- Simulação de financiamento com base na renda e perfil do cliente
- Cálculo de taxa de juros baseado em classificação de risco
- Estimativa de valor máximo de financiamento
- Cálculo de parcelas e prazos
- Interface amigável seguindo o padrão visual do Banco da Amazônia

## Estrutura do Projeto

O projeto está dividido em duas partes:

### Backend (Porta 5099)

- Implementado em Node.js/Express
- API REST para simulação de financiamento
- Cálculo de risco, taxas e valores máximos

### Frontend (Porta 8099)

- Implementado em React.js
- Interface responsiva com padrão visual do Banco da Amazônia
- Formulário de simulação com sugestões personalizadas

## Como Executar

1. Iniciar o Backend:
```bash
cd backend
node minimal-server.js
```

2. Iniciar o Frontend:
```bash
cd frontend
npm start
```

3. Acessar a aplicação:
- Frontend: http://localhost:8099
- API: http://localhost:5099

## Exemplos de Uso da API

### Obter Opções de Financiamento

```
GET http://localhost:5099/api/financiamentos/opcoes
```

### Simular Financiamento

```
POST http://localhost:5099/api/financiamentos/simular
Content-Type: application/json

{
  "valorSolicitado": 50000,
  "rendaMensal": 8000,
  "tipoFinanciamento": "investimento_fixo",
  "prazoMeses": 60
}
```

## Próximos Passos

- Implementação de autenticação de usuários
- Armazenamento de simulações realizadas
- Dashboard administrativo para análise de dados
- Integração com sistemas de aprovação de crédito

## Observações

- Aplicação de demonstração para fins educacionais
- Os dados e cálculos são simplificados para demonstração
- O layout segue os padrões visuais do Banco da Amazônia