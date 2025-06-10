import React, { useState, useEffect } from 'react';
import { Card, Form, Button, Row, Col, Alert, Spinner, Tab, Tabs } from 'react-bootstrap';
import { getCliente, resgatarPontosOuCashback } from '../api';

const Resgatar = () => {
  const [cliente, setCliente] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processando, setProcessando] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [resultado, setResultado] = useState(null);
  
  const [formPontos, setFormPontos] = useState({
    quantidade: '',
    item: 'Lavagem Completa',
    posto: 'Posto Avenida Central'
  });
  
  const [formCashback, setFormCashback] = useState({
    quantidade: '',
    item: 'Desconto em Abastecimento',
    posto: 'Posto Avenida Central'
  });
  
  const itensPontos = [
    'Lavagem Completa',
    'Troca de Óleo',
    'Kit Limpeza Automotiva',
    'Aditivos para Motor',
    'Filtro de Ar',
    'Chaveiro Exclusivo'
  ];
  
  const postos = [
    'Posto Avenida Central',
    'Posto Rodovia Sul',
    'Posto Beira Mar'
  ];
  
  useEffect(() => {
    const fetchCliente = async () => {
      try {
        const data = await getCliente();
        setCliente(data);
      } catch (error) {
        setError('Erro ao carregar dados do cliente. Por favor, recarregue a página.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchCliente();
  }, []);
  
  const handleChangePontos = (e) => {
    const { name, value } = e.target;
    setFormPontos({ ...formPontos, [name]: value });
  };
  
  const handleChangeCashback = (e) => {
    const { name, value } = e.target;
    setFormCashback({ ...formCashback, [name]: value });
  };
  
  const handleResgatePontos = async (e) => {
    e.preventDefault();
    await fazerResgate('pontos', formPontos);
  };
  
  const handleResgateCashback = async (e) => {
    e.preventDefault();
    await fazerResgate('cashback', formCashback);
  };
  
  const fazerResgate = async (tipo, form) => {
    setProcessando(true);
    setError(null);
    setSuccess(null);
    setResultado(null);
    
    try {
      // Conversão de valor para número
      const dados = {
        ...form,
        tipo: tipo,
        quantidade: parseFloat(form.quantidade)
      };
      
      // Validações
      if (isNaN(dados.quantidade) || dados.quantidade <= 0) {
        throw new Error('Por favor, insira uma quantidade válida para resgate');
      }
      
      if (tipo === 'pontos' && dados.quantidade > cliente.pontos) {
        throw new Error('Pontos insuficientes para este resgate');
      }
      
      if (tipo === 'cashback' && dados.quantidade > cliente.cashback) {
        throw new Error('Cashback insuficiente para este resgate');
      }
      
      const response = await resgatarPontosOuCashback(dados);
      setSuccess(`${tipo === 'pontos' ? 'Pontos' : 'Cashback'} resgatados com sucesso!`);
      setResultado(response.transacao);
      
      // Atualizar dados do cliente após resgate
      if (tipo === 'pontos') {
        setCliente({
          ...cliente,
          pontos: cliente.pontos - dados.quantidade
        });
        
        // Resetar formulário
        setFormPontos({
          quantidade: '',
          item: 'Lavagem Completa',
          posto: 'Posto Avenida Central'
        });
      } else {
        setCliente({
          ...cliente,
          cashback: cliente.cashback - dados.quantidade
        });
        
        // Resetar formulário
        setFormCashback({
          quantidade: '',
          item: 'Desconto em Abastecimento',
          posto: 'Posto Avenida Central'
        });
      }
    } catch (err) {
      setError(err.message || 'Ocorreu um erro ao realizar o resgate. Tente novamente.');
    } finally {
      setProcessando(false);
    }
  };
  
  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Carregando dados do cliente...</p>
      </div>
    );
  }
  
  return (
    <div>
      <h2 className="mb-4">Resgatar Recompensas</h2>
      
      <Row className="mb-4">
        <Col md={6} className="mb-3 mb-md-0">
          <Card className="dashboard-card pontos h-100">
            <Card.Body>
              <Card.Title>Seus Pontos</Card.Title>
              <div className="value">{cliente?.pontos.toLocaleString()}</div>
              <Card.Text>
                Acumule pontos abastecendo ou troque por recompensas exclusivas.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="dashboard-card cashback h-100">
            <Card.Body>
              <Card.Title>Seu Cashback</Card.Title>
              <div className="value">
                R$ {cliente?.cashback.toFixed(2).replace('.', ',')}
              </div>
              <Card.Text>
                Cashback disponível para desconto no próximo abastecimento.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <Card>
        <Card.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}
          
          <Tabs defaultActiveKey="pontos" className="mb-4">
            <Tab eventKey="pontos" title="Resgatar com Pontos">
              <Row>
                <Col md={6}>
                  <Form onSubmit={handleResgatePontos}>
                    <Form.Group className="mb-3">
                      <Form.Label>Quantidade de Pontos</Form.Label>
                      <Form.Control
                        type="number"
                        name="quantidade"
                        value={formPontos.quantidade}
                        onChange={handleChangePontos}
                        placeholder="0"
                        min="1"
                        max={cliente?.pontos}
                        required
                      />
                      <Form.Text className="text-muted">
                        Você possui {cliente?.pontos} pontos disponíveis.
                      </Form.Text>
                    </Form.Group>
                    
                    <Form.Group className="mb-3">
                      <Form.Label>Item para Resgate</Form.Label>
                      <Form.Select
                        name="item"
                        value={formPontos.item}
                        onChange={handleChangePontos}
                        required
                      >
                        {itensPontos.map((item) => (
                          <option key={item} value={item}>
                            {item}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                    
                    <Form.Group className="mb-3">
                      <Form.Label>Posto</Form.Label>
                      <Form.Select
                        name="posto"
                        value={formPontos.posto}
                        onChange={handleChangePontos}
                        required
                      >
                        {postos.map((posto) => (
                          <option key={posto} value={posto}>
                            {posto}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                    
                    <Button 
                      variant="success" 
                      type="submit" 
                      className="w-100"
                      disabled={processando || cliente.pontos === 0}
                    >
                      {processando ? (
                        <>
                          <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                            className="me-2"
                          />
                          Processando...
                        </>
                      ) : (
                        'Resgatar Pontos'
                      )}
                    </Button>
                  </Form>
                </Col>
                
                <Col md={6}>
                  <div className="mb-4">
                    <h5>Tabela de Pontos</h5>
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th>Item</th>
                          <th>Pontos</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Lavagem Completa</td>
                          <td>300</td>
                        </tr>
                        <tr>
                          <td>Troca de Óleo</td>
                          <td>500</td>
                        </tr>
                        <tr>
                          <td>Kit Limpeza Automotiva</td>
                          <td>400</td>
                        </tr>
                        <tr>
                          <td>Aditivos para Motor</td>
                          <td>200</td>
                        </tr>
                        <tr>
                          <td>Filtro de Ar</td>
                          <td>250</td>
                        </tr>
                        <tr>
                          <td>Chaveiro Exclusivo</td>
                          <td>100</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </Col>
              </Row>
            </Tab>
            
            <Tab eventKey="cashback" title="Usar Cashback">
              <Row>
                <Col md={6}>
                  <Form onSubmit={handleResgateCashback}>
                    <Form.Group className="mb-3">
                      <Form.Label>Valor do Cashback (R$)</Form.Label>
                      <Form.Control
                        type="number"
                        step="0.01"
                        name="quantidade"
                        value={formCashback.quantidade}
                        onChange={handleChangeCashback}
                        placeholder="0,00"
                        min="1"
                        max={cliente?.cashback}
                        required
                      />
                      <Form.Text className="text-muted">
                        Você possui R$ {cliente?.cashback.toFixed(2).replace('.', ',')} de cashback disponível.
                      </Form.Text>
                    </Form.Group>
                    
                    <Form.Group className="mb-3">
                      <Form.Label>Item</Form.Label>
                      <Form.Control
                        type="text"
                        name="item"
                        value={formCashback.item}
                        onChange={handleChangeCashback}
                        placeholder="Desconto em Abastecimento"
                        required
                        readOnly
                      />
                    </Form.Group>
                    
                    <Form.Group className="mb-3">
                      <Form.Label>Posto</Form.Label>
                      <Form.Select
                        name="posto"
                        value={formCashback.posto}
                        onChange={handleChangeCashback}
                        required
                      >
                        {postos.map((posto) => (
                          <option key={posto} value={posto}>
                            {posto}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                    
                    <Button 
                      variant="primary" 
                      type="submit" 
                      className="w-100"
                      disabled={processando || cliente.cashback === 0}
                    >
                      {processando ? (
                        <>
                          <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                            className="me-2"
                          />
                          Processando...
                        </>
                      ) : (
                        'Usar Cashback'
                      )}
                    </Button>
                  </Form>
                </Col>
                
                <Col md={6}>
                  <div className="mb-4">
                    <h5>Regras de Utilização</h5>
                    <ul>
                      <li>O cashback pode ser utilizado como desconto direto em abastecimentos futuros.</li>
                      <li>Valor mínimo para resgate: R$ 1,00</li>
                      <li>Não há conversão de cashback para pontos</li>
                      <li>O cashback é válido por 6 meses</li>
                      <li>O valor de cashback não é cumulativo com outras promoções</li>
                    </ul>
                  </div>
                </Col>
              </Row>
            </Tab>
          </Tabs>
          
          {resultado && (
            <div className="mt-4 border p-3 rounded bg-light">
              <h5>Detalhes do Resgate</h5>
              <Row>
                <Col md={6}>
                  <p><strong>Data:</strong> {new Date(resultado.data).toLocaleDateString('pt-BR')}</p>
                  <p><strong>Posto:</strong> {resultado.posto}</p>
                  <p><strong>Item:</strong> {resultado.item}</p>
                </Col>
                <Col md={6}>
                  {resultado.pontos !== 0 && (
                    <p><strong>Pontos resgatados:</strong> {Math.abs(resultado.pontos)}</p>
                  )}
                  {resultado.cashback !== 0 && (
                    <p><strong>Cashback utilizado:</strong> R$ {Math.abs(resultado.cashback).toFixed(2).replace('.', ',')}</p>
                  )}
                </Col>
              </Row>
            </div>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default Resgatar;