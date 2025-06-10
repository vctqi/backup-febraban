import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const SobreContainer = styled.div`
  padding: 40px 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const SobreHeader = styled.div`
  text-align: center;
  margin-bottom: 40px;
`;

const SobreTitle = styled.h1`
  color: var(--primary-color);
  margin-bottom: 15px;
`;

const SobreDescription = styled.p`
  color: #666;
  max-width: 800px;
  margin: 0 auto;
`;

const SobreContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ContentSection = styled.section`
  margin-bottom: 30px;
  
  h2 {
    color: var(--primary-color);
    margin-bottom: 15px;
    font-size: 1.5rem;
    border-bottom: 2px solid var(--primary-color);
    padding-bottom: 8px;
  }
  
  p {
    margin-bottom: 15px;
    line-height: 1.6;
  }
  
  ul {
    margin-bottom: 15px;
    padding-left: 20px;
    
    li {
      margin-bottom: 10px;
    }
  }
`;

const InfoCard = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 25px;
  margin-bottom: 30px;
  
  h3 {
    color: var(--primary-color);
    margin-bottom: 15px;
    font-size: 1.2rem;
  }
  
  p {
    margin-bottom: 15px;
  }
`;

const CtaButton = styled(Link)`
  display: inline-block;
  background-color: var(--primary-color);
  color: white;
  padding: 12px 24px;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 500;
  margin-top: 20px;
  
  &:hover {
    background-color: var(--secondary-color);
  }
`;

const SobreFinanciamento = () => {
  return (
    <SobreContainer>
      <SobreHeader>
        <SobreTitle>Sobre o Financiamento Agropecuário</SobreTitle>
        <SobreDescription>
          Conheça as linhas de financiamento do Banco da Amazônia para o setor agropecuário
          e descubra como podemos impulsionar o seu negócio.
        </SobreDescription>
      </SobreHeader>
      
      <SobreContent>
        <div>
          <ContentSection>
            <h2>FNO - Amazônia Rural</h2>
            <p>
              Através dos financiamentos do Fundo Constitucional de Financiamento do Norte - FNO, 
              incentivamos práticas sustentáveis e o desenvolvimento socioeconômico regional.
            </p>
            <p>
              Com o Amazônia Rural apoiamos diferentes empreendimentos de diferentes portes e 
              segmentos. Conheça nossa linha de crédito e venha ser nosso parceiro.
            </p>
            
            <h3>Objetivos do programa:</h3>
            <ul>
              <li>Apoiar as atividades do segmento agropastoril regional</li>
              <li>Promover o desenvolvimento da aquicultura na região norte através do fortalecimento dos empreendimentos aquícolas</li>
              <li>Incentivar a implantação, ampliação, reforma, e relocalização de empreendimentos rurais</li>
              <li>Incentivar a implantação de empreendimentos rurais, com foco na geração de empregos e renda</li>
              <li>Modernização da atividade de pesca na Região Norte</li>
              <li>Desenvolvimento da agropecuária irrigada</li>
            </ul>
          </ContentSection>
          
          <InfoCard>
            <h3>Taxas diferenciadas</h3>
            <p>
              Nossas taxas de juros são diferenciadas por setor, porte e finalidade, 
              adaptadas à sua realidade e capacidade de pagamento.
            </p>
            <p>
              Cada negócio é único, e suas necessidades também. Por que aceitar taxas padronizadas? 
              Se está pensando em crédito sustentável para o seu negócio, entre em contato com o BASA!
            </p>
          </InfoCard>
        </div>
        
        <div>
          <ContentSection>
            <h2>Prazos e Carências</h2>
            <p>
              Os prazos de financiamento serão dimensionados de acordo com a capacidade de pagamento 
              do empreendimento do beneficiário.
            </p>
            
            <h3>Para investimento fixo ou misto:</h3>
            <p>
              (custeio associado a investimento fixo ou custeio associado a investimento fixo e semifixo): 
              até 12 (doze) anos, incluída a carência de até 6 (seis) anos, podendo ser elevado a até 15 (quinze) 
              anos no caso de financiamentos voltado para estrutura de armazenamento.
            </p>
            
            <h3>Para investimento semifixo ou misto:</h3>
            <p>
              (custeio associado a investimento semifixo): até 10 (dez) anos, incluída a carência de até 6 (seis) anos.
            </p>
            
            <h3>Para custeio agrícola e/ou comercialização não associado a investimento:</h3>
            <p>
              Até 2 (dois) anos.
            </p>
            
            <h3>Para custeio pecuário não associado a investimento:</h3>
            <ul>
              <li>Aquicultura: até 24 (vinte e quatro) meses</li>
              <li>Recria e engorda: até 24 (vinte e quatro) meses</li>
              <li>Retenção de cria: até 18 (dezoito) meses</li>
              <li>Retenção de cria e engorda: até 24 (vinte e quatro) meses</li>
              <li>Engorda: até 12 (doze) meses</li>
            </ul>
          </ContentSection>
          
          <InfoCard>
            <h3>Limite do empréstimo</h3>
            <p>
              Será definido de acordo com a capacidade de pagamento do negócio/cliente, 
              conforme apurado na análise técnica.
            </p>
            <p>
              Para simular o valor que você pode obter com base na sua renda, utilize 
              nosso simulador de financiamento agropecuário.
            </p>
            <CtaButton to="/simulador">Simular Agora</CtaButton>
          </InfoCard>
        </div>
      </SobreContent>
    </SobreContainer>
  );
};

export default SobreFinanciamento;