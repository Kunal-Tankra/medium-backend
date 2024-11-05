import express from 'express'
import { createPost } from '../controllers/posts.js'

const router = express.Router()

router.post('/api/v1/auth/post', createPost)

export default router