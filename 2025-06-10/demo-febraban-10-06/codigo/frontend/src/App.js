import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import FormularioConsulta from './components/FormularioConsulta';
import ResultadoAnalise from './components/ResultadoAnalise';
import HistoricoConsultas from './components/HistoricoConsultas';
import { useConsulta } from './context/ConsultaContext';

function App() {
  const { resultado } = useConsulta();

  return (
    <Container className="py-5">
      <Row className="mb-4">
        <Col>
          <h1 className="text-center">Analisador de Risco de Cliente PJ via CNPJ</h1>
          <p className="text-center text-muted">
            Insira o CNPJ para obter uma análise simplificada de risco baseada em dados públicos
          </p>
        </Col>
      </Row>

      <Row>
        <Col lg={4} className="mb-4">
          <Card className="shadow-sm">
            <Card.Body>
              <FormularioConsulta />
            </Card.Body>
          </Card>
          
          <div className="mt-4">
            <HistoricoConsultas />
          </div>
        </Col>
        
        <Col lg={8}>
          {resultado ? (
            <ResultadoAnalise resultado={resultado} />
          ) : (
            <Card className="shadow-sm h-100">
              <Card.Body className="d-flex align-items-center justify-content-center">
                <div className="text-center text-muted p-5">
                  <h4>Nenhuma consulta realizada</h4>
                  <p>Insira um CNPJ no formulário ao lado para realizar uma análise de risco.</p>
                </div>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
      
      <footer className="mt-5 text-center text-muted">
        <small>Analisador de Risco de Cliente PJ © {new Date().getFullYear()}</small>
      </footer>
    </Container>
  );
}

export default App;