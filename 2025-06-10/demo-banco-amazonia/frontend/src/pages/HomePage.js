import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css';

function HomePage() {
  return (
    <div className="home-page">
      <section className="hero-section">
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="mb-4 mb-lg-0">
              <h1 className="hero-title">Financiamento Agropecuário para o seu crescimento</h1>
              <p className="hero-text">
                Investimos no futuro da agricultura na Amazônia com linhas de crédito 
                especializadas para atender às necessidades do produtor rural.
              </p>
              <div className="hero-buttons">
                <Link to="/simulador" className="btn btn-primary-custom me-3">
                  Simular Financiamento
                </Link>
                <Button variant="outline-success">Conhecer Linhas de Crédito</Button>
              </div>
            </Col>
            <Col lg={6}>
              <div className="hero-image-container">
                <img 
                  src="https://ruralcentro-production.s3.amazonaws.com/static/farm_shows/20191216100108279_edicao_agricultorbrasileiroentreoscampeoes_site.jpg" 
                  alt="Agricultura Sustentável"
                  className="hero-image"
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="benefits-section py-5">
        <Container>
          <h2 className="section-title text-center mb-5">Por que escolher o Banco da Amazônia?</h2>
          <Row>
            <Col md={4} className="mb-4">
              <Card className="benefit-card h-100">
                <Card.Body className="text-center p-4">
                  <div className="benefit-icon mb-3">
                    <i className="bi bi-graph-up-arrow"></i>
                  </div>
                  <Card.Title className="benefit-title">Taxas Competitivas</Card.Title>
                  <Card.Text>
                    Oferecemos as melhores taxas do mercado para financiamento rural, 
                    ajustadas ao seu perfil e necessidades.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            
            <Col md={4} className="mb-4">
              <Card className="benefit-card h-100">
                <Card.Body className="text-center p-4">
                  <div className="benefit-icon mb-3">
                    <i className="bi bi-calendar-check"></i>
                  </div>
                  <Card.Title className="benefit-title">Prazos Flexíveis</Card.Title>
                  <Card.Text>
                    Prazos estendidos que respeitam o ciclo produtivo da sua atividade 
                    rural e garantem tranquilidade no pagamento.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            
            <Col md={4} className="mb-4">
              <Card className="benefit-card h-100">
                <Card.Body className="text-center p-4">
                  <div className="benefit-icon mb-3">
                    <i className="bi bi-shield-check"></i>
                  </div>
                  <Card.Title className="benefit-title">Compromisso Sustentável</Card.Title>
                  <Card.Text>
                    Valorizamos práticas sustentáveis e oferecemos condições especiais 
                    para projetos que preservam a biodiversidade.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="features-section py-5 bg-light">
        <Container>
          <h2 className="section-title text-center mb-5">Soluções para seu Negócio Rural</h2>
          <Row className="feature-cards">
            <Col lg={3} md={6} className="mb-4">
              <Card className="feature-card h-100">
                <Card.Img variant="top" src="https://ruralminas.com.br/wp-content/uploads/2021/06/trator-960x640.jpg" />
                <Card.Body>
                  <Card.Title>Máquinas e Equipamentos</Card.Title>
                  <Card.Text>
                    Financiamento para compra de tratores, colheitadeiras e implementos agrícolas.
                  </Card.Text>
                  <Button variant="link" className="p-0">Saiba mais</Button>
                </Card.Body>
              </Card>
            </Col>
            
            <Col lg={3} md={6} className="mb-4">
              <Card className="feature-card h-100">
                <Card.Img variant="top" src="https://cdnm.westwing.com.br/glossary/uploads/br/2015/07/cultivos-hidroponicos-980x600.jpg" />
                <Card.Body>
                  <Card.Title>Sistemas de Irrigação</Card.Title>
                  <Card.Text>
                    Invista em sistemas modernos de irrigação para aumentar sua produtividade.
                  </Card.Text>
                  <Button variant="link" className="p-0">Saiba mais</Button>
                </Card.Body>
              </Card>
            </Col>
            
            <Col lg={3} md={6} className="mb-4">
              <Card className="feature-card h-100">
                <Card.Img variant="top" src="https://storage.googleapis.com/adm-portal.appspot.com/noticias/agronegocio/images/_5f07af0c41_medium_criadourodegadoemsucuriujruberlandiarodrigues.jpg" />
                <Card.Body>
                  <Card.Title>Pecuária</Card.Title>
                  <Card.Text>
                    Crédito para compra de animais, formação de pastagem e infraestrutura.
                  </Card.Text>
                  <Button variant="link" className="p-0">Saiba mais</Button>
                </Card.Body>
              </Card>
            </Col>
            
            <Col lg={3} md={6} className="mb-4">
              <Card className="feature-card h-100">
                <Card.Img variant="top" src="https://www.cpt.com.br/wp-content/uploads/2021/08/9fa315c3-artigo-energia-solar-1.jpg" />
                <Card.Body>
                  <Card.Title>Energia Renovável</Card.Title>
                  <Card.Text>
                    Financiamento para instalação de painéis solares e outras fontes renováveis.
                  </Card.Text>
                  <Button variant="link" className="p-0">Saiba mais</Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="cta-section py-5">
        <Container className="text-center">
          <h2 className="cta-title mb-4">Pronto para crescer de forma sustentável?</h2>
          <p className="cta-text mb-4">
            Faça uma simulação e descubra a linha de crédito que melhor se adapta ao seu projeto agropecuário.
          </p>
          <Link to="/simulador" className="btn btn-primary-custom btn-lg">
            Simular Agora
          </Link>
        </Container>
      </section>
    </div>
  );
}

export default HomePage;