const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5099;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Importar rotas
const financiamentoRoutes = require('./routes/financiamento.routes');

// Usar rotas
app.use('/api/financiamentos', financiamentoRoutes);

// Rota padrão
app.get('/', (req, res) => {
  res.json({ message: 'API de Financiamento Agropecuário do Banco da Amazônia' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});