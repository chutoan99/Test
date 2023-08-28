import { Request, Response } from 'express'
import Joi from 'joi'
const cloudinary = require('cloudinary').v2
import { internalServerError, badRequest } from '~/middleWares/handle_errors'
import { image, name, price } from '~/helpers/validate'
import ProductService from './index.service'

const ProductController = {
  GetAll: async (req: any, res: Response) => {
    try {
      const { shopid } = req.shop
      const query = req.query
      ProductService.GetAll({ shopid, ...query }).then((response: any) => {
        res.status(200).json(response)
      })
    } catch (error) {
      return internalServerError(res)
    }
  },
  Create: async (req: any, res: Response) => {
    try {
      const { shopid } = req.shop
      const fileData = req.file
      const payload = req.body

      const { error } = Joi.object({ image, name, price }).validate({
        name: req.body.name,
        price: req.body.price,
        image: fileData.path
      })
      if (error) {
        if (fileData) cloudinary.uploader.destroy(fileData.filename)
        return badRequest(error.details[0].message, res)
      }

      ProductService.Create(shopid, payload, fileData).then((response: any) => {
        res.status(200).json(response)
      })
    } catch (error) {
      internalServerError(res)
    }
  },
  GetOne: async (req: Request, res: Response) => {
    try {
      const { itemid } = req.params
      ProductService.GetOne(itemid).then((response: any) => {
        return res.status(200).json(response)
      })
    } catch (error) {
      internalServerError(res)
    }
  },

  Update: async (req: Request, res: Response) => {
    try {
      const { itemid } = req.params
      const fileData = req.file
      const payload = req.body
      ProductService.Update(itemid, fileData, payload).then((response: any) => {
        res.status(200).json(response)
      })
    } catch (error) {
      internalServerError(res)
    }
  },

  Delete: async (req: Request, res: Response) => {
    try {
      const { itemid } = req.params
      const { fileName } = req.query
      ProductService.Delete(itemid, fileName).then((response: any) => {
        res.status(200).json(response)
      })
    } catch (error) {
      internalServerError(res)
    }
  }
}

export default ProductController
