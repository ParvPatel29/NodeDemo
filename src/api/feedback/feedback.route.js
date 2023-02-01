const {
  createFeedback,
  getFeedback,
  deleteFeedback,
  getFeedbackById
} = require('./feedback.controller')
const express = require('express')
const { checkToken } = require('../../auth/token_validation')
const router = express.Router()

router.post('/createFeedback', checkToken, createFeedback)
router.get('/getFeedback', getFeedback)
router.delete('/deleteFeedback/:id', checkToken, deleteFeedback)
router.get('/getFeedbackById/:id', checkToken, getFeedbackById)

module.exports = router
