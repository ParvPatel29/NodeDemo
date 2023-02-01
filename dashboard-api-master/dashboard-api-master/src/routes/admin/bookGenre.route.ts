import { Router } from 'express'
import { bookGenreController } from '../../controllers/admin'
import { adminValidator } from '../../validators'

// Validation Middleware(ErrorValidation)
import validationErrorMiddleware from '../../util/validationError'

const route = Router()

const { bookGenreValidator } = adminValidator

const {
  createGenre,
  updateGenre,
  updateGenreStatus,
  getAllGenres,
  getGenreById,
  deleteGenre,
} = bookGenreController

// Get All Genres
route.get('/', getAllGenres)

// Get Genre Details
route.get('/:bg_id', getGenreById)

//Create Genre
route.post(
  '/',

  bookGenreValidator.createBookGenre,
  validationErrorMiddleware,
  createGenre,
)

// Update Genre
route.put(
  '/:bg_id',
  bookGenreValidator.updateBookGenre,
  validationErrorMiddleware,
  updateGenre,
)

// Update Genre Status
route.put('/:bg_id/:bg_status', updateGenreStatus)

// Delete Genre
route.delete('/:bg_id', deleteGenre)

export default route
