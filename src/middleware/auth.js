const { StatusCodes } = require('http-status-codes')
const jwt = require('jsonwebtoken')

const cookieJWTAuth = async (req, res, next) => {
    const authHeader = await req.headers.authorization
    const token = await authHeader.split(' ')[1]
    if (!token) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ msg: 'Missing authorization header' })
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(StatusCodes.FORBIDDEN).json({ msg: 'Invalid or expired token' })
        }
        next()
    })
}

module.exports = cookieJWTAuth
