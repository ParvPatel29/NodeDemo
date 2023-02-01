import { body, check } from 'express-validator'
import { schoolService } from '../../db/services'
import { schoolType } from '../../util/constants'

// User Validator
export const createSchool = [
  body('sc_schoolName')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please enter school name')
    .bail()
    .isLength({ min: 5 })
    .withMessage('School name must contain atleast 5 characters')
    .bail(),
  body('sc_schoolType')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please select school type')
    .bail()
    .isIn(schoolType)
    .withMessage('Please Select Valid School-Type')
    .bail(),
  body('sc_schoolHeadName')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please enter schoolHeadName')
    .bail(),
  body('sc_region')
    .trim()
    .not()
    .notEmpty()
    .withMessage('Please select region')
    .bail(),
  body('sc_email')
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
        let emailExist = await schoolService.getSchool({
          where: {
            sc_email: value,
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
    }),
  body('sc_phoneNumber')
    .trim()
    .not()
    .isEmpty()
    .isMobilePhone('any')
    .withMessage('Please enter a valid Phone Number')
    .bail()
    .isLength({ max: 10 })
    .withMessage('Phone Number must contain max 10 digits')
    .bail()
    .custom(async (value: string) => {
      try {
        let phoneNumberExist = await schoolService.getSchool({
          where: {
            sc_phoneNumber: value,
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
  body('sc_altPhoneNumber')
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
        let altPhoneNumberExist = await schoolService.getSchool({
          where: {
            sc_altPhoneNumber: value,
          },
        })

        if (altPhoneNumberExist) {
          throw new Error('Alt. phone number already exists')
        }

        return Promise.resolve()
      } catch (error: any) {
        return Promise.reject(error.message)
      }
    })
    .bail(),
  body('sc_address')
    .optional({ checkFalsy: true })
    .isString()
    .withMessage('Address property only accepts string')
    .bail(),
  body('sc_schoolId')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please enter schoolId')
    .bail()
    .isNumeric()
    .withMessage('schoolId property only accepts numeric value')
    .bail(),
]

export const updateSchool = [
  body('sc_schoolName')
    .optional()
    .trim()
    .isLength({ min: 5 })
    .withMessage('School name must contain atleast 5 characters')
    .bail(),
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
  body('sc_schoolId')
    .optional()
    .trim()
    .isNumeric()
    .withMessage('schoolId property only accepts numeric value')
    .bail(),
]
