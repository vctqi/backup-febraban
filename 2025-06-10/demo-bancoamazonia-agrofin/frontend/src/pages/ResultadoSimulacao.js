import React from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import ResultadoSimulacaoComponent from '../components/simulador/ResultadoSimulacao';

const ResultadoPageContainer = styled.div`
  padding: 40px 20px;
  background-color: var(--background-color);
`;

const ResultadoHeader = styled.div`
  max-width: 800px;
  margin: 0 auto 40px;
  text-align: center;
`;

const ResultadoTitle = styled.h1`
  color: var(--primary-color);
  margin-bottom: 15px;
`;

const ResultadoDescription = styled.p`
  color: #666;
  max-width: 600px;
  margin: 0 auto;
`;

const ResultadoSimulacaoPage = (props) => {
  const resultado = props.location.state?.resultado;
  
  // Se não houver resultado, redirecionar para a página do simulador
  if (!resultado) {
    return <Redirect to="/simulador" />;
  }
  
  return (
    <ResultadoPageContainer>
      <ResultadoHeader>
        <ResultadoTitle>Resultado da Simulação</ResultadoTitle>
        <ResultadoDescription>
          Confira as condições do seu financiamento agropecuário com base nas informações fornecidas.
        </ResultadoDescription>
      </ResultadoHeader>
      
      <ResultadoSimulacaoComponent resultado={resultado} />
    </ResultadoPageContainer>
  );
};

export default ResultadoSimulacaoPage;