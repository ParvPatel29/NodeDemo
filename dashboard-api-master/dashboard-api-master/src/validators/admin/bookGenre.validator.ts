import { body } from 'express-validator'

export const createBookGenre = [
  body('bg_genreName')
    .trim()
    .notEmpty()
    .withMessage('Please enter genre Name')
    .bail(),
  body('bg_status')
    .default(true)
    .isBoolean()
    .withMessage('status property only accepts boolean value')
    .bail(),
]

export const updateBookGenre = [
  body('bg_genreName')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Please enter genre Name')
    .bail(),
  body('bg_status')
    .optional()
    .default(true)
    .isBoolean()
    .withMessage('status property only accepts boolean value')
    .bail(),
]
