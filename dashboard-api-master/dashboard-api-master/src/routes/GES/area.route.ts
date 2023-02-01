import { Router } from 'express'
import { areaController } from '../../controllers/GES'

const route = Router()

const { getAllRegions, getAllDistrict, getAllCircuit } = areaController

// Get All area
route.get('/regions', getAllRegions)

// Get All area
route.get('/district', getAllDistrict)

// Get All area
route.get('/circuit', getAllCircuit)

export default route
