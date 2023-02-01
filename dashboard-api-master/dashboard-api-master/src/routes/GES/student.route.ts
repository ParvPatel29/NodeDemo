import { Router } from 'express'
import { studentController } from '../../controllers/GES'

const route = Router()

const { getAllStudents, getStudentDetails } = studentController

// Get Student All
route.get('/', getAllStudents)

// Get Student Details
route.get('/:st_id', getStudentDetails)

export default route
