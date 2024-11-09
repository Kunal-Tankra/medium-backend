import express from 'express'
import { createPost, getAllPosts } from '../controllers/posts.js'
import { isAuthenticated } from '../middlewares/authToken.js'

const router = express.Router()

router.post('/api/v1/auth/post', createPost)
router.get('/user/api/v1/post', isAuthenticated, getAllPosts)

export default router