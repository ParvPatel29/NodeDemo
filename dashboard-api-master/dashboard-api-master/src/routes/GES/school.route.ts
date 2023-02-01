import { Router } from 'express'
import { schoolController } from '../../controllers/GES'

const route = Router()

const { getAllSchool, getSchoolDetails } = schoolController

// Get School All
route.get('/', getAllSchool)

// Get School Details
route.get('/:sc_id', getSchoolDetails)

export default route
