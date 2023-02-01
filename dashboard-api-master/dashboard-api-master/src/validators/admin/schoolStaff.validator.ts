import { body } from 'express-validator'
import { schoolStaffService } from '../../db/services'
import { staffRole } from '../../util/constants'

export const createSchoolStaff = [
  body('ss_staffRole')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please select role')
    .bail()
    .isIn(staffRole)
    .withMessage('Please Select Valid Role')
    .bail(),
  body('ss_email')
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
        let emailExist = await schoolStaffService.getSchoolStaff({
          where: {
            ss_email: value,
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
  body('ss_schoolId')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please select school')
    .bail()
    .isNumeric()
    .withMessage('schoolId property only accepts numeric value')
    .bail(),
  body('ss_staffId')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please enter staffId')
    .bail()
    .isNumeric()
    .withMessage('staffId property only accepts numeric value')
    .bail(),
  body('ss_fullName')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please enter Full Name')
    .bail()
    .isLength({ min: 5 })
    .withMessage('FullName name must contain atleast 5 characters')
    .bail(),
  body('ss_phoneNumber')
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
        let phoneNumberExist = await schoolStaffService.getSchoolStaff({
          where: {
            ss_phoneNumber: value,
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
  body('ss_altPhoneNumber')
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
        let altPhoneNumberExist = await schoolStaffService.getSchoolStaff({
          where: {
            ss_altPhoneNumber: value,
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
]

export const updateSchoolStaff = [
  body('ss_staffRole')
    .optional()
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please select role')
    .bail()
    .isIn(staffRole)
    .withMessage('Please Select Valid Role')
    .bail(),
  body('ss_email')
    .optional()
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please enter your correct email')
    .bail()
    .isEmail()
    .withMessage('Invalid email format')
    .bail(),
  body('ss_schoolId')
    .optional()
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please select school')
    .bail()
    .isNumeric()
    .withMessage('schoolId property only accepts numeric value')
    .bail(),
  body('ss_staffId')
    .optional()
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please enter staffId')
    .bail()
    .isNumeric()
    .withMessage('staffId property only accepts numeric value')
    .bail(),
  body('ss_fullName')
    .optional()
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please enter Full Name')
    .bail()
    .isLength({ min: 5 })
    .withMessage('FullName name must contain atleast 5 characters')
    .bail(),
  body('ss_phoneNumber')
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
  body('ss_altPhoneNumber')
    .optional({ checkFalsy: true })
    .isLength({ max: 10 })
    .withMessage('Alt Phone Number must contain max 10 digits')
    .bail(),
]
