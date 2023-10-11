import {
  Box,
  TableCell,
  TableHead as TableHeadMUI,
  TableRow,
  TableSortLabel,
} from '@mui/material'
import { visuallyHidden } from '@mui/utils'
import { useCallback } from 'react'
import { Order, User } from 'types'

interface TableHeadProps {
  onRequestSort: (property: keyof User) => void
  order: Order
  orderBy: string
}

interface HeadCell {
  id: keyof User
  label: string
  sort?: boolean
}

const headCells: readonly HeadCell[] = [
  {
    id: 'nombre',
    label: 'Nombre',
  },
  {
    id: 'cedula',
    label: 'Cedula',
  },
  {
    id: 'rol',
    label: 'Rol',
  },
  {
    id: 'direccion',
    label: 'Dirección',
  },
  {
    id: 'activo',
    label: 'Activo',
  },
]

const TableHead = ({ order, orderBy, onRequestSort }: TableHeadProps) => {
  const createSortHandler = useCallback(
    (property: keyof User) => {
      onRequestSort(property)
    },
    [onRequestSort],
  )

  return (
    <TableHeadMUI>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={() => createSortHandler(headCell.id)}
              sx={{ fontWeight: 'bold' }}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell sx={{ fontWeight: 'bold' }}>Acciones</TableCell>
      </TableRow>
    </TableHeadMUI>
  )
}

export default TableHead
