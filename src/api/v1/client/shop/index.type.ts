export interface ShopInfor {
  shopid: number
  userid: string
  is_official_shop: boolean
  item_count: number
  rating_star: number
  name: string
  cover: string
  follower_count: number
  rating_bad: number
  rating_good: number
  rating_normal: number
  status: number
  shop_location: string
  username: string
  portrait: string
  response_rate: number
  country: string
  response_time: number
  description: string
  followed: boolean
  last_active_time: number
  createdAt: Date
  updatedAt: Date
}

export interface Post {
  itemid: number
  shopid: number
  catid: number
  name: string
  image: string
  historical_sold: number
  stock: number
  price_min: number
  price_max: number
  price_before_discount: number
  price_min_before_discount: number
  price_max_before_discount: number
  discount: string
  shop_rating: number
  filename: string
  shop_name: string
  liked: boolean
  ctime: Date
  show_free_shipping: boolean
  is_official_shop: boolean
  is_service_by_shopee: boolean
}
