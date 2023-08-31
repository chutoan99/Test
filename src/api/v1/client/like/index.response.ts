import { Like } from "./index.type"

export interface LikeResponse {
    err: number
    msg: string
    total?: number
    response: Like[] | null
  }
  


export interface CreateLikeResponse {
  err: number
  msg: string
}
  
  