import axios from 'axios';

// Configuração do axios
const api = axios.create({
  baseURL: 'http://localhost:3002/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Serviço para comunicação com a API
const apiService = {
  /**
   * Analisa o risco de um CNPJ
   * @param {string} cnpj - CNPJ sem formatação
   * @returns {Promise} Promise com o resultado da requisição
   */
  analisarCnpj: (cnpj) => {
    return api.post('/cnpj/analyze', { cnpj });
  },

  /**
   * Obtém o histórico de consultas
   * @returns {Promise} Promise com o resultado da requisição
   */
  obterHistorico: () => {
    return api.get('/cnpj/history');
  },

  /**
   * Busca dados de uma empresa por CNPJ
   * Esta função é uma simulação, pois a API não tem este endpoint específico
   * @param {string} cnpj - CNPJ da empresa
   * @returns {Promise} Promise com os dados da empresa
   */
  buscarEmpresaPorCnpj: async (cnpj) => {
    // Na prática, você faria uma requisição real para a API
    // Mas como o endpoint não existe, vamos usar os dados do histórico
    // ou fazer uma nova análise
    
    try {
      // Buscar no histórico local primeiro
      const historicoStr = localStorage.getItem('historicoConsultas');
      if (historicoStr) {
        const historico = JSON.parse(historicoStr);
        const consulta = historico.find(item => item.empresa.cnpj === cnpj);
        
        if (consulta) {
          return consulta.empresa;
        }
      }
      
      // Se não encontrar, faz uma nova análise
      const response = await api.post('/cnpj/analyze', { cnpj });
      return response.data.empresa;
    } catch (error) {
      console.error('Erro ao buscar empresa:', error);
      // Retorna um objeto vazio para evitar quebrar a UI
      return {
        cnpj: cnpj,
        razao_social: 'Informação não disponível',
        nome_fantasia: 'Informação não disponível',
        situacao_cadastral: 'Não disponível',
        data_abertura: new Date().toISOString(),
        cnae_codigo: 'N/A',
        cnae_descricao: 'Não disponível',
        porte: 'Não disponível',
        endereco_completo: 'Não disponível'
      };
    }
  }
};

export default apiService;