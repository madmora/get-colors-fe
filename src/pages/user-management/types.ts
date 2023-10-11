import { User } from 'types'

type action = 'delete' | 'edit' | 'restore'

export interface TempUser {
  openModal: boolean
  type: action | undefined
  user: User | undefined
}
