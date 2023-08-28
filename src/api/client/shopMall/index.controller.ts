import { Request, Response } from 'express'
import { internalServerError } from '~/middleWares/handle_errors'
import ShopMallService from './index.service'

const ShopMallController = {
  GetAll: async (req: Request, res: Response) => {
    try {
      const response = await ShopMallService.GetAll()
      return res.status(200).json(response)
    } catch (error) {
      return internalServerError(res)
    }
  }
}

export default ShopMallController
