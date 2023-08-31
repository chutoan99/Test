import { Request, Response } from 'express'
import { internalServerError } from '~/middleWares/handle_errors'
import TopProductService from './index.service'

const TopProductController = {
  GetAll: async (req: Request, res: Response) => {
    try {
      const response = await TopProductService.GetAll()
      return res.status(200).json(response)
    } catch (error) {
      return internalServerError(res)
    }
  }
}

export default TopProductController
