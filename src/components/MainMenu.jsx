import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import styled from 'styled-components';

// Styled-components
const MainMenuWrapper = styled.div`
  display: flex;
  height: 100vh;
  color: #1c4788;
  position: relative;
`;

const SideMenu = styled.div`
  width: ${props => (props.isOpen ? '200px' : '0')};
  background-color: #D5CAC8;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: ${props => (props.isOpen ? '20px' : '0')};
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  transition: width 0.3s ease, padding 0.3s ease;
  overflow: hidden;
  position: relative;
`;

const MenuList = styled.ul`
  list-style: none;
  padding: 0;
`;

const MenuItem = styled.li`
  margin-bottom: 10px;
`;

const LogoutButton = styled.button`
  align-self: center;
  padding: 15px;
  width: 55%;
  border: none;
  background-color: #ff0000;
  color: white;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background-color: #000000;
  }
`;

const Content = styled.div`
  flex: 1;
  padding: 20px;
  transition: margin-left 0.3s ease;
  margin-left: ${props => (props.isMenuOpen ? '200px' : '0')};
`;

const ToggleButton = styled.button`
  position: absolute;
  top: 20px;
  left: ${props => (props.isMenuOpen ? '200px' : '10px')}; /* Position next to the menu */
  background: transparent;
  border: none;
  cursor: pointer;
  z-index: 10;
  transition: left 0.3s ease;
  font-size: 24px;
`;

const ActiveLink = styled(NavLink)`
  color: #000; /* Set color to black for all links */
  text-decoration: none; /* Remove underline from links */

  &.active {
    font-weight: bold;
    color: #ff0000; /* Set color to red for active link */
  }

  &:hover {
    text-decoration: underline; /* Optional: underline on hover */
  }
`;

const MainMenu = ({ onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  const toggleMenu = () => {
    setIsMenuOpen(prevState => !prevState);
  };

  return (
    <MainMenuWrapper>
      <SideMenu isOpen={isMenuOpen}>
        <nav>
          <MenuList>
            <MenuItem>
              <ActiveLink to="/main/calendar">Takvim</ActiveLink>
            </MenuItem>
            <MenuItem>
              <ActiveLink to="/main/exchange-rates">Döviz Kurları</ActiveLink>
            </MenuItem>
            <MenuItem>
              <ActiveLink to="/main/surveys">Anketler</ActiveLink>
            </MenuItem>
          </MenuList>
        </nav>
        <LogoutButton onClick={onLogout}>Oturumu Kapat</LogoutButton>
      </SideMenu>
      <Content isMenuOpen={isMenuOpen}>
        <ToggleButton isMenuOpen={isMenuOpen} onClick={toggleMenu}>
          <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
          </svg>
        </ToggleButton>
        <Outlet />
      </Content>
    </MainMenuWrapper>
  );
};

export default MainMenu;
