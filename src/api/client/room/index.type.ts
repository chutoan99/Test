import { ShopInfor } from '../shop/index.type'

export interface Room {
  roomid: number
  itemid: number
  shopid: number
  createdAt: Date
  updatedAt: Date
  shop_infor: ShopInfor
}

export interface CreateRoom {
  shopid: number
}
