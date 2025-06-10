const express = require('express');
const router = express.Router();
const financiamentoController = require('../controllers/financiamento.controller');

// Rota para simulação de financiamento
router.post('/simular', financiamentoController.simular);

// Rota para obter opções de financiamento
router.get('/opcoes', financiamentoController.getOpcoes);

module.exports = router;