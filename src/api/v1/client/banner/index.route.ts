import express from 'express'
import BannerController from './index.controller'

const router = express.Router()

router.get('/', BannerController.GetBanners)

export default router
