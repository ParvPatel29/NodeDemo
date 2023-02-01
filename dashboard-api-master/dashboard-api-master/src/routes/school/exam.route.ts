import { Router } from 'express'
import { examController } from '../../controllers/school'
import validationErrorMiddleware from '../../util/validationError'
import { schoolValidator } from '../../validators'

const route = Router()

// const { examRoomValidator } = schoolValidator

const { getAllExams, createExam, updateExam, getExam, deleteExam } =
  examController

// Get All Exams
route.get('/', getAllExams)

// Get Exam Details
route.get('/:ex_id', getExam)

//Create Exam
route.post(
  '/',
  // examRoomValidator.createExam,
  validationErrorMiddleware,
  createExam,
)

// Update Exam
route.put(
  '/:ex_id',
  // examRoomValidator.updateExam,
  validationErrorMiddleware,
  updateExam,
)

// Delete Exam
route.delete('/:ex_id', deleteExam)

export default route
