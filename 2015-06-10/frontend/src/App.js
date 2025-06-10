import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import ListaClientes from './pages/ListaClientes';
import DetalhesCliente from './pages/DetalhesCliente';
import SimulacaoCredito from './pages/SimulacaoCredito';
import Relatorios from './pages/Relatorios';

function App() {
  return (
    <Router>
      <div className="wrapper">
        <Header />
        <div className="container-fluid">
          <div className="row">
            <Sidebar />
            <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 py-4">
              <Container fluid>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/clientes" element={<ListaClientes />} />
                  <Route path="/clientes/:id" element={<DetalhesCliente />} />
                  <Route path="/simulacao" element={<SimulacaoCredito />} />
                  <Route path="/relatorios" element={<Relatorios />} />
                </Routes>
              </Container>
            </main>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;