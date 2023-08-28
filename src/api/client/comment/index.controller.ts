import { Request, Response } from 'express'
import CommentService from './index.service'
import { internalServerError } from '~/middleWares/handle_errors'

const CommentController = {
  GetAll: async (req: Request, res: Response) => {
    try {
      const query = req.query
      CommentService.GetAll({ ...query }).then((response: any) => {
        res.status(200).json(response)
      })
    } catch (error) {
      internalServerError(res)
    }
  },

  Create: async (req: any, res: Response) => {
    try {
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ error: 'No files uploaded' })
      }
      const { userid } = req.user
      const payload = req.body
      const filesdata = req.files
      CommentService.Create(userid, payload, filesdata).then((response: any) => {
        res.status(200).json(response)
      })
    } catch (error) {
      return internalServerError(res)
    }
  }
}

export default CommentController
