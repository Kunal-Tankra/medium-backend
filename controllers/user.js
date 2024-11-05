import Users from "../models/user.js"
import { generateAuthTokens } from "../utils/authToken.js"
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
        sendInternalServerError(res, error.message)
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!(email && password)) {
            return sendError(res, 'Incomplete data provided', 400)
        }

        let user = await Users.findOne({ email }).select('+password').lean()

        if (!user) {
            return sendError(res, 'User not found', 404)
        }

        const isMatched = await bcrypt.compare(password, user.password)

        if (!isMatched) {
            return sendError(res, 'Invalid credentials', 401)
        }


        const { access, refresh } = generateAuthTokens(user._id)
        user = {
            username: `${user.first_name} ${user.last_name}`,
            email: user.email,
            profile_pic: '',
            id: user._id
        }

        res.send({
            success: true,
            message: 'Logged in successfully',
            user,
            access,
            refresh
        })

    } catch (error) {
        sendInternalServerError(res, error.message)
    }
}

export const googleAuth = async (req, res) => {
    try {
        const { email } = req.body

        if (!email) {
            return sendError(res, 'Incomplete data provided', 400)
        }

        let user = await Users.findOne({ email })

        if (!user) {
            // if user doesn't exists then save the data
            user = await Users.create({ email })
        }

        const { access, refresh } = generateAuthTokens(user._id)

        res.send({
            success: true,
            id: user._id,
            access,
            refresh
        })

    } catch (error) {
        sendInternalServerError(res, error.message)
    }
}