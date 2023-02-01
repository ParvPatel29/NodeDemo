import { body } from 'express-validator'
import { tutorService } from '../../db/services'

export const createTutorManagement = [
  body('tu_fullName')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please enter Full Name')
    .bail()
    .isLength({ min: 5 })
    .withMessage('FullName name must contain atleast 5 characters')
    .bail(),
  body('tu_email')
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
        let emailExist = await tutorService.getTutor({
          where: {
            tu_email: value,
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
  body('tu_phoneNumber')
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
        let phoneNumberExist = await tutorService.getTutor({
          where: {
            tu_phoneNumber: value,
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
]

export const updateTutorManagement = [
  body('tu_fullName')
    .optional()
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please enter Full Name')
    .bail()
    .isLength({ min: 5 })
    .withMessage('FullName name must contain atleast 5 characters')
    .bail(),
  body('tu_email')
    .optional()
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please enter your correct email')
    .bail()
    .isEmail()
    .withMessage('Invalid email format')
    .bail(),
  body('tu_phoneNumber')
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
]
