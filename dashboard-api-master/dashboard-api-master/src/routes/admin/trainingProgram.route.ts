import { NextFunction, Request, Response, Router } from 'express'
import { trainingProgramController } from '../../controllers/admin'
import { adminValidator } from '../../validators'

// Validation Middleware(ErrorValidation)
import validationErrorMiddleware from '../../util/validationError'
import { fileUploadMiddleware } from '../../middleware/common'

const route = Router()

const { trainingProgramValidator } = adminValidator

const {
  createTrainingProgram,
  getAllTrainingPrograms,
  getTrainingProgramById,
  updateTrainingProgram,
  deleteTrainingProgram,
} = trainingProgramController

route.use('/', (req: Request, res: Response, next: NextFunction): void => {
  req.table_name = 'kt_trainingProgram'
  return next()
})

// Get All Training Programs
route.get('/', getAllTrainingPrograms)

// Get Training Program By ID
route.get('/:tp_id', getTrainingProgramById)

//Create Training Program
route.post(
  '/',
  fileUploadMiddleware.fileUpload.fields([
    { name: 'tp_certificateTemplate', maxCount: 1 },
    { name: 'tp_programImage', maxCount: 1 },
  ]),
  trainingProgramValidator.createTrainingProgram,
  validationErrorMiddleware,
  createTrainingProgram,
)

// Update Training Program
route.put(
  '/:tp_id',

  fileUploadMiddleware.fileUpload.fields([
    { name: 'tp_certificateTemplate', maxCount: 1 },
    { name: 'tp_programImage', maxCount: 1 },
  ]),
  trainingProgramValidator.updateTrainingProgram,
  validationErrorMiddleware,
  updateTrainingProgram,
)

// Delete Training Program
route.delete('/:tp_id', deleteTrainingProgram)

export default route
