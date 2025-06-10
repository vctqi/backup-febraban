import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import LogoComponent from '../../assets/logo';

const HeaderContainer = styled.header`
  background-color: var(--primary-color);
  color: white;
  padding: 0;
`;

const TopBar = styled.div`
  background-color: #003017;
  padding: 8px 0;
  font-size: 12px;
`;

const TopBarContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const GovLinks = styled.div`
  display: flex;
  gap: 20px;
  
  a {
    color: white;
    text-decoration: none;
    font-size: 12px;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 15px 20px;
`;

const Logo = styled.div`
  img {
    height: 50px;
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 20px;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-weight: 500;
  padding: 8px 12px;
  border-radius: 4px;
  transition: background-color 0.3s ease;
  
  &:hover, &.active {
    background-color: var(--secondary-color);
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const NavMobile = styled.div`
  display: none;
  flex-direction: column;
  background-color: var(--primary-color);
  padding: 20px;
  
  @media (max-width: 768px) {
    display: ${props => props.isOpen ? 'flex' : 'none'};
  }
  
  a {
    color: white;
    text-decoration: none;
    padding: 10px 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    
    &:last-child {
      border-bottom: none;
    }
  }
`;

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  return (
    <HeaderContainer>
      <TopBar>
        <TopBarContent>
          <Link to="/" style={{ color: 'white' }}>
            gov.br
          </Link>
          <GovLinks>
            <a href="#">COMUNICA BR</a>
            <a href="#">ACESSO À INFORMAÇÃO</a>
            <a href="#">PARTICIPE</a>
            <a href="#">LEGISLAÇÃO</a>
            <a href="#">ÓRGÃOS DO GOVERNO</a>
          </GovLinks>
        </TopBarContent>
      </TopBar>
      
      <NavContainer>
        <Logo>
          <Link to="/">
            <LogoComponent />
          </Link>
        </Logo>
        
        <MobileMenuButton onClick={toggleMobileMenu}>
          ☰
        </MobileMenuButton>
        
        <Nav className="desktop-nav">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/simulador">Simulador</NavLink>
          <NavLink to="/sobre">Sobre o Financiamento</NavLink>
          <NavLink to="/contato">Contato</NavLink>
        </Nav>
      </NavContainer>
      
      <NavMobile isOpen={mobileMenuOpen}>
        <Link to="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
        <Link to="/simulador" onClick={() => setMobileMenuOpen(false)}>Simulador</Link>
        <Link to="/sobre" onClick={() => setMobileMenuOpen(false)}>Sobre o Financiamento</Link>
        <Link to="/contato" onClick={() => setMobileMenuOpen(false)}>Contato</Link>
      </NavMobile>
    </HeaderContainer>
  );
};

export default Header;