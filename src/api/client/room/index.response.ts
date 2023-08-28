import { Room } from './index.type'

export interface RoomResponse {
  err: number
  msg: string
  total?: number
  response: Room[] | null
}

export interface CreateRoomResponse {
  err: number
  msg: string
}
