import axios from 'axios';

// Cria uma instância do Axios com configurações padrão
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3001/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor para tratamento global de erros
api.interceptors.response.use(
  response => response,
  error => {
    // Customizar tratamento de erro se necessário
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;