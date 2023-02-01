import { Router,Request, Response, NextFunction } from 'express'
import { notificationController,liveSessionController } from '../../controllers/school'
import { verifyToken } from '../../middleware/common/token.middleware'
import { fileUploadMiddleware } from '../../middleware/common'
import validationErrorMiddleware from '../../util/validationError'
import { schoolValidator } from '../../validators'
import { getAllLiveSession } from '../../controllers/school/liveSession.controller'
import { generateRoomToken } from '../../controllers/school/enableX.controller'

const route = Router()
const {
  getAllLiveSessionByTeacher,
  deleteLiveSession,
  createLiveSession,
  updateLiveSession,
  getLiveSessionById,
} = liveSessionController

const { notificationValidation,liveSessionValidation } = schoolValidator

route.use('/', (req: Request, res: Response, next: NextFunction): void => {
  req.table_name = 'kt_liveSession'
  return next()
})

// Live Session List
route.get('/get', getAllLiveSessionByTeacher)

// Live Session List Without teacher
route.get('/getAll', getAllLiveSession)

// Get Live Session Details
route.get('/:ls_id', [verifyToken], getLiveSessionById)

//Create Live Session
route.post(
  '/',
  [verifyToken],
  fileUploadMiddleware.fileUpload.fields([{ name: 'ls_image', maxCount: 1 }]),
  liveSessionValidation.createLiveSession,
  validationErrorMiddleware,
  createLiveSession,
)

// Update Live Session
route.put(
  '/:ls_id',
  [verifyToken],
  fileUploadMiddleware.fileUpload.fields([{ name: 'ls_image', maxCount: 1 }]),
  liveSessionValidation.updateLiveSesion,
  validationErrorMiddleware,
  updateLiveSession,
)

// Delete Live Session
route.delete('/:ls_id', [verifyToken], deleteLiveSession)

// Generate Token From Room Id
route.post('/generate/token/:roomId', [verifyToken], generateRoomToken)

export default route
