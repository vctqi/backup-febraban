# Analisador de Risco de Cliente PJ via CNPJ

Este sistema permite realizar a análise simplificada de risco de empresas (Pessoas Jurídicas) a partir do CNPJ, utilizando dados públicos e critérios predefinidos.

## Funcionalidades

- Consulta de dados públicos de empresas via CNPJ
- Cálculo de score de risco baseado em critérios como:
  - Situação cadastral
  - Tempo de operação
  - CNAE (atividade econômica)
- Dashboard com visualização clara dos resultados
- Indicação visual do nível de risco (Baixo, Médio, Alto)
- Histórico de consultas recentes

## Requisitos do Sistema

- Node.js 14 ou superior
- NPM 6 ou superior
- Acesso à internet (para consulta da API pública de CNPJ)

## Estrutura do Projeto

```
├── backend/             # Código do servidor Node.js/Express
│   ├── src/             # Código-fonte do backend
│   │   ├── config/      # Configurações (banco de dados, logger, etc.)
│   │   ├── controllers/ # Controladores da API
│   │   ├── middlewares/ # Middlewares Express
│   │   ├── models/      # Modelos do banco de dados
│   │   ├── routes/      # Rotas da API
│   │   ├── services/    # Serviços de negócio
│   │   └── utils/       # Funções utilitárias
│   └── package.json     # Dependências do backend
├── frontend/            # Código do cliente React
│   ├── public/          # Arquivos estáticos
│   ├── src/             # Código-fonte do frontend
│   │   ├── components/  # Componentes React
│   │   ├── context/     # Contextos para gerenciamento de estado
│   │   ├── services/    # Serviços para comunicação com API
│   │   └── utils/       # Funções utilitárias
│   └── package.json     # Dependências do frontend
├── logs/                # Logs da aplicação
├── start.sh             # Script para iniciar o sistema
├── stop.sh              # Script para parar o sistema
└── README.md            # Este arquivo
```

## Instalação e Execução

### Método Automático (Recomendado)

1. Certifique-se de que os scripts têm permissão de execução:
   ```bash
   chmod +x start.sh stop.sh
   ```

2. Execute o script de inicialização:
   ```bash
   ./start.sh
   ```
   Este script verificará as dependências necessárias, instalará o que estiver faltando, e iniciará tanto o backend quanto o frontend.

3. Para parar o sistema:
   ```bash
   ./stop.sh
   ```

### Método Manual

#### Backend

1. Navegue até o diretório do backend:
   ```bash
   cd backend
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie o servidor:
   ```bash
   npm start
   ```
   O backend estará disponível em http://localhost:3001

#### Frontend

1. Navegue até o diretório do frontend:
   ```bash
   cd frontend
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie o servidor de desenvolvimento:
   ```bash
   REACT_APP_API_URL=http://localhost:3001/api npm start
   ```
   O frontend estará disponível em http://localhost:3000

## Uso do Sistema

1. Acesse o frontend em http://localhost:3000
2. Insira um CNPJ válido no campo de consulta
3. Clique em "Analisar Risco"
4. Visualize os resultados no dashboard
5. Consultas anteriores ficarão disponíveis no histórico

## Detalhes Técnicos

### Backend

- **Framework**: Express.js
- **Banco de Dados**: SQLite (via Sequelize ORM)
- **API Externa**: API Pública de consulta de CNPJ (https://publica.cnpj.ws)

### Frontend

- **Framework**: React.js
- **Biblioteca de UI**: React Bootstrap
- **Validação de Formulários**: Formik + Yup
- **Gerenciamento de Estado**: Context API

## Critérios para Cálculo de Risco

| Critério                             | Pontuação |
| ------------------------------------- | --------- |
| Empresa ativa                         | +10       |
| Mais de 3 anos de operação            | +10       |
| CNAE de baixo risco                   | +10       |
| CNAE de risco (ex.: factoring)        | -10       |
| Empresa inativa/suspensa              | -20       |
| Empresa aberta há menos de 6 meses    | -10       |

### Score final define:
- 20 ou mais: Baixo risco
- Entre 0 e 19: Médio risco
- Abaixo de 0: Alto risco

## Solução de Problemas

### O backend não inicia

Verifique os logs em `logs/backend.log` para identificar o problema. Possíveis causas:
- Porta 3001 já está em uso
- Problema com permissões no banco de dados SQLite
- Dependências não instaladas corretamente

### O frontend não inicia

Verifique os logs em `logs/frontend.log`. Possíveis causas:
- Porta 3000 já está em uso
- Dependências não instaladas corretamente

### Erro ao consultar CNPJ

- Verifique se o backend está em execução
- Verifique se há conexão com a internet
- A API externa pode estar indisponível ou com limite de requisições excedido