const {
  createDoctor,
  getDoctor,
  updateDoctor,
  deleteDoctor,
  getDoctorById,
  searchDoctor,
  doctoreLogin,
  updateDoctorDoc,
  getDoctorByHospitalId,
  getDoctorByNameAndSpe,
  updateDoctorProfile,
  updateDoctorStatus,
  getAllDoctors,
  getHospitalByDoctorId,
  getDoctorListByHospital,
  getAprovedDoctors,
  updateDoctorProfilePic,
} = require('./doctor.controller')
const express = require('express')
const { checkToken } = require('../../auth/token_validation')
const router = express.Router()

router.post('/createDoctor', createDoctor)
router.get('/getDoctor', getDoctor)
router.get('/getAllDoctors', getAllDoctors)
router.get('/getAprovedDoctors', getAprovedDoctors)
router.patch('/updateDoctor', checkToken, updateDoctor)
router.get('/getDoctorById/:id', getDoctorById)
router.get('/getHospitalByDoctorId/:id', getHospitalByDoctorId)
router.patch('/updateDoctorProfile', checkToken, updateDoctorProfile)
router.patch('/updateDoctorDoc', updateDoctorDoc)
router.patch('/updateDoctorProfilePic', updateDoctorProfilePic)
router.patch('/updateDoctorStatus', updateDoctorStatus)
router.get('/getDoctorByHospitalId', checkToken, getDoctorByHospitalId)
router.get('/getDoctorByNameAndSpe', getDoctorByNameAndSpe)
// router.patch('/change/password', checkToken, changePassword)
router.get('/doctor/search', searchDoctor)
router.delete('/deleteDoctor/:id', checkToken, deleteDoctor)
router.post('/doctor/login', doctoreLogin)
router.get('/getDoctorListByHospitalId/:id', getDoctorListByHospital)

module.exports = router
