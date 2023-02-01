import { body } from 'express-validator'

export const createContent = [
  body('cm_contentTitle')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please enter Content Title')
    .bail(),
  body('cm_readingMaterial')
    .custom((value, { req }) => {
      return !!req.files?.['cm_readingMaterial']?.[0]?.filename || !!value
    })
    .withMessage('Please enter Material')
    .bail(),
  body('cm_video')
    .custom((value, { req }) => {
      return !!req.files?.['cm_video']?.[0]?.filename || !!value
    })
    .withMessage('Please enter video url')
    .bail(),
]

export const updateContent = [
  body('cm_contentTitle')
    .optional()
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please enter Content Title')
    .bail(),
  body('cm_readingMaterial')
    .optional()
    .custom((value, { req }) => {
      return !!req.files?.['cm_readingMaterial']?.[0]?.filename || !!value
    })
    .withMessage('Please enter Material')
    .bail(),
  body('cm_video')
    .optional()
    .custom((value, { req }) => {
      return !!req.files?.['cm_video']?.[0]?.filename || !!value
    })
    .withMessage('Please enter video url')
    .bail(),
]
