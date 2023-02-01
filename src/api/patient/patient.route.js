const {
  createPatient,
  getPatient,
  updatePatient,
  deletePatient,
  searchPatient,
  changePassword,
  getPatientById,
  updatePatientProfile,
  patientLogin,
  updatePatientDoc,
  updatePatientStatus,
  getPatientByMobileOrName,
  updatePatientProfilePic,
  getPatientCountByMonth,
} = require('./patient.controller')
const express = require('express')
const { checkToken } = require('../../auth/token_validation')
const router = express.Router()

router.post('/createPatient', createPatient)
router.get('/getPatient', checkToken, getPatient)
router.patch('/updatePatient', checkToken, updatePatient)
router.patch('/updatePatientProfile', checkToken, updatePatientProfile)
router.patch('/updatePatientDoc', updatePatientDoc)
router.patch('/updatePatientStatus', updatePatientStatus)
router.patch('/updatePatientProfilePic', updatePatientProfilePic)
//router.patch('/change/password', checkToken, changePassword)
router.get('/getPatientById/:id', checkToken, getPatientById)
// router.delete('/deletePatient', checkToken, deletePatient);
router.delete('/deletePatient/:id', checkToken, deletePatient)
router.get('/patient/search', checkToken, searchPatient)
router.post('/patient/login', patientLogin)
router.get('/getPatientByMobileOrName', checkToken, getPatientByMobileOrName)
router.get('/getPatientCountByMonth', getPatientCountByMonth)

module.exports = router
