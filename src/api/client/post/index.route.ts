import express from 'express'
import PostController from './index.controller'

const router = express.Router()

router.get('/', PostController.GetAll)

router.get('/search', PostController.Search)

router.get('/:itemid', PostController.GetOne)

export default router
