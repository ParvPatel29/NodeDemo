import { Router,Request, Response, NextFunction } from 'express'
import {assignmentController } from '../../controllers/school'
import { verifyToken } from '../../middleware/common/token.middleware'
import { fileUploadMiddleware } from '../../middleware/common'
import validationErrorMiddleware from '../../util/validationError'
import { schoolValidator } from '../../validators'
import { getAllLiveSession } from '../../controllers/school/liveSession.controller'
import { generateRoomToken } from '../../controllers/school/enableX.controller'

const route = Router()
const {
  getAllAssignmentByTeacher,
  deleteAssignment,
  getAllAssignment,
  createAssignment,
  updateAssignment,
  getAssignment,
} = assignmentController

const { assignmentValidation } = schoolValidator

route.use('/', (req: Request, res: Response, next: NextFunction): void => {
  req.table_name = 'kt_assignment'
  return next()
})

// Live Session List
route.get('/get',[verifyToken], getAllAssignmentByTeacher)

// Live Session List Without teacher
route.get('/getAll',[verifyToken], getAllAssignment)

// Get Live Session Details
route.get('/:asn_id', [verifyToken], getAssignment)

//Create Live Session
route.post(
  '/',
  [verifyToken],
  fileUploadMiddleware.fileUpload.fields([{ name: 'ls_image', maxCount: 1 }]),
  assignmentValidation.createAssignment,
  validationErrorMiddleware,
  createAssignment,
)

// Update Live Session
route.put(
  '/:asn_id',
  [verifyToken],
  fileUploadMiddleware.fileUpload.fields([{ name: 'ls_image', maxCount: 1 }]),
  assignmentValidation.updateAssignment,
  validationErrorMiddleware,
  updateAssignment,
)

// Delete Live Session
route.delete('/:asn_id', [verifyToken], deleteAssignment)


export default route
