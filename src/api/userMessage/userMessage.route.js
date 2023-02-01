const {
  createUserMessage,
  getUserMessages,
  getUserMessagesById
} = require('./userMessage.controller')
const express = require('express')
const { checkToken } = require('../../auth/token_validation')
const router = express.Router()

router.post('/createUserMessage', createUserMessage)
router.get('/getUserMessages', getUserMessages)
router.get('/getUserMessagesById/:id', getUserMessagesById)

module.exports = router
