import axios from 'axios';

const API_URL = 'http://localhost:5099/api/financiamentos';

// Simulação de financiamento
export const simularFinanciamento = async (dadosSimulacao) => {
  try {
    const response = await axios.post(`${API_URL}/simular`, dadosSimulacao);
    return response.data.data;
  } catch (error) {
    console.error('Erro ao simular financiamento:', error);
    
    // Caso a API ainda não esteja disponível, retornar dados simulados
    if (!error.response) {
      return simularFinanciamentoOffline(dadosSimulacao);
    }
    
    throw error;
  }
};

// Obter opções de financiamento
export const getOpcoesFinanciamento = async () => {
  try {
    const response = await axios.get(`${API_URL}/opcoes`);
    return response.data.data;
  } catch (error) {
    console.error('Erro ao obter opções de financiamento:', error);
    
    // Caso a API ainda não esteja disponível, retornar dados simulados
    if (!error.response) {
      return getOpcoesFinanciamentoOffline();
    }
    
    throw error;
  }
};

// Função para simular financiamento offline (dados mockados)
const simularFinanciamentoOffline = (dados) => {
  const { 
    valorSolicitado, 
    rendaMensal, 
    tipoFinanciamento, 
    subTipo, 
    carencia = 0
  } = dados;
  
  // Classificação de risco baseada na renda
  let classificacaoRisco;
  if (rendaMensal >= 20000) {
    classificacaoRisco = 'Baixo';
  } else if (rendaMensal >= 10000) {
    classificacaoRisco = 'Médio-Baixo';
  } else if (rendaMensal >= 5000) {
    classificacaoRisco = 'Médio';
  } else if (rendaMensal >= 2000) {
    classificacaoRisco = 'Médio-Alto';
  } else {
    classificacaoRisco = 'Alto';
  }
  
  // Taxa de juros baseada no risco e tipo de financiamento
  let taxaJuros;
  switch (tipoFinanciamento) {
    case 'investimento_fixo':
      switch (classificacaoRisco) {
        case 'Baixo': taxaJuros = 5.5; break;
        case 'Médio-Baixo': taxaJuros = 6.5; break;
        case 'Médio': taxaJuros = 7.5; break;
        case 'Médio-Alto': taxaJuros = 8.5; break;
        case 'Alto': taxaJuros = 9.5; break;
        default: taxaJuros = 7.5;
      }
      break;
    case 'investimento_semifixo':
      switch (classificacaoRisco) {
        case 'Baixo': taxaJuros = 6.0; break;
        case 'Médio-Baixo': taxaJuros = 7.0; break;
        case 'Médio': taxaJuros = 8.0; break;
        case 'Médio-Alto': taxaJuros = 9.0; break;
        case 'Alto': taxaJuros = 10.0; break;
        default: taxaJuros = 8.0;
      }
      break;
    case 'custeio_agricola':
      switch (classificacaoRisco) {
        case 'Baixo': taxaJuros = 6.5; break;
        case 'Médio-Baixo': taxaJuros = 7.5; break;
        case 'Médio': taxaJuros = 8.5; break;
        case 'Médio-Alto': taxaJuros = 9.5; break;
        case 'Alto': taxaJuros = 10.5; break;
        default: taxaJuros = 8.5;
      }
      break;
    case 'custeio_pecuario':
      switch (classificacaoRisco) {
        case 'Baixo': taxaJuros = 7.0; break;
        case 'Médio-Baixo': taxaJuros = 8.0; break;
        case 'Médio': taxaJuros = 9.0; break;
        case 'Médio-Alto': taxaJuros = 10.0; break;
        case 'Alto': taxaJuros = 11.0; break;
        default: taxaJuros = 9.0;
      }
      break;
    default:
      taxaJuros = 8.0;
  }
  
  // Prazo baseado no tipo de financiamento
  let prazoMeses;
  if (tipoFinanciamento === 'investimento_fixo') {
    prazoMeses = 12 * 10; // 10 anos
  } else if (tipoFinanciamento === 'investimento_semifixo') {
    prazoMeses = 12 * 8; // 8 anos
  } else if (tipoFinanciamento === 'custeio_agricola') {
    prazoMeses = 12 * 2; // 2 anos
  } else if (tipoFinanciamento === 'custeio_pecuario') {
    // Prazo baseado no subtipo
    switch (subTipo) {
      case 'aquicultura': prazoMeses = 24; break;
      case 'recria_engorda': prazoMeses = 24; break;
      case 'retencao_cria': prazoMeses = 18; break;
      case 'retencao_cria_engorda': prazoMeses = 24; break;
      case 'engorda': prazoMeses = 12; break;
      case 'retencao_matrizes': prazoMeses = 24; break;
      default: prazoMeses = 12;
    }
  } else {
    prazoMeses = 12 * 5; // 5 anos (padrão)
  }
  
  // Capacidade de pagamento (30% da renda mensal)
  const capacidadePagamento = rendaMensal * 0.3;
  
  // Cálculo do valor máximo de financiamento
  const valorMaximo = capacidadePagamento * prazoMeses * 0.8; // 80% para segurança
  
  // Verificar se o valor solicitado é maior que o valor máximo
  const valorFinanciamento = valorSolicitado > valorMaximo ? valorMaximo : valorSolicitado;
  
  // Cálculo da parcela
  const taxaMensal = taxaJuros / 100 / 12;
  const parcela = valorFinanciamento * (taxaMensal / (1 - Math.pow(1 + taxaMensal, -(prazoMeses - carencia))));
  
  return {
    valorFinanciamento,
    valorSolicitado,
    valorMaximo,
    taxaJuros,
    classificacaoRisco,
    prazoMeses,
    carenciaMeses: parseInt(carencia, 10),
    parcela,
    capacidadePagamento
  };
};

// Função para obter opções de financiamento offline (dados mockados)
const getOpcoesFinanciamentoOffline = () => {
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