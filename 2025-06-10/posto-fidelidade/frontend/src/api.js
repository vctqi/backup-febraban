import axios from 'axios';

const API_URL = 'http://localhost:5010/api';

// Cliente mockado (cliente atual autenticado)
const CLIENTE_ID = 1;

export const getCliente = async () => {
  try {
    const response = await axios.get(`${API_URL}/clientes/${CLIENTE_ID}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar dados do cliente:', error);
    throw error;
  }
};

export const getHistorico = async () => {
  try {
    const response = await axios.get(`${API_URL}/clientes/${CLIENTE_ID}/historico`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar histórico:', error);
    throw error;
  }
};

export const acumularPontos = async (dados) => {
  try {
    const response = await axios.post(`${API_URL}/clientes/${CLIENTE_ID}/acumulo`, dados);
    return response.data;
  } catch (error) {
    console.error('Erro ao acumular pontos:', error);
    throw error;
  }
};

export const resgatarPontosOuCashback = async (dados) => {
  try {
    const response = await axios.post(`${API_URL}/clientes/${CLIENTE_ID}/resgate`, dados);
    return response.data;
  } catch (error) {
    console.error('Erro ao resgatar pontos ou cashback:', error);
    throw error;
  }
};