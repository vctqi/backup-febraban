import axios from 'axios';

const API_URL = 'http://localhost:5017';

export const getInvestments = async (filters = {}) => {
  try {
    const response = await axios.get(`${API_URL}/api/investimentos`, { params: filters });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar investimentos:', error);
    throw error;
  }
};

export const getInvestmentById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/api/investimentos/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar investimento com ID ${id}:`, error);
    throw error;
  }
};

export const getStatistics = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/estatisticas`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar estatísticas:', error);
    throw error;
  }
};