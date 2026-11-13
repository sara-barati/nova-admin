import { Navigate, Route, Routes } from 'react-router-dom'

import Login from '../Pages/Login'
import Dashboard from '../Pages/Dashboard'
import Products from '../Pages/Products'
import Users from '../Pages/Users'

import ProtectedRoute from './ProtectedRoute'
import AdminLayout from '../Shared/AdminLayout'

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/users" element={<Users />} />
        </Route>
      </Route>

      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}

export default AppRoutes