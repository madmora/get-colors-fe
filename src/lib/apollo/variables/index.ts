import { makeVar, ReactiveVar } from '@apollo/client'
import {
  AttentionTime,
  ModalError,
  Monitoring,
  MonitoringCategoryFilters,
  UserAuth,
  UserFilters,
} from 'types'
import { getUserAuthData } from 'utils'

export const authVar: ReactiveVar<UserAuth> = makeVar<UserAuth>(
  getUserAuthData(),
)

export const transactionTimeVar: ReactiveVar<number> = makeVar<number>(0)

export const modalErrorVar: ReactiveVar<ModalError> = makeVar<ModalError>({
  open: false,
  message: '',
  subMessage: '',
  code: '',
})

export const userFilterVar: ReactiveVar<UserFilters> = makeVar<UserFilters>(
  {} as UserFilters,
)

export const monitoringCategoryVar: ReactiveVar<MonitoringCategoryFilters> =
  makeVar<MonitoringCategoryFilters>({} as MonitoringCategoryFilters)

export const attentionTimeDataVar: ReactiveVar<AttentionTime[]> = makeVar<
  AttentionTime[]
>([])

export const monitoringDataVar: ReactiveVar<Monitoring[]> = makeVar<
  Monitoring[]
>([])
