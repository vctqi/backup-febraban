import axios from 'axios';

const API_URL = 'http://localhost:5012/api';

// Configuração do axios
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Serviços de Cliente
export const getClientes = async () => {
  try {
    const response = await api.get('/clientes');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar clientes:', error);
    throw error;
  }
};

export const getClienteById = async (id) => {
  try {
    const response = await api.get(`/clientes/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar cliente ${id}:`, error);
    throw error;
  }
};

export const analisarCliente = async (id) => {
  try {
    const response = await api.post(`/clientes/${id}/analisar`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao analisar cliente ${id}:`, error);
    throw error;
  }
};

// Serviço de Simulação
export const simularEmprestimo = async (dados) => {
  try {
    const response = await api.post('/simulacao', dados);
    return response.data;
  } catch (error) {
    console.error('Erro ao simular empréstimo:', error);
    throw error;
  }
};

// Serviço de Estatísticas
export const getEstatisticas = async () => {
  try {
    const response = await api.get('/estatisticas');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar estatísticas:', error);
    throw error;
  }
};

export default api;