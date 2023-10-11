import { gql } from '@apollo/client'

const GET_USERS = gql`
  query GetUsers {
    getUsers {
      activo
      cedula
      email
      nombre
      apellidos
      direccion
      rol
    }
  }
`

export default GET_USERS
