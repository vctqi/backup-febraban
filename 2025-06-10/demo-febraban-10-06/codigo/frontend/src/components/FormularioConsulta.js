import React from 'react';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import InputMask from 'react-input-mask';
import { analisarCNPJ } from '../services/cnpjService';
import { useConsulta } from '../context/ConsultaContext';

// Schema de validação com Yup
const consultaSchema = Yup.object().shape({
  cnpj: Yup.string()
    .required('CNPJ é obrigatório')
    .test('cnpj-valido', 'CNPJ inválido', (value) => {
      // Remove todos os caracteres não numéricos
      const numbers = value.replace(/[^\d]/g, '');
      
      // Verifica se tem 14 dígitos
      if (numbers.length !== 14) {
        return false;
      }
      
      // Verifica se todos os dígitos são iguais (caso inválido)
      if (/^(\d)\1+$/.test(numbers)) {
        return false;
      }
      
      // Algoritmo de validação do CNPJ
      let tamanho = numbers.length - 2;
      let numeros = numbers.substring(0, tamanho);
      const digitos = numbers.substring(tamanho);
      let soma = 0;
      let pos = tamanho - 7;
      
      // Cálculo do primeiro dígito verificador
      for (let i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2) {
          pos = 9;
        }
      }
      
      let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
      if (resultado !== parseInt(digitos.charAt(0))) {
        return false;
      }
      
      // Cálculo do segundo dígito verificador
      tamanho = tamanho + 1;
      numeros = numbers.substring(0, tamanho);
      soma = 0;
      pos = tamanho - 7;
      
      for (let i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2) {
          pos = 9;
        }
      }
      
      resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
      return resultado === parseInt(digitos.charAt(1));
    })
});

const FormularioConsulta = () => {
  const { loading, error, setLoading, setError, definirResultado } = useConsulta();
  
  const handleSubmit = async (values, { resetForm }) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await analisarCNPJ(values.cnpj);
      
      if (response.status === 'success') {
        definirResultado(response.data);
      } else {
        setError('Erro ao processar a requisição');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Ocorreu um erro ao consultar o CNPJ');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div>
      <h5 className="mb-3">Consulta de CNPJ</h5>
      
      <Formik
        initialValues={{ cnpj: '' }}
        validationSchema={consultaSchema}
        onSubmit={handleSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isValid,
          setFieldValue
        }) => (
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>CNPJ</Form.Label>
              <InputMask
                mask="99.999.999/9999-99"
                value={values.cnpj}
                onChange={handleChange}
                onBlur={handleBlur}
                name="cnpj"
              >
                {(inputProps) => (
                  <Form.Control
                    {...inputProps}
                    type="text"
                    placeholder="00.000.000/0000-00"
                    isInvalid={touched.cnpj && errors.cnpj}
                  />
                )}
              </InputMask>
              {touched.cnpj && errors.cnpj && (
                <Form.Control.Feedback type="invalid">
                  {errors.cnpj}
                </Form.Control.Feedback>
              )}
              <Form.Text className="text-muted">
                Insira o CNPJ completo com ou sem formatação
              </Form.Text>
            </Form.Group>
            
            <Button 
              variant="primary" 
              type="submit" 
              className="w-100"
              disabled={loading || !isValid}
            >
              {loading ? (
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
          </Form>
        )}
      </Formik>
      
      {error && (
        <Alert variant="danger" className="mt-3">
          {error}
        </Alert>
      )}
    </div>
  );
};

export default FormularioConsulta;