import React, { useState } from 'react';
import './Dashboard.css';
import MetricCard from './MetricCard';
import TeamPerformance from './TeamPerformance';
import { TeamData } from '../App';

interface DashboardProps {
  teamsData: TeamData[];
}

const Dashboard: React.FC<DashboardProps> = ({ teamsData }) => {
  const [selectedTeam, setSelectedTeam] = useState<number>(teamsData[0]?.id || 0);

  // Calcula métricas globais (média de todos os times)
  const globalMetrics = {
    deploymentFrequency: {
      value: Math.round(teamsData.reduce((acc, team) => acc + team.deploymentFrequency.value, 0) / teamsData.length),
      unit: "por mês",
      trend: "up" as const,
      status: "high" as const
    },
    leadTimeForChanges: {
      value: parseFloat((teamsData.reduce((acc, team) => acc + team.leadTimeForChanges.value, 0) / teamsData.length).toFixed(1)),
      unit: "dias",
      trend: "down" as const,
      status: "high" as const
    },
    meanTimeToRestore: {
      value: parseFloat((teamsData.reduce((acc, team) => acc + team.meanTimeToRestore.value, 0) / teamsData.length).toFixed(1)),
      unit: "horas",
      trend: "down" as const,
      status: "high" as const
    },
    changeFailureRate: {
      value: parseFloat((teamsData.reduce((acc, team) => acc + team.changeFailureRate.value, 0) / teamsData.length).toFixed(1)),
      unit: "%",
      trend: "down" as const,
      status: "medium" as const
    }
  };

  const handleTeamChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTeam(parseInt(event.target.value));
  };

  const selectedTeamData = teamsData.find(team => team.id === selectedTeam) || teamsData[0];

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard de Métricas DORA</h1>
        <p className="description">
          Acompanhamento de performance baseado nas quatro métricas-chave do DORA
          (Deployment Frequency, Lead Time for Changes, Mean Time to Restore, Change Failure Rate)
        </p>
      </div>

      <section className="global-metrics">
        <h2>Métricas Globais</h2>
        <div className="metrics-grid">
          <MetricCard 
            title="Frequência de Deploy" 
            value={globalMetrics.deploymentFrequency.value}
            unit={globalMetrics.deploymentFrequency.unit}
            trend={globalMetrics.deploymentFrequency.trend}
            status={globalMetrics.deploymentFrequency.status}
            description="Frequência com que novas versões são implantadas em produção"
          />
          <MetricCard 
            title="Lead Time para Mudanças" 
            value={globalMetrics.leadTimeForChanges.value}
            unit={globalMetrics.leadTimeForChanges.unit}
            trend={globalMetrics.leadTimeForChanges.trend}
            status={globalMetrics.leadTimeForChanges.status}
            description="Tempo desde o commit até o deploy em produção"
          />
          <MetricCard 
            title="Tempo Médio de Restauração" 
            value={globalMetrics.meanTimeToRestore.value}
            unit={globalMetrics.meanTimeToRestore.unit}
            trend={globalMetrics.meanTimeToRestore.trend}
            status={globalMetrics.meanTimeToRestore.status}
            description="Tempo para restaurar o serviço após um incidente"
          />
          <MetricCard 
            title="Taxa de Falha de Mudanças" 
            value={globalMetrics.changeFailureRate.value}
            unit={globalMetrics.changeFailureRate.unit}
            trend={globalMetrics.changeFailureRate.trend}
            status={globalMetrics.changeFailureRate.status}
            description="Percentual de mudanças que resultam em falhas em produção"
          />
        </div>
      </section>

      <section className="team-metrics">
        <div className="team-selector">
          <h2>Métricas por Time</h2>
          <select value={selectedTeam} onChange={handleTeamChange}>
            {teamsData.map(team => (
              <option key={team.id} value={team.id}>{team.name}</option>
            ))}
          </select>
        </div>
        
        {selectedTeamData && (
          <TeamPerformance teamData={selectedTeamData} />
        )}
      </section>

      <section className="dora-info">
        <h2>Sobre as Métricas DORA</h2>
        <div className="info-cards">
          <div className="info-card">
            <h3>O que é DORA?</h3>
            <p>
              DORA (DevOps Research and Assessment) é um grupo de pesquisa do Google 
              que identificou quatro métricas-chave que diferenciam organizações de alto 
              desempenho de baixo desempenho em engenharia de software.
            </p>
          </div>
          <div className="info-card">
            <h3>Níveis de Performance</h3>
            <ul>
              <li><span className="elite">Elite:</span> Alta frequência de deploy, tempo de lead baixo, rápida recuperação e baixas taxas de falha</li>
              <li><span className="high">Alto:</span> Bom equilíbrio entre velocidade e estabilidade</li>
              <li><span className="medium">Médio:</span> Desempenho médio em relação ao mercado</li>
              <li><span className="low">Baixo:</span> Oportunidades significativas de melhoria</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;