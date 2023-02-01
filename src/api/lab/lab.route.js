const {
  createLab,
  getLab,
  updateLab,
  updateLabProfile,
  getLabById,
  deleteLab,
  updateLabProfilePic,
} = require('./lab.controller')
const express = require('express')
const { checkToken } = require('../../auth/token_validation')
const router = express.Router()

router.post('/createLab', checkToken, createLab)
router.get('/getLab', checkToken, getLab)
router.get('/getLabById/:id', checkToken, getLabById)
router.patch('/updateLab', checkToken, updateLab)
router.patch('/updateLabProfile', checkToken, updateLabProfile)
router.patch('/updateLabProfilePic', updateLabProfilePic)
router.delete('/deleteLab/:id', checkToken, deleteLab)

module.exports = router
