import React from 'react';
import { Table, Badge, Card } from 'react-bootstrap';
import { formatCnpj } from '../utils/cnpjUtils';

const HistoricoConsultas = ({ consultas, onSelectConsulta, isLoading }) => {
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

  // Formata a data para exibição
  const formatarData = (dataString) => {
    const data = new Date(dataString);
    return data.toLocaleString('pt-BR');
  };

  if (isLoading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Carregando...</span>
        </div>
        <p className="mt-2">Carregando histórico de consultas...</p>
      </div>
    );
  }

  if (!consultas || consultas.length === 0) {
    return (
      <Card className="text-center p-5 shadow-sm">
        <Card.Body>
          <h5>Nenhuma consulta realizada ainda</h5>
          <p className="text-muted">
            As consultas realizadas aparecerão aqui.
          </p>
        </Card.Body>
      </Card>
    );
  }

  return (
    <div className="mt-4">
      <h3 className="mb-3">Histórico de Consultas</h3>
      <Card className="shadow-sm">
        <Table hover responsive>
          <thead>
            <tr>
              <th>CNPJ</th>
              <th>Data da Consulta</th>
              <th>Score</th>
              <th>Classificação</th>
            </tr>
          </thead>
          <tbody>
            {consultas.map((consulta) => (
              <tr 
                key={consulta.id} 
                onClick={() => onSelectConsulta(consulta)}
                style={{ cursor: 'pointer' }}
              >
                <td>{formatCnpj(consulta.cnpj)}</td>
                <td>{formatarData(consulta.createdAt)}</td>
                <td>{consulta.Analise ? consulta.Analise.score_final : 'N/A'}</td>
                <td>
                  {consulta.Analise ? (
                    <Badge 
                      bg={getBadgeVariant(consulta.Analise.classificacao_risco)}
                    >
                      {consulta.Analise.classificacao_risco}
                    </Badge>
                  ) : (
                    'N/A'
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
      <p className="text-muted mt-2">
        Clique em uma consulta para ver os detalhes.
      </p>
    </div>
  );
};

export default HistoricoConsultas;