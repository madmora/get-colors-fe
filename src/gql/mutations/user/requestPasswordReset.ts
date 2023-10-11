import { gql } from '@apollo/client'

const REQUEST_PASSWORD_RESET = gql`
  mutation Mutation($input: RequestPasswordResetInput!) {
    requestPasswordReset(input: $input) {
      code
    }
  }
`

export default REQUEST_PASSWORD_RESET
