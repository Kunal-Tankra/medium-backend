import { app } from "./app.js";
import mongoose from 'mongoose'

const connectDB = () => {
    mongoose.connect(process.env.DB_URL, { dbName: 'medium' })
        .then(() => console.log('db connected'))
        .catch((err) => console.log('error connecting with db', err))
}

app.listen(process.env.PORT, () => {
    console.log('app is listening on port:', process.env.PORT)
    connectDB()
})