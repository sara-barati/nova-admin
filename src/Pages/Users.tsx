import { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import Swal from 'sweetalert2'

import 'sweetalert2/dist/sweetalert2.min.css'

import userService from '../Utils/services/userService'
import UserForm from '../Components/UserForm'

import type { User, CreateUser } from '../types/user'

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
`

const SearchInput = styled.input`
  width: 100%;
  max-width: 350px;
  padding: 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
`

const PrimaryButton = styled.button`
  padding: 10px 18px;
  border: none;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
`

const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
`

const UserTable = styled.table`
  width: 100%;
  min-width: 650px;
  border-collapse: collapse;
  background: ${({ theme }) => theme.colors.surface};

  th,
  td {
    padding: 16px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    text-align: start;
    color: ${({ theme }) => theme.colors.text};
  }

  th {
    background: ${({ theme }) => theme.colors.background};
  }
`

const StatusMessage = styled.p`
  padding: 24px;
  text-align: center;
  color: ${({ theme }) => theme.colors.secondaryText};
`

function Users() {
  const [users, setUsers] = useState<User[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showForm, setShowForm] = useState(false)

  const fetchUsers = useCallback(async () => {
    setLoading(true)
    setError('')

    try {
      const data = await userService.getUsers()
      setUsers(data)
    } catch {
      setError('Failed to load users. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  const handleAddUser = async (values: CreateUser) => {
    try {
      const responseUser = await userService.createUser(values)

      const newUser: User = {
        ...values,
        ...responseUser,
        id: responseUser.id ?? Date.now(),
        name: responseUser.name ?? values.name,
      }

      setUsers((currentUsers) => [newUser, ...currentUsers])

      setShowForm(false)

      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'User added successfully!',
        showConfirmButton: false,
        timer: 2500,
      })
    } catch {
      Swal.fire({
        icon: 'error',
        title: 'Something went wrong!',
        text: 'Failed to add user. Please try again.',
        confirmButtonText: 'OK',
      })
    }
  }

  const filteredUsers = users.filter((user) => {
    const searchValue = search.trim().toLowerCase()

    const firstName = user.name?.firstname ?? ''
    const lastName = user.name?.lastname ?? ''

    const fullName = `${firstName} ${lastName}`.toLowerCase()

    const username = user.username?.toLowerCase() ?? ''
    const email = user.email?.toLowerCase() ?? ''

    return (
      fullName.includes(searchValue) ||
      username.includes(searchValue) ||
      email.includes(searchValue)
    )
  })

  if (loading) {
    return <StatusMessage>Loading users...</StatusMessage>
  }

  if (error) {
    return (
      <PageContainer>
        <StatusMessage>{error}</StatusMessage>

        <PrimaryButton onClick={fetchUsers}>Try Again</PrimaryButton>
      </PageContainer>
    )
  }

  return (
    <PageContainer>
      <PageHeader>
        <h1>Users</h1>

        <PrimaryButton onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Close Form' : 'Add User'}
        </PrimaryButton>
      </PageHeader>

      {showForm && (
        <UserForm
          onSubmit={handleAddUser}
          onCancel={() => setShowForm(false)}
        />
      )}

      <SearchInput
        type="text"
        placeholder="Search users..."
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />

      {filteredUsers.length === 0 ? (
        <StatusMessage>
          {search ? 'No users found.' : 'There are no users yet.'}
        </StatusMessage>
      ) : (
        <TableWrapper>
          <UserTable>
            <thead>
              <tr>
                <th>ID</th>
                <th>Full Name</th>
                <th>Username</th>
                <th>Email</th>
                <th>Phone</th>
              </tr>
            </thead>

            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>

                  <td>
                    {user.name?.firstname ?? ''} {user.name?.lastname ?? ''}
                  </td>

                  <td>{user.username}</td>

                  <td>{user.email}</td>

                  <td>{user.phone}</td>
                </tr>
              ))}
            </tbody>
          </UserTable>
        </TableWrapper>
      )}
    </PageContainer>
  )
}

export default Users
