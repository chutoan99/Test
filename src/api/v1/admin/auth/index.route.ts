import express from 'express'
import AuthController from './index.controller'

const router = express.Router()

router.post('/login', AuthController.Login)

export default router
