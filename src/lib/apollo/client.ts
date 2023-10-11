import { ApolloClient, from, HttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'
import config from 'config'
import { getUserAuthData } from 'utils'
import { AppConstants } from 'utils/constants'
import { cache } from './cache'
import { setModalErrorVar } from './operations'

const httpLink = new HttpLink({
  uri: config.graphqlUri,
})

const authLink = setContext((_, { headers }) => {
  const auth = getUserAuthData()
  return {
    headers: {
      ...headers,
      authorization: auth?.authorization,
    },
  }
})

const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors) {
    for (let err of graphQLErrors) {
      switch (err.extensions.code) {
        case AppConstants.UNAUTHENTICATED_ERROR_CODE:
          setModalErrorVar({
            open: true,
            message: AppConstants.MODAL_UNAUTHENTICATED_ERROR_MESSAGE,
            code: AppConstants.UNAUTHENTICATED_ERROR_CODE,
          })
          return
        case AppConstants.INTERNAL_SERVER_ERROR_CODE:
          setModalErrorVar({
            open: true,
            message: AppConstants.MODAL_INTERNAL_SERVER_ERROR_MESSAGE,
            code: AppConstants.INTERNAL_SERVER_ERROR_CODE,
          })
          return
        case AppConstants.FORBIDDEN_ERROR_CODE:
          setModalErrorVar({
            open: true,
            message: AppConstants.MODAL_FORBIDDEN_ERROR_MESSAGE,
            code: AppConstants.FORBIDDEN_ERROR_CODE,
          })
          return
      }
    }
  }

  setModalErrorVar({
    open: true,
    message: AppConstants.MODAL_UNKNOWN_ERROR_MESSAGE,
    code: AppConstants.UNKNOWN_ERROR_CODE,
  })
})

export const createClient = () => {
  const client = new ApolloClient({
    link: from([authLink, errorLink, httpLink]),
    cache,
  })

  return client
}
