import styled from 'styled-components'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { useTranslation } from 'react-i18next'

import type { CreateUser } from '../types/user'

interface UserFormProps {
  onSubmit: (values: CreateUser) => Promise<void>
  onCancel: () => void
}

const FormContainer = styled.div`
  min-width: 0;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 14px;
  padding: 24px;
  box-shadow: 0 8px 24px rgba(20, 25, 40, .035);

  @media (max-width: 600px) { padding: 18px; }
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
    border-color: ${({ theme }) => theme.colors.accent};
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

  @media (max-width: 480px) {
    flex-direction: column-reverse;
    button { width: 100%; }
  }
`

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.accent};
  color: white;
  transition: filter .18s ease, transform .18s ease;

  &:hover:not(:disabled) { filter: brightness(1.05); transform: translateY(-1px); }

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
  const { t } = useTranslation()
  const validationSchema = Yup.object({
    email: Yup.string().email(t('validation.invalidEmail')).required(t('validation.required')),
    username: Yup.string().trim().required(t('validation.required')),
    password: Yup.string().min(6, t('validation.passwordMin')).required(t('validation.required')),
    name: Yup.object({
      firstname: Yup.string().trim().required(t('validation.required')),
      lastname: Yup.string().trim().required(t('validation.required')),
    }),
    phone: Yup.string().trim().required(t('validation.required')),
  })
  return (
    <FormContainer>
      <FormTitle>{t('users.formTitle')}</FormTitle>

      <Formik<CreateUser>
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form>
            <FormGrid>
              <FormGroup>
                <label htmlFor="name.firstname">{t('users.firstName')}</label>

                <StyledField
                  id="name.firstname"
                  name="name.firstname"
                  placeholder={t('users.firstNamePlaceholder')}
                />

                {touched.name?.firstname && errors.name?.firstname && (
                  <ErrorText>{errors.name.firstname}</ErrorText>
                )}
              </FormGroup>

              <FormGroup>
                <label htmlFor="name.lastname">{t('users.lastName')}</label>

                <StyledField
                  id="name.lastname"
                  name="name.lastname"
                  placeholder={t('users.lastNamePlaceholder')}
                />

                {touched.name?.lastname && errors.name?.lastname && (
                  <ErrorText>{errors.name.lastname}</ErrorText>
                )}
              </FormGroup>

              <FormGroup>
                <label htmlFor="username">{t('common.username')}</label>

                <StyledField
                  id="username"
                  name="username"
                  placeholder={t('users.usernamePlaceholder')}
                />

                {touched.username && errors.username && (
                  <ErrorText>{errors.username}</ErrorText>
                )}
              </FormGroup>

              <FormGroup>
                <label htmlFor="email">{t('common.email')}</label>

                <StyledField
                  id="email"
                  name="email"
                  type="email"
                  placeholder={t('users.emailPlaceholder')}
                />

                {touched.email && errors.email && (
                  <ErrorText>{errors.email}</ErrorText>
                )}
              </FormGroup>

              <FormGroup>
                <label htmlFor="password">{t('common.password')}</label>

                <StyledField
                  id="password"
                  name="password"
                  type="password"
                  placeholder={t('users.passwordPlaceholder')}
                />

                {touched.password && errors.password && (
                  <ErrorText>{errors.password}</ErrorText>
                )}
              </FormGroup>

              <FormGroup>
                <label htmlFor="phone">{t('common.phone')}</label>

                <StyledField
                  id="phone"
                  name="phone"
                  placeholder={t('users.phonePlaceholder')}
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
                {t('common.cancel')}
              </CancelButton>

              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? t('users.adding') : t('users.addUser')}
              </Button>
            </ButtonGroup>
          </Form>
        )}
      </Formik>
    </FormContainer>
  )
}

export default UserForm
