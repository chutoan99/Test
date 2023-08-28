import express, { Router } from 'express'
import crawlControllers from './index.controller'

require('dotenv').config()

const router: Router = express.Router()

router.get('/categoryTree', crawlControllers.CategoryTree)

router.get('/homeCategory', crawlControllers.HomeCategory)

router.get('/flashSale', crawlControllers.FlashSale)

router.get('/hotItems', crawlControllers.HotItems)

router.get('/ratings', crawlControllers.Ratings)

router.get('/shopInfo', crawlControllers.ShopInfo)

router.get('/shopDetail', crawlControllers.ShopDetail)

router.get('/getItem', crawlControllers.GetItem)

router.get('/getallcate', crawlControllers.CATE)

router.get('/shopMall', crawlControllers.ShopMall)

export default router
