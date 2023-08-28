import express from 'express'
import { verifyToken, isShopAdmin } from '~/middleWares/jwt'
import CommentController from './index.controller'

const router = express.Router()

router.get('/', verifyToken, isShopAdmin, CommentController.GetAll)

router.post('/', verifyToken, isShopAdmin, CommentController.Create)

router.get('/:id', verifyToken, isShopAdmin, CommentController.GetOne)

router.put('/:id', verifyToken, isShopAdmin, CommentController.Update)

router.delete('/:id', verifyToken, isShopAdmin, CommentController.Delete)

export default router
