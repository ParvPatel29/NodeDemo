import { body } from 'express-validator'

export const updateGESMember = [
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
