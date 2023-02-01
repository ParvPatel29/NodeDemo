import { NextFunction, Request, Response, Router } from 'express'
import {weeklyLessonPlanController } from '../../controllers/school'
import { schoolValidator } from '../../validators'

// Validation Middleware(ErrorValidation)
import validationErrorMiddleware from '../../util/validationError'
import { fileUploadMiddleware } from '../../middleware/common'
import { loginTeacher, logoutTeacher } from '../../controllers/school/teacher.controller'
import { verifyToken } from '../../middleware/common/token.middleware'
const route = Router()

const { weeklyLessonPlanValidation } = schoolValidator

const {
  createWeeklyLessonPlan,
  getAllWeeklyLessonPlan,
  updateWeeklyLessonPlan,
  deleteWeeklyLessonPlan,
  getWeeklyLessonPlanById,
} = weeklyLessonPlanController

route.use('/', (req: Request, res: Response, next: NextFunction): void => {
  req.table_name = 'kt_weeklyLessonPlan'
  return next()
})
// Get All WeeklyLessonPlan
route.get('/', getAllWeeklyLessonPlan)

//Create WeeklyLessonPlan
route.post(
  '/',
  fileUploadMiddleware.fileUpload.fields([
    { name: 'wlp_teachingMaterial', maxCount: 1 },
  ]),
  weeklyLessonPlanValidation.createWeeklyLessonPlan,
  validationErrorMiddleware,
  createWeeklyLessonPlan,
)

// Get One WeeklyLessonPlan by Id
route.get('/:wlp_id', getWeeklyLessonPlanById)

// Update a WeeklyLessonPlan
route.put(
  '/:wlp_id',
  fileUploadMiddleware.fileUpload.fields([
    { name: 'wlp_teachingMaterial', maxCount: 1 },
  ]),
  weeklyLessonPlanValidation.updateWeeklyLessonPlan,
  validationErrorMiddleware,
  updateWeeklyLessonPlan,
)

// Delete a WeeklyLessonPlan
route.delete('/:wlp_id', deleteWeeklyLessonPlan)

export default route
