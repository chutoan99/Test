import { Notify } from './index.type'

export interface NotifyResponse {
  err: number
  msg: string
  total?: number
  response: Notify[] | null
}
