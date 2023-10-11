import { gql } from '@apollo/client'

const RESET_PASSWORD = gql`
  mutation Mutation($input: ResetPasswordInput!) {
    resetPassword(input: $input) {
      code
    }
  }
`

export default RESET_PASSWORD
