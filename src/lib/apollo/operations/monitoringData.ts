import { Monitoring } from 'types'
import { monitoringDataVar } from '../variables'

export const setMonitoringData = (data: Monitoring[]) => {
  monitoringDataVar(data)
}
