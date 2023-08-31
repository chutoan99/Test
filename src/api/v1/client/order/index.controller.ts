import { Request, Response } from 'express'
import OrderService from './index.service'
import { internalServerError } from '~/middleWares/handle_errors'

const OrderClientController = {
  GetAll: async (req: any, res: Response) => {
    try {
      const { userid } = req.user
      const response = await OrderService.GetAll(userid)
      return res.status(200).json(response)
    } catch (error) {
      internalServerError(res)
    }
  },

  Search: async (req: any, res: Response) => {
    try {
      const { userid } = req.user
      const payload = req.query
      const response = await OrderService.Search(userid, payload)
      return res.status(200).json(response)
    } catch (error) {
      internalServerError(res)
    }
  },

  GetOne: async (req: any, res: Response) => {
    try {
      const { userid } = req.user
      const { orderid } = req.params
      const response = await OrderService.GetOne(userid, orderid)
      return res.status(200).json(response)
    } catch (error) {
      internalServerError(res)
    }
  },

  Create: async (req: any, res: Response) => {
    const payload = req.body
    const { userid } = req.user
    try {
      const response = await OrderService.Create(payload, userid)
      return res.status(200).json(response)
    } catch (error) {
      internalServerError(res)
    }
  },

  Update: async (req: any, res: Response) => {
    const payload = req.body
    const { orderid } = req.params
    const { userid } = req.user
    try {
      const response = await OrderService.Update(orderid, payload, userid)
      return res.status(200).json(response)
    } catch (error) {
      internalServerError(res)
    }
  },

  Delete: async (req: any, res: Response) => {
    const { orderid } = req.params
    const { userid } = req.user
    try {
      const response = await OrderService.Delete(orderid, userid)
      return res.status(200).json(response)
    } catch (error) {
      internalServerError(res)
    }
  }
}

export default OrderClientController
