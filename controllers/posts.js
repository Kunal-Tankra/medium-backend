import { isAuthenticated } from "../middlewares/authToken.js"
import Bookmarks from "../models/bookmarks.js"
import Categories from "../models/categories.js"
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
        const r2 = Posts.find().skip(skip).limit(limit).sort({ createdAt: -1 }).populate('user_id', 'first_name last_name email').populate('category').lean()

        const [next, posts] = await Promise.all([r1, r2])

        const data = posts.map(({ user_id, ...post }) => ({ ...post, user: { _id: user_id._id, name: (user_id.first_name && user_id.last_name) ? `${user_id.first_name} ${user_id.last_name}` : user_id.email.split('@')[0] }, isBookmarked: false }))

        // set bookmark status by user
        const { user_id } = req.params
        if (user_id) {
            // get all bookmarks of user
            const bookmarkedPosts = (await Bookmarks.find({ user_id })).map(item => item.post_id)

            // check and set bookmark status in data 
            for (const post of data) {
                if (bookmarkedPosts.toString().includes(post._id.toString())) {
                    post.isBookmarked = true
                }
            }
        }

        res.send({
            success: true,
            data,
            next: next ? true : false
        })
    } catch (error) {
        sendInternalServerError(res, error.message)
    }
}

export const getPostsByUserId = async (req, res) => {
    try {
        const { user } = req.params  //user id to get posts of this user
        const loggedInUser = req.user_id

        if (!user || !loggedInUser) {
            return sendError(res, 'Invalid request', 400)
        }

        const p1 = Posts.find({ user_id: user }).sort({ createdAt: -1 }).select('-title_image -description_image').populate('category').populate('user_id', 'first_name last_name email').lean()

        const p2 = Bookmarks.find({ user_id: loggedInUser }).select('post_id').lean()

        let [posts, bookmarkedPosts] = await Promise.all([p1, p2])

        bookmarkedPosts = bookmarkedPosts.map(item => item.post_id)

        const data = posts.map(({ user_id, ...post }) => ({ ...post, user: { _id: user_id._id, name: (user_id.first_name && user_id.last_name) ? `${user_id.first_name} ${user_id.last_name}` : user_id.email.split('@')[0] }, isBookmarked: bookmarkedPosts.toString().includes(post._id.toString()) }))

        res.send({
            success: true,
            data
        })

    } catch (error) {
        sendInternalServerError(res, error.message)
    }
}

export const getPostDetails = async (req, res) => {
    try {
        const { post_id, user_id } = req.params

        // check if this post has been bookmarked by this user or not
        const r1 = user_id ? Bookmarks.findOne({ post_id, user_id }) : false

        // get post details
        const r2 = Posts.findById(post_id).populate('user_id', 'first_name last_name email').populate('category').lean()

        const [isBookmarked, post] = await Promise.all([r1, r2])
        post.user_bookmark = isBookmarked ? true : false
        post.user = {
            _id: post.user_id._id,
            name: (post.user_id.first_name && post.user_id.last_name) ? `${post.user_id.first_name} ${post.user_id.last_name}` : post.user_id.email.split('@')[0]
        }

        delete (post.user_id)

        res.send({ success: true, data: post })
    } catch (error) {
        sendInternalServerError(res, error.message)
    }
}

export const getCategoryPosts = async (req, res) => {
    try {
        const { category_id, user_id } = req.params

        const p1 = Categories.findById(category_id)

        const p2 = Posts.find({ category: category_id }).sort({ createdAt: -1 }).populate('user_id', 'first_name last_name email').populate('category').lean()

        const [category, posts] = await Promise.all([p1, p2])

        const data = posts.map(({ user_id, ...post }) => ({ ...post, user: { _id: user_id._id, name: (user_id.first_name && user_id.last_name) ? `${user_id.first_name} ${user_id.last_name}` : user_id.email.split('@')[0] }, isBookmarked: false }))


        if (user_id) {
            // get all bookmarks of user
            const bookmarkedPosts = (await Bookmarks.find({ user_id })).map(item => item.post_id)

            // check and set bookmark status in data 
            for (const post of data) {
                if (bookmarkedPosts.toString().includes(post._id.toString())) {
                    post.isBookmarked = true
                }
            }
        }

        res.send({
            success: true,
            data,
            category

        })
    } catch (error) {
        sendInternalServerError(res, error.message)
    }
}