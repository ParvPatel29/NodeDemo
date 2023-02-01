const {
  createSpeciality,
  getSpeciality,
  updateSpeciality,
  deleteSpeciality,
  getSpecialityById,
  getAllSpeciality,
} = require('./speciality.controller')
const express = require('express')
const { checkToken } = require('../../auth/token_validation')
const router = express.Router()

router.post('/createSpeciality', checkToken, createSpeciality)
router.get('/getSpeciality', checkToken, getSpeciality)
router.get('/getAllSpeciality', getAllSpeciality)
router.get('/getSpecialityById/:id', checkToken, getSpecialityById)
router.patch('/updateSpeciality', checkToken, updateSpeciality)
router.delete('/deleteSpeciality/:id', checkToken, deleteSpeciality)

module.exports = router
