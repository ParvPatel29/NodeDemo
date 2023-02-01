import { body } from 'express-validator'
import { teacherService } from '../../db/services'
import { countryCode } from '../../util/constants'

export const createAssignment = [
  body('tc_id')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please enter Teacher Id')
    .bail(),
  body('asn_title')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please enter Title')
    .bail(),
  body('asn_totalMarks')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please enter Total Marks')
    .bail(),
  body('asn_duration')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please enter Duration')
    .bail(),
]

export const updateAssignment = [
  body('tc_id ')
  .optional()
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please enter Teacher Id')
    .bail(),
  body('asn_title')
  .optional()
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please enter Title')
    .bail(),
  body('asn_totalMarks')
  .optional()
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please enter Total Marks')
    .bail(),
  body('asn_duration')
  .optional()
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please enter Duration')
    .bail(),
]
