import React, { useState, useEffect } from 'react';
import { Container, Alert, Row, Col, Card } from 'react-bootstrap';
import CnpjForm from '../components/CnpjForm';
import ResultadoAnalise from '../components/ResultadoAnalise';
import apiService from '../services/apiService';

const HomePage = () => {
  const [resultado, setResultado] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [historico, setHistorico] = useState([]);

  // Carregar histórico da sessão no localStorage
  useEffect(() => {
    const historicoSalvo = localStorage.getItem('historicoConsultas');
    if (historicoSalvo) {
      try {
        setHistorico(JSON.parse(historicoSalvo));
      } catch (e) {
        console.error('Erro ao carregar histórico:', e);
        localStorage.removeItem('historicoConsultas');
      }
    }
  }, []);

  // Salvar histórico atualizado no localStorage
  useEffect(() => {
    if (historico.length > 0) {
      localStorage.setItem('historicoConsultas', JSON.stringify(historico));
    }
  }, [historico]);

  // Analisar CNPJ
  const analisarCnpj = async (cnpj) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await apiService.analisarCnpj(cnpj);
      setResultado(response.data);
      
      // Adicionar ao histórico da sessão (limitado a 10 itens)
      const novoHistorico = [response.data, ...historico].slice(0, 10);
      setHistorico(novoHistorico);
    } catch (err) {
      console.error('Erro ao analisar CNPJ:', err);
      setError(
        err.response?.data?.message || 
        'Não foi possível realizar a análise. Verifique sua conexão e tente novamente.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Row className="justify-content-center mb-4">
        <Col md={10}>
          <Card className="shadow-sm">
            <Card.Body>
              <h2 className="text-center mb-4">Analisador de Risco de Cliente PJ via CNPJ</h2>
              <p className="text-center mb-4">
                Insira o CNPJ de uma empresa para obter uma análise simplificada de risco, 
                baseada em dados públicos e critérios predefinidos.
              </p>
              <CnpjForm onAnalyze={analisarCnpj} isLoading={loading} />
              
              {error && (
                <Alert variant="danger" className="mt-3">
                  <Alert.Heading>Erro na consulta</Alert.Heading>
                  <p>{error}</p>
                </Alert>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {resultado && <ResultadoAnalise resultado={resultado} />}
    </Container>
  );
};

export default HomePage;