import React from 'react';
import './App.css';

function App() {
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
          
          <div className="form-group">
            <label htmlFor="valorFinanciamento">Valor do Financiamento:</label>
            <input 
              type="text" 
              id="valorFinanciamento" 
              className="form-control"
              placeholder="R$ 0,00" 
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="rendaMensal">Renda Mensal:</label>
            <input 
              type="text" 
              id="rendaMensal" 
              className="form-control"
              placeholder="R$ 0,00" 
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="tipoFinanciamento">Tipo de Financiamento:</label>
            <select id="tipoFinanciamento" className="form-select">
              <option value="">Selecione...</option>
              <option value="investimento_fixo">Investimento Fixo</option>
              <option value="investimento_semifixo">Investimento Semifixo</option>
              <option value="custeio_agricola">Custeio Agrícola</option>
              <option value="custeio_pecuario">Custeio Pecuário</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="prazo">Prazo (em meses):</label>
            <select id="prazo" className="form-select">
              <option value="12">12 meses</option>
              <option value="24">24 meses</option>
              <option value="36">36 meses</option>
              <option value="48">48 meses</option>
              <option value="60">60 meses</option>
              <option value="72">72 meses</option>
              <option value="84">84 meses</option>
              <option value="96">96 meses</option>
              <option value="108">108 meses</option>
              <option value="120">120 meses</option>
            </select>
          </div>
          
          <button className="btn btn-primary">Simular Financiamento</button>
        </div>
      </main>
      <footer className="app-footer">
        <p>© {new Date().getFullYear()} Banco da Amazônia - Todos os direitos reservados</p>
      </footer>
    </div>
  );
}

export default App;