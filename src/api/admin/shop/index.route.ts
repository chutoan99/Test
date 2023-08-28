import express from 'express'
import ShopController from './index.controller'

const router = express.Router()

router.get('/', ShopController.GetAll)

export default router
