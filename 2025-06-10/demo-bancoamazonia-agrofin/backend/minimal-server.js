const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5099;

// Middleware
app.use(cors());
app.use(express.json());

// Rota principal
app.get('/', (req, res) => {
  res.json({ message: 'API de Financiamento Agropecuário do Banco da Amazônia' });
});

// Obter opções de financiamento
app.get('/api/financiamentos/opcoes', (req, res) => {
  res.json({
    success: true,
    data: {
      tiposFinanciamento: [
        { id: 'investimento_fixo', nome: 'Investimento Fixo' },
        { id: 'investimento_semifixo', nome: 'Investimento Semifixo' },
        { id: 'custeio_agricola', nome: 'Custeio Agrícola' },
        { id: 'custeio_pecuario', nome: 'Custeio Pecuário' }
      ],
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
    const { valorSolicitado, rendaMensal, tipoFinanciamento, prazoMeses = 60 } = req.body;
    
    if (!valorSolicitado || !rendaMensal || !tipoFinanciamento) {
      return res.status(400).json({
        success: false,
        message: 'Dados incompletos. Informe valorSolicitado, rendaMensal e tipoFinanciamento.'
      });
    }
    
    // Valores simulados simplificados
    const classificacaoRisco = rendaMensal >= 5000 ? 'Baixo' : 'Médio';
    const taxaJuros = rendaMensal >= 5000 ? 7.5 : 9.5;
    const capacidadePagamento = rendaMensal * 0.3;
    const valorMaximo = capacidadePagamento * prazoMeses * 0.8;
    const valorFinanciamento = valorSolicitado > valorMaximo ? valorMaximo : valorSolicitado;
    const taxaMensal = taxaJuros / 100 / 12;
    const parcela = valorFinanciamento * (taxaMensal / (1 - Math.pow(1 + taxaMensal, -prazoMeses)));
    
    res.json({
      success: true,
      data: {
        valorFinanciamento,
        valorSolicitado,
        valorMaximo,
        taxaJuros,
        classificacaoRisco,
        prazoMeses: parseInt(prazoMeses, 10),
        carenciaMeses: 0,
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