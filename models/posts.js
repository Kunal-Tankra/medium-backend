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
    user_id: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Users',
        required: true
    },
    category: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Categories',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { versionKey: false })

const Posts = mongoose.model('Posts', schema)
export default Posts