import React, { createContext, useContext, useState, useEffect } from 'react';

// Cria o contexto
const ConsultaContext = createContext();

// Hook personalizado para acessar o contexto
export const useConsulta = () => {
  return useContext(ConsultaContext);
};

// Provedor do contexto
export const ConsultaProvider = ({ children }) => {
  // Estado para armazenar o resultado da consulta atual
  const [resultado, setResultado] = useState(null);
  
  // Estado para armazenar o histórico de consultas
  const [historico, setHistorico] = useState([]);
  
  // Estado para controlar loading
  const [loading, setLoading] = useState(false);
  
  // Estado para controlar erros
  const [error, setError] = useState(null);
  
  // Carrega o histórico do localStorage ao iniciar
  useEffect(() => {
    const historicoSalvo = localStorage.getItem('historicoConsultas');
    if (historicoSalvo) {
      try {
        setHistorico(JSON.parse(historicoSalvo));
      } catch (error) {
        console.error('Erro ao carregar histórico:', error);
        localStorage.removeItem('historicoConsultas');
      }
    }
  }, []);
  
  // Salva o histórico no localStorage quando atualizado
  useEffect(() => {
    if (historico.length > 0) {
      localStorage.setItem('historicoConsultas', JSON.stringify(historico));
    }
  }, [historico]);
  
  // Função para definir o resultado da consulta atual
  const definirResultado = (novoResultado) => {
    setResultado(novoResultado);
    
    if (novoResultado) {
      // Adiciona ao histórico
      adicionarAoHistorico(novoResultado);
    }
  };
  
  // Função para adicionar uma consulta ao histórico
  const adicionarAoHistorico = (consulta) => {
    // Verifica se já existe esse CNPJ no histórico
    const cnpjAtual = consulta.empresa.cnpj;
    
    // Remove a consulta anterior com mesmo CNPJ, se existir
    const historicoFiltrado = historico.filter(item => item.empresa.cnpj !== cnpjAtual);
    
    // Adiciona a nova consulta no início
    const novoHistorico = [consulta, ...historicoFiltrado].slice(0, 10); // Limita a 10 itens
    
    setHistorico(novoHistorico);
  };
  
  // Função para recuperar uma consulta do histórico
  const recuperarConsulta = (cnpj) => {
    const consultaEncontrada = historico.find(item => item.empresa.cnpj === cnpj);
    if (consultaEncontrada) {
      setResultado(consultaEncontrada);
    }
  };
  
  // Função para limpar o histórico
  const limparHistorico = () => {
    setHistorico([]);
    localStorage.removeItem('historicoConsultas');
  };
  
  // Valores fornecidos pelo contexto
  const value = {
    resultado,
    historico,
    loading,
    error,
    setLoading,
    setError,
    definirResultado,
    recuperarConsulta,
    limparHistorico
  };
  
  return (
    <ConsultaContext.Provider value={value}>
      {children}
    </ConsultaContext.Provider>
  );
};