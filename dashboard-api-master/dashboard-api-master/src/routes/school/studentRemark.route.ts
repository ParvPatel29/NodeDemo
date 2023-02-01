import { Router } from 'express'
import { studentRemarkController } from '../../controllers/school'
import { schoolValidator } from '../../validators'

// Validation Middleware(ErrorValidation)
import validationErrorMiddleware from '../../util/validationError'
import { createStudentRemarkByStudent, updateStudentRemarkByStudent } from '../../controllers/school/studentRemark.controller'
const route = Router()

const { studentRemarkValidator } = schoolValidator

const {
  createStudentRemark,
  getAllStudentRemarks,
  updateStudentRemark,
  deleteStudentRemark,
  getStudentRemark,
  getStudentRemarkByStudent
} = studentRemarkController

// Get All Remark
route.get('/', getAllStudentRemarks)

//Create Remark
route.post(
  '/',
  studentRemarkValidator.createStudenRemark,
  validationErrorMiddleware,
  createStudentRemark,
)

//Create Remark By Student
route.post(
  '/byStudent/create',
  studentRemarkValidator.createStudenRemark,
  validationErrorMiddleware,
  createStudentRemarkByStudent,
)
// Get One Remark by Id
route.get('/:sr_id', getStudentRemark)

// Get One Remark by Id and StudentId
route.get('/byStudent/get', getStudentRemarkByStudent)

// Update a Remark
route.put(
  '/:sr_id',
  studentRemarkValidator.updateStudentRemark,
  validationErrorMiddleware,
  updateStudentRemark,
)

// Update a Remark By Student
route.put(
  '/byStudent/:sr_id',
  studentRemarkValidator.updateStudentRemark,
  validationErrorMiddleware,
  updateStudentRemarkByStudent,
)

// Delete a Remark
route.delete('/:sr_id', deleteStudentRemark)

export default route
