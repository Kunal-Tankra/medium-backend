import { sendError, sendInternalServerError } from "../utils/error.js"
import jwt from 'jsonwebtoken'

export const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1]

        if (!token) {
            return sendError(res, 'Token is missing!', 401)
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                if (err.message === 'jwt expired') {
                    sendError(res, "Token expired", 401)

                }
                else {
                    sendError(res, 'Invalid token', 401)
                }

            }
            else {
                req.user_id = decoded.user_id
                next()

            }

        })

    } catch (error) {
        sendInternalServerError(res, error.message)
    }
}