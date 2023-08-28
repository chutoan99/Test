import express from 'express'
import { verifyToken } from '~/middleWares/jwt'
import RoomController from './index.controller'

const router = express.Router()

router.get('/', verifyToken, RoomController.GetAll)

router.post('/', verifyToken, RoomController.Create)

export default router
