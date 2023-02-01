import { body } from 'express-validator'

export const createYearlyScheme = [
  body('sc_id')
    .trim()
    .not()
    .isEmpty()
    .bail()
    .withMessage('Please Enter School Id')
    .isNumeric()
    .withMessage('School Id property only accepts numeric value')
    .bail(),
  body('ysc_year').trim().not().isEmpty().withMessage('Please Enter Year'),
  body('ysc_date').trim().not().isEmpty().withMessage('Please Enter Date'),
]

export const updateYearlyScheme = [
  // body('sc_id')
  //   .trim()
  //   .not()
  //   .isEmpty()
  //   .bail()
  //   .withMessage('Please Enter School Id')
  //   .isNumeric()
  //   .withMessage('School Id property only accepts numeric value')
  //   .bail(),
  // body('ysc_year').trim().not().isEmpty().withMessage('Please Enter Year'),
  // body('ysc_date').trim().not().isEmpty().withMessage('Please Enter Date'),
]
