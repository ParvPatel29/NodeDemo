const {
  createAppointment,
  updateAppointment,
  removeAppointment,
  getAppointment,
  getAppointmentById,
  getAppointmentByPatientId,
  getAppointmentByDoctorId,
  updateAppointmentConsultation,
  getAppointmentByHospital,
  updateAppointmentStatus,
  getNotAvailableDoctIds,
  updateMedicineStatus,
  getLastRecordOfAppointment,
  updateFeedbackStatus,
  getAppointmentCountByHospital,
  getPendingReports,
  getUploadedgReports,
  cancelAppointment,
  getCancelAppointmentByDoctor,
  getCancelAppointmentByPatient,
  getPharmacyAppointments,
  getCompletePharmacyAppointments,
  getAppointmentCountByMonth,
} = require('./appointment.controller')
const express = require('express')
const { checkToken } = require('../../auth/token_validation')
const router = express.Router()

router.post('/createAppointment', checkToken, createAppointment)
router.patch('/updateAppointment', checkToken, updateAppointment)
router.patch('/updateAppointmentStatus', checkToken, updateAppointmentStatus)
router.patch(
  '/updateAppointmentConsultation',
  checkToken,
  updateAppointmentConsultation,
)
router.delete(
  '/removeAppointment/:appointmentId',
  checkToken,
  removeAppointment,
)
router.get('/getAppointment', checkToken, getAppointment)
router.get('/getAppointmentById/:appointmentId', checkToken, getAppointmentById)
router.get('/getAppointmentByPatient', checkToken, getAppointmentByPatientId)
router.get(
  '/getCancelAppointmentByPatient',
  checkToken,
  getCancelAppointmentByPatient,
)
router.get('/getAppointmentByDoctor', checkToken, getAppointmentByDoctorId)
router.get('/getCancelAppointmentByDoctor', getCancelAppointmentByDoctor)
router.get('/getAppointmentByHospital', checkToken, getAppointmentByHospital)
router.get('/getPendingReports', checkToken, getPendingReports)
router.get('/getUploadedgReports', checkToken, getUploadedgReports)
router.get(
  '/getAppointmentCountByHospital/:hospitalId',
  getAppointmentCountByHospital,
)
router.patch('/updateMedicineStatus', checkToken, updateMedicineStatus)
router.patch('/updateFeedbackStatus', checkToken, updateFeedbackStatus)
router.patch(
  '/updateAppointmentConsultation',
  checkToken,
  updateAppointmentConsultation,
)
router.post('/getNotAvailableDoctIds', checkToken, getNotAvailableDoctIds)
router.get('/getLastRecordOfAppointment', getLastRecordOfAppointment)
router.patch('/cancelAppointment', checkToken, cancelAppointment)

router.get('/getPharmacyAppointments', getPharmacyAppointments)
router.get('/getCompletePharmacyAppointments', getCompletePharmacyAppointments)
router.get('/getAppointmentCountByMonth', getAppointmentCountByMonth)

module.exports = router
