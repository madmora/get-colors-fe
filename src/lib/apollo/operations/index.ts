import { ModalError, UserAuth } from 'types'
import { getUnixEpochTime, secondsToTimeFormat } from 'utils'
import { authVar, modalErrorVar, transactionTimeVar } from '../variables'

export const setAuthVar = (userAuth: UserAuth) => authVar(userAuth)

export const getTransactionTimeDuration = () => {
  const time = getUnixEpochTime() - transactionTimeVar()
  return secondsToTimeFormat(time)
}

export const setModalErrorVar = (data: ModalError) => modalErrorVar(data)
