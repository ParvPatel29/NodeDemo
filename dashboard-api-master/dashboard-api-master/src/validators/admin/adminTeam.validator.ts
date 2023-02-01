import { body } from 'express-validator'
import { adminTeamService } from '../../db/services'
import { teamMemberRole } from '../../util/constants'

export const createTeamMember = [
  body('at_role')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please select role')
    .bail()
    .isIn(teamMemberRole)
    .withMessage('Please Select Valid Role')
    .bail(),
  body('at_email')
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
        let emailExist = await adminTeamService.getAdminTeamMember({
          where: {
            at_email: value,
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
  body('at_fullName')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please enter your fullName')
    .bail()
    .isLength({ min: 5 })
    .withMessage('FullName must contain atleast 5 characters')
    .bail(),
  body('at_phoneNumber')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please enter PhoneNumber')
    .bail()
    .isMobilePhone('any')
    .withMessage('Please enter a valid Phone Number')
    .bail()
    .isLength({ max: 10 })
    .withMessage('Phone Number must contain max 10 digits')
    .bail()
    .custom(async (value: string) => {
      try {
        let phoneNumberExist = await adminTeamService.getAdminTeamMember({
          where: {
            at_phoneNumber: value,
          },
        })

        if (phoneNumberExist) {
          throw new Error('phone number already exists')
        }

        return Promise.resolve()
      } catch (error: any) {
        return Promise.reject(error.message)
      }
    })
    .bail(),
  body('at_altPhoneNumber')
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
        let phoneNumberExist = await adminTeamService.getAdminTeamMember({
          where: {
            at_altPhoneNumber: value,
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
  body('at_status')
    .default(true)
    .isBoolean()
    .withMessage('Status property only accepts boolean value')
    .bail(),
  body('at_password')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please enter the password')
    .bail()
    .isLength({ min: 6 })
    .withMessage('Password must contain atleast 6 characters'),
]

export const updateTeamMember = [
  body('at_role')
    .optional()
    .trim()
    .isString()
    .withMessage('role property only accepts string value')
    .bail()
    .isIn(teamMemberRole)
    .withMessage('Please Select Valid Role')
    .bail(),
  body('at_email')
    .optional()
    .trim()
    .isEmail()
    .withMessage('Invalid email format')
    .bail(),
  body('at_fullName')
    .optional()
    .trim()
    .isLength({ min: 5 })
    .withMessage('FullName must contain atleast 5 characters')
    .bail(),
  body('at_phoneNumber')
    .optional()
    .trim()
    .bail()
    .isMobilePhone('any')
    .withMessage('Please enter a valid Phone Number')
    .bail()
    .isLength({ max: 10 })
    .withMessage('Phone Number must contain max 10 digits')
    .bail(),
  body('at_altPhoneNumber')
    .optional({ checkFalsy: true })
    .isLength({ max: 10 })
    .withMessage('Alt Phone Number must contain max 10 digits')
    .bail(),
]
