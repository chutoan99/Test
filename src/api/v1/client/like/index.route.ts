import express from 'express'
import { verifyToken } from '~/middleWares/jwt'
import LikeController from './index.controller'

const router = express.Router()

router.get('/', verifyToken, LikeController.GetAll)

router.post('/', verifyToken, LikeController.Create)

router.delete('/:itemid/', verifyToken, LikeController.Delete)

export default router
