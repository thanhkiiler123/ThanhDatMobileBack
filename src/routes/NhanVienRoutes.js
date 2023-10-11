const express = require('express')
const router = express.Router()
const { addNhanVien, getNhanVien, deleteNhanVien, updateNhanVien } = require('../controllers/NhanVienController')

router.route('/').post(addNhanVien).get(getNhanVien)

router.route('/:PK_MaNhanVien').put(updateNhanVien).delete(deleteNhanVien)

module.exports = router
