import { Router } from 'express'
import { schoolController } from '../../controllers/school'
import { schoolValidator } from '../../validators'

// Validation Middleware(ErrorValidation)
import validationErrorMiddleware from '../../util/validationError'

const route = Router()

const { schoolValidation } = schoolValidator
const { getSchool, updateSchool } = schoolController

// Get School
route.post('/', getSchool)

// Update a School
route.put(
  '/',
  schoolValidation.updateSchool,
  validationErrorMiddleware,
  updateSchool,
)

export default route
