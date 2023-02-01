import { body } from 'express-validator'
import { gesOfficeStaffService } from '../../db/services'
import { officeLevel } from '../../util/constants'

export const createOfficeStaff = [
  body('gs_staffRole')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please select role')
    .bail()
    .isIn(officeLevel)
    .withMessage('Please Select Valid Role')
    .bail(),
  body('gs_email')
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
        let emailExist = await gesOfficeStaffService.getGESOfficeStaff({
          where: {
            gs_email: value,
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
  body('gs_gesOfficeId')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please select gesOffice')
    .bail()
    .isNumeric()
    .withMessage('gesOfficeId property only accepts numeric value')
    .bail(),
  body('gs_staffId')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please enter staffId')
    .bail()
    .isNumeric()
    .withMessage('staffId property only accepts numeric value')
    .bail(),
  body('gs_fullName')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please enter Full Name')
    .bail()
    .isLength({ min: 5 })
    .withMessage('FullName name must contain atleast 5 characters')
    .bail(),
  body('gs_phoneNumber')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please enter PhoneNumber')
    .bail()
    .isMobilePhone('any')
    .withMessage('Please enter a valid Alt. Phone Number')
    .bail()
    .isLength({ max: 10 })
    .withMessage('Alt Phone Number must contain max 10 digits')
    .bail()
    .custom(async (value: string) => {
      try {
        let phoneNumberExist = await gesOfficeStaffService.getGESOfficeStaff({
          where: {
            gs_phoneNumber: value,
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
  body('gs_altPhoneNumber')
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
        let altPhoneNumberExist = await gesOfficeStaffService.getGESOfficeStaff(
          {
            where: {
              gs_altPhoneNumber: value,
            },
          },
        )

        if (altPhoneNumberExist) {
          throw new Error('Alt. phone number already exists')
        }

        return Promise.resolve()
      } catch (error: any) {
        return Promise.reject(error.message)
      }
    })
    .bail(),
]

export const updateOfficeStaff = [
  body('gs_staffRole')
    .optional()
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please select role')
    .bail()
    .isIn(officeLevel)
    .withMessage('Please Select Valid Role')
    .bail(),
  body('gs_email')
    .optional()
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please enter your correct email')
    .bail()
    .isEmail()
    .withMessage('Invalid email format')
    .bail(),
  body('gs_gesOfficeId')
    .optional()
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please select gesOffice')
    .bail()
    .isNumeric()
    .withMessage('gesOfficeId property only accepts numeric value')
    .bail(),
  body('gs_staffId')
    .optional()
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please enter staffId')
    .bail()
    .isNumeric()
    .withMessage('staffId property only accepts numeric value')
    .bail(),
  body('gs_fullName')
    .optional()
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please enter Full Name')
    .bail()
    .isLength({ min: 5 })
    .withMessage('FullName name must contain atleast 5 characters')
    .bail(),
  body('gs_phoneNumber')
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
  body('gs_altPhoneNumber')
    .optional({ checkFalsy: true })
    .isLength({ max: 10 })
    .withMessage('Alt Phone Number must contain max 10 digits')
    .bail(),
]
