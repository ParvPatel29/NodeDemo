import { NextFunction, Request, Response, Router } from 'express'
import { teacherController } from '../../controllers/admin'
import { adminValidator } from '../../validators'

// Validation Middleware(ErrorValidation)
import validationErrorMiddleware from '../../util/validationError'
import { fileUploadMiddleware } from '../../middleware/common'
const route = Router()

const { teacherValidator } = adminValidator

const {
  createTeacher,
  getAllTeacher,
  updateTeacher,
  deleteTeacher,
  getTeacher,
} = teacherController

route.use('/', (req: Request, res: Response, next: NextFunction): void => {
  req.table_name = 'kt_teacher'
  return next()
})

//Create Teacher
route.post(
  '/',
  fileUploadMiddleware.fileUpload.fields([
    { name: 'tc_profilePic', maxCount: 1 },
    { name: 'tc_degreeCertificate', maxCount: 1 },
  ]),

  teacherValidator.createTeacher,
  validationErrorMiddleware,
  createTeacher,
)

// Get All Teacher
route.get('/', getAllTeacher)

// Get One Teacher by Id
route.get('/:tc_id', getTeacher)

// Update a Teacher
route.put(
  '/:tc_id',
  fileUploadMiddleware.fileUpload.fields([
    { name: 'tc_profilePic', maxCount: 1 },
    { name: 'tc_degreeCertificate', maxCount: 1 },
  ]),
  teacherValidator.updateTeacher,
  validationErrorMiddleware,
  updateTeacher,
)

// Delete a Teacher
route.delete('/:tc_id', deleteTeacher)

export default route
