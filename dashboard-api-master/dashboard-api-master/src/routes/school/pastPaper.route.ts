import { Router,Request, Response, NextFunction } from 'express'
import {assignmentController,pastPaperController } from '../../controllers/school'
import { verifyToken } from '../../middleware/common/token.middleware'
import { fileUploadMiddleware } from '../../middleware/common'
import validationErrorMiddleware from '../../util/validationError'
import { schoolValidator } from '../../validators'
import { getAllLiveSession } from '../../controllers/school/liveSession.controller'
import { generateRoomToken } from '../../controllers/school/enableX.controller'

const route = Router()
const {
  deletePastPaper,
  getAllPastPaper,
  createPastPaper,
  updatePastPaper,
  getPastPaper,
} = pastPaperController

const { pastPaperValidation } = schoolValidator

route.use('/', (req: Request, res: Response, next: NextFunction): void => {
  req.table_name = 'kt_pastPaper'
  return next()
})

// Past Paper List Without Teacher
route.get('/getAll',[verifyToken], getAllPastPaper)

// Get Live Session Details
route.get('/:pp_id', [verifyToken], getPastPaper)

//Create Live Session
route.post(
  '/',
  [verifyToken],
  fileUploadMiddleware.fileUpload.fields([{ name: 'ls_image', maxCount: 1 }]),
  pastPaperValidation.createPastPaper,
  validationErrorMiddleware,
  createPastPaper,
)

// Update Live Session
route.put(
  '/:pp_id',
  [verifyToken],
  fileUploadMiddleware.fileUpload.fields([{ name: 'ls_image', maxCount: 1 }]),
  pastPaperValidation.updatePastPaper,
  validationErrorMiddleware,
  updatePastPaper,
)

// Delete Live Session
route.delete('/:pp_id', [verifyToken], deletePastPaper)


export default route
