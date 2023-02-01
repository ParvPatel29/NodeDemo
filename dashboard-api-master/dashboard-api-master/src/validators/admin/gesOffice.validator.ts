import { body } from 'express-validator'
import { gesOfficeService } from '../../db/services'
import { officeLevel } from '../../util/constants'

export const createGESOffice = [
  body('go_officeLevel')
    .optional({ checkFalsy: true })
    .trim()
    .isIn(officeLevel)
    .withMessage('Please Select Valid OfficeLevel-Type')
    .bail(),
  body('go_officeTitle')
    .optional({ checkFalsy: true })
    .trim()
    .isString()
    .withMessage('officeTitle property only accepts string')
    .bail(),
  body('go_region')
    .trim()
    .notEmpty()
    .withMessage('Please select region')
    .bail(),
  body('go_email')
    .trim()
    .notEmpty()
    .withMessage('Please enter email')
    .bail()
    .isEmail()
    .withMessage('Please enter valid email')
    .bail()
    .custom(async (value: string) => {
      try {
        let emailExist = await gesOfficeService.getGESOffice({
          where: {
            go_email: value,
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
  body('go_phoneNumber')
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
        let phoneNumberExist = await gesOfficeService.getGESOffice({
          where: {
            go_phoneNumber: value,
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
  body('go_altPhoneNumber')
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
        let altPhoneNumberExist = await gesOfficeService.getGESOffice({
          where: {
            go_altPhoneNumber: value,
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
  body('go_address')
    .optional({ checkFalsy: true })
    .trim()
    .isString()
    .withMessage('Address property only accepts text')
    .bail(),
  body('go_town')
    .optional({ checkFalsy: true })
    .trim()
    .isString()
    .withMessage('Town property only accepts string value')
    .bail(),
  body('go_latitude')
    .optional({ checkFalsy: true })
    .trim()
    .isNumeric()
    .withMessage('Latitude property only accepts numeric value')
    .bail(),
  body('go_longitude')
    .optional({ checkFalsy: true })
    .trim()
    .isNumeric()
    .withMessage('Longitude property only accepts numeric value')
    .bail(),
  body('go_directorName')
    .optional({ checkFalsy: true })
    .isString()
    .withMessage('directorName property only accept text value')
    .bail(),
  body('go_circuitHeadName')
    .optional({ checkFalsy: true })
    .isString()
    .withMessage('circuitHeadName property only accept text value')
    .bail(),
  body('go_description')
    .optional({ checkFalsy: true })
    .isString()
    .withMessage('description property only accept text value')
    .bail(),
  body('go_countryCode')
    .optional({ checkFalsy: true })
    .if((value: number) => value !== null)
    .isInt()
    .withMessage('Please select valid countryCode')
    .bail(),
]

export const updateGESOffice = [
  body('go_officeLevel')
    .optional({ checkFalsy: true })
    .trim()
    .isIn(officeLevel)
    .withMessage('Please Select Valid OfficeLevel-Type')
    .bail(),
  body('go_officeTitle')
    .optional({ checkFalsy: true })
    .trim()
    .isString()
    .withMessage('OfficeTitle property only accepts string value')
    .bail(),
  body('go_region')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Please select region')
    .bail(),
  body('go_email')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Please enter email')
    .bail()
    .isEmail()
    .withMessage('Please enter valid email')
    .bail(),
  body('go_phoneNumber')
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
  body('go_altPhoneNumber')
    .optional({ checkFalsy: true })
    .trim()
    .isMobilePhone('any')
    .withMessage('Please enter a valid Alt. Phone Number')
    .bail()
    .isLength({ max: 10 })
    .withMessage('Alt Phone Number must contain max 10 digits')
    .bail(),
  body('go_address')
    .optional({ checkFalsy: true })
    .trim()
    .isString()
    .withMessage('Address property only accepts string')
    .bail(),
  body('go_town')
    .optional({ checkFalsy: true })
    .trim()
    .isString()
    .withMessage('Town property only accepts string value')
    .bail(),
  body('go_latitude')
    .optional({ checkFalsy: true })
    .trim()
    .isNumeric()
    .withMessage('Latitude property only accepts numeric value')
    .bail(),
  body('go_longitude')
    .optional({ checkFalsy: true })
    .trim()
    .isNumeric()
    .withMessage('Longitude property only accepts numeric value')
    .bail(),
  body('go_directorName')
    .optional({ checkFalsy: true })
    .isString()
    .withMessage('directorName property only accept text value')
    .bail(),
  body('go_circuitHeadName')
    .optional({ checkFalsy: true })
    .isString()
    .withMessage('circuitHeadName property only accept text value')
    .bail(),
  body('go_description')
    .optional({ checkFalsy: true })
    .isString()
    .withMessage('description property only accept text value')
    .bail(),
  body('go_countryCode')
    .optional({ checkFalsy: true })
    .if((value: number) => value !== null)
    .isInt()
    .withMessage('Please select valid countryCode')
    .bail(),
]
