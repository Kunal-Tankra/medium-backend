import express from 'express'
import { createPost, getAllPosts, getPostDetails } from '../controllers/posts.js'
import { isAuthenticated } from '../middlewares/authToken.js'

const router = express.Router()

router.post('/api/v1/auth/post', createPost)
router.get('/user/api/v1/post', isAuthenticated, getAllPosts)
router.get('/api/v1/auth/post/:post_id', isAuthenticated, getPostDetails)

export default router