import { TopProduct } from './index.type'

export interface TopProductResponse {
  err: number
  msg: string
  total?: number
  response: TopProduct[] | null
}
