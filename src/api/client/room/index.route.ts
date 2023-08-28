import express from 'express'
import { verifyToken } from '~/middleWares/jwt'
import RoomController from './index.controller'

const router = express.Router()

router.get('/', verifyToken, RoomController.GetAll)

router.get('/:roomid', verifyToken, RoomController.GetOne)

router.post('/', verifyToken, RoomController.Create)

router.delete('/:roomid', verifyToken, RoomController.Delete)

export default router
