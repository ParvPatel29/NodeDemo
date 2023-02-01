const {
  createCall,
  getCredintial,
  getCallData,
  acceptCall,
  declineCall
} = require('./videoCall.controller')
const express = require('express')
const { checkToken } = require('../../auth/token_validation')
const router = express.Router()

router.post('/createCall', createCall)
router.post('/getCredintial', getCredintial)
router.post('/getCallData', getCallData)
router.post('/acceptCall', acceptCall)
router.post('/declineCall', declineCall)

module.exports = router
