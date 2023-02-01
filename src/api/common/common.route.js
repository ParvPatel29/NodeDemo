const {
  generateOtp,
  verifyOtp,
  resetPassword,
  commonLogin,
  getUserByMobile,
  forgotPassword,
  uploadFiles,
  updateAppointmentByDoctor,
  getLanguages,
  getTotalRecordsCount
} = require('./common.controller')
const express = require('express')
const { checkToken } = require('../../auth/token_validation')
const multer = require('multer')
const router = express.Router()

router.post('/common/generateOtp', generateOtp)
router.post('/common/verifyOtp', verifyOtp)
router.post('/common/resetPassword', resetPassword)
router.post('/common/forgotPassword', forgotPassword)
router.post('/common/login', commonLogin)
router.post('/common/getUserByMobile', getUserByMobile)
router.post('/common/updateAppointmentByDoctor', updateAppointmentByDoctor)
router.post('/common/upload', multer().single('files'), uploadFiles)
router.get('/common/getLanguage', getLanguages)
router.get('/common/getTotalRecordsCount', getTotalRecordsCount)

module.exports = router
