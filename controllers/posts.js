import Posts from "../models/posts.js"
import { sendInternalServerError } from "../utils/error.js"

export const createPost = async (req, res) => {
    try {
        const { title, title_image, description, description_image, category, user_id } = req.body

        const data = {
            title,
            ...(title_image && { title_image }),
            description,
            ...(description_image && { description_image }),
            category,
            user_id
        }

        const post = await Posts.create(data)

        res.send({
            success: true,
            post
        })
    } catch (error) {
        sendInternalServerError(res, error.message)
    }
}

export const getAllPosts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1
        const limit = 2
        const skip = (page - 1) * limit;

        const r1 = Posts.countDocuments().skip(page * limit)
        const r2 = Posts.find().skip(skip).limit(limit).sort({ createdAt: -1 })

        const [next, posts] = await Promise.all([r1, r2])

        res.send({
            success: true,
            results: posts,
            next: next ? true : false
        })
    } catch (error) {
        sendInternalServerError(res, error.message)
    }
}