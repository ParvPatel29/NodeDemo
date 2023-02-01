const {
  createLabReport,
  getLabReport,
  updateLabReport,
  deleteLabReport,
  getLabReportById,
  getLabReportByAppointment,
  updateLabReportPic,
  deleteLabReportPic,
} = require('./labreport.controller')
const express = require('express')
const { checkToken } = require('../../auth/token_validation')
const router = express.Router()

router.post('/createLabReport', checkToken, createLabReport)
router.get('/getLabReport', checkToken, getLabReport)
router.get('/getLabReportById/:id', checkToken, getLabReportById)
router.get(
  '/getLabReportByAppointment/:id',
  checkToken,
  getLabReportByAppointment,
)
router.patch('/updateLabReport', checkToken, updateLabReport)
router.patch('/updateLabReportPic', checkToken, updateLabReportPic)
router.patch('/deleteLabReportPic', checkToken, deleteLabReportPic)
router.delete('/deleteLabReport/:id', checkToken, deleteLabReport)

module.exports = router
