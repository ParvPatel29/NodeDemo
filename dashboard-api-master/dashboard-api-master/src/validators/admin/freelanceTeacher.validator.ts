import { body } from 'express-validator'
import { freelanceTeacherService } from '../../db/services'
// User Validator
export const createFreelanceTeacher = [
  body('ft_fullName')
    .trim()
    .notEmpty()
    .withMessage('Please enter name')
    .bail()
    .isLength({ min: 5 })
    .withMessage('Name must contain atleast 5 characters')
    .bail(),
  body('ft_email')
    .trim()
    .notEmpty()
    .withMessage('Please enter email')
    .bail()
    .isEmail()
    .withMessage('Please enter valid email')
    .bail()
    .custom(async (value: string) => {
      try {
        let emailExist = await freelanceTeacherService.getFreelanceTeacher({
          where: {
            ft_email: value,
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
  body('ft_education')
    .trim()
    .notEmpty()
    .withMessage('Please enter education')
    .bail(),
  body('ft_region')
    .trim()
    .notEmpty()
    .withMessage('Please select region')
    .bail(),

  body('ft_phoneNumber')
    .trim()
    .notEmpty()
    .withMessage('Please enter phone number')
    .bail()
    .isMobilePhone('any')
    .withMessage('Please enter valid phone number')
    .bail()
    .isLength({ max: 10 })
    .withMessage('Phone Number must contain max 10 digits')
    .bail()
    .custom(async (value: string) => {
      try {
        let phoneNumberExist =
          await freelanceTeacherService.getFreelanceTeacher({
            where: {
              ft_phoneNumber: value,
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
  body('ft_altPhoneNumber')
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
        let altPhoneNumberExist =
          await freelanceTeacherService.getFreelanceTeacher({
            where: {
              ft_altPhoneNumber: value,
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
  body('ft_address')
    .trim()
    .notEmpty()
    .withMessage('Please enter address')
    .bail()
    .isString()
    .withMessage('Address property only accepts text value')
    .bail(),
  body('ft_profilePic')
    .optional({ checkFalsy: true })
    .custom((value, { req }) => {
      return !!req.files?.['ft_profilePic']?.[0]?.filename || !!value
    })
    .withMessage('Please select profile pic')
    .bail(),
  body('ft_degreeCertificate')
    .optional({ checkFalsy: true })
    .custom((value, { req }) => {
      return !!req.files?.['ft_degreeCertificate']?.[0]?.filename || !!value
    })
    .withMessage('Please select degree certificate')
    .bail(),
]

export const updateFreelanceTeacher = [
  body('ft_fullName')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Please enter name')
    .bail()
    .isLength({ min: 5 })
    .withMessage('Name must contain atleast 5 characters')
    .bail(),
  body('ft_email')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Please enter email')
    .bail()
    .isEmail()
    .withMessage('Please enter valid email')
    .bail(),
  body('ft_education')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Please enter education')
    .bail(),
  body('ft_region')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Please select region')
    .bail(),
  body('ft_phoneNumber')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Please enter phone number')
    .bail()
    .isMobilePhone('any')
    .withMessage('Please enter valid phone number')
    .bail()
    .isLength({ max: 10 })
    .withMessage('Phone Number must contain max 10 digits')
    .bail(),
  body('ft_altPhoneNumber')
    .optional({ checkFalsy: true })
    .isLength({ max: 10 })
    .withMessage('Alt Phone Number must contain max 10 digits')
    .bail(),
  body('ft_address')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Please enter address')
    .bail()
    .isString()
    .withMessage('Address property only accepts text value')
    .bail(),
  body('ft_profilePic')
    .optional({ checkFalsy: true })
    .custom((value, { req }) => {
      return !!req.files?.['ft_profilePic']?.[0]?.filename || !!value
    })
    .withMessage('Please select profile pic')
    .bail(),
  body('ft_degreeCertificate')
    .optional({ checkFalsy: true })
    .custom((value, { req }) => {
      return !!req.files?.['ft_degreeCertificate']?.[0]?.filename || !!value
    })
    .withMessage('Please select degree certificate')
    .bail(),
]
