import React, { useState } from 'react';
import { Form, Button, InputGroup, Spinner } from 'react-bootstrap';
import { formatCnpj, validateCnpj } from '../utils/cnpjUtils';

const CnpjForm = ({ onAnalyze, isLoading }) => {
  const [cnpj, setCnpj] = useState('');
  const [error, setError] = useState('');

  // Atualiza o CNPJ formatando-o
  const handleCnpjChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); // Remove caracteres não numéricos
    if (value.length <= 14) {
      setCnpj(formatCnpj(value));
      setError('');
    }
  };

  // Valida e envia o formulário
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Remove formatação para validação
    const cnpjSemFormatacao = cnpj.replace(/\D/g, '');
    
    if (!cnpjSemFormatacao) {
      setError('Por favor, informe um CNPJ');
      return;
    }
    
    if (!validateCnpj(cnpjSemFormatacao)) {
      setError('CNPJ inválido. Verifique os dígitos informados.');
      return;
    }
    
    // Passa o CNPJ para análise
    onAnalyze(cnpjSemFormatacao);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formCnpj" className="mb-3">
        <Form.Label>Informe o CNPJ para análise de risco</Form.Label>
        <InputGroup>
          <Form.Control
            type="text"
            value={cnpj}
            onChange={handleCnpjChange}
            placeholder="00.000.000/0000-00"
            aria-describedby="cnpjHelpBlock"
            isInvalid={!!error}
          />
          <Button 
            variant="primary" 
            type="submit" 
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  className="me-2"
                />
                Analisando...
              </>
            ) : (
              'Analisar Risco'
            )}
          </Button>
        </InputGroup>
        {error ? (
          <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
        ) : (
          <Form.Text id="cnpjHelpBlock" muted>
            Digite apenas os números ou com a formatação padrão.
          </Form.Text>
        )}
      </Form.Group>
    </Form>
  );
};

export default CnpjForm;