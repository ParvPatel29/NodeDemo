import { body } from 'express-validator'
import { language } from '../../util/constants'

export const createBook = [
  body('bk_genre')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please select genre')
    .bail(),
  body('bk_language')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please select language')
    .bail()
    .isIn(language)
    .withMessage('Please Select Valid language')
    .bail(),
  body('bk_title')
    .trim()
    .notEmpty()
    .withMessage('Please enter book title')
    .bail()
    .isLength({ min: 5 })
    .withMessage('Book title must contain atleast 5 characters')
    .bail(),
  body('bk_author')
    .optional({ checkFalsy: true })
    .trim()
    .isString()
    .withMessage('Author property only accepts string value')
    .bail(),
  body('bk_description')
    .trim()
    .notEmpty()
    .withMessage('Please enter description')
    .bail(),
  body('bk_noOfPages')
    .optional({ checkFalsy: true })
    .trim()
    .isNumeric()
    .withMessage('noOfPages property only accepts Numeric value')
    .bail(),
  body('bk_publishedDate')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please select publishedDate')
    .bail()
    .isDate()
    .withMessage('Please select Valid Date Format')
    .bail(),
  body('bk_isFree')
    .default(true)
    .isBoolean()
    .withMessage('isFree property only accepts boolean value')
    .bail(),
  body('bk_isPhysicalAvailable')
    .default(true)
    .isBoolean()
    .withMessage('isPhysicalAvailable property only accepts boolean value')
    .bail(),
  body('bk_publisher')
    .optional({ checkFalsy: true })
    .isString()
    .withMessage('Publisher property only accepts string value')
    .bail(),
  body('bk_edition')
    .optional({ checkFalsy: true })
    .trim()
    .isString()
    .withMessage('Edition property only accepts string value')
    .bail(),
  body('bk_price')
    .optional({ checkFalsy: true })
    .trim()
    .isNumeric()
    .withMessage('Price Property only accepts numeric value')
    .bail()
    .custom((value) => {
      try {
        const nagativeValue = value <= 0

        if (nagativeValue) {
          throw new Error('Please enter valid price ')
        }

        return Promise.resolve()
      } catch (error: any) {
        return Promise.reject(error.message)
      }
    }),
  body('bk_audio')
    .optional({ checkFalsy: true })
    .custom((value, { req }) => {
      return !!req.files?.['bk_audio']?.[0]?.filename || !!value
    })
    .withMessage('Please select audio')
    .bail(),
  body('bk_epub')
    .optional({ checkFalsy: true })
    .custom((value, { req }) => {
      return !!req.files?.['bk_epub']?.[0]?.filename || !!value
    })
    .withMessage('Please select EpubFile')
    .bail(),
  body('bk_preview')
    .custom((value, { req }) => {
      return !!req.files?.['bk_preview']?.[0]?.filename || !!value
    })
    .withMessage('Please select PreviewImage')
    .bail(),
  body('bk_pdf')
    .optional({ checkFalsy: true })
    .custom((value, { req }) => {
      return !!req.files?.['bk_pdf']?.[0]?.filename || !!value
    })
    .withMessage('Please select pdf')
    .bail(),
  body('bk_video')
    .optional({ checkFalsy: true })
    .trim()
    .isString()
    .withMessage('Please enter valid video file name')
    .bail(),
  body('bk_previewVideo')
    .optional({ checkFalsy: true })
    .custom((value, { req }) => {
      return !!req.files?.['bk_previewVideo']?.[0]?.filename || !!value
    })
    .withMessage('Please select video')
    .bail(),
]

export const updateBook = [
  body('bk_genre')
    .optional()
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please select genre')
    .bail(),
  body('bk_language')
    .optional()
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please enter language')
    .isIn(language)
    .withMessage('Please select valid language')
    .bail(),
  body('bk_title')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Please enter book title')
    .bail()
    .isLength({ min: 5 })
    .withMessage('Book title must contain atleast 5 characters')
    .bail(),
  body('bk_author')
    .optional({ checkFalsy: true })
    .trim()
    .isString()
    .withMessage('Author property only accepts string value')
    .bail(),
  body('bk_description')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Please enter description')
    .bail(),
  body('bk_noOfPages')
    .optional({ checkFalsy: true })
    .trim()
    .isNumeric()
    .withMessage('noOfPages property only accepts Numeric value')
    .bail(),
  body('bk_publishedDate')
    .optional()
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please select publishedDate')
    .bail()
    .isDate()
    .withMessage('Please select valid published date format')
    .bail(),
  body('bk_isFree')
    .optional()
    .default(true)
    .isBoolean()
    .withMessage('isFree property only accepts boolean value')
    .bail(),
  body('bk_isPhysicalAvailable')
    .optional()
    .default(true)
    .isBoolean()
    .withMessage('isPhysicalAvailable property only accepts boolean value')
    .bail(),
  body('bk_price')
    .optional({ checkFalsy: true })
    .trim()
    .isNumeric()
    .withMessage('Price Property only accepts numeric value')
    .bail()
    .custom((value) => {
      try {
        const nagativeValue = value <= 0

        if (nagativeValue) {
          throw new Error('Please enter valid price ')
        }

        return Promise.resolve()
      } catch (error: any) {
        return Promise.reject(error.message)
      }
    }),
  body('bk_publisher')
    .optional({ checkFalsy: true })
    .isString()
    .withMessage('Publisher property only accepts string value')
    .bail(),
  body('bk_edition')
    .optional({ checkFalsy: true })
    .trim()
    .isString()
    .withMessage('Edition property only accepts string value')
    .bail(),
  body('bk_audio')
    .optional({ checkFalsy: true })
    .custom((value, { req }) => {
      return !!req.files?.['bk_audio']?.[0]?.filename || !!value
    })
    .withMessage('Please select audio')
    .bail(),
  body('bk_pdf')
    .optional({ checkFalsy: true })
    .custom((value, { req }) => {
      return !!req.files?.['bk_pdf']?.[0]?.filename || !!value
    })
    .withMessage('Please select pdf')
    .bail(),
  body('bk_video')
    .optional({ checkFalsy: true })
    .trim()
    .isString()
    .withMessage('Please enter valid video file name')
    .bail(),
  body('bk_previewVideo')
    .optional({ checkFalsy: true })
    .custom((value, { req }) => {
      return !!req.files?.['bk_previewVideo']?.[0]?.filename || !!value
    })
    .withMessage('Please select preview video')
    .bail(),
  body('bk_epub')
    .optional({ checkFalsy: true })
    .custom((value, { req }) => {
      return !!req.files?.['bk_epub']?.[0]?.filename || !!value
    })
    .withMessage('Please select EpubFile')
    .bail(),
  body('bk_preview')
    .optional()
    .custom((value, { req }) => {
      return !!req.files?.['bk_preview']?.[0]?.filename || !!value
    })
    .withMessage('Please select PreviewImage')
    .bail(),
]
