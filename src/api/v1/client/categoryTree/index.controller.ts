import { Request, Response } from 'express'
import CategoriesTreeService from './index.service'
import { internalServerError } from '~/middleWares/handle_errors'

const CategoriesTreeController = {
  GetAllCategoriesTree: async (req: Request, res: Response) => {
    try {
      const { level } = req.params
      const response = await CategoriesTreeService.GetAllCategoriesTree(+level)
      return res.status(200).json(response)
    } catch (error) {
      return internalServerError(res)
    }
  },

  GetAllCategoriesParent: async (req: Request, res: Response) => {
    try {
      const { catid } = req.params
      const response = await CategoriesTreeService.GetAllCategoriesParent(+catid)
      return res.status(200).json(response)
    } catch (error) {
      return internalServerError(res)
    }
  }
}

export default CategoriesTreeController
