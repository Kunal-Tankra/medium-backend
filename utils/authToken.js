import jwt from 'jsonwebtoken'

export const generateAuthTokens = (user_id) => {
    // const access = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '7d' })
    // const refresh = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '30d' })
    const access = jwt.sign({ user_id }, process.env.JWT_SECRET,)
    const refresh = jwt.sign({ user_id }, process.env.JWT_SECRET,)

    return {
        access, refresh
    }

}