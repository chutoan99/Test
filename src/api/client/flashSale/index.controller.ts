import { Request, Response } from 'express'
import { internalServerError } from '~/middleWares/handle_errors'
import FlashSaleService from './index.service'

const FlashSaleController = {
  GetAll: async (req: Request, res: Response) => {
    try {
      const response = await FlashSaleService.GetAll()
      return res.status(200).json(response)
    } catch (error) {
      return internalServerError(res)
    }
  }
}

export default FlashSaleController
