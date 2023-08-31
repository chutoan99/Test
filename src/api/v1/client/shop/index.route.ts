import express from 'express'
import ShopController from './index.controller'

const router = express.Router()

router.get('/items/:shopid', ShopController.GetItems)

router.get('/:shopid', ShopController.GetShopID)

export default router
