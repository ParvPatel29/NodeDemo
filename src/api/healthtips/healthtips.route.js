const {
  createHealthTips,
  getHealthTips,
  updateHealthTips,
  deleteHealthTips,
  getHealthTipsById,
  getHealthtipsTags,
  getNextHealthTipId,
  getPrevHealthTipId,
} = require('./healthtips.controller')
const express = require('express')
const { checkToken } = require('../../auth/token_validation')
const router = express.Router()

router.post('/createHealthTips', checkToken, createHealthTips)
router.get('/getHealthTips', getHealthTips)
router.patch('/updateHealthTips', checkToken, updateHealthTips)
router.get('/getHealthTipsById/:id', getHealthTipsById)
router.get('/getNextHealthTipId/:id', getNextHealthTipId)
router.get('/getPrevHealthTipId/:id', getPrevHealthTipId)
router.get('/getHealthtipsTags', getHealthtipsTags)
router.delete('/deleteHealthTips/:id', checkToken, deleteHealthTips)

module.exports = router
