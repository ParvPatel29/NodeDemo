import { Router } from 'express'
import { GESOfficeController } from '../../controllers/admin'
import { adminValidator } from '../../validators'

// Validation Middleware(ErrorValidation)
import validationErrorMiddleware from '../../util/validationError'

const route = Router()

const { gesOfficeValidator } = adminValidator
const {
  createGESOffice,
  getAllGESOffice,
  updateGESOffice,
  deleteGESOffice,
  getGESOffice,
} = GESOfficeController

//Create GES Office
route.post(
  '/',
  gesOfficeValidator.createGESOffice,
  validationErrorMiddleware,
  createGESOffice,
)

// Get All GES Office
route.get('/', getAllGESOffice)

// Get GES Office
route.get('/:go_id', getGESOffice)

// Update a GES Office
route.put(
  '/:go_id',
  gesOfficeValidator.updateGESOffice,
  validationErrorMiddleware,
  updateGESOffice,
)

// Delete a GES Office
route.delete('/:go_id', deleteGESOffice)

export default route
