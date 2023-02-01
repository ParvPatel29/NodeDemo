import { Router } from 'express'
import { studentAttendanceController } from '../../controllers/school'
import { fileUploadMiddleware } from '../../middleware/common'

// Validation Middleware(ErrorValidation)
import validationErrorMiddleware from '../../util/validationError'

const route = Router()

const {
  createStudentAttendance,
  getAllStudentAttendance,
  getStudentAttendanceById,
  updateStudentAttendance,
  deleteStudentAttendance,
} = studentAttendanceController

// Get All StudentAttendances
route.get('/', getAllStudentAttendance)

// Get StudentAttendance By ID
route.get('/:sa_id', getStudentAttendanceById)

//Create StudentAttendance
route.post(
  '/',
  validationErrorMiddleware,
  fileUploadMiddleware.fileUpload.fields([{ name: 'bk_audio', maxCount: 1 }]),
  createStudentAttendance,
)

// Update StudentAttendance
route.put(
  '/',
  validationErrorMiddleware,
  fileUploadMiddleware.fileUpload.fields([{ name: 'bk_audio', maxCount: 1 }]),
  updateStudentAttendance,
)

// Delete StudentAttendance
route.delete('/:sa_id', deleteStudentAttendance)

export default route
