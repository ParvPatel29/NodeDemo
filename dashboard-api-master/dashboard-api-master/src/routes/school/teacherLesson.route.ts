import { Router } from 'express'
import { teacherLessonController } from '../../controllers/school'
import { schoolValidator } from '../../validators'

// Validation Middleware(ErrorValidation)
import validationErrorMiddleware from '../../util/validationError'
const route = Router()

const { teacherLessonValidator } = schoolValidator

const {
  createTeacherLesson,
  getAllTeacherLessons,
  updateTeacherLesson,
  deleteTeacherLesson,
  getTeacherLesson,
} = teacherLessonController

// Get All Lesson
route.get('/', getAllTeacherLessons)

//Create Lesson
route.post(
  '/',
  teacherLessonValidator.createLessonValidator,
  validationErrorMiddleware,
  createTeacherLesson,
)

// Get One Lesson by Id
route.get('/:tl_id', getTeacherLesson)

// Update a Lesson
route.put(
  '/:tl_id',
  teacherLessonValidator.updateLessonValidator,
  validationErrorMiddleware,
  updateTeacherLesson,
)

// Delete a Lesson
route.delete('/:tl_id', deleteTeacherLesson)

export default route
