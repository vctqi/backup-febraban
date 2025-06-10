const logger = require('../config/logger');
const { Consulta, Analise } = require('../models');

/**
 * Classe de serviço para análise de risco
 */
class AnalisadorRiscoService {
  /**
   * Lista de CNAEs considerados de risco
   * Nota: Esta lista poderia ser configurável em um banco de dados
   */
  cnaesDeRisco = [
    '6619301', // Serviços de liquidação e custódia
    '6612603', // Corretoras de câmbio
    '6499902', // Sociedades de investimento
    '6434400', // Agências de fomento
    '6431000', // Bancos múltiplos, com carteira comercial
    '6422100', // Bancos múltiplos, sem carteira comercial
    '4120400', // Construção de edifícios
    '9200301', // Casas de bingo
    '9200302', // Exploração de apostas em corridas de cavalos
    '9200399'  // Exploração de jogos de azar e apostas não especificados anteriormente
  ];

  /**
   * Analisa o risco de uma empresa com base nos dados fornecidos
   * @param {Object} dadosEmpresa - Dados da empresa a ser analisada
   * @param {Object} requestInfo - Informações da requisição (IP, User-Agent)
   * @returns {Promise<Object>} - Resultado da análise
   */
  async analisarRisco(dadosEmpresa, requestInfo = {}) {
    try {
      logger.info(`Iniciando análise de risco para CNPJ ${dadosEmpresa.cnpj}`);
      
      // Registra a consulta
      const consulta = await Consulta.create({
        cnpj: dadosEmpresa.cnpj,
        ip_origem: requestInfo.ip || null,
        user_agent: requestInfo.userAgent || null
      });
      
      // Calcula o score de risco
      const { score, criterios, sinaisAlerta } = this._calcularScore(dadosEmpresa);
      
      // Determina a classificação de risco
      const classificacao = this._determinarClassificacao(score);
      
      // Salva a análise
      const analise = await Analise.create({
        consulta_id: consulta.id,
        score_final: score,
        classificacao_risco: classificacao,
        criterios_aplicados: criterios,
        sinais_alerta: sinaisAlerta
      });
      
      logger.info(`Análise concluída para CNPJ ${dadosEmpresa.cnpj}: Score ${score}, Classificação: ${classificacao}`);
      
      // Retorna o resultado da análise
      return {
        consulta: {
          id: consulta.id,
          data: consulta.data_consulta
        },
        empresa: dadosEmpresa,
        analise: {
          score,
          classificacao,
          criterios,
          sinaisAlerta
        }
      };
    } catch (error) {
      logger.error(`Erro ao analisar risco para CNPJ ${dadosEmpresa.cnpj}: ${error.message}`);
      throw new Error(`Falha ao realizar análise de risco: ${error.message}`);
    }
  }
  
  /**
   * Calcula o score de risco com base nos critérios definidos
   * @param {Object} dadosEmpresa - Dados da empresa
   * @returns {Object} - Score, critérios aplicados e sinais de alerta
   * @private
   */
  _calcularScore(dadosEmpresa) {
    // Array para armazenar os critérios aplicados e seus impactos
    const criterios = [];
    // Array para armazenar os sinais de alerta identificados
    const sinaisAlerta = [];
    
    // Inicializa o score
    let score = 0;
    
    // Critério: Empresa ativa
    if (dadosEmpresa.situacao_cadastral === 'ATIVA') {
      score += 10;
      criterios.push({
        descricao: 'Empresa com situação cadastral ativa',
        impacto: 10
      });
    } else {
      score -= 20;
      criterios.push({
        descricao: 'Empresa com situação cadastral irregular',
        impacto: -20
      });
      sinaisAlerta.push({
        tipo: 'situacao_cadastral',
        descricao: `Situação cadastral: ${dadosEmpresa.situacao_cadastral}`,
        severidade: 'alta'
      });
    }
    
    // Critério: Tempo de operação
    const dataAbertura = new Date(dadosEmpresa.data_abertura);
    const hoje = new Date();
    const diferencaMeses = (hoje.getFullYear() - dataAbertura.getFullYear()) * 12 + 
                           (hoje.getMonth() - dataAbertura.getMonth());
    
    if (diferencaMeses >= 36) { // Mais de 3 anos
      score += 10;
      criterios.push({
        descricao: 'Empresa com mais de 3 anos de operação',
        impacto: 10
      });
    } else if (diferencaMeses <= 6) { // Menos de 6 meses
      score -= 10;
      criterios.push({
        descricao: 'Empresa aberta há menos de 6 meses',
        impacto: -10
      });
      sinaisAlerta.push({
        tipo: 'tempo_operacao',
        descricao: 'Empresa recém-aberta (menos de 6 meses)',
        severidade: 'média'
      });
    }
    
    // Critério: CNAE de risco
    const cnaeRisco = this.cnaesDeRisco.includes(dadosEmpresa.cnae_codigo);
    if (cnaeRisco) {
      score -= 10;
      criterios.push({
        descricao: 'CNAE considerado de risco',
        impacto: -10
      });
      sinaisAlerta.push({
        tipo: 'cnae_risco',
        descricao: `CNAE ${dadosEmpresa.cnae_codigo} - ${dadosEmpresa.cnae_descricao} considerado de risco`,
        severidade: 'média'
      });
    } else {
      score += 10;
      criterios.push({
        descricao: 'CNAE considerado de baixo risco',
        impacto: 10
      });
    }
    
    return {
      score,
      criterios,
      sinaisAlerta
    };
  }
  
  /**
   * Determina a classificação de risco com base no score
   * @param {number} score - Score calculado
   * @returns {string} - Classificação de risco (BAIXO, MEDIO, ALTO)
   * @private
   */
  _determinarClassificacao(score) {
    if (score >= 20) {
      return 'BAIXO';
    } else if (score >= 0) {
      return 'MEDIO';
    } else {
      return 'ALTO';
    }
  }
}

module.exports = new AnalisadorRiscoService();