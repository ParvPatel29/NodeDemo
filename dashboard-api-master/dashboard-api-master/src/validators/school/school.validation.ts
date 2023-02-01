import { body } from 'express-validator'
import { schoolType } from '../../util/constants'

export const updateSchool = [
  body('sc_schoolType')
    .optional()
    .trim()
    .isString()
    .withMessage('School type property only accepts string value')
    .bail()
    .isIn(schoolType)
    .withMessage('Please Select Valid School-Type')
    .bail(),
  body('sc_schoolHeadName')
    .optional()
    .trim()
    .isString()
    .withMessage('schoolHeadName property only accepts string value')
    .bail(),
  body('sc_email')
    .optional()
    .trim()
    .isEmail()
    .withMessage('Invalid email format')
    .bail(),
  body('sc_phoneNumber')
    .optional()
    .trim()
    .isMobilePhone('any')
    .withMessage('Please enter a valid Phone Number')
    .bail()
    .isLength({ max: 10 })
    .withMessage('Phone number must contain max 10 digits')
    .bail(),
  body('sc_altPhoneNumber')
    .optional({ checkFalsy: true })
    .isLength({ max: 10 })
    .withMessage('Alt Phone Number must contain max 10 digits')
    .bail(),
  body('sc_address')
    .optional({ checkFalsy: true })
    .isString()
    .withMessage('Address property only accepts string')
    .bail(),
]
