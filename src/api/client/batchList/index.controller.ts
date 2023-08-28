import { Request, Response } from 'express'
import BatchListService from './index.service'
import { internalServerError } from '~/middleWares/handle_errors'

const BannerController = {
  GetAll: async (req: Request, res: Response) => {
    try {
      const response = await BatchListService.GetAll()
      return res.status(200).json(response)
    } catch (error) {
      return internalServerError(res)
    }
  }
}

export default BannerController
