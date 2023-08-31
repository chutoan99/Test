import { Request, Response } from 'express'
import AccountService from './index.service'
import { internalServerError } from '~/middleWares/handle_errors'

const AccountController = {
  GetProfile: async (req: any, res: Response) => {
    try {
      const { userid } = req.shop
      AccountService.GetProfile(userid).then((response: any) => {
        res.status(200).json(response)
      })
    } catch (error) {
      return internalServerError(res)
    }
  },

  UpdateProfile: async (req: any, res: Response) => {
    try {
      const payload = req.body
      const { userid } = req.shop
      AccountService.UpdateProfile(userid, payload).then((response: any) => {
        res.status(200).json(response)
      })
    } catch (error) {
      internalServerError(res)
    }
  },

  GetShop: async (req: any, res: Response) => {
    try {
      const { userid } = req.shop
      AccountService.GetShop(userid).then((response: any) => {
        res.status(200).json(response)
      })
    } catch (error) {
      return internalServerError(res)
    }
  },

  UpdateShop: async (req: any, res: Response) => {
    try {
      const payload = req.body
      const { userid } = req.shop
      AccountService.UpdateShop(userid, payload).then((response: any) => {
        res.status(200).json(response)
      })
    } catch (error) {
      return internalServerError(res)
    }
  }
}

export default AccountController
