const express = require('express')
const router = express.Router()

const { getDonHang, getChiTietDonHang, updateDonHang } = require('../controllers/DonHangController')

router.route('/').get(getDonHang)
router.route('/:PK_MaDonHang').get(getChiTietDonHang).put(updateDonHang)

module.exports = router
