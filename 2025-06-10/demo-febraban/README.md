# Analisador de Risco de Cliente PJ via CNPJ

## Descrição

Sistema para análise simplificada de risco de empresas (Pessoas Jurídicas) a partir do CNPJ. A ferramenta consulta dados públicos através de API e aplica critérios predefinidos para calcular um score de risco.

## Funcionalidades Principais

- Consulta de CNPJ com validação
- Análise de risco com base em critérios como:
  - Situação cadastral
  - Tempo de operação
  - Tipo de atividade econômica (CNAE)
- Dashboard visual com indicação de risco (Baixo, Médio, Alto)
- Histórico de consultas

## Como Usar

### Iniciar a Aplicação

Execute o script de inicialização:

```bash
./start.sh
```

Este script verificará os requisitos necessários, instalará dependências se necessário e iniciará tanto o backend quanto o frontend.

### Acessar a Aplicação

Após a inicialização:
- Frontend: http://localhost:3000
- Backend: http://localhost:3001

### Parar a Aplicação

Para encerrar todos os serviços:

```bash
./stop.sh
```

## Estrutura do Projeto

- `codigo/`: Código-fonte do sistema
  - `backend/`: Servidor Node.js/Express
  - `frontend/`: Interface React
  - `scripts/`: Scripts de inicialização e encerramento
- `documentacao/`: Documentação do projeto
- `logs/`: Registros de atividades
- `prompts/`: Prompts utilizados para definição do projeto

## Tecnologias Utilizadas

- **Backend**: Node.js, Express, SQLite, Sequelize
- **Frontend**: React, Bootstrap, Axios
- **Ferramentas**: ESLint, Prettier, Jest

## Requisitos de Sistema

- Node.js 18.x ou superior
- npm 8.x ou superior

Para mais detalhes, consulte a documentação completa em `codigo/README.md`.

---

Desenvolvido por AICUBE TECHNOLOGY