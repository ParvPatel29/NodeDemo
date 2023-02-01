import { body } from 'express-validator'
import { gesMemberService } from '../../db/services'
import { authorityType } from '../../util/constants'

export const createAuthorityMember = [
  body('gm_fullName')
    .trim()
    .notEmpty()
    .withMessage('Please enter name')
    .bail()
    .isLength({ min: 5 })
    .withMessage('Name must contain atleast 5 characters')
    .bail(),
  body('gm_designation')
    .trim()
    .not()
    .notEmpty()
    .withMessage('Please enter designation')
    .bail(),
  body('gm_email')
    .trim()
    .notEmpty()
    .withMessage('Please enter email')
    .bail()
    .isEmail()
    .withMessage('Please enter valid email')
    .bail()
    .custom(async (value: string) => {
      try {
        let emailExist = await gesMemberService.getGESMember({
          where: {
            gm_email: value,
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
  body('gm_phoneNumber')
    .trim()
    .notEmpty()
    .withMessage('Please enter phone number')
    .bail()
    .isMobilePhone('any')
    .withMessage('Please enter valid phone number')
    .bail()
    .isLength({ max: 10 })
    .withMessage('Phone number must contain max 10 digits')
    .bail()
    .custom(async (value: string) => {
      try {
        let phoneNumberExist = await gesMemberService.getGESMember({
          where: {
            gm_phoneNumber: value,
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
  body('gm_altPhoneNumber')
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
        let altPhoneNumberExist = await gesMemberService.getGESMember({
          where: {
            gm_altPhoneNumber: value,
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

export const updateAuthorityMember = [
  body('gm_fullName')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Please enter name')
    .bail()
    .isLength({ min: 5 })
    .withMessage('Name must contain atleast 5 characters')
    .bail(),
  body('gm_designation')
    .optional()
    .trim()
    .not()
    .notEmpty()
    .withMessage('Please enter designation')
    .bail(),
  body('gm_phoneNumber')
    .optional()
    .trim()
    .isMobilePhone('any')
    .withMessage('Please enter valid phone number')
    .bail()
    .isLength({ max: 10 })
    .withMessage('Phone Number must contain max 10 digits')
    .bail(),
  body('gm_altPhoneNumber')
    .optional({ checkFalsy: true })
    .isMobilePhone('any')
    .withMessage('Please enter a valid Alt. Phone Number')
    .isLength({ max: 10 })
    .withMessage('Alt Phone Number must contain max 10 digits')
    .bail(),
]
