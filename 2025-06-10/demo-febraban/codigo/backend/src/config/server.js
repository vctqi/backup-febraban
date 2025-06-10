const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { testConnection } = require('./database');
const routes = require('../routes');

// Criar diretório para o banco de dados se não existir
const fs = require('fs');
const path = require('path');
const dbDir = path.join(__dirname, '../../data');
if (!fs.existsSync(dbDir)){
  fs.mkdirSync(dbDir, { recursive: true });
}

// Inicializar o servidor Express
const app = express();

// Configurar middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Teste de conexão com o banco de dados
testConnection();

// Configurar rotas
app.use('/api', routes);

// Rota de fallback para requisições não encontradas
app.use((req, res) => {
  res.status(404).json({ message: 'Rota não encontrada' });
});

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Erro interno do servidor',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

module.exports = app;