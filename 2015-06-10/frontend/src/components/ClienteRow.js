import React from 'react';
import { Badge, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaEye } from 'react-icons/fa';

const ClienteRow = ({ cliente }) => {
  const getClassificacaoBadgeVariant = (classificacao) => {
    switch (classificacao) {
      case 'AA': return 'primary';
      case 'A': return 'success';
      case 'B': return 'info';
      case 'C': return 'warning';
      case 'D': return 'warning';
      case 'E': return 'danger';
      case 'F': return 'danger';
      default: return 'secondary';
    }
  };

  const getNivelRiscoBadgeVariant = (nivel) => {
    switch (nivel) {
      case 'Muito Baixo': return 'primary';
      case 'Baixo': return 'success';
      case 'Médio-Baixo': return 'info';
      case 'Médio': return 'warning';
      case 'Médio-Alto': return 'warning';
      case 'Alto': return 'danger';
      case 'Muito Alto': return 'danger';
      default: return 'secondary';
    }
  };

  return (
    <tr>
      <td>{cliente.id}</td>
      <td>{cliente.nome}</td>
      <td>{cliente.cnpj}</td>
      <td>{cliente.segmento}</td>
      <td>{cliente.tipoNegocio}</td>
      <td className="text-center">
        <Badge bg={getClassificacaoBadgeVariant(cliente.analiseRisco.classificacao)}>
          {cliente.analiseRisco.classificacao}
        </Badge>
      </td>
      <td className="text-center">{cliente.analiseRisco.score}</td>
      <td>
        <Badge bg={getNivelRiscoBadgeVariant(cliente.analiseRisco.nivelRisco)}>
          {cliente.analiseRisco.nivelRisco}
        </Badge>
      </td>
      <td className="text-center">
        <Link to={`/clientes/${cliente.id}`}>
          <Button variant="outline-primary" size="sm">
            <FaEye /> Ver
          </Button>
        </Link>
      </td>
    </tr>
  );
};

export default ClienteRow;