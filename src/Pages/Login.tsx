import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'

import authService from '../Utils/services/authService'
import { saveToken } from '../Storage/authStorage'
import { setToken } from '../Redux/authSlice'

import type { AppDispatch } from '../Redux/store'
import type { LoginCredentials } from '../types/auth'

const loginSchema = Yup.object({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
})

function Login() {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const initialValues: LoginCredentials = {
    username: '',
    password: '',
  }

  const handleSubmit = async (values: LoginCredentials) => {
    setLoading(true)
    setError('')

    try {
      const response = await authService.login(values)

      saveToken(response.token)
      dispatch(setToken(response.token))

      navigate('/dashboard')
    } catch {
      setError('Username or password is incorrect')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h1>NOVA Admin</h1>
      <h2>Login</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={loginSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <div>
              <label htmlFor="username">Username</label>

              <Field
                id="username"
                name="username"
                type="text"
                placeholder="Enter username"
              />

              {touched.username && errors.username && (
                <p>{errors.username}</p>
              )}
            </div>

            <div>
              <label htmlFor="password">Password</label>

              <Field
                id="password"
                name="password"
                type="password"
                placeholder="Enter password"
              />

              {touched.password && errors.password && (
                <p>{errors.password}</p>
              )}
            </div>

            {error && <p>{error}</p>}

            <button type="submit" disabled={loading}>
              {loading ? 'Loading...' : 'Login'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default Login