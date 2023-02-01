import { Router } from 'express'
import { GESMemberController } from '../../controllers/admin'
import { adminValidator } from '../../validators'

// Validation Middleware(ErrorValidation)
import validationErrorMiddleware from '../../util/validationError'

const route = Router()

const { authorityMemberValidator } = adminValidator
const {
  createGESMember,
  getAllGESMember,
  getGESMember,
  updateGESMember,
  deleteGESMember,
} = GESMemberController

//Create Authority Member
route.post(
  '/',
  authorityMemberValidator.createAuthorityMember,
  validationErrorMiddleware,
  createGESMember,
)

// Get All Authority Member
route.get('/', getAllGESMember)

// Get one Authority Member
route.get('/:gm_id', getGESMember)

// Update a Authority Member
route.put(
  '/:gm_id',
  authorityMemberValidator.updateAuthorityMember,
  validationErrorMiddleware,
  updateGESMember,
)

// Delete a Authority Member
route.delete('/:gm_id', deleteGESMember)

export default route
