
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

type ThemeMode = 'light' | 'dark'

interface SettingsState {
  theme: ThemeMode
}

const initialState: SettingsState = {
  theme: 'light',
}

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<ThemeMode>) => {
      state.theme = action.payload
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light'
    },
  },
})

export const { setTheme, toggleTheme } = settingsSlice.actions
export default settingsSlice.reducer
