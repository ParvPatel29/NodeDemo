import { Router } from 'express'
import { gesOffideStaffController } from '../../controllers/admin'
import { adminValidator } from '../../validators'

// Validation Middleware(ErrorValidation)
import validationErrorMiddleware from '../../util/validationError'

const route = Router()

const { gesOfficeStaffValidator } = adminValidator
const {
  createGESOfficeStaff,
  getAllGESOfficeStaff,
  updateGESOfficeStaff,
  deleteGESOfficeStaff,
  getGESOfficeStaff,
} = gesOffideStaffController

//Create GES OfficeStaff
route.post(
  '/',
  gesOfficeStaffValidator.createOfficeStaff,
  validationErrorMiddleware,
  createGESOfficeStaff,
)

// Get All GES OfficeStaff
route.get('/', getAllGESOfficeStaff)

// Get GES OfficeStaff
route.get('/:gs_id', getGESOfficeStaff)

// Update a GES OfficeStaff
route.put(
  '/:gs_id',
  gesOfficeStaffValidator.updateOfficeStaff,
  validationErrorMiddleware,
  updateGESOfficeStaff,
)

// Delete a GES OfficeStaff
route.delete('/:gs_id', deleteGESOfficeStaff)

export default route
