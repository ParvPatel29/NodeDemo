import { body } from 'express-validator'
import { teacherService } from '../../db/services'
import { countryCode } from '../../util/constants'

export const createWeeklyLessonPlan = [
  body('wlp_classId')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please enter Class Id')
    .bail(),
  body('wlp_subject')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please enter your subject')
    .bail(),
  body('wlp_weekNumber')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please enter your Week Number')
    .bail(),
  body('wlp_reference')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please enter your reference')
    .bail(),
  body('wlp_teachingMaterial')
    .optional({ checkFalsy: true })
    .custom((value, { req }) => {
      return !!req.files?.['wlp_teachingMaterial']?.[0]?.filename || !!value
    })
    .withMessage('Please select file')
    .bail(),
]

export const updateWeeklyLessonPlan = [
  body('wlp_classId')
    .optional()
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please enter Class Id')
    .bail(),
  body('wlp_subject')
    .optional()
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please enter your subject')
    .bail(),
  body('wlp_weekNumber')
    .optional()
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please enter your subject')
    .bail(),
  body('wlp_reference')
    .optional()
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please enter your reference')
    .bail(),
  body('wlp_teachingMaterial')
    .optional({ checkFalsy: true })
    .custom((value, { req }) => {
      return !!req.files?.['wlp_teachingMaterial']?.[0]?.filename || !!value
    })
    .withMessage('Please select file')
    .bail(),
]
