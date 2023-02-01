const {
  createHospital,
  getHospital,
  updateHospital,
  deleteHospital,
  getHospitalById,
  getAllHospitals,
  hospitalLogin,
  getLabAndPharmacyByHospitalId,
} = require('./hospital.controller')
const express = require('express')
const { checkToken } = require('../../auth/token_validation')
const router = express.Router()

router.post('/createHospital', checkToken, createHospital)
router.get('/getHospital', checkToken, getHospital)
router.get('/getAllHospitals', getAllHospitals)
router.get('/getLabAndPharmacyByHospitalId', getLabAndPharmacyByHospitalId)
router.patch('/updateHospital', checkToken, updateHospital)
router.delete('/deleteHospital/:id', checkToken, deleteHospital)
router.get('/getHospitalById/:id', checkToken, getHospitalById)
router.post('/hospital/login', hospitalLogin)

module.exports = router
