import { body } from 'express-validator'
import { contentCategory } from '../../util/constants'

export const createContentCategory = [
  body('cc_categoryName')
    .trim()
    .not()
    .notEmpty()
    .withMessage('Please enter categoryName')
    .bail(),
  body('cc_categoryType')
    .trim()
    .not()
    .notEmpty()
    .withMessage('Please select category type')
    .bail()
    .isIn(contentCategory)
    .withMessage('Please select valid categoryType value')
    .bail(),
  body('cc_categoryTag')
    .trim()
    .not()
    .notEmpty()
    .withMessage('Please enter valid category tag')
    .bail(),
  body('cc_parentId')
    .optional()
    .isNumeric()
    .withMessage('parentId property only accepts numeric value'),
]
