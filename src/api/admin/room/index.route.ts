import express from 'express'
import { verifyToken, isShopAdmin } from '~/middleWares/jwt'
import RoomController from './index.controller'

const router = express.Router()

router.get('/', verifyToken, isShopAdmin, RoomController.GetAll)

export default router
