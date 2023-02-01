import { Router } from 'express'
import { tutorController } from '../../controllers/admin'
import { adminValidator } from '../../validators'

// Validation Middleware(ErrorValidation)
import validationErrorMiddleware from '../../util/validationError'

const route = Router()

const { tutorValidator } = adminValidator
const {
  createTutor,
  getAllTutor,
  updateTutor,
  deleteTutor,
  getTutorManagementById,
} = tutorController

//Create Tutor Management
route.post(
  '/',
  tutorValidator.createTutorManagement,
  validationErrorMiddleware,
  createTutor,
)

// Get All Tutor Management
route.get('/', getAllTutor)

// Update a Tutor Management
route.put(
  '/:tu_id',
  tutorValidator.updateTutorManagement,
  validationErrorMiddleware,
  updateTutor,
)

// Delete a Tutor Management
route.delete('/:tu_id', deleteTutor)

// Get a Tutor Management
route.get('/:tu_id', getTutorManagementById)

export default route
