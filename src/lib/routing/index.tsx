import { Home } from 'pages/home'
import { Routes, Route } from 'react-router-dom'
import RequireAuth from './requireAuth'
import PageNoFound from 'pages/page-no-found'
import { AppConstants } from 'utils/constants'
import ForgotPassword from 'pages/forgot-password'
import ResetPassword from 'pages/reset-password'
import UserManagement from 'pages/user-management'
import ChangePassword from 'pages/change-password'
import Login from 'pages/login'
import About from 'pages/about'

export const Routing = () => {
  return (
    <Routes>
      <Route path={AppConstants.ROUTE_LOGIN} element={<Login />} />
      <Route
        path={AppConstants.ROUTE_FORGOT_PASSWORD}
        element={<ForgotPassword />}
      />
      <Route
        path={AppConstants.ROUTE_RESET_PASSWORD}
        element={<ResetPassword />}
      />

      <Route
        path={AppConstants.ROUTE_HOME}
        element={
          <RequireAuth authLevel={AppConstants.ACCESS_POLICY_ADMIN_USER}>
            <Home />
          </RequireAuth>
        }
      />

      <Route
        path={AppConstants.ROUTE_USER_MANAGEMENT}
        element={
          <RequireAuth authLevel={AppConstants.ACCESS_POLICY_ADMIN}>
            <UserManagement />
          </RequireAuth>
        }
      />

      <Route
        path={AppConstants.ROUTE_CHANGE_PASSWORD}
        element={
          <RequireAuth authLevel={AppConstants.ACCESS_POLICY_ADMIN_USER}>
            <ChangePassword />
          </RequireAuth>
        }
      />
      <Route path={AppConstants.ROUTE_ABOUT} element={<About />} />
      <Route path={AppConstants.ROUTE_ANY} element={<PageNoFound />} />
    </Routes>
  )
}
