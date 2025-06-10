import React, { useState, useEffect } from 'react';
import { Container, Alert, Modal, Button } from 'react-bootstrap';
import HistoricoConsultas from '../components/HistoricoConsultas';
import ResultadoAnalise from '../components/ResultadoAnalise';
import apiService from '../services/apiService';

const HistoricoPage = () => {
  const [consultas, setConsultas] = useState([]);
  const [consultaSelecionada, setConsultaSelecionada] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Carregar histórico
  useEffect(() => {
    carregarHistorico();
  }, []);

  // Buscar histórico na API
  const carregarHistorico = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await apiService.obterHistorico();
      setConsultas(response.data);
    } catch (err) {
      console.error('Erro ao carregar histórico:', err);
      setError(
        err.response?.data?.message || 
        'Não foi possível carregar o histórico. Verifique sua conexão e tente novamente.'
      );
    } finally {
      setLoading(false);
    }
  };

  // Selecionar consulta para visualização
  const selecionarConsulta = async (consulta) => {
    try {
      setLoading(true);
      // Aqui você pode fazer uma nova requisição para obter os detalhes completos
      // ou usar os dados que já estão disponíveis
      
      // Para este exemplo, vamos simular o formato de resultado esperado pelo componente ResultadoAnalise
      const resultado = {
        empresa: await apiService.buscarEmpresaPorCnpj(consulta.cnpj),
        analise: consulta.Analise
      };
      
      setConsultaSelecionada(resultado);
      setShowModal(true);
    } catch (err) {
      console.error('Erro ao selecionar consulta:', err);
      setError('Não foi possível carregar os detalhes desta consulta.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <h2 className="mb-4">Histórico de Consultas</h2>

      {error && (
        <Alert variant="danger">
          <Alert.Heading>Erro ao carregar histórico</Alert.Heading>
          <p>{error}</p>
        </Alert>
      )}

      <HistoricoConsultas 
        consultas={consultas}
        onSelectConsulta={selecionarConsulta}
        isLoading={loading}
      />

      {/* Modal para exibir detalhes da consulta */}
      <Modal 
        show={showModal} 
        onHide={() => setShowModal(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Detalhes da Consulta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {consultaSelecionada && (
            <ResultadoAnalise resultado={consultaSelecionada} />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default HistoricoPage;