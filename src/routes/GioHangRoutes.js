const express = require('express')
const router = express.Router()

const { getGioHang, addGioHang, removeGioHang } = require('../controllers/GioHangController')

router.route('/').post(addGioHang)

router.route('/:TenDangNhap').get(getGioHang).delete(removeGioHang)

module.exports = router
