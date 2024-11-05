import express from 'express'
import { googleAuth, login, register } from '../controllers/user.js'

const router = express.Router()

router.post('/user/api/v1/register', register)
router.post('/user/api/v1/login', login)
router.post('/api/v1/auth/firebase-user', googleAuth)

export default router