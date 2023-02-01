import { Router } from 'express'
import { areaController } from '../../controllers/admin'
import { adminValidator } from '../../validators'

// Validation Middleware(ErrorValidation)
import validationErrorMiddleware from '../../util/validationError'

const route = Router()

const { areaValidator } = adminValidator
const { createArea, getAllRegions, getAllDistrict, getAllCircuit, deleteArea } =
  areaController

//Create area
route.post('/', areaValidator.createArea, validationErrorMiddleware, createArea)

// Get All area
route.get('/regions', getAllRegions)

// Get All area
route.get('/district', getAllDistrict)

// Get All area
route.get('/circuit', getAllCircuit)

// Delete Area
route.delete('/:ar_id', deleteArea)

export default route
