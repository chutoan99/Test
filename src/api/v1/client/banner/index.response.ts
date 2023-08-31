import { Banner } from './index.type'

export interface BannerResponse {
  err: number
  msg: string
  total?: number
  response: Banner[] | null
}
