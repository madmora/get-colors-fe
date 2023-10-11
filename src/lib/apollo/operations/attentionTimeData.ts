import { AttentionTime } from 'types'
import { attentionTimeDataVar } from '../variables'

export const setAttentionTimeData = (data: AttentionTime[]) => {
  attentionTimeDataVar(data)
}
