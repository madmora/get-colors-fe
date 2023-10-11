import { filter, pipe } from 'ramda'
import { User, UserFilterFormat } from 'types'
import { hasData, includeString } from 'utils'
import { userFilterVar } from '../variables'

const defaultFilters: UserFilterFormat = {
  search: {
    key: 'nombre',
    value: '',
  },
  role: '',
  state: '',
}

export const setUserFilters = (users: User[]) => {
  const { filters } = userFilterVar()

  const currentFilters = hasData(filters) ? filters : defaultFilters

  applyFilters(currentFilters, users)
}

export const updateUserFiltersSearchKey = (key: string) => {
  const { filters, users } = userFilterVar()
  const { search } = filters
  const newFilters = { ...filters, search: { ...search, key } }

  applyFilters(newFilters, users)
}

export const updateUserFiltersSearchValue = (value: string) => {
  const { filters, users } = userFilterVar()
  const { search } = filters
  const newFilters = { ...filters, search: { ...search, value } }

  applyFilters(newFilters, users)
}

export const updateUserFiltersRole = (role: string) => {
  const { filters, users } = userFilterVar()
  const newFilters = { ...filters, role }

  applyFilters(newFilters, users)
}

export const updateUserFiltersState = (state: string) => {
  const { filters, users } = userFilterVar()
  const newFilters = { ...filters, state }

  applyFilters(newFilters, users)
}

const applyFilters = (filters: UserFilterFormat, users: User[]): void => {
  const newUsers: any = pipe(
    filterByState(filters),
    filterByRole(filters),
    filterBySearch(filters),
  )(users)
  userFilterVar({ users, result: newUsers, filters })
}

const filterBySearch = (filters: UserFilterFormat) => (
  users: User[],
): User[] => {
  const { search } = filters
  if (!hasData(users)) {
    return []
  }

  if (!search.value) {
    return users
  }

  return filter(
    (user) =>
      includeString(user[search.key as keyof User] as string, search.value),
    users,
  )
}

const filterByRole = (filters: UserFilterFormat) => (users: User[]): User[] => {
  const { role } = filters
  if (!hasData(users)) {
    return []
  }

  if (!role) {
    return users
  }

  return filter((user) => user.rol.toLowerCase() === role.toLowerCase(), users)
}

const filterByState = (filters: UserFilterFormat) => (
  users: User[],
): User[] => {
  const { state } = filters
  if (!hasData(users)) {
    return []
  }

  if (!state) {
    return users
  }

  const userState = state === 'active' ? 1 : 0

  return filter((user) => user.activo === userState, users)
}
