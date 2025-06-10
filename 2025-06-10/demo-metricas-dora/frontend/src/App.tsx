import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';

// Tipos de dados para as métricas DORA
export interface TeamData {
  id: number;
  name: string;
  deploymentFrequency: {
    value: number;
    unit: string;
    trend: 'up' | 'down' | 'stable';
    status: 'elite' | 'high' | 'medium' | 'low';
  };
  leadTimeForChanges: {
    value: number;
    unit: string;
    trend: 'up' | 'down' | 'stable';
    status: 'elite' | 'high' | 'medium' | 'low';
  };
  meanTimeToRestore: {
    value: number;
    unit: string;
    trend: 'up' | 'down' | 'stable';
    status: 'elite' | 'high' | 'medium' | 'low';
  };
  changeFailureRate: {
    value: number;
    unit: string;
    trend: 'up' | 'down' | 'stable';
    status: 'elite' | 'high' | 'medium' | 'low';
  };
  historicalData: {
    date: string;
    deploymentFrequency: number;
    leadTimeForChanges: number;
    meanTimeToRestore: number;
    changeFailureRate: number;
  }[];
}

function App() {
  const [teamsData, setTeamsData] = useState<TeamData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Em um cenário real, você faria uma chamada para a API
    // Aqui estamos simulando a obtenção de dados do backend
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5999/api/teams');
        if (!response.ok) {
          throw new Error('Falha ao obter dados dos times');
        }
        const data = await response.json();
        setTeamsData(data);
        setLoading(false);
      } catch (err) {
        console.error('Erro ao carregar dados:', err);
        setError('Não foi possível carregar os dados. Usando dados simulados.');
        
        // Dados simulados em caso de erro na API
        setTeamsData([
          {
            id: 1,
            name: "Time DevOps",
            deploymentFrequency: {
              value: 25,
              unit: "por mês",
              trend: "up",
              status: "elite"
            },
            leadTimeForChanges: {
              value: 2.5,
              unit: "dias",
              trend: "down",
              status: "high"
            },
            meanTimeToRestore: {
              value: 3,
              unit: "horas",
              trend: "down",
              status: "elite"
            },
            changeFailureRate: {
              value: 12,
              unit: "%",
              trend: "down",
              status: "high"
            },
            historicalData: Array(12).fill(null).map((_, i) => ({
              date: `2025-${(i + 1).toString().padStart(2, '0')}-01`,
              deploymentFrequency: 20 + Math.floor(Math.random() * 10),
              leadTimeForChanges: 2 + Math.random() * 1.5,
              meanTimeToRestore: 2 + Math.random() * 2,
              changeFailureRate: 10 + Math.random() * 5
            }))
          },
          {
            id: 2,
            name: "Time Plataforma",
            deploymentFrequency: {
              value: 15,
              unit: "por mês",
              trend: "up",
              status: "high"
            },
            leadTimeForChanges: {
              value: 3.2,
              unit: "dias",
              trend: "stable",
              status: "medium"
            },
            meanTimeToRestore: {
              value: 5,
              unit: "horas",
              trend: "down",
              status: "high"
            },
            changeFailureRate: {
              value: 18,
              unit: "%",
              trend: "up",
              status: "medium"
            },
            historicalData: Array(12).fill(null).map((_, i) => ({
              date: `2025-${(i + 1).toString().padStart(2, '0')}-01`,
              deploymentFrequency: 12 + Math.floor(Math.random() * 8),
              leadTimeForChanges: 3 + Math.random() * 1,
              meanTimeToRestore: 4 + Math.random() * 3,
              changeFailureRate: 15 + Math.random() * 7
            }))
          },
          {
            id: 3,
            name: "Time Front-end",
            deploymentFrequency: {
              value: 32,
              unit: "por mês",
              trend: "up",
              status: "elite"
            },
            leadTimeForChanges: {
              value: 1.8,
              unit: "dias",
              trend: "down",
              status: "elite"
            },
            meanTimeToRestore: {
              value: 2,
              unit: "horas",
              trend: "down",
              status: "elite"
            },
            changeFailureRate: {
              value: 8,
              unit: "%",
              trend: "down",
              status: "elite"
            },
            historicalData: Array(12).fill(null).map((_, i) => ({
              date: `2025-${(i + 1).toString().padStart(2, '0')}-01`,
              deploymentFrequency: 25 + Math.floor(Math.random() * 15),
              leadTimeForChanges: 1.5 + Math.random() * 1,
              meanTimeToRestore: 1.5 + Math.random() * 1.5,
              changeFailureRate: 6 + Math.random() * 4
            }))
          },
          {
            id: 4,
            name: "Time Back-end",
            deploymentFrequency: {
              value: 10,
              unit: "por mês",
              trend: "up",
              status: "medium"
            },
            leadTimeForChanges: {
              value: 4.5,
              unit: "dias",
              trend: "down",
              status: "medium"
            },
            meanTimeToRestore: {
              value: 8,
              unit: "horas",
              trend: "stable",
              status: "medium"
            },
            changeFailureRate: {
              value: 22,
              unit: "%",
              trend: "up",
              status: "low"
            },
            historicalData: Array(12).fill(null).map((_, i) => ({
              date: `2025-${(i + 1).toString().padStart(2, '0')}-01`,
              deploymentFrequency: 8 + Math.floor(Math.random() * 6),
              leadTimeForChanges: 4 + Math.random() * 2,
              meanTimeToRestore: 6 + Math.random() * 4,
              changeFailureRate: 18 + Math.random() * 8
            }))
          }
        ]);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="app">
      <Header />
      <main className="main-content">
        {loading ? (
          <div className="loading">Carregando dados...</div>
        ) : (
          <>
            {error && <div className="error-message">{error}</div>}
            <Dashboard teamsData={teamsData} />
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;