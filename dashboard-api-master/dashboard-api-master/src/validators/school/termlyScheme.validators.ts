import { body } from 'express-validator'

export const createTermlyScheme = [
  body('tsc_year')
    .trim()
    .not()
    .isEmpty()
    .bail()
    .withMessage('Please Enter Year')
    .isNumeric()
    .withMessage('Year property only accepts numeric value')
    .bail(),
  body('tsc_termNumber')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please Enter Term Number')
 
]

export const updateTermlyScheme = [
  // body('tsc_year')
  //   .trim()
  //   .not()
  //   .isEmpty()
  //   .bail()
  //   .withMessage('Please Enter Year')
  //   .isNumeric()
  //   .withMessage('Year property only accepts numeric value')
  //   .bail(),
  // body('tsc_termNumber')
  //   .trim()
  //   .not()
  //   .isEmpty()
  //   .withMessage('Please Enter Term Number')
]
