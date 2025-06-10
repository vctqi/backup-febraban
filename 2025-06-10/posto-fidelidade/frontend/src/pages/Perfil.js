import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Form, Button, Spinner, Alert } from 'react-bootstrap';
import { getCliente } from '../api';

const Perfil = () => {
  const [cliente, setCliente] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    notificacoes: true,
    ofertas: true
  });

  useEffect(() => {
    const fetchCliente = async () => {
      try {
        const data = await getCliente();
        setCliente(data);
        setFormData({
          nome: data.nome,
          email: data.email,
          telefone: data.telefone,
          notificacoes: true,
          ofertas: true
        });
      } catch (error) {
        console.error('Erro ao buscar dados do cliente:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCliente();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Simulação de atualização de perfil
    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
      
      // Limpar mensagem de sucesso após 3 segundos
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    }, 1000);
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Carregando dados do perfil...</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-4">Meu Perfil</h2>
      
      <Row>
        <Col lg={8}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Informações Pessoais</Card.Title>
              
              {success && (
                <Alert variant="success">
                  Perfil atualizado com sucesso!
                </Alert>
              )}
              
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Nome Completo</Form.Label>
                      <Form.Control
                        type="text"
                        name="nome"
                        value={formData.nome}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>CPF</Form.Label>
                      <Form.Control
                        type="text"
                        value={cliente.cpf}
                        readOnly
                        disabled
                      />
                      <Form.Text className="text-muted">
                        O CPF não pode ser alterado.
                      </Form.Text>
                    </Form.Group>
                  </Col>
                </Row>
                
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>E-mail</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Telefone</Form.Label>
                      <Form.Control
                        type="text"
                        name="telefone"
                        value={formData.telefone}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
                
                <Form.Group className="mb-3">
                  <Form.Label>Data de Registro</Form.Label>
                  <Form.Control
                    type="text"
                    value={new Date(cliente.dataRegistro).toLocaleDateString('pt-BR')}
                    readOnly
                    disabled
                  />
                </Form.Group>
                
                <h5 className="mt-4 mb-3">Preferências de Comunicação</h5>
                
                <Form.Group className="mb-3">
                  <Form.Check
                    type="checkbox"
                    id="notificacoes"
                    name="notificacoes"
                    label="Receber notificações sobre novos pontos e cashback"
                    checked={formData.notificacoes}
                    onChange={handleChange}
                  />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Check
                    type="checkbox"
                    id="ofertas"
                    name="ofertas"
                    label="Receber ofertas e promoções exclusivas"
                    checked={formData.ofertas}
                    onChange={handleChange}
                  />
                </Form.Group>
                
                <Button 
                  variant="primary" 
                  type="submit"
                  disabled={submitting}
                >
                  {submitting ? (
                    <>
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        className="me-2"
                      />
                      Salvando...
                    </>
                  ) : (
                    'Salvar Alterações'
                  )}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        
        <Col lg={4}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Resumo da Conta</Card.Title>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <strong>Cliente desde:</strong> {new Date(cliente.dataRegistro).toLocaleDateString('pt-BR')}
                </li>
                <li className="mb-2">
                  <strong>Pontos acumulados:</strong> {cliente.pontos}
                </li>
                <li className="mb-2">
                  <strong>Cashback disponível:</strong> R$ {cliente.cashback.toFixed(2).replace('.', ',')}
                </li>
              </ul>
            </Card.Body>
          </Card>
          
          <Card>
            <Card.Body>
              <Card.Title>Ações da Conta</Card.Title>
              <div className="d-grid gap-2">
                <Button variant="outline-primary">Alterar Senha</Button>
                <Button variant="outline-secondary">Baixar Extrato</Button>
                <Button variant="outline-danger">Encerrar Programa</Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Perfil;