import { body } from 'express-validator'
import { teacherService } from '../../db/services'
import { countryCode } from '../../util/constants'

export const createPastQuestionPaper = [
  body('pp_id')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please enter Past Paper Id')
    .bail(),
  body('pq_mark')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please enter Total Marks')
    .bail(),
  body('pq_correctAns')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please enter Correct Answer')
    .bail(),
]

export const updatePastQuestionPaper = [
  body('pp_id')
    .optional()
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please enter Past Paper Id')
    .bail(),
  body('pq_mark')
    .optional()
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please enter Total Marks')
    .bail(),
  body('pq_correctAns')
    .optional()
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please enter Correct Answer')
    .bail(),
]
