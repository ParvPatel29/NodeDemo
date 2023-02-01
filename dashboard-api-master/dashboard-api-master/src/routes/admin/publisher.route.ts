import { NextFunction, Request, Response, Router } from 'express'
import { teacherController,publisherController } from '../../controllers/admin'
import { adminValidator } from '../../validators'

// Validation Middleware(ErrorValidation)
import validationErrorMiddleware from '../../util/validationError'
import { fileUploadMiddleware } from '../../middleware/common'
import { profileValidator } from '../../validators/admin'
const route = Router()

const {
  updatePublisher,
} = publisherController

route.use('/', (req: Request, res: Response, next: NextFunction): void => {
  req.table_name = 'kt_publisher'
  return next()
})

// Update a Publisher
route.put(
  '/:pb_id',
  fileUploadMiddleware.fileUpload.fields([
    { name: 'pb_profilePic', maxCount: 1 },
  ]),
  profileValidator.updatePublisher,
  validationErrorMiddleware,
  updatePublisher,
)

export default route
