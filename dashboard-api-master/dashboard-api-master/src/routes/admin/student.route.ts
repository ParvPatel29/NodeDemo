import { NextFunction, Request, Response, Router } from 'express'
import { studentController } from '../../controllers/admin'
import { adminValidator } from '../../validators'

// Validation Middleware(ErrorValidation)
import validationErrorMiddleware from '../../util/validationError'
import { fileUploadMiddleware } from '../../middleware/common'

const route = Router()

const { studentValidator } = adminValidator

const {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  updateStudentStatus,
  deleteStudent,
} = studentController

route.use('/', (req: Request, res: Response, next: NextFunction): void => {
  req.table_name = 'kt_student'
  return next()
})

// Get All Students
route.get('/', getAllStudents)

// Get Student By ID
route.get('/:st_id', getStudentById)

//Create Student
route.post(
  '/',
  fileUploadMiddleware.fileUpload.fields([
    { name: 'st_profilePic', maxCount: 1 },
  ]),
  studentValidator.createStudent,
  validationErrorMiddleware,
  createStudent,
)

// Update Student
route.put(
  '/:st_id',
  fileUploadMiddleware.fileUpload.fields([
    { name: 'st_profilePic', maxCount: 1 },
  ]),
  studentValidator.updateStudent,
  validationErrorMiddleware,
  updateStudent,
)

// Update Student Status
route.put('/:st_id/:st_status', updateStudentStatus)

// Delete Student
route.delete('/:st_id', deleteStudent)

export default route
