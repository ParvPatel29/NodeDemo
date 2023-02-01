import { Router,Request, Response, NextFunction } from 'express'
import { termlySchemeController } from '../../controllers/school'
import { verifyToken } from '../../middleware/common/token.middleware'
import { fileUploadMiddleware } from '../../middleware/common'
import validationErrorMiddleware from '../../util/validationError'
import { schoolValidator } from '../../validators'

const route = Router()
const {
  getAllTermlyScheme,
  deleteTermlyScheme,
  createTermlyScheme,
  updateTermlyScheme,
  getTermlySchemeById,
} = termlySchemeController

const { termlySchemeValidation } = schoolValidator

route.use('/', (req: Request, res: Response, next: NextFunction): void => {
  req.table_name = 'kt_termlyScheme'
  return next()
})

// TermlyScheme List
route.get('/get',[verifyToken], getAllTermlyScheme)

// Get TermlyScheme Details
route.get('/:tsc_id', [verifyToken], getTermlySchemeById)

//Create TermlyScheme
route.post(
  '/',
  [verifyToken],
  fileUploadMiddleware.fileUpload.fields([{ name: 'nt_file', maxCount: 1 }]),
  termlySchemeValidation.createTermlyScheme,
  validationErrorMiddleware,
  createTermlyScheme,
)

// Update TermlyScheme
route.put(
  '/:tsc_id',
  [verifyToken],
  fileUploadMiddleware.fileUpload.fields([{ name: 'nt_file', maxCount: 1 }]),
  termlySchemeValidation.updateTermlyScheme,
  validationErrorMiddleware,
  updateTermlyScheme,
)

// Delete TermlyScheme
route.delete('/:tsc_id', [verifyToken], deleteTermlyScheme)

export default route
