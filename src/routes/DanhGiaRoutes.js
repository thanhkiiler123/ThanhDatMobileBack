const express = require('express')
const router = express.Router()

const { createDanhGia, getAllDanhGia, updateDanhGia, deleteDanhGia } = require('../controllers/DanhGiaController')

router.route('/').post(createDanhGia)

router.route('/:PK_MaDienThoai').get(getAllDanhGia)

router.route('/:PK_MaDanhGia').put(updateDanhGia).delete(deleteDanhGia)

module.exports = router
