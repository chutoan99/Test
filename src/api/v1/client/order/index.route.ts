import express from 'express'
import { verifyToken } from '~/middleWares/jwt'
import OrderClientController from './index.controller'
const router = express.Router()

// router.get('/', verifyToken, OrderClientController.GetAllOrder)

router.get('/', verifyToken, OrderClientController.GetAll)

router.post('/', verifyToken, OrderClientController.Create)

router.get('/search', verifyToken, OrderClientController.Search)

router.get('/:orderid', verifyToken, OrderClientController.GetOne)

router.put('/:orderid', verifyToken, OrderClientController.Update)

router.delete('/:orderid', verifyToken, OrderClientController.Delete)

export default router
