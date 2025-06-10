const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const routes = require('./routes');
const { initializeDatabase } = require('./config/database');
const logger = require('./config/logger');

// Inicializa a aplicação Express
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware de segurança
app.use(helmet());

// Configuração de CORS
app.use(cors());

// Parser para JSON
app.use(express.json());

// Rate limiting - limita 100 requisições por IP em 15 minutos
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // limite por IP
  standardHeaders: true,
  legacyHeaders: false,
  message: { 
    status: 429, 
    message: 'Muitas requisições deste IP, por favor tente novamente após 15 minutos.' 
  }
});
app.use(limiter);

// Rotas da API
app.use('/api', routes);

// Middleware para tratamento de erros
app.use((err, req, res, next) => {
  logger.error(`${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
  
  res.status(err.statusCode || 500).json({
    status: 'error',
    message: err.message || 'Erro interno do servidor'
  });
});

// Inicializa o banco de dados antes de iniciar o servidor
initializeDatabase()
  .then(() => {
    app.listen(PORT, () => {
      logger.info(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch(err => {
    logger.error(`Falha ao inicializar o banco de dados: ${err.message}`);
    process.exit(1);
  });

// Para testes
module.exports = app;