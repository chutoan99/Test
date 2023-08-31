import { Request, Response } from 'express'
import { internalServerError } from '~/middleWares/handle_errors'
import ShopService from './index.service'

const ShopController = {
  GetItems: async (req: Request, res: Response) => {
    const { shopid } = req.params
    try {
      const response = await ShopService.GetItems(shopid)
      return res.status(200).json(response)
    } catch (error) {
      internalServerError(res)
    }
  },

  GetShopID: async (req: Request, res: Response) => {
    const { shopid } = req.params
    try {
      const response = await ShopService.GetShopID(shopid)
      return res.status(200).json(response)
    } catch (error) {
      internalServerError(res)
    }
  }
}

export default ShopController
