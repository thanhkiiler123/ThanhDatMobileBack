const express = require('express')
const router = express.Router()
const {
    createDienThoai,
    getAllDienThoai,
    getSingleDienThoai,
    updateDienThoai,
    deleteDienThoai,
} = require('../controllers/DienThoaiController')

router.route('/').post(createDienThoai).get(getAllDienThoai)

router.route('/:PK_MaDienThoai').get(getSingleDienThoai).put(updateDienThoai).delete(deleteDienThoai)

module.exports = router
