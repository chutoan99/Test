interface FlashSale {
  id: number
  itemid: number
  shopid: number
  catid: number
  name: string
  image: string
  price: number
  price_min: number
  price_max: number
  stock: number
  historical_sold: number
  price_min_before_discount: number
  price_max_before_discount: number
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
