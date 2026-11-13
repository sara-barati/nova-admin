import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { getToken } from '../Storage/authStorage'

interface AuthState {
  token: string | null
}

const initialState: AuthState = {
  token: getToken(),
}

const authSlice = createSlice({
  name: 'auth',
  initialState,

  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload
    },

    clearCredentials: (state) => {
      state.token = null
    },
  },
})

export const { setToken, clearCredentials } = authSlice.actions

export default authSlice.reducer