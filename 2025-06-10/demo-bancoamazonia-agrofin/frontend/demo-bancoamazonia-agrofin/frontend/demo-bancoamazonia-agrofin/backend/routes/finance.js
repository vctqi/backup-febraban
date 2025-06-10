const express = require('express');
const router = express.Router();

// Dados simulados de taxas de juros baseadas em faixas de renda
const INTEREST_RATES = {
  LOW_INCOME: {
    min: 0,
    max: 3000,
    rates: {
      FNO_RURAL: 4.5,
      PRONAF: 2.75,
      PRONAMP: 5.5,
      INOVAGRO: 6.0
    }
  },
  MEDIUM_INCOME: {
    min: 3001,
    max: 10000,
    rates: {
      FNO_RURAL: 6.0,
      PRONAF: 3.5,
      PRONAMP: 7.0,
      INOVAGRO: 8.0
    }
  },
  HIGH_INCOME: {
    min: 10001,
    max: Infinity,
    rates: {
      FNO_RURAL: 8.5,
      PRONAF: 5.0,
      PRONAMP: 9.5,
      INOVAGRO: 10.5
    }
  }
};

// Opções de financiamento
const FINANCING_OPTIONS = [
  {
    id: 'FNO_RURAL',
    name: 'FNO - Amazônia Rural',
    description: 'Financiamento para produtores rurais na região da Amazônia',
    minValue: 10000,
    maxValue: 1000000,
    minTerm: 12,
    maxTerm: 120,
    eligible: 'Produtores rurais de todos os portes'
  },
  {
    id: 'PRONAF',
    name: 'PRONAF - Programa Nacional de Fortalecimento da Agricultura Familiar',
    description: 'Financiamento para agricultores familiares e assentados da reforma agrária',
    minValue: 5000,
    maxValue: 200000,
    minTerm: 12,
    maxTerm: 60,
    eligible: 'Agricultores familiares com DAP (Declaração de Aptidão ao PRONAF)'
  },
  {
    id: 'PRONAMP',
    name: 'PRONAMP - Programa Nacional de Apoio ao Médio Produtor Rural',
    description: 'Financiamento para médios produtores rurais',
    minValue: 20000,
    maxValue: 500000,
    minTerm: 24,
    maxTerm: 96,
    eligible: 'Médios produtores rurais'
  },
  {
    id: 'INOVAGRO',
    name: 'INOVAGRO - Programa de Incentivo à Inovação Tecnológica na Produção Agropecuária',
    description: 'Financiamento para inovação tecnológica na agropecuária',
    minValue: 30000,
    maxValue: 1500000,
    minTerm: 36,
    maxTerm: 120,
    eligible: 'Produtores rurais interessados em tecnologia'
  }
];

// Rota para obter todas as opções de financiamento
router.get('/options', (req, res) => {
  res.json(FINANCING_OPTIONS);
});

// Calcular o valor da parcela (sistema de amortização constante - SAC)
function calculateInstallment(amount, interestRate, months) {
  const monthlyRate = interestRate / 100 / 12;
  const amortization = amount / months;
  
  // Array para armazenar os valores de cada parcela
  const installments = [];
  
  let remainingBalance = amount;
  
  for (let i = 1; i <= months; i++) {
    const interest = remainingBalance * monthlyRate;
    const installment = amortization + interest;
    
    remainingBalance -= amortization;
    
    installments.push({
      number: i,
      amortization: parseFloat(amortization.toFixed(2)),
      interest: parseFloat(interest.toFixed(2)),
      value: parseFloat(installment.toFixed(2)),
      remainingBalance: parseFloat(remainingBalance.toFixed(2))
    });
  }
  
  return {
    firstInstallment: installments[0].value,
    lastInstallment: installments[installments.length - 1].value,
    totalPayment: parseFloat(installments.reduce((sum, inst) => sum + inst.value, 0).toFixed(2)),
    totalInterest: parseFloat(installments.reduce((sum, inst) => sum + inst.interest, 0).toFixed(2)),
    installments: installments
  };
}

// Determinar a faixa de renda com base na renda mensal
function getIncomeRange(monthlyIncome) {
  if (monthlyIncome <= INTEREST_RATES.LOW_INCOME.max) {
    return 'LOW_INCOME';
  } else if (monthlyIncome <= INTEREST_RATES.MEDIUM_INCOME.max) {
    return 'MEDIUM_INCOME';
  } else {
    return 'HIGH_INCOME';
  }
}

// Rota para simular financiamento
router.post('/simulate', (req, res) => {
  const { amount, term, programId, monthlyIncome } = req.body;
  
  // Validações básicas
  if (!amount || !term || !programId || !monthlyIncome) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
  }
  
  const program = FINANCING_OPTIONS.find(option => option.id === programId);
  if (!program) {
    return res.status(404).json({ error: 'Programa de financiamento não encontrado' });
  }
  
  // Verificar se valor está dentro dos limites
  if (amount < program.minValue || amount > program.maxValue) {
    return res.status(400).json({ 
      error: `O valor solicitado deve estar entre R$ ${program.minValue} e R$ ${program.maxValue}` 
    });
  }
  
  // Verificar se prazo está dentro dos limites
  if (term < program.minTerm || term > program.maxTerm) {
    return res.status(400).json({ 
      error: `O prazo deve estar entre ${program.minTerm} e ${program.maxTerm} meses` 
    });
  }
  
  // Determinar faixa de renda e taxa de juros aplicável
  const incomeRange = getIncomeRange(monthlyIncome);
  const interestRate = INTEREST_RATES[incomeRange].rates[programId];
  
  // Calcular parcelas
  const result = calculateInstallment(amount, interestRate, term);
  
  // Determinar o comprometimento da renda
  const incomeCommitment = parseFloat(((result.firstInstallment / monthlyIncome) * 100).toFixed(2));
  
  // Determinar se o comprometimento é sustentável
  let recommendation;
  if (incomeCommitment <= 30) {
    recommendation = {
      status: 'APPROVED',
      message: 'Financiamento recomendado. O comprometimento de renda está em um nível seguro.',
      alternative: null
    };
  } else if (incomeCommitment <= 40) {
    recommendation = {
      status: 'WARNING',
      message: 'Financiamento possível, mas com comprometimento de renda elevado. Considere um prazo maior ou valor menor.',
      alternative: {
        suggestion: 'Aumente o prazo ou reduza o valor',
        options: [
          { term: Math.min(term + 12, program.maxTerm), amount },
          { term, amount: Math.round(amount * 0.8) }
        ]
      }
    };
  } else {
    recommendation = {
      status: 'NOT_RECOMMENDED',
      message: 'Financiamento não recomendado. O comprometimento de renda é muito elevado.',
      alternative: {
        suggestion: 'Considere um valor menor ou um prazo significativamente maior',
        options: [
          { term: Math.min(term + 24, program.maxTerm), amount: Math.round(amount * 0.7) },
          { term: Math.min(term + 36, program.maxTerm), amount: Math.round(amount * 0.8) }
        ]
      }
    };
  }
  
  // Resultado final
  res.json({
    simulation: {
      program: program.name,
      amount,
      term,
      interestRate,
      monthlyIncome,
      incomeRange,
      incomeCommitment: `${incomeCommitment}%`,
      ...result
    },
    recommendation
  });
});

// Rota para obter taxas de juros baseadas na renda
router.get('/interest-rates', (req, res) => {
  res.json(INTEREST_RATES);
});

module.exports = router;