import { body } from 'express-validator'
import { areaType } from '../../util/constants'

export const createArea = [
  body('ar_title')
    .trim()
    .not()
    .notEmpty()
    .withMessage('Please enter area title')
    .bail(),
  body('ar_type')
    .trim()
    .not()
    .notEmpty()
    .withMessage('Please enter area type')
    .bail()
    .isIn(areaType)
    .withMessage('Please enter valid area type'),
  body('ar_parentId')
    .optional()
    .isNumeric()
    .withMessage('ParentId property only accepts numeric value'),
]
