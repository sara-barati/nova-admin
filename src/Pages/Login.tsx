import { useState } from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { useTranslation } from 'react-i18next'
import { ArrowUpLeft, LockKeyhole, ShieldCheck, Sparkles } from 'lucide-react'

import authService from '../Utils/services/authService'
import { saveToken } from '../Storage/authStorage'
import { setToken } from '../Redux/authSlice'
import type { AppDispatch } from '../Redux/store'
import type { LoginCredentials } from '../types/auth'
import LanguageSwitcher from '../Components/LanguageSwitcher'

const LoginPage = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(420px, 0.95fr);
  background: ${({ theme }) => theme.colors.background};

  @media (max-width: 820px) {
    grid-template-columns: 1fr;
  }
`

const BrandPanel = styled.section`
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
  padding: clamp(32px, 6vw, 76px);
  color: #fff;
  background:
    radial-gradient(circle at 18% 15%, rgba(243,111,33,.22), transparent 28%),
    linear-gradient(145deg, #12243B 0%, #1B3553 55%, #294765 100%);

  &::before, &::after {
    content: '';
    position: absolute;
    border: 1px solid rgba(255,255,255,.16);
    border-radius: 50%;
    pointer-events: none;
  }

  &::before {
    width: 520px;
    height: 520px;
    inset-inline-end: -220px;
    bottom: -180px;
  }

  &::after {
    width: 340px;
    height: 340px;
    inset-inline-end: -120px;
    bottom: -90px;
  }

  @media (max-width: 820px) {
    min-height: auto;
    padding: 28px 24px;
    gap: 24px;
  }

  @media (max-width: 480px) {
    padding: 22px 18px;
  }
`

const BrandTop = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  position: relative;
  z-index: 1;
`

const BrandIcon = styled.div`
  width: 46px;
  height: 46px;
  display: grid;
  place-items: center;
  border: 1px solid ${({ theme }) => theme.colors.accent};
  border-radius: 15px;
  background: ${({ theme }) => theme.colors.accent};
  box-shadow: 0 8px 22px ${({ theme }) => theme.colors.accent}35;
  font-size: 22px;
  font-weight: 800;
`

const BrandName = styled.div`
  font-size: 21px;
  font-weight: 800;
  letter-spacing: 1.4px;

  small {
    display: block;
    margin-top: 3px;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 2px;
    opacity: .78;
  }
`

const BrandMessage = styled.div`
  max-width: 560px;
  position: relative;
  z-index: 1;

  h1 {
    max-width: 540px;
    margin-bottom: 18px;
    font-size: clamp(32px, 4.2vw, 54px);
    line-height: 1.2;
    letter-spacing: -1.5px;
  }

  p {
    max-width: 470px;
    color: rgba(255,255,255,.82);
    font-size: 16px;
    line-height: 1.9;
  }

  @media (max-width: 820px) {
    h1 { font-size: clamp(26px, 6vw, 38px); margin-bottom: 8px; }
    p { font-size: 14px; line-height: 1.7; }
  }
`

const FeatureLine = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 30px;
  color: rgba(255,255,255,.9);
  font-size: 13px;

  svg { flex-shrink: 0; }

  @media (max-width: 820px) { display: none; }
`

const BrandFooter = styled.p`
  position: relative;
  z-index: 1;
  color: rgba(255,255,255,.65);
  font-size: 12px;

  @media (max-width: 820px) { display: none; }
`

const FormPanel = styled.section`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 36px clamp(22px, 6vw, 80px);
  position: relative;

  @media (max-width: 820px) {
    min-height: auto;
    padding: 42px 22px 56px;
  }

  @media (max-width: 480px) { padding: 34px 18px 44px; }
`

const TopActions = styled.div`
  position: absolute;
  top: 26px;
  inset-inline-end: 30px;

  @media (max-width: 820px) {
    top: 16px;
    inset-inline-end: 18px;
  }
`

const LoginCard = styled.div`
  width: 100%;
  max-width: 430px;
`

const Eyebrow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 18px;
  color: ${({ theme }) => theme.colors.accent};
  font-size: 12px;
  font-weight: 750;
  letter-spacing: .5px;
`

const FormHeading = styled.div`
  margin-bottom: 30px;

  h2 {
    margin-bottom: 9px;
    color: ${({ theme }) => theme.colors.text};
    font-size: clamp(27px, 3vw, 34px);
    letter-spacing: -.8px;
  }

  p {
    color: ${({ theme }) => theme.colors.secondaryText};
    font-size: 14px;
    line-height: 1.7;
  }
`

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 9px;
  margin-bottom: 20px;

  label {
    color: ${({ theme }) => theme.colors.text};
    font-size: 13px;
    font-weight: 650;
  }
`

const InputWrap = styled.div`
  position: relative;

  svg {
    position: absolute;
    inset-inline-start: 15px;
    top: 50%;
    transform: translateY(-50%);
    color: ${({ theme }) => theme.colors.secondaryText};
    pointer-events: none;
  }
`

const StyledField = styled(Field)`
  width: 100%;
  height: 52px;
  padding: 0 46px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  outline: none;
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  font-size: 14px;
  transition: border-color .18s ease, box-shadow .18s ease;

  &::placeholder { color: ${({ theme }) => theme.colors.secondaryText}; opacity: .8; }

  &:focus {
    border-color: ${({ theme }) => theme.colors.accent};
    box-shadow: 0 0 0 4px ${({ theme }) => theme.colors.accent}1c;
  }
`

const ErrorText = styled.p`
  color: ${({ theme }) => theme.colors.danger};
  font-size: 12px;
`

const ServerError = styled.div`
  margin: 4px 0 18px;
  padding: 12px 14px;
  border: 1px solid ${({ theme }) => theme.colors.danger}44;
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.danger}10;
  color: ${({ theme }) => theme.colors.danger};
  font-size: 13px;
  line-height: 1.6;
`

const SubmitButton = styled.button`
  width: 100%;
  min-height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 8px;
  border: 0;
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.accent};
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  box-shadow: 0 10px 22px ${({ theme }) => theme.colors.accent}35;
  transition: transform .18s ease, opacity .18s ease;

  &:hover:not(:disabled) { transform: translateY(-1px); filter: brightness(1.04); }
  &:disabled { opacity: .65; }
`

const FormHint = styled.p`
  margin-top: 24px;
  color: ${({ theme }) => theme.colors.secondaryText};
  font-size: 12px;
  line-height: 1.7;
  text-align: center;
`

function Login() {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const loginSchema = Yup.object({
    username: Yup.string().trim().required(t('validation.required')),
    password: Yup.string().required(t('validation.required')),
  })

  const initialValues: LoginCredentials = { username: '', password: '' }

  const handleSubmit = async (values: LoginCredentials) => {
    setLoading(true)
    setError('')

    try {
      const response = await authService.login(values)
      saveToken(response.token)
      dispatch(setToken(response.token))
      navigate('/dashboard', { replace: true })
    } catch {
      setError(t('auth.loginError'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <LoginPage>
      <BrandPanel>
        <BrandTop>
          <BrandIcon>N</BrandIcon>
          <BrandName>
            NOVA
            <small>ADMINISTRATION</small>
          </BrandName>
        </BrandTop>

        <BrandMessage>
          <h1>{t('auth.brandTitle')}</h1>
          <p>{t('auth.brandDescription')}</p>
          <FeatureLine>
            <ShieldCheck size={18} />
            {t('auth.secureWorkspace')}
          </FeatureLine>
        </BrandMessage>

        <BrandFooter>© {new Date().getFullYear()} NOVA. {t('auth.allRightsReserved')}</BrandFooter>
      </BrandPanel>

      <FormPanel>
        <TopActions>
          <LanguageSwitcher />
        </TopActions>

        <LoginCard>
          <Eyebrow><Sparkles size={15} /> {t('auth.welcomeBack')}</Eyebrow>
          <FormHeading>
            <h2>{t('auth.login')}</h2>
            <p>{t('auth.loginDescription')}</p>
          </FormHeading>

          <Formik
            initialValues={initialValues}
            validationSchema={loginSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => (
              <Form>
                <FormGroup>
                  <label htmlFor="username">{t('auth.username')}</label>
                  <InputWrap>
                    <LockKeyhole size={18} />
                    <StyledField
                      id="username"
                      name="username"
                      type="text"
                      autoComplete="username"
                      placeholder={t('auth.usernamePlaceholder')}
                    />
                  </InputWrap>
                  {touched.username && errors.username && <ErrorText>{errors.username}</ErrorText>}
                </FormGroup>

                <FormGroup>
                  <label htmlFor="password">{t('auth.password')}</label>
                  <InputWrap>
                    <LockKeyhole size={18} />
                    <StyledField
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      placeholder={t('auth.passwordPlaceholder')}
                    />
                  </InputWrap>
                  {touched.password && errors.password && <ErrorText>{errors.password}</ErrorText>}
                </FormGroup>

                {error && <ServerError role="alert">{error}</ServerError>}

                <SubmitButton type="submit" disabled={loading}>
                  {loading ? t('auth.loading') : t('auth.loginButton')}
                  {!loading && <ArrowUpLeft size={17} />}
                </SubmitButton>
              </Form>
            )}
          </Formik>

          <FormHint>{t('auth.loginHint')}</FormHint>
        </LoginCard>
      </FormPanel>
    </LoginPage>
  )
}

export default Login
