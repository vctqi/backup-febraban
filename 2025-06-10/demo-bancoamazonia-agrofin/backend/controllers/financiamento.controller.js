const financiamentoModel = require('../models/financiamento.model');

// Simular financiamento
exports.simular = (req, res) => {
  try {
    const dadosSimulacao = req.body;
    
    // Validar dados de entrada
    if (!dadosSimulacao.valorSolicitado || !dadosSimulacao.rendaMensal || !dadosSimulacao.tipoFinanciamento) {
      return res.status(400).json({ 
        success: false, 
        message: 'Dados incompletos. Informe valorSolicitado, rendaMensal e tipoFinanciamento.' 
      });
    }

    // Realizar simulação
    const resultado = financiamentoModel.simularFinanciamento(dadosSimulacao);
    
    res.status(200).json({
      success: true,
      data: resultado
    });
  } catch (error) {
    console.error('Erro ao simular financiamento:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao processar a simulação',
      error: error.message
    });
  }
};

// Obter opções de financiamento
exports.getOpcoes = (req, res) => {
  try {
    const opcoes = financiamentoModel.getOpcoesFinanciamento();
    
    res.status(200).json({
      success: true,
      data: opcoes
    });
  } catch (error) {
    console.error('Erro ao obter opções de financiamento:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao obter opções de financiamento',
      error: error.message
    });
  }
};