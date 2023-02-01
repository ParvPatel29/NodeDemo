const { getRegionByCountry, getRegion } = require('./region.controller')
const express = require('express')
const router = express.Router()

router.get('/getRegionByCountry/:id', getRegionByCountry)
router.get('/getRegion', getRegion)

module.exports = router
