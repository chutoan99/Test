import express from 'express'
import { verifyToken } from '~/middleWares/jwt'
import SearchController from './index.controller'

const router = express.Router()

router.get('/', verifyToken, SearchController.GetAll)

router.post('/', verifyToken, SearchController.Create)

export default router
