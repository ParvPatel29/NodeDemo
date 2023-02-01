import { body } from 'express-validator'

export const createSendMessage = [
  body('sm_msg')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please enter Message')
    .bail(),
  body('sm_type')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please enter message type')
    .bail(),
]

export const updateSendMessage = [
  body('sm_msg')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please enter Message')
    .bail(),
  body('sm_type')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Please enter message type')
    .bail(),
]
