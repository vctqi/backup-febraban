import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Table, Form, Button, Spinner, Alert } from 'react-bootstrap';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { FaDownload, FaFileExport } from 'react-icons/fa';
import { getEstatisticas } from '../services/api';

// Registra os componentes do Chart.js
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

const Relatorios = () => {
  const [estatisticas, setEstatisticas] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tipoRelatorio, setTipoRelatorio] = useState('distribuicaoRisco');
  const [periodoRelatorio, setPeriodoRelatorio] = useState('atual');

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
        <p className="mt-3">Carregando dados para relatórios...</p>
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

  // Dados para um gráfico fictício de tendências de crédito
  const tendenciasData = {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
    datasets: [
      {
        label: 'Valor Médio de Crédito (R$ mil)',
        data: [65, 72, 78, 75, 82, 90],
        backgroundColor: '#0066cc',
      },
      {
        label: 'Score Médio (0-100)',
        data: [68, 70, 65, 72, 75, 77],
        backgroundColor: '#2ecc71',
      },
    ],
  };

  const tendenciasOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Tendências de Crédito (Últimos 6 meses)',
      },
    },
  };

  // Função para renderizar o gráfico selecionado
  const renderGraficoSelecionado = () => {
    switch (tipoRelatorio) {
      case 'distribuicaoRisco':
        return <Pie data={riscosData} />;
      case 'distribuicaoSegmento':
        return <Bar options={segmentosOptions} data={segmentosData} />;
      case 'tendenciasCredito':
        return <Bar options={tendenciasOptions} data={tendenciasData} />;
      default:
        return <Pie data={riscosData} />;
    }
  };

  // Função para renderizar a tabela correspondente ao gráfico
  const renderTabelaRelatorio = () => {
    switch (tipoRelatorio) {
      case 'distribuicaoRisco':
        return (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Nível de Risco</th>
                <th>Quantidade de Clientes</th>
                <th>Porcentagem</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(estatisticas.distribuicaoRisco).map(([nivel, quantidade]) => (
                <tr key={nivel}>
                  <td>{nivel}</td>
                  <td>{quantidade}</td>
                  <td>{((quantidade / estatisticas.totalClientes) * 100).toFixed(2)}%</td>
                </tr>
              ))}
            </tbody>
          </Table>
        );
      case 'distribuicaoSegmento':
        return (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Segmento</th>
                <th>Quantidade de Clientes</th>
                <th>Porcentagem</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(estatisticas.distribuicaoSegmento).map(([segmento, quantidade]) => (
                <tr key={segmento}>
                  <td>{segmento}</td>
                  <td>{quantidade}</td>
                  <td>{((quantidade / estatisticas.totalClientes) * 100).toFixed(2)}%</td>
                </tr>
              ))}
            </tbody>
          </Table>
        );
      case 'tendenciasCredito':
        return (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Mês</th>
                <th>Valor Médio (R$ mil)</th>
                <th>Score Médio</th>
                <th>Variação Valor (%)</th>
                <th>Variação Score (%)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Janeiro</td>
                <td>65</td>
                <td>68</td>
                <td>-</td>
                <td>-</td>
              </tr>
              <tr>
                <td>Fevereiro</td>
                <td>72</td>
                <td>70</td>
                <td>+10.8%</td>
                <td>+2.9%</td>
              </tr>
              <tr>
                <td>Março</td>
                <td>78</td>
                <td>65</td>
                <td>+8.3%</td>
                <td>-7.1%</td>
              </tr>
              <tr>
                <td>Abril</td>
                <td>75</td>
                <td>72</td>
                <td>-3.8%</td>
                <td>+10.8%</td>
              </tr>
              <tr>
                <td>Maio</td>
                <td>82</td>
                <td>75</td>
                <td>+9.3%</td>
                <td>+4.2%</td>
              </tr>
              <tr>
                <td>Junho</td>
                <td>90</td>
                <td>77</td>
                <td>+9.8%</td>
                <td>+2.7%</td>
              </tr>
            </tbody>
          </Table>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Relatórios</h1>
      </div>

      <Card className="mb-4">
        <Card.Body>
          <Row>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Tipo de Relatório</Form.Label>
                <Form.Select 
                  value={tipoRelatorio} 
                  onChange={(e) => setTipoRelatorio(e.target.value)}
                >
                  <option value="distribuicaoRisco">Distribuição por Nível de Risco</option>
                  <option value="distribuicaoSegmento">Distribuição por Segmento</option>
                  <option value="tendenciasCredito">Tendências de Crédito</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Período</Form.Label>
                <Form.Select 
                  value={periodoRelatorio}
                  onChange={(e) => setPeriodoRelatorio(e.target.value)}
                >
                  <option value="atual">Atual</option>
                  <option value="trimestre">Último Trimestre</option>
                  <option value="semestre">Último Semestre</option>
                  <option value="ano">Último Ano</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={4} className="d-flex align-items-end">
              <Button variant="outline-primary" className="mb-3 me-2">
                <FaDownload className="me-2" />
                Baixar PDF
              </Button>
              <Button variant="outline-success" className="mb-3">
                <FaFileExport className="me-2" />
                Exportar CSV
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Row>
        <Col lg={6}>
          <Card className="mb-4">
            <Card.Header as="h5">Visualização Gráfica</Card.Header>
            <Card.Body>
              <div style={{ height: '400px' }} className="d-flex align-items-center justify-content-center">
                {renderGraficoSelecionado()}
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={6}>
          <Card className="mb-4">
            <Card.Header as="h5">Estatísticas Detalhadas</Card.Header>
            <Card.Body>
              <div className="table-responsive">
                {renderTabelaRelatorio()}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card>
        <Card.Header as="h5">Sumário de Risco</Card.Header>
        <Card.Body>
          <p>
            <strong>Análise Geral:</strong> A carteira de clientes apresenta um perfil de risco {estatisticas.scoreMedio > 70 ? 'saudável' : 'que requer atenção'}, 
            com score médio de {estatisticas.scoreMedio} pontos.
          </p>

          <Row className="mt-4">
            <Col md={4}>
              <div className="border rounded p-3">
                <h6>Clientes de Baixo Risco</h6>
                <div className="display-6 text-primary mb-2">
                  {(estatisticas.distribuicaoRisco['Muito Baixo'] || 0) + (estatisticas.distribuicaoRisco['Baixo'] || 0)}
                </div>
                <p className="mb-0 text-muted">
                  {(((estatisticas.distribuicaoRisco['Muito Baixo'] || 0) + (estatisticas.distribuicaoRisco['Baixo'] || 0)) / estatisticas.totalClientes * 100).toFixed(1)}% do total
                </p>
              </div>
            </Col>
            <Col md={4}>
              <div className="border rounded p-3">
                <h6>Clientes de Médio Risco</h6>
                <div className="display-6 text-warning mb-2">
                  {(estatisticas.distribuicaoRisco['Médio-Baixo'] || 0) + (estatisticas.distribuicaoRisco['Médio'] || 0) + (estatisticas.distribuicaoRisco['Médio-Alto'] || 0)}
                </div>
                <p className="mb-0 text-muted">
                  {(((estatisticas.distribuicaoRisco['Médio-Baixo'] || 0) + (estatisticas.distribuicaoRisco['Médio'] || 0) + (estatisticas.distribuicaoRisco['Médio-Alto'] || 0)) / estatisticas.totalClientes * 100).toFixed(1)}% do total
                </p>
              </div>
            </Col>
            <Col md={4}>
              <div className="border rounded p-3">
                <h6>Clientes de Alto Risco</h6>
                <div className="display-6 text-danger mb-2">
                  {(estatisticas.distribuicaoRisco['Alto'] || 0) + (estatisticas.distribuicaoRisco['Muito Alto'] || 0)}
                </div>
                <p className="mb-0 text-muted">
                  {(((estatisticas.distribuicaoRisco['Alto'] || 0) + (estatisticas.distribuicaoRisco['Muito Alto'] || 0)) / estatisticas.totalClientes * 100).toFixed(1)}% do total
                </p>
              </div>
            </Col>
          </Row>

          <h6 className="mt-4">Recomendações:</h6>
          <ul>
            <li>Monitorar clientes com score abaixo de 50 para ações preventivas contra inadimplência</li>
            <li>Foco em estratégias de crescimento para clientes de baixo risco, oferecendo limites de crédito mais atrativos</li>
            <li>Acompanhamento trimestral de indicadores financeiros dos clientes de médio risco</li>
            <li>Renegociação preventiva para clientes com sinais de deterioração nos indicadores</li>
          </ul>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Relatorios;