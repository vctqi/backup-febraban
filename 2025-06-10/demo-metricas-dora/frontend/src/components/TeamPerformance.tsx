import React from 'react';
import './TeamPerformance.css';
import { TeamData } from '../App';
import MetricCard from './MetricCard';

interface TeamPerformanceProps {
  teamData: TeamData;
}

const TeamPerformance: React.FC<TeamPerformanceProps> = ({ teamData }) => {
  // Função para gerar o gráfico (simplificada para demonstração)
  const renderChart = (metricKey: 'deploymentFrequency' | 'leadTimeForChanges' | 'meanTimeToRestore' | 'changeFailureRate') => {
    const data = teamData.historicalData;
    const maxValue = Math.max(...data.map(d => d[metricKey])) * 1.1;
    
    return (
      <div className="chart">
        <div className="chart-title">Histórico dos últimos 12 meses</div>
        <div className="chart-container">
          {data.map((entry, index) => (
            <div key={index} className="chart-bar-container">
              <div 
                className="chart-bar" 
                style={{ 
                  height: `${(entry[metricKey] / maxValue) * 100}%`,
                  backgroundColor: getStatusColor(teamData[metricKey].status)
                }}
                title={`${new Date(entry.date).toLocaleDateString('pt-BR')}: ${entry[metricKey]}`}
              ></div>
              <div className="chart-label">{new Date(entry.date).toLocaleDateString('pt-BR', { month: 'short' })}</div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Retorna a cor com base no status
  const getStatusColor = (status: 'elite' | 'high' | 'medium' | 'low') => {
    const colors: Record<string, string> = {
      'elite': 'var(--success-color)',
      'high': 'var(--info-color)',
      'medium': 'var(--warning-color)',
      'low': 'var(--danger-color)'
    };
    return colors[status];
  };

  return (
    <div className="team-performance">
      <div className="team-header">
        <h3>{teamData.name}</h3>
      </div>

      <div className="team-metrics">
        <div className="metric-section">
          <MetricCard 
            title="Frequência de Deploy" 
            value={teamData.deploymentFrequency.value}
            unit={teamData.deploymentFrequency.unit}
            trend={teamData.deploymentFrequency.trend}
            status={teamData.deploymentFrequency.status}
            description="Frequência com que novas versões são implantadas em produção"
          />
          {renderChart('deploymentFrequency')}
        </div>

        <div className="metric-section">
          <MetricCard 
            title="Lead Time para Mudanças" 
            value={teamData.leadTimeForChanges.value}
            unit={teamData.leadTimeForChanges.unit}
            trend={teamData.leadTimeForChanges.trend}
            status={teamData.leadTimeForChanges.status}
            description="Tempo desde o commit até o deploy em produção"
          />
          {renderChart('leadTimeForChanges')}
        </div>

        <div className="metric-section">
          <MetricCard 
            title="Tempo Médio de Restauração" 
            value={teamData.meanTimeToRestore.value}
            unit={teamData.meanTimeToRestore.unit}
            trend={teamData.meanTimeToRestore.trend}
            status={teamData.meanTimeToRestore.status}
            description="Tempo para restaurar o serviço após um incidente"
          />
          {renderChart('meanTimeToRestore')}
        </div>

        <div className="metric-section">
          <MetricCard 
            title="Taxa de Falha de Mudanças" 
            value={teamData.changeFailureRate.value}
            unit={teamData.changeFailureRate.unit}
            trend={teamData.changeFailureRate.trend}
            status={teamData.changeFailureRate.status}
            description="Percentual de mudanças que resultam em falhas em produção"
          />
          {renderChart('changeFailureRate')}
        </div>
      </div>

      <div className="team-summary">
        <h4>Resumo de Performance</h4>
        <p>
          O time <strong>{teamData.name}</strong> apresenta performance 
          <strong className={`status-text ${teamData.deploymentFrequency.status}`}> {teamData.deploymentFrequency.status}</strong> 
          em frequência de deploy,
          <strong className={`status-text ${teamData.leadTimeForChanges.status}`}> {teamData.leadTimeForChanges.status}</strong> 
          em lead time para mudanças,
          <strong className={`status-text ${teamData.meanTimeToRestore.status}`}> {teamData.meanTimeToRestore.status}</strong> 
          em tempo médio de restauração e
          <strong className={`status-text ${teamData.changeFailureRate.status}`}> {teamData.changeFailureRate.status}</strong> 
          em taxa de falhas.
        </p>
      </div>
    </div>
  );
};

export default TeamPerformance;