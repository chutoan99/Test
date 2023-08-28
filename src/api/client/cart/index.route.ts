import express from 'express'
import { verifyToken } from '~/middleWares/jwt'
import CartController from './index.controller'

const router = express.Router()

router.get('/', verifyToken, CartController.GetAll)

router.post('/', verifyToken, CartController.Create)

router.put('/:cartid', verifyToken, CartController.Update)

router.delete('/:cartid', verifyToken, CartController.Delete)

export default router
