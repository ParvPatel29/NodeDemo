import { Router } from 'express'
import { schoolStaffController } from '../../controllers/admin'
import { adminValidator } from '../../validators'

// Validation Middleware(ErrorValidation)
import validationErrorMiddleware from '../../util/validationError'

const route = Router()

const { schoolStaffValidator } = adminValidator
const {
  createSchoolStaff,
  getAllSchoolStaff,
  updateSchoolStaff,
  deleteSchoolStaff,
  getSchoolStaff,
} = schoolStaffController

//Create School Staff
route.post(
  '/',
  schoolStaffValidator.createSchoolStaff,
  validationErrorMiddleware,
  createSchoolStaff,
)

// Get All School Staff
route.get('/', getAllSchoolStaff)

// Get School Staff
route.get('/:ss_id', getSchoolStaff)

// Update a School Staff
route.put(
  '/:ss_id',
  schoolStaffValidator.updateSchoolStaff,
  validationErrorMiddleware,
  updateSchoolStaff,
)

// Delete a School Staff
route.delete('/:ss_id', deleteSchoolStaff)

export default route
