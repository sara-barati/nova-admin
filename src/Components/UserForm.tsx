import styled from 'styled-components'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'

import type { CreateUser } from '../types/user'

interface UserFormProps {
  onSubmit: (values: CreateUser) => Promise<void>
  onCancel: () => void
}

const FormContainer = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  padding: 24px;
`

const FormTitle = styled.h2`
  margin-bottom: 24px;
  color: ${({ theme }) => theme.colors.text};
`

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  label {
    color: ${({ theme }) => theme.colors.text};
  }
`

const StyledField = styled(Field)`
  width: 100%;
  padding: 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  outline: none;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`

const ErrorText = styled.p`
  color: ${({ theme }) => theme.colors.danger};
  font-size: 12px;
`

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
`

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.primary};
  color: white;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`

const CancelButton = styled(Button)`
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  border: 1px solid ${({ theme }) => theme.colors.border};
`

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Enter a valid email')
    .required('Email is required'),

  username: Yup.string().trim().required('Username is required'),

  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),

  name: Yup.object({
    firstname: Yup.string().trim().required('First name is required'),

    lastname: Yup.string().trim().required('Last name is required'),
  }),

  phone: Yup.string().trim().required('Phone number is required'),
})

const initialValues: CreateUser = {
  email: '',
  username: '',
  password: '',
  name: {
    firstname: '',
    lastname: '',
  },
  phone: '',
}

function UserForm({ onSubmit, onCancel }: UserFormProps) {
  return (
    <FormContainer>
      <FormTitle>Add New User</FormTitle>

      <Formik<CreateUser>
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form>
            <FormGrid>
              <FormGroup>
                <label htmlFor="name.firstname">First Name</label>

                <StyledField
                  id="name.firstname"
                  name="name.firstname"
                  placeholder="Enter first name"
                />

                {touched.name?.firstname && errors.name?.firstname && (
                  <ErrorText>{errors.name.firstname}</ErrorText>
                )}
              </FormGroup>

              <FormGroup>
                <label htmlFor="name.lastname">Last Name</label>

                <StyledField
                  id="name.lastname"
                  name="name.lastname"
                  placeholder="Enter last name"
                />

                {touched.name?.lastname && errors.name?.lastname && (
                  <ErrorText>{errors.name.lastname}</ErrorText>
                )}
              </FormGroup>

              <FormGroup>
                <label htmlFor="username">Username</label>

                <StyledField
                  id="username"
                  name="username"
                  placeholder="Enter username"
                />

                {touched.username && errors.username && (
                  <ErrorText>{errors.username}</ErrorText>
                )}
              </FormGroup>

              <FormGroup>
                <label htmlFor="email">Email</label>

                <StyledField
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter email"
                />

                {touched.email && errors.email && (
                  <ErrorText>{errors.email}</ErrorText>
                )}
              </FormGroup>

              <FormGroup>
                <label htmlFor="password">Password</label>

                <StyledField
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter password"
                />

                {touched.password && errors.password && (
                  <ErrorText>{errors.password}</ErrorText>
                )}
              </FormGroup>

              <FormGroup>
                <label htmlFor="phone">Phone</label>

                <StyledField
                  id="phone"
                  name="phone"
                  placeholder="Enter phone number"
                />

                {touched.phone && errors.phone && (
                  <ErrorText>{errors.phone}</ErrorText>
                )}
              </FormGroup>
            </FormGrid>

            <ButtonGroup>
              <CancelButton
                type="button"
                onClick={onCancel}
                disabled={isSubmitting}
              >
                Cancel
              </CancelButton>

              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Adding...' : 'Add User'}
              </Button>
            </ButtonGroup>
          </Form>
        )}
      </Formik>
    </FormContainer>
  )
}

export default UserForm
