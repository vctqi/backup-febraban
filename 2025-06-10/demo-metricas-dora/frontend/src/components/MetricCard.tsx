import React from 'react';
import './MetricCard.css';

interface MetricCardProps {
  title: string;
  value: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  status: 'elite' | 'high' | 'medium' | 'low';
  description: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ 
  title, 
  value, 
  unit, 
  trend, 
  status, 
  description 
}) => {
  // Determina o ícone de tendência
  const getTrendIcon = () => {
    if (trend === 'up') {
      return (
        <svg className={`trend-icon ${trend}`} viewBox="0 0 24 24" width="24" height="24">
          <path fill="currentColor" d="M7 14l5-5 5 5H7z" />
        </svg>
      );
    } else if (trend === 'down') {
      return (
        <svg className={`trend-icon ${trend}`} viewBox="0 0 24 24" width="24" height="24">
          <path fill="currentColor" d="M7 10l5 5 5-5H7z" />
        </svg>
      );
    } else {
      return (
        <svg className={`trend-icon ${trend}`} viewBox="0 0 24 24" width="24" height="24">
          <path fill="currentColor" d="M18 12H6" />
        </svg>
      );
    }
  };

  // Mapeia os níveis de status para textos legíveis
  const getStatusText = () => {
    const statusMap: Record<string, string> = {
      'elite': 'Elite',
      'high': 'Alto',
      'medium': 'Médio',
      'low': 'Baixo'
    };
    return statusMap[status];
  };

  return (
    <div className={`metric-card status-${status}`}>
      <div className="card-header">
        <h3>{title}</h3>
        <div className={`status-badge ${status}`}>{getStatusText()}</div>
      </div>
      
      <div className="card-value">
        <span className="value">{value}</span>
        <span className="unit">{unit}</span>
        {getTrendIcon()}
      </div>
      
      <div className="card-description">
        <p>{description}</p>
      </div>
    </div>
  );
};

export default MetricCard;