import { body } from 'express-validator'
import { contentTeamService } from '../../db/services'

export const createContentTeamMember = [
  body('ct_fullName')
    .trim()
    .notEmpty()
    .withMessage('Please enter name')
    .bail()
    .isLength({ min: 5 })
    .withMessage('Name must contain atleast 5 characters')
    .bail(),
  body('ct_email')
    .trim()
    .notEmpty()
    .withMessage('Please enter email')
    .bail()
    .isEmail()
    .withMessage('Please enter valid email')
    .bail()
    .custom(async (value: string) => {
      try {
        let emailExist = await contentTeamService.getContentTeamMember({
          where: {
            ct_email: value,
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
  body('ct_education')
    .trim()
    .notEmpty()
    .withMessage('Please enter education')
    .bail(),
  body('ct_profilePic')
    .custom((value, { req }) => {
      return !!req.files?.['ct_profilePic']?.[0]?.filename || !!value
    })
    .withMessage('Please select profile pic')
    .bail(),
  body('ct_degreeCertificate')
    .custom((value, { req }) => {
      return !!req.files?.['ct_degreeCertificate']?.[0]?.filename || !!value
    })
    .withMessage('Please select degree certificate')
    .bail(),
  body('ct_address')
    .trim()
    .notEmpty()
    .withMessage('Please enter address')
    .bail()
    .isString()
    .withMessage('Address property only accepts text value')
    .bail(),
  body('ct_phoneNumber')
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
        let phoneNumberExist = await contentTeamService.getContentTeamMember({
          where: {
            ct_phoneNumber: value,
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
  body('ct_altPhoneNumber')
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
        let altPhoneNumberExist = await contentTeamService.getContentTeamMember(
          {
            where: {
              ct_altPhoneNumber: value,
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

export const updateContentTeamMember = [
  body('ct_fullName')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Please enter name')
    .bail()
    .isLength({ min: 5 })
    .withMessage('Name must contain atleast 5 characters')
    .bail(),
  body('ct_email')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Please enter email')
    .bail()
    .isEmail()
    .withMessage('Please enter valid email')
    .bail(),
  body('ct_education')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Please enter education')
    .bail(),
  body('ct_profilePic')
    .optional()
    .custom((value, { req }) => {
      return !!req.files?.['ct_profilePic']?.[0]?.filename || !!value
    })
    .withMessage('Please select profile pic')
    .bail(),
  body('ct_degreeCertificate')
    .optional()
    .custom((value, { req }) => {
      return !!req.files?.['ct_degreeCertificate']?.[0]?.filename || !!value
    })
    .withMessage('Please select degree certificate')
    .bail(),
  body('ct_address')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Please enter address')
    .bail()
    .isString()
    .withMessage('Address property only accepts text value')
    .bail(),
  body('ct_phoneNumber')
    .optional()
    .trim()
    .not()
    .isEmpty()
    .isMobilePhone('any')
    .withMessage('Please enter a valid Phone Number')
    .bail()
    .isLength({ max: 10 })
    .withMessage('Phone Number must contain max 10 digits')
    .bail(),
  body('ct_altPhoneNumber')
    .optional({ checkFalsy: true })
    .isLength({ max: 10 })
    .withMessage('Alt Phone Number must contain max 10 digits')
    .bail(),
]
