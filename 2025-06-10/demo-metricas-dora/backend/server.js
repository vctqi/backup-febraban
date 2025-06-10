const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5999;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Dados de exemplo para as métricas DORA de cada time
const teamsData = [
  {
    id: 1,
    name: "Time DevOps",
    deploymentFrequency: {
      value: 25,
      unit: "por mês",
      trend: "up",
      status: "elite"
    },
    leadTimeForChanges: {
      value: 2.5,
      unit: "dias",
      trend: "down",
      status: "high"
    },
    meanTimeToRestore: {
      value: 3,
      unit: "horas",
      trend: "down",
      status: "elite"
    },
    changeFailureRate: {
      value: 12,
      unit: "%",
      trend: "down",
      status: "high"
    },
    historicalData: Array(12).fill(null).map((_, i) => ({
      date: `2025-${(i + 1).toString().padStart(2, '0')}-01`,
      deploymentFrequency: 20 + Math.floor(Math.random() * 10),
      leadTimeForChanges: 2 + Math.random() * 1.5,
      meanTimeToRestore: 2 + Math.random() * 2,
      changeFailureRate: 10 + Math.random() * 5
    }))
  },
  {
    id: 2,
    name: "Time Plataforma",
    deploymentFrequency: {
      value: 15,
      unit: "por mês",
      trend: "up",
      status: "high"
    },
    leadTimeForChanges: {
      value: 3.2,
      unit: "dias",
      trend: "stable",
      status: "medium"
    },
    meanTimeToRestore: {
      value: 5,
      unit: "horas",
      trend: "down",
      status: "high"
    },
    changeFailureRate: {
      value: 18,
      unit: "%",
      trend: "up",
      status: "medium"
    },
    historicalData: Array(12).fill(null).map((_, i) => ({
      date: `2025-${(i + 1).toString().padStart(2, '0')}-01`,
      deploymentFrequency: 12 + Math.floor(Math.random() * 8),
      leadTimeForChanges: 3 + Math.random() * 1,
      meanTimeToRestore: 4 + Math.random() * 3,
      changeFailureRate: 15 + Math.random() * 7
    }))
  },
  {
    id: 3,
    name: "Time Front-end",
    deploymentFrequency: {
      value: 32,
      unit: "por mês",
      trend: "up",
      status: "elite"
    },
    leadTimeForChanges: {
      value: 1.8,
      unit: "dias",
      trend: "down",
      status: "elite"
    },
    meanTimeToRestore: {
      value: 2,
      unit: "horas",
      trend: "down",
      status: "elite"
    },
    changeFailureRate: {
      value: 8,
      unit: "%",
      trend: "down",
      status: "elite"
    },
    historicalData: Array(12).fill(null).map((_, i) => ({
      date: `2025-${(i + 1).toString().padStart(2, '0')}-01`,
      deploymentFrequency: 25 + Math.floor(Math.random() * 15),
      leadTimeForChanges: 1.5 + Math.random() * 1,
      meanTimeToRestore: 1.5 + Math.random() * 1.5,
      changeFailureRate: 6 + Math.random() * 4
    }))
  },
  {
    id: 4,
    name: "Time Back-end",
    deploymentFrequency: {
      value: 10,
      unit: "por mês",
      trend: "up",
      status: "medium"
    },
    leadTimeForChanges: {
      value: 4.5,
      unit: "dias",
      trend: "down",
      status: "medium"
    },
    meanTimeToRestore: {
      value: 8,
      unit: "horas",
      trend: "stable",
      status: "medium"
    },
    changeFailureRate: {
      value: 22,
      unit: "%",
      trend: "up",
      status: "low"
    },
    historicalData: Array(12).fill(null).map((_, i) => ({
      date: `2025-${(i + 1).toString().padStart(2, '0')}-01`,
      deploymentFrequency: 8 + Math.floor(Math.random() * 6),
      leadTimeForChanges: 4 + Math.random() * 2,
      meanTimeToRestore: 6 + Math.random() * 4,
      changeFailureRate: 18 + Math.random() * 8
    }))
  }
];

// Rotas da API
app.get('/api/teams', (req, res) => {
  res.json(teamsData);
});

app.get('/api/teams/:id', (req, res) => {
  const teamId = parseInt(req.params.id);
  const team = teamsData.find(t => t.id === teamId);
  
  if (team) {
    res.json(team);
  } else {
    res.status(404).json({ message: 'Time não encontrado' });
  }
});

// Rota de teste
app.get('/', (req, res) => {
  res.send('API de Métricas DORA funcionando!');
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});