const { createAdmin, adminLogin } = require('./authentication.contoller')
const express = require('express')
const { checkToken } = require('../../auth/token_validation')
const router = express.Router()

router.post('/createAdmin', checkToken, createAdmin)
router.post('/admin/login', adminLogin)

module.exports = router
