import { SearchSuggestion } from './index.type'

export interface SearchSuggestionResponse {
  err: number
  msg: string
  total?: number
  response: SearchSuggestion[] | null
}
