const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

// Carregando variáveis de ambiente
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5099;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Importando rotas
const financeRoutes = require('./routes/finance');

// Usando rotas
app.use('/api/finance', financeRoutes);

// Rota padrão
app.get('/', (req, res) => {
  res.json({ message: 'Bem-vindo à API de Financiamento Agropecuário do Banco da Amazônia' });
});

// Inicialização do servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});