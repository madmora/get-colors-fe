import { gql } from '@apollo/client'

const SIGN_UP = gql`
  query SignUp($input: SignUpInput!) {
    signUp(input: $input) {
      code
      authorization
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

export default SIGN_UP
