import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getInvestments } from '../services/api';

const InvestmentList = () => {
  const [investments, setInvestments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    tipo: '',
    valorMinimo: '',
    liquidez: ''
  });

  useEffect(() => {
    fetchInvestments();
  }, []);

  const fetchInvestments = async (filterParams = {}) => {
    try {
      setLoading(true);
      const data = await getInvestments(filterParams);
      setInvestments(data);
      setLoading(false);
    } catch (err) {
      setError('Erro ao carregar investimentos. Por favor, tente novamente.');
      setLoading(false);
      console.error(err);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    
    // Remove empty filters
    const activeFilters = Object.entries(filters)
      .filter(([_, value]) => value !== '')
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
    
    fetchInvestments(activeFilters);
  };

  const handleResetFilters = () => {
    setFilters({
      tipo: '',
      valorMinimo: '',
      liquidez: ''
    });
    fetchInvestments();
  };

  if (loading) {
    return (
      <div className="container">
        <h1 className="dashboard-title">Carregando investimentos...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <h1 className="dashboard-title">Erro</h1>
        <p>{error}</p>
        <button className="btn btn-primary" onClick={() => window.location.reload()}>Tentar novamente</button>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="dashboard-title">Lista de Investimentos</h1>
      
      {/* Filters */}
      <div className="filter-container">
        <h2 className="filter-title">Filtros</h2>
        <form onSubmit={handleFilterSubmit} className="filter-form">
          <div className="form-group">
            <label htmlFor="tipo">Tipo de Investimento</label>
            <select
              id="tipo"
              name="tipo"
              className="form-control"
              value={filters.tipo}
              onChange={handleFilterChange}
            >
              <option value="">Todos</option>
              <option value="Renda Fixa">Renda Fixa</option>
              <option value="CDB">CDB</option>
              <option value="LCI">LCI</option>
              <option value="Tesouro Direto">Tesouro Direto</option>
              <option value="Renda Variável">Renda Variável</option>
              <option value="Fundo de Ações">Fundo de Ações</option>
              <option value="Fundo Imobiliário">Fundo Imobiliário</option>
              <option value="ETF">ETF</option>
              <option value="Previdência">Previdência</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="valorMinimo">Valor Mínimo (até R$)</label>
            <input
              type="number"
              id="valorMinimo"
              name="valorMinimo"
              className="form-control"
              value={filters.valorMinimo}
              onChange={handleFilterChange}
              placeholder="Ex: 1000"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="liquidez">Liquidez</label>
            <select
              id="liquidez"
              name="liquidez"
              className="form-control"
              value={filters.liquidez}
              onChange={handleFilterChange}
            >
              <option value="">Todas</option>
              <option value="alta">Alta (D+0 a D+2)</option>
              <option value="media">Média (D+3 a D+5)</option>
              <option value="baixa">Baixa (Acima de D+5)</option>
            </select>
          </div>
          
          <div className="form-group" style={{ display: 'flex', alignItems: 'flex-end' }}>
            <button type="submit" className="btn btn-primary" style={{ marginRight: '10px' }}>
              Aplicar Filtros
            </button>
            <button type="button" onClick={handleResetFilters} className="btn btn-outline">
              Limpar Filtros
            </button>
          </div>
        </form>
      </div>
      
      {/* Results */}
      <div className="investments-table-container">
        <h2 className="chart-title">Resultados ({investments.length} investimentos encontrados)</h2>
        
        {investments.length === 0 ? (
          <p>Nenhum investimento encontrado com os filtros selecionados.</p>
        ) : (
          <table className="investments-table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Tipo</th>
                <th>Rentabilidade</th>
                <th>Valor Mínimo</th>
                <th>Liquidez</th>
                <th>Risco</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {investments.map((investment) => (
                <tr key={investment.id}>
                  <td>{investment.nome}</td>
                  <td>
                    {investment.tipo}
                    {investment.subTipo && investment.subTipo !== investment.tipo && ` (${investment.subTipo})`}
                  </td>
                  <td>{investment.rentabilidade}</td>
                  <td>R$ {investment.valorMinimo.toLocaleString('pt-BR')}</td>
                  <td>{investment.liquidez}</td>
                  <td>
                    <span className={`badge ${
                      investment.risco === 'Baixo' || investment.risco === 'Baixíssimo' ? 'badge-success' : 
                      investment.risco === 'Médio' ? 'badge-warning' : 'badge-danger'
                    }`}>
                      {investment.risco}
                    </span>
                  </td>
                  <td>
                    <Link to={`/investimentos/${investment.id}`} className="btn btn-outline">Detalhes</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default InvestmentList;