export const sendInternalServerError = (res, error) => {
    res.status(500).send({
        success: false,
        message: 'Internal server error',
        ...error && { error }
    })
}

export const sendError = (res, message = 'Internal server error', statusCode = 500) => {
    res.status(statusCode).send({
        success: false,
        message
    })
}