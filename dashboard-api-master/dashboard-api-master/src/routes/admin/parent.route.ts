import { NextFunction, Request, Response, Router } from 'express'
import { teacherController,publisherController,parentController } from '../../controllers/admin'
import { adminValidator } from '../../validators'

// Validation Middleware(ErrorValidation)
import validationErrorMiddleware from '../../util/validationError'
import { fileUploadMiddleware } from '../../middleware/common'
import { profileValidator } from '../../validators/admin'
const route = Router()

const {
  updateParent,
} = parentController

route.use('/', (req: Request, res: Response, next: NextFunction): void => {
  req.table_name = 'kt_parent'
  return next()
})

// Update a Publisher
route.put(
  '/:pt_id',
  fileUploadMiddleware.fileUpload.fields([
    { name: 'pt_profilePic', maxCount: 1 },
  ]),
  profileValidator.updateParent,
  validationErrorMiddleware,
  updateParent,
)

export default route
