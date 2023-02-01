const { getCounrty } = require('./country.controller')
const express = require('express')
const router = express.Router()

router.get('/getCounrty', getCounrty)

module.exports = router
