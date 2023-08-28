import { Request, Response } from 'express'
import { internalServerError } from '~/middleWares/handle_errors'
import GetAllIndustryService from './index.service'

const IndustryController = {
  GetAll: async (req: Request, res: Response) => {
    try {
      const response = await GetAllIndustryService.GetAllIndustry()
      return res.status(200).json(response)
    } catch (error) {
      return internalServerError(res)
    }
  },
  GetAllCategory: async (req: Request, res: Response) => {
    try {
      const { page, limit, category_name } = req.query

      const response = await GetAllIndustryService.GetAllIndustryWithCategory({
        page: Number(page),
        limit: Number(limit),
        category_name
      })
      return res.status(200).json(response)
    } catch (error) {
      return internalServerError(res)
    }
  }
}

export default IndustryController
