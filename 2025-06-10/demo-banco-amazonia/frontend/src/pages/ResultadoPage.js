import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Table, Alert, Badge } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FiPrinter, FiDownload, FiRefreshCw } from 'react-icons/fi';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import '../styles/ResultadoPage.css';

// Registrar componentes ChartJS
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function ResultadoPage() {
  const navigate = useNavigate();
  const [resultado, setResultado] = useState(null);
  const [dadosSimulacao, setDadosSimulacao] = useState(null);

  useEffect(() => {
    // Recuperar dados da sessionStorage
    const resultadoSalvo = sessionStorage.getItem('simulacaoResultado');
    const dadosSalvos = sessionStorage.getItem('simulacaoDados');
    
    if (!resultadoSalvo || !dadosSalvos) {
      navigate('/simulador');
      return;
    }
    
    setResultado(JSON.parse(resultadoSalvo));
    setDadosSimulacao(JSON.parse(dadosSalvos));
  }, [navigate]);

  const formatarValor = (valor) => {
    return parseFloat(valor).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  // Dados para o gráfico de comparação de taxas
  const prepararDadosGrafico = () => {
    if (!resultado || !resultado.simulacoes || resultado.simulacoes.length === 0) {
      return null;
    }

    const labels = resultado.simulacoes.map(sim => sim.linha.split(' - ')[0]);
    const taxas = resultado.simulacoes.map(sim => parseFloat(sim.taxaEfetiva));
    const parcelas = resultado.simulacoes.map(sim => parseFloat(sim.valorParcela));

    const data = {
      labels,
      datasets: [
        {
          label: 'Taxa Efetiva (%)',
          data: taxas,
          backgroundColor: 'rgba(0, 102, 51, 0.7)',
          borderColor: 'rgba(0, 102, 51, 1)',
          borderWidth: 1,
        }
      ],
    };

    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Comparativo de Taxas Efetivas',
          font: {
            size: 16,
            weight: 'bold'
          }
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Taxa (%)'
          }
        }
      }
    };

    return { data, options };
  };

  // Classificar risco com base na faixa
  const classificarRisco = (faixa) => {
    switch (faixa) {
      case 'A':
        return { texto: 'Excelente', cor: 'success' };
      case 'B':
        return { texto: 'Muito Bom', cor: 'info' };
      case 'C':
        return { texto: 'Bom', cor: 'primary' };
      case 'D':
        return { texto: 'Médio', cor: 'warning' };
      case 'E':
        return { texto: 'Alto', cor: 'danger' };
      default:
        return { texto: 'Não classificado', cor: 'secondary' };
    }
  };

  // Simular impressão da página
  const handlePrint = () => {
    window.print();
  };

  // Simular download do PDF
  const handleDownload = () => {
    alert('O download do PDF seria iniciado em um cenário real.');
  };

  if (!resultado || !dadosSimulacao) {
    return (
      <Container className="my-5 text-center">
        <Alert variant="warning">
          Nenhum resultado disponível. Por favor, realize uma simulação.
        </Alert>
        <Button 
          as={Link} 
          to="/simulador" 
          variant="primary"
          className="mt-3"
        >
          Ir para o Simulador
        </Button>
      </Container>
    );
  }

  const grafico = prepararDadosGrafico();
  const classificacaoRisco = classificarRisco(resultado.perfilRisco.faixa);

  return (
    <div className="resultado-page">
      <section className="page-header">
        <Container>
          <h1 className="page-title">Resultado da Simulação</h1>
          <p className="page-description">
            Confira abaixo o resultado da sua simulação de financiamento agropecuário
          </p>
          <div className="action-buttons">
            <Button variant="outline-light" className="me-2" onClick={handlePrint}>
              <FiPrinter className="me-2" /> Imprimir
            </Button>
            <Button variant="outline-light" className="me-2" onClick={handleDownload}>
              <FiDownload className="me-2" /> Baixar PDF
            </Button>
            <Button 
              variant="warning" 
              as={Link} 
              to="/simulador"
            >
              <FiRefreshCw className="me-2" /> Nova Simulação
            </Button>
          </div>
        </Container>
      </section>

      <section className="resultado-section">
        <Container>
          <Row>
            <Col lg={8}>
              {resultado.recomendacao ? (
                <Card className="resultado-card mb-4">
                  <Card.Header as="h5" className="resultado-card-header">
                    <div className="d-flex justify-content-between align-items-center">
                      <span>
                        <i className="bi bi-star-fill me-2"></i>
                        Linha Recomendada
                      </span>
                      <Badge bg="warning" text="dark">Melhor Opção</Badge>
                    </div>
                  </Card.Header>
                  <Card.Body>
                    <h4 className="linha-titulo">{resultado.recomendacao.linha}</h4>
                    <p className="linha-descricao">{resultado.recomendacao.descricao}</p>
                    
                    <Row className="resultado-detalhes mt-4">
                      <Col sm={6} md={3} className="detalhe-item">
                        <div className="detalhe-label">Valor Solicitado</div>
                        <div className="detalhe-valor">{formatarValor(resultado.recomendacao.valorSolicitado)}</div>
                      </Col>
                      <Col sm={6} md={3} className="detalhe-item">
                        <div className="detalhe-label">Prazo</div>
                        <div className="detalhe-valor">{resultado.recomendacao.prazo} meses</div>
                      </Col>
                      <Col sm={6} md={3} className="detalhe-item">
                        <div className="detalhe-label">Taxa Efetiva</div>
                        <div className="detalhe-valor">{resultado.recomendacao.taxaEfetiva}% a.a.</div>
                      </Col>
                      <Col sm={6} md={3} className="detalhe-item">
                        <div className="detalhe-label">Valor da Parcela</div>
                        <div className="detalhe-valor">{formatarValor(resultado.recomendacao.valorParcela)}</div>
                      </Col>
                    </Row>
                    
                    <div className="economia-info mt-4">
                      <div className="economia-badge">
                        <i className="bi bi-piggy-bank me-2"></i>
                        Economia estimada: {formatarValor(resultado.recomendacao.economia)}
                      </div>
                      <p className="economia-texto">
                        Esta é a economia estimada em comparação com a taxa máxima da linha de crédito.
                      </p>
                    </div>
                    
                    <div className="cta-button mt-4">
                      <Button variant="success" size="lg">
                        Solicitar este Financiamento
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              ) : (
                <Alert variant="warning" className="mb-4">
                  Não foi possível encontrar uma linha de crédito adequada para o seu perfil.
                </Alert>
              )}
              
              {grafico && (
                <Card className="grafico-card mb-4">
                  <Card.Header as="h5" className="grafico-card-header">
                    <i className="bi bi-graph-up me-2"></i>
                    Comparativo de Opções
                  </Card.Header>
                  <Card.Body>
                    <div className="grafico-container">
                      <Bar data={grafico.data} options={grafico.options} />
                    </div>
                  </Card.Body>
                </Card>
              )}
              
              {resultado.simulacoes && resultado.simulacoes.length > 0 && (
                <Card className="tabela-card">
                  <Card.Header as="h5" className="tabela-card-header">
                    <i className="bi bi-table me-2"></i>
                    Todas as Opções de Financiamento
                  </Card.Header>
                  <Card.Body>
                    <div className="table-responsive">
                      <Table hover>
                        <thead>
                          <tr>
                            <th>Linha de Crédito</th>
                            <th>Taxa</th>
                            <th>Parcela</th>
                            <th>Total</th>
                            <th>Ações</th>
                          </tr>
                        </thead>
                        <tbody>
                          {resultado.simulacoes.map((simulacao, index) => (
                            <tr key={index} className={index === 0 ? 'table-success' : ''}>
                              <td>
                                {simulacao.linha}
                                {index === 0 && <Badge bg="warning" text="dark" className="ms-2">Recomendado</Badge>}
                              </td>
                              <td>{simulacao.taxaEfetiva}% a.a.</td>
                              <td>{formatarValor(simulacao.valorParcela)}</td>
                              <td>{formatarValor(simulacao.valorTotal)}</td>
                              <td>
                                <Button variant="outline-primary" size="sm">Detalhes</Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>
                  </Card.Body>
                </Card>
              )}
            </Col>
            
            <Col lg={4}>
              <Card className="perfil-card mb-4">
                <Card.Header as="h5" className="perfil-card-header">
                  <i className="bi bi-person-badge me-2"></i>
                  Seu Perfil de Risco
                </Card.Header>
                <Card.Body>
                  <div className="perfil-info">
                    <div className="perfil-faixa mb-3">
                      <span className="perfil-label">Classificação:</span>
                      <Badge 
                        bg={classificacaoRisco.cor} 
                        className="perfil-badge"
                      >
                        {classificacaoRisco.texto} ({resultado.perfilRisco.faixa})
                      </Badge>
                    </div>
                    
                    <div className="perfil-score mb-3">
                      <span className="perfil-label">Score Adicional:</span>
                      <div className="score-progress">
                        <div 
                          className="score-bar" 
                          style={{ width: `${resultado.perfilRisco.scoreAdicional}%` }}
                        ></div>
                        <span className="score-value">{resultado.perfilRisco.scoreAdicional}/100</span>
                      </div>
                    </div>
                    
                    <div className="perfil-ajuste mb-3">
                      <span className="perfil-label">Faixa Ajustada:</span>
                      <span className={`ajuste-valor ${resultado.perfilRisco.faixaAjustada === 'Sim' ? 'text-success' : ''}`}>
                        {resultado.perfilRisco.faixaAjustada}
                      </span>
                    </div>
                    
                    <div className="perfil-tip mt-4">
                      <div className="tip-icon">
                        <i className="bi bi-lightbulb-fill"></i>
                      </div>
                      <div className="tip-content">
                        <h6>Dica para melhorar seu perfil</h6>
                        <p>
                          {resultado.perfilRisco.faixa === 'A' || resultado.perfilRisco.faixa === 'B' 
                            ? 'Seu perfil já está excelente! Continue mantendo bons históricos de pagamento e gestão financeira.'
                            : 'Aumentar o tempo de atividade e área produtiva pode melhorar seu perfil e reduzir taxas.'}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
              
              <Card className="dados-card">
                <Card.Header as="h5" className="dados-card-header">
                  <i className="bi bi-clipboard-data me-2"></i>
                  Dados da Simulação
                </Card.Header>
                <Card.Body>
                  <Table className="dados-table" borderless size="sm">
                    <tbody>
                      <tr>
                        <td className="fw-bold">Valor Solicitado:</td>
                        <td>{formatarValor(dadosSimulacao.valorSolicitado)}</td>
                      </tr>
                      <tr>
                        <td className="fw-bold">Prazo:</td>
                        <td>{dadosSimulacao.prazo} meses</td>
                      </tr>
                      <tr>
                        <td className="fw-bold">Renda Anual:</td>
                        <td>{formatarValor(dadosSimulacao.rendaAnual)}</td>
                      </tr>
                      <tr>
                        <td className="fw-bold">Tipo de Atividade:</td>
                        <td className="text-capitalize">{dadosSimulacao.tipo}</td>
                      </tr>
                      <tr>
                        <td className="fw-bold">Finalidade:</td>
                        <td className="text-capitalize">{dadosSimulacao.finalidade}</td>
                      </tr>
                      <tr>
                        <td className="fw-bold">Tempo de Atividade:</td>
                        <td>{dadosSimulacao.tempoAtividade} anos</td>
                      </tr>
                      <tr>
                        <td className="fw-bold">Área Produtiva:</td>
                        <td>{dadosSimulacao.areaProdutiva} hectares</td>
                      </tr>
                      <tr>
                        <td className="fw-bold">Outros Financiamentos:</td>
                        <td>{dadosSimulacao.possuiOutrosFinanciamentos ? 'Sim' : 'Não'}</td>
                      </tr>
                    </tbody>
                  </Table>
                  
                  <div className="dados-buttons mt-3">
                    <Button 
                      as={Link} 
                      to="/simulador" 
                      variant="outline-success" 
                      className="w-100"
                    >
                      Alterar Dados
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          
          <div className="resultado-footer mt-5">
            <Alert variant="info">
              <Alert.Heading>Importante</Alert.Heading>
              <p>
                Esta simulação é apenas uma estimativa baseada nos dados fornecidos. 
                Os valores reais podem variar após análise de crédito completa.
              </p>
              <p className="mb-0">
                Para prosseguir com o financiamento, visite uma de nossas agências ou entre em contato 
                com um de nossos gerentes.
              </p>
            </Alert>
          </div>
        </Container>
      </section>
    </div>
  );
}

export default ResultadoPage;