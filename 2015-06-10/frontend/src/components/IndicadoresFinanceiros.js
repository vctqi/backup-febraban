import React from 'react';
import { Card, Row, Col, ProgressBar } from 'react-bootstrap';

const IndicadoresFinanceiros = ({ indicadores }) => {
  const getProgressVariant = (valor, indicador) => {
    if (indicador === 'crescimentoAnual') {
      if (valor >= 20) return 'success';
      if (valor >= 10) return 'info';
      if (valor >= 5) return 'warning';
      return 'danger';
    }
    
    if (indicador === 'margemLucro') {
      if (valor >= 30) return 'success';
      if (valor >= 15) return 'info';
      if (valor >= 5) return 'warning';
      return 'danger';
    }
    
    if (indicador === 'endividamento') {
      if (valor <= 20) return 'success';
      if (valor <= 40) return 'info';
      if (valor <= 60) return 'warning';
      return 'danger';
    }
    
    if (indicador === 'liquidezCorrente') {
      if (valor >= 2) return 'success';
      if (valor >= 1.5) return 'info';
      if (valor >= 1) return 'warning';
      return 'danger';
    }
    
    return 'primary';
  };

  const getProgressValue = (valor, indicador) => {
    if (indicador === 'crescimentoAnual') {
      return Math.min(100, valor * 2); // 50% = 100% da barra
    }
    
    if (indicador === 'margemLucro') {
      return Math.min(100, valor * 2); // 50% = 100% da barra
    }
    
    if (indicador === 'endividamento') {
      return Math.min(100, valor); // 100% endividamento = 100% da barra
    }
    
    if (indicador === 'liquidezCorrente') {
      return Math.min(100, valor * 33.33); // Liquidez 3 = 100% da barra
    }
    
    return 50;
  };

  return (
    <Card className="mb-4">
      <Card.Header as="h5">Indicadores Financeiros</Card.Header>
      <Card.Body>
        <Row>
          <Col md={6} className="mb-3">
            <div className="mb-2 d-flex justify-content-between">
              <div>Crescimento Anual</div>
              <div className="fw-bold">{indicadores.crescimentoAnual}%</div>
            </div>
            <ProgressBar 
              variant={getProgressVariant(indicadores.crescimentoAnual, 'crescimentoAnual')} 
              now={getProgressValue(indicadores.crescimentoAnual, 'crescimentoAnual')} 
            />
          </Col>
          <Col md={6} className="mb-3">
            <div className="mb-2 d-flex justify-content-between">
              <div>Margem de Lucro</div>
              <div className="fw-bold">{indicadores.margemLucro}%</div>
            </div>
            <ProgressBar 
              variant={getProgressVariant(indicadores.margemLucro, 'margemLucro')} 
              now={getProgressValue(indicadores.margemLucro, 'margemLucro')} 
            />
          </Col>
          <Col md={6} className="mb-3">
            <div className="mb-2 d-flex justify-content-between">
              <div>Endividamento</div>
              <div className="fw-bold">{indicadores.endividamento}%</div>
            </div>
            <ProgressBar 
              variant={getProgressVariant(indicadores.endividamento, 'endividamento')} 
              now={getProgressValue(indicadores.endividamento, 'endividamento')} 
            />
          </Col>
          <Col md={6} className="mb-3">
            <div className="mb-2 d-flex justify-content-between">
              <div>Liquidez Corrente</div>
              <div className="fw-bold">{indicadores.liquidezCorrente}</div>
            </div>
            <ProgressBar 
              variant={getProgressVariant(indicadores.liquidezCorrente, 'liquidezCorrente')} 
              now={getProgressValue(indicadores.liquidezCorrente, 'liquidezCorrente')} 
            />
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default IndicadoresFinanceiros;