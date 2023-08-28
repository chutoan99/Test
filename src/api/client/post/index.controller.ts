import { Request, Response } from 'express'
import PostService from './index.service'
import { internalServerError } from '~/middleWares/handle_errors'

const PostController = {
  GetAll: async (req: Request, res: Response) => {
    try {
      const query = req.query
      const response = await PostService.GetAll(query)
      return res.status(200).json(response)
    } catch (error) {
      return internalServerError(res)
    }
  },

  Search: async (req: Request, res: Response) => {
    try {
      const query = req.query
      const response = await PostService.Search(query)
      return res.status(200).json(response)
    } catch (error) {
      return internalServerError(res)
    }
  },

  GetOne: async (req: Request, res: Response) => {
    const { itemid } = req.params
    try {
      const response = await PostService.GetOne(itemid)
      return res.status(200).json(response)
    } catch (error) {
      internalServerError(res)
    }
  }
}

export default PostController
