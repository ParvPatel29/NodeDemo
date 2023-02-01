const {
  createReportName,
  getReportName,
  updateReportName,
  deleteReportName,
  getReportNameById,
  getAllReportName,
} = require('./reportName.controller')
const express = require('express')
const { checkToken } = require('../../auth/token_validation')
const router = express.Router()

router.post('/createReportName', checkToken, createReportName)
router.get('/getReportName', checkToken, getReportName)
router.get('/getAllReportName', getAllReportName)
router.get('/getReportNameById/:id', checkToken, getReportNameById)
router.patch('/updateReportName', checkToken, updateReportName)
router.delete('/deleteReportName/:id', checkToken, deleteReportName)

module.exports = router
