import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Historico from './pages/Historico';
import Acumular from './pages/Acumular';
import Resgatar from './pages/Resgatar';
import Perfil from './pages/Perfil';

function App() {
  return (
    <Router>
      <Header />
      <Container className="py-4">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/historico" element={<Historico />} />
          <Route path="/acumular" element={<Acumular />} />
          <Route path="/resgatar" element={<Resgatar />} />
          <Route path="/perfil" element={<Perfil />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;