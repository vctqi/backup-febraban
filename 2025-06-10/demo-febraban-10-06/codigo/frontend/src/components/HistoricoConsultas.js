import React from 'react';
import { Card, ListGroup, Badge, Button } from 'react-bootstrap';
import { formatarCNPJ } from '../utils/formatters';
import { useConsulta } from '../context/ConsultaContext';

const HistoricoConsultas = () => {
  const { historico, recuperarConsulta, limparHistorico } = useConsulta();
  
  // Se não houver histórico, não mostra nada
  if (!historico || historico.length === 0) {
    return null;
  }
  
  // Determina a cor do badge de acordo com a classificação
  const getBadgeVariant = (classificacao) => {
    switch (classificacao) {
      case 'BAIXO':
        return 'success';
      case 'MEDIO':
        return 'warning';
      case 'ALTO':
        return 'danger';
      default:
        return 'secondary';
    }
  };
  
  return (
    <Card className="shadow-sm">
      <Card.Header className="bg-white d-flex justify-content-between align-items-center">
        <h5 className="mb-0">Histórico de Consultas</h5>
        <Button 
          variant="outline-secondary" 
          size="sm"
          onClick={limparHistorico}
        >
          Limpar
        </Button>
      </Card.Header>
      <ListGroup variant="flush">
        {historico.map((item, index) => (
          <ListGroup.Item 
            key={index} 
            action 
            onClick={() => recuperarConsulta(item.empresa.cnpj)}
            className="history-card"
          >
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <div className="fw-bold">{item.empresa.razao_social}</div>
                <small className="text-muted">{formatarCNPJ(item.empresa.cnpj)}</small>
              </div>
              <Badge bg={getBadgeVariant(item.analise.classificacao)}>
                {item.analise.classificacao === 'BAIXO' ? 'Baixo' : 
                 item.analise.classificacao === 'MEDIO' ? 'Médio' : 'Alto'}
              </Badge>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Card>
  );
};

export default HistoricoConsultas;