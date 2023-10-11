import { gql } from '@apollo/client'

const CREATE_USER = gql`
  mutation Mutation($input: SignInInput!) {
    signIn(input: $input) {
      code
      user {
        cedula
        email
        nombre
        apellidos
        direccion
        rol
      }
    }
  }
`

export default CREATE_USER
