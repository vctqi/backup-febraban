const axios = require('axios');
const NodeCache = require('node-cache');
const { Empresa } = require('../models');

// Cache para armazenar resultados de consultas por 24 horas
const cnpjCache = new NodeCache({ stdTTL: 86400 });

/**
 * Serviço para consulta de dados de CNPJ
 */
class CnpjService {
  /**
   * URL base da API pública de consulta de CNPJ
   */
  constructor() {
    this.apiBaseUrl = 'https://publica.cnpj.ws/cnpj';
    this.timeout = 5000; // 5 segundos de timeout
    this.maxRetries = 3;
  }

  /**
   * Consulta os dados de um CNPJ
   * @param {string} cnpj - CNPJ sem formatação
   * @returns {Promise<Object>} Dados da empresa
   */
  async consultarCnpj(cnpj) {
    try {
      // Verifica se os dados já estão em cache
      const cachedData = cnpjCache.get(cnpj);
      if (cachedData) {
        console.log(`Dados do CNPJ ${cnpj} encontrados em cache`);
        return cachedData;
      }

      // Verifica se os dados estão no banco de dados
      const empresaFromDb = await Empresa.findOne({ where: { cnpj } });
      if (empresaFromDb) {
        console.log(`Dados do CNPJ ${cnpj} encontrados no banco de dados`);
        const empresaData = empresaFromDb.toJSON();
        cnpjCache.set(cnpj, empresaData);
        return empresaData;
      }

      // Consulta a API externa
      console.log(`Consultando API externa para o CNPJ ${cnpj}`);
      const dadosEmpresa = await this.consultarApiExterna(cnpj);

      // Mapeia os dados para o formato do banco de dados
      const empresaData = this.mapearDadosEmpresa(dadosEmpresa);

      // Salva os dados no banco de dados
      await Empresa.create(empresaData);

      // Salva os dados em cache
      cnpjCache.set(cnpj, empresaData);

      return empresaData;
    } catch (error) {
      console.error(`Erro ao consultar CNPJ ${cnpj}:`, error.message);
      throw new Error(`Não foi possível consultar o CNPJ: ${error.message}`);
    }
  }

  /**
   * Consulta a API externa de CNPJ com retry
   * @param {string} cnpj - CNPJ sem formatação
   * @returns {Promise<Object>} Dados da empresa
   * @private
   */
  async consultarApiExterna(cnpj, retryCount = 0) {
    try {
      const response = await axios.get(`${this.apiBaseUrl}/${cnpj}`, {
        timeout: this.timeout
      });
      return response.data;
    } catch (error) {
      // Implementa retry com backoff exponencial
      if (retryCount < this.maxRetries) {
        const delay = Math.pow(2, retryCount) * 1000; // Backoff exponencial: 1s, 2s, 4s
        console.log(`Tentativa ${retryCount + 1} falhou. Tentando novamente em ${delay}ms...`);
        
        await new Promise(resolve => setTimeout(resolve, delay));
        return this.consultarApiExterna(cnpj, retryCount + 1);
      }
      
      if (error.response) {
        // Resposta com erro da API
        if (error.response.status === 404) {
          throw new Error('CNPJ não encontrado');
        }
        throw new Error(`Erro na API: ${error.response.status} - ${error.response.data.message || 'Erro desconhecido'}`);
      } else if (error.request) {
        // Sem resposta da API
        throw new Error('Timeout ou sem resposta da API de CNPJ');
      } else {
        // Erro na configuração da requisição
        throw new Error(`Erro ao configurar requisição: ${error.message}`);
      }
    }
  }

  /**
   * Mapeia os dados da API para o formato do banco de dados
   * @param {Object} dadosApi - Dados retornados pela API
   * @returns {Object} Dados formatados para o banco de dados
   * @private
   */
  mapearDadosEmpresa(dadosApi) {
    // Constrói o endereço completo
    const endereco = dadosApi.endereco ? 
      `${dadosApi.endereco.tipo_logradouro} ${dadosApi.endereco.logradouro}, ${dadosApi.endereco.numero}${dadosApi.endereco.complemento ? ' - ' + dadosApi.endereco.complemento : ''}, ${dadosApi.endereco.bairro}, ${dadosApi.endereco.municipio} - ${dadosApi.endereco.uf}, CEP: ${dadosApi.endereco.cep}` : 
      'Endereço não disponível';

    return {
      cnpj: dadosApi.cnpj,
      razao_social: dadosApi.razao_social,
      nome_fantasia: dadosApi.nome_fantasia || 'Não informado',
      situacao_cadastral: dadosApi.situacao_cadastral ? dadosApi.situacao_cadastral.descricao : 'Não informada',
      data_abertura: dadosApi.data_inicio_atividade || null,
      cnae_codigo: dadosApi.cnae_principal ? dadosApi.cnae_principal.codigo : 'Não informado',
      cnae_descricao: dadosApi.cnae_principal ? dadosApi.cnae_principal.descricao : 'Não informado',
      porte: dadosApi.porte ? dadosApi.porte.descricao : 'Não informado',
      endereco_completo: endereco,
      data_atualizacao: new Date()
    };
  }
}

module.exports = new CnpjService();