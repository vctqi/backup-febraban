import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getLinhasCredito, realizarSimulacao } from '../services/api';
import '../styles/SimuladorPage.css';

function SimuladorPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [linhasCredito, setLinhasCredito] = useState([]);
  const [formData, setFormData] = useState({
    valorSolicitado: '',
    prazo: '',
    rendaAnual: '',
    tipo: 'agricultura',
    finalidade: 'custeio',
    tempoAtividade: '',
    possuiOutrosFinanciamentos: false,
    areaProdutiva: ''
  });
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState(null);

  // Buscar linhas de crédito ao carregar a página
  useEffect(() => {
    const fetchLinhasCredito = async () => {
      try {
        const data = await getLinhasCredito();
        setLinhasCredito(data);
      } catch (error) {
        setError('Não foi possível carregar as linhas de crédito.');
        toast.error('Erro ao carregar dados. Tente novamente mais tarde.');
      }
    };

    fetchLinhasCredito();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const formatCurrency = (value) => {
    const numericValue = value.replace(/\D/g, '');
    
    if (numericValue === '') return '';
    
    // Convert to a number and format with 2 decimal places
    const formattedValue = (parseFloat(numericValue) / 100).toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
    
    return formattedValue;
  };

  const handleCurrencyChange = (e) => {
    const { name, value } = e.target;
    const formattedValue = formatCurrency(value);
    
    setFormData({
      ...formData,
      [name]: formattedValue
    });
  };

  const parseFormValues = (data) => {
    return {
      ...data,
      valorSolicitado: parseFloat(data.valorSolicitado.replace(/\./g, '').replace(',', '.')),
      rendaAnual: parseFloat(data.rendaAnual.replace(/\./g, '').replace(',', '.')),
      prazo: parseInt(data.prazo),
      tempoAtividade: parseInt(data.tempoAtividade),
      areaProdutiva: parseFloat(data.areaProdutiva)
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }
    
    setValidated(true);
    setLoading(true);
    setError(null);
    
    try {
      const parsedData = parseFormValues(formData);
      const resultado = await realizarSimulacao(parsedData);
      
      // Armazenar resultado no sessionStorage para uso na página de resultado
      sessionStorage.setItem('simulacaoResultado', JSON.stringify(resultado));
      sessionStorage.setItem('simulacaoDados', JSON.stringify(parsedData));
      
      toast.success('Simulação realizada com sucesso!');
      navigate('/resultado');
    } catch (error) {
      setError('Ocorreu um erro ao processar sua simulação. Tente novamente.');
      toast.error('Erro ao processar simulação. Verifique os dados e tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="simulador-page">
      <section className="page-header">
        <Container>
          <h1 className="page-title">Simulador de Financiamento Agropecuário</h1>
          <p className="page-description">
            Preencha os dados abaixo para simular seu financiamento agropecuário
            e encontrar a melhor linha de crédito para o seu negócio.
          </p>
        </Container>
      </section>

      <section className="simulador-section">
        <Container>
          <Row>
            <Col lg={8}>
              <Card className="simulador-card">
                <Card.Header as="h5" className="simulador-card-header">
                  <i className="bi bi-calculator me-2"></i>
                  Dados para Simulação
                </Card.Header>
                <Card.Body>
                  {error && (
                    <Alert variant="danger">{error}</Alert>
                  )}
                  
                  <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Valor Solicitado (R$)</Form.Label>
                          <Form.Control
                            type="text"
                            name="valorSolicitado"
                            value={formData.valorSolicitado}
                            onChange={handleCurrencyChange}
                            placeholder="Ex: 50.000,00"
                            required
                          />
                          <Form.Control.Feedback type="invalid">
                            Informe o valor solicitado.
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Prazo (meses)</Form.Label>
                          <Form.Control
                            type="number"
                            name="prazo"
                            value={formData.prazo}
                            onChange={handleChange}
                            placeholder="Ex: 48"
                            min="1"
                            max="180"
                            required
                          />
                          <Form.Control.Feedback type="invalid">
                            Informe um prazo válido.
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Renda Anual (R$)</Form.Label>
                          <Form.Control
                            type="text"
                            name="rendaAnual"
                            value={formData.rendaAnual}
                            onChange={handleCurrencyChange}
                            placeholder="Ex: 120.000,00"
                            required
                          />
                          <Form.Control.Feedback type="invalid">
                            Informe sua renda anual.
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Tipo de Atividade</Form.Label>
                          <Form.Select
                            name="tipo"
                            value={formData.tipo}
                            onChange={handleChange}
                            required
                          >
                            <option value="agricultura">Agricultura</option>
                            <option value="pecuaria">Pecuária</option>
                            <option value="extrativismo">Extrativismo</option>
                            <option value="aquicultura">Aquicultura</option>
                            <option value="outro">Outro</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Finalidade</Form.Label>
                          <Form.Select
                            name="finalidade"
                            value={formData.finalidade}
                            onChange={handleChange}
                            required
                          >
                            <option value="custeio">Custeio</option>
                            <option value="investimento">Investimento</option>
                            <option value="comercializacao">Comercialização</option>
                            <option value="industrializacao">Industrialização</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Tempo de Atividade (anos)</Form.Label>
                          <Form.Control
                            type="number"
                            name="tempoAtividade"
                            value={formData.tempoAtividade}
                            onChange={handleChange}
                            placeholder="Ex: 5"
                            min="0"
                            required
                          />
                          <Form.Control.Feedback type="invalid">
                            Informe o tempo de atividade.
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Área Produtiva (hectares)</Form.Label>
                          <Form.Control
                            type="number"
                            name="areaProdutiva"
                            value={formData.areaProdutiva}
                            onChange={handleChange}
                            placeholder="Ex: 100"
                            min="0"
                            step="0.1"
                            required
                          />
                          <Form.Control.Feedback type="invalid">
                            Informe a área produtiva.
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-4 mt-md-4">
                          <Form.Check
                            type="checkbox"
                            label="Possui outros financiamentos ativos"
                            name="possuiOutrosFinanciamentos"
                            checked={formData.possuiOutrosFinanciamentos}
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    
                    <div className="d-grid gap-2 mt-4">
                      <Button 
                        type="submit" 
                        variant="success" 
                        size="lg"
                        disabled={loading}
                      >
                        {loading ? (
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
                          'Simular Financiamento'
                        )}
                      </Button>
                    </div>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
            
            <Col lg={4}>
              <Card className="info-card mb-4">
                <Card.Header as="h5" className="info-card-header">
                  <i className="bi bi-info-circle me-2"></i>
                  Linhas de Crédito
                </Card.Header>
                <Card.Body>
                  <div className="linhas-credito-list">
                    {loading ? (
                      <div className="text-center py-4">
                        <Spinner animation="border" variant="success" />
                      </div>
                    ) : linhasCredito.length > 0 ? (
                      linhasCredito.map((linha) => (
                        <div key={linha.id} className="linha-credito-item">
                          <h6>{linha.nome}</h6>
                          <p className="small">{linha.descricao}</p>
                          <div className="linha-credito-info">
                            <span>Taxa: {linha.taxaMinima}% - {linha.taxaMaxima}%</span>
                            <span>Prazo: até {linha.prazoMaximo} meses</span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-muted">Nenhuma linha de crédito disponível no momento.</p>
                    )}
                  </div>
                </Card.Body>
              </Card>
              
              <Card className="info-card">
                <Card.Header as="h5" className="info-card-header">
                  <i className="bi bi-lightbulb me-2"></i>
                  Dicas
                </Card.Header>
                <Card.Body>
                  <ul className="tips-list">
                    <li>
                      <strong>Tenha seus documentos em dia</strong>
                      <p>Certifique-se de que sua documentação está regularizada para agilizar o processo.</p>
                    </li>
                    <li>
                      <strong>Planeje seu projeto</strong>
                      <p>Um projeto bem estruturado aumenta suas chances de aprovação.</p>
                    </li>
                    <li>
                      <strong>Considere práticas sustentáveis</strong>
                      <p>Projetos com componentes sustentáveis podem ter condições especiais.</p>
                    </li>
                  </ul>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
}

export default SimuladorPage;