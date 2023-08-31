export interface FlashSale {
  itemid: number
  shopid: number
  catid: number
  name: string
  image: string
  price: number
  price_before_discount: number
  stock: number
  historical_sold: number
  discount: string
  shop_rating: number
  filename: string
  liked: boolean
  is_official_shop: boolean
  is_service_by_shopee: boolean
  show_free_shipping: boolean
  start_time: Date
  end_time: Date
  createdAt: Date
  updatedAt: Date
}
