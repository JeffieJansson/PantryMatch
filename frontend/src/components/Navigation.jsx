import styled from "styled-components";
import { media } from "../styles/media";
import { Link } from "react-router-dom";

const NavContainer = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ffffff;
  padding: 0.7rem 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media ${media.tablet} {
    padding: 1rem 0;
  }
  @media ${media.desktop} {
    padding: 1.2rem 0;
  }
`;

const NavList = styled.ul`
  display: flex;
  gap: 1rem;
  list-style: none;
  margin: 0;
  padding: 0;
  flex-wrap: nowrap;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  &::-webkit-scrollbar { display: none; }

  @media ${media.tablet} {
    gap: 2rem;
    font-size: 1.05rem;
  }
  @media ${media.desktop} {
    gap: 2.5rem;
    font-size: 1.1rem;
  }
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
  font-size: 1rem;
  text-decoration: none;
  transition: color 0.2s;
  padding: 0.2rem 0.3rem;
  &:hover {
    color: #4e8cff;
  }

  @media ${media.tablet} {
    font-size: 1.08rem;
    padding: 0.3rem 0.5rem;
  }
  @media ${media.desktop} {
    font-size: 1.1rem;
    padding: 0.4rem 0.7rem;
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
        <NavLink to="/about">About</NavLink>
      </NavItem>
      <NavItem>
        <NavLink to="/member">Login</NavLink>
      </NavItem>
    </NavList>
  </NavContainer>
);

export default Navigation;
