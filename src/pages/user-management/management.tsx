import { useMutation } from '@apollo/client'
import { TablePagination } from '@mui/material'
import ActivateUserModal from 'components/activate-user-modal'
import CreateUserModal from 'components/create-user-modal'
import DeleteUserModal from 'components/delete-user-modal'
import EditUserModal from 'components/edit-user-modal'
import LoadingModal from 'components/loading-modal'
import ACTIVATE_USER from 'gql/mutations/user/activateUser'
import DELETE_USER from 'gql/mutations/user/deleteUser'
import GET_USERS from 'gql/queries/user/getUsers'
import { UseAuth } from 'hooks'
import Primitives, { HtmlProps } from 'primitives'
import { useCallback, useState } from 'react'
import { Order, User } from 'types'
import { hasData } from 'utils'
import { AppConstants } from 'utils/constants'
import Filters from './components/filters'
import NoData from './components/noData'
import Table from './components/table'
import { TempUser } from './types'

const wrapperStyled: HtmlProps = {
  flexDirection: 'column',
  width: 1,
  minHeight: AppConstants.PAGE_MIN_HEIGHT,
  p: [0, 4],
  alignItems: 'center',
}

const containerStyle: HtmlProps = {
  width: 1,
  p: [3, 4],
  maxWidth: '1400px',
}

const titleStyled: HtmlProps = {
  as: 'h1',
  fontSize: [6, 6, 8, 10],
  m: 0,
  mb: [4, 4, 5],
  textAlign: 'center',
  color: 'orange',
}

interface ManagementProps {
  users: User[]
}

const Management = ({ users }: ManagementProps) => {
  const { auth } = UseAuth()

  const [order, setOrder] = useState<Order>('asc')
  const [orderBy, setOrderBy] = useState<keyof User>('nombre')
  const [rowsPerPage, setRowsPerPage] = useState<number>(25)
  const [page, setPage] = useState<number>(0)
  const [openUserModal, setOpenUserModal] = useState<boolean>(false)
  const [tempUser, setTempUser] = useState<TempUser>({
    openModal: false,
    user: undefined,
    type: undefined,
  })

  const [deleteUserGQL, { loading: deleteUserLoading }] =
    useMutation(DELETE_USER)
  const [activateUserGQL, { loading: activateUserLoading }] =
    useMutation(ACTIVATE_USER)

  const onPageChange = useCallback((_: unknown, newPage: number) => {
    setPage(newPage)
  }, [])

  const onRowsPerPageChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10))
      setPage(0)
    },
    [],
  )

  const onRequestSort = useCallback(
    (property: keyof User) => {
      const isAsc = orderBy === property && order === 'asc'
      setOrder(isAsc ? 'desc' : 'asc')
      setOrderBy(property)
      setPage(0)
    },
    [order, orderBy],
  )

  const resetTempUser = useCallback(() => {
    setTempUser({ openModal: false, user: undefined, type: undefined })
  }, [])

  const deleteUser = useCallback(() => {
    deleteUserGQL({
      refetchQueries: [
        {
          query: GET_USERS,
        },
      ],
      variables: {
        input: {
          responsable: auth?.user.cedula,
          cedula: tempUser.user?.cedula,
        },
      },
      onCompleted: () => {},
      onError: () => {},
    })
    setTempUser({ openModal: false, user: undefined, type: undefined })
  }, [auth?.user.cedula, deleteUserGQL, tempUser.user?.cedula])

  const activateUser = useCallback(() => {
    activateUserGQL({
      refetchQueries: [
        {
          query: GET_USERS,
        },
      ],
      variables: {
        input: {
          responsable: auth?.user.cedula,
          cedula: tempUser.user?.cedula,
        },
      },
      onCompleted: () => {},
      onError: () => {},
    })
    setTempUser({ openModal: false, user: undefined, type: undefined })
  }, [auth?.user.cedula, activateUserGQL, tempUser.user?.cedula])

  const handleFilterChange = useCallback(() => {
    setPage(0)
  }, [])

  return (
    <>
      <Primitives.Flex {...wrapperStyled}>
        <Primitives.Box {...containerStyle}>
          <Primitives.Text {...titleStyled}>
            Mantenimiento de Usuarios
          </Primitives.Text>
          <Filters
            onChange={handleFilterChange}
            onCreateUser={() => setOpenUserModal(true)}
          />
          {hasData(users) ? (
            <>
              <Table
                onRequestSort={onRequestSort}
                users={users}
                page={page}
                rowsPerPage={rowsPerPage}
                order={order}
                orderBy={orderBy}
                setTempUser={setTempUser}
                loggedUserId={auth?.user.cedula || ''}
              />
              <TablePagination
                labelRowsPerPage="Mostrar"
                rowsPerPageOptions={[25, 50, 75, 100]}
                component="div"
                count={users.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={onPageChange}
                onRowsPerPageChange={onRowsPerPageChange}
              />
            </>
          ) : (
            <NoData />
          )}
        </Primitives.Box>
      </Primitives.Flex>
      {tempUser.type === 'delete' && tempUser.user && (
        <DeleteUserModal
          open={tempUser.openModal}
          fullname={tempUser.user?.nombre || ''}
          onClose={resetTempUser}
          deleteUser={deleteUser}
        />
      )}
      {tempUser.type === 'restore' && tempUser.user && (
        <ActivateUserModal
          open={tempUser.openModal}
          fullname={tempUser.user?.nombre || ''}
          onClose={resetTempUser}
          activateUser={activateUser}
        />
      )}
      {tempUser.type === 'edit' && tempUser.user && (
        <EditUserModal
          open={tempUser.openModal}
          onClose={resetTempUser}
          onEdit={resetTempUser}
          user={tempUser.user}
        />
      )}
      <CreateUserModal
        open={openUserModal}
        onClose={() => setOpenUserModal(false)}
        onCreated={() => setOpenUserModal(false)}
      />
      <LoadingModal
        loading={deleteUserLoading || activateUserLoading || false}
      />
    </>
  )
}

export default Management
