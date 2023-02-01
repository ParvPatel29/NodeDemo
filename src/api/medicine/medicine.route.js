const {
  getMedicineByAppointment,
  AddMedicine,
  deleteMedicine,
} = require('./medicine.controller')
const express = require('express')
const { checkToken } = require('../../auth/token_validation')
const router = express.Router()

router.get(
  '/getMedicineByAppointment/:id',
  checkToken,
  getMedicineByAppointment,
)
router.post('/AddMedicine', checkToken, AddMedicine)
router.delete('/deleteMedicine/:id', checkToken, deleteMedicine)

module.exports = router
