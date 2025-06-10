import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Row, 
  Col, 
  Card, 
  Table, 
  Badge, 
  Button, 
  Spinner, 
  Alert, 
  Nav 
} from 'react-bootstrap';
import { FaArrowLeft, FaCalculator, FaSyncAlt } from 'react-icons/fa';
import { getClienteById, analisarCliente } from '../services/api';
import ScoreDisplay from '../components/ScoreDisplay';
import AcoesSugeridas from '../components/AcoesSugeridas';
import IndicadoresFinanceiros from '../components/IndicadoresFinanceiros';

const DetalhesCliente = () => {
  const { id } = useParams();
  const [cliente, setCliente] = useState(null);
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('resumo');

  useEffect(() => {
    const fetchClienteDetails = async () => {
      try {
        const data = await getClienteById(parseInt(id));
        setCliente(data);
        setLoading(false);
      } catch (err) {
        setError('Erro ao carregar dados do cliente.');
        setLoading(false);
      }
    };

    fetchClienteDetails();
  }, [id]);

  const handleAnaliseClick = async () => {
    setAnalyzing(true);
    try {
      const analiseAtualizada = await analisarCliente(parseInt(id));
      setCliente(prevCliente => ({
        ...prevCliente,
        analiseRisco: analiseAtualizada
      }));
    } catch (err) {
      setError('Erro ao realizar análise de risco.');
    } finally {
      setAnalyzing(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Carregando dados do cliente...</p>
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
        <div>
          <Link to="/clientes" className="btn btn-sm btn-outline-secondary me-2">
            <FaArrowLeft /> Voltar
          </Link>
          <h1 className="h2 d-inline-block">{cliente.nome}</h1>
          <Badge bg="secondary" className="ms-2">{cliente.segmento}</Badge>
        </div>
        <div>
          <Button 
            variant="outline-primary" 
            className="me-2" 
            as={Link} 
            to={`/simulacao?clienteId=${cliente.id}`}
          >
            <FaCalculator className="me-1" /> Simular Crédito
          </Button>
          <Button 
            variant="primary" 
            onClick={handleAnaliseClick} 
            disabled={analyzing}
          >
            {analyzing ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  className="me-1"
                />
                Analisando...
              </>
            ) : (
              <>
                <FaSyncAlt className="me-1" /> Atualizar Análise
              </>
            )}
          </Button>
        </div>
      </div>

      <Row className="mb-4">
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body className="text-center">
              <h5 className="card-title mb-3">Score de Crédito</h5>
              <ScoreDisplay 
                score={cliente.analiseRisco.score}
                classificacao={cliente.analiseRisco.classificacao}
                nivelRisco={cliente.analiseRisco.nivelRisco}
              />
              <div className="mt-3">
                <strong>Limite Sugerido:</strong> R$ {cliente.analiseRisco.limiteSugerido.toLocaleString()}
              </div>
              <div className="mt-2">
                <strong>Taxa de Juros:</strong> {cliente.analiseRisco.taxaJurosSugerida}% a.m.
              </div>
            </Card.Body>
          </Card>
          
          <AcoesSugeridas acoes={cliente.analiseRisco.acoesSugeridas} />
        </Col>
        
        <Col md={8}>
          <Card className="mb-4">
            <Card.Header>
              <Nav variant="tabs" defaultActiveKey="resumo" onSelect={setActiveTab}>
                <Nav.Item>
                  <Nav.Link eventKey="resumo">Resumo</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="financeiro">Dados Financeiros</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="credito">Histórico de Crédito</Nav.Link>
                </Nav.Item>
              </Nav>
            </Card.Header>
            <Card.Body>
              {activeTab === 'resumo' && (
                <>
                  <Row>
                    <Col md={6}>
                      <div className="mb-3">
                        <div className="text-muted mb-1">CNPJ</div>
                        <div>{cliente.cnpj}</div>
                      </div>
                      <div className="mb-3">
                        <div className="text-muted mb-1">E-mail</div>
                        <div>{cliente.email}</div>
                      </div>
                      <div className="mb-3">
                        <div className="text-muted mb-1">Telefone</div>
                        <div>{cliente.telefone}</div>
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="mb-3">
                        <div className="text-muted mb-1">Segmento</div>
                        <div>{cliente.segmento}</div>
                      </div>
                      <div className="mb-3">
                        <div className="text-muted mb-1">Tipo de Negócio</div>
                        <div>{cliente.tipoNegocio}</div>
                      </div>
                      <div className="mb-3">
                        <div className="text-muted mb-1">Tempo de Atividade</div>
                        <div>{cliente.tempoAtividade} meses ({Math.floor(cliente.tempoAtividade / 12)} anos e {cliente.tempoAtividade % 12} meses)</div>
                      </div>
                    </Col>
                  </Row>
                  
                  <IndicadoresFinanceiros indicadores={cliente.indicadores} />
                </>
              )}
              
              {activeTab === 'financeiro' && (
                <div>
                  <h5 className="mb-3">Dados Financeiros</h5>
                  <Row>
                    <Col md={6}>
                      <div className="mb-3">
                        <div className="text-muted mb-1">Faturamento Mensal</div>
                        <div className="h4">R$ {cliente.faturamentoMensal.toLocaleString()}</div>
                      </div>
                      <div className="mb-3">
                        <div className="text-muted mb-1">Faturamento Anual (estimado)</div>
                        <div className="h4">R$ {(cliente.faturamentoMensal * 12).toLocaleString()}</div>
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="mb-3">
                        <div className="text-muted mb-1">Despesas Mensais</div>
                        <div className="h4">R$ {cliente.despesasMensais.toLocaleString()}</div>
                      </div>
                      <div className="mb-3">
                        <div className="text-muted mb-1">Lucro Mensal (estimado)</div>
                        <div className="h4">R$ {(cliente.faturamentoMensal - cliente.despesasMensais).toLocaleString()}</div>
                      </div>
                    </Col>
                  </Row>
                  
                  <IndicadoresFinanceiros indicadores={cliente.indicadores} />
                </div>
              )}
              
              {activeTab === 'credito' && (
                <div>
                  <h5 className="mb-3">Histórico de Crédito</h5>
                  <div className="mb-3">
                    <div className="text-muted mb-1">Score Bureaux</div>
                    <div className="h4">{cliente.historicoCredito.score}</div>
                  </div>
                  <div className="mb-3">
                    <div className="text-muted mb-1">Restrições</div>
                    <div>{cliente.historicoCredito.restricoes ? 'Sim' : 'Não'}</div>
                  </div>
                  <div className="mb-3">
                    <div className="text-muted mb-1">Atrasos de Pagamento (últimos 12 meses)</div>
                    <div>{cliente.historicoCredito.atrasosPagamento}</div>
                  </div>
                  
                  <h6 className="mt-4 mb-3">Empréstimos Anteriores</h6>
                  {cliente.historicoCredito.ultimosEmprestimos.length > 0 ? (
                    <Table striped hover responsive>
                      <thead>
                        <tr>
                          <th>Valor</th>
                          <th>Taxa</th>
                          <th>Parcelas</th>
                          <th>Pagas</th>
                          <th>Situação</th>
                          <th>Início</th>
                          <th>Término</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cliente.historicoCredito.ultimosEmprestimos.map((emprestimo, index) => (
                          <tr key={index}>
                            <td>R$ {emprestimo.valor.toLocaleString()}</td>
                            <td>{emprestimo.taxaJuros}% a.m.</td>
                            <td>{emprestimo.parcelas}</td>
                            <td>{emprestimo.parcelasPagas}</td>
                            <td>
                              <Badge bg={
                                emprestimo.situacao === 'Quitado' ? 'success' : 
                                emprestimo.situacao === 'Em andamento' ? 'primary' : 
                                'danger'
                              }>
                                {emprestimo.situacao}
                              </Badge>
                            </td>
                            <td>{new Date(emprestimo.dataInicio).toLocaleDateString('pt-BR')}</td>
                            <td>{new Date(emprestimo.dataFim).toLocaleDateString('pt-BR')}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  ) : (
                    <div className="text-center text-muted">
                      Não há empréstimos anteriores registrados.
                    </div>
                  )}
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DetalhesCliente;