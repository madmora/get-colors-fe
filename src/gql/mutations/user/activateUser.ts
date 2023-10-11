import { gql } from '@apollo/client'

const ACTIVATE_USER = gql`
  mutation Mutation($input: ActivateUserInput!) {
    activateUser(input: $input) {
      code
    }
  }
`

export default ACTIVATE_USER
