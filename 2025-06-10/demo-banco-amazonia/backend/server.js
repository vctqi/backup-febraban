const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
const PORT = 5019;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Dados simulados de linhas de crédito
const linhasCredito = [
  {
    id: 1,
    nome: "FNO - Amazônia Rural",
    descricao: "Financiamento para atividades rurais na região amazônica",
    taxaMinima: 5.5,
    taxaMaxima: 7.5,
    prazoMaximo: 12,
    valorMinimo: 10000,
    valorMaximo: 500000,
    garantias: ["Hipoteca", "Alienação fiduciária", "Aval"],
    beneficiarios: "Produtores rurais, pessoas físicas e jurídicas, e cooperativas"
  },
  {
    id: 2,
    nome: "PRONAF - Agricultura Familiar",
    descricao: "Financiamento para agricultura familiar",
    taxaMinima: 2.75,
    taxaMaxima: 4.5,
    prazoMaximo: 10,
    valorMinimo: 5000,
    valorMaximo: 200000,
    garantias: ["Penhor cedular", "Aval solidário"],
    beneficiarios: "Agricultores familiares com declaração de aptidão ao PRONAF"
  },
  {
    id: 3,
    nome: "FNO - Biodiversidade",
    descricao: "Financiamento para sistemas produtivos sustentáveis",
    taxaMinima: 4.5,
    taxaMaxima: 6.0,
    prazoMaximo: 15,
    valorMinimo: 20000,
    valorMaximo: 800000,
    garantias: ["Hipoteca", "Alienação fiduciária", "Aval", "Penhor"],
    beneficiarios: "Produtores rurais comprometidos com práticas sustentáveis"
  },
  {
    id: 4,
    nome: "Investimento Agropecuário",
    descricao: "Financiamento para modernização da propriedade rural",
    taxaMinima: 6.0,
    taxaMaxima: 8.5,
    prazoMaximo: 8,
    valorMinimo: 30000,
    valorMaximo: 1000000,
    garantias: ["Hipoteca", "Alienação fiduciária", "Penhor de safra"],
    beneficiarios: "Produtores rurais e empresas do agronegócio"
  },
  {
    id: 5,
    nome: "Amazônia Rural Verde",
    descricao: "Financiamento para atividades com baixo impacto ambiental",
    taxaMinima: 4.0,
    taxaMaxima: 6.0,
    prazoMaximo: 15,
    valorMinimo: 15000,
    valorMaximo: 600000,
    garantias: ["Hipoteca", "Alienação fiduciária", "Aval"],
    beneficiarios: "Produtores rurais com projetos sustentáveis"
  }
];

// Perfis de risco e faixas de renda
const perfisRisco = [
  { 
    faixa: "A", 
    descricao: "Baixo Risco", 
    rendaMinima: 150000, 
    reducaoTaxa: 1.0, 
    aumentoLimite: 1.2 
  },
  { 
    faixa: "B", 
    descricao: "Médio-Baixo Risco", 
    rendaMinima: 80000, 
    reducaoTaxa: 0.7, 
    aumentoLimite: 1.1 
  },
  { 
    faixa: "C", 
    descricao: "Médio Risco", 
    rendaMinima: 40000, 
    reducaoTaxa: 0.3, 
    aumentoLimite: 1.0 
  },
  { 
    faixa: "D", 
    descricao: "Médio-Alto Risco", 
    rendaMinima: 20000, 
    reducaoTaxa: 0, 
    aumentoLimite: 0.9 
  },
  { 
    faixa: "E", 
    descricao: "Alto Risco", 
    rendaMinima: 0, 
    reducaoTaxa: -0.5, 
    aumentoLimite: 0.7 
  }
];

// Rotas
app.get('/api/linhas-credito', (req, res) => {
  res.json(linhasCredito);
});

app.get('/api/perfis-risco', (req, res) => {
  res.json(perfisRisco);
});

// Rota para obter sugestão com base no perfil
app.post('/api/simulacao', (req, res) => {
  try {
    const { 
      valorSolicitado, 
      prazo, 
      rendaAnual, 
      tipo, 
      finalidade,
      tempoAtividade,
      possuiOutrosFinanciamentos,
      areaProdutiva
    } = req.body;

    // Validação básica de entrada
    if (!valorSolicitado || !prazo || !rendaAnual) {
      return res.status(400).json({ erro: "Dados insuficientes para simulação" });
    }

    // Determinar faixa de risco baseado na renda anual
    const perfilRisco = perfisRisco.find(p => rendaAnual >= p.rendaMinima);
    
    // Calcular score adicional (0-100)
    let scoreAdicional = 0;
    
    // Tempo de atividade (0-30 pontos)
    scoreAdicional += Math.min(30, tempoAtividade * 3);
    
    // Área produtiva (0-25 pontos)
    scoreAdicional += Math.min(25, areaProdutiva * 0.1);
    
    // Sem outros financiamentos (0-20 pontos)
    if (!possuiOutrosFinanciamentos) {
      scoreAdicional += 20;
    }
    
    // Ajustar a faixa de risco com base no score adicional
    let ajusteFaixa = 0;
    if (scoreAdicional >= 80) ajusteFaixa = 2;
    else if (scoreAdicional >= 60) ajusteFaixa = 1;
    
    // Encontrar linhas de crédito adequadas
    const linhasAdequadas = linhasCredito.filter(linha => 
      valorSolicitado >= linha.valorMinimo && 
      valorSolicitado <= linha.valorMaximo * perfilRisco.aumentoLimite &&
      prazo <= linha.prazoMaximo
    );

    // Calcular simulações para cada linha
    const simulacoes = linhasAdequadas.map(linha => {
      // Calcular taxa ajustada ao perfil de risco
      const taxaBase = (linha.taxaMinima + linha.taxaMaxima) / 2;
      const taxaAjustada = Math.max(linha.taxaMinima, taxaBase - perfilRisco.reducaoTaxa);
      
      // Taxa efetiva com ajustes adicionais (score)
      const reducaoScore = scoreAdicional * 0.01; // Até 1% de redução
      const taxaEfetiva = Math.max(linha.taxaMinima, taxaAjustada - reducaoScore);
      
      // Cálculo do valor da parcela (sistema de amortização constante)
      const valorParcela = (valorSolicitado / prazo) + (valorSolicitado * (taxaEfetiva/100));
      const valorTotal = valorParcela * prazo;
      
      return {
        linha: linha.nome,
        descricao: linha.descricao,
        valorSolicitado,
        prazo,
        taxaEfetiva: taxaEfetiva.toFixed(2),
        valorParcela: valorParcela.toFixed(2),
        valorTotal: valorTotal.toFixed(2),
        economia: ((valorSolicitado * (linha.taxaMaxima/100) * prazo) - (valorSolicitado * (taxaEfetiva/100) * prazo)).toFixed(2)
      };
    });

    // Ordenar simulações pela menor taxa
    simulacoes.sort((a, b) => parseFloat(a.taxaEfetiva) - parseFloat(b.taxaEfetiva));

    const resposta = {
      perfilRisco: {
        faixa: perfilRisco.faixa,
        descricao: perfilRisco.descricao,
        scoreAdicional,
        faixaAjustada: ajusteFaixa > 0 ? "Sim" : "Não"
      },
      simulacoes,
      recomendacao: simulacoes.length > 0 ? simulacoes[0] : null
    };

    res.json(resposta);
  } catch (erro) {
    console.error("Erro na simulação:", erro);
    res.status(500).json({ erro: "Erro ao processar a simulação" });
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});