import express from 'express'
import { getCategories } from '../controllers/categories.js'

const router = express.Router()

router.get('/user/api/v1/category', getCategories)

export default router