import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import { FaLightbulb } from 'react-icons/fa';

const AcoesSugeridas = ({ acoes }) => {
  if (!acoes || acoes.length === 0) {
    return (
      <Card className="mb-4">
        <Card.Header as="h5">Ações Sugeridas</Card.Header>
        <Card.Body>
          <div className="text-center text-muted">
            Nenhuma ação sugerida disponível
          </div>
        </Card.Body>
      </Card>
    );
  }

  return (
    <Card className="mb-4">
      <Card.Header as="h5">
        <FaLightbulb className="me-2" />
        Ações Sugeridas
      </Card.Header>
      <ListGroup variant="flush">
        {acoes.map((acao, index) => (
          <ListGroup.Item key={index} className="acao-sugerida">
            {acao}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Card>
  );
};

export default AcoesSugeridas;