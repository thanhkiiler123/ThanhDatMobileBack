const express = require('express')
const router = express.Router()
const { getLienHe, addLienHe, updateLienHe, deleteLienHe } = require('../controllers/LienHeController')

router.route('/').post(addLienHe).get(getLienHe)
router.route('/:PK_MaLienHe').put(updateLienHe).delete(deleteLienHe)

module.exports = router
