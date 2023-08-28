import express from 'express'
import NotifyController from './index.controller'

const router = express.Router()

router.get('/', NotifyController.GetAll)

export default router
