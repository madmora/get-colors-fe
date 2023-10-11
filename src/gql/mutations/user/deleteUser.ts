import { gql } from '@apollo/client'

const DELETE_USER = gql`
  mutation DeleteUser($input: DeleteUserInput!) {
    deleteUser(input: $input) {
      code
    }
  }
`

export default DELETE_USER
