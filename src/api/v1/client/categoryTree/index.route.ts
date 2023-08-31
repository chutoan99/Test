import express from 'express'
import CategoriesTreeController from './index.controller'

const router = express.Router()

router.get('/:level', CategoriesTreeController.GetAllCategoriesTree)
router.get('/parent/:catid', CategoriesTreeController.GetAllCategoriesParent)

export default router
