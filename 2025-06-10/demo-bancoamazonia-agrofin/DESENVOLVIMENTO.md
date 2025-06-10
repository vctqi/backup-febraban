# Guia de Desenvolvimento

Este documento contém informações adicionais para o desenvolvimento e evolução do sistema de financiamento agropecuário.

## Problemas Conhecidos e Soluções

Ao trabalhar com este projeto, você pode encontrar os seguintes problemas:

### 1. Erro de Módulo `logo.png` não encontrado

Ocorre porque o arquivo de logo não existe no diretório `/src/assets/`.

**Solução:**
- Foi criado um componente `LogoComponent` em `/src/assets/logo.js` que serve como um fallback
- Para resolver definitivamente, adicione um arquivo de imagem `logo.png` na pasta `src/assets/`

### 2. Erro de incompatibilidade com React Router v6

A implementação atual usa React Router v5. Pode haver erros se tentar atualizar para a versão 6.

**Solução:**
- Mantenha a versão 5 do React Router ou
- Atualize as importações e usos conforme a documentação da v6:
  - Mude `Switch` para `Routes`
  - Mude `component={Component}` para `element={<Component />}`
  - Atualize hooks e padrões de navegação

### 3. Problemas de renderização em ambiente de desenvolvimento

Podem ocorrer erros no primeiro carregamento devido à compilação.

**Solução:**
- Limpe o cache do navegador
- Reinicie o servidor de desenvolvimento com `npm start`
- Use o modo de produção com `npm run build` e sirva os arquivos estáticos

## Próximos Passos de Desenvolvimento

### Melhorias Prioritárias

1. **Autenticação de Usuários**
   - Implementar sistema de login
   - Criar perfis para clientes e administradores

2. **Armazenamento de Simulações**
   - Salvar histórico de simulações do usuário
   - Permitir comparação entre diferentes cenários

3. **Integração com APIs Externas**
   - Conexão com sistemas de análise de crédito
   - Validação de dados cadastrais

### Melhorias de Interface

1. **Design Responsivo Avançado**
   - Otimizar para dispositivos móveis
   - Adicionar modos claro/escuro

2. **Acessibilidade**
   - Implementar padrões WCAG 2.1
   - Adicionar suporte a leitores de tela

3. **Visualização de Dados**
   - Gráficos para simulação de pagamentos
   - Dashboard com métricas e estatísticas

## Padrões de Código

### Frontend

- Use componentes funcionais com hooks
- Siga o padrão de design atômico
- Mantenha a separação entre lógica e apresentação

### Backend

- Use o padrão de arquitetura MVC
- Implemente validações em middleware
- Documente as APIs com Swagger

## Configuração de Ambiente

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto backend com as seguintes variáveis:

```
PORT=5099
NODE_ENV=development
API_VERSION=v1
```

Para o frontend, crie um arquivo `.env` com:

```
PORT=8099
REACT_APP_API_URL=http://localhost:5099/api
```

## Processo de Deploy

### Ambiente de Produção

1. **Backend:**
   ```bash
   cd backend
   npm install --production
   NODE_ENV=production node server.js
   ```

2. **Frontend:**
   ```bash
   cd frontend
   npm run build
   # Use um servidor como nginx para servir a pasta build
   ```

### Usando Docker

Também é possível containerizar a aplicação. Arquivos `Dockerfile` e `docker-compose.yml` estão disponíveis na raiz do projeto.

Para iniciar com Docker:
```bash
docker-compose up -d
```

## Licença e Atribuições

Este é um projeto de demonstração. Todos os direitos de design e marca do Banco da Amazônia pertencem a seus respectivos proprietários.