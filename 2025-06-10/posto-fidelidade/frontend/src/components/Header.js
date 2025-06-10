import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';

const Header = () => {
  const location = useLocation();
  
  return (
    <Navbar bg="primary" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <span className="me-2">⛽</span>
          AutoPontos
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" active={location.pathname === '/'}>
              Dashboard
            </Nav.Link>
            <Nav.Link as={Link} to="/historico" active={location.pathname === '/historico'}>
              Histórico
            </Nav.Link>
            <Nav.Link as={Link} to="/acumular" active={location.pathname === '/acumular'}>
              Acumular
            </Nav.Link>
            <Nav.Link as={Link} to="/resgatar" active={location.pathname === '/resgatar'}>
              Resgatar
            </Nav.Link>
            <Nav.Link as={Link} to="/perfil" active={location.pathname === '/perfil'}>
              Meu Perfil
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;