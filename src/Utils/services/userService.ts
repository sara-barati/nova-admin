import axiosInstance from '../api/axiosInstance'

import type { User, CreateUser } from '../../types/user'

const getUsers = async (): Promise<User[]> => {
  const response = await axiosInstance.get<User[]>('/users')

  return response.data
}

const createUser = async (user: CreateUser): Promise<User> => {
  const response = await axiosInstance.post<User>('/users', user)

  return response.data
}

const userService = {
  getUsers,
  createUser,
}

export default userService
