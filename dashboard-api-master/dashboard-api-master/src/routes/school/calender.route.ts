import { Router } from 'express'
import { calenderController } from '../../controllers/school'
import { fileUploadMiddleware } from '../../middleware/common'
import { verifyToken } from '../../middleware/common/token.middleware'
import validationErrorMiddleware from '../../util/validationError'
import { schoolValidator } from '../../validators'

const route = Router()
const {
  getAllEventCalenders,
  deleteCalender,
  createCalender,
  getCalenderById,
  updateCalender,
} = calenderController
const { calenderValidation } = schoolValidator

// Calender List
route.get('/get', getAllEventCalenders)

// Get Calender Details
route.get('/:ec_id', [verifyToken], getCalenderById)

//Create Calender
route.post(
  '/',
  fileUploadMiddleware.fileUpload.fields([{ name: 'nt_file', maxCount: 1 }]),
  [verifyToken],
  calenderValidation.createCalender,
  validationErrorMiddleware,
  createCalender,
)

// Update Calender
route.put(
  '/:ec_id',
  fileUploadMiddleware.fileUpload.fields([{ name: 'nt_file', maxCount: 1 }]),
  [verifyToken],
  calenderValidation.updateCalender,
  validationErrorMiddleware,
  updateCalender,
)

// Delete Calender
route.delete('/:ec_id', [verifyToken], deleteCalender)

export default route
