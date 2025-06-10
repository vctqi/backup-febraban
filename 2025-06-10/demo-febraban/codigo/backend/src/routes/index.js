const express = require('express');
const cnpjController = require('../controllers/cnpjController');

const router = express.Router();

/**
 * @route POST /api/cnpj/analyze
 * @desc Analisa o risco de um CNPJ
 * @access Public
 */
router.post('/cnpj/analyze', cnpjController.analisarRisco);

/**
 * @route GET /api/cnpj/history
 * @desc Retorna o histórico de consultas
 * @access Public
 */
router.get('/cnpj/history', cnpjController.historico);

/**
 * @route GET /api/health
 * @desc Verifica o status da API
 * @access Public
 */
router.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date() });
});

module.exports = router;