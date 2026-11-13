import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { LayoutDashboard, Package, Users, X } from 'lucide-react'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

const Backdrop = styled.button<{ $open: boolean }>`
  display: none;

  @media (max-width: 900px) {
    display: ${({ $open }) => ($open ? 'block' : 'none')};
    position: fixed;
    inset: 0;
    z-index: 40;
    border: 0;
    background: rgba(15, 23, 42, 0.48);
  }
`

const SidebarContainer = styled.aside<{ $open: boolean }>`
  width: 250px;
  min-height: 100vh;
  flex: 0 0 250px;
  padding: 28px 18px;
  background: #172B45;
  border-inline-end: 1px solid #263F5C;
  position: sticky;
  top: 0;
  height: 100vh;
  z-index: 50;

  @media (max-width: 900px) {
    position: fixed;
    inset-block: 0;
    inset-inline-start: 0;
    width: min(290px, 84vw);
    min-height: 100dvh;
    height: 100dvh;
    box-shadow: 0 18px 50px rgba(15, 23, 42, 0.16);
    transform: ${({ $open }) => ($open ? 'translateX(0)' : 'translateX(-110%)')};
    transition: transform 0.25s ease;
    html[dir='rtl'] & {
      transform: ${({ $open }) => ($open ? 'translateX(0)' : 'translateX(110%)')};
    }
  }
`

const SidebarTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 42px;
  padding: 0 8px;
`

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: #FFFFFF;
  font-size: 22px;
  font-weight: 800;
  letter-spacing: 1px;
`

const LogoMark = styled.span`
  width: 34px;
  height: 34px;
  display: grid;
  place-items: center;
  border-radius: 11px;
  color: #fff;
  background: ${({ theme }) => theme.colors.accent};
  font-size: 17px;
`

const CloseButton = styled.button`
  display: none;
  border: 0;
  padding: 7px;
  border-radius: 8px;
  color: #C4D0DE;
  background: transparent;

  &:hover { background: #263F5C; }

  @media (max-width: 900px) { display: inline-flex; }
`

const MenuLabel = styled.p`
  padding: 0 12px;
  margin-bottom: 12px;
  color: #AAB8CA;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1.2px;
  text-transform: uppercase;
`

const Menu = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 7px;
`

const MenuLink = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 12px;
  min-height: 46px;
  padding: 0 13px;
  border-radius: 11px;
  color: #C4D0DE;
  font-size: 14px;
  font-weight: 600;
  transition: background 0.18s ease, color 0.18s ease;

  &:hover {
    color: #FFFFFF;
    background: #263F5C;
  }

  &.active {
    color: #fff;
    background: ${({ theme }) => theme.colors.accent};
    box-shadow: 0 8px 18px ${({ theme }) => theme.colors.accent}44;
  }

  svg { flex-shrink: 0; }
`

function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { t } = useTranslation()

  return (
    <>
      <Backdrop
        type="button"
        aria-label={t('common.close')}
        $open={isOpen}
        onClick={onClose}
      />
      <SidebarContainer $open={isOpen}>
        <SidebarTop>
          <Logo>
            <LogoMark>N</LogoMark>
            NOVA
          </Logo>
          <CloseButton type="button" onClick={onClose} aria-label={t('common.close')}>
            <X size={20} />
          </CloseButton>
        </SidebarTop>

        <MenuLabel>{t('navigation.menu')}</MenuLabel>
        <Menu>
          <MenuLink to="/dashboard" onClick={onClose}>
            <LayoutDashboard size={18} />
            <span>{t('navigation.dashboard')}</span>
          </MenuLink>
          <MenuLink to="/products" onClick={onClose}>
            <Package size={18} />
            <span>{t('navigation.products')}</span>
          </MenuLink>
          <MenuLink to="/users" onClick={onClose}>
            <Users size={18} />
            <span>{t('navigation.users')}</span>
          </MenuLink>
        </Menu>
      </SidebarContainer>
    </>
  )
}

export default Sidebar
