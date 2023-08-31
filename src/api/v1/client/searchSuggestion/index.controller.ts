import { Request, Response } from 'express'
import { internalServerError } from '~/middleWares/handle_errors'
import SearchSuggestionService from './index.service'

const SearchSuggestionController = {
  GetAll: async (req: Request, res: Response) => {
    try {
      const response = await SearchSuggestionService.GetAll()
      return res.status(200).json(response)
    } catch (error) {
      return internalServerError(res)
    }
  }
}

export default SearchSuggestionController
