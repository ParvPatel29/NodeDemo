import { Router } from 'express'
import {trainingParticipantsController } from '../../controllers/school'
import { getEnrolledTrainingProgram,getUserDetailsFromTrainingParticipants } from '../../controllers/school/trainingParticipants.controller'
// import { adminValidator } from '../../validators'

// Validation Middleware(ErrorValidation)
import validationErrorMiddleware from '../../util/validationError'

const route = Router()

// const { bookBookReviewValidator } = adminValidator

const {
  createTrainingParticipants,
  updateTrainingParticipants,
  getAllTrainingParticipants,
  getTrainingParticipantsById,
  getTrainingParticipantsByTP,
  getUsersByTrainingProgramId
} = trainingParticipantsController

// Get All BookReviews
route.get('/', getAllTrainingParticipants)

// Get BookReview Details
route.get('/:tps_id', getTrainingParticipantsById)

//Create BookReview
route.post(
  '/',
  // bookBookReviewValidator.createBookBookReview,
  // validationErrorMiddleware,
  createTrainingParticipants,
)
// Get UserDetail By Participants
route.post('/userDetails', getUserDetailsFromTrainingParticipants)
// Get Enrolled TrainingProgram
route.post(
  '/getEnrolledTrainingProgram',
  // bookBookReviewValidator.createBookBookReview,
  // validationErrorMiddleware,
  getEnrolledTrainingProgram,
)
// Get TP By Participants
route.get('/getTP/get', getTrainingParticipantsByTP)

// Get Users By Training Program Id
route.get('/getParticipants/:id', getUsersByTrainingProgramId)
// Update BookReview
route.put(
  '/:tps_id',
  // bookBookReviewValidator.updateBookBookReview,
  validationErrorMiddleware,
  updateTrainingParticipants,
)

export default route
