import { BatchList } from './index.type'

export interface BatchListResponse {
  err: number
  msg: string
  total?: number
  response: BatchList[] | null
}
