import { Router } from 'express'
import { countController } from '../../controllers/GES'
import {
  getGESMember,
  updateGESMember,
} from '../../controllers/GES/GES.controller'
import { verifyToken } from '../../middleware/common/token.middleware'
import validationErrorMiddleware from '../../util/validationError'
import { gesMemberValidator } from '../../validators/GES'

const route = Router()

const { countData } = countController

// Get All Count Data
route.get('/', countData)

// Get one Authority Member
route.get('/gesMember', [verifyToken], getGESMember)

// Update a Authority Member
route.put(
  '/gesMember',
  [verifyToken],
  gesMemberValidator.updateGESMember,
  validationErrorMiddleware,
  updateGESMember,
)

export default route
