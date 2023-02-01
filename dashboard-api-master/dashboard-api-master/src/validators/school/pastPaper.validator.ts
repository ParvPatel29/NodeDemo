import { body } from 'express-validator'
import { teacherService } from '../../db/services'
import { countryCode } from '../../util/constants'

export const createPastPaper = [
  body('pp_year')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please enter Year')
    .bail(),
  body('pp_body')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please enter Body')
    .bail(),
  body('pp_title')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please enter Title')
    .bail(),
  body('pp_category')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please enter class')
    .bail(),
  body('pp_subCategory')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please enter subject')
    .bail(),
  body('pp_topic')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please enter Topic')
    .bail(),
]

export const updatePastPaper = [
  body('pp_year')
    .optional()
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please enter Year')
    .bail(),
  body('pp_body')
    .optional()
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please enter Body')
    .bail(),
  body('pp_title')
    .optional()
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please enter Title')
    .bail(),
  body('pp_class')
    .optional()
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please enter class')
    .bail(),
  body('pp_subject')
    .optional()
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please enter subject')
    .bail(),
  body('pp_topic')
    .optional()
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please enter Topic')
    .bail(),
]
