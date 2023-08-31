import express from 'express'
import ShopMallController from './index.controller'

const router = express.Router()

router.get('/', ShopMallController.GetAll)

export default router
