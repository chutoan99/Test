import express from 'express'
import SearchSuggestionController from './index.controller'

const router = express.Router()

router.get('/', SearchSuggestionController.GetAll)

export default router
