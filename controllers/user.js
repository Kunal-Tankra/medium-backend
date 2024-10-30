import Users from "../models/user.js"
import { sendError, sendInternalServerError } from "../utils/error.js"
import bcrypt from 'bcrypt'

export const register = async (req, res) => {
    try {
        let { first_name, last_name, email, password, password1 } = req.body
        password = password.trim()
        password1 = password1.trim()


        if (!(first_name && last_name && email && password && password1)) {
            return sendError(res, 'Incomplete data provided', 400)
        }

        // check for the passwords if dose not match
        if (password !== password1) {
            return sendError(res, 'Password did not match', 400)
        }

        // check for email
        let user = await Users.findOne({ email })

        if (user) {
            return sendError(res, 'Email already exists', 409)
        }

        const hashPassword = await bcrypt.hash(password, 10)


        user = await Users.create({
            first_name,
            last_name,
            email,
            password: hashPassword
        })

        res.send({
            success: true,
            message: 'Registered successfully'
        })
    } catch (error) {
        sendInternalServerError(res, error)
    }
}

export const login = async (req, res) => {
    try {

    } catch (error) {
        sendInternalServerError(red, error)
    }
}