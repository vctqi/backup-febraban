import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../styles/Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-main">
        <Container>
          <Row>
            <Col md={4} className="mb-4 mb-md-0">
              <h5 className="footer-title">Banco da Amazônia</h5>
              <p className="footer-text">
                Desenvolvendo a Amazônia de forma sustentável desde 1942, 
                promovendo crescimento econômico e preservação ambiental.
              </p>
              <div className="social-links mt-3">
                <a href="#" className="social-link">
                  <i className="bi bi-facebook"></i>
                </a>
                <a href="#" className="social-link">
                  <i className="bi bi-twitter"></i>
                </a>
                <a href="#" className="social-link">
                  <i className="bi bi-instagram"></i>
                </a>
                <a href="#" className="social-link">
                  <i className="bi bi-youtube"></i>
                </a>
                <a href="#" className="social-link">
                  <i className="bi bi-linkedin"></i>
                </a>
              </div>
            </Col>
            
            <Col md={2} sm={6} className="mb-4 mb-md-0">
              <h6 className="footer-subtitle">Financiamentos</h6>
              <ul className="footer-links">
                <li><a href="#">Agronegócio</a></li>
                <li><a href="#">Agricultura Familiar</a></li>
                <li><a href="#">Sustentabilidade</a></li>
                <li><a href="#">Linha de Crédito</a></li>
                <li><a href="#">FNO</a></li>
              </ul>
            </Col>
            
            <Col md={2} sm={6} className="mb-4 mb-md-0">
              <h6 className="footer-subtitle">Para Você</h6>
              <ul className="footer-links">
                <li><a href="#">Conta Corrente</a></li>
                <li><a href="#">Cartões</a></li>
                <li><a href="#">Investimentos</a></li>
                <li><a href="#">Empréstimos</a></li>
                <li><a href="#">Seguros</a></li>
              </ul>
            </Col>
            
            <Col md={2} sm={6} className="mb-4 mb-md-0">
              <h6 className="footer-subtitle">Empresas</h6>
              <ul className="footer-links">
                <li><a href="#">Conta PJ</a></li>
                <li><a href="#">Crédito Empresarial</a></li>
                <li><a href="#">Comércio Exterior</a></li>
                <li><a href="#">Consórcios</a></li>
                <li><a href="#">Cobrança</a></li>
              </ul>
            </Col>
            
            <Col md={2} sm={6} className="mb-4 mb-md-0">
              <h6 className="footer-subtitle">Acesso Rápido</h6>
              <ul className="footer-links">
                <li><a href="#">Internet Banking</a></li>
                <li><a href="#">Agências</a></li>
                <li><a href="#">Ouvidoria</a></li>
                <li><a href="#">Telefones</a></li>
                <li><a href="#">Trabalhe Conosco</a></li>
              </ul>
            </Col>
          </Row>
        </Container>
      </div>
      
      <div className="footer-bottom">
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <p className="mb-0">&copy; {new Date().getFullYear()} Banco da Amazônia. Todos os direitos reservados.</p>
            </Col>
            <Col md={6} className="text-md-end mt-3 mt-md-0">
              <ul className="footer-bottom-links">
                <li><a href="#">Política de Privacidade</a></li>
                <li><a href="#">Termos de Uso</a></li>
                <li><a href="#">Acessibilidade</a></li>
              </ul>
            </Col>
          </Row>
        </Container>
      </div>
      
      <div className="disclaimer">
        <Container>
          <p className="text-center mb-0">
            <small>
              Atenção: Este é um simulador para fins educacionais. 
              Não representa o site oficial do Banco da Amazônia.
            </small>
          </p>
        </Container>
      </div>
    </footer>
  );
}

export default Footer;