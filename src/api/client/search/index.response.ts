import { Search } from './index.type'

export interface SearchResponse {
  err: number
  msg: string
  total?: number
  response: Search[] | null
}

export interface CreateSearchResponse {
  err: number
  msg: string
}
