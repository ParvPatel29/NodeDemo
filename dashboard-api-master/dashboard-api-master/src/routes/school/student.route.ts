import { NextFunction, Request, Response, Router } from 'express'
import { studentController } from '../../controllers/school'
import { schoolValidator } from '../../validators'

// Validation Middleware(ErrorValidation)
import validationErrorMiddleware from '../../util/validationError'
import { fileUploadMiddleware } from '../../middleware/common'
import { getAllStudentsFromSchool } from '../../controllers/school/student.controller'

const route = Router()

const { studentValidator } = schoolValidator

const {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  updateStudentStatus,
  deleteStudent,
  getAllStudentsByTeacher,
} = studentController

route.use('/', (req: Request, res: Response, next: NextFunction): void => {
  req.table_name = 'kt_student'
  return next()
})

// Get All Students
route.get('/', getAllStudents)

// Get All Students By TeacherId
route.post('/getAllStudentsByTeacher', getAllStudentsByTeacher)

// Get All Students By School
route.post('/get', getAllStudentsFromSchool)

// Get Student By ID
route.post('/:st_id', getStudentById)

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
route.post('/delete/:st_id', deleteStudent)

export default route
