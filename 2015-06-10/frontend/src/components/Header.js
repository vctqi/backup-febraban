import React from 'react';
import { Navbar, Container, Nav, Button, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';

const Header = () => {
  return (
    <Navbar bg="primary" variant="dark" expand="lg" fixed="top">
      <Container fluid>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <Image 
            src="/images/goiasfomento-logo-new.png" 
            alt="GoiasFomento Logo" 
            height="40" 
            className="d-inline-block align-top me-3"
          />
          <div>
            <strong>CreditoPro</strong> <span className="d-none d-sm-inline">| Agência de Fomento</span>
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
            <Nav.Link href="#" className="text-white d-flex align-items-center">
              <FaUserCircle className="me-1" size={20} />
              <span className="d-none d-md-inline">Administrador</span>
            </Nav.Link>
            <Button variant="outline-light" size="sm" className="ms-2">Sair</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;