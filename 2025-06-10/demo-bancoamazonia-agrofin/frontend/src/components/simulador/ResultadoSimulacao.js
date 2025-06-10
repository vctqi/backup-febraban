import React from 'react';
import styled from 'styled-components';
import { formatCurrency, formatPercent } from '../../utils/formatters';

const ResultadoContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 30px;
  max-width: 800px;
  margin: 0 auto;
`;

const ResultadoHeader = styled.div`
  text-align: center;
  margin-bottom: 30px;
  
  h2 {
    color: var(--primary-color);
    margin-bottom: 10px;
  }
  
  p {
    color: #666;
  }
`;

const ValorAprovadoContainer = styled.div`
  text-align: center;
  margin: 30px 0;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
`;

const ValorAprovado = styled.div`
  font-size: 32px;
  font-weight: 700;
  color: var(--primary-color);
  margin: 10px 0;
`;

const DetalhesContainer = styled.div`
  margin-top: 30px;
`;

const DetalhesTitulo = styled.h3`
  color: var(--primary-color);
  margin-bottom: 15px;
  font-weight: 600;
  border-bottom: 2px solid var(--primary-color);
  padding-bottom: 8px;
`;

const DetalheItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid #eee;
  
  &:last-child {
    border-bottom: none;
  }
`;

const DetalheLabel = styled.span`
  font-weight: 500;
`;

const DetalheValor = styled.span`
  font-weight: ${props => props.highlight ? '700' : '400'};
  color: ${props => props.highlight ? 'var(--primary-color)' : 'inherit'};
`;

const BotoesContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
  gap: 20px;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Botao = styled.button`
  padding: 12px 20px;
  border-radius: 4px;
  font-weight: 500;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  flex: 1;
  
  &.primario {
    background-color: var(--primary-color);
    color: white;
    border: none;
    
    &:hover {
      background-color: var(--secondary-color);
    }
  }
  
  &.secundario {
    background-color: transparent;
    color: var(--primary-color);
    border: 1px solid var(--primary-color);
    
    &:hover {
      background-color: rgba(0, 107, 63, 0.1);
    }
  }
`;

const MensagemDestaque = styled.div`
  background-color: rgba(0, 107, 63, 0.1);
  border-left: 4px solid var(--primary-color);
  padding: 15px;
  margin: 30px 0;
  border-radius: 0 4px 4px 0;
`;

const ClassificacaoRisco = styled.div`
  margin-top: 20px;
  text-align: center;
  
  .badge {
    display: inline-block;
    padding: 5px 10px;
    border-radius: 4px;
    font-weight: 600;
    font-size: 14px;
    color: white;
    background-color: ${props => {
      switch (props.risco) {
        case 'Baixo': return '#28a745';
        case 'Médio-Baixo': return '#5cb85c';
        case 'Médio': return '#ffc107';
        case 'Médio-Alto': return '#fd7e14';
        case 'Alto': return '#dc3545';
        default: return '#6c757d';
      }
    }};
  }
`;

const ResultadoSimulacao = ({ resultado }) => {
  if (!resultado) {
    return (
      <ResultadoContainer>
        <ResultadoHeader>
          <h2>Resultado não disponível</h2>
          <p>Não há dados de simulação para exibir.</p>
        </ResultadoHeader>
      </ResultadoContainer>
    );
  }
  
  const {
    valorFinanciamento,
    valorSolicitado,
    valorMaximo,
    taxaJuros,
    classificacaoRisco,
    prazoMeses,
    carenciaMeses,
    parcela,
    capacidadePagamento
  } = resultado;
  
  const valorTotal = parcela * (prazoMeses - carenciaMeses);
  const jurosTotal = valorTotal - valorFinanciamento;
  
  const handlePrint = () => {
    window.print();
  };
  
  const handleNovaSimulacao = () => {
    window.history.back();
  };
  
  return (
    <ResultadoContainer>
      <ResultadoHeader>
        <h2>Resultado da Simulação</h2>
        <p>Confira as condições do seu financiamento agropecuário</p>
      </ResultadoHeader>
      
      <ValorAprovadoContainer>
        <p>Valor aprovado para financiamento:</p>
        <ValorAprovado>{formatCurrency(valorFinanciamento)}</ValorAprovado>
        
        {valorSolicitado > valorMaximo && (
          <p>*O valor solicitado foi ajustado conforme sua capacidade de pagamento</p>
        )}
        
        <ClassificacaoRisco risco={classificacaoRisco}>
          <p>Classificação de risco: <span className="badge">{classificacaoRisco}</span></p>
        </ClassificacaoRisco>
      </ValorAprovadoContainer>
      
      <DetalhesContainer>
        <DetalhesTitulo>Condições do Financiamento</DetalhesTitulo>
        
        <DetalheItem>
          <DetalheLabel>Valor solicitado:</DetalheLabel>
          <DetalheValor>{formatCurrency(valorSolicitado)}</DetalheValor>
        </DetalheItem>
        
        <DetalheItem>
          <DetalheLabel>Valor aprovado:</DetalheLabel>
          <DetalheValor highlight>{formatCurrency(valorFinanciamento)}</DetalheValor>
        </DetalheItem>
        
        <DetalheItem>
          <DetalheLabel>Taxa de juros:</DetalheLabel>
          <DetalheValor highlight>{formatPercent(taxaJuros)}</DetalheValor>
        </DetalheItem>
        
        <DetalheItem>
          <DetalheLabel>Prazo total:</DetalheLabel>
          <DetalheValor>{prazoMeses} meses</DetalheValor>
        </DetalheItem>
        
        <DetalheItem>
          <DetalheLabel>Período de carência:</DetalheLabel>
          <DetalheValor>{carenciaMeses} meses</DetalheValor>
        </DetalheItem>
        
        <DetalheItem>
          <DetalheLabel>Valor da parcela:</DetalheLabel>
          <DetalheValor highlight>{formatCurrency(parcela)}</DetalheValor>
        </DetalheItem>
        
        <DetalheItem>
          <DetalheLabel>Total de juros:</DetalheLabel>
          <DetalheValor>{formatCurrency(jurosTotal)}</DetalheValor>
        </DetalheItem>
        
        <DetalheItem>
          <DetalheLabel>Valor total a pagar:</DetalheLabel>
          <DetalheValor highlight>{formatCurrency(valorTotal)}</DetalheValor>
        </DetalheItem>
        
        <DetalheItem>
          <DetalheLabel>Capacidade de pagamento mensal:</DetalheLabel>
          <DetalheValor>{formatCurrency(capacidadePagamento)}</DetalheValor>
        </DetalheItem>
      </DetalhesContainer>
      
      <MensagemDestaque>
        <p>
          <strong>Dica:</strong> Com base no seu perfil, você obteve uma classificação de risco <strong>{classificacaoRisco}</strong>.
          {classificacaoRisco !== 'Baixo' && 
            ' Para melhorar suas condições, considere aumentar sua renda comprovada ou adicionar garantias ao financiamento.'}
        </p>
      </MensagemDestaque>
      
      <BotoesContainer>
        <Botao className="secundario" onClick={handleNovaSimulacao}>
          Nova Simulação
        </Botao>
        <Botao className="primario" onClick={handlePrint}>
          Imprimir Simulação
        </Botao>
      </BotoesContainer>
    </ResultadoContainer>
  );
};

export default ResultadoSimulacao;