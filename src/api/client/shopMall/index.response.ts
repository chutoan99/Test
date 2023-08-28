import { ShopMall } from './index.type'

export interface ShopMallResponse {
  err: number
  msg: string
  total?: number
  response: ShopMall[] | null
}
