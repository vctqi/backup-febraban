import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: var(--primary-color);
  color: white;
  padding: 40px 0 20px;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const FooterSection = styled.div`
  h3 {
    font-size: 18px;
    margin-bottom: 15px;
    font-weight: 600;
  }
  
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  li {
    margin-bottom: 10px;
  }
  
  a {
    color: white;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const Copyright = styled.div`
  text-align: center;
  padding-top: 20px;
  margin-top: 30px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 14px;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <h3>CONTATO</h3>
          <ul>
            <li>Av. Presidente Vargas, 800</li>
            <li>Telefone (Geral): 4008-3888</li>
            <li>Ouvidoria: 0800 722 21 71</li>
            <li>imprensa@basa.com.br</li>
          </ul>
        </FooterSection>
        
        <FooterSection>
          <h3>FINANCIAMENTOS</h3>
          <ul>
            <li><Link to="/simulador">Simulador</Link></li>
            <li><a href="#">FNO - Amazônia Rural</a></li>
            <li><a href="#">FNO - Amazônia Empresarial</a></li>
            <li><a href="#">Microcrédito</a></li>
          </ul>
        </FooterSection>
        
        <FooterSection>
          <h3>SOBRE NÓS</h3>
          <ul>
            <li><a href="#">Quem Somos</a></li>
            <li><a href="#">Governança</a></li>
            <li><a href="#">Sustentabilidade</a></li>
            <li><a href="#">Trabalhe Conosco</a></li>
          </ul>
        </FooterSection>
        
        <FooterSection>
          <h3>ATENDIMENTO</h3>
          <ul>
            <li><a href="#">Encontre uma Agência</a></li>
            <li><a href="#">SAC - 0800 723 5000</a></li>
            <li><a href="#">Deficiente Auditivo - 0800 723 5007</a></li>
            <li><a href="#">Ouvidoria - 0800 725 7474</a></li>
          </ul>
        </FooterSection>
      </FooterContent>
      
      <Copyright>
        © {new Date().getFullYear()} Banco da Amazônia - Todos os direitos reservados
      </Copyright>
    </FooterContainer>
  );
};

export default Footer;