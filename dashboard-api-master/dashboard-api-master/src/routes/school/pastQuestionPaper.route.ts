import { Router, Request, Response, NextFunction } from 'express'
import {
  assignmentQuestionsController,
  pastQuestionPaperController,
} from '../../controllers/school'
import { verifyToken } from '../../middleware/common/token.middleware'
import { fileUploadMiddleware } from '../../middleware/common'
import validationErrorMiddleware from '../../util/validationError'
import { schoolValidator } from '../../validators'

const route = Router()
const {
  deletePastQuestionPaper,
  getAllPastQuestionPaper,
  createPastQuestionPaper,
  updatePastQuestionPaper,
  getPastQuestionPaper,
} = pastQuestionPaperController

const { pastQuestionPaperValidation } = schoolValidator

route.use('/', (req: Request, res: Response, next: NextFunction): void => {
  req.table_name = 'kt_pastQuestionPaper'
  return next()
})

// // Live Session List
// route.get('/get',[verifyToken], getAllAssignmentQueByTeacher)

// // Get All assignmentQue by
// route.get('/getAssignmentQues',[verifyToken], getAllAssignmentQueByAssgn)

// Live Session List Without teacher
route.get('/getAll', [verifyToken], getAllPastQuestionPaper)

// Get Live Session Details
route.get('/:pq_id', [verifyToken], getPastQuestionPaper)

//Create Live Session
route.post(
  '/',
  [verifyToken],
  fileUploadMiddleware.fileUpload.fields([{ name: 'pq_image', maxCount: 1 }]),
  pastQuestionPaperValidation.createPastQuestionPaper,
  validationErrorMiddleware,
  createPastQuestionPaper,
)

// Update Live Session
route.put(
  '/:pq_id',
  [verifyToken],
  fileUploadMiddleware.fileUpload.fields([{ name: 'pq_image', maxCount: 1 }]),
  pastQuestionPaperValidation.updatePastQuestionPaper,
  validationErrorMiddleware,
  updatePastQuestionPaper,
)

// Delete Live Session
route.delete('/:pq_id', [verifyToken], deletePastQuestionPaper)

export default route
