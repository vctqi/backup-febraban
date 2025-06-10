import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5019/api'
});

export const getLinhasCredito = async () => {
  try {
    const response = await api.get('/linhas-credito');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar linhas de crédito:', error);
    throw error;
  }
};

export const getPerfisRisco = async () => {
  try {
    const response = await api.get('/perfis-risco');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar perfis de risco:', error);
    throw error;
  }
};

export const realizarSimulacao = async (dadosSimulacao) => {
  try {
    const response = await api.post('/simulacao', dadosSimulacao);
    return response.data;
  } catch (error) {
    console.error('Erro ao realizar simulação:', error);
    throw error;
  }
};

export default api;