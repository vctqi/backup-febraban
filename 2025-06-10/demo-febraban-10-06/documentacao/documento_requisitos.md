# Documento de Requisitos - Analisador de Risco de Cliente PJ via CNPJ

## 1. Visão Geral do Produto

### Propósito Principal
O "Analisador de Risco de Cliente PJ via CNPJ" é um sistema que permite aos usuários realizarem uma análise simplificada de risco de empresas (Pessoas Jurídicas) a partir do CNPJ. O sistema coleta dados públicos disponíveis, aplica critérios predefinidos de avaliação e apresenta um resultado claro e objetivo sobre o nível de risco associado àquela empresa.

### Público-Alvo
- Analistas de crédito de instituições financeiras
- Departamentos de compliance de empresas
- Profissionais de áreas comerciais que precisam avaliar parceiros de negócios
- Analistas de investimento
- Empresas de due diligence

### Objetivos do Público-Alvo
- Obter rapidamente uma análise preliminar de risco sem necessidade de pesquisas extensas
- Auxiliar na tomada de decisão sobre concessão de crédito, parcerias comerciais ou investimentos
- Complementar análises mais aprofundadas com informações objetivas e padronizadas
- Identificar sinais de alerta em potenciais parceiros de negócios

### Valor de Negócio
- Redução do tempo necessário para análises preliminares de risco
- Padronização dos critérios de avaliação, garantindo consistência nas análises
- Diminuição de riscos em transações comerciais e financeiras
- Automatização de processos que normalmente exigiriam pesquisa manual
- Democratização do acesso a análises de risco, antes disponíveis apenas para grandes organizações

## 2. Requisitos Funcionais Detalhados

### 2.1. Consulta de CNPJ

**Descrição:** O sistema deve permitir ao usuário inserir um CNPJ para análise.

**Comportamento Esperado:**
- Aceitar entrada de CNPJ com ou sem formatação (pontos, traços e barras)
- Validar o formato e dígitos verificadores do CNPJ antes de prosseguir
- Informar ao usuário quando o CNPJ for inválido
- Processar a consulta apenas quando o CNPJ for válido

**Entradas:**
- CNPJ do cliente (formato numérico, com ou sem formatação)

**Saídas/Resultados:**
- Feedback imediato sobre a validade do CNPJ
- Progresso da consulta sendo realizada

**Regras de Negócio:**
- O CNPJ deve ser validado quanto ao formato e dígitos verificadores
- O sistema deve permitir a consulta de qualquer CNPJ válido, independente da situação cadastral

### 2.2. Coleta de Dados Públicos

**Descrição:** O sistema deve consultar dados públicos do CNPJ através da API pública disponível.

**Comportamento Esperado:**
- Realizar requisição à API pública de consulta do CNPJ
- Tratar corretamente erros de conexão ou indisponibilidade da API
- Extrair as informações relevantes da resposta da API
- Armazenar temporariamente os dados para processamento

**Entradas:**
- CNPJ validado

**Saídas/Resultados:**
- Dados cadastrais do CNPJ, incluindo:
  - Razão social
  - Nome fantasia
  - Situação cadastral (ativa, inapta, suspensa, baixada)
  - Data de abertura
  - CNAE principal (código e descrição)
  - Porte da empresa
  - Localização (endereço completo)

**Regras de Negócio:**
- O sistema deve respeitar os limites de requisições da API pública
- Dados sensíveis não devem ser armazenados permanentemente sem consentimento
- Se a API estiver indisponível, o sistema deve informar o usuário e sugerir tentar novamente mais tarde

### 2.3. Cálculo de Score de Risco

**Descrição:** O sistema deve calcular um score de risco com base nos dados obtidos, aplicando critérios predefinidos.

**Comportamento Esperado:**
- Analisar os dados coletados da empresa
- Aplicar os critérios de pontuação conforme definido
- Calcular o score final
- Determinar a classificação de risco (Baixo, Médio, Alto)

**Entradas:**
- Dados cadastrais e situacionais da empresa obtidos da API

**Saídas/Resultados:**
- Score numérico
- Classificação de risco (Baixo, Médio, Alto)
- Detalhamento dos critérios que impactaram o score

**Regras de Negócio:**
- Os critérios de pontuação devem ser aplicados conforme a tabela definida:
  - Empresa ativa: +10 pontos
  - Mais de 3 anos de operação: +10 pontos
  - CNAE de baixo risco: +10 pontos
  - CNAE de risco (ex.: factoring): -10 pontos
  - Empresa inativa/suspensa: -20 pontos
  - Empresa aberta há menos de 6 meses: -10 pontos
- A classificação de risco deve seguir a seguinte regra:
  - 20 ou mais pontos: Baixo risco
  - Entre 0 e 19 pontos: Médio risco
  - Abaixo de 0 pontos: Alto risco
- A lista de CNAEs considerados de risco deve ser configurável e atualizada periodicamente

### 2.4. Apresentação dos Resultados

**Descrição:** O sistema deve apresentar os resultados da análise de forma clara e objetiva.

**Comportamento Esperado:**
- Exibir um dashboard com os dados cadastrais da empresa
- Apresentar a classificação de risco de forma visual (badge colorido)
- Mostrar o detalhamento dos critérios que impactaram o score
- Permitir ao usuário entender facilmente o resultado da análise

**Entradas:**
- Score calculado
- Classificação de risco
- Dados cadastrais da empresa
- Critérios aplicados na análise

**Saídas/Resultados:**
- Dashboard visual contendo:
  - Dados básicos da empresa (Razão social, CNPJ, data de abertura, etc.)
  - Badge de classificação de risco (Verde para Baixo, Amarelo para Médio, Vermelho para Alto)
  - Lista de sinais de alerta identificados
  - Detalhamento dos critérios aplicados e seus respectivos impactos no score

**Regras de Negócio:**
- A interface deve ser clara e intuitiva
- As informações críticas devem ter destaque visual
- O sistema deve evitar jargões técnicos, favorecendo uma linguagem acessível
- A apresentação deve ser responsiva, adaptando-se a diferentes dispositivos

### 2.5. Histórico de Consultas

**Descrição:** O sistema deve manter um histórico das consultas realizadas na sessão atual.

**Comportamento Esperado:**
- Registrar cada consulta realizada na sessão
- Permitir ao usuário acessar resultados de consultas anteriores na mesma sessão
- Não armazenar dados permanentemente sem consentimento explícito

**Entradas:**
- Resultados das consultas realizadas

**Saídas/Resultados:**
- Lista de consultas realizadas na sessão atual
- Acesso rápido aos resultados anteriores

**Regras de Negócio:**
- Por padrão, o histórico deve ser mantido apenas durante a sessão do usuário
- O histórico deve ser apresentado em ordem cronológica, da consulta mais recente para a mais antiga
- O sistema deve limitar o histórico às 10 consultas mais recentes para não sobrecarregar a interface

## 3. Requisitos Não Funcionais

### 3.1. Desempenho
- O sistema deve responder à consulta de CNPJ em no máximo 5 segundos (excluindo o tempo de resposta da API externa)
- A interface do usuário deve carregar em menos de 2 segundos
- O sistema deve ser capaz de processar até 100 consultas simultâneas sem degradação significativa
- O cálculo do score de risco deve ser realizado em menos de 1 segundo após a obtenção dos dados

### 3.2. Segurança
- O sistema não deve armazenar permanentemente dados sensíveis sem consentimento explícito
- As comunicações com APIs externas devem ser realizadas de forma segura (HTTPS)
- O sistema deve implementar proteção contra ataques comuns (XSS, CSRF, etc.)
- Os dados em trânsito devem ser criptografados
- O sistema deve limitar o número de requisições por IP para prevenir abusos

### 3.3. Usabilidade
- A interface deve ser intuitiva e de fácil uso, mesmo para usuários sem conhecimento técnico
- O sistema deve fornecer feedback claro sobre o progresso das operações
- Mensagens de erro devem ser claras e orientar o usuário sobre como proceder
- A interface deve ser responsiva e funcionar adequadamente em dispositivos móveis e desktops
- O sistema deve fornecer dicas contextuais para auxiliar na interpretação dos resultados

### 3.4. Confiabilidade
- O sistema deve estar disponível em pelo menos 99% do tempo
- Falhas na API externa não devem causar falhas no sistema como um todo
- O sistema deve implementar mecanismos de retry para lidar com falhas temporárias
- O sistema deve manter logs detalhados para diagnóstico de problemas
- Em caso de falha, o sistema deve fornecer mensagens claras ao usuário

### 3.5. Escalabilidade
- A arquitetura deve permitir escalar horizontalmente para atender aumento de demanda
- O banco de dados deve suportar crescimento do volume de dados sem degradação de desempenho
- O sistema deve ser capaz de lidar com picos de uso sem impacto significativo no desempenho

### 3.6. Manutenibilidade
- O código deve seguir padrões de codificação e boas práticas
- A arquitetura deve ser modular para facilitar manutenção e evolução
- A documentação do código deve ser clara e abrangente
- O sistema deve ter cobertura adequada de testes automatizados
- Deve ser fácil adicionar ou modificar critérios de cálculo do score de risco

## 4. Épicos e User Stories

### Épico 1: Consulta de CNPJ e Coleta de Dados

#### User Story 1.1
**Como** analista de crédito,  
**Eu quero** inserir um CNPJ no sistema,  
**Para que** eu possa obter informações sobre a empresa.

**Critérios de Aceitação:**
- O sistema deve aceitar CNPJ com ou sem formatação (pontos, traços, barras)
- O sistema deve validar se o CNPJ possui formato válido (14 dígitos e dígitos verificadores corretos)
- O sistema deve exibir mensagem clara quando o CNPJ for inválido
- O sistema deve mostrar um indicador de progresso durante a consulta

#### User Story 1.2
**Como** analista de crédito,  
**Eu quero** visualizar os dados cadastrais da empresa consultada,  
**Para que** eu possa conhecer informações básicas sobre ela.

**Critérios de Aceitação:**
- O sistema deve exibir razão social, nome fantasia, CNPJ e data de abertura
- O sistema deve mostrar a situação cadastral atual (ativa, suspensa, etc.)
- O sistema deve apresentar o CNAE principal com código e descrição
- O sistema deve exibir o porte da empresa e sua localização
- As informações devem ser apresentadas de forma organizada e clara

### Épico 2: Análise de Risco

#### User Story 2.1
**Como** analista de crédito,  
**Eu quero** que o sistema calcule automaticamente um score de risco,  
**Para que** eu possa ter uma avaliação objetiva sobre a empresa consultada.

**Critérios de Aceitação:**
- O sistema deve aplicar todos os critérios definidos na tabela de pontuação
- O cálculo deve ser realizado automaticamente após a obtenção dos dados
- O sistema deve determinar corretamente a classificação de risco com base no score final
- O sistema deve considerar a data de abertura para calcular o tempo de operação da empresa
- O sistema deve identificar corretamente se o CNAE da empresa é considerado de risco

#### User Story 2.2
**Como** analista de crédito,  
**Eu quero** visualizar os sinais de alerta identificados na análise,  
**Para que** eu possa compreender os fatores de risco associados à empresa.

**Critérios de Aceitação:**
- O sistema deve destacar sinais de alerta como situação cadastral irregular
- O sistema deve indicar se a empresa é recém-aberta (menos de 6 meses)
- O sistema deve apontar quando o CNAE da empresa é considerado de risco
- Os sinais de alerta devem ser apresentados de forma clara e destacada
- Para cada sinal de alerta, deve haver uma breve explicação sobre seu impacto

### Épico 3: Apresentação de Resultados

#### User Story 3.1
**Como** analista de crédito,  
**Eu quero** visualizar um dashboard com o resultado da análise,  
**Para que** eu possa compreender rapidamente o risco associado à empresa.

**Critérios de Aceitação:**
- O dashboard deve exibir um badge visual indicando o nível de risco (verde, amarelo ou vermelho)
- O dashboard deve apresentar o score numérico calculado
- O dashboard deve mostrar os dados cadastrais básicos da empresa
- O layout deve ser organizado e de fácil compreensão
- As informações críticas devem ter destaque visual

#### User Story 3.2
**Como** analista de crédito,  
**Eu quero** ver o detalhamento dos critérios que impactaram o score,  
**Para que** eu possa entender como o risco foi calculado.

**Critérios de Aceitação:**
- O sistema deve listar todos os critérios aplicados na análise
- Para cada critério, o sistema deve mostrar o impacto no score (positivo ou negativo)
- O sistema deve indicar claramente quais critérios foram determinantes para a classificação final
- As informações devem ser apresentadas de forma didática e compreensível
- Deve ser possível expandir/retrair esta seção para facilitar a visualização

### Épico 4: Histórico de Consultas

#### User Story 4.1
**Como** analista de crédito,  
**Eu quero** ter acesso ao histórico das consultas realizadas na sessão atual,  
**Para que** eu possa retornar rapidamente a análises anteriores.

**Critérios de Aceitação:**
- O sistema deve manter um histórico das consultas realizadas na sessão
- O histórico deve exibir o CNPJ, razão social e nível de risco de cada consulta
- Deve ser possível clicar em um item do histórico para ver novamente os resultados completos
- O histórico deve ser limitado às 10 consultas mais recentes
- As consultas devem ser ordenadas da mais recente para a mais antiga

## 5. Priorização

### Essencial (MVP - Minimum Viable Product)
- Consulta de CNPJ e validação (User Story 1.1)
- Coleta de dados públicos via API (User Story 1.2)
- Cálculo do score de risco (User Story 2.1)
- Apresentação básica dos resultados com badge visual (User Story 3.1)

**Justificativa:** Estas funcionalidades formam o núcleo do sistema e entregam o valor básico proposto: permitir a consulta de um CNPJ e obter uma análise simplificada de risco.

### Importante
- Detalhamento dos critérios que impactaram o score (User Story 3.2)
- Exibição dos sinais de alerta identificados (User Story 2.2)

**Justificativa:** Estas funcionalidades melhoram significativamente a experiência do usuário, permitindo uma compreensão mais profunda dos resultados da análise.

### Desejável
- Histórico de consultas da sessão (User Story 4.1)

**Justificativa:** Esta funcionalidade agrega valor adicional, mas não é crítica para o funcionamento básico do sistema.

## 6. Restrições e Dependências

### Restrições Técnicas
- O sistema deve ser implementado utilizando as tecnologias especificadas: Frontend (HTML5 + JS ou React), Backend NodeJS e Banco de dados SQLite
- O sistema deve ser responsivo e funcionar em diferentes dispositivos e navegadores modernos
- O desenvolvimento deve seguir boas práticas e padrões de codificação
- O sistema deve ser entregue com documentação adequada

### Restrições Legais
- O sistema deve utilizar apenas dados públicos disponíveis através de APIs abertas
- O sistema não deve armazenar permanentemente dados sensíveis sem consentimento explícito
- O uso da API pública deve respeitar seus termos de uso e limites de requisições

### Dependências
- Disponibilidade e correto funcionamento da API Pública de consulta do CNPJ
- Disponibilidade dos dados necessários para o cálculo do score
- Lista atualizada de CNAEs considerados de risco

## Conclusão

Este documento de requisitos define de forma abrangente as funcionalidades, restrições e critérios de qualidade do sistema "Analisador de Risco de Cliente PJ via CNPJ". Ele servirá como referência principal para as próximas etapas do projeto, incluindo a definição da arquitetura técnica e o planejamento do desenvolvimento.

A implementação bem-sucedida deste sistema permitirá que analistas de crédito e outros profissionais realizem análises preliminares de risco de forma rápida, objetiva e padronizada, agregando valor significativo aos processos de análise de empresas.