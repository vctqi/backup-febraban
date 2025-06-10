const { validarCNPJ } = require('../utils/validarCNPJ');
const CNPJService = require('../services/CNPJService');
const AnalisadorRiscoService = require('../services/AnalisadorRiscoService');
const logger = require('../config/logger');

/**
 * Controlador para operações relacionadas a CNPJ
 */
class CNPJController {
  /**
   * Realiza a análise de risco para um CNPJ
   * @param {object} req - Objeto de requisição Express
   * @param {object} res - Objeto de resposta Express
   * @param {function} next - Função next do Express
   */
  async analisar(req, res, next) {
    try {
      const { cnpj } = req.body;
      
      // Valida o CNPJ
      if (!cnpj) {
        return res.status(400).json({ status: 'error', message: 'CNPJ é obrigatório' });
      }
      
      if (!validarCNPJ(cnpj)) {
        return res.status(400).json({ status: 'error', message: 'CNPJ inválido' });
      }
      
      logger.info(`Iniciando análise para CNPJ: ${cnpj}`);
      
      // Informações da requisição para log
      const requestInfo = {
        ip: req.ip,
        userAgent: req.headers['user-agent']
      };
      
      // Consulta dados do CNPJ
      const dadosEmpresa = await CNPJService.consultarCNPJ(cnpj);
      
      // Realiza análise de risco
      const analise = await AnalisadorRiscoService.analisarRisco(dadosEmpresa, requestInfo);
      
      // Retorna o resultado
      return res.status(200).json({
        status: 'success',
        data: analise
      });
    } catch (error) {
      logger.error(`Erro ao analisar CNPJ: ${error.message}`);
      
      // Se for um erro conhecido, retorna mensagem amigável
      if (error.message.includes('CNPJ não encontrado')) {
        return res.status(404).json({ 
          status: 'error', 
          message: 'CNPJ não encontrado na base de dados' 
        });
      }
      
      if (error.message.includes('Limite de requisições')) {
        return res.status(429).json({ 
          status: 'error', 
          message: 'Limite de requisições excedido. Tente novamente mais tarde' 
        });
      }
      
      // Para outros erros, passa para o middleware de erro
      next(error);
    }
  }
}

module.exports = new CNPJController();