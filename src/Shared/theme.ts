import type { DefaultTheme } from 'styled-components'

export const lightTheme: DefaultTheme = {
  mode: 'light',
  colors: {
    background: '#F7F8FA',
    surface: '#FFFFFF',
    text: '#172B45',
    secondaryText: '#68778B',
    primary: '#172B45',
    accent: '#F36F21',
    border: '#E4E8EE',
    danger: '#DC3545',
  },
}

export const darkTheme: DefaultTheme = {
  mode: 'dark',
  colors: {
    background: '#111B2A',
    surface: '#1B293B',
    text: '#F4F7FB',
    secondaryText: '#AAB6C6',
    primary: '#172B45',
    accent: '#FF873D',
    border: '#344358',
    danger: '#FF737D',
  },
}
