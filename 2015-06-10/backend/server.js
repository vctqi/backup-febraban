const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5012;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Dados simulados de clientes empreendedores
const clientes = [
  {
    id: 1,
    nome: "Ana Silva",
    cnpj: "12.345.678/0001-90",
    email: "ana.silva@empreendimento.com",
    telefone: "(11) 98765-4321",
    segmento: "Tecnologia",
    tipoNegocio: "SaaS - Software as a Service",
    tempoAtividade: 24, // meses
    faturamentoMensal: 35000,
    despesasMensais: 22000,
    historicoCredito: {
      score: 720,
      ultimosEmprestimos: [
        {
          valor: 50000,
          taxaJuros: 0.9,
          parcelas: 24,
          parcelasPagas: 24,
          situacao: "Quitado",
          dataInicio: "2022-01-15",
          dataFim: "2024-01-15"
        }
      ],
      restricoes: false,
      atrasosPagamento: 0
    },
    indicadores: {
      crescimentoAnual: 32,
      margemLucro: 37.1,
      endividamento: 15,
      liquidezCorrente: 2.3
    },
    analiseRisco: {
      score: 87,
      classificacao: "A",
      nivelRisco: "Baixo",
      limiteSugerido: 120000,
      taxaJurosSugerida: 0.79,
      parcelasSugeridas: [12, 24, 36],
      acoesSugeridas: [
        "Oferecer linha de crédito para expansão",
        "Propor investimento em marketing digital",
        "Sugerir programa de fidelização de clientes"
      ]
    }
  },
  {
    id: 2,
    nome: "Pedro Oliveira",
    cnpj: "23.456.789/0001-01",
    email: "pedro.oliveira@comercio.com",
    telefone: "(21) 97654-3210",
    segmento: "Comércio",
    tipoNegocio: "Loja de Vestuário",
    tempoAtividade: 36, // meses
    faturamentoMensal: 45000,
    despesasMensais: 38000,
    historicoCredito: {
      score: 680,
      ultimosEmprestimos: [
        {
          valor: 35000,
          taxaJuros: 1.2,
          parcelas: 24,
          parcelasPagas: 20,
          situacao: "Em andamento",
          dataInicio: "2022-05-10",
          dataFim: "2024-05-10"
        }
      ],
      restricoes: false,
      atrasosPagamento: 2
    },
    indicadores: {
      crescimentoAnual: 15,
      margemLucro: 15.6,
      endividamento: 32,
      liquidezCorrente: 1.3
    },
    analiseRisco: {
      score: 65,
      classificacao: "B",
      nivelRisco: "Médio",
      limiteSugerido: 60000,
      taxaJurosSugerida: 1.15,
      parcelasSugeridas: [12, 24],
      acoesSugeridas: [
        "Sugerir controle de estoque mais eficiente",
        "Reduzir despesas operacionais",
        "Renegociar com fornecedores para melhorar margem"
      ]
    }
  },
  {
    id: 3,
    nome: "Carla Mendes",
    cnpj: "34.567.890/0001-12",
    email: "carla.mendes@gastronomia.com",
    telefone: "(31) 96543-2109",
    segmento: "Alimentação",
    tipoNegocio: "Restaurante",
    tempoAtividade: 18, // meses
    faturamentoMensal: 28000,
    despesasMensais: 24000,
    historicoCredito: {
      score: 590,
      ultimosEmprestimos: [
        {
          valor: 40000,
          taxaJuros: 1.5,
          parcelas: 36,
          parcelasPagas: 12,
          situacao: "Em andamento com atrasos",
          dataInicio: "2023-01-20",
          dataFim: "2026-01-20"
        }
      ],
      restricoes: true,
      atrasosPagamento: 5
    },
    indicadores: {
      crescimentoAnual: 10,
      margemLucro: 14.3,
      endividamento: 45,
      liquidezCorrente: 0.9
    },
    analiseRisco: {
      score: 42,
      classificacao: "D",
      nivelRisco: "Alto",
      limiteSugerido: 20000,
      taxaJurosSugerida: 1.89,
      parcelasSugeridas: [12],
      acoesSugeridas: [
        "Implementar controle financeiro rigoroso",
        "Reduzir custos fixos",
        "Desenvolver estratégia de delivery para aumentar receita",
        "Renegociar dívidas existentes"
      ]
    }
  },
  {
    id: 4,
    nome: "Roberto Almeida",
    cnpj: "45.678.901/0001-23",
    email: "roberto.almeida@servicos.com",
    telefone: "(41) 95432-1098",
    segmento: "Serviços",
    tipoNegocio: "Consultoria Empresarial",
    tempoAtividade: 60, // meses
    faturamentoMensal: 70000,
    despesasMensais: 45000,
    historicoCredito: {
      score: 850,
      ultimosEmprestimos: [
        {
          valor: 100000,
          taxaJuros: 0.85,
          parcelas: 36,
          parcelasPagas: 36,
          situacao: "Quitado",
          dataInicio: "2020-03-15",
          dataFim: "2023-03-15"
        },
        {
          valor: 150000,
          taxaJuros: 0.75,
          parcelas: 48,
          parcelasPagas: 12,
          situacao: "Em andamento",
          dataInicio: "2023-06-10",
          dataFim: "2027-06-10"
        }
      ],
      restricoes: false,
      atrasosPagamento: 0
    },
    indicadores: {
      crescimentoAnual: 25,
      margemLucro: 35.7,
      endividamento: 20,
      liquidezCorrente: 2.8
    },
    analiseRisco: {
      score: 92,
      classificacao: "AA",
      nivelRisco: "Muito Baixo",
      limiteSugerido: 250000,
      taxaJurosSugerida: 0.69,
      parcelasSugeridas: [24, 36, 48, 60],
      acoesSugeridas: [
        "Oferecer linha de crédito premium",
        "Sugerir expansão para novos mercados",
        "Propor investimentos em qualificação de equipe"
      ]
    }
  },
  {
    id: 5,
    nome: "Juliana Costa",
    cnpj: "56.789.012/0001-34",
    email: "juliana.costa@beleza.com",
    telefone: "(51) 94321-0987",
    segmento: "Beleza",
    tipoNegocio: "Salão de Beleza",
    tempoAtividade: 12, // meses
    faturamentoMensal: 15000,
    despesasMensais: 14000,
    historicoCredito: {
      score: 650,
      ultimosEmprestimos: [
        {
          valor: 25000,
          taxaJuros: 1.3,
          parcelas: 24,
          parcelasPagas: 6,
          situacao: "Em andamento",
          dataInicio: "2023-12-05",
          dataFim: "2025-12-05"
        }
      ],
      restricoes: false,
      atrasosPagamento: 1
    },
    indicadores: {
      crescimentoAnual: 18,
      margemLucro: 6.7,
      endividamento: 55,
      liquidezCorrente: 0.95
    },
    analiseRisco: {
      score: 52,
      classificacao: "C",
      nivelRisco: "Médio-Alto",
      limiteSugerido: 30000,
      taxaJurosSugerida: 1.45,
      parcelasSugeridas: [12, 24],
      acoesSugeridas: [
        "Diversificar serviços oferecidos",
        "Investir em campanhas de fidelização",
        "Otimizar gestão de caixa",
        "Reduzir custos operacionais"
      ]
    }
  }
];

// Funções de cálculo de risco e score
const calcularScore = (cliente) => {
  // Essa seria uma versão simplificada do cálculo de score
  // Em um sistema real, esse cálculo seria muito mais complexo
  let score = 0;
  
  // Peso do histórico de crédito (40%)
  const scoreHistorico = cliente.historicoCredito.score;
  const historicoNormalizado = (scoreHistorico / 900) * 40;
  
  // Peso dos indicadores financeiros (40%)
  const margemLucroScore = cliente.indicadores.margemLucro * 0.5;
  const crescimentoScore = cliente.indicadores.crescimentoAnual * 0.5;
  const endividamentoScore = Math.max(0, 30 - cliente.indicadores.endividamento * 0.3);
  const liquidezScore = cliente.indicadores.liquidezCorrente * 5;
  const indicadoresScore = Math.min(40, margemLucroScore + crescimentoScore + endividamentoScore + liquidezScore);
  
  // Peso do tempo de atividade (20%)
  const tempoAtividadeScore = Math.min(20, cliente.tempoAtividade * 0.3);
  
  // Score final (0-100)
  score = Math.round(historicoNormalizado + indicadoresScore + tempoAtividadeScore);
  
  // Limitar entre 0 e 100
  return Math.max(0, Math.min(100, score));
};

const classificarRisco = (score) => {
  if (score >= 90) return { classificacao: "AA", nivelRisco: "Muito Baixo" };
  if (score >= 80) return { classificacao: "A", nivelRisco: "Baixo" };
  if (score >= 70) return { classificacao: "B", nivelRisco: "Médio-Baixo" };
  if (score >= 60) return { classificacao: "C", nivelRisco: "Médio" };
  if (score >= 50) return { classificacao: "D", nivelRisco: "Médio-Alto" };
  if (score >= 30) return { classificacao: "E", nivelRisco: "Alto" };
  return { classificacao: "F", nivelRisco: "Muito Alto" };
};

const calcularLimiteCredito = (cliente, score) => {
  // Base: 3x o faturamento mensal
  const baseLimite = cliente.faturamentoMensal * 3;
  
  // Ajuste pelo score
  const fatorScore = score / 100;
  
  // Ajuste pelo endividamento
  const fatorEndividamento = 1 - (cliente.indicadores.endividamento / 100);
  
  // Cálculo final
  return Math.round(baseLimite * fatorScore * fatorEndividamento);
};

const sugerirTaxaJuros = (score, segmento) => {
  // Taxa base por segmento
  const taxaBasePorSegmento = {
    "Tecnologia": 0.8,
    "Comércio": 1.0,
    "Alimentação": 1.2,
    "Serviços": 0.9,
    "Beleza": 1.1
  };
  
  const taxaBase = taxaBasePorSegmento[segmento] || 1.0;
  
  // Ajuste pelo score
  const ajusteScore = Math.max(0.6, 1 - (score / 100));
  
  return parseFloat((taxaBase * ajusteScore).toFixed(2));
};

const definirAcoesSugeridas = (cliente, classificacaoRisco) => {
  const acoes = [];
  
  // Ações gerais baseadas na classificação de risco
  if (classificacaoRisco.nivelRisco === "Muito Baixo" || classificacaoRisco.nivelRisco === "Baixo") {
    acoes.push("Oferecer linha de crédito para expansão");
    acoes.push("Apresentar opções de investimento");
  } else if (classificacaoRisco.nivelRisco === "Médio-Baixo" || classificacaoRisco.nivelRisco === "Médio") {
    acoes.push("Oferecer consultoria financeira");
    acoes.push("Sugerir diversificação de receitas");
  } else {
    acoes.push("Implementar controle financeiro rigoroso");
    acoes.push("Renegociar dívidas existentes");
    acoes.push("Reduzir custos operacionais");
  }
  
  // Ações específicas baseadas nos indicadores
  if (cliente.indicadores.margemLucro < 15) {
    acoes.push("Revisar estrutura de custos para aumentar margem");
  }
  
  if (cliente.indicadores.endividamento > 40) {
    acoes.push("Elaborar plano de redução de endividamento");
  }
  
  if (cliente.indicadores.liquidezCorrente < 1) {
    acoes.push("Melhorar gestão de capital de giro");
  }
  
  // Ações específicas por segmento
  switch (cliente.segmento) {
    case "Tecnologia":
      acoes.push("Investir em inovação e desenvolvimento");
      break;
    case "Comércio":
      acoes.push("Otimizar gestão de estoque");
      break;
    case "Alimentação":
      acoes.push("Desenvolver estratégias para reduzir desperdício");
      break;
    case "Serviços":
      acoes.push("Investir em treinamento e qualificação da equipe");
      break;
    case "Beleza":
      acoes.push("Implementar programa de fidelização de clientes");
      break;
  }
  
  return acoes.slice(0, 5); // Limitar a 5 ações
};

// Rota para obter todos os clientes
app.get('/api/clientes', (req, res) => {
  res.json(clientes.map(cliente => ({
    id: cliente.id,
    nome: cliente.nome,
    cnpj: cliente.cnpj,
    segmento: cliente.segmento,
    tipoNegocio: cliente.tipoNegocio,
    analiseRisco: {
      score: cliente.analiseRisco.score,
      classificacao: cliente.analiseRisco.classificacao,
      nivelRisco: cliente.analiseRisco.nivelRisco
    }
  })));
});

// Rota para obter detalhes de um cliente específico
app.get('/api/clientes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const cliente = clientes.find(c => c.id === id);
  
  if (!cliente) {
    return res.status(404).json({ message: 'Cliente não encontrado' });
  }
  
  res.json(cliente);
});

// Rota para recalcular análise de risco de um cliente
app.post('/api/clientes/:id/analisar', (req, res) => {
  const id = parseInt(req.params.id);
  const cliente = clientes.find(c => c.id === id);
  
  if (!cliente) {
    return res.status(404).json({ message: 'Cliente não encontrado' });
  }
  
  // Recalcular score
  const score = calcularScore(cliente);
  
  // Classificar risco
  const classificacaoRisco = classificarRisco(score);
  
  // Calcular limite sugerido
  const limiteSugerido = calcularLimiteCredito(cliente, score);
  
  // Sugerir taxa de juros
  const taxaJurosSugerida = sugerirTaxaJuros(score, cliente.segmento);
  
  // Definir parcelas sugeridas
  let parcelasSugeridas = [12, 24, 36];
  if (score >= 80) {
    parcelasSugeridas.push(48, 60);
  } else if (score < 50) {
    parcelasSugeridas = [12, 24];
  }
  
  // Definir ações sugeridas
  const acoesSugeridas = definirAcoesSugeridas(cliente, classificacaoRisco);
  
  // Atualizar análise de risco do cliente
  cliente.analiseRisco = {
    score,
    classificacao: classificacaoRisco.classificacao,
    nivelRisco: classificacaoRisco.nivelRisco,
    limiteSugerido,
    taxaJurosSugerida,
    parcelasSugeridas,
    acoesSugeridas
  };
  
  res.json(cliente.analiseRisco);
});

// Rota para simular um empréstimo
app.post('/api/simulacao', (req, res) => {
  const { clienteId, valor, parcelas } = req.body;
  
  if (!clienteId || !valor || !parcelas) {
    return res.status(400).json({ message: 'Dados incompletos para simulação' });
  }
  
  const cliente = clientes.find(c => c.id === clienteId);
  
  if (!cliente) {
    return res.status(404).json({ message: 'Cliente não encontrado' });
  }
  
  // Verificar se o valor está dentro do limite sugerido
  if (valor > cliente.analiseRisco.limiteSugerido) {
    return res.status(400).json({ 
      message: 'Valor solicitado acima do limite sugerido',
      limiteDisponivel: cliente.analiseRisco.limiteSugerido
    });
  }
  
  // Verificar se o número de parcelas está dentro do sugerido
  if (!cliente.analiseRisco.parcelasSugeridas.includes(parcelas)) {
    return res.status(400).json({ 
      message: 'Número de parcelas não recomendado para este perfil',
      parcelasSugeridas: cliente.analiseRisco.parcelasSugeridas
    });
  }
  
  // Calcular simulação
  const taxaMensal = cliente.analiseRisco.taxaJurosSugerida / 100;
  const valorParcela = (valor * (taxaMensal * Math.pow(1 + taxaMensal, parcelas))) / (Math.pow(1 + taxaMensal, parcelas) - 1);
  const valorTotal = valorParcela * parcelas;
  const custoEfetivo = valorTotal - valor;
  
  // Cálculo do IOF (simulado)
  const iofFixo = valor * 0.0038;
  const iofDiario = valor * 0.0000082 * 30 * (parcelas); // Aproximação simplificada
  const iofTotal = iofFixo + iofDiario;
  
  // Cálculo do CET (Custo Efetivo Total)
  const cet = ((Math.pow((1 + (custoEfetivo + iofTotal) / valor), 12) - 1) * 100).toFixed(2);
  
  const simulacao = {
    valorSolicitado: valor,
    numeroParcelas: parcelas,
    taxaJuros: cliente.analiseRisco.taxaJurosSugerida,
    valorParcela: parseFloat(valorParcela.toFixed(2)),
    valorTotal: parseFloat(valorTotal.toFixed(2)),
    custoEfetivo: parseFloat(custoEfetivo.toFixed(2)),
    iof: parseFloat(iofTotal.toFixed(2)),
    cet: parseFloat(cet),
    aprovacaoPreliminar: "Aprovado",
    dataSimulacao: new Date().toISOString()
  };
  
  res.json(simulacao);
});

// Rota para obter estatísticas gerais
app.get('/api/estatisticas', (req, res) => {
  const distribuicaoRisco = {
    "Muito Baixo": 0,
    "Baixo": 0,
    "Médio-Baixo": 0,
    "Médio": 0,
    "Médio-Alto": 0,
    "Alto": 0,
    "Muito Alto": 0
  };
  
  const distribuicaoSegmento = {};
  
  let scoreTotal = 0;
  let limiteTotal = 0;
  
  clientes.forEach(cliente => {
    // Contabilizar por nível de risco
    distribuicaoRisco[cliente.analiseRisco.nivelRisco]++;
    
    // Contabilizar por segmento
    distribuicaoSegmento[cliente.segmento] = (distribuicaoSegmento[cliente.segmento] || 0) + 1;
    
    // Somar scores e limites
    scoreTotal += cliente.analiseRisco.score;
    limiteTotal += cliente.analiseRisco.limiteSugerido;
  });
  
  const estatisticas = {
    totalClientes: clientes.length,
    scoreMedio: parseFloat((scoreTotal / clientes.length).toFixed(2)),
    limiteMedio: Math.round(limiteTotal / clientes.length),
    distribuicaoRisco,
    distribuicaoSegmento,
    clientesMaiorScore: clientes
      .sort((a, b) => b.analiseRisco.score - a.analiseRisco.score)
      .slice(0, 3)
      .map(c => ({ id: c.id, nome: c.nome, score: c.analiseRisco.score })),
    clientesMaiorRisco: clientes
      .sort((a, b) => a.analiseRisco.score - b.analiseRisco.score)
      .slice(0, 3)
      .map(c => ({ id: c.id, nome: c.nome, score: c.analiseRisco.score, nivelRisco: c.analiseRisco.nivelRisco }))
  };
  
  res.json(estatisticas);
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});