const {
  createPharmacy,
  getPharmacy,
  updatePharmacy,
  deletePharmacy,
  getPharmacyById,
  updatePharmacyProfile,
  updatePharmacyProfilePic,
} = require('./pharmacy.controller')
const express = require('express')
const { checkToken } = require('../../auth/token_validation')
const router = express.Router()

router.post('/createPharmacy', checkToken, createPharmacy)
router.get('/getPharmacy', checkToken, getPharmacy)
router.patch('/updatePharmacy', checkToken, updatePharmacy)
router.delete('/deletePharmacy/:id', checkToken, deletePharmacy)
router.get('/getPharmacyById/:id', checkToken, getPharmacyById)
router.patch('/updatePharmacyProfile', checkToken, updatePharmacyProfile)
router.patch('/updatePharmacyProfilePic', checkToken, updatePharmacyProfilePic)
module.exports = router
