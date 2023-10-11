import { useReactiveVar } from '@apollo/client'
import SIGN_UP from 'gql/queries/user/signUp'
import { useLazyQueryPromise } from 'hooks'
import { setAuthVar } from 'lib/apollo/operations'
import { authVar } from 'lib/apollo/variables'
import { useCallback, useState } from 'react'
import { User, UserAuth, UserCredentials } from 'types'
import { hasData } from 'utils'
import { AppConstants } from 'utils/constants'

interface SignUp {
  signUp: UserAuthCode
}
interface SignUpResponse {
  data: SignUp
}

interface UseAuthResponse {
  isError: boolean
  errorMessage: string
  isLoading: boolean
  isAuth: boolean
  auth: UserAuth
  login: (credentials: UserCredentials) => void
  logout: () => void
}

interface UserAuthCode {
  code: string
  authorization: string
  user: User
}

export const UseAuth = (): UseAuthResponse => {
  const [isError, setIsError] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [signUp] = useLazyQueryPromise(SIGN_UP)
  const auth = useReactiveVar(authVar)

  const login = useCallback(
    ({ responsableId, password }: UserCredentials) => {
      setIsLoading(true)
      setIsError(false)
      setErrorMessage('')
      signUp({
        fetchPolicy: 'no-cache',
        variables: { input: { responsableId, password } },
      })
        .then(({ data }: SignUpResponse) => data.signUp)
        .then((user: UserAuthCode) => {
          switch (user.code) {
            case 'SUCCESS':
              const data = {
                user: user.user,
                authorization: user.authorization,
              } as UserAuth
              localStorage.setItem(AppConstants.USER, JSON.stringify(data))
              setAuthVar(data)
              break
            case 'ERROR_INACTIVE_ACCOUNT':
              setIsError(true)
              setErrorMessage(
                'La cuenta está inactiva, contacte al administrador',
              )
              break
            case 'ERROR_EXPIRED_PASSWORD':
              setIsError(true)
              setErrorMessage(
                'La cuenta a expirado, debe actualizar su contraseña',
              )
              break
            case 'ERROR_BLOCKED_PASSWORD':
              setIsError(true)
              setErrorMessage('La cuenta fue bloqueada temporalmente')
              break
            case 'ERROR_ATTEMPTS_EXCEEDED':
              setIsError(true)
              setErrorMessage(
                'Supero el número de intentos, su cuenta será bloqueada temporalmente',
              )
              break
            case 'ERROR_SIGNUP_DOES_NOT_MATCH':
              setIsError(true)
              setErrorMessage('El usuario o la contraseña son incorrectos')
              break
            default:
              setIsError(true)
              setErrorMessage('El usuario o la contraseña son incorrectos')
              break
          }
          setIsLoading(false)
        })
        .catch(() => {
          setIsLoading(false)
          setIsError(true)
        })
    },
    [signUp],
  )

  const logout = useCallback(() => {
    localStorage.removeItem(AppConstants.USER)
    setAuthVar(undefined)
  }, [])

  return {
    isError,
    errorMessage,
    isLoading,
    isAuth: hasData(auth),
    auth,
    login,
    logout,
  }
}
