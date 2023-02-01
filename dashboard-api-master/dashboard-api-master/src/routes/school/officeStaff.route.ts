import { Router } from 'express'
import { officeStaffController } from '../../controllers/school'
import { schoolValidator } from '../../validators'

// Validation Middleware(ErrorValidation)
import validationErrorMiddleware from '../../util/validationError'

const route = Router()

const { officeStaffValidator } = schoolValidator
const {
  createOfficeStaff,
  getAllOfficeStaff,
  updateOfficeStaff,
  deleteOfficeStaff,
  getOfficeStaff,
} = officeStaffController

//Create Office Staff
route.post(
  '/',
  officeStaffValidator.createOfficeStaff,
  validationErrorMiddleware,
  createOfficeStaff,
)

// Get All Office Staff
route.get('/', getAllOfficeStaff)

// Get Office Staff
route.get('/:ss_id', getOfficeStaff)

// Update a Office Staff
route.put(
  '/:ss_id',
  officeStaffValidator.updateOfficeStaff,
  validationErrorMiddleware,
  updateOfficeStaff,
)

// Delete a Office Staff
route.delete('/:ss_id', deleteOfficeStaff)

export default route
