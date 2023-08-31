import { Response } from 'express'
import RoomService from './index.service'
import { internalServerError } from '~/middleWares/handle_errors'

const RoomController = {
  GetAll: async (req: any, res: Response) => {
    const { userid } = req.user
    try {
      const response = await RoomService.GetAll(userid)
      return res.status(200).json(response)
    } catch (error) {
      return internalServerError(res)
    }
  },

  Create: async (req: any, res: Response) => {
    const payload = req.body
    const { userid } = req.user
    try {
      const response = await RoomService.Create(payload, userid)
      return res.status(200).json(response)
    } catch (error) {
      return internalServerError(res)
    }
  }
}

export default RoomController
