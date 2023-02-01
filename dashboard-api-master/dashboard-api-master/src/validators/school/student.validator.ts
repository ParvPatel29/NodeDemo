import { body } from 'express-validator'
import { studentService } from '../../db/services'
import { bloodGroups, countryCode } from '../../util/constants'

export const createStudent = [
  body('st_fullName')
    .trim()
    .notEmpty()
    .withMessage('Please enter fullName name')
    .bail()
    .isLength({ min: 5 })
    .withMessage('FullName must contain atleast 5 characters')
    .bail(),
  body('st_phoneNumber')
    .optional({ checkFalsy: true })
    .trim()
    .isMobilePhone('any')
    .withMessage('Please enter valid phone number')
    .bail()
    .isLength({ max: 10 })
    .withMessage('Phone Number must contain max 10 digits')
    .bail()
    .custom(async (value: string) => {
      try {
        let phoneNumberExist = await studentService.getStudent({
          where: {
            st_phoneNumber: value,
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
  body('st_altPhoneNumber')
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
        let altPhoneNumberExist = await studentService.getStudent({
          where: {
            st_altPhoneNumber: value,
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
  body('st_email')
    .optional({ checkFalsy: true })
    .trim()
    .isEmail()
    .withMessage('Please enter valid email')
    .bail()
    .custom(async (value: string) => {
      try {
        let emailExist = await studentService.getStudent({
          where: {
            st_email: value,
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
  body('st_altEmail')
    .optional({ checkFalsy: true })
    .trim()
    .isEmail()
    .withMessage('Please enter valid Alt. email')
    .bail()
    .custom(async (value: string) => {
      try {
        let emailExist = await studentService.getStudent({
          where: {
            st_altEmail: value,
          },
        })

        if (emailExist) {
          throw new Error(
            'Alt. Email already exists, please enter a different email',
          )
        }

        return Promise.resolve()
      } catch (error: any) {
        return Promise.reject(error.message)
      }
    })
    .bail(),
  body('st_parentEmail')
    .optional({ checkFalsy: true })
    .trim()
    .isEmail()
    .withMessage('Please enter valid Parent email')
    .bail()
    .custom(async (value: string) => {
      try {
        let emailExist = await studentService.getStudent({
          where: {
            st_parentEmail: value,
          },
        })

        if (emailExist) {
          throw new Error(
            'Parent Email already exists, please enter a different email',
          )
        }

        return Promise.resolve()
      } catch (error: any) {
        return Promise.reject(error.message)
      }
    })
    .bail(),
  body('st_region')
    .trim()
    .notEmpty()
    .withMessage('Please select region')
    .bail(),
  body('st_bloodGroup')
    .optional({ checkFalsy: true })
    .isIn(bloodGroups)
    .withMessage('Please Select Valid bloodGroup')
    .bail(),
  body('st_dateOfBirth')
    .optional({ checkFalsy: true })
    .trim()
    .isDate()
    .withMessage('Please select Valid Date Format')
    .bail(),
  body('st_address')
    .optional({ checkFalsy: true })
    .trim()
    .isString()
    .withMessage('Address property only accepts text value')
    .bail(),
  body('st_password')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please enter the password')
    .bail()
    .isLength({ min: 6 })
    .withMessage('Password must contain atleast 6 characters'),
  body('st_studentId')
    .trim()
    .notEmpty()
    .withMessage('Please enter studentId')
    .bail(),
  body('st_areaOfStudy')
    .optional({ checkFalsy: true })
    .trim()
    .isString()
    .withMessage('AreaOfStudy property only accepts string value')
    .bail(),
  body('st_curricularActivities')
    .optional({ checkFalsy: true })
    .trim()
    .isString()
    .withMessage('CurricularActivities property only accepts string value')
    .bail(),
  body('st_countryCode')
    .optional({ checkFalsy: true })
    .if((value: number) => value !== null)
    .isInt()
    .withMessage('countryCode only accept numeric value')
    .bail()
    .isIn(countryCode)
    .withMessage('Please Select Valid Country-Code')
    .bail(),
  body('st_profilePic')
    .optional({ checkFalsy: true })
    .custom((value, { req }) => {
      return !!req.files?.['st_profilePic']?.[0]?.filename || !!value
    })
    .withMessage('Please select profile pic')
    .bail(),
]

export const updateStudent = [
  body('st_fullName')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Please enter fullName name')
    .bail()
    .isLength({ min: 5 })
    .withMessage('FullName must contain atleast 5 characters')
    .bail(),
  body('st_phoneNumber')
    .optional({ checkFalsy: true })
    .trim()
    .isMobilePhone('any')
    .withMessage('Please enter valid phone number')
    .bail()
    .isLength({ max: 10 })
    .withMessage('Phone Number must contain max 10 digits')
    .bail(),
  body('st_altPhoneNumber')
    .optional({ checkFalsy: true })
    .isLength({ max: 10 })
    .withMessage('Alt Phone Number must contain max 10 digits')
    .bail(),
  body('st_email')
    .optional({ checkFalsy: true })
    .trim()
    .isEmail()
    .withMessage('Please enter valid email')
    .bail(),
  body('st_altEmail')
    .optional({ checkFalsy: true })
    .trim()
    .isString()
    .withMessage('Please enter valid email address')
    .bail(),
  body('st_parentEmail')
    .optional({ checkFalsy: true })
    .trim()
    .isString()
    .withMessage('Please enter valid email address')
    .bail(),
  body('st_region')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Please select region')
    .bail(),
  body('st_bloodGroup')
    .optional({ checkFalsy: true })
    .isIn(bloodGroups)
    .withMessage('Please Select Valid bloodGroup')
    .bail(),
  body('st_dateOfBirth')
    .optional({ checkFalsy: true })
    .trim()
    .isDate()
    .withMessage('Please select Valid Date Format')
    .bail(),
  body('st_address')
    .optional({ checkFalsy: true })
    .trim()
    .isString()
    .withMessage('Address property only accepts text value')
    .bail(),
  body('st_password')
    .optional()
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please enter the password')
    .bail()
    .isLength({ min: 6 })
    .withMessage('Password must contain atleast 6 characters'),
  body('st_studentId')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Please enter studentId')
    .bail(),
  body('st_areaOfStudy')
    .optional({ checkFalsy: true })
    .trim()
    .isString()
    .withMessage('AreaOfStudy property only accepts string value')
    .bail(),
  body('st_curricularActivities')
    .optional({ checkFalsy: true })
    .trim()
    .isString()
    .withMessage('CurricularActivities property only accepts string value')
    .bail(),
  body('st_countryCode')
    .optional({ checkFalsy: true })
    .if((value: number) => value !== null)
    .isInt()
    .withMessage('countryCode only accept numeric value')
    .bail()
    .isIn(countryCode)
    .withMessage('Please Select Valid Country-Code')
    .bail(),
  body('st_profilePic')
    .optional({ checkFalsy: true })
    .custom((value, { req }) => {
      return !!req.files?.['st_profilePic']?.[0]?.filename || !!value
    })
    .withMessage('Please select profile pic')
    .bail(),
]
