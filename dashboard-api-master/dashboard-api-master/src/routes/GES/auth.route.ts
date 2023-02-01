import { Router } from 'express'

import {
  loginGESMember,
  logoutGESMember,
} from '../../controllers/GES/auth.controller'
import { verifyToken } from '../../middleware/common/token.middleware'

const route = Router()

// GESMember login
route.post('/login', loginGESMember)

// GESMember logout
route.delete('/logout', [verifyToken], logoutGESMember)

export default route
