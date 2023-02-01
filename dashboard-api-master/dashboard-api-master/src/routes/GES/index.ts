import { Router } from 'express'
import { verifyToken } from '../../middleware/common/token.middleware'

import authRoute from './auth.route'
import areaRoute from './area.route'
import schoolRoute from './school.route'
import teacherRoute from './teacher.route'
import studentRoute from './student.route'
import countRoute from './GES.route'

const route = Router()

// Auth Route
route.use('/auth', authRoute)

// Area Route
route.use('/area', areaRoute)

// School Route
route.use('/school', schoolRoute)

// Teacher Rote
route.use('/teacher', teacherRoute)

// Student Route
route.use('/student', studentRoute)

// Gescount Route
route.use('/gesauthority', countRoute)
export default route
