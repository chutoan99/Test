import { Request, Response } from 'express'
import CommentService from './index.service'
import { internalServerError } from '~/middleWares/handle_errors'

const CommentController = {
  GetAll: async (req: any, res: Response) => {
    try {
      const { shopid } = req.shop
      const query = req.query
      CommentService.GetAll({ shopid, ...query }).then((response: any) => {
        res.status(200).json(response)
      })
    } catch (error) {
      internalServerError(res)
    }
  },

  GetOne: async (req: Request, res: Response) => {
    try {
      const response: any = CommentService.GetOne()
      return res.status(200).json(response)
    } catch (error) {
      internalServerError(res)
    }
  },

  Create: async (req: Request, res: Response) => {
    try {
      const response: any = CommentService.Create
      return res.status(200).json(response)
    } catch (error) {
      internalServerError(res)
    }
  },

  Update: async (req: Request, res: Response) => {
    try {
      const response: any = CommentService.Update
      return res.status(200).json(response)
    } catch (error) {
      internalServerError(res)
    }
  },

  Delete: async (req: Request, res: Response) => {
    try {
      const response: any = CommentService.Delete
      return res.status(200).json(response)
    } catch (error) {
      internalServerError(res)
    }
  }
}

export default CommentController
