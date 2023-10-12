const express = require('express')
const router = express.Router()

const { createDanhGia, getAllDanhGia, updateDanhGia, deleteDanhGia } = require('../controllers/DanhGiaController')

router.route('/').post(createDanhGia)

router.route('/:PK_MaDanhGia').get(getAllDanhGia).put(updateDanhGia).delete(deleteDanhGia)

module.exports = router
