import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const SidebarContainer = styled.aside`
  width: 240px;
  min-height: 100vh;
  padding: 24px 16px;
  background: ${({ theme }) => theme.colors.surface};
  border-inline-end: 1px solid ${({ theme }) => theme.colors.border};
`

const Logo = styled.h2`
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 40px;
`

const Menu = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const MenuLink = styled(NavLink)`
  padding: 12px 16px;
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.text};

  &.active {
    background: ${({ theme }) => theme.colors.primary};
    color: white;
  }

  &:hover {
    background: ${({ theme }) => theme.colors.background};
  }
`

function Sidebar() {
  const { t } = useTranslation()

  return (
    <SidebarContainer>
      <Logo>NOVA</Logo>

      <Menu>
        <MenuLink to="/dashboard">
          {t('dashboard')}
        </MenuLink>

        <MenuLink to="/products">
          {t('products')}
        </MenuLink>

        <MenuLink to="/users">
          {t('users')}
        </MenuLink>
      </Menu>
    </SidebarContainer>
  )
}

export default Sidebar