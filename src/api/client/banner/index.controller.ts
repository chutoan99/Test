import { Request, Response } from 'express'
import BannerService from './index.service'
import { internalServerError } from '~/middleWares/handle_errors'

const BannerController = {
  GetBanners: async (req: Request, res: Response) => {
    try {
      const response = await BannerService.GetBanners()
      return res.status(200).json(response)
    } catch (error) {
      return internalServerError(res)
    }
  }
}

export default BannerController
