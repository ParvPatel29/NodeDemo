const {
  createHospitalStaff,
  getHospitalStaff,
  updateHospitalStaff,
  deleteHospitalStaff,
  getHospitalStaffById,
  getAllHospitalStaff,
} = require('./hospitalStaff.controller')
const express = require('express')
const { checkToken } = require('../../auth/token_validation')
const router = express.Router()

router.post('/createHospitalStaff', checkToken, createHospitalStaff)
router.get('/getHospitalStaff', checkToken, getHospitalStaff)
router.get('/getAllHospitalStaff', getAllHospitalStaff)
router.patch('/updateHospitalStaff', checkToken, updateHospitalStaff)
router.delete('/deleteHospitalStaff/:id', checkToken, deleteHospitalStaff)
router.get('/getHospitalStaffById/:id', checkToken, getHospitalStaffById)

module.exports = router
