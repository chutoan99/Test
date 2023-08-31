import express from 'express'
import FlashSaleController from './index.controller'

const router = express.Router()

router.get('/', FlashSaleController.GetAll)

export default router
