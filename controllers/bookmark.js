import Bookmarks from "../models/bookmarks.js"
import { sendError, sendInternalServerError } from "../utils/error.js"

export const bookmark = async (req, res) => {
    try {
        const { user_id, post_id } = req.body

        if (!(user_id && post_id)) {
            return sendError(res, 'User ID and Post ID are required', 400)
        }

        const isBookmarked = await Bookmarks.findOneAndDelete({ user_id, post_id })

        if (!isBookmarked) {
            // bookmark the post
            await Bookmarks.create({ user_id, post_id })
        }

        res.send({
            success: true,
            message: isBookmarked ? 'Bookmark removed successfully' : 'Post bookmarked successfully',
        })
    } catch (error) {
        sendInternalServerError(res, error.message)
    }
}

export const getBookMarks = async (req, res) => {
    try {
        const { user_id } = req.params

        if (!user_id) {
            return sendError(res, 'User id is required', 400)
        }

        const posts = (await Bookmarks.find({ user_id }).populate('post_id').sort({ bookmarkedAt: -1 })).map(post => post.post_id)

        res.send({
            success: true,
            data: posts
        })
    } catch (error) {
        sendInternalServerError(res, error.message)
    }
}