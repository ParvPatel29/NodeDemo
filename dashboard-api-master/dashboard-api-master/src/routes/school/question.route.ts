import { Router } from 'express'
import { questionController } from '../../controllers/school'
import { schoolValidator } from '../../validators'

// Validation Middleware(ErrorValidation)
import validationErrorMiddleware from '../../util/validationError'

const route = Router()

const { questionValidator } = schoolValidator
const {
  createQuestion,
  getAllQuestions,
  updateQuestion,
  deleteQuestion,
  getQuestion,
} = questionController

//Create Question
route.post(
  '/',
  questionValidator.createQuestion,
  validationErrorMiddleware,
  createQuestion,
)

// Get All Question
route.get('/', getAllQuestions)

// Get Question
route.get('/:qb_id', getQuestion)

// Update a Question
route.put(
  '/:qb_id',
  questionValidator.updateQuestion,
  validationErrorMiddleware,
  updateQuestion,
)

// Delete a Question
route.delete('/:qb_id', deleteQuestion)

export default route
