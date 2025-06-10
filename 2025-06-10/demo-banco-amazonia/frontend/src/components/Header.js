import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import logoAmazonia from '../assets/logo-banco-amazonia.png';
import '../styles/Header.css';

function Header() {
  const location = useLocation();

  return (
    <header className="header">
      <div className="gov-bar">
        <Container>
          <div className="gov-bar-content">
            <span>GOVERNO FEDERAL</span>
          </div>
        </Container>
      </div>
      
      <Navbar bg="light" expand="lg" className="py-0">
        <Container>
          <Navbar.Brand as={Link} to="/" className="py-2">
            <img 
              src={logoAmazonia} 
              alt="Banco da Amazônia" 
              className="logo"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/180x50?text=Banco+da+Amazonia';
              }}
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link 
                as={Link} 
                to="/" 
                className={location.pathname === '/' ? 'active' : ''}
              >
                Início
              </Nav.Link>
              <Nav.Link 
                as={Link} 
                to="/simulador" 
                className={location.pathname === '/simulador' ? 'active' : ''}
              >
                Simulador
              </Nav.Link>
              <Nav.Link 
                href="https://www.gov.br/bancoamazonia/pt-br" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Site Oficial
              </Nav.Link>
            </Nav>
            <div className="header-buttons ms-3">
              <button className="btn btn-outline-success btn-sm me-2">
                <i className="bi bi-person"></i> Acesso Cliente
              </button>
              <button className="btn btn-success btn-sm">
                <i className="bi bi-headset"></i> Ajuda
              </button>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      
      <div className="menu-bar">
        <Container>
          <nav className="submenu">
            <ul className="submenu-list">
              <li className={location.pathname === '/simulador' ? 'active' : ''}>
                <Link to="/simulador">Financiamento Agropecuário</Link>
              </li>
              <li><Link to="#">Linhas de Crédito</Link></li>
              <li><Link to="#">Agricultura Familiar</Link></li>
              <li><Link to="#">Acompanhamento</Link></li>
              <li><Link to="#">Sustentabilidade</Link></li>
            </ul>
          </nav>
        </Container>
      </div>
    </header>
  );
}

export default Header;