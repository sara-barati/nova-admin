import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { LogOut, Menu, Moon, Sun } from 'lucide-react'

import type { RootState, AppDispatch } from '../Redux/store'
import { toggleTheme } from '../Redux/settingsSlice'
import { clearCredentials } from '../Redux/authSlice'
import { removeToken } from '../Storage/authStorage'
import LanguageSwitcher from './LanguageSwitcher'

interface HeaderProps {
  sidebarOpen: boolean
  onMenuClick: () => void
}

const HeaderContainer = styled.header`
  min-height: 76px;
  padding: 0 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  background: ${({ theme }) => theme.colors.surface};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  position: sticky;
  top: 0;
  z-index: 30;

  @media (max-width: 768px) {
    min-height: 66px;
    padding: 0 18px;
  }

  @media (max-width: 480px) {
    padding: 0 14px;
    gap: 10px;
  }
`

const HeaderStart = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  min-width: 0;
`

const MenuButton = styled.button`
  display: none;
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};

  @media (max-width: 900px) { display: inline-flex; }
`

const PageBrand = styled.div`
  min-width: 0;

  strong {
    display: block;
    color: ${({ theme }) => theme.colors.text};
    font-size: 15px;
    font-weight: 750;
  }

  span {
    display: block;
    margin-top: 3px;
    color: ${({ theme }) => theme.colors.secondaryText};
    font-size: 12px;
  }

  @media (max-width: 480px) span { display: none; }
`

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  @media (max-width: 480px) { gap: 7px; }
`

const ActionButton = styled.button`
  min-height: 40px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 0 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  font-size: 13px;
  font-weight: 600;
  transition: background 0.18s ease, border-color 0.18s ease;

  &:hover { background: ${({ theme }) => theme.colors.background}; }

  @media (max-width: 520px) {
    width: 40px;
    padding: 0;
    span { display: none; }
  }
`

function Header({ sidebarOpen, onMenuClick }: HeaderProps) {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const theme = useSelector((state: RootState) => state.settings.theme)
  const { t } = useTranslation()

  const handleLogout = () => {
    removeToken()
    dispatch(clearCredentials())
    navigate('/login', { replace: true })
  }

  return (
    <HeaderContainer>
      <HeaderStart>
        <MenuButton
          type="button"
          onClick={onMenuClick}
          aria-label={sidebarOpen ? t('common.close') : t('navigation.openMenu')}
          aria-expanded={sidebarOpen}
        >
          <Menu size={20} />
        </MenuButton>
        <PageBrand>
          <strong>{t('app.name')}</strong>
          <span>{t('header.workspace')}</span>
        </PageBrand>
      </HeaderStart>

      <Actions>
        <ActionButton
          type="button"
          onClick={() => dispatch(toggleTheme())}
          aria-label={theme === 'light' ? t('header.darkMode') : t('header.lightMode')}
          title={theme === 'light' ? t('header.darkMode') : t('header.lightMode')}
        >
          {theme === 'light' ? <Moon size={17} /> : <Sun size={17} />}
          <span>{theme === 'light' ? t('header.darkMode') : t('header.lightMode')}</span>
        </ActionButton>

        <LanguageSwitcher />

        <ActionButton type="button" onClick={handleLogout} title={t('header.logout')}>
          <LogOut size={17} />
          <span>{t('header.logout')}</span>
        </ActionButton>
      </Actions>
    </HeaderContainer>
  )
}

export default Header
