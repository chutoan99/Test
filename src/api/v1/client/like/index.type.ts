export interface Like {
  id: number
  userid: string
  itemid: number
  shopid: number
  createdAt: Date
  updatedAt: Date
}

export interface CreateLike {
  itemid: number
  shopid: number
}
