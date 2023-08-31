import express from 'express'
import TopProductController from './index.controller'

const router = express.Router()

router.get('/', TopProductController.GetAll)

export default router
