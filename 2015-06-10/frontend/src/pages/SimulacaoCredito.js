import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  Card, 
  Form, 
  Button, 
  Row, 
  Col, 
  Alert, 
  Spinner, 
  Table 
} from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { FaCalculator, FaMoneyBillWave, FaPercentage, FaCalendarAlt } from 'react-icons/fa';
import { getClientes, getClienteById, simularEmprestimo } from '../services/api';

const SimulacaoCredito = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const clienteIdParam = queryParams.get('clienteId');
  
  const [clientes, setClientes] = useState([]);
  const [clienteSelecionado, setClienteSelecionado] = useState(null);
  const [loading, setLoading] = useState(true);
  const [simulando, setSimulando] = useState(false);
  const [error, setError] = useState(null);
  const [resultado, setResultado] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const clientesData = await getClientes();
        setClientes(clientesData);
        
        // Se tiver clienteId nos parâmetros, carrega os detalhes desse cliente
        if (clienteIdParam) {
          const cliente = await getClienteById(parseInt(clienteIdParam));
          setClienteSelecionado(cliente);
        }
        
        setLoading(false);
      } catch (err) {
        setError('Erro ao carregar dados.');
        setLoading(false);
      }
    };

    fetchData();
  }, [clienteIdParam]);

  const handleClienteChange = async (event) => {
    const id = parseInt(event.target.value);
    if (id) {
      try {
        setLoading(true);
        const cliente = await getClienteById(id);
        setClienteSelecionado(cliente);
        setLoading(false);
      } catch (err) {
        setError('Erro ao carregar dados do cliente.');
        setLoading(false);
      }
    } else {
      setClienteSelecionado(null);
    }
  };

  const handleSimular = async (values) => {
    setSimulando(true);
    setError(null);
    setResultado(null);
    
    try {
      const dados = {
        clienteId: clienteSelecionado.id,
        valor: parseFloat(values.valor),
        parcelas: parseInt(values.parcelas)
      };
      
      const resultadoSimulacao = await simularEmprestimo(dados);
      setResultado(resultadoSimulacao);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Erro ao realizar simulação. Tente novamente.');
      }
    } finally {
      setSimulando(false);
    }
  };

  const validationSchema = Yup.object().shape({
    valor: Yup.number()
      .required('Valor é obrigatório')
      .positive('Valor deve ser positivo')
      .test(
        'maxLimit',
        'Valor excede o limite disponível',
        function(value) {
          if (!clienteSelecionado) return true;
          return !value || value <= clienteSelecionado.analiseRisco.limiteSugerido;
        }
      ),
    parcelas: Yup.number()
      .required('Número de parcelas é obrigatório')
      .integer('Deve ser um número inteiro')
      .positive('Deve ser um número positivo')
  });

  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Carregando dados...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Simulação de Crédito</h1>
      </div>

      <Row>
        <Col lg={6}>
          <Card className="mb-4">
            <Card.Header as="h5">
              <FaCalculator className="me-2" />
              Simular Empréstimo
            </Card.Header>
            <Card.Body>
              <Form.Group className="mb-3">
                <Form.Label>Selecione o Cliente</Form.Label>
                <Form.Select 
                  value={clienteSelecionado ? clienteSelecionado.id : ''}
                  onChange={handleClienteChange}
                >
                  <option value="">Selecione um cliente</option>
                  {clientes.map(cliente => (
                    <option key={cliente.id} value={cliente.id}>
                      {cliente.nome} - {cliente.cnpj}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              {clienteSelecionado ? (
                <div>
                  <div className="mb-3">
                    <strong>Classificação de Risco:</strong> {clienteSelecionado.analiseRisco.classificacao} - {clienteSelecionado.analiseRisco.nivelRisco}
                  </div>
                  <div className="mb-3">
                    <strong>Score:</strong> {clienteSelecionado.analiseRisco.score}
                  </div>
                  <div className="mb-3">
                    <strong>Limite Sugerido:</strong> R$ {clienteSelecionado.analiseRisco.limiteSugerido.toLocaleString()}
                  </div>
                  <div className="mb-3">
                    <strong>Taxa Sugerida:</strong> {clienteSelecionado.analiseRisco.taxaJurosSugerida}% a.m.
                  </div>
                  <div className="mb-4">
                    <strong>Parcelas Sugeridas:</strong> {clienteSelecionado.analiseRisco.parcelasSugeridas.join(', ')} meses
                  </div>

                  <Formik
                    initialValues={{
                      valor: '',
                      parcelas: clienteSelecionado.analiseRisco.parcelasSugeridas[0] || 12
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSimular}
                  >
                    {({
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      isValid
                    }) => (
                      <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                          <Form.Label>Valor do Empréstimo (R$)</Form.Label>
                          <Form.Control
                            type="number"
                            name="valor"
                            value={values.valor}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={touched.valor && errors.valor}
                            placeholder="0,00"
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.valor}
                          </Form.Control.Feedback>
                          <Form.Text className="text-muted">
                            Limite máximo: R$ {clienteSelecionado.analiseRisco.limiteSugerido.toLocaleString()}
                          </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3">
                          <Form.Label>Número de Parcelas</Form.Label>
                          <Form.Select
                            name="parcelas"
                            value={values.parcelas}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={touched.parcelas && errors.parcelas}
                          >
                            {clienteSelecionado.analiseRisco.parcelasSugeridas.map(parcela => (
                              <option key={parcela} value={parcela}>{parcela} meses</option>
                            ))}
                          </Form.Select>
                          <Form.Control.Feedback type="invalid">
                            {errors.parcelas}
                          </Form.Control.Feedback>
                        </Form.Group>

                        <Button 
                          variant="primary" 
                          type="submit" 
                          className="w-100"
                          disabled={simulando || !isValid}
                        >
                          {simulando ? (
                            <>
                              <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                                className="me-2"
                              />
                              Calculando...
                            </>
                          ) : (
                            'Simular Empréstimo'
                          )}
                        </Button>
                      </Form>
                    )}
                  </Formik>
                </div>
              ) : (
                <Alert variant="info">
                  Selecione um cliente para realizar a simulação de crédito.
                </Alert>
              )}

              {error && (
                <Alert variant="danger" className="mt-3">
                  {error}
                </Alert>
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col lg={6}>
          {resultado && (
            <Card className="simulacao-resultado mb-4">
              <Card.Header as="h5">
                <FaMoneyBillWave className="me-2" />
                Resultado da Simulação
              </Card.Header>
              <Card.Body>
                <div className="text-center mb-4">
                  <div className="h3 mb-0">Aprovação Preliminar</div>
                  <div className="mt-2">
                    <span className="badge bg-success fs-5">
                      {resultado.aprovacaoPreliminar}
                    </span>
                  </div>
                </div>

                <Row className="mb-4">
                  <Col sm={6} className="mb-3">
                    <Card className="h-100 border-0 shadow-sm">
                      <Card.Body className="text-center p-3">
                        <FaMoneyBillWave size={24} className="text-primary mb-2" />
                        <div className="text-muted small">Valor da Parcela</div>
                        <div className="fw-bold h4">
                          R$ {resultado.valorParcela.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col sm={6} className="mb-3">
                    <Card className="h-100 border-0 shadow-sm">
                      <Card.Body className="text-center p-3">
                        <FaPercentage size={24} className="text-primary mb-2" />
                        <div className="text-muted small">Taxa de Juros</div>
                        <div className="fw-bold h4">
                          {resultado.taxaJuros}% a.m.
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col sm={6} className="mb-3">
                    <Card className="h-100 border-0 shadow-sm">
                      <Card.Body className="text-center p-3">
                        <FaCalendarAlt size={24} className="text-primary mb-2" />
                        <div className="text-muted small">Prazo</div>
                        <div className="fw-bold h4">
                          {resultado.numeroParcelas} meses
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col sm={6} className="mb-3">
                    <Card className="h-100 border-0 shadow-sm">
                      <Card.Body className="text-center p-3">
                        <FaPercentage size={24} className="text-primary mb-2" />
                        <div className="text-muted small">CET a.a.</div>
                        <div className="fw-bold h4">
                          {resultado.cet}%
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>

                <Table striped className="mb-0">
                  <tbody>
                    <tr>
                      <td>Valor Solicitado</td>
                      <td className="text-end">R$ {resultado.valorSolicitado.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                    </tr>
                    <tr>
                      <td>IOF</td>
                      <td className="text-end">R$ {resultado.iof.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                    </tr>
                    <tr>
                      <td>Custo Efetivo</td>
                      <td className="text-end">R$ {resultado.custoEfetivo.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                    </tr>
                    <tr className="table-active">
                      <td className="fw-bold">Valor Total a Pagar</td>
                      <td className="text-end fw-bold">R$ {resultado.valorTotal.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                    </tr>
                  </tbody>
                </Table>

                <div className="mt-4 text-center">
                  <Button variant="success">Prosseguir com a Solicitação</Button>
                </div>
              </Card.Body>
            </Card>
          )}

          {!resultado && (
            <Card className="mb-4">
              <Card.Header as="h5">Informações sobre Crédito</Card.Header>
              <Card.Body>
                <h6>Parâmetros de Avaliação</h6>
                <ul>
                  <li>Score de crédito e histórico financeiro</li>
                  <li>Faturamento e saúde financeira da empresa</li>
                  <li>Tempo de atividade no mercado</li>
                  <li>Análise de indicadores setoriais</li>
                </ul>

                <h6 className="mt-4">Documentação Necessária</h6>
                <ul>
                  <li>CNPJ ativo e regular</li>
                  <li>Contrato social e alterações</li>
                  <li>Demonstrações financeiras dos últimos 2 anos</li>
                  <li>Declaração de faturamento</li>
                  <li>Extratos bancários dos últimos 3 meses</li>
                </ul>

                <h6 className="mt-4">Prazos e Condições</h6>
                <ul>
                  <li>Aprovação preliminar: imediata</li>
                  <li>Análise documental: até 3 dias úteis</li>
                  <li>Liberação de crédito: até 5 dias úteis após aprovação</li>
                  <li>Carência: possibilidade de até 3 meses</li>
                </ul>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default SimulacaoCredito;