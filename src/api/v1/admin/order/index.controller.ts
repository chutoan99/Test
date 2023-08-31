import { Request, Response } from 'express'
import OrderService from './index.service'
import { internalServerError } from '~/middleWares/handle_errors'

const OrderController = {
  GetAll: async (req: Request, res: Response) => {
    try {
      const response = await OrderService.GetAll
      return res.status(200).json(response)
    } catch (error) {
      internalServerError(res)
    }
  },

  GetOne: async (req: Request, res: Response) => {
    try {
      const response = await OrderService.GetOne
      return res.status(200).json(response)
    } catch (error) {
      internalServerError(res)
    }
  },

  Create: async (req: Request, res: Response) => {
    try {
      const response = await OrderService.Create
      return res.status(200).json(response)
    } catch (error) {
      internalServerError(res)
    }
  },

  Update: async (req: Request, res: Response) => {
    try {
      const response = await OrderService.Update
      return res.status(200).json(response)
    } catch (error) {
      internalServerError(res)
    }
  },

  Delete: async (req: Request, res: Response) => {
    try {
      const response = await OrderService.Delete
      return res.status(200).json(response)
    } catch (error) {
      internalServerError(res)
    }
  }
}

export default OrderController
