import express from 'express'
import { verifyToken, isShopAdmin } from '~/middleWares/jwt'
import OrderController from './index.controller'

const router = express.Router()

router.get('/', verifyToken, isShopAdmin, OrderController.GetAll)

router.post('/', verifyToken, isShopAdmin, OrderController.Create)

router.get('/:id', verifyToken, isShopAdmin, OrderController.GetOne)

router.put('/:id', verifyToken, isShopAdmin, OrderController.Update)

router.delete('/:id', verifyToken, isShopAdmin, OrderController.Delete)

export default router
