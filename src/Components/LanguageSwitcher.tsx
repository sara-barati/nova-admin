import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { Languages } from 'lucide-react'

const LanguageButton = styled.button`
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
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;

  &:hover { background: ${({ theme }) => theme.colors.background}; }

  @media (max-width: 520px) {
    width: 40px;
    padding: 0;
    span { display: none; }
  }
`

function LanguageSwitcher() {
  const { i18n } = useTranslation()
  const language = i18n.resolvedLanguage || i18n.language

  const changeLanguage = () => {
    void i18n.changeLanguage(language.startsWith('fa') ? 'en' : 'fa')
  }

  return (
    <LanguageButton
      type="button"
      onClick={changeLanguage}
      aria-label={language.startsWith('fa') ? 'Switch to English' : 'تغییر زبان به فارسی'}
      title={language.startsWith('fa') ? 'English' : 'فارسی'}
    >
      <Languages size={17} />
      <span>{language.startsWith('fa') ? 'English' : 'فارسی'}</span>
    </LanguageButton>
  )
}

export default LanguageSwitcher
