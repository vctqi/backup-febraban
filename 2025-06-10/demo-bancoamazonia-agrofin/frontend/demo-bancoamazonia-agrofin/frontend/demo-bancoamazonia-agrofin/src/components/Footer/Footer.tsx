import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #00843D;
  color: white;
  padding: 2rem;
  margin-top: 2rem;
`;

const FooterContent = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const FooterSection = styled.div`
  h3 {
    margin-bottom: 1rem;
    font-size: 1.2rem;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    margin-bottom: 0.5rem;
  }

  a {
    color: white;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const BottomFooter = styled.div`
  margin-top: 2rem;
  text-align: center;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  padding-top: 1rem;
  font-size: 0.9rem;
`;

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <h3>Para você</h3>
          <ul>
            <li><a href="#">Conta Corrente</a></li>
            <li><a href="#">Poupança</a></li>
            <li><a href="#">Crédito</a></li>
            <li><a href="#">Cartões</a></li>
            <li><a href="#">Investimentos</a></li>
          </ul>
        </FooterSection>
        <FooterSection>
          <h3>Rural</h3>
          <ul>
            <li><a href="#">FNO Rural</a></li>
            <li><a href="#">PRONAF</a></li>
            <li><a href="#">PRONAMP</a></li>
            <li><a href="#">INOVAGRO</a></li>
            <li><a href="#">Amazônia Rural</a></li>
          </ul>
        </FooterSection>
        <FooterSection>
          <h3>Atendimento</h3>
          <ul>
            <li><a href="#">Agências</a></li>
            <li><a href="#">Ouvidoria</a></li>
            <li><a href="#">SAC - 0800 000 0000</a></li>
            <li><a href="#">Canais Digitais</a></li>
            <li><a href="#">Fale Conosco</a></li>
          </ul>
        </FooterSection>
        <FooterSection>
          <h3>O Banco</h3>
          <ul>
            <li><a href="#">Institucional</a></li>
            <li><a href="#">Sustentabilidade</a></li>
            <li><a href="#">Relatórios</a></li>
            <li><a href="#">Transparência</a></li>
            <li><a href="#">Governança</a></li>
          </ul>
        </FooterSection>
      </FooterContent>
      <BottomFooter>
        <p>© {new Date().getFullYear()} Banco da Amazônia. Todos os direitos reservados.</p>
      </BottomFooter>
    </FooterContainer>
  );
};

export default Footer;