import { body } from 'express-validator'
import { teacherService } from '../../db/services'
import { countryCode } from '../../util/constants'

export const createTeacher = [
  body('tc_fullName')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please enter Full Name')
    .bail()
    .isLength({ min: 5 })
    .withMessage('FullName name must contain atleast 5 characters')
    .bail(),
  body('tc_email')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please enter your correct email')
    .bail()
    .isEmail()
    .withMessage('Invalid email format')
    .bail()
    .custom(async (value: string) => {
      try {
        let emailExist = await teacherService.getTeacher({
          where: {
            tc_email: value,
          },
        })

        if (emailExist) {
          throw new Error(
            'Email already exists, please enter a different email',
          )
        }

        return Promise.resolve()
      } catch (error: any) {
        return Promise.reject(error.message)
      }
    })
    .bail(),
  body('tc_altEmail')
    .optional({ checkFalsy: true })
    .trim()
    .isEmail()
    .withMessage('Invalid Alt. email format')
    .bail()
    .custom(async (value: string) => {
      try {
        let emailExist = await teacherService.getTeacher({
          where: {
            tc_altEmail: value,
          },
        })

        if (emailExist) {
          throw new Error(
            'Alt. email already exists, please enter a different email',
          )
        }

        return Promise.resolve()
      } catch (error: any) {
        return Promise.reject(error.message)
      }
    })
    .bail(),
  body('tc_staffId')
    .optional({ checkFalsy: true })
    .trim()
    .isNumeric()
    .withMessage('staffId property only accepts numeric value')
    .bail(),
  body('tc_schoolId')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please select school')
    .bail()
    .isNumeric()
    .withMessage('schoolId property only accepts numeric value')
    .bail(),
  body('tc_education')
    .optional({ checkFalsy: true })
    .trim()
    .isString()
    .withMessage('Education property only accepts string value')
    .bail(),
  body('tc_phoneNumber')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please enter PhoneNumber')
    .bail()
    .isMobilePhone('any')
    .withMessage('Please enter valid number')
    .bail()
    .isLength({ max: 10 })
    .withMessage('Phone number must contain max 10 digits')
    .bail()
    .custom(async (value: string) => {
      try {
        let phoneNumberExist = await teacherService.getTeacher({
          where: {
            tc_phoneNumber: value,
          },
        })

        if (phoneNumberExist) {
          throw new Error('Phone number already exists')
        }

        return Promise.resolve()
      } catch (error: any) {
        return Promise.reject(error.message)
      }
    })
    .bail(),
  body('tc_altPhoneNumber')
    .optional({ checkFalsy: true })
    .trim()
    .isMobilePhone('any')
    .withMessage('Please enter a valid Alt. Phone Number')
    .bail()
    .isLength({ max: 10 })
    .withMessage('Alt Phone Number must contain max 10 digits')
    .bail()
    .custom(async (value: string) => {
      try {
        let phoneNumberExist = await teacherService.getTeacher({
          where: {
            tc_altPhoneNumber: value,
          },
        })

        if (phoneNumberExist) {
          throw new Error('Alt. phone number already exists')
        }

        return Promise.resolve()
      } catch (error: any) {
        return Promise.reject(error.message)
      }
    })
    .bail(),
  body('tc_address')
    .optional({ checkFalsy: true })
    .trim()
    .isString()
    .withMessage('Address property only accepts string')
    .bail(),
  body('tc_profilePic')
    .optional({ checkFalsy: true })
    .custom((value, { req }) => {
      return !!req.files?.['tc_profilePic']?.[0]?.filename || !!value
    })
    .withMessage('Please select profile pic')
    .bail(),
  body('tc_degreeCertificate')
    .optional({ checkFalsy: true })
    .custom((value, { req }) => {
      return !!req.files?.['tc_degreeCertificate']?.[0]?.filename || !!value
    })
    .withMessage('Please select degree certificate')
    .bail(),
  body('tc_countryCode')
    .optional({ checkFalsy: true })
    .if((value: number) => value !== null)
    .isInt()
    .withMessage('countryCode only accept numeric value')
    .bail()
    .isIn(countryCode)
    .withMessage('Please Select Valid Country-Code')
    .bail(),
]

export const updateTeacher = [
  body('tc_fullName')
    .optional()
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please enter Full Name')
    .bail()
    .isLength({ min: 5 })
    .withMessage('FullName name must contain atleast 5 characters')
    .bail(),
  body('tc_email')
    .optional()
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please enter your correct email')
    .bail()
    .isEmail()
    .withMessage('Invalid email format')
    .bail(),
  body('tc_altEmail')
    .optional({ checkFalsy: true })
    .trim()
    .isString()
    .withMessage('Please enter valid email address')
    .bail(),
  body('tc_staffId')
    .optional({ checkFalsy: true })
    .trim()
    .isNumeric()
    .withMessage('staffId property only accepts numeric value')
    .bail(),
  body('tc_schoolId')
    .optional()
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please select school')
    .bail()
    .isNumeric()
    .withMessage('schoolId property only accepts numeric value')
    .bail(),
  body('tc_education')
    .optional({ checkFalsy: true })
    .trim()
    .isString()
    .withMessage('Education property only accepts string value')
    .bail(),
  body('tc_phoneNumber')
    .optional()
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please enter PhoneNumber')
    .bail()
    .isMobilePhone('any')
    .withMessage('Please enter valid number')
    .bail()
    .isLength({ max: 10 })
    .withMessage('Phone number must contain max 10 digits')
    .bail(),
  body('tc_altPhoneNumber')
    .optional({ checkFalsy: true })
    .isLength({ max: 10 })
    .withMessage('Alt Phone Number must contain max 10 digits')
    .bail(),
  body('tc_address')
    .optional({ checkFalsy: true })
    .trim()
    .isString()
    .withMessage('Address property only accepts string')
    .bail(),
  body('tc_countryCode')
    .optional({ checkFalsy: true })
    .if((value: number) => value !== null)
    .isInt()
    .withMessage('countryCode only accept numeric value')
    .bail()
    .isIn(countryCode)
    .withMessage('Please Select Valid Country-Code')
    .bail(),
]

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
