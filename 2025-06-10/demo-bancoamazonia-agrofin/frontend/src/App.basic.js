import React, { useState } from 'react';
import './App.css';

function App() {
  const [formValues, setFormValues] = useState({
    valorSolicitado: '',
    rendaMensal: '',
    tipoFinanciamento: 'investimento_fixo',
    prazoMeses: '12'
  });
  
  const [resultado, setResultado] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormValues({
      ...formValues,
      [id]: value
    });
  };
  
  const formatarMoeda = (valor) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('http://localhost:5099/api/financiamentos/simular', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          valorSolicitado: parseFloat(formValues.valorSolicitado),
          rendaMensal: parseFloat(formValues.rendaMensal),
          tipoFinanciamento: formValues.tipoFinanciamento,
          prazoMeses: parseInt(formValues.prazoMeses, 10)
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setResultado(data.data);
      } else {
        setError(data.message || 'Erro na simulação');
      }
    } catch (err) {
      setError('Erro na comunicação com o servidor');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="app">
      <header className="app-header">
        <h1>Financiamento Agropecuário | Banco da Amazônia</h1>
      </header>
      
      <main className="app-content">
        <div className="simulador-container">
          <h2>Simulador de Financiamento</h2>
          <p>
            Bem-vindo ao simulador de financiamento agropecuário do Banco da Amazônia.
            Aqui você pode calcular as melhores opções de crédito para seu projeto rural.
          </p>
          
          {error && <div className="alert alert-danger">{error}</div>}
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="valorSolicitado">Valor do Financiamento:</label>
              <input 
                type="number" 
                id="valorSolicitado" 
                className="form-control"
                placeholder="R$ 0,00" 
                value={formValues.valorSolicitado}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="rendaMensal">Renda Mensal:</label>
              <input 
                type="number" 
                id="rendaMensal" 
                className="form-control"
                placeholder="R$ 0,00" 
                value={formValues.rendaMensal}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="tipoFinanciamento">Tipo de Financiamento:</label>
              <select 
                id="tipoFinanciamento" 
                className="form-select"
                value={formValues.tipoFinanciamento}
                onChange={handleInputChange}
              >
                <option value="investimento_fixo">Investimento Fixo</option>
                <option value="investimento_semifixo">Investimento Semifixo</option>
                <option value="custeio_agricola">Custeio Agrícola</option>
                <option value="custeio_pecuario">Custeio Pecuário</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="prazoMeses">Prazo (em meses):</label>
              <select 
                id="prazoMeses" 
                className="form-select"
                value={formValues.prazoMeses}
                onChange={handleInputChange}
              >
                <option value="12">12 meses</option>
                <option value="24">24 meses</option>
                <option value="36">36 meses</option>
                <option value="48">48 meses</option>
                <option value="60">60 meses</option>
                <option value="72">72 meses</option>
                <option value="84">84 meses</option>
                <option value="96">96 meses</option>
                <option value="120">120 meses</option>
              </select>
            </div>
            
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Processando...' : 'Simular Financiamento'}
            </button>
          </form>
          
          {resultado && (
            <div className="resultado-simulacao">
              <h3>Resultado da Simulação</h3>
              
              <div className="card">
                <div className="card-header">
                  <h4>Financiamento Aprovado</h4>
                </div>
                <div className="card-body">
                  <div className="resultado-item">
                    <span className="resultado-label">Valor solicitado:</span>
                    <span className="resultado-valor">{formatarMoeda(resultado.valorSolicitado)}</span>
                  </div>
                  
                  <div className="resultado-item">
                    <span className="resultado-label">Valor aprovado:</span>
                    <span className="resultado-valor">{formatarMoeda(resultado.valorFinanciamento)}</span>
                  </div>
                  
                  <div className="resultado-item">
                    <span className="resultado-label">Taxa de juros:</span>
                    <span className="resultado-valor">{resultado.taxaJuros.toFixed(2)}% ao ano</span>
                  </div>
                  
                  <div className="resultado-item">
                    <span className="resultado-label">Prazo total:</span>
                    <span className="resultado-valor">{resultado.prazoMeses} meses</span>
                  </div>
                  
                  <div className="resultado-item">
                    <span className="resultado-label">Valor da parcela:</span>
                    <span className="resultado-valor">{formatarMoeda(resultado.parcela)}</span>
                  </div>
                  
                  <div className="resultado-item">
                    <span className="resultado-label">Classificação de risco:</span>
                    <span className="resultado-valor">{resultado.classificacaoRisco}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <footer className="app-footer">
        <p>© {new Date().getFullYear()} Banco da Amazônia - Todos os direitos reservados</p>
      </footer>
    </div>
  );
}

export default App;