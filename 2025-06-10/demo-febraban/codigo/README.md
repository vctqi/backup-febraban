# Analisador de Risco de Cliente PJ via CNPJ

Sistema para análise simplificada de risco de empresas (Pessoas Jurídicas) a partir do CNPJ, utilizando dados públicos e critérios predefinidos.

## Funcionalidades

- Consulta de CNPJ com validação
- Coleta de dados públicos via API externa
- Cálculo de score de risco baseado em critérios predefinidos
- Dashboard com visualização dos resultados
- Histórico de consultas

## Tecnologias Utilizadas

### Backend
- Node.js com Express
- SQLite com Sequelize ORM
- Axios para requisições HTTP
- Helmet para segurança
- Winston para logging

### Frontend
- React
- React Router para navegação
- React Bootstrap para UI
- Axios para comunicação com o backend

## Pré-requisitos

- Node.js (versão 18.x ou superior)
- npm (normalmente instalado com o Node.js)

## Instalação

O sistema possui scripts automatizados para instalação e execução. Basta seguir os passos abaixo:

1. Clone o repositório (se aplicável)
2. Execute o script de inicialização

```bash
cd /caminho/para/o/projeto
./scripts/start.sh
```

O script verificará se todos os requisitos estão instalados e, caso necessário, instalará as dependências automaticamente. Em seguida, iniciará tanto o backend quanto o frontend.

## Estrutura do Projeto

```
/
├── backend/               # Código do servidor
│   ├── data/              # Banco de dados SQLite
│   ├── src/               # Código fonte
│   │   ├── config/        # Configurações
│   │   ├── controllers/   # Controladores
│   │   ├── models/        # Modelos de dados
│   │   ├── routes/        # Rotas da API
│   │   ├── services/      # Serviços
│   │   ├── utils/         # Utilitários
│   │   └── index.js       # Ponto de entrada
│   └── package.json       # Dependências
│
├── frontend/              # Código do cliente
│   ├── public/            # Arquivos estáticos
│   ├── src/               # Código fonte
│   │   ├── components/    # Componentes React
│   │   ├── pages/         # Páginas
│   │   ├── services/      # Serviços
│   │   ├── utils/         # Utilitários
│   │   └── App.js         # Componente principal
│   └── package.json       # Dependências
│
└── scripts/               # Scripts de automação
    ├── start.sh           # Script de inicialização
    └── stop.sh            # Script para parar a aplicação
```

## Uso

Após iniciar a aplicação:

1. O frontend estará disponível em http://localhost:3000
2. O backend estará disponível em http://localhost:3001

### Consulta de CNPJ

1. Acesse o frontend no navegador
2. Insira um CNPJ válido no campo de consulta
3. Clique em "Analisar Risco"
4. Veja os resultados no dashboard

### Histórico de Consultas

1. Clique em "Histórico" no menu superior
2. Veja a lista de consultas realizadas
3. Clique em uma consulta para ver os detalhes

## Encerrando a Aplicação

Para encerrar a aplicação, execute o script de parada:

```bash
./scripts/stop.sh
```

Este script irá encerrar tanto o backend quanto o frontend.

## Critérios de Risco

O sistema utiliza os seguintes critérios para calcular o score de risco:

| Critério | Pontuação |
|----------|-----------|
| Empresa ativa | +10 |
| Mais de 3 anos de operação | +10 |
| CNAE de baixo risco | +10 |
| CNAE de risco (ex.: factoring) | -10 |
| Empresa inativa/suspensa | -20 |
| Empresa aberta há menos de 6 meses | -10 |

### Classificação de Risco

- Score >= 20: Baixo risco (Verde)
- 0 <= Score < 20: Médio risco (Amarelo)
- Score < 0: Alto risco (Vermelho)

## Observações

- A aplicação utiliza a API pública de consulta de CNPJ disponível em https://docs.cnpj.ws/referencia-de-api/api-publica/consultando-cnpj
- O sistema não armazena permanentemente dados sensíveis
- O histórico de consultas é mantido apenas durante a sessão atual (no frontend) ou para fins de registro (no backend)

## Suporte

Em caso de problemas ou dúvidas, consulte a documentação ou entre em contato com o desenvolvedor.

---

Desenvolvido por AICUBE TECHNOLOGY