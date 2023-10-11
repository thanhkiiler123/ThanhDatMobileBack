const express = require('express')
const router = express.Router()
const cookieJWTAuth = require('../middleware/auth')
const checkOut = require('../controllers/ThanhToanController')

router.post('/', cookieJWTAuth, checkOut)

module.exports = router
