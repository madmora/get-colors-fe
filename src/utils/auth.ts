import { includes, map, toLower } from 'ramda'
import { UserAuth } from 'types'
import { AppConstants } from './constants'
import { getUnixEpochTime } from './helpers'
import jwt_decode from 'jwt-decode'

// const userTest: UserAuth = {
//   auth: {
//     authorization:
//       'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjZWR1bGEiOiIxMjM0NTY3ODkiLCJlbWFpbCI6Im11bmljaXBhbGlkYWRAdGVzdC5jb20iLCJpYXQiOjE2NjUwMDk2MDEsImV4cCI6MTY2NTA1MjgwMX0.jv2QmTRKTTVpG8N8-oOx8kZ7uetj8C4TibVrUH_YHpM',
//     exp: 99999999999,
//   },
//   user: {
//     cedula: '123456789',
//     email: 'test@test.com',
//     nombre: 'Nombre',
//     apellidos: 'Apellidos',
//     direccion: 'Dirección',
//     rol: 'Administrador',
//   },
// }

export const getUserAuthData = (): UserAuth => {
  const userString: string = localStorage.getItem(AppConstants.USER) || ''

  if (!userString) {
    // return userTest
    return undefined
  }

  const auth: UserAuth = JSON.parse(userString)

  const expires: number = getExpiresTime(userString) || 0

  if (expires <= 0) {
    localStorage.removeItem(AppConstants.USER)
    return undefined
  }

  return auth
}

export const getSessionExpiresTime = (): number | undefined => {
  const userString = localStorage.getItem(AppConstants.USER) || ''

  return getExpiresTime(userString)
}

const getExpiresTime = (userString: string): number | undefined => {
  if (!userString) {
    return undefined
  }

  const auth: UserAuth = JSON.parse(userString)
  const { authorization } = auth || {}
  const decodedToken: { exp: number } = jwt_decode(authorization || '')

  const unixEpoch: number = getUnixEpochTime()

  return decodedToken?.exp ? decodedToken.exp - unixEpoch : undefined
}

export const isAuthorized = (rol: string, authLevel: string[]): boolean => {
  const authLevelLowercase: string[] = map(
    (level: string) => toLower(level),
    authLevel || [],
  )

  return includes(toLower(rol), authLevelLowercase)
}
