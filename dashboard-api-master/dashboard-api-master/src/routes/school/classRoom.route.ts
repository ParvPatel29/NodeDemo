import { Router } from 'express'
import { classRoomController } from '../../controllers/school'
import { getAllClassRoomBySchool } from '../../controllers/school/classRoom.controller'
import { fileUploadMiddleware } from '../../middleware/common'
import { verifyToken } from '../../middleware/common/token.middleware'
import validationErrorMiddleware from '../../util/validationError'
import { schoolValidator } from '../../validators'

const route = Router()

const { classRoomValidator } = schoolValidator

const {
  getAllClassRoom,
  createClassRoom,
  updateClassRoom,
  updateClassStatus,
  getClassRoom,
  deleteClassRoom,
} = classRoomController

// Get All ClassRoom
route.get('/', getAllClassRoom)

// Get All ClassRoom By School
route.post('/get', getAllClassRoomBySchool)

// Get ClassRoom Details
route.get('/:cr_id', getClassRoom)

//Create ClassRoom
route.post(
  '/',
  fileUploadMiddleware.fileUpload.fields([
    { name: 'bk_audio', maxCount: 1 },
  ]),
  classRoomValidator.createClassRoom,
  validationErrorMiddleware,
  createClassRoom,
)

// Update ClassRoom
route.put(
  '/:cr_id',
  [verifyToken],
  classRoomValidator.updateClassRoom,
  validationErrorMiddleware,
  updateClassRoom,
)

// Update ClassRoom Status
route.put('/:cr_id/:cr_status', updateClassStatus)

// Delete ClassRoom
route.delete('/:cr_id', deleteClassRoom)

export default route
