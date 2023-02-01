import { Router } from 'express'

import adminRoute from './admin'
import schoolRoute from './school'
import gesRoute from './GES'
const route = Router()

// Admin Route
route.use('/admin', adminRoute)

// School Route
route.use('/school', schoolRoute)

// GES Route
route.use('/GES', gesRoute)

export default route
