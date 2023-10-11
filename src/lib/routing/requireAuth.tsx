import { Navigate, useLocation } from 'react-router-dom'
import { UseAuth } from 'hooks'
import React from 'react'
import { isAuthorized } from 'utils'

interface RequireAuthProps {
  children: React.ReactNode
  authLevel?: string[]
}

const RequireAuth = ({ children, authLevel }: RequireAuthProps) => {
  const { isAuth, auth } = UseAuth()
  const location = useLocation()
  const { rol = '' } = auth?.user || {}

  const authorized = isAuthorized(rol, authLevel || [])

  if (!isAuth) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ lastPathname: location.pathname }}
      />
    )
  }

  if (!authorized) {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}

export default RequireAuth
