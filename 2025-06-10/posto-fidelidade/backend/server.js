const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5010;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Dados simulados de clientes
const clientes = [
  {
    id: 1,
    nome: "João Silva",
    cpf: "123.456.789-10",
    email: "joao.silva@email.com",
    telefone: "(11) 98765-4321",
    pontos: 2500,
    cashback: 120.50,
    dataRegistro: "2024-01-15",
    historico: [
      { 
        id: 1, 
        tipo: "acumulo", 
        pontos: 500, 
        valor: 100.00, 
        cashback: 10.00, 
        data: "2024-01-20", 
        posto: "Posto Avenida Central", 
        combustivel: "Gasolina Aditivada" 
      },
      { 
        id: 2, 
        tipo: "acumulo", 
        pontos: 750, 
        valor: 150.00, 
        cashback: 15.00, 
        data: "2024-02-10", 
        posto: "Posto Rodovia Sul", 
        combustivel: "Etanol" 
      },
      { 
        id: 3, 
        tipo: "resgate", 
        pontos: -300, 
        valor: 0, 
        cashback: 0, 
        data: "2024-03-05", 
        posto: "Posto Avenida Central", 
        item: "Lavagem Completa" 
      },
      { 
        id: 4, 
        tipo: "acumulo", 
        pontos: 1250, 
        valor: 250.00, 
        cashback: 25.00, 
        data: "2024-04-12", 
        posto: "Posto Beira Mar", 
        combustivel: "Diesel S10" 
      },
      { 
        id: 5, 
        tipo: "resgate", 
        pontos: 0, 
        valor: 0, 
        cashback: -50.00, 
        data: "2024-05-20", 
        posto: "Posto Rodovia Sul", 
        item: "Óleo para Motor" 
      },
      { 
        id: 6, 
        tipo: "acumulo", 
        pontos: 300, 
        valor: 60.00, 
        cashback: 6.00, 
        data: "2024-06-01", 
        posto: "Posto Avenida Central", 
        combustivel: "Gasolina Comum" 
      }
    ]
  },
  {
    id: 2,
    nome: "Maria Oliveira",
    cpf: "987.654.321-00",
    email: "maria.oliveira@email.com",
    telefone: "(21) 91234-5678",
    pontos: 3800,
    cashback: 195.75,
    dataRegistro: "2023-11-05",
    historico: [
      { 
        id: 1, 
        tipo: "acumulo", 
        pontos: 800, 
        valor: 160.00, 
        cashback: 16.00, 
        data: "2023-11-10", 
        posto: "Posto Beira Mar", 
        combustivel: "Gasolina Premium" 
      },
      { 
        id: 2, 
        tipo: "acumulo", 
        pontos: 1200, 
        valor: 240.00, 
        cashback: 24.00, 
        data: "2023-12-15", 
        posto: "Posto Rodovia Sul", 
        combustivel: "Diesel S10" 
      },
      { 
        id: 3, 
        tipo: "resgate", 
        pontos: -500, 
        valor: 0, 
        cashback: 0, 
        data: "2024-01-05", 
        posto: "Posto Avenida Central", 
        item: "Troca de Óleo" 
      },
      { 
        id: 4, 
        tipo: "acumulo", 
        pontos: 950, 
        valor: 190.00, 
        cashback: 19.00, 
        data: "2024-02-20", 
        posto: "Posto Beira Mar", 
        combustivel: "Gasolina Aditivada" 
      },
      { 
        id: 5, 
        tipo: "resgate", 
        pontos: 0, 
        valor: 0, 
        cashback: -60.00, 
        data: "2024-03-15", 
        posto: "Posto Rodovia Sul", 
        item: "Kit Limpeza Automotiva" 
      },
      { 
        id: 6, 
        tipo: "acumulo", 
        pontos: 1350, 
        valor: 270.00, 
        cashback: 27.00, 
        data: "2024-04-10", 
        posto: "Posto Avenida Central", 
        combustivel: "Gasolina Premium" 
      }
    ]
  }
];

// Rotas
app.get('/api/clientes', (req, res) => {
  res.json(clientes.map(cliente => ({
    id: cliente.id,
    nome: cliente.nome,
    cpf: cliente.cpf,
    email: cliente.email,
    telefone: cliente.telefone,
    pontos: cliente.pontos,
    cashback: cliente.cashback,
    dataRegistro: cliente.dataRegistro
  })));
});

app.get('/api/clientes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const cliente = clientes.find(c => c.id === id);
  
  if (!cliente) {
    return res.status(404).json({ message: 'Cliente não encontrado' });
  }
  
  res.json(cliente);
});

app.get('/api/clientes/:id/historico', (req, res) => {
  const id = parseInt(req.params.id);
  const cliente = clientes.find(c => c.id === id);
  
  if (!cliente) {
    return res.status(404).json({ message: 'Cliente não encontrado' });
  }
  
  res.json(cliente.historico);
});

// Simulação de resgate de pontos ou cashback
app.post('/api/clientes/:id/resgate', (req, res) => {
  const id = parseInt(req.params.id);
  const { tipo, quantidade, item, posto } = req.body;
  
  const cliente = clientes.find(c => c.id === id);
  
  if (!cliente) {
    return res.status(404).json({ message: 'Cliente não encontrado' });
  }
  
  if (tipo === 'pontos' && quantidade > cliente.pontos) {
    return res.status(400).json({ message: 'Pontos insuficientes para resgate' });
  }
  
  if (tipo === 'cashback' && quantidade > cliente.cashback) {
    return res.status(400).json({ message: 'Cashback insuficiente para resgate' });
  }
  
  const novaTransacao = {
    id: cliente.historico.length + 1,
    tipo: 'resgate',
    pontos: tipo === 'pontos' ? -quantidade : 0,
    cashback: tipo === 'cashback' ? -quantidade : 0,
    valor: 0,
    data: new Date().toISOString().split('T')[0],
    posto: posto || 'Posto Avenida Central',
    item: item || 'Item não especificado'
  };
  
  if (tipo === 'pontos') {
    cliente.pontos -= quantidade;
  } else if (tipo === 'cashback') {
    cliente.cashback -= quantidade;
  }
  
  cliente.historico.push(novaTransacao);
  
  res.json({
    message: 'Resgate realizado com sucesso',
    transacao: novaTransacao
  });
});

// Simulação de acúmulo de pontos e cashback
app.post('/api/clientes/:id/acumulo', (req, res) => {
  const id = parseInt(req.params.id);
  const { valor, combustivel, posto } = req.body;
  
  const cliente = clientes.find(c => c.id === id);
  
  if (!cliente) {
    return res.status(404).json({ message: 'Cliente não encontrado' });
  }
  
  // Cálculo simplificado: 5 pontos por real gasto e 1% de cashback
  const pontos = Math.floor(valor * 5);
  const cashback = valor * 0.01;
  
  const novaTransacao = {
    id: cliente.historico.length + 1,
    tipo: 'acumulo',
    pontos: pontos,
    cashback: cashback,
    valor: valor,
    data: new Date().toISOString().split('T')[0],
    posto: posto || 'Posto Avenida Central',
    combustivel: combustivel || 'Gasolina Comum'
  };
  
  cliente.pontos += pontos;
  cliente.cashback += cashback;
  cliente.historico.push(novaTransacao);
  
  res.json({
    message: 'Acúmulo realizado com sucesso',
    transacao: novaTransacao
  });
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});