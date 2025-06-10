const express = require('express');
const CNPJController = require('../controllers/CNPJController');

const router = express.Router();

/**
 * @route POST /api/cnpj/analyze
 * @description Analisa o risco de um CNPJ
 * @body {string} cnpj - CNPJ a ser analisado
 * @returns {object} Resultado da análise
 */
router.post('/analyze', CNPJController.analisar);

module.exports = router;