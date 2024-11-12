import Categories from "../models/categories.js"
import { sendInternalServerError } from "../utils/error.js"

export const getCategories = async (req, res) => {
    try {
        const categories = await Categories.find()

        res.send({
            success: true,
            data: categories
        })
    } catch (error) {
        sendInternalServerError(res, error.message)
    }
}