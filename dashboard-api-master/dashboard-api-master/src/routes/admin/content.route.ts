import { NextFunction, Request, Response, Router } from 'express'
import { contentController } from '../../controllers/admin'
import { adminValidator } from '../../validators'

// Validation Middleware(ErrorValidation)
import validationErrorMiddleware from '../../util/validationError'
import { fileUploadMiddleware } from '../../middleware/common'

const route = Router()

const { contentValidator } = adminValidator

const {
  createContent,
  getAllContents,
  getContentById,
  updateContent,
  updateContentStatus,
  deleteContent,
} = contentController

route.use('/', (req: Request, res: Response, next: NextFunction): void => {
  req.table_name = 'kt_contentManagement'
  return next()
})

// Get All Contents
route.get('/', getAllContents)

// Get Content By ID
route.get('/:cm_id', getContentById)

//Create Content
route.post(
  '/',
  fileUploadMiddleware.fileUpload.fields([
    { name: 'cm_readingMaterial', maxCount: 1 },
    { name: 'cm_video', maxCount: 1 },
  ]),
  contentValidator.createContent,
  validationErrorMiddleware,
  createContent,
)

// Update Content
route.put(
  '/:cm_id',

  fileUploadMiddleware.fileUpload.fields([
    { name: 'cm_readingMaterial', maxCount: 1 },
    { name: 'cm_video', maxCount: 1 },
  ]),
  contentValidator.updateContent,
  validationErrorMiddleware,
  updateContent,
)

// Update Content Status
route.put('/:cm_id/:cm_status', updateContentStatus)

// Delete Content
route.delete('/:cm_id', deleteContent)

export default route
