import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const NavContainer = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f8f8f8;
  padding: 1rem 0;
  box-shadow: 0 2px 4px rgba(0,0,0,0.03);
`;

const NavList = styled.ul`
  display: flex;
  gap: 2rem;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const NavItem = styled.li`
  font-size: 1.1rem;
`;

const NavLink = styled(Link)`
  background: none;
  border: none;
  color: #333;
  font-weight: 600;
  cursor: pointer;
  font-size: 1.1rem;
  text-decoration: none;
  transition: color 0.2s;
  &:hover {
    color: #4e8cff;
  }
`;

const Navigation = () => (
  <NavContainer>
    <NavList>
      <NavItem>
        <NavLink to="/">Home</NavLink>
      </NavItem>
      <NavItem>
        <NavLink to="/saved">Saved Recipes</NavLink>
      </NavItem>
      <NavItem>
        <NavLink to="/about">About this app</NavLink>
      </NavItem>
    </NavList>
  </NavContainer>
);

export default Navigation;
