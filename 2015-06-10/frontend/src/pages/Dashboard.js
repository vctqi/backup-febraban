import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Table, Alert, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { FaExclamationTriangle, FaCheckCircle, FaUsers, FaChartLine, FaPercentage } from 'react-icons/fa';
import { getEstatisticas } from '../services/api';

// Registra os componentes do Chart.js
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

const Dashboard = () => {
  const [estatisticas, setEstatisticas] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEstatisticas = async () => {
      try {
        const data = await getEstatisticas();
        setEstatisticas(data);
        setLoading(false);
      } catch (err) {
        setError('Erro ao carregar dados estatísticos.');
        setLoading(false);
      }
    };

    fetchEstatisticas();
  }, []);

  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Carregando estatísticas...</p>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger">
        <Alert.Heading>Erro</Alert.Heading>
        <p>{error}</p>
      </Alert>
    );
  }

  // Dados para o gráfico de distribuição de risco
  const riscosData = {
    labels: Object.keys(estatisticas.distribuicaoRisco),
    datasets: [
      {
        data: Object.values(estatisticas.distribuicaoRisco),
        backgroundColor: [
          '#1e3a8a', // Muito Baixo
          '#0066cc', // Baixo
          '#3498db', // Médio-Baixo
          '#f39c12', // Médio
          '#e67e22', // Médio-Alto
          '#e74c3c', // Alto
          '#c0392b'  // Muito Alto
        ],
        borderWidth: 1,
      },
    ],
  };

  // Dados para o gráfico de distribuição por segmento
  const segmentosData = {
    labels: Object.keys(estatisticas.distribuicaoSegmento),
    datasets: [
      {
        label: 'Número de Clientes',
        data: Object.values(estatisticas.distribuicaoSegmento),
        backgroundColor: [
          '#3498db',
          '#2ecc71',
          '#f1c40f',
          '#9b59b6',
          '#e74c3c'
        ],
      },
    ],
  };

  const segmentosOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Distribuição por Segmento',
      },
    },
  };

  return (
    <div>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Dashboard</h1>
      </div>

      <Row className="mb-4">
        <Col md={3}>
          <Card className="dashboard-card baixo h-100">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted">Total de Clientes</h6>
                  <div className="stats-number">{estatisticas.totalClientes}</div>
                </div>
                <FaUsers size={30} className="text-primary" />
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="dashboard-card baixo h-100">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted">Score Médio</h6>
                  <div className="stats-number">{estatisticas.scoreMedio}</div>
                </div>
                <FaChartLine size={30} className="text-primary" />
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="dashboard-card medio h-100">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted">Limite Médio</h6>
                  <div className="stats-number">R$ {estatisticas.limiteMedio.toLocaleString()}</div>
                </div>
                <FaPercentage size={30} className="text-warning" />
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="dashboard-card alto h-100">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted">Clientes de Alto Risco</h6>
                  <div className="stats-number">
                    {(estatisticas.distribuicaoRisco['Alto'] || 0) + (estatisticas.distribuicaoRisco['Muito Alto'] || 0)}
                  </div>
                </div>
                <FaExclamationTriangle size={30} className="text-danger" />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <Card className="mb-4">
            <Card.Header as="h5">Distribuição por Nível de Risco</Card.Header>
            <Card.Body>
              <div style={{ height: '300px' }}>
                <Pie data={riscosData} />
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="mb-4">
            <Card.Header as="h5">Distribuição por Segmento</Card.Header>
            <Card.Body>
              <div style={{ height: '300px' }}>
                <Bar options={segmentosOptions} data={segmentosData} />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <Card className="mb-4">
            <Card.Header as="h5" className="d-flex align-items-center">
              <FaExclamationTriangle className="text-danger me-2" />
              Clientes com Maior Risco
            </Card.Header>
            <Card.Body>
              <Table striped hover responsive>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Score</th>
                    <th>Nível de Risco</th>
                    <th>Ação</th>
                  </tr>
                </thead>
                <tbody>
                  {estatisticas.clientesMaiorRisco.map((cliente) => (
                    <tr key={cliente.id}>
                      <td>{cliente.id}</td>
                      <td>{cliente.nome}</td>
                      <td>{cliente.score}</td>
                      <td>{cliente.nivelRisco}</td>
                      <td>
                        <Link to={`/clientes/${cliente.id}`} className="btn btn-sm btn-outline-primary">
                          Ver
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="mb-4">
            <Card.Header as="h5" className="d-flex align-items-center">
              <FaCheckCircle className="text-success me-2" />
              Clientes com Melhor Score
            </Card.Header>
            <Card.Body>
              <Table striped hover responsive>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Score</th>
                    <th>Ação</th>
                  </tr>
                </thead>
                <tbody>
                  {estatisticas.clientesMaiorScore.map((cliente) => (
                    <tr key={cliente.id}>
                      <td>{cliente.id}</td>
                      <td>{cliente.nome}</td>
                      <td>{cliente.score}</td>
                      <td>
                        <Link to={`/clientes/${cliente.id}`} className="btn btn-sm btn-outline-primary">
                          Ver
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;