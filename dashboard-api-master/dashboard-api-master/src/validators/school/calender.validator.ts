import { body } from 'express-validator'

export const createCalender = [
  body('ec_schoolId')
    .trim()
    .not()
    .isEmpty()
    .bail()
    .withMessage('Please select school')
    .isNumeric()
    .withMessage('schoolId property only accepts numeric value')
    .bail(),
  body('ec_class')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please select class')
    .bail(),
  body('ec_eventtype')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please select eventType')
    .bail(),
  body('ec_eventDate')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please select eventDate')
    .bail(),

  body('ec_eventTitle')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please enter eventTitle')
    .bail(),
  // body('ec_status')
  //   .default(true)
  //   .isBoolean()
  //   .withMessage('Status property only accepts boolean value')
  //   .bail(),
]

export const updateCalender = [
  body('ec_schoolId')
    .optional()
    .trim()
    .not()
    .isEmpty()
    .bail()
    .withMessage('Please select school')
    .isNumeric()
    .withMessage('schoolId property only accepts numeric value')
    .bail(),
  body('ec_class')
    .optional()
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please select class')
    .bail(),
  body('ec_eventtype')
    .optional()
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please select eventType')
    .bail(),
  body('ec_eventDate')
    .optional()
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please select eventDate')
    .bail(),

  body('ec_eventTitle')
    .optional()
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please enter eventTitle')
    .bail(),
  // body('ec_status')
  //   .default(true)
  //   .isBoolean()
  //   .withMessage('Status property only accepts boolean value')
  //   .bail(),
]
