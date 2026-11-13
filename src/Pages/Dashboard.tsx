import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { clearCredentials } from '../Redux/authSlice'
import type { AppDispatch } from '../Redux/store'
import { removeToken } from '../Storage/authStorage'

function Dashboard() {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const handleLogout = () => {
    removeToken()
    dispatch(clearCredentials())
    navigate('/login')
  }

  return (
    <div>
      <h1>NOVA Admin Dashboard</h1>

      <p>Welcome to NOVA Admin</p>

      <button onClick={handleLogout}>
        Logout
      </button>
    </div>
  )
}

export default Dashboard