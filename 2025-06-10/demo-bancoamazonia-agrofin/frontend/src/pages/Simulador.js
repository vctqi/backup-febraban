import React from 'react';
import styled from 'styled-components';
import SimuladorForm from '../components/simulador/SimuladorForm';

const SimuladorPageContainer = styled.div`
  padding: 40px 20px;
  background-color: var(--background-color);
`;

const SimuladorHeader = styled.div`
  max-width: 800px;
  margin: 0 auto 40px;
  text-align: center;
`;

const SimuladorTitle = styled.h1`
  color: var(--primary-color);
  margin-bottom: 15px;
`;

const SimuladorDescription = styled.p`
  color: #666;
  max-width: 600px;
  margin: 0 auto;
`;

const SimuladorPage = () => {
  return (
    <SimuladorPageContainer>
      <SimuladorHeader>
        <SimuladorTitle>Simulador de Financiamento Agropecuário</SimuladorTitle>
        <SimuladorDescription>
          Simule as condições do seu financiamento e descubra a melhor opção para o seu projeto rural.
          Preencha os campos abaixo para começar.
        </SimuladorDescription>
      </SimuladorHeader>
      
      <SimuladorForm />
    </SimuladorPageContainer>
  );
};

export default SimuladorPage;