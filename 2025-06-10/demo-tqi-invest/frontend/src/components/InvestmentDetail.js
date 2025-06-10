import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getInvestmentById } from '../services/api';
import { Line } from 'react-chartjs-2';

const InvestmentDetail = ({ match }) => {
  const [investment, setInvestment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInvestment = async () => {
      try {
        setLoading(true);
        const data = await getInvestmentById(match.params.id);
        setInvestment(data);
        setLoading(false);
      } catch (err) {
        setError('Erro ao carregar detalhes do investimento. Por favor, tente novamente.');
        setLoading(false);
        console.error(err);
      }
    };

    fetchInvestment();
  }, [match.params.id]);

  if (loading) {
    return (
      <div className="container">
        <h1 className="dashboard-title">Carregando detalhes do investimento...</h1>
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

  if (!investment) {
    return (
      <div className="container">
        <h1 className="dashboard-title">Investimento não encontrado</h1>
        <Link to="/investimentos" className="btn btn-primary">Voltar para a lista</Link>
      </div>
    );
  }

  // Prepare performance chart data
  const performanceData = {
    labels: investment.performance.map(p => p.mes),
    datasets: [
      {
        label: 'Rendimento (%)',
        data: investment.performance.map(p => p.rendimento),
        borderColor: '#0058a3',
        backgroundColor: 'rgba(0, 88, 163, 0.1)',
        tension: 0.1,
        fill: true,
      },
    ],
  };

  return (
    <div className="container">
      <div style={{ marginBottom: '20px' }}>
        <Link to="/investimentos" className="btn btn-outline">
          <i className="fas fa-arrow-left"></i> Voltar para a lista
        </Link>
      </div>
      
      <h1 className="dashboard-title">{investment.nome}</h1>
      
      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-card-title">Tipo</div>
          <div className="stat-card-value">{investment.tipo}</div>
          <div>{investment.subTipo}</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-card-title">Rentabilidade</div>
          <div className="stat-card-value">{investment.rentabilidade}</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-card-title">Valor Mínimo</div>
          <div className="stat-card-value">R$ {investment.valorMinimo.toLocaleString('pt-BR')}</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-card-title">Risco</div>
          <div className="stat-card-value">
            <span className={`badge ${
              investment.risco === 'Baixo' || investment.risco === 'Baixíssimo' ? 'badge-success' : 
              investment.risco === 'Médio' ? 'badge-warning' : 'badge-danger'
            }`}>
              {investment.risco}
            </span>
          </div>
        </div>
      </div>
      
      <div className="charts-container">
        <div className="chart-card">
          <h3 className="chart-title">Performance Mensal</h3>
          <Line data={performanceData} options={{ responsive: true, maintainAspectRatio: true }} />
        </div>
        
        <div className="chart-card">
          <h3 className="chart-title">Informações Detalhadas</h3>
          <table className="investments-table">
            <tbody>
              <tr>
                <td><strong>Liquidez</strong></td>
                <td>{investment.liquidez}</td>
              </tr>
              <tr>
                <td><strong>Prazo de Resgate</strong></td>
                <td>{investment.prazoResgate}</td>
              </tr>
              <tr>
                <td><strong>Taxa de Administração</strong></td>
                <td>{investment.taxaAdministracao}%</td>
              </tr>
              <tr>
                <td><strong>Imposto de Renda</strong></td>
                <td>{investment.ir}</td>
              </tr>
              <tr>
                <td><strong>Instituição</strong></td>
                <td>{investment.instituicao}</td>
              </tr>
              <tr>
                <td><strong>Garantia</strong></td>
                <td>{investment.garantia}</td>
              </tr>
              <tr>
                <td><strong>Data de Vencimento</strong></td>
                <td>{investment.dataVencimento || 'Não possui'}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <div style={{ textAlign: 'center', margin: '30px 0' }}>
        <button className="btn btn-primary" style={{ padding: '15px 30px', fontSize: '16px' }}>
          Investir Agora
        </button>
      </div>
      
      <div className="filter-container">
        <h3 className="chart-title">Considerações Importantes</h3>
        <p style={{ marginBottom: '15px' }}>
          Este é apenas um exemplo de demonstração de um sistema de investimentos. Em um sistema real, você encontraria informações detalhadas sobre cada investimento, incluindo fatores de risco, cenários de rentabilidade e histórico completo.
        </p>
        <p style={{ marginBottom: '15px' }}>
          Antes de investir, consulte um especialista financeiro para avaliar se o investimento é adequado ao seu perfil e objetivos.
        </p>
        <p>
          <strong>Aviso Legal:</strong> Rentabilidade passada não é garantia de rentabilidade futura. Os investimentos apresentados são meramente ilustrativos.
        </p>
      </div>
    </div>
  );
};

export default InvestmentDetail;