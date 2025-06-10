import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-text">
          © {currentYear} TQI Invest. Todos os direitos reservados.
        </div>
        <ul className="footer-links">
          <li><a href="https://tqi.com.br" target="_blank" rel="noopener noreferrer">TQI.com.br</a></li>
          <li><a href="#">Termos de Uso</a></li>
          <li><a href="#">Privacidade</a></li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;