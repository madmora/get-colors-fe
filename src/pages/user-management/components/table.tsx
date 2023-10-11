import {
  IconButton,
  Table as TableMUI,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material'
import { Order, User } from 'types'
import { getComparator } from 'utils'
import TableHead from './tableHead'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import EditIcon from '@mui/icons-material/Edit'
import defaultTheme from 'lib/theme/default'
import Primitives from 'primitives'
import { TempUser } from '../types'
import Button from 'components/button'

interface TableProps {
  users: User[]
  orderBy: keyof User
  order: Order
  onRequestSort: (property: keyof User) => void
  page: number
  rowsPerPage: number
  setTempUser: (tempUser: TempUser) => void
  loggedUserId: string
}

const Table = ({
  users,
  orderBy,
  order,
  onRequestSort,
  page,
  rowsPerPage,
  setTempUser,
  loggedUserId,
}: TableProps) => (
  <TableContainer sx={{ width: 1 }}>
    <TableMUI sx={{ width: 1 }} aria-labelledby="tableTitle" size="small">
      <TableHead
        onRequestSort={onRequestSort}
        order={order}
        orderBy={orderBy}
      />
      <TableBody>
        {users
          .slice()
          .sort(getComparator(order, orderBy))
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((user) => {
            return (
              <TableRow
                tabIndex={-1}
                key={user.cedula}
                sx={{
                  '&:nth-of-type(odd)': {
                    backgroundColor: '#e6e6e6',
                  },
                }}
              >
                <TableCell>{user.nombre}</TableCell>
                <TableCell>{user.cedula}</TableCell>
                <TableCell>{user.rol}</TableCell>
                <TableCell>{user.direccion}</TableCell>
                <TableCell>{user.activo ? 'Activo' : 'Inactivo'}</TableCell>
                <TableCell>
                  <Primitives.Flex minHeight="40px" alignItems="center">
                    <Primitives.Box>
                      {!!user.activo && (
                        <IconButton
                          onClick={() =>
                            setTempUser({ openModal: true, user, type: 'edit' })
                          }
                          aria-label="edit"
                          sx={{ color: defaultTheme.colors.orange }}
                        >
                          <EditIcon />
                        </IconButton>
                      )}
                      {!user.activo && (
                        <Button
                          rounded
                          size="small"
                          onClick={() =>
                            setTempUser({
                              openModal: true,
                              user,
                              type: 'restore',
                            })
                          }
                        >
                          Activar
                        </Button>
                      )}
                      {loggedUserId !== user.cedula && !!user.activo && (
                        <IconButton
                          onClick={() =>
                            setTempUser({
                              openModal: true,
                              user,
                              type: 'delete',
                            })
                          }
                          aria-label="delete"
                          sx={{ color: defaultTheme.colors.error }}
                        >
                          <DeleteForeverIcon />
                        </IconButton>
                      )}
                    </Primitives.Box>
                  </Primitives.Flex>
                </TableCell>
              </TableRow>
            )
          })}
      </TableBody>
    </TableMUI>
  </TableContainer>
)

export default Table
