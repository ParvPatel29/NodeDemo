import { body } from 'express-validator'
import { subjects } from '../../util/constants'

export const createQuestion = [
  body('qb_classRoomId')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please select class')
    .bail()
    .isNumeric()
    .withMessage('classRoomId property only accepts numeric value')
    .bail(),
  body('qb_subject')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please select subject')
    .bail()
    .isIn(subjects)
    .withMessage('Please Select Valid subjects')
    .bail(),
  body('qb_questionTitle')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please enter question')
    .bail(),
  body('qb_option1')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please enter option1')
    .bail(),
  body('qb_option2')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please enter option2')
    .bail(),
  body('qb_option3')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please enter option3')
    .bail(),
  body('qb_option3')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please enter option4')
    .bail(),
  body('qb_correctAnswer')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please select correctAnswer')
    .bail(),
]

export const updateQuestion = [
  body('qb_classRoomId')
    .optional()
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please select class')
    .bail()
    .isNumeric()
    .withMessage('classRoomId property only accepts numeric value')
    .bail(),
  body('qb_subject')
    .optional()
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please select subject')
    .bail()
    .isIn(subjects)
    .withMessage('Please Select Valid subjects')
    .bail(),
  body('qb_questionTitle')
    .optional()
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please enter question')
    .bail(),
  body('qb_option1')
    .optional()
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please enter option1')
    .bail(),
  body('qb_option2')
    .optional()
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please enter option2')
    .bail(),
  body('qb_option3')
    .optional()
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please enter option3')
    .bail(),
  body('qb_option3')
    .optional()
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please enter option4')
    .bail(),
  body('qb_correctAnswer')
    .optional()
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please select correctAnswer')
    .bail(),
]
