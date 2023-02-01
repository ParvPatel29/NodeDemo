import { Router, Request, Response, NextFunction } from 'express'
import { yearlySchemeController } from '../../controllers/school'
import { verifyToken } from '../../middleware/common/token.middleware'
import { fileUploadMiddleware } from '../../middleware/common'
import validationErrorMiddleware from '../../util/validationError'
import { schoolValidator } from '../../validators'
import { yearlySchemeValidation } from '../../validators/school'

const route = Router()
const {
  getAllYearlyScheme,
  deleteYearlyScheme,
  createYearlyScheme,
  updateYearlyScheme,
  getYearlySchemeById,
} = yearlySchemeController

const { termlySchemeValidation } = schoolValidator

route.use('/', (req: Request, res: Response, next: NextFunction): void => {
  req.table_name = 'kt_yearlyScheme'
  return next()
})

// TermlyScheme List
route.get('/get', [verifyToken], getAllYearlyScheme)

// Get TermlyScheme Details
route.get('/:ysc_id', [verifyToken], getYearlySchemeById)

//Create TermlyScheme
route.post(
  '/',
  [verifyToken],
  fileUploadMiddleware.fileUpload.fields([{ name: 'nt_file', maxCount: 1 }]),
  yearlySchemeValidation.createYearlyScheme,
  validationErrorMiddleware,
  createYearlyScheme,
)

// Update TermlyScheme
route.put(
  '/:ysc_id',
  [verifyToken],
  fileUploadMiddleware.fileUpload.fields([{ name: 'nt_file', maxCount: 1 }]),
  yearlySchemeValidation.updateYearlyScheme,
  validationErrorMiddleware,
  updateYearlyScheme,
)

// Delete TermlyScheme
route.delete('/:ysc_id', [verifyToken], deleteYearlyScheme)

export default route
