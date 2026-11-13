import { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import Swal from 'sweetalert2'
import { useTranslation } from 'react-i18next'

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

  h1 {
    color: ${({ theme }) => theme.colors.text};
    font-size: clamp(22px, 3vw, 28px);
  }

  @media (max-width: 560px) {
    align-items: stretch;
    flex-direction: column;
  }
`

const SearchInput = styled.input`
  width: 100%;
  max-width: 380px;
  min-height: 46px;
  padding: 0 14px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 10px;
  outline: none;
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};

  &:focus { border-color: ${({ theme }) => theme.colors.accent}; }

  @media (max-width: 560px) { max-width: none; }
`

const PrimaryButton = styled.button`
  min-height: 44px;
  padding: 0 18px;
  border: none;
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.accent};
  color: white;
  transition: filter .18s ease, transform .18s ease;

  &:hover:not(:disabled) { filter: brightness(1.05); transform: translateY(-1px); }
  font-weight: 650;
  white-space: nowrap;

  @media (max-width: 560px) { width: 100%; }
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
  const { t } = useTranslation()
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
      setError(t('users.loadError'))
    } finally {
      setLoading(false)
    }
  }, [t])

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
        title: t('users.addSuccess'),
        showConfirmButton: false,
        timer: 2500,
      })
    } catch {
      Swal.fire({
        icon: 'error',
        title: t('users.addError'),
        text: t('users.addError'),
        confirmButtonText: t('common.close'),
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
    return <StatusMessage>{t('users.loading')}</StatusMessage>
  }

  if (error) {
    return (
      <PageContainer>
        <StatusMessage>{error}</StatusMessage>

        <PrimaryButton onClick={fetchUsers}>{t('common.retry')}</PrimaryButton>
      </PageContainer>
    )
  }

  return (
    <PageContainer>
      <PageHeader>
        <h1>{t('users.title')}</h1>

        <PrimaryButton onClick={() => setShowForm(!showForm)}>
          {showForm ? t('users.closeForm') : t('users.addUser')}
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
        placeholder={t('users.searchPlaceholder')}
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />

      {filteredUsers.length === 0 ? (
        <StatusMessage>
          {search ? t('users.notFound') : t('users.empty')}
        </StatusMessage>
      ) : (
        <TableWrapper>
          <UserTable>
            <thead>
              <tr>
                <th>{t('common.id')}</th>
                <th>{t('users.fullName')}</th>
                <th>{t('common.username')}</th>
                <th>{t('common.email')}</th>
                <th>{t('common.phone')}</th>
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
