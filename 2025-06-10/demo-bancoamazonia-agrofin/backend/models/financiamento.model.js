// Modelo para simulação de financiamento

// Classificação de risco baseada na faixa de renda
const classificarRisco = (rendaMensal) => {
  if (rendaMensal >= 20000) return 'Baixo';
  if (rendaMensal >= 10000) return 'Médio-Baixo';
  if (rendaMensal >= 5000) return 'Médio';
  if (rendaMensal >= 2000) return 'Médio-Alto';
  return 'Alto';
};

// Taxas de juros baseadas no risco e tipo de financiamento
const calcularTaxaJuros = (classificacaoRisco, tipoFinanciamento) => {
  const taxasBase = {
    'investimento_fixo': {
      'Baixo': 0.055, // 5.5% ao ano
      'Médio-Baixo': 0.065, // 6.5% ao ano
      'Médio': 0.075, // 7.5% ao ano
      'Médio-Alto': 0.085, // 8.5% ao ano
      'Alto': 0.095 // 9.5% ao ano
    },
    'investimento_semifixo': {
      'Baixo': 0.060, // 6.0% ao ano
      'Médio-Baixo': 0.070, // 7.0% ao ano
      'Médio': 0.080, // 8.0% ao ano
      'Médio-Alto': 0.090, // 9.0% ao ano
      'Alto': 0.100 // 10.0% ao ano
    },
    'custeio_agricola': {
      'Baixo': 0.065, // 6.5% ao ano
      'Médio-Baixo': 0.075, // 7.5% ao ano
      'Médio': 0.085, // 8.5% ao ano
      'Médio-Alto': 0.095, // 9.5% ao ano
      'Alto': 0.105 // 10.5% ao ano
    },
    'custeio_pecuario': {
      'Baixo': 0.070, // 7.0% ao ano
      'Médio-Baixo': 0.080, // 8.0% ao ano
      'Médio': 0.090, // 9.0% ao ano
      'Médio-Alto': 0.100, // 10.0% ao ano
      'Alto': 0.110 // 11.0% ao ano
    }
  };

  return taxasBase[tipoFinanciamento][classificacaoRisco];
};

// Calcular prazo baseado no tipo de financiamento
const calcularPrazo = (tipoFinanciamento, subTipo) => {
  const prazos = {
    'investimento_fixo': 12 * 10, // 10 anos em meses
    'investimento_semifixo': 12 * 8, // 8 anos em meses
    'custeio_agricola': 12 * 2, // 2 anos em meses
    'custeio_pecuario': {
      'aquicultura': 24, // 24 meses
      'recria_engorda': 24, // 24 meses
      'retencao_cria': 18, // 18 meses
      'retencao_cria_engorda': 24, // 24 meses
      'engorda': 12, // 12 meses
      'retencao_matrizes': 24, // 24 meses
      'outros': 12 // 12 meses
    }
  };

  if (tipoFinanciamento === 'custeio_pecuario' && subTipo) {
    return prazos[tipoFinanciamento][subTipo];
  }

  return prazos[tipoFinanciamento];
};

// Calcular capacidade de pagamento (simplificado)
const calcularCapacidadePagamento = (rendaMensal) => {
  // Assumindo que 30% da renda pode ser comprometida com o financiamento
  return rendaMensal * 0.3;
};

// Calcular valor máximo de financiamento
const calcularValorMaximo = (rendaMensal, tipoFinanciamento, subTipo) => {
  const capacidade = calcularCapacidadePagamento(rendaMensal);
  const prazo = calcularPrazo(tipoFinanciamento, subTipo);
  
  // Valor máximo como um múltiplo da capacidade de pagamento mensal pelo prazo
  // Este é um cálculo simplificado para demonstração
  return capacidade * prazo * 0.8; // 80% para ter margem de segurança
};

// Calcular valor da parcela
const calcularParcela = (valorFinanciamento, taxaJuros, prazoMeses) => {
  const taxaMensal = taxaJuros / 12;
  const parcela = valorFinanciamento * (taxaMensal / (1 - Math.pow(1 + taxaMensal, -prazoMeses)));
  return parcela;
};

// Simular financiamento
const simularFinanciamento = (dados) => {
  const { 
    valorSolicitado, 
    rendaMensal, 
    tipoFinanciamento, 
    subTipo, 
    carencia 
  } = dados;

  const classificacaoRisco = classificarRisco(rendaMensal);
  const taxaJuros = calcularTaxaJuros(classificacaoRisco, tipoFinanciamento);
  const prazoMeses = calcularPrazo(tipoFinanciamento, subTipo);
  const capacidadePagamento = calcularCapacidadePagamento(rendaMensal);
  const valorMaximo = calcularValorMaximo(rendaMensal, tipoFinanciamento, subTipo);
  
  // Se o valor solicitado for maior que o valor máximo, ajustar
  const valorFinanciamento = valorSolicitado > valorMaximo ? valorMaximo : valorSolicitado;
  const parcela = calcularParcela(valorFinanciamento, taxaJuros, prazoMeses - (carencia || 0));

  return {
    valorFinanciamento,
    valorSolicitado,
    valorMaximo,
    taxaJuros: taxaJuros * 100, // Converter para percentual
    classificacaoRisco,
    prazoMeses,
    carenciaMeses: carencia || 0,
    parcela,
    capacidadePagamento
  };
};

// Obter opções de financiamento
const getOpcoesFinanciamento = () => {
  return {
    tiposFinanciamento: [
      { 
        id: 'investimento_fixo', 
        nome: 'Investimento Fixo',
        descricao: 'Financiamento para aquisição de bens duráveis como máquinas, equipamentos e infraestrutura'
      },
      { 
        id: 'investimento_semifixo', 
        nome: 'Investimento Semifixo',
        descricao: 'Financiamento para veículos, implementos e outros bens de vida útil média'
      },
      { 
        id: 'custeio_agricola', 
        nome: 'Custeio Agrícola',
        descricao: 'Financiamento para despesas do ciclo produtivo de lavouras'
      },
      { 
        id: 'custeio_pecuario', 
        nome: 'Custeio Pecuário',
        descricao: 'Financiamento para despesas com criação de animais',
        subtipos: [
          { id: 'aquicultura', nome: 'Aquicultura' },
          { id: 'recria_engorda', nome: 'Recria e Engorda' },
          { id: 'retencao_cria', nome: 'Retenção de Cria' },
          { id: 'retencao_cria_engorda', nome: 'Retenção de Cria e Engorda' },
          { id: 'engorda', nome: 'Engorda' },
          { id: 'retencao_matrizes', nome: 'Retenção de Matrizes' },
          { id: 'outros', nome: 'Outras Finalidades' }
        ]
      }
    ],
    faixasRenda: [
      { id: 'baixa', descricao: 'Até R$ 2.000,00' },
      { id: 'media_baixa', descricao: 'De R$ 2.000,01 até R$ 5.000,00' },
      { id: 'media', descricao: 'De R$ 5.000,01 até R$ 10.000,00' },
      { id: 'media_alta', descricao: 'De R$ 10.000,01 até R$ 20.000,00' },
      { id: 'alta', descricao: 'Acima de R$ 20.000,00' }
    ]
  };
};

module.exports = {
  simularFinanciamento,
  getOpcoesFinanciamento
};