const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5099;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Dados simulados para financiamento
const tiposFinanciamento = [
  { 
    id: 'investimento_fixo', 
    nome: 'Investimento Fixo',
    descricao: 'Financiamento para aquisição de bens duráveis como máquinas, equipamentos e infraestrutura',
    taxaBase: 7.5
  },
  { 
    id: 'investimento_semifixo', 
    nome: 'Investimento Semifixo',
    descricao: 'Financiamento para veículos, implementos e outros bens de vida útil média',
    taxaBase: 8.0
  },
  { 
    id: 'custeio_agricola', 
    nome: 'Custeio Agrícola',
    descricao: 'Financiamento para despesas do ciclo produtivo de lavouras',
    taxaBase: 8.5
  },
  { 
    id: 'custeio_pecuario', 
    nome: 'Custeio Pecuário',
    descricao: 'Financiamento para despesas com criação de animais',
    taxaBase: 9.0,
    subtipos: [
      { id: 'aquicultura', nome: 'Aquicultura' },
      { id: 'recria_engorda', nome: 'Recria e Engorda' },
      { id: 'retencao_cria', nome: 'Retenção de Cria' },
      { id: 'outros', nome: 'Outras Finalidades' }
    ]
  }
];

// Funções de cálculo
const classificarRisco = (rendaMensal) => {
  if (rendaMensal >= 20000) return 'Baixo';
  if (rendaMensal >= 10000) return 'Médio-Baixo';
  if (rendaMensal >= 5000) return 'Médio';
  if (rendaMensal >= 2000) return 'Médio-Alto';
  return 'Alto';
};

const calcularTaxaJuros = (classificacaoRisco, tipoFinanciamento) => {
  const tipoEncontrado = tiposFinanciamento.find(tipo => tipo.id === tipoFinanciamento);
  const taxaBase = tipoEncontrado ? tipoEncontrado.taxaBase : 8.0;
  
  const ajusteRisco = {
    'Baixo': -2.0,
    'Médio-Baixo': -1.0,
    'Médio': 0,
    'Médio-Alto': 1.0,
    'Alto': 2.0
  };
  
  return taxaBase + (ajusteRisco[classificacaoRisco] || 0);
};

// Rotas
app.get('/', (req, res) => {
  res.json({ message: 'API de Financiamento Agropecuário do Banco da Amazônia' });
});

// Obter opções de financiamento
app.get('/api/financiamentos/opcoes', (req, res) => {
  res.json({
    success: true,
    data: {
      tiposFinanciamento,
      faixasRenda: [
        { id: 'baixa', descricao: 'Até R$ 2.000,00' },
        { id: 'media_baixa', descricao: 'De R$ 2.000,01 até R$ 5.000,00' },
        { id: 'media', descricao: 'De R$ 5.000,01 até R$ 10.000,00' },
        { id: 'media_alta', descricao: 'De R$ 10.000,01 até R$ 20.000,00' },
        { id: 'alta', descricao: 'Acima de R$ 20.000,00' }
      ]
    }
  });
});

// Simular financiamento
app.post('/api/financiamentos/simular', (req, res) => {
  try {
    const { valorSolicitado, rendaMensal, tipoFinanciamento, prazoMeses = 60, carenciaMeses = 0 } = req.body;
    
    if (!valorSolicitado || !rendaMensal || !tipoFinanciamento) {
      return res.status(400).json({
        success: false,
        message: 'Dados incompletos. Informe valorSolicitado, rendaMensal e tipoFinanciamento.'
      });
    }
    
    // Classificação de risco
    const classificacaoRisco = classificarRisco(rendaMensal);
    
    // Taxa de juros
    const taxaJuros = calcularTaxaJuros(classificacaoRisco, tipoFinanciamento);
    
    // Capacidade de pagamento (30% da renda)
    const capacidadePagamento = rendaMensal * 0.3;
    
    // Valor máximo financiável
    const valorMaximo = capacidadePagamento * prazoMeses * 0.8;
    
    // Valor ajustado se necessário
    const valorFinanciamento = valorSolicitado > valorMaximo ? valorMaximo : valorSolicitado;
    
    // Cálculo da parcela
    const taxaMensal = taxaJuros / 100 / 12;
    const parcela = valorFinanciamento * (taxaMensal / (1 - Math.pow(1 + taxaMensal, -(prazoMeses - carenciaMeses))));
    
    res.json({
      success: true,
      data: {
        valorFinanciamento,
        valorSolicitado,
        valorMaximo,
        taxaJuros,
        classificacaoRisco,
        prazoMeses: parseInt(prazoMeses, 10),
        carenciaMeses: parseInt(carenciaMeses, 10),
        parcela,
        capacidadePagamento
      }
    });
  } catch (error) {
    console.error('Erro ao simular financiamento:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao processar a simulação',
      error: error.message
    });
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});