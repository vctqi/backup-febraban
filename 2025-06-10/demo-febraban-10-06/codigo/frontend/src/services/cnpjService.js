import api from './api';

/**
 * Realiza a análise de risco de um CNPJ
 * @param {string} cnpj - CNPJ a ser analisado
 * @returns {Promise<Object>} - Resultado da análise
 */
export const analisarCNPJ = async (cnpj) => {
  try {
    const response = await api.post('/cnpj/analyze', { cnpj });
    return response.data;
  } catch (error) {
    // Propagando o erro para ser tratado pelo componente
    throw error;
  }
};