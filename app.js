import express from 'express'
import env from 'dotenv'
import userRouter from './routes/user.js'

export const app = express()

// dot env config
env.config({ path: "./config.env" })

// middlewares
app.use(express.json())

// routers
app.use("/user/api/v1", userRouter)



