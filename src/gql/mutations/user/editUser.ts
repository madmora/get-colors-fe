import { gql } from '@apollo/client'

const EDIT_USER = gql`
  mutation EditUser($input: EditUserInput!) {
    editUser(input: $input) {
      code
    }
  }
`

export default EDIT_USER
