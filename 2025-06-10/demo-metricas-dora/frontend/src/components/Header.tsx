import React from 'react';
import './Header.css';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <span className="logo-text">TQI</span>
        </div>
        <nav className="nav">
          <ul>
            <li className="active"><a href="#dashboard">Dashboard</a></li>
            <li><a href="#sobre">Sobre DORA</a></li>
            <li><a href="#equipes">Equipes</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;