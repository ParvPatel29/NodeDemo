import { body } from 'express-validator'
import { teacherService } from '../../db/services'
import { countryCode } from '../../util/constants'

export const updatePublisher = [
  body('pb_fullName')
    .optional({ checkFalsy: true })
    .isLength({ min: 5 })
    .withMessage('FullName must contain atleast 5 characters')
    .bail(),
  
  body('pb_phoneNumber')
    .optional({ checkFalsy: true })
    .isMobilePhone('any')
    .withMessage('Please enter valid phone number')
    .bail()
    .isLength({ max: 10 })
    .withMessage('Phone Number must contain max 10 digits')
    .bail(),
 
  body('pb_email')
    .optional({ checkFalsy: true })
    .isEmail()
    .withMessage('Please enter valid email')
    .bail(),
  body('pb_profilePic')
    .optional({ checkFalsy: true })
    .custom((value, { req }) => {
      return !!req.files?.['pb_profilePic']?.[0]?.filename || !!value
    })
    .withMessage('Please enter profile pic')
    .bail(),
 
  body('pb_password')
    .optional({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must contain atleast 6 characters'),
]

export const updateParent = [
  body('pt_fullName')
    .optional({ checkFalsy: true })
    .isLength({ min: 5 })
    .withMessage('FullName must contain atleast 5 characters')
    .bail(),
  
  body('pt_phoneNumber')
    .optional({ checkFalsy: true })
    .isMobilePhone('any')
    .withMessage('Please enter valid phone number')
    .bail()
    .isLength({ max: 10 })
    .withMessage('Phone Number must contain max 10 digits')
    .bail(),
 
  body('pt_email')
    .optional({ checkFalsy: true })
    .isEmail()
    .withMessage('Please enter valid email')
    .bail(),
  body('pt_profilePic')
    .optional({ checkFalsy: true })
    .custom((value, { req }) => {
      return !!req.files?.['pt_profilePic']?.[0]?.filename || !!value
    })
    .withMessage('Please enter profile pic')
    .bail(),
 
  body('pt_password')
    .optional({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must contain atleast 6 characters'),
]
