import React from 'react';
import { Container } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-3">
      <Container className="text-center">
        <p className="mb-0">
          &copy; {new Date().getFullYear()} - Analisador de Risco de Cliente PJ via CNPJ
        </p>
        <small>Desenvolvido por AICUBE TECHNOLOGY</small>
      </Container>
    </footer>
  );
};

export default Footer;