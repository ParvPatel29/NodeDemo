import { body } from 'express-validator'
import { programType } from '../../util/constants'

export const createTrainingProgram = [
  body('tp_programTitle')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please enter Program Title')
    .bail()
    .isLength({ min: 5 })
    .withMessage('Title must contain minimum 5 characters')
    .bail(),
  body('tp_typeOfProgram')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please select Program type')
    .bail()
    .isIn(programType)
    .withMessage('Please Select Valid Program-Type')
    .bail(),
  body('tp_description')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please enter description')
    .bail()
    .isString()
    .withMessage('Description property only accepts text value')
    .bail(),
  body('tp_whoCanAttend')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please enter who Can Attend')
    .bail()
    .isLength({ min: 5 })
    .withMessage('WhoCanAttend must contain minimum 5 characters')
    .bail(),
  body('tp_benefitsOfProgram')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please enter benefits Of Program')
    .bail()
    .isLength({ min: 10 })
    .withMessage('BenefitsOfProgram must contain minimum 10 characters')
    .bail(),
  body('tp_certificateTemplate')
    .custom((value, { req }) => {
      return !!req.files?.['tp_certificateTemplate']?.[0]?.filename || !!value
    })
    .withMessage('Please select certificate Template')
    .bail(),
  body('tp_programImage')
    .custom((value, { req }) => {
      return !!req.files?.['tp_programImage']?.[0]?.filename || !!value
    })
    .withMessage('Please select Program Image')
    .bail(),
  body('tp_duration')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please enter tp_duration Title')
    .bail(),
  body('tp_isFree')
    .default(true)
    .isBoolean()
    .withMessage('isFree property only accepts boolean value')
    .bail(),
  body('tp_price')
    .optional({ checkFalsy: true })
    .trim()
    .isNumeric()
    .withMessage('Price Property only accepts numeric value')
    .bail()
    .custom((value) => {
      try {
        const nagativeValue = value <= 0

        if (nagativeValue) {
          throw new Error('Please enter valid price ')
        }

        return Promise.resolve()
      } catch (error: any) {
        return Promise.reject(error.message)
      }
    }),
]

export const updateTrainingProgram = [
  body('tp_programTitle')
    .optional()
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please enter Program Title')
    .bail()
    .isLength({ min: 5 })
    .withMessage('Title must contain minimum 5 characters')
    .bail(),
  body('tp_typeOfProgram')
    .optional()
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please select Program type')
    .bail()
    .isIn(programType)
    .withMessage('Please Select Valid Program-Type')
    .bail(),
  body('tp_description')
    .optional()
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please enter description')
    .bail()
    .isString()
    .withMessage('Description property only accepts text value')
    .bail(),
  body('tp_whoCanAttend')
    .optional()
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please enter who can attend')
    .bail()
    .isLength({ min: 5 })
    .withMessage('WhoCanAttend must contain minimum 5 characters')
    .bail(),
  body('tp_benefitsOfProgram')
    .optional()
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please enter benefits of program')
    .bail()
    .isLength({ min: 10 })
    .withMessage('Benefits Of Program must contain minimum 10 characters')
    .bail(),
  body('tp_certificateTemplate')
    .optional()
    .custom((value, { req }) => {
      return !!req.files?.['tp_certificateTemplate']?.[0]?.filename || !!value
    })
    .withMessage('Please select certificate Template')
    .bail(),
  body('tp_programImage')
    .optional()
    .custom((value, { req }) => {
      return !!req.files?.['tp_programImage']?.[0]?.filename || !!value
    })
    .withMessage('Please select Program Image')
    .bail(),
  body('tp_duration')
    .optional()
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please enter tp_duration Title')
    .bail(),
  body('tp_isFree')
    .optional()
    .default(true)
    .isBoolean()
    .withMessage('isFree property only accepts boolean value')
    .bail(),
  body('tp_price')
    .optional({ checkFalsy: true })
    .trim()
    .isNumeric()
    .withMessage('Price Property only accepts numeric value')
    .bail()
    .custom((value) => {
      try {
        const nagativeValue = value <= 0

        if (nagativeValue) {
          throw new Error('Please enter valid price ')
        }

        return Promise.resolve()
      } catch (error: any) {
        return Promise.reject(error.message)
      }
    }),
]
