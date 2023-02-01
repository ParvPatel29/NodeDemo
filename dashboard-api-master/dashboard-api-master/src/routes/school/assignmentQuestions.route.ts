import { Router,Request, Response, NextFunction } from 'express'
import {assignmentQuestionsController } from '../../controllers/school'
import { verifyToken } from '../../middleware/common/token.middleware'
import { fileUploadMiddleware } from '../../middleware/common'
import validationErrorMiddleware from '../../util/validationError'
import { schoolValidator } from '../../validators'

const route = Router()
const {
  getAllAssignmentQueByTeacher,
  deleteAssignmentQuestions,
  getAllAssignmentQuestions,
  createAssignmentQuestions,
  updateAssignmentQuestions,
  getAssignmentQuestions,
  getAllAssignmentQueByAssgn
} = assignmentQuestionsController

const { assignmentQuestionsValidation } = schoolValidator

route.use('/', (req: Request, res: Response, next: NextFunction): void => {
  req.table_name = 'kt_assignmentQuestions'
  return next()
})

// Live Session List
route.get('/get',[verifyToken], getAllAssignmentQueByTeacher)
// Get All assignmentQue by 
route.get('/getAssignmentQues',[verifyToken], getAllAssignmentQueByAssgn)
// Live Session List Without teacher
route.get('/getAll',[verifyToken], getAllAssignmentQuestions)

// Get Live Session Details
route.get('/:aq_id', [verifyToken], getAssignmentQuestions)

//Create Live Session
route.post(
  '/',
  [verifyToken],
  fileUploadMiddleware.fileUpload.fields([{ name: 'ls_image', maxCount: 1 }]),
  assignmentQuestionsValidation.createAssignmentQuestions,
  validationErrorMiddleware,
  createAssignmentQuestions,
)

// Update Live Session
route.put(
  '/:aq_id',
  [verifyToken],
  fileUploadMiddleware.fileUpload.fields([{ name: 'ls_image', maxCount: 1 }]),
  assignmentQuestionsValidation.updateAssignmentQuestions,
  validationErrorMiddleware,
  updateAssignmentQuestions,
)

// Delete Live Session
route.delete('/:aq_id', [verifyToken], deleteAssignmentQuestions)


export default route
