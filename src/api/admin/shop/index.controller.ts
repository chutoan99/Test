import { Response } from 'express'
import ShopService from './index.service'
import { internalServerError } from '~/middleWares/handle_errors'

const ShopController = {
  GetAll: async (req: any, res: Response) => {
    try {
      const query = req.query
      ShopService.GetAll({ ...query }).then((response: any) => {
        res.status(200).json(response)
      })
    } catch (error) {
      return internalServerError(res)
    }
  }
}

export default ShopController
