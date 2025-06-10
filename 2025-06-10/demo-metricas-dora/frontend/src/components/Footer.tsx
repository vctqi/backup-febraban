import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <span className="footer-logo-text">TQI</span>
        </div>
        <div className="footer-content">
          <p>
            &copy; {currentYear} TQI - Tecnologia, Qualidade e Inovação. Todos os direitos reservados.
          </p>
          <p className="footer-desc">
            Dashboard de métricas DORA para acompanhamento de performance de times de TI.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;