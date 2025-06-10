import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { getOpcoesFinanciamento, simularFinanciamento } from '../../services/financiamentoService';
import { formatCurrency } from '../../utils/formatters';

const SimuladorContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 30px;
  max-width: 800px;
  margin: 0 auto;
`;

const SimuladorTitle = styled.h2`
  color: var(--primary-color);
  margin-bottom: 20px;
  text-align: center;
`;

const SimuladorDescription = styled.p`
  margin-bottom: 30px;
  text-align: center;
  color: #666;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: var(--text-color);
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid var(--gray-color);
  border-radius: 4px;
  font-size: 16px;
  transition: border-color 0.3s ease;
  
  &:focus {
    border-color: var(--primary-color);
    outline: none;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 12px;
  border: 1px solid var(--gray-color);
  border-radius: 4px;
  font-size: 16px;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23333' d='M10.3 3.3L6 7.6 1.7 3.3c-.4-.4-1-.4-1.4 0s-.4 1 0 1.4l5 5c.4.4 1 .4 1.4 0l5-5c.4-.4.4-1 0-1.4s-1-.4-1.4 0z'/%3E%3C/svg%3E");
  background-position: right 12px center;
  background-repeat: no-repeat;
  cursor: pointer;
  
  &:focus {
    border-color: var(--primary-color);
    outline: none;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
`;

const SubmitButton = styled.button`
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 4px;
  padding: 12px 30px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: var(--secondary-color);
  }
  
  &:disabled {
    background-color: var(--gray-color);
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  color: var(--error-color);
  font-size: 14px;
  margin-top: 5px;
`;

const Row = styled.div`
  display: flex;
  gap: 20px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0;
  }
`;

const Column = styled.div`
  flex: 1;
`;

const SimuladorForm = ({ history }) => {
  const [opcoes, setOpcoes] = useState({
    tiposFinanciamento: [],
    faixasRenda: []
  });
  
  const [formData, setFormData] = useState({
    valorSolicitado: '',
    rendaMensal: '',
    tipoFinanciamento: '',
    subTipo: '',
    carencia: '0'
  });
  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showSubtipos, setShowSubtipos] = useState(false);
  
  // Carregar opções de financiamento ao montar o componente
  useEffect(() => {
    const fetchOpcoes = async () => {
      try {
        const data = await getOpcoesFinanciamento();
        setOpcoes(data);
      } catch (error) {
        console.error('Erro ao carregar opções de financiamento:', error);
      }
    };
    
    fetchOpcoes();
  }, []);
  
  // Verificar se o tipo de financiamento selecionado tem subtipos
  useEffect(() => {
    if (formData.tipoFinanciamento) {
      const tipoSelecionado = opcoes.tiposFinanciamento.find(
        tipo => tipo.id === formData.tipoFinanciamento
      );
      
      setShowSubtipos(tipoSelecionado && tipoSelecionado.subtipos);
      
      // Limpar subtipo se o tipo não tem subtipos
      if (!tipoSelecionado || !tipoSelecionado.subtipos) {
        setFormData(prev => ({ ...prev, subTipo: '' }));
      }
    } else {
      setShowSubtipos(false);
      setFormData(prev => ({ ...prev, subTipo: '' }));
    }
  }, [formData.tipoFinanciamento, opcoes.tiposFinanciamento]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Remover erro do campo que está sendo alterado
    setErrors(prev => ({ ...prev, [name]: '' }));
    
    // Atualizar estado do formulário
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.valorSolicitado || parseFloat(formData.valorSolicitado) <= 0) {
      newErrors.valorSolicitado = 'Informe um valor válido';
    }
    
    if (!formData.rendaMensal || parseFloat(formData.rendaMensal) <= 0) {
      newErrors.rendaMensal = 'Informe a renda mensal';
    }
    
    if (!formData.tipoFinanciamento) {
      newErrors.tipoFinanciamento = 'Selecione o tipo de financiamento';
    }
    
    if (showSubtipos && !formData.subTipo) {
      newErrors.subTipo = 'Selecione o subtipo de financiamento';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      // Converter valores para número
      const dadosSimulacao = {
        ...formData,
        valorSolicitado: parseFloat(formData.valorSolicitado.replace(/[^\d,.-]/g, '').replace(',', '.')),
        rendaMensal: parseFloat(formData.rendaMensal.replace(/[^\d,.-]/g, '').replace(',', '.')),
        carencia: parseInt(formData.carencia, 10)
      };
      
      const resultado = await simularFinanciamento(dadosSimulacao);
      
      // Navegar para a página de resultado com os dados da simulação
      history.push('/resultado-simulacao', { resultado });
    } catch (error) {
      console.error('Erro ao simular financiamento:', error);
      setErrors({ submit: 'Erro ao processar a simulação. Tente novamente.' });
    } finally {
      setLoading(false);
    }
  };
  
  // Função para formatar valores monetários no input
  const handleCurrencyInput = (e) => {
    const { name, value } = e.target;
    
    // Permitir apenas números e alguns caracteres especiais durante a digitação
    const numericValue = value.replace(/[^\d,.-]/g, '');
    
    if (numericValue) {
      // Converter para número e formatar como moeda
      const numberValue = parseFloat(numericValue.replace(',', '.'));
      if (!isNaN(numberValue)) {
        setFormData(prev => ({ 
          ...prev, 
          [name]: formatCurrency(numberValue)
        }));
      } else {
        setFormData(prev => ({ ...prev, [name]: value }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  return (
    <SimuladorContainer>
      <SimuladorTitle>Simulador de Financiamento Agropecuário</SimuladorTitle>
      <SimuladorDescription>
        Simule seu financiamento e descubra as melhores condições para o seu projeto
      </SimuladorDescription>
      
      <form onSubmit={handleSubmit}>
        <Row>
          <Column>
            <FormGroup>
              <Label htmlFor="valorSolicitado">Valor do Financiamento:</Label>
              <Input 
                type="text" 
                id="valorSolicitado" 
                name="valorSolicitado" 
                value={formData.valorSolicitado} 
                onChange={handleChange}
                onBlur={handleCurrencyInput}
                placeholder="R$ 0,00" 
              />
              {errors.valorSolicitado && (
                <ErrorMessage>{errors.valorSolicitado}</ErrorMessage>
              )}
            </FormGroup>
          </Column>
          
          <Column>
            <FormGroup>
              <Label htmlFor="rendaMensal">Renda Mensal:</Label>
              <Input 
                type="text" 
                id="rendaMensal" 
                name="rendaMensal" 
                value={formData.rendaMensal} 
                onChange={handleChange}
                onBlur={handleCurrencyInput}
                placeholder="R$ 0,00" 
              />
              {errors.rendaMensal && (
                <ErrorMessage>{errors.rendaMensal}</ErrorMessage>
              )}
            </FormGroup>
          </Column>
        </Row>
        
        <FormGroup>
          <Label htmlFor="tipoFinanciamento">Tipo de Financiamento:</Label>
          <Select 
            id="tipoFinanciamento" 
            name="tipoFinanciamento" 
            value={formData.tipoFinanciamento} 
            onChange={handleChange}
          >
            <option value="">Selecione...</option>
            {opcoes.tiposFinanciamento.map(tipo => (
              <option key={tipo.id} value={tipo.id}>{tipo.nome}</option>
            ))}
          </Select>
          {errors.tipoFinanciamento && (
            <ErrorMessage>{errors.tipoFinanciamento}</ErrorMessage>
          )}
        </FormGroup>
        
        {showSubtipos && (
          <FormGroup>
            <Label htmlFor="subTipo">Finalidade:</Label>
            <Select 
              id="subTipo" 
              name="subTipo" 
              value={formData.subTipo} 
              onChange={handleChange}
            >
              <option value="">Selecione...</option>
              {opcoes.tiposFinanciamento
                .find(tipo => tipo.id === formData.tipoFinanciamento)
                ?.subtipos.map(subtipo => (
                  <option key={subtipo.id} value={subtipo.id}>{subtipo.nome}</option>
                ))}
            </Select>
            {errors.subTipo && (
              <ErrorMessage>{errors.subTipo}</ErrorMessage>
            )}
          </FormGroup>
        )}
        
        <FormGroup>
          <Label htmlFor="carencia">Carência (em meses):</Label>
          <Select 
            id="carencia" 
            name="carencia" 
            value={formData.carencia} 
            onChange={handleChange}
          >
            <option value="0">Sem carência</option>
            <option value="3">3 meses</option>
            <option value="6">6 meses</option>
            <option value="12">12 meses</option>
            <option value="18">18 meses</option>
            <option value="24">24 meses</option>
          </Select>
        </FormGroup>
        
        {errors.submit && (
          <ErrorMessage style={{ textAlign: 'center', marginBottom: '20px' }}>
            {errors.submit}
          </ErrorMessage>
        )}
        
        <ButtonContainer>
          <SubmitButton type="submit" disabled={loading}>
            {loading ? 'Processando...' : 'Simular Financiamento'}
          </SubmitButton>
        </ButtonContainer>
      </form>
    </SimuladorContainer>
  );
};

export default withRouter(SimuladorForm);