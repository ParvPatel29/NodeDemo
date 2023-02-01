import { NextFunction, Request, Response, Router } from 'express'
import { teacherController } from '../../controllers/school'
import { schoolValidator } from '../../validators'

// Validation Middleware(ErrorValidation)
import validationErrorMiddleware from '../../util/validationError'
import { fileUploadMiddleware } from '../../middleware/common'
import { getTeacherBySchool, loginTeacher, logoutTeacher, updateTeacherBySchool } from '../../controllers/school/teacher.controller'
import { verifyToken } from '../../middleware/common/token.middleware'
const route = Router()

const { teacherValidator } = schoolValidator

const {
  createTeacher,
  getAllTeacher,
  updateTeacher,
  deleteTeacher,
  getTeacher,
  getAllTeacherBySchool
} = teacherController

route.use('/', (req: Request, res: Response, next: NextFunction): void => {
  req.table_name = 'kt_teacher'
  return next()
})
// Get All Teacher
route.get('/',[verifyToken], getAllTeacher)

// Get All Teacher By School
route.get('/bySchool', getAllTeacherBySchool)

// User login
route.post('/auth/login', loginTeacher)

// User logout
route.delete('/auth/logout', [verifyToken], logoutTeacher)

//Create Teacher
route.post(
  '/',
  [verifyToken],
  fileUploadMiddleware.fileUpload.fields([
    { name: 'tc_profilePic', maxCount: 1 },
    { name: 'tc_degreeCertificate', maxCount: 1 },
  ]),

  teacherValidator.createTeacher,
  validationErrorMiddleware,
  createTeacher,
)

// Get One Teacher by Id
route.get('/:tc_id',[verifyToken], getTeacher)

// Get Teacher Profile by Id and School
route.get('/bySchool/:tc_id', getTeacherBySchool)

// Update a Teacher
route.put(
  '/:tc_id',
  [verifyToken],
  fileUploadMiddleware.fileUpload.fields([
    { name: 'tc_profilePic', maxCount: 1 },
    { name: 'tc_degreeCertificate', maxCount: 1 },
  ]),
  teacherValidator.updateTeacher,
  validationErrorMiddleware,
  updateTeacher,
)

// Update a Teacher Profile By School
route.put(
  '/profile/:tc_id',
  fileUploadMiddleware.fileUpload.fields([
    { name: 'tc_profilePic', maxCount: 1 },
    { name: 'tc_degreeCertificate', maxCount: 1 },
  ]),
  teacherValidator.updateTeacher,
  validationErrorMiddleware,
  updateTeacherBySchool,
)



// Delete a Teacher
route.delete('/:tc_id',[verifyToken], deleteTeacher)

export default route
