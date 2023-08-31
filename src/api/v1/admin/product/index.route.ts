import express from 'express'
import fileUploader from '~/configs/cloudinary'
import { verifyToken, isShopAdmin } from '~/middleWares/jwt'
import ProductController from './index.controller'

const router = express.Router()

router.get('/', verifyToken, isShopAdmin, ProductController.GetAll)

router.post('/', verifyToken, isShopAdmin, fileUploader.single('image'), ProductController.Create)

router.get('/:itemid', verifyToken, isShopAdmin, ProductController.GetOne)

router.put('/:itemid', verifyToken, isShopAdmin, fileUploader.single('image'), ProductController.Update)

router.delete('/:itemid', verifyToken, isShopAdmin, ProductController.Delete)

export default router
