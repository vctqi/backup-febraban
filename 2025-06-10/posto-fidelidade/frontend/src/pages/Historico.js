import React, { useState, useEffect } from 'react';
import { Card, Table, Badge, Form, Row, Col, Spinner } from 'react-bootstrap';
import { getHistorico } from '../api';

const Historico = () => {
  const [transacoes, setTransacoes] = useState([]);
  const [filteredTransacoes, setFilteredTransacoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState('todas');
  const [periodo, setPeriodo] = useState('todos');

  useEffect(() => {
    const fetchHistorico = async () => {
      try {
        const data = await getHistorico();
        // Ordenar por data (mais recente primeiro)
        const sorted = [...data].sort((a, b) => new Date(b.data) - new Date(a.data));
        setTransacoes(sorted);
        setFilteredTransacoes(sorted);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar histórico:', error);
        setLoading(false);
      }
    };

    fetchHistorico();
  }, []);

  useEffect(() => {
    aplicarFiltros();
  }, [filtro, periodo, transacoes]);

  const aplicarFiltros = () => {
    let resultado = [...transacoes];

    // Filtrar por tipo
    if (filtro !== 'todas') {
      resultado = resultado.filter(t => t.tipo === filtro);
    }

    // Filtrar por período
    if (periodo !== 'todos') {
      const hoje = new Date();
      const dataLimite = new Date();

      switch (periodo) {
        case 'ultima-semana':
          dataLimite.setDate(hoje.getDate() - 7);
          break;
        case 'ultimo-mes':
          dataLimite.setMonth(hoje.getMonth() - 1);
          break;
        case 'ultimos-tres-meses':
          dataLimite.setMonth(hoje.getMonth() - 3);
          break;
        default:
          break;
      }

      resultado = resultado.filter(t => new Date(t.data) >= dataLimite);
    }

    setFilteredTransacoes(resultado);
  };

  const formatarTipo = (tipo) => {
    return tipo === 'acumulo' ? 'Acúmulo' : 'Resgate';
  };

  const getBadgeColor = (tipo) => {
    return tipo === 'acumulo' ? 'success' : 'danger';
  };

  const formatarValor = (valor) => {
    return valor ? `R$ ${valor.toFixed(2).replace('.', ',')}` : '-';
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Carregando histórico de transações...</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-4">Histórico de Transações</h2>
      
      <Card className="mb-4">
        <Card.Body>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Filtrar por tipo</Form.Label>
                <Form.Select value={filtro} onChange={(e) => setFiltro(e.target.value)}>
                  <option value="todas">Todas as transações</option>
                  <option value="acumulo">Somente acúmulos</option>
                  <option value="resgate">Somente resgates</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Filtrar por período</Form.Label>
                <Form.Select value={periodo} onChange={(e) => setPeriodo(e.target.value)}>
                  <option value="todos">Todo o período</option>
                  <option value="ultima-semana">Última semana</option>
                  <option value="ultimo-mes">Último mês</option>
                  <option value="ultimos-tres-meses">Últimos 3 meses</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      
      <Card>
        <Card.Body>
          {filteredTransacoes.length > 0 ? (
            <div className="table-responsive">
              <Table striped hover>
                <thead>
                  <tr>
                    <th>Data</th>
                    <th>Tipo</th>
                    <th>Posto</th>
                    <th>Pontos</th>
                    <th>Cashback</th>
                    <th>Valor</th>
                    <th>Detalhes</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTransacoes.map((transacao) => (
                    <tr key={transacao.id} className={`transaction-${transacao.tipo}`}>
                      <td>{new Date(transacao.data).toLocaleDateString('pt-BR')}</td>
                      <td>
                        <Badge bg={getBadgeColor(transacao.tipo)}>
                          {formatarTipo(transacao.tipo)}
                        </Badge>
                      </td>
                      <td>{transacao.posto}</td>
                      <td>
                        {transacao.pontos !== 0 ? 
                          (transacao.pontos > 0 ? `+${transacao.pontos}` : transacao.pontos) 
                          : '-'}
                      </td>
                      <td>
                        {transacao.cashback !== 0 ? 
                          (transacao.cashback > 0 
                            ? `+R$ ${transacao.cashback.toFixed(2).replace('.', ',')}` 
                            : `R$ ${transacao.cashback.toFixed(2).replace('.', ',')}`) 
                          : '-'}
                      </td>
                      <td>{formatarValor(transacao.valor)}</td>
                      <td>
                        {transacao.tipo === 'acumulo' 
                          ? transacao.combustivel 
                          : transacao.item}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-4">
              <p>Nenhuma transação encontrada para os filtros selecionados.</p>
            </div>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default Historico;