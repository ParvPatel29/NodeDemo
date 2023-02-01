import { body } from 'express-validator'
import { teacherService } from '../../db/services'
import { countryCode } from '../../util/constants'

export const createAssignmentQuestions = [
  body('tc_id')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please enter Teacher Id')
    .bail(),
  body('aq_title')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please enter Title')
    .bail(),
  body('aq_answerType')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please enter Answer Type')
    .bail(),
  body('aq_correntAns')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please enter Correct Answer')
    .bail(),
]

export const updateAssignmentQuestions = [
  body('tc_id')
    .optional()
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please enter Teacher Id')
    .bail(),
  body('aq_title')
    .optional()
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please enter Title')
    .bail(),
  body('aq_answerType')
    .optional()
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please enter Answer Type')
    .bail(),
  body('aq_correntAns')
    .optional()
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please enter Correct Answer')
    .bail(),
]
