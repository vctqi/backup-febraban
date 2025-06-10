import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import heroBg from '../assets/hero-bg';

const HomeContainer = styled.div`
  width: 100%;
`;

const HeroSection = styled.section`
  background-image: ${props => props.backgroundImage ? `url(${props.backgroundImage})` : 'linear-gradient(to right, #006B3F, #004D24)'};
  background-size: cover;
  background-position: center;
  color: white;
  padding: 80px 20px;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 77, 36, 0.7);
    z-index: 1;
  }
`;

const HeroContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
  
  h1 {
    font-size: 2.5rem;
    margin-bottom: 20px;
    max-width: 700px;
  }
  
  p {
    font-size: 1.2rem;
    margin-bottom: 30px;
    max-width: 600px;
  }
  
  @media (max-width: 768px) {
    h1 {
      font-size: 2rem;
    }
    
    p {
      font-size: 1rem;
    }
  }
`;

const HeroButton = styled(Link)`
  display: inline-block;
  background-color: var(--tertiary-color);
  color: var(--text-color);
  padding: 14px 30px;
  border-radius: 4px;
  font-weight: 600;
  font-size: 1.1rem;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #e3a718;
    transform: translateY(-2px);
  }
`;

const FeaturesSection = styled.section`
  padding: 80px 20px;
  background-color: white;
`;

const FeatureTitle = styled.h2`
  text-align: center;
  color: var(--primary-color);
  margin-bottom: 50px;
  font-size: 2rem;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: 968px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FeatureCard = styled.div`
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 30px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
  
  h3 {
    color: var(--primary-color);
    margin-bottom: 15px;
  }
  
  p {
    color: #666;
    margin-bottom: 20px;
  }
`;

const FeatureIcon = styled.div`
  width: 70px;
  height: 70px;
  background-color: rgba(0, 107, 63, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  
  svg {
    width: 30px;
    height: 30px;
    color: var(--primary-color);
  }
`;

const FeatureLink = styled(Link)`
  color: var(--primary-color);
  text-decoration: none;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  
  &:hover {
    text-decoration: underline;
  }
  
  svg {
    margin-left: 5px;
  }
`;

const CtaSection = styled.section`
  background-color: var(--primary-color);
  color: white;
  padding: 60px 20px;
  text-align: center;
`;

const CtaContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  
  h2 {
    font-size: 2rem;
    margin-bottom: 20px;
  }
  
  p {
    font-size: 1.1rem;
    margin-bottom: 30px;
  }
`;

const CtaButton = styled(Link)`
  display: inline-block;
  background-color: white;
  color: var(--primary-color);
  padding: 14px 30px;
  border-radius: 4px;
  font-weight: 600;
  font-size: 1.1rem;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #f0f0f0;
    transform: translateY(-2px);
  }
`;

const Home = () => {
  // Função para usar uma imagem de fallback se a importação falhar
  const getHeroBackground = () => {
    try {
      return heroBg;
    } catch (e) {
      return null;
    }
  };
  
  return (
    <HomeContainer>
      <HeroSection backgroundImage={getHeroBackground()}>
        <HeroContent>
          <h1>Financiamento Agropecuário do Banco da Amazônia</h1>
          <p>
            Soluções de crédito sustentáveis para impulsionar o desenvolvimento 
            do setor agropecuário na região amazônica.
          </p>
          <HeroButton to="/simulador">Simular Financiamento</HeroButton>
        </HeroContent>
      </HeroSection>
      
      <FeaturesSection>
        <FeatureTitle>Nossos Diferenciais</FeatureTitle>
        <FeaturesGrid>
          <FeatureCard>
            <FeatureIcon>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </FeatureIcon>
            <h3>Taxas Competitivas</h3>
            <p>
              Oferecemos taxas de juros diferenciadas conforme o perfil do cliente, 
              garantindo as melhores condições para o seu negócio rural.
            </p>
            <FeatureLink to="/simulador">
              Simular agora
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </FeatureLink>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureIcon>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </FeatureIcon>
            <h3>Prazos Flexíveis</h3>
            <p>
              Prazos adaptados à sua realidade, com períodos de carência que 
              respeitam o ciclo produtivo da sua atividade rural.
            </p>
            <FeatureLink to="/sobre">
              Saiba mais
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </FeatureLink>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureIcon>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </FeatureIcon>
            <h3>Sustentabilidade</h3>
            <p>
              Incentivamos práticas sustentáveis e projetos que promovam o 
              desenvolvimento socioeconômico regional da Amazônia.
            </p>
            <FeatureLink to="/sobre">
              Conheça nossas linhas
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </FeatureLink>
          </FeatureCard>
        </FeaturesGrid>
      </FeaturesSection>
      
      <CtaSection>
        <CtaContent>
          <h2>Pronto para investir no seu negócio rural?</h2>
          <p>
            Realize uma simulação agora mesmo e descubra as melhores condições 
            de financiamento para o seu projeto agropecuário.
          </p>
          <CtaButton to="/simulador">Simular Financiamento</CtaButton>
        </CtaContent>
      </CtaSection>
    </HomeContainer>
  );
};

export default Home;