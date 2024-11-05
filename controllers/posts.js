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