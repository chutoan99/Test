import { Post, ShopInfor } from './index.type'

export interface PostOfShopResponse {
  err: number
  msg: string
  total?: number
  response: Post[] | null
}

export interface ShopInforResponse {
  err: number
  msg: string
  response: ShopInfor | null
}
