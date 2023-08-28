import express, { Router } from 'express'
import { verifyToken } from '~/middleWares/jwt'
import fileUploader from '~/configs/cloudinary'
import UserController from './index.controller'

require('dotenv').config()

const router: Router = express.Router()

router.get('/current', verifyToken, UserController.GetCurrent)

router.put('/', verifyToken, fileUploader.single('avatar'), UserController.UpdateCurrent)

export default router
