const {
  createTags,
  getAllTags,
} = require('./tags.controller')
const express = require('express')
const { checkToken } = require('../../auth/token_validation')
const router = express.Router()

router.post('/createTags', checkToken, createTags)
router.get('/getAllTags', getAllTags)

module.exports = router
