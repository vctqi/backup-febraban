import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Button, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { getCliente, getHistorico } from '../api';

// Registrar componentes do Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [cliente, setCliente] = useState(null);
  const [historico, setHistorico] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const clienteData = await getCliente();
        const historicoData = await getHistorico();
        
        setCliente(clienteData);
        setHistorico(historicoData);
        setLoading(false);
      } catch (err) {
        setError('Erro ao carregar dados. Por favor, tente novamente.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const prepararDadosGrafico = () => {
    // Últimos 6 meses ou a quantidade disponível
    const ultimasTransacoes = historico.slice(-6).reverse();
    
    const labels = ultimasTransacoes.map(item => {
      const data = new Date(item.data);
      return `${data.getDate()}/${data.getMonth() + 1}`;
    });
    
    const dadosPontos = ultimasTransacoes.map(item => Math.abs(item.pontos));
    
    return {
      labels,
      datasets: [
        {
          label: 'Pontos',
          data: dadosPontos,
          backgroundColor: '#28a745',
        }
      ],
    };
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Movimentação de Pontos',
      },
    },
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Carregando dados do cliente...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-5">
        <div className="alert alert-danger">{error}</div>
        <Button variant="primary" onClick={() => window.location.reload()}>
          Tentar Novamente
        </Button>
      </div>
    );
  }

  return (
    <div>
      <Row className="mb-4">
        <Col>
          <h2>Bem-vindo, {cliente?.nome.split(' ')[0]}!</h2>
          <p className="text-muted">
            Veja o resumo do seu programa de fidelidade
          </p>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={6} className="mb-3 mb-md-0">
          <Card className="dashboard-card pontos h-100">
            <Card.Body>
              <Card.Title>Seus Pontos</Card.Title>
              <div className="value">{cliente?.pontos.toLocaleString()}</div>
              <Card.Text>
                Acumule pontos abastecendo ou troque por recompensas exclusivas.
              </Card.Text>
              <Link to="/resgatar">
                <Button variant="success">Resgatar Pontos</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="dashboard-card cashback h-100">
            <Card.Body>
              <Card.Title>Seu Cashback</Card.Title>
              <div className="value">
                R$ {cliente?.cashback.toFixed(2).replace('.', ',')}
              </div>
              <Card.Text>
                Cashback disponível para desconto no próximo abastecimento.
              </Card.Text>
              <Link to="/resgatar">
                <Button variant="primary">Usar Cashback</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Atividade Recente</Card.Title>
              {historico.length > 0 ? (
                <Bar options={options} data={prepararDadosGrafico()} />
              ) : (
                <p>Sem dados para exibir</p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Últimas Transações</Card.Title>
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Data</th>
                      <th>Tipo</th>
                      <th>Pontos</th>
                      <th>Valor</th>
                    </tr>
                  </thead>
                  <tbody>
                    {historico.slice(-5).reverse().map((transacao) => (
                      <tr key={transacao.id}>
                        <td>{new Date(transacao.data).toLocaleDateString('pt-BR')}</td>
                        <td>
                          {transacao.tipo === 'acumulo' ? 'Acúmulo' : 'Resgate'}
                        </td>
                        <td>
                          {transacao.tipo === 'acumulo'
                            ? `+${transacao.pontos}`
                            : transacao.pontos}
                        </td>
                        <td>
                          {transacao.tipo === 'acumulo'
                            ? `R$ ${transacao.valor.toFixed(2).replace('.', ',')}`
                            : '-'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="text-end">
                <Link to="/historico">
                  <Button variant="outline-primary">Ver Histórico Completo</Button>
                </Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;