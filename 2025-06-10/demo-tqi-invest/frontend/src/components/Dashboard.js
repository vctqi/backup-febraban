import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getStatistics, getInvestments } from '../services/api';
import { Pie, Bar, Line } from 'react-chartjs-2';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [investments, setInvestments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const statsData = await getStatistics();
        const investmentsData = await getInvestments();
        
        setStats(statsData);
        setInvestments(investmentsData);
        setLoading(false);
      } catch (err) {
        setError('Erro ao carregar dados. Por favor, tente novamente.');
        setLoading(false);
        console.error(err);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="dashboard">
        <div className="container">
          <h1 className="dashboard-title">Carregando dashboard...</h1>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard">
        <div className="container">
          <h1 className="dashboard-title">Erro</h1>
          <p>{error}</p>
          <button className="btn btn-primary" onClick={() => window.location.reload()}>Tentar novamente</button>
        </div>
      </div>
    );
  }

  // Prepare chart data
  const tipoInvestimentoData = {
    labels: stats ? Object.keys(stats.distribuicaoTipos) : [],
    datasets: [
      {
        data: stats ? Object.values(stats.distribuicaoTipos) : [],
        backgroundColor: ['#0058a3', '#e63b24', '#ff8c00', '#28a745'],
        borderWidth: 1,
      },
    ],
  };
  
  // Performance data
  const performanceData = {
    labels: investments.length > 0 && investments[0].performance ? investments[0].performance.map(p => p.mes) : [],
    datasets: investments.slice(0, 3).map((inv, index) => ({
      label: inv.nome,
      data: inv.performance ? inv.performance.map(p => p.rendimento) : [],
      borderColor: index === 0 ? '#0058a3' : index === 1 ? '#e63b24' : '#ff8c00',
      backgroundColor: 'transparent',
      tension: 0.1,
    })),
  };

  // Valor mínimo comparison
  const valorMinimoData = {
    labels: investments.map(inv => inv.nome),
    datasets: [
      {
        label: 'Valor Mínimo (R$)',
        data: investments.map(inv => inv.valorMinimo),
        backgroundColor: '#0058a3',
      },
    ],
  };

  return (
    <div className="dashboard">
      <div className="container">
        <h1 className="dashboard-title">Dashboard de Investimentos</h1>
        
        {/* Stats Cards */}
        <div className="dashboard-stats">
          <div className="stat-card">
            <div className="stat-card-title">Total de Investimentos</div>
            <div className="stat-card-value">{stats?.totalInvestimentos || 0}</div>
          </div>
          <div className="stat-card">
            <div className="stat-card-title">Valor Médio Mínimo</div>
            <div className="stat-card-value">R$ {stats?.valorMedioMinimo.toFixed(2) || '0.00'}</div>
          </div>
          <div className="stat-card">
            <div className="stat-card-title">Rendimento Médio</div>
            <div className="stat-card-value">{stats?.rendimentoMedio || 0}% a.m.</div>
          </div>
          <div className="stat-card">
            <div className="stat-card-title">Investimentos de Renda Fixa</div>
            <div className="stat-card-value">{stats?.distribuicaoTipos['Renda Fixa'] || 0}</div>
          </div>
        </div>
        
        {/* Charts */}
        <div className="charts-container">
          <div className="chart-card">
            <h3 className="chart-title">Distribuição por Tipo de Investimento</h3>
            <Pie data={tipoInvestimentoData} options={{ responsive: true, maintainAspectRatio: true }} />
          </div>
          
          <div className="chart-card">
            <h3 className="chart-title">Performance Mensal</h3>
            <Line data={performanceData} options={{ responsive: true, maintainAspectRatio: true }} />
          </div>
          
          <div className="chart-card">
            <h3 className="chart-title">Valor Mínimo por Investimento</h3>
            <Bar data={valorMinimoData} options={{ responsive: true, maintainAspectRatio: true }} />
          </div>
          
          <div className="chart-card">
            <h3 className="chart-title">Melhores Retornos</h3>
            <table className="investments-table">
              <thead>
                <tr>
                  <th>Investimento</th>
                  <th>Retorno</th>
                </tr>
              </thead>
              <tbody>
                {stats?.melhoresRetornos.map((item, index) => (
                  <tr key={index}>
                    <td>{item.nome}</td>
                    <td>{item.retorno}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Latest Investments */}
        <div className="investments-table-container">
          <h3 className="chart-title">Investimentos Recentes</h3>
          <table className="investments-table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Tipo</th>
                <th>Rentabilidade</th>
                <th>Valor Mínimo</th>
                <th>Risco</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {investments.slice(0, 5).map((investment) => (
                <tr key={investment.id}>
                  <td>{investment.nome}</td>
                  <td>{investment.tipo}</td>
                  <td>{investment.rentabilidade}</td>
                  <td>R$ {investment.valorMinimo.toLocaleString('pt-BR')}</td>
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
          
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <Link to="/investimentos" className="btn btn-primary">Ver Todos os Investimentos</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;