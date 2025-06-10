const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5017;

// Middleware
app.use(cors());
app.use(express.json());

// Dados simulados de investimentos
const investimentos = [
  {
    id: 1,
    nome: "CDB Banco TQI",
    tipo: "Renda Fixa",
    subTipo: "CDB",
    rentabilidade: "120% do CDI",
    valorMinimo: 1000,
    prazoResgate: "1 dia útil",
    liquidez: "D+1",
    risco: "Baixo",
    taxaAdministracao: 0,
    ir: "Regressivo de 22.5% a 15%",
    instituicao: "Banco TQI",
    garantia: "FGC até R$ 250 mil",
    dataVencimento: "2025-12-31",
    performance: [
      { mes: "Jan", rendimento: 0.9 },
      { mes: "Fev", rendimento: 0.85 },
      { mes: "Mar", rendimento: 0.92 },
      { mes: "Abr", rendimento: 0.88 },
      { mes: "Mai", rendimento: 0.95 },
      { mes: "Jun", rendimento: 0.90 }
    ]
  },
  {
    id: 2,
    nome: "LCI Imobiliária TQI",
    tipo: "Renda Fixa",
    subTipo: "LCI",
    rentabilidade: "98% do CDI",
    valorMinimo: 5000,
    prazoResgate: "Após 90 dias",
    liquidez: "D+90",
    risco: "Baixo",
    taxaAdministracao: 0,
    ir: "Isento para pessoa física",
    instituicao: "TQI Imobiliária",
    garantia: "FGC até R$ 250 mil",
    dataVencimento: "2026-06-30",
    performance: [
      { mes: "Jan", rendimento: 0.75 },
      { mes: "Fev", rendimento: 0.78 },
      { mes: "Mar", rendimento: 0.8 },
      { mes: "Abr", rendimento: 0.77 },
      { mes: "Mai", rendimento: 0.81 },
      { mes: "Jun", rendimento: 0.79 }
    ]
  },
  {
    id: 3,
    nome: "Tesouro Direto IPCA+",
    tipo: "Renda Fixa",
    subTipo: "Tesouro Direto",
    rentabilidade: "IPCA + 5.5% a.a.",
    valorMinimo: 100,
    prazoResgate: "D+1",
    liquidez: "D+1",
    risco: "Baixíssimo",
    taxaAdministracao: 0.25,
    ir: "Regressivo de 22.5% a 15%",
    instituicao: "Tesouro Nacional",
    garantia: "Governo Federal",
    dataVencimento: "2035-05-15",
    performance: [
      { mes: "Jan", rendimento: 1.1 },
      { mes: "Fev", rendimento: 0.95 },
      { mes: "Mar", rendimento: 1.05 },
      { mes: "Abr", rendimento: 1.2 },
      { mes: "Mai", rendimento: 0.9 },
      { mes: "Jun", rendimento: 1.0 }
    ]
  },
  {
    id: 4,
    nome: "Fundo de Ações TQI Tech",
    tipo: "Renda Variável",
    subTipo: "Fundo de Ações",
    rentabilidade: "Variável (15% a.a. últimos 5 anos)",
    valorMinimo: 500,
    prazoResgate: "D+4",
    liquidez: "D+4",
    risco: "Alto",
    taxaAdministracao: 1.5,
    ir: "15% sobre o ganho de capital",
    instituicao: "TQI Investimentos",
    garantia: "Não possui",
    dataVencimento: "Não possui",
    performance: [
      { mes: "Jan", rendimento: 2.5 },
      { mes: "Fev", rendimento: -1.8 },
      { mes: "Mar", rendimento: 3.2 },
      { mes: "Abr", rendimento: 1.5 },
      { mes: "Mai", rendimento: -0.8 },
      { mes: "Jun", rendimento: 2.2 }
    ]
  },
  {
    id: 5,
    nome: "FII TQI Real Estate",
    tipo: "Renda Variável",
    subTipo: "Fundo Imobiliário",
    rentabilidade: "Dividend Yield de 8% a.a.",
    valorMinimo: 1000,
    prazoResgate: "D+2 (mercado secundário)",
    liquidez: "Média",
    risco: "Médio",
    taxaAdministracao: 0.8,
    ir: "Isento sobre dividendos",
    instituicao: "TQI Investimentos",
    garantia: "Não possui",
    dataVencimento: "Não possui",
    performance: [
      { mes: "Jan", rendimento: 0.7 },
      { mes: "Fev", rendimento: 0.65 },
      { mes: "Mar", rendimento: 0.72 },
      { mes: "Abr", rendimento: 0.68 },
      { mes: "Mai", rendimento: 0.71 },
      { mes: "Jun", rendimento: 0.7 }
    ]
  },
  {
    id: 6,
    nome: "Debênture TQI Energia",
    tipo: "Renda Fixa",
    subTipo: "Debênture",
    rentabilidade: "IPCA + 7% a.a.",
    valorMinimo: 10000,
    prazoResgate: "Vencimento ou mercado secundário",
    liquidez: "Baixa",
    risco: "Médio",
    taxaAdministracao: 0,
    ir: "Isento para pessoa física",
    instituicao: "TQI Energia",
    garantia: "Não possui FGC",
    dataVencimento: "2028-08-15",
    performance: [
      { mes: "Jan", rendimento: 1.2 },
      { mes: "Fev", rendimento: 1.15 },
      { mes: "Mar", rendimento: 1.25 },
      { mes: "Abr", rendimento: 1.18 },
      { mes: "Mai", rendimento: 1.22 },
      { mes: "Jun", rendimento: 1.2 }
    ]
  },
  {
    id: 7,
    nome: "ETF TQI Índice",
    tipo: "Renda Variável",
    subTipo: "ETF",
    rentabilidade: "Segue Ibovespa",
    valorMinimo: 100,
    prazoResgate: "D+2",
    liquidez: "Alta",
    risco: "Alto",
    taxaAdministracao: 0.5,
    ir: "15% sobre o ganho de capital",
    instituicao: "TQI Investimentos",
    garantia: "Não possui",
    dataVencimento: "Não possui",
    performance: [
      { mes: "Jan", rendimento: 1.8 },
      { mes: "Fev", rendimento: -1.2 },
      { mes: "Mar", rendimento: 2.5 },
      { mes: "Abr", rendimento: 1.3 },
      { mes: "Mai", rendimento: -0.5 },
      { mes: "Jun", rendimento: 1.9 }
    ]
  },
  {
    id: 8,
    nome: "Previdência Privada TQI Future",
    tipo: "Previdência",
    subTipo: "PGBL",
    rentabilidade: "100% do CDI",
    valorMinimo: 200,
    prazoResgate: "D+5 a D+60 dependendo do plano",
    liquidez: "Média",
    risco: "Baixo a Médio",
    taxaAdministracao: 2.0,
    ir: "Tabela regressiva ou progressiva",
    instituicao: "TQI Previdência",
    garantia: "Não possui FGC",
    dataVencimento: "Não possui",
    performance: [
      { mes: "Jan", rendimento: 0.85 },
      { mes: "Fev", rendimento: 0.8 },
      { mes: "Mar", rendimento: 0.87 },
      { mes: "Abr", rendimento: 0.83 },
      { mes: "Mai", rendimento: 0.89 },
      { mes: "Jun", rendimento: 0.84 }
    ]
  }
];

// Estatísticas para o dashboard
const estatisticas = {
  totalInvestimentos: investimentos.length,
  distribuicaoTipos: {
    "Renda Fixa": investimentos.filter(inv => inv.tipo === "Renda Fixa").length,
    "Renda Variável": investimentos.filter(inv => inv.tipo === "Renda Variável").length,
    "Previdência": investimentos.filter(inv => inv.tipo === "Previdência").length
  },
  valorMedioMinimo: investimentos.reduce((acc, inv) => acc + inv.valorMinimo, 0) / investimentos.length,
  rendimentoMedio: 0.95, // Valor fictício para exemplo
  melhoresRetornos: [
    { nome: "Fundo de Ações TQI Tech", retorno: "18.5% a.a." },
    { nome: "Debênture TQI Energia", retorno: "IPCA + 7% a.a." },
    { nome: "ETF TQI Índice", retorno: "15.2% a.a." }
  ]
};

// Rotas
app.get('/', (req, res) => {
  res.json({ message: 'API TQI Invest funcionando!' });
});

// Rota para todos os investimentos
app.get('/api/investimentos', (req, res) => {
  // Filtros
  const { tipo, valorMinimo, liquidez } = req.query;
  
  let resultados = [...investimentos];
  
  if (tipo) {
    resultados = resultados.filter(inv => inv.tipo.toLowerCase() === tipo.toLowerCase() || 
                                        inv.subTipo.toLowerCase() === tipo.toLowerCase());
  }
  
  if (valorMinimo) {
    resultados = resultados.filter(inv => inv.valorMinimo <= parseFloat(valorMinimo));
  }
  
  if (liquidez) {
    if (liquidez === 'alta') {
      resultados = resultados.filter(inv => ['D+0', 'D+1', 'D+2'].some(liq => inv.liquidez.includes(liq)));
    } else if (liquidez === 'media') {
      resultados = resultados.filter(inv => ['D+3', 'D+4', 'D+5'].some(liq => inv.liquidez.includes(liq)));
    } else if (liquidez === 'baixa') {
      resultados = resultados.filter(inv => !['D+0', 'D+1', 'D+2', 'D+3', 'D+4', 'D+5'].some(liq => inv.liquidez.includes(liq)));
    }
  }
  
  res.json(resultados);
});

// Rota para um investimento específico
app.get('/api/investimentos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const investimento = investimentos.find(inv => inv.id === id);
  
  if (!investimento) {
    return res.status(404).json({ message: 'Investimento não encontrado' });
  }
  
  res.json(investimento);
});

// Rota para estatísticas
app.get('/api/estatisticas', (req, res) => {
  res.json(estatisticas);
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});