import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const HeaderContainer = styled.header`
  background-color: #00843D;
  padding: 0.5rem 2rem;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  display: flex;
  align-items: center;

  img {
    height: 40px;
    margin-right: 10px;
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 1.5rem;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`;

const TopBar = styled.div`
  background-color: #004B21;
  color: white;
  padding: 0.3rem 2rem;
  font-size: 0.8rem;
  display: flex;
  justify-content: flex-end;
`;

const TopBarLink = styled.a`
  color: white;
  text-decoration: none;
  margin-left: 1rem;

  &:hover {
    text-decoration: underline;
  }
`;

const Header: React.FC = () => {
  return (
    <>
      <TopBar>
        <TopBarLink href="#">Acesso à Informação</TopBarLink>
        <TopBarLink href="#">Participe</TopBarLink>
        <TopBarLink href="#">Legislação</TopBarLink>
        <TopBarLink href="#">Órgãos do Governo</TopBarLink>
      </TopBar>
      <HeaderContainer>
        <Logo>
          <img src="/logo.png" alt="Banco da Amazônia" />
          <span>BANCO DA AMAZÔNIA</span>
        </Logo>
        <Nav>
          <NavLink to="/">Para você</NavLink>
          <NavLink to="/">Empresas</NavLink>
          <NavLink to="/">Rural</NavLink>
          <NavLink to="/">Financiamentos</NavLink>
          <NavLink to="/">Atendimento</NavLink>
          <NavLink to="/">O Banco</NavLink>
        </Nav>
      </HeaderContainer>
    </>
  );
};

export default Header;