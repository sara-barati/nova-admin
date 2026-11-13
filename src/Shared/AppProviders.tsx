import type { ReactNode } from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

import type { RootState } from '../Redux/store'
import { lightTheme, darkTheme } from './theme'
import GlobalStyles from './GlobalStyles'

interface AppProvidersProps {
  children: ReactNode
}

function AppProviders({ children }: AppProvidersProps) {
  const themeMode = useSelector(
    (state: RootState) => state.settings.theme
  )

  const theme = themeMode === 'light' ? lightTheme : darkTheme

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <BrowserRouter>
        {children}
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default AppProviders