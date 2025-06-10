import React, { useState } from 'react';
import styled from 'styled-components';

const ContatoContainer = styled.div`
  padding: 40px 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const ContatoHeader = styled.div`
  text-align: center;
  margin-bottom: 40px;
`;

const ContatoTitle = styled.h1`
  color: var(--primary-color);
  margin-bottom: 15px;
`;

const ContatoDescription = styled.p`
  color: #666;
  max-width: 800px;
  margin: 0 auto;
`;

const ContatoContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ContatoForm = styled.form`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 30px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: var(--text-color);
`;

const FormInput = styled.input`
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

const FormTextarea = styled.textarea`
  width: 100%;
  padding: 12px;
  border: 1px solid var(--gray-color);
  border-radius: 4px;
  font-size: 16px;
  min-height: 150px;
  resize: vertical;
  transition: border-color 0.3s ease;
  
  &:focus {
    border-color: var(--primary-color);
    outline: none;
  }
`;

const FormSelect = styled.select`
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

const SubmitButton = styled.button`
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 4px;
  padding: 12px 24px;
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

const ContactInfo = styled.div`
  h2 {
    color: var(--primary-color);
    margin-bottom: 20px;
    font-size: 1.5rem;
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
`;

const ContactItem = styled.div`
  margin-bottom: 15px;
  display: flex;
  align-items: flex-start;
  
  svg {
    margin-right: 10px;
    min-width: 20px;
    color: var(--primary-color);
  }
  
  p {
    margin: 0;
  }
`;

const SuccessMessage = styled.div`
  background-color: #d4edda;
  color: #155724;
  padding: 15px;
  border-radius: 4px;
  margin-bottom: 20px;
  text-align: center;
`;

const Contato = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    assunto: '',
    mensagem: '',
    tipoContato: ''
  });
  
  const [submitted, setSubmitted] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulação de envio
    console.log('Dados do formulário:', formData);
    // Exibir mensagem de sucesso
    setSubmitted(true);
    // Limpar formulário após 3 segundos
    setTimeout(() => {
      setFormData({
        nome: '',
        email: '',
        telefone: '',
        assunto: '',
        mensagem: '',
        tipoContato: ''
      });
      setSubmitted(false);
    }, 3000);
  };
  
  return (
    <ContatoContainer>
      <ContatoHeader>
        <ContatoTitle>Entre em Contato</ContatoTitle>
        <ContatoDescription>
          Tire suas dúvidas sobre nossos financiamentos agropecuários ou solicite mais informações.
          Estamos à disposição para atender você.
        </ContatoDescription>
      </ContatoHeader>
      
      <ContatoContent>
        <ContatoForm onSubmit={handleSubmit}>
          {submitted && (
            <SuccessMessage>
              Mensagem enviada com sucesso! Em breve entraremos em contato.
            </SuccessMessage>
          )}
          
          <FormGroup>
            <FormLabel htmlFor="nome">Nome Completo</FormLabel>
            <FormInput 
              type="text"
              id="nome"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              required
            />
          </FormGroup>
          
          <FormGroup>
            <FormLabel htmlFor="email">E-mail</FormLabel>
            <FormInput 
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </FormGroup>
          
          <FormGroup>
            <FormLabel htmlFor="telefone">Telefone</FormLabel>
            <FormInput 
              type="tel"
              id="telefone"
              name="telefone"
              value={formData.telefone}
              onChange={handleChange}
              required
            />
          </FormGroup>
          
          <FormGroup>
            <FormLabel htmlFor="tipoContato">Tipo de Contato</FormLabel>
            <FormSelect 
              id="tipoContato"
              name="tipoContato"
              value={formData.tipoContato}
              onChange={handleChange}
              required
            >
              <option value="">Selecione...</option>
              <option value="duvida">Dúvida sobre Financiamento</option>
              <option value="simulacao">Ajuda com Simulação</option>
              <option value="agendamento">Agendar Atendimento</option>
              <option value="outros">Outros Assuntos</option>
            </FormSelect>
          </FormGroup>
          
          <FormGroup>
            <FormLabel htmlFor="assunto">Assunto</FormLabel>
            <FormInput 
              type="text"
              id="assunto"
              name="assunto"
              value={formData.assunto}
              onChange={handleChange}
              required
            />
          </FormGroup>
          
          <FormGroup>
            <FormLabel htmlFor="mensagem">Mensagem</FormLabel>
            <FormTextarea 
              id="mensagem"
              name="mensagem"
              value={formData.mensagem}
              onChange={handleChange}
              required
            />
          </FormGroup>
          
          <SubmitButton type="submit">Enviar Mensagem</SubmitButton>
        </ContatoForm>
        
        <ContactInfo>
          <h2>Informações de Contato</h2>
          
          <InfoCard>
            <h3>Central de Atendimento</h3>
            <ContactItem>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"/>
              </svg>
              <p>4008-3888</p>
            </ContactItem>
            
            <ContactItem>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555zM0 4.697v7.104l5.803-3.558L0 4.697zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757zm3.436-.586L16 11.801V4.697l-5.803 3.546z"/>
              </svg>
              <p>atendimento@basa.com.br</p>
            </ContactItem>
            
            <ContactItem>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
              </svg>
              <p>Av. Presidente Vargas, 800<br/>Belém - PA, CEP 66017-000</p>
            </ContactItem>
          </InfoCard>
          
          <InfoCard>
            <h3>Ouvidoria</h3>
            <ContactItem>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"/>
              </svg>
              <p>0800 722 21 71</p>
            </ContactItem>
            
            <ContactItem>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555zM0 4.697v7.104l5.803-3.558L0 4.697zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757zm3.436-.586L16 11.801V4.697l-5.803 3.546z"/>
              </svg>
              <p>ouvidoria@basa.com.br</p>
            </ContactItem>
          </InfoCard>
          
          <InfoCard>
            <h3>Horário de Atendimento</h3>
            <ContactItem>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
              </svg>
              <p>Segunda a Sexta: 9h às 18h</p>
            </ContactItem>
          </InfoCard>
        </ContactInfo>
      </ContatoContent>
    </ContatoContainer>
  );
};

export default Contato;