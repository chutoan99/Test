import { Response } from 'express'
import { internalServerError } from '~/middleWares/handle_errors'
import SearchService from './index.service'

const SearchController = {
  GetAll: async (req: any, res: Response) => {
    const { userid } = req.user
    try {
      const response = await SearchService.GetAll(userid)
      return res.status(200).json(response)
    } catch (error) {
      return internalServerError(res)
    }
  },

  Create: async (req: any, res: Response) => {
    const payload = req.body
    const { userid } = req.user
    try {
      const response = await SearchService.Create(payload, userid)
      return res.status(200).json(response)
    } catch (error) {
      return internalServerError(res)
    }
  }
}

export default SearchController
