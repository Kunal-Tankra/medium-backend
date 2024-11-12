import express from 'express'
import env from 'dotenv'
import userRouter from './routes/user.js'
import postRouter from './routes/post.js'
import bookmarkRouter from './routes/bookmark.js'
import categoryRouter from './routes/category.js'

export const app = express()

// dot env config
env.config({ path: "./config.env" })

// middlewares
app.use(express.json())


// routers
app.use(userRouter)
app.use(postRouter)
app.use(categoryRouter)
app.use('/api/v1/auth', bookmarkRouter)




