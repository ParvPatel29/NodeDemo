import { Router } from 'express'
import { teacherController } from '../../controllers/GES'

const route = Router()

const { getAllTeacher, getTeacherDetails } = teacherController

// Get Teacher All
route.get('/', getAllTeacher)

// Get Teacher Details
route.get('/:tc_id', getTeacherDetails)

export default route
