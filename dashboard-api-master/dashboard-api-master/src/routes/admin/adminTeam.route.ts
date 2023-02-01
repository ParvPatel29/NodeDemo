import { Router } from 'express'
import { adminTeamMemberController } from '../../controllers/admin'
import { adminValidator } from '../../validators'

// Validation Middleware(ErrorValidation)
import validationErrorMiddleware from '../../util/validationError'
import { verifyToken } from '../../middleware/common/token.middleware'

const route = Router()

const { adminTeamValidator } = adminValidator
const {
  createAdminTeamMember,
  getAllAdminTeamMember,
  updateAdminTeamMember,
  deleteAdminTeamMember,
} = adminTeamMemberController

//Create Team Member
route.post(
  '/',
  adminTeamValidator.createTeamMember,
  validationErrorMiddleware,
  createAdminTeamMember,
)

// Get All Team Member
route.get('/', [verifyToken], getAllAdminTeamMember)

// Update a team-member
route.put(
  '/:at_id',
  [verifyToken],
  adminTeamValidator.updateTeamMember,
  validationErrorMiddleware,
  updateAdminTeamMember,
)

// Delete a team-member
route.delete('/:at_id', [verifyToken], deleteAdminTeamMember)

export default route
