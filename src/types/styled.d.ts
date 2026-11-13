
import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    mode: 'light' | 'dark'
    colors: {
      background: string
      surface: string
      text: string
      secondaryText: string
      primary: string
      border: string
      danger: string
    }
  }
}
