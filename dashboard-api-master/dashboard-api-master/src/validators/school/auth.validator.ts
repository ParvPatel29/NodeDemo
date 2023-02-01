import { body } from 'express-validator'

// st_fullName
export const loginStudent = [
  body('userName')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please enter your userName')
    .bail(),
  body('password')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please enter the password')
    .bail(),
]
