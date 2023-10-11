import { useQuery, useReactiveVar } from '@apollo/client'
import LoadingSpinner from 'components/loading-spinner'
import GET_USERS from 'gql/queries/user/getUsers'
import { UseAuth } from 'hooks'
import { setUserFilters } from 'lib/apollo/operations/userFilters'
import { userFilterVar } from 'lib/apollo/variables'
import Management from './management'

const UserManagement = () => {
  const { auth } = UseAuth()
  const { result: users } = useReactiveVar(userFilterVar)
  const { loading } = useQuery(GET_USERS, {
    variables: { input: { responsable: auth?.user?.cedula } },
    onCompleted: ({ getUsers }) => {
      setUserFilters(getUsers)
    },
    onError: () => {},
  })

  return <>{loading ? <LoadingSpinner /> : <Management users={users} />}</>
}

export default UserManagement
