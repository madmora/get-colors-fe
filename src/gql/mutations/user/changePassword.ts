import { gql } from '@apollo/client'

const CHANGE_PASSWORD = gql`
  mutation EditPassword($input: EditPasswordInput!) {
    editPassword(input: $input) {
      code
    }
  }
`

export default CHANGE_PASSWORD
