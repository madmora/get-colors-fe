import { gql } from '@apollo/client'

const GET_USER = gql`
  query getUser($userId: String) {
    getUser(userId: $userId) {
      lastname
      name
    }
  }
`

export default GET_USER
