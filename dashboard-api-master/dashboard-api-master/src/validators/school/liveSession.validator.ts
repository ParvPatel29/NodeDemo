import { body } from 'express-validator'
import { teacherService } from '../../db/services'
import { countryCode } from '../../util/constants'

export const createLiveSession = [
  body('ls_title')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please enter title')
    .bail(),
  body('ls_date')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please enter date')
    .bail(),
  body('ls_time')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please enter time')
    .bail(),
  body('ls_desc')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please enter your reference')
    .bail(),
  // body('wlp_teachingMaterial')
  //   .optional({ checkFalsy: true })
  //   .custom((value, { req }) => {
  //     return !!req.files?.['wlp_teachingMaterial']?.[0]?.filename || !!value
  //   })
  //   .withMessage('Please select file')
  //   .bail(),
]

export const updateLiveSesion = [
  body('ls_title')
    .optional()
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please enter title')
    .bail(),
  body('ls_date')
    .optional()
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please enter date')
    .bail(),
  body('ls_time')
    .trim()
    .optional()
    .not()
    .isEmpty()
    .withMessage('Please enter time')
    .bail(),
  body('ls_desc')
    .optional()
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please enter your reference')
    .bail(),
]
