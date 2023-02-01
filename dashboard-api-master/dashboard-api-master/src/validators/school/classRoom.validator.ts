import { body } from 'express-validator'

export const createClassRoom = [
  body('cr_class')
    .trim()
    .not()
    .isEmpty()
    .bail()
    .withMessage('Please select class')
    .bail(),
  body('cr_division')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please select division')
    .bail(),
  body('cr_noOfStudents')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please enter No Of Student')
    .bail()
    .isNumeric()
    .withMessage('noOfStudents property only accepts numeric value')
    .bail(),
  body('cr_classTeacherId')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please select classTeacher')
    .bail()
    .isNumeric()
    .withMessage('classTeacherId property only accepts numeric value')
    .bail(),
]

export const updateClassRoom = [
  body('cr_class')
    .optional()
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please select class')
    .bail(),
  body('cr_division')
    .optional()
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please select division')
    .bail(),
  body('cr_noOfStudents')
    .optional()
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please enter No Of Student')
    .bail()
    .isNumeric()
    .withMessage('noOfStudents property only accepts numeric value')
    .bail(),
  body('cr_classTeacherId')
    .optional()
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please select classTeacher')
    .bail()
    .isNumeric()
    .withMessage('classTeacherId property only accepts numeric value')
    .bail(),
]
