import React, { useState } from 'react';
import { Card, Form, Button, Row, Col, Alert, Spinner } from 'react-bootstrap';
import { acumularPontos } from '../api';

const Acumular = () => {
  const [formData, setFormData] = useState({
    valor: '',
    combustivel: 'Gasolina Comum',
    posto: 'Posto Avenida Central'
  });
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [resultado, setResultado] = useState(null);
  
  const combustiveis = [
    'Gasolina Comum',
    'Gasolina Aditivada',
    'Gasolina Premium',
    'Etanol',
    'Diesel S500',
    'Diesel S10'
  ];
  
  const postos = [
    'Posto Avenida Central',
    'Posto Rodovia Sul',
    'Posto Beira Mar'
  ];
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    setResultado(null);
    
    try {
      // Conversão de valor para número
      const dados = {
        ...formData,
        valor: parseFloat(formData.valor)
      };
      
      // Validações
      if (isNaN(dados.valor) || dados.valor <= 0) {
        throw new Error('Por favor, insira um valor válido para o abastecimento');
      }
      
      const response = await acumularPontos(dados);
      setSuccess('Pontos acumulados com sucesso!');
      setResultado(response.transacao);
      
      // Resetar formulário
      setFormData({
        valor: '',
        combustivel: 'Gasolina Comum',
        posto: 'Posto Avenida Central'
      });
    } catch (err) {
      setError(err.message || 'Ocorreu um erro ao acumular pontos. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div>
      <h2 className="mb-4">Acumular Pontos</h2>
      
      <Row>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Registrar Abastecimento</Card.Title>
              <Card.Text>
                Preencha os dados do abastecimento para acumular pontos e cashback.
              </Card.Text>
              
              {error && <Alert variant="danger">{error}</Alert>}
              {success && <Alert variant="success">{success}</Alert>}
              
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Valor do Abastecimento (R$)</Form.Label>
                  <Form.Control
                    type="number"
                    step="0.01"
                    min="1"
                    name="valor"
                    value={formData.valor}
                    onChange={handleChange}
                    placeholder="0,00"
                    required
                  />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Tipo de Combustível</Form.Label>
                  <Form.Select
                    name="combustivel"
                    value={formData.combustivel}
                    onChange={handleChange}
                    required
                  >
                    {combustiveis.map((combustivel) => (
                      <option key={combustivel} value={combustivel}>
                        {combustivel}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Posto</Form.Label>
                  <Form.Select
                    name="posto"
                    value={formData.posto}
                    onChange={handleChange}
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
                    'Acumular Pontos'
                  )}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Como Funciona</Card.Title>
              <div className="mb-4">
                <h5>Regras de Acúmulo</h5>
                <ul>
                  <li>A cada R$ 1,00 em abastecimento = 5 pontos</li>
                  <li>1% do valor gasto é convertido em cashback</li>
                  <li>Pontos são válidos por 12 meses</li>
                  <li>Cashback válido por 6 meses</li>
                </ul>
              </div>
              
              {resultado && (
                <div className="border p-3 rounded bg-light">
                  <h5>Resultado do Acúmulo</h5>
                  <p><strong>Data:</strong> {new Date(resultado.data).toLocaleDateString('pt-BR')}</p>
                  <p><strong>Valor:</strong> R$ {resultado.valor.toFixed(2).replace('.', ',')}</p>
                  <p><strong>Pontos acumulados:</strong> {resultado.pontos}</p>
                  <p><strong>Cashback acumulado:</strong> R$ {resultado.cashback.toFixed(2).replace('.', ',')}</p>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Acumular;