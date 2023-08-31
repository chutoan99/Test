import { Request, Response } from 'express'
import { internalServerError } from '~/middleWares/handle_errors'
import NotifyService from './index.service'

const NotifyController = {
  GetAll: async (req: Request, res: Response) => {
    try {
      const response = await NotifyService.GetAll()
      return res.status(200).json(response)
    } catch (error) {
      return internalServerError(res)
    }
  }
}

export default NotifyController
