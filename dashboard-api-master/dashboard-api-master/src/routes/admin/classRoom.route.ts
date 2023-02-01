import { Router } from 'express'
import { classRoomController } from '../../controllers/admin'
import validationErrorMiddleware from '../../util/validationError'
import { adminValidator } from '../../validators'

const route = Router()

const { classRoomValidator } = adminValidator

const {
  getAllClassRoom,
  filterClassRoomBySchool,
  createClassRoom,
  updateClassRoom,
  updateClassStatus,
  getClassRoom,
  deleteClassRoom,
} = classRoomController

// Get All GES Office
route.get('/', getAllClassRoom)

// Get Filter Class
route.get('/filterClass', filterClassRoomBySchool)

// Get Student Profile Details
route.get('/:cr_id', getClassRoom)

//Create Student
route.post(
  '/',
  classRoomValidator.createClassRoom,
  validationErrorMiddleware,
  createClassRoom,
)

// Update Student
route.put(
  '/:cr_id',

  classRoomValidator.updateClassRoom,
  validationErrorMiddleware,
  updateClassRoom,
)

// Update Student Status
route.put('/:cr_id/:cr_status', updateClassStatus)

// Delete Student
route.delete('/:cr_id', deleteClassRoom)

export default route
