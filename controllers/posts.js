import Bookmarks from "../models/bookmarks.js"
import Posts from "../models/posts.js"
import { sendError, sendInternalServerError } from "../utils/error.js"

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
        const limit = 10
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

export const getPostDetails = async (req, res) => {
    try {
        const { post_id } = req.params

        // check if this post has been bookmarked by this user or not
        const r1 = Bookmarks.findOne({ post_id, user_id: req.user_id })

        // get post details
        const r2 = Posts.findById(post_id).lean()

        const [isBookmarked, post] = await Promise.all([r1, r2])
        post.user_bookmark = isBookmarked ? true : false
        delete (post.user_id)

        res.send({ success: true, data: post })
    } catch (error) {
        sendInternalServerError(res, error.message)
    }
}

export const getCategoryPosts = async (req, res) => {
    try {
        const { category_id } = req.params

        const posts = await Posts.find({ category: category_id }).sort({ createdAt: -1 })

        res.send({
            success: true,
            data: posts
        })
    } catch (error) {
        sendInternalServerError(res, error.message)
    }
}