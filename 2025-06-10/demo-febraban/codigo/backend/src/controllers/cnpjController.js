const { validateCnpj, sanitizeCnpj } = require('../utils/cnpjValidator');
const cnpjService = require('../services/cnpjService');
const riskAnalyzerService = require('../services/riskAnalyzerService');
const { Consulta, Analise } = require('../models');

/**
 * Controlador para análise de risco de CNPJ
 */
class CnpjController {
  /**
   * Analisa o risco de um CNPJ
   * @param {Object} req - Request do Express
   * @param {Object} res - Response do Express
   * @param {Function} next - Função next do Express
   */
  async analisarRisco(req, res, next) {
    try {
      const { cnpj } = req.body;
      
      // Validação básica
      if (!cnpj) {
        return res.status(400).json({ message: 'CNPJ é obrigatório' });
      }
      
      // Sanitiza e valida o CNPJ
      const cnpjSanitizado = sanitizeCnpj(cnpj);
      if (!validateCnpj(cnpjSanitizado)) {
        return res.status(400).json({ message: 'CNPJ inválido' });
      }
      
      // Registra a consulta
      const consulta = await Consulta.create({
        cnpj: cnpjSanitizado,
        ip_origem: req.ip,
        user_agent: req.headers['user-agent']
      });
      
      // Consulta dados do CNPJ
      const dadosEmpresa = await cnpjService.consultarCnpj(cnpjSanitizado);
      
      // Realiza análise de risco
      const analiseRisco = riskAnalyzerService.analisarRisco(dadosEmpresa);
      
      // Salva a análise no banco de dados
      await Analise.create({
        consulta_id: consulta.id,
        score_final: analiseRisco.score_final,
        classificacao_risco: analiseRisco.classificacao_risco,
        criterios_aplicados: analiseRisco.criterios_aplicados,
        sinais_alerta: analiseRisco.sinais_alerta
      });
      
      // Retorna o resultado completo
      res.status(200).json({
        empresa: dadosEmpresa,
        analise: analiseRisco
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Busca o histórico de consultas (limitado a 10)
   * @param {Object} req - Request do Express
   * @param {Object} res - Response do Express
   * @param {Function} next - Função next do Express
   */
  async historico(req, res, next) {
    try {
      const consultas = await Consulta.findAll({
        include: [Analise],
        order: [['createdAt', 'DESC']],
        limit: 10
      });
      
      res.status(200).json(consultas);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new CnpjController();