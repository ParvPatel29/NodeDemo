import { body } from 'express-validator'
import { subjects } from '../../util/constants'

export const createLessonValidator = [
  body('tl_teacherId')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please select teacher')
    .bail()
    .isNumeric()
    .withMessage('teacherId property only accepts numeric value')
    .bail(),
  body('tl_lesson')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please enter lesson')
    .bail(),
  body('tl_subject')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please select subject')
    .bail()
    .isIn(subjects)
    .withMessage('Please Select Valid subjects')
    .bail(),
]

export const updateLessonValidator = [
  body('tl_teacherId')
    .optional()
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please select teacher')
    .bail()
    .isNumeric()
    .withMessage('teacherId property only accepts numeric value')
    .bail(),
  body('tl_lesson')
    .optional()
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please enter lesson')
    .bail(),
  body('tl_subject')
    .optional()
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please select subject')
    .bail()
    .isIn(subjects)
    .withMessage('Please Select Valid subjects')
    .bail(),
]
