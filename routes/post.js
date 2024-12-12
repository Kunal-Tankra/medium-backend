import express from 'express'
import { createPost, getAllPosts, getCategoryPosts, getPostDetails } from '../controllers/posts.js'
import { isAuthenticated } from '../middlewares/authToken.js'

const router = express.Router()

router.post('/api/v1/auth/post', createPost)
router.get('/api/v1/auth/post/:post_id', getPostDetails)
router.get('/api/v1/auth/post/:post_id/:user_id', getPostDetails)
router.get('/user/api/v1/post', getAllPosts)
router.get('/user/api/v1/post/:user_id', getAllPosts)

router.get('/api/v1/auth/category-post/:category_id', getCategoryPosts)
router.get('/api/v1/auth/category-post/:category_id/:user_id', getCategoryPosts)

export default router