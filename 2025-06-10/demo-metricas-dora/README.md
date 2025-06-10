# Dashboard de Métricas DORA

Dashboard para acompanhamento de performance de times baseado nas Four Key Metrics do DORA (DevOps Research and Assessment).

## Sobre o Projeto

Este dashboard permite o acompanhamento e visualização das quatro métricas principais do DORA:

1. **Frequência de Deploy (Deployment Frequency)**: Com que frequência uma organização implanta código com sucesso em produção.
2. **Lead Time para Mudanças (Lead Time for Changes)**: Quanto tempo leva para que um commit chegue a produção com sucesso.
3. **Tempo Médio de Restauração (Mean Time to Restore)**: Quanto tempo leva para restaurar o serviço após um incidente ou falha.
4. **Taxa de Falha de Mudanças (Change Failure Rate)**: Percentual de mudanças que resultam em falha e requerem correção.

## Tecnologias Utilizadas

- **Front-end**: React, TypeScript, CSS
- **Back-end**: Node.js, Express

## Arquitetura

O projeto é dividido em dois componentes principais:

- **Frontend (Porta 8999)**: Interface de usuário construída com React e TypeScript
- **Backend (Porta 5999)**: API REST construída com Node.js e Express

## Como Executar

### Requisitos

- Node.js (v12+)
- npm (v6+)

### Instalação

1. Clone o repositório
2. Instale as dependências do back-end:

```bash
cd backend
npm install
```

3. Instale as dependências do front-end:

```bash
cd ../frontend
npm install
```

### Execução

Você pode iniciar ambos os servidores simultaneamente com o script de inicialização:

```bash
./start.sh
```

Ou iniciar cada componente separadamente:

**Back-end:**
```bash
cd backend
npm start
```

**Front-end:**
```bash
cd frontend
npm start
```

Acesse o dashboard em: http://localhost:8999

## Recursos

- Visualização de métricas globais de todos os times
- Visualização detalhada de métricas por time
- Histórico de métricas dos últimos 12 meses
- Classificação de performance (Elite, Alto, Médio, Baixo)
- Tendências de performance (melhorando, piorando, estável)

## Layout

O design e layout foram inspirados no site da TQI (tqi.com.br), utilizando suas cores e padrões visuais.