import { body } from 'express-validator'

export const createNotificaiton = [
  body('nt_schoolId')
    .trim()
    .not()
    .isEmpty()
    .bail()
    .withMessage('Please select school')
    .isNumeric()
    .withMessage('schoolId property only accepts numeric value')
    .bail(),
  body('nt_class')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please select class')
    .bail(),
  body('nt_title')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please enter notificationTitle')
    .bail(),
  body('nt_desc')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please enter notificationDescription')
    .bail(),
  // body('nt_file')
  //   .optional({ checkFalsy: true })
  //   .custom((value, { req }) => {
  //     return !!req.files?.['nt_file']?.[0]?.filename || !!value
  //   })
  //   .withMessage('Please select file')
  //   .bail(),
]

export const updateNotificaiton = [
  body('nt_schoolId')
    .optional()
    .trim()
    .not()
    .isEmpty()
    .bail()
    .withMessage('Please select school')
    .isNumeric()
    .withMessage('schoolId property only accepts numeric value')
    .bail(),
  body('nt_class')
    .optional()
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please select class')
    .bail(),
  body('nt_title')
    .optional()
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please enter notificationTitle')
    .bail(),
  body('nt_desc')
    .optional()
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please enter notificationDescription')
    .bail(),
  // body('nt_file')
  //   .optional({ checkFalsy: true })
  //   .custom((value, { req }) => {
  //     return !!req.files?.['nt_file']?.[0]?.filename || !!value
  //   })
  //   .withMessage('Please select file')
  //   .bail(),
]

// export const updateClassRoom = [
//   body('cr_class')
//     .optional()
//     .trim()
//     .not()
//     .isEmpty()
//     .withMessage('Please select class')
//     .bail(),
//   body('cr_division')
//     .optional()
//     .trim()
//     .not()
//     .isEmpty()
//     .withMessage('Please select division')
//     .bail(),
//   body('cr_noOfStudents')
//     .optional()
//     .trim()
//     .not()
//     .isEmpty()
//     .withMessage('Please enter No Of Student')
//     .bail()
//     .isNumeric()
//     .withMessage('noOfStudents property only accepts numeric value')
//     .bail(),
//   body('cr_classTeacherId')
//     .optional()
//     .trim()
//     .not()
//     .isEmpty()
//     .withMessage('Please select classTeacher')
//     .bail()
//     .isNumeric()
//     .withMessage('classTeacherId property only accepts numeric value')
//     .bail(),
//   body('cr_schoolId')
//     .trim()
//     .not()
//     .isEmpty()
//     .withMessage('Please select schoolId')
//     .bail()
//     .isNumeric()
//     .withMessage('SchoolId property only accepts numeric value')
//     .bail(),
// ]
