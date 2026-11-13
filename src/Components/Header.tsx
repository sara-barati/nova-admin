import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import type { RootState, AppDispatch } from '../Redux/store'
import { toggleTheme } from '../Redux/settingsSlice'
import i18n from '../Dictionary/i18n'

const HeaderContainer = styled.header`
  height: 72px;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${({ theme }) => theme.colors.surface};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`

const ActionButton = styled.button`
  padding: 8px 14px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
`

function Header() {
  const dispatch = useDispatch<AppDispatch>()

  const theme = useSelector(
    (state: RootState) => state.settings.theme
  )

  const { t } = useTranslation()

  const handleThemeChange = () => {
    dispatch(toggleTheme())
  }

  const handleLanguageChange = () => {
    const newLanguage = i18n.language === 'fa' ? 'en' : 'fa'

    i18n.changeLanguage(newLanguage)

    document.documentElement.dir =
      newLanguage === 'fa' ? 'rtl' : 'ltr'
  }

  return (
    <HeaderContainer>
      <h3>{t('appName')}</h3>

      <Actions>
        <ActionButton onClick={handleThemeChange}>
          {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
        </ActionButton>

        <ActionButton onClick={handleLanguageChange}>
          {i18n.language === 'fa' ? 'English' : 'فارسی'}
        </ActionButton>
      </Actions>
    </HeaderContainer>
  )
}

export default Header