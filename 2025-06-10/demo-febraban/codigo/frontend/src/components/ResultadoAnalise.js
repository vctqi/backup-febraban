import React from 'react';
import { Card, Badge, Row, Col, ListGroup, Table } from 'react-bootstrap';

const ResultadoAnalise = ({ resultado }) => {
  if (!resultado) return null;

  const { empresa, analise } = resultado;

  // Helper para retornar a cor do badge baseado na classificação
  const getBadgeVariant = (classificacao) => {
    switch (classificacao) {
      case 'Baixo':
        return 'success';
      case 'Médio':
        return 'warning';
      case 'Alto':
        return 'danger';
      default:
        return 'secondary';
    }
  };

  return (
    <div className="mt-4">
      <h3 className="mb-3">Resultado da Análise</h3>
      
      <Card className="mb-4 shadow-sm">
        <Card.Header className="bg-primary text-white">
          <h4 className="mb-0">Dados da Empresa</h4>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={6}>
              <p><strong>CNPJ:</strong> {empresa.cnpj}</p>
              <p><strong>Razão Social:</strong> {empresa.razao_social}</p>
              <p><strong>Nome Fantasia:</strong> {empresa.nome_fantasia}</p>
              <p><strong>Situação Cadastral:</strong> {empresa.situacao_cadastral}</p>
            </Col>
            <Col md={6}>
              <p><strong>Data de Abertura:</strong> {new Date(empresa.data_abertura).toLocaleDateString('pt-BR')}</p>
              <p><strong>CNAE:</strong> {empresa.cnae_codigo} - {empresa.cnae_descricao}</p>
              <p><strong>Porte:</strong> {empresa.porte}</p>
              <p><strong>Endereço:</strong> {empresa.endereco_completo}</p>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Card className="mb-4 shadow-sm">
        <Card.Header className={`bg-${getBadgeVariant(analise.classificacao_risco)} text-white`}>
          <Row className="align-items-center">
            <Col>
              <h4 className="mb-0">Análise de Risco</h4>
            </Col>
            <Col className="text-end">
              <Badge 
                bg={getBadgeVariant(analise.classificacao_risco)} 
                pill
                className="fs-5 px-3 py-2"
              >
                Risco {analise.classificacao_risco}
              </Badge>
            </Col>
          </Row>
        </Card.Header>
        <Card.Body>
          <Row className="mb-4">
            <Col>
              <h5>Score Final: {analise.score_final} pontos</h5>
              <p className="text-muted">
                Score &gt;= 20: Baixo risco | 0 &lt;= Score &lt; 20: Médio risco | Score &lt; 0: Alto risco
              </p>
            </Col>
          </Row>

          {analise.sinais_alerta && analise.sinais_alerta.length > 0 && (
            <div className="mb-4">
              <h5>Sinais de Alerta</h5>
              <ListGroup>
                {analise.sinais_alerta.map((sinal, index) => (
                  <ListGroup.Item 
                    key={index} 
                    variant="danger"
                    className="d-flex align-items-center"
                  >
                    <i className="bi bi-exclamation-triangle-fill me-2"></i>
                    {sinal}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </div>
          )}

          <div>
            <h5>Critérios Aplicados</h5>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Critério</th>
                  <th>Impacto no Score</th>
                </tr>
              </thead>
              <tbody>
                {analise.criterios_aplicados.map((criterio, index) => (
                  <tr key={index}>
                    <td>{criterio.descricao}</td>
                    <td className={criterio.impacto >= 0 ? 'text-success' : 'text-danger'}>
                      {criterio.impacto >= 0 ? '+' : ''}{criterio.impacto}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ResultadoAnalise;