import { Response } from 'express'
import { internalServerError } from '~/middleWares/handle_errors'
import RoomService from './index.service'

const RoomController = {
  GetAll: async (req: any, res: Response) => {
    const { shopid } = req.shop
    try {
      const response = await RoomService.GetAll(shopid)
      return res.status(200).json(response)
    } catch (error) {
      return internalServerError(res)
    }
  }
}

export default RoomController
