import { Router } from 'express'

import {
  loginSchool,
  logoutSchool,
} from '../../controllers/school/auth.controller'
import { verifyToken } from '../../middleware/common/token.middleware'

const route = Router()

// User login
route.post('/login', loginSchool)

// User logout
route.delete('/logout', [verifyToken], logoutSchool)
export default route
