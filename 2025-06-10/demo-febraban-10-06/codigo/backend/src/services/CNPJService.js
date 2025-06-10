const axios = require('axios');
const NodeCache = require('node-cache');
const logger = require('../config/logger');
const { Empresa } = require('../models');
const { removerFormatacaoCNPJ } = require('../utils/validarCNPJ');

// Cache com TTL de 24 horas (em segundos)
const cache = new NodeCache({ stdTTL: 86400 });

// API base URL
const API_BASE_URL = 'https://publica.cnpj.ws/cnpj';

/**
 * Classe de serviço para consulta de CNPJ
 */
class CNPJService {
  /**
   * Consulta dados de um CNPJ
   * @param {string} cnpj - CNPJ para consulta
   * @returns {Promise<Object>} - Dados do CNPJ
   */
  async consultarCNPJ(cnpj) {
    // Remove formatação
    const cnpjNumerico = removerFormatacaoCNPJ(cnpj);
    
    try {
      // Verifica se já está em cache
      const dadosCache = cache.get(cnpjNumerico);
      if (dadosCache) {
        logger.info(`Dados do CNPJ ${cnpjNumerico} recuperados do cache`);
        return dadosCache;
      }
      
      // Verifica se já existe no banco de dados
      const empresaBD = await Empresa.findOne({ where: { cnpj: cnpjNumerico } });
      if (empresaBD) {
        const dadosEmpresa = empresaBD.toJSON();
        logger.info(`Dados do CNPJ ${cnpjNumerico} recuperados do banco de dados`);
        
        // Atualiza o cache
        cache.set(cnpjNumerico, dadosEmpresa);
        
        return dadosEmpresa;
      }
      
      // Faz a requisição à API externa
      logger.info(`Consultando API externa para o CNPJ ${cnpjNumerico}`);
      const response = await axios.get(`${API_BASE_URL}/${cnpjNumerico}`, {
        timeout: 5000 // 5 segundos de timeout
      });
      
      // Extrai e formata os dados relevantes
      const dadosAPI = response.data;
      const dadosFormatados = this._formatarDadosAPI(dadosAPI, cnpjNumerico);
      
      // Salva no banco de dados
      await Empresa.create(dadosFormatados);
      logger.info(`Dados do CNPJ ${cnpjNumerico} salvos no banco de dados`);
      
      // Armazena em cache
      cache.set(cnpjNumerico, dadosFormatados);
      
      return dadosFormatados;
    } catch (error) {
      // Trata erros específicos da API
      if (error.response) {
        if (error.response.status === 404) {
          throw new Error('CNPJ não encontrado na base de dados');
        } else if (error.response.status === 429) {
          throw new Error('Limite de requisições excedido. Tente novamente mais tarde');
        }
      }
      
      logger.error(`Erro ao consultar CNPJ ${cnpjNumerico}: ${error.message}`);
      throw new Error(`Falha ao consultar dados do CNPJ: ${error.message}`);
    }
  }
  
  /**
   * Formata os dados da API para o formato utilizado internamente
   * @param {Object} dadosAPI - Dados brutos da API
   * @param {string} cnpj - CNPJ consultado
   * @returns {Object} - Dados formatados
   * @private
   */
  _formatarDadosAPI(dadosAPI, cnpj) {
    // Função auxiliar para extrair com segurança
    const extrair = (obj, path, defaultValue = null) => {
      return path.split('.').reduce((o, p) => (o && o[p] !== undefined) ? o[p] : defaultValue, obj);
    };
    
    // Formata o endereço completo
    const endereco = extrair(dadosAPI, 'endereco', {});
    const enderecoCompleto = [
      `${extrair(endereco, 'tipo_logradouro', '')} ${extrair(endereco, 'logradouro', '')}`,
      `${extrair(endereco, 'numero', '')}`,
      extrair(endereco, 'complemento', ''),
      extrair(endereco, 'bairro', ''),
      `${extrair(endereco, 'municipio', '')} - ${extrair(endereco, 'uf', '')}`,
      `CEP: ${extrair(endereco, 'cep', '')}`
    ].filter(Boolean).join(', ');
    
    return {
      cnpj,
      razao_social: extrair(dadosAPI, 'razao_social', ''),
      nome_fantasia: extrair(dadosAPI, 'nome_fantasia', ''),
      situacao_cadastral: extrair(dadosAPI, 'situacao_cadastral.descricao', ''),
      data_abertura: extrair(dadosAPI, 'data_inicio_atividade', null),
      cnae_codigo: extrair(dadosAPI, 'cnae_principal.codigo', ''),
      cnae_descricao: extrair(dadosAPI, 'cnae_principal.descricao', ''),
      porte: extrair(dadosAPI, 'porte.descricao', ''),
      endereco_completo: enderecoCompleto,
      data_atualizacao: new Date()
    };
  }
}

module.exports = new CNPJService();