import { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { DropDown, DropDownItem, Separator } from './DropDown';
import { FiHome, FiMap, FiUsers, FiBox, FiCompass, FiGrid, FiSettings, FiChevronLeft } from 'react-icons/fi';

const SidebarContainer = styled.div<{ collapsed: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  background: #fafafa;
  border-right: 1px solid #f0f0f0;
  width: ${props => props.collapsed ? '78px' : '280px'};
  padding: 32px 0;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
`;

const NavLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 0 16px;
`;

const NavLink = styled(Link)<{ collapsed: boolean }>`
  padding: 12px 16px;
  color: #64748b;
  text-decoration: none;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 16px;
  border-radius: 12px;
  font-weight: 500;
  
  &:hover {
    background: #f1f5f9;
    color: #0f172a;
    transform: translateX(4px);
  }

  &.active {
    background: #f1f5f9;
    color: #0f172a;
  }

  span {
    display: ${props => props.collapsed ? 'none' : 'block'};
    font-size: 14px;
  }
`;

const SectionSeparator = styled.div<{ collapsed: boolean }>`
  padding: ${props => props.collapsed ? '8px' : '8px 16px'};
  font-size: 11px;
  color: #94a3b8;
  letter-spacing: 0.05em;
  font-weight: 600;
  margin-top: 24px;
  margin-bottom: 8px;
`;

const UserSection = styled.div<{ collapsed: boolean }>`
  padding: 16px;
  margin: 0 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  border-radius: 12px;
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    background: #f1f5f9;
  }
`;

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: #e2e8f0;
  position: relative;
  overflow: hidden;
`;

const OnlineStatus = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #10b981;
  border: 2px solid #fafafa;
  position: absolute;
  bottom: 2px;
  right: 2px;
`;

const CollapseButton = styled.button<{ collapsed: boolean }>`
  position: absolute;
  right: -12px;
  top: 32px;
  width: 24px;
  height: 24px;
  border-radius: 8px;
  background: #fafafa;
  border: 1px solid #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transform: ${props => props.collapsed ? 'rotate(180deg)' : 'none'};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

  &:hover {
    background: #f1f5f9;
    transform: ${props => props.collapsed ? 'rotate(180deg) scale(1.1)' : 'scale(1.1)'};
  }
`;
const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <SidebarContainer collapsed={collapsed}>
      <CollapseButton 
        collapsed={collapsed}
        onClick={() => setCollapsed(!collapsed)}
      >
        <FiChevronLeft size={14} />
      </CollapseButton>

      <NavLinks>
        <NavLink to="/dashboard" collapsed={collapsed}>
          <FiHome size={20} />
          <span>Dashboard</span>
        </NavLink>

        <SectionSeparator collapsed={collapsed}>
          {!collapsed && 'Gestión'}
        </SectionSeparator>
        
        <NavLink to="/routes" collapsed={collapsed}>
          <FiMap size={20} />
          <span>Rutas</span>
        </NavLink>
        <NavLink to="/clientes" collapsed={collapsed}>
          <FiUsers size={20} />
          <span>Clientes</span>
        </NavLink>
        <NavLink to="/articulos" collapsed={collapsed}>
          <FiBox size={20} />
          <span>Artículos</span>
        </NavLink>

        <SectionSeparator collapsed={collapsed}>
          {!collapsed && 'Configuración'}
        </SectionSeparator>

        <NavLink to="/spins" collapsed={collapsed}>
          <FiCompass size={20} />
          <span>Giros</span>
        </NavLink>
        <NavLink to="/groups" collapsed={collapsed}>
          <FiGrid size={20} />
          <span>Grupos</span>
        </NavLink>
        <NavLink to="/users" collapsed={collapsed}>
          <FiUsers size={20} />
          <span>Usuarios</span>
        </NavLink>
      </NavLinks>

      <UserSection collapsed={collapsed}>
        <Avatar>
          <OnlineStatus />
        </Avatar>
        {!collapsed && (
          <DropDown 
            trigger={
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>Usuario</span>
                <FiSettings size={14} />
              </div>
            }
            position="top-left"
          >
            <DropDownItem>Mi Perfil</DropDownItem>
            <Separator />
            <DropDownItem>Configuración</DropDownItem>
            <Separator />
            <DropDownItem>Cerrar Sesión</DropDownItem>
          </DropDown>
        )}
      </UserSection>
    </SidebarContainer>
  );
};

export default Sidebar;