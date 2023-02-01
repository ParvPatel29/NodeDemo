import { Router, Request, Response, NextFunction } from 'express'
import { sendMessageController } from '../../controllers/school'
import { verifyToken } from '../../middleware/common/token.middleware'
import { fileUploadMiddleware } from '../../middleware/common'
import validationErrorMiddleware from '../../util/validationError'
import { schoolValidator } from '../../validators'

const route = Router()
const { createSendMessage, getAllSendMessage } = sendMessageController

const { sendMessageValidation } = schoolValidator

route.use('/', (req: Request, res: Response, next: NextFunction): void => {
  req.table_name = 'kt_sendMessage'
  return next()
})

// Message List
route.get('/getAll', getAllSendMessage)

//Create Send Message
route.post(
  '/',
  [verifyToken],
  fileUploadMiddleware.fileUpload.fields([{ name: 'ls_image', maxCount: 1 }]),
  sendMessageValidation.createSendMessage,
  validationErrorMiddleware,
  createSendMessage,
)

export default route
