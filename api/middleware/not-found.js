const { StatusCodes } = require("http-status-codes")

const notFound = (req, res, next) => {
    const error = new Error(`not found - $${req.originalUrl}`)
    res.status(StatusCodes.NOT_FOUND)
    next(error)
}

module.exports = { notFound }