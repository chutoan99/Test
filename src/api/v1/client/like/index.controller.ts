import { Response } from 'express'
import { LikeService } from './index.service'
import { internalServerError } from '~/middleWares/handle_errors'

const LikeController = {
  GetAll: async (req: any, res: Response) => {
    const { userid } = req.user
    try {
      const response = await LikeService.GetAll(userid)
      return res.status(200).json(response)
    } catch (error) {
      return internalServerError(res)
    }
  },

  Create: async (req: any, res: Response) => {
    const payload = req.body
    const { userid } = req.user
    try {
      const response = await LikeService.Create(payload, userid)
      return res.status(200).json(response)
    } catch (error) {
      return internalServerError(res)
    }
  },

  Delete: async (req: any, res: Response) => {
    const { itemid } = req.params
    const { userid } = req.user
    try {
      const response = await LikeService.Delete(itemid, userid)
      return res.status(200).json(response)
    } catch (error) {
      return internalServerError(res)
    }
  }
}

export default LikeController
