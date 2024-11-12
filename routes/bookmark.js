import express from 'express'
import { bookmark, getBookMarks } from '../controllers/bookmark.js'
import { isAuthenticated } from '../middlewares/authToken.js'

const router = express.Router()

router.post('/book-marks', isAuthenticated, bookmark)
router.get('/user/book-marks/:user_id', getBookMarks)

export default router
