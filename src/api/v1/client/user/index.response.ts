import { User } from './index.type'

export interface UserResponse {
  err: number
  msg: string
  response: User | null
}
