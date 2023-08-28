import { Request, Response } from 'express'
import { internalServerError } from '~/middleWares/handle_errors'
import CartService from './index.service'

const CartController = {
  GetAll: async (req: any, res: Response) => {
    try {
      const { userid } = req.user
      const response = await CartService.GetAll(userid)
      return res.status(200).json(response)
    } catch (error) {
      return internalServerError(res)
    }
  },

  Create: async (req: any, res: Response) => {
    const payload = req.body
    const { userid } = req.user
    try {
      const response = await CartService.Create(payload, userid)
      return res.status(200).json(response)
    } catch (error) {
      return internalServerError(res)
    }
  },

  Update: async (req: Request, res: Response) => {
    const payload = req.body
    const { cartid } = req.params
    try {
      const response = await CartService.Update(cartid, payload)
      return res.status(200).json(response)
    } catch (error) {
      return internalServerError(res)
    }
  },

  Delete: async (req: Request, res: Response) => {
    const { cartid } = req.params
    try {
      const response = await CartService.Delete(cartid)
      return res.status(200).json(response)
    } catch (error) {
      return internalServerError(res)
    }
  }
}

export default CartController
