import { Router,Request, Response, NextFunction } from 'express'
import { notificationController } from '../../controllers/school'
import { verifyToken } from '../../middleware/common/token.middleware'
import { fileUploadMiddleware } from '../../middleware/common'
import validationErrorMiddleware from '../../util/validationError'
import { schoolValidator } from '../../validators'

const route = Router()
const {
  getAllNotification,
  deleteNotification,
  createNotificaiton,
  updateNotification,
  getNotificationById,
} = notificationController

const { notificationValidation } = schoolValidator

route.use('/', (req: Request, res: Response, next: NextFunction): void => {
  req.table_name = 'kt_notification'
  return next()
})

// Notification List
route.get('/get', getAllNotification)

// Get Notification Details
route.get('/:nt_id', [verifyToken], getNotificationById)

//Create Notification
route.post(
  '/',
  [verifyToken],
  fileUploadMiddleware.fileUpload.fields([{ name: 'nt_file', maxCount: 1 }]),
  notificationValidation.createNotificaiton,
  validationErrorMiddleware,
  createNotificaiton,
)

// Update Notification
route.put(
  '/:nt_id',
  [verifyToken],
  fileUploadMiddleware.fileUpload.fields([{ name: 'nt_file', maxCount: 1 }]),
  notificationValidation.updateNotificaiton,
  validationErrorMiddleware,
  updateNotification,
)

// Delete Notification
route.delete('/:nt_id', [verifyToken], deleteNotification)

export default route
