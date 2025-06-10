const express = require('express');
const cnpjRoutes = require('./cnpj.routes');

const router = express.Router();

// Rota de health check
router.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Servidor funcionando corretamente' });
});

// Rotas de CNPJ
router.use('/cnpj', cnpjRoutes);

module.exports = router;