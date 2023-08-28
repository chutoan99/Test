import express from 'express'

import { verifyToken, isShopAdmin } from '~/middleWares/jwt'
import AccountController from './index.controller'

const router = express.Router()

router.get('/account', verifyToken, isShopAdmin, AccountController.GetProfile)

router.put('/account', verifyToken, isShopAdmin, AccountController.UpdateProfile)

router.get('/shop', verifyToken, isShopAdmin, AccountController.GetShop)

router.put('/shop', verifyToken, isShopAdmin, AccountController.UpdateShop)

export default router
