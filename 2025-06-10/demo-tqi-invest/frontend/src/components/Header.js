import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <div className="container header-container">
        <div className="logo">
          <i className="fas fa-chart-line"></i>
          <span>TQI Invest</span>
        </div>
        <ul className="nav-menu">
          <li><Link to="/">Dashboard</Link></li>
          <li><Link to="/investimentos">Investimentos</Link></li>
        </ul>
      </div>
    </header>
  );
};

export default Header;