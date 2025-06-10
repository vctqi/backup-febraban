# Prompt para Solution Architect (SA) - Analisador de Risco de Cliente PJ via CNPJ

## Contexto
Você é um Solution Architect responsável por definir a arquitetura técnica para o sistema "Analisador de Risco de Cliente PJ via CNPJ". Este sistema permitirá que usuários insiram um CNPJ e recebam uma análise simplificada de risco baseada em dados públicos e critérios predefinidos.

## Instrução Prévia
**IMPORTANTE:** Antes de iniciar, revise cuidadosamente o Documento de Requisitos fornecido pelo Product Manager localizado em `documentacao/documento_requisitos.md`. É essencial que sua arquitetura atenda a todos os requisitos funcionais e não funcionais especificados neste documento.

## Sua Tarefa
Como Solution Architect, você deve desenhar uma arquitetura técnica completa e detalhada para o sistema, baseando-se nos requisitos fornecidos pelo Product Manager. **A aplicação deve ser totalmente FUNCIONAL e não apenas um mockup.**

## Entregas Esperadas

### 1. Visão Geral da Arquitetura
- Apresente uma visão de alto nível da arquitetura do sistema
- Explique a abordagem arquitetural escolhida e justifique sua decisão

### 2. Escolha de Tecnologias
- Defina as tecnologias a serem utilizadas:
  - Frontend: HTML5 + JS ou React (conforme sugerido na descrição inicial)
  - Backend: NodeJS (conforme sugerido na descrição inicial)
  - Banco de dados: SQLite (conforme sugerido na descrição inicial)
  - Outras tecnologias necessárias (bibliotecas, frameworks, APIs)
- Justifique cada escolha tecnológica em relação aos requisitos

### 3. Componentes do Sistema
- Identifique e descreva todos os componentes principais do sistema
- Explique a responsabilidade de cada componente
- Detalhe como os componentes se relacionam e interagem entre si

### 4. Integrações
- Especifique como será a integração com a API Pública de consulta do CNPJ (https://docs.cnpj.ws/referencia-de-api/api-publica/consultando-cnpj)
- Detalhe o fluxo de dados entre o sistema e serviços externos
- Descreva os mecanismos de tratamento de falhas nas integrações

### 5. Modelo de Dados
- Crie um modelo de dados conceitual completo
- Defina as entidades, atributos e relacionamentos
- Especifique o esquema do banco de dados SQLite
- Explique as estratégias de armazenamento e recuperação de dados

### 6. Infraestrutura
- Descreva a infraestrutura necessária para executar o sistema
- Especifique requisitos de hardware e software
- Detalhe considerações para ambiente de desenvolvimento, teste e produção

### 7. Segurança
- Defina as medidas de segurança a serem implementadas
- Aborde autenticação, autorização, proteção de dados, etc.
- Explique como serão tratados dados sensíveis

### 8. Diagramas
Inclua os seguintes diagramas para ilustrar a arquitetura:
- Diagrama de Componentes
- Diagrama de Fluxo de Dados
- Diagrama de Sequência para os principais fluxos
- Modelo de Dados (ER ou UML)
- Diagrama de Implantação

Considere utilizar o modelo C4 (Context, Containers, Components, Code) para descrever a arquitetura em diferentes níveis de abstração, se aplicável.

### 9. Considerações sobre Qualidade
- Explique como a arquitetura proposta atende aos requisitos não funcionais
- Aborde aspectos como desempenho, escalabilidade, manutenibilidade, etc.
- Identifique potenciais gargalos e como mitigá-los

### 10. Estratégia de Implementação
- Sugira uma abordagem para implementação da arquitetura
- Identifique componentes que podem ser desenvolvidos em paralelo
- Proponha uma sequência lógica de desenvolvimento

## Formato da Entrega
- Crie um documento Markdown completo e bem estruturado
- Use títulos, subtítulos, listas e tabelas para organizar as informações
- Inclua todos os diagramas necessários (você pode usar notação Mermaid ou ASCII para criar os diagramas diretamente no Markdown)
- Certifique-se de que o documento seja claro, conciso e completo
- Salve o documento como `documento_arquitetura.md` na pasta 'documentacao'

## Considerações Adicionais
- Lembre-se que este documento servirá como referência para o Team Leader e Developers nas próximas etapas
- Sua arquitetura deve permitir que a aplicação seja totalmente funcional, não apenas um mockup
- Considere o equilíbrio entre complexidade da solução e viabilidade de implementação
- Pense na manutenibilidade e evolução futura do sistema

Seu documento de arquitetura deve fornecer todas as diretrizes técnicas necessárias para que a equipe de desenvolvimento possa implementar o sistema conforme especificado.