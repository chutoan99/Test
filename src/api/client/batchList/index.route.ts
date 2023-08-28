import express from 'express'
import BatchListController from './index.controller'

const router = express.Router()

router.get('/', BatchListController.GetAll)

export default router
