
import type { DefaultTheme } from 'styled-components'

export const lightTheme: DefaultTheme = {
  mode: 'light',
  colors: {
    background: '#F7F8FA',
    surface: '#FFFFFF',
    text: '#20232A',
    secondaryText: '#777F8C',
    primary: '#635BDB',
    border: '#E5E7EB',
    danger: '#DC3545',
  },
}

export const darkTheme: DefaultTheme = {
  mode: 'dark',
  colors: {
    background: '#171923',
    surface: '#242735',
    text: '#F5F5F5',
    secondaryText: '#A0A5B1',
    primary: '#9B93FF',
    border: '#383D4D',
    danger: '#FF6B75',
  },
}
