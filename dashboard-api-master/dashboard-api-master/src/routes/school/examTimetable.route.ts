import { NextFunction, Router, Request, Response } from 'express'
import { examTimeTableController } from '../../controllers/school'
import { fileUploadMiddleware } from '../../middleware/common'
import validationErrorMiddleware from '../../util/validationError'
import { schoolValidator } from '../../validators'

const route = Router()

// const { examRoomValidator } = schoolValidator

const {
  getAllExamSchedule,
  createExamSchedule,
  updateExamSchedule,
  getExamSchedule,
  deleteExamSchedule,
} = examTimeTableController

route.use('/', (req: Request, res: Response, next: NextFunction): void => {
  req.table_name = 'kt_examTimeTable'
  return next()
})

// Get All ExamSchedule
route.get('/', getAllExamSchedule)

// Get ExamSchedule Details
route.get('/:et_id', getExamSchedule)

//Create ExamSchedule
route.post(
  '/',
  fileUploadMiddleware.fileUpload.fields([
    { name: 'et_oldExamPaper', maxCount: 1 },
  ]),
  // examRoomValidator.createExamSchedule,
  validationErrorMiddleware,
  createExamSchedule,
)

// Update ExamSchedule
route.put(
  '/:et_id',
  fileUploadMiddleware.fileUpload.fields([
    { name: 'et_oldExamPaper', maxCount: 1 },
  ]),
  // examRoomValidator.updateExamSchedule,
  validationErrorMiddleware,
  updateExamSchedule,
)

// Delete Exam
route.delete('/:et_id', deleteExamSchedule)

export default route
