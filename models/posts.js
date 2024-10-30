import mongoose from "mongoose";

const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    title_image: {
        type: String
    },
    description: {
        type: String,
        required: true
    },
    description_image: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Posts = mongoose.model('Posts', schema)
export default Posts