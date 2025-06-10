import React from 'react';
import { Nav, Image } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { 
  FaTachometerAlt, 
  FaUsers, 
  FaCalculator, 
  FaChartBar
} from 'react-icons/fa';

const Sidebar = () => {
  const location = useLocation();
  
  return (
    <div className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
      <div className="sidebar-sticky pt-3">
        <div className="text-center mb-4 d-none d-md-block">
          <Image 
            src="/images/goiasfomento-logo-new.png" 
            alt="GoiasFomento Logo" 
            width="80%" 
            className="img-fluid"
          />
        </div>
        <Nav className="flex-column">
          <Nav.Item>
            <Nav.Link 
              as={Link} 
              to="/" 
              className={location.pathname === '/' ? 'active' : ''}
            >
              <FaTachometerAlt className="me-2" />
              Dashboard
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link 
              as={Link} 
              to="/clientes" 
              className={location.pathname.includes('/clientes') ? 'active' : ''}
            >
              <FaUsers className="me-2" />
              Clientes
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link 
              as={Link} 
              to="/simulacao" 
              className={location.pathname === '/simulacao' ? 'active' : ''}
            >
              <FaCalculator className="me-2" />
              Simulação de Crédito
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link 
              as={Link} 
              to="/relatorios" 
              className={location.pathname === '/relatorios' ? 'active' : ''}
            >
              <FaChartBar className="me-2" />
              Relatórios
            </Nav.Link>
          </Nav.Item>
        </Nav>
        
        <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
          <span>Configurações</span>
        </h6>
        <Nav className="flex-column mb-2">
          <Nav.Item>
            <Nav.Link href="#">
              Perfil
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="#">
              Parâmetros
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="#">
              Suporte
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;