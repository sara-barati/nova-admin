import axiosInstance from '../api/axiosInstance'

import type {
  LoginCredentials,
  LoginResponse,
} from '../../types/auth'

const login = async (
  credentials: LoginCredentials
): Promise<LoginResponse> => {
  const response = await axiosInstance.post<LoginResponse>(
    '/auth/login',
    credentials
  )

  return response.data
}

const authService = {
  login,
}

export default authService