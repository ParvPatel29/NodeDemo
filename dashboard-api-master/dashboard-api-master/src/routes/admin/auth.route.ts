import { Router } from 'express'

import { logoutUser, loginUser } from '../../controllers/admin/auth.controller'
import { verifyToken } from '../../middleware/common/token.middleware'

const route = Router()

// User login
route.post('/login', loginUser)

route.delete('/logout', [verifyToken], logoutUser)

export default route
