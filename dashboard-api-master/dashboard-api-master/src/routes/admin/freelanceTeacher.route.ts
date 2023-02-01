import { NextFunction, Request, Response, Router } from 'express'
import { freelanceTeacherController } from '../../controllers/admin'
import { adminValidator } from '../../validators'

// Validation Middleware(ErrorValidation)
import validationErrorMiddleware from '../../util/validationError'
import { fileUploadMiddleware } from '../../middleware/common'

const route = Router()

const { freelanceTeacherValidator } = adminValidator

const {
  createFreelanceTeacher,
  getAllFreelanceTeachers,
  getFreelanceTeacherById,
  updateFreelanceTeacher,
  updateFreelanceTeacherStatus,
  deleteFreelanceTeacher,
} = freelanceTeacherController

route.use('/', (req: Request, res: Response, next: NextFunction): void => {
  req.table_name = 'kt_freelancerTeacher'
  return next()
})

// Get All Freelance Teachers
route.get('/', getAllFreelanceTeachers)

// Get Freelance Teacher By ID
route.get('/:ft_id', getFreelanceTeacherById)

//Create Freelance Teacher
route.post(
  '/',
  fileUploadMiddleware.fileUpload.fields([
    { name: 'ft_profilePic', maxCount: 1 },
    { name: 'ft_degreeCertificate', maxCount: 1 },
  ]),
  freelanceTeacherValidator.createFreelanceTeacher,
  validationErrorMiddleware,
  createFreelanceTeacher,
)

// Update Freelance Teacher
route.put(
  '/:ft_id',

  fileUploadMiddleware.fileUpload.fields([
    { name: 'ft_profilePic', maxCount: 1 },
    { name: 'ft_degreeCertificate', maxCount: 1 },
  ]),
  freelanceTeacherValidator.updateFreelanceTeacher,
  validationErrorMiddleware,
  updateFreelanceTeacher,
)

// Update Freelance Teacher Status
route.put('/:ft_id/:ft_status', updateFreelanceTeacherStatus)

// Delete Freelance Teacher
route.delete('/:ft_id', deleteFreelanceTeacher)

export default route
