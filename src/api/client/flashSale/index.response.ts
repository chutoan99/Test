import { FlashSale } from './index.type'

export interface FlashSaleResponse {
  err: number
  msg: string
  total?: number
  response: FlashSale[] | null
}
