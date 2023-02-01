import { Router } from 'express'
import { schoolController } from '../../controllers/admin'
import { adminValidator } from '../../validators'

// Validation Middleware(ErrorValidation)
import validationErrorMiddleware from '../../util/validationError'
const route = Router()

const { schoolValidator } = adminValidator

const {
  createSchool,
  getAllSchool,
  updateSchool,
  deleteSchool,
  getSchoolNameList,
  getSchool,
  filterSchoolByRegionDistrictCircuit,
} = schoolController

//Create School
route.post(
  '/',
  schoolValidator.createSchool,
  validationErrorMiddleware,
  createSchool,
)

// Get School All
route.get('/', getAllSchool)

// Get Filter School
route.get('/filterSchool', filterSchoolByRegionDistrictCircuit)

// Update a School
route.put(
  '/:sc_id',
  schoolValidator.updateSchool,
  validationErrorMiddleware,
  updateSchool,
)

// Delete a School
route.delete('/:sc_id', deleteSchool)

// List of School Name
route.get('/list', getSchoolNameList)

// get School
route.get('/:sc_id', getSchool)

export default route
