import React, { useState } from 'react';
import { Card, Row, Col, Badge, ListGroup, Button, Accordion } from 'react-bootstrap';
import { formatarCNPJ, formatarData, calcularTempoOperacao } from '../utils/formatters';

const ResultadoAnalise = ({ resultado }) => {
  const [mostraCriterios, setMostraCriterios] = useState(false);
  
  if (!resultado) {
    return null;
  }
  
  const { empresa, analise } = resultado;
  
  // Determina a cor do badge de acordo com a classificação
  const getBadgeVariant = (classificacao) => {
    switch (classificacao) {
      case 'BAIXO':
        return 'badge-risk badge-risk-low';
      case 'MEDIO':
        return 'badge-risk badge-risk-medium';
      case 'ALTO':
        return 'badge-risk badge-risk-high';
      default:
        return 'badge-risk';
    }
  };
  
  return (
    <>
      <Card className="shadow-sm mb-4">
        <Card.Header className="bg-white">
          <Row className="align-items-center">
            <Col>
              <h5 className="mb-0">Dados da Empresa</h5>
            </Col>
            <Col xs="auto">
              <Badge className={getBadgeVariant(analise.classificacao)}>
                Risco {analise.classificacao === 'BAIXO' ? 'Baixo' : 
                      analise.classificacao === 'MEDIO' ? 'Médio' : 'Alto'}
              </Badge>
            </Col>
          </Row>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={6} className="mb-3">
              <p className="mb-1 text-muted">Razão Social</p>
              <p className="fw-bold mb-3">{empresa.razao_social}</p>
              
              <p className="mb-1 text-muted">Nome Fantasia</p>
              <p className="fw-bold mb-3">{empresa.nome_fantasia || 'Não informado'}</p>
              
              <p className="mb-1 text-muted">CNPJ</p>
              <p className="fw-bold mb-3">{formatarCNPJ(empresa.cnpj)}</p>
            </Col>
            <Col md={6} className="mb-3">
              <p className="mb-1 text-muted">Situação Cadastral</p>
              <p className="fw-bold mb-3">{empresa.situacao_cadastral}</p>
              
              <p className="mb-1 text-muted">Data de Abertura</p>
              <p className="fw-bold mb-3">
                {formatarData(empresa.data_abertura)} 
                <span className="ms-2 text-muted">
                  ({calcularTempoOperacao(empresa.data_abertura)})
                </span>
              </p>
              
              <p className="mb-1 text-muted">Atividade Principal</p>
              <p className="fw-bold mb-3">
                {empresa.cnae_codigo} - {empresa.cnae_descricao}
              </p>
            </Col>
          </Row>
          
          <Row>
            <Col>
              <p className="mb-1 text-muted">Endereço</p>
              <p className="fw-bold">{empresa.endereco_completo}</p>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      
      <Card className="shadow-sm mb-4">
        <Card.Header className="bg-white">
          <h5 className="mb-0">Análise de Risco</h5>
        </Card.Header>
        <Card.Body>
          <Row className="mb-4">
            <Col md={6}>
              <div className="text-center p-3 border rounded">
                <h6 className="text-muted mb-2">Score de Risco</h6>
                <h2 className="mb-0">{analise.score}</h2>
                <p className="text-muted mb-0">
                  {analise.classificacao === 'BAIXO' ? 'Baixo Risco (≥ 20)' : 
                   analise.classificacao === 'MEDIO' ? 'Médio Risco (0 a 19)' : 
                   'Alto Risco (< 0)'}
                </p>
              </div>
            </Col>
            <Col md={6}>
              {analise.sinaisAlerta && analise.sinaisAlerta.length > 0 ? (
                <div>
                  <h6 className="mb-3">Sinais de Alerta Identificados:</h6>
                  <ListGroup variant="flush">
                    {analise.sinaisAlerta.map((alerta, index) => (
                      <ListGroup.Item key={index} className="alert-item py-2 px-0 border-0">
                        <div className="fw-bold">{alerta.descricao}</div>
                        <small className="text-muted">
                          Severidade: {alerta.severidade === 'alta' ? 'Alta' : 'Média'}
                        </small>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </div>
              ) : (
                <div className="text-center p-3 border rounded">
                  <h6 className="text-muted mb-2">Sinais de Alerta</h6>
                  <p className="mb-0">Nenhum sinal de alerta identificado</p>
                </div>
              )}
            </Col>
          </Row>
          
          <div className="mt-3">
            <Button 
              variant="outline-secondary" 
              className="w-100"
              onClick={() => setMostraCriterios(!mostraCriterios)}
            >
              {mostraCriterios ? 'Ocultar' : 'Mostrar'} Detalhes dos Critérios
            </Button>
          </div>
          
          <Accordion className="mt-3" activeKey={mostraCriterios ? '0' : null}>
            <Accordion.Item eventKey="0">
              <Accordion.Body>
                <h6 className="mb-3">Critérios Aplicados na Análise:</h6>
                {analise.criterios.map((criterio, index) => (
                  <div 
                    key={index} 
                    className={`criteria-item ${criterio.impacto >= 0 ? 'criteria-positive' : 'criteria-negative'}`}
                  >
                    <div className="d-flex justify-content-between align-items-center">
                      <span>{criterio.descricao}</span>
                      <Badge bg={criterio.impacto >= 0 ? 'success' : 'danger'}>
                        {criterio.impacto > 0 ? '+' : ''}{criterio.impacto}
                      </Badge>
                    </div>
                  </div>
                ))}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Card.Body>
      </Card>
    </>
  );
};

export default ResultadoAnalise;