import React, { useState, useEffect } from 'react';
import { Card, Table, Form, InputGroup, Button, Spinner, Alert } from 'react-bootstrap';
import { FaSearch, FaFilter, FaSyncAlt } from 'react-icons/fa';
import { getClientes } from '../services/api';
import ClienteRow from '../components/ClienteRow';

const ListaClientes = () => {
  const [clientes, setClientes] = useState([]);
  const [filteredClientes, setFilteredClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filtroRisco, setFiltroRisco] = useState('todos');
  const [filtroSegmento, setFiltroSegmento] = useState('todos');

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const data = await getClientes();
        setClientes(data);
        setFilteredClientes(data);
        setLoading(false);
      } catch (err) {
        setError('Erro ao carregar lista de clientes.');
        setLoading(false);
      }
    };

    fetchClientes();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [searchTerm, filtroRisco, filtroSegmento, clientes]);

  const applyFilters = () => {
    let result = [...clientes];

    // Filtro de pesquisa por nome ou CNPJ
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        cliente => 
          cliente.nome.toLowerCase().includes(term) || 
          cliente.cnpj.includes(term)
      );
    }

    // Filtro de nível de risco
    if (filtroRisco !== 'todos') {
      result = result.filter(
        cliente => cliente.analiseRisco.nivelRisco === filtroRisco
      );
    }

    // Filtro de segmento
    if (filtroSegmento !== 'todos') {
      result = result.filter(
        cliente => cliente.segmento === filtroSegmento
      );
    }

    setFilteredClientes(result);
  };

  const resetFilters = () => {
    setSearchTerm('');
    setFiltroRisco('todos');
    setFiltroSegmento('todos');
  };

  // Extrair segmentos únicos para o filtro
  const segmentosUnicos = [...new Set(clientes.map(cliente => cliente.segmento))];

  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Carregando clientes...</p>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger">
        <Alert.Heading>Erro</Alert.Heading>
        <p>{error}</p>
      </Alert>
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Clientes</h1>
      </div>

      <Card className="mb-4">
        <Card.Body>
          <Form>
            <div className="d-flex flex-wrap gap-3">
              <div className="flex-grow-1 mb-2">
                <InputGroup>
                  <InputGroup.Text>
                    <FaSearch />
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Buscar por nome ou CNPJ"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </InputGroup>
              </div>

              <div className="mb-2" style={{ minWidth: '200px' }}>
                <InputGroup>
                  <InputGroup.Text>
                    <FaFilter />
                  </InputGroup.Text>
                  <Form.Select 
                    value={filtroRisco} 
                    onChange={(e) => setFiltroRisco(e.target.value)}
                  >
                    <option value="todos">Todos os níveis de risco</option>
                    <option value="Muito Baixo">Muito Baixo</option>
                    <option value="Baixo">Baixo</option>
                    <option value="Médio-Baixo">Médio-Baixo</option>
                    <option value="Médio">Médio</option>
                    <option value="Médio-Alto">Médio-Alto</option>
                    <option value="Alto">Alto</option>
                    <option value="Muito Alto">Muito Alto</option>
                  </Form.Select>
                </InputGroup>
              </div>

              <div className="mb-2" style={{ minWidth: '200px' }}>
                <InputGroup>
                  <InputGroup.Text>
                    <FaFilter />
                  </InputGroup.Text>
                  <Form.Select 
                    value={filtroSegmento} 
                    onChange={(e) => setFiltroSegmento(e.target.value)}
                  >
                    <option value="todos">Todos os segmentos</option>
                    {segmentosUnicos.map(segmento => (
                      <option key={segmento} value={segmento}>{segmento}</option>
                    ))}
                  </Form.Select>
                </InputGroup>
              </div>

              <div className="mb-2">
                <Button variant="outline-secondary" onClick={resetFilters}>
                  <FaSyncAlt className="me-1" /> Limpar filtros
                </Button>
              </div>
            </div>
          </Form>
        </Card.Body>
      </Card>

      <Card>
        <Card.Body>
          <div className="table-responsive">
            <Table striped hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nome</th>
                  <th>CNPJ</th>
                  <th>Segmento</th>
                  <th>Tipo de Negócio</th>
                  <th className="text-center">Classificação</th>
                  <th className="text-center">Score</th>
                  <th>Nível de Risco</th>
                  <th className="text-center">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredClientes.length > 0 ? (
                  filteredClientes.map(cliente => (
                    <ClienteRow key={cliente.id} cliente={cliente} />
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="text-center py-3">
                      Nenhum cliente encontrado com os filtros aplicados.
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ListaClientes;