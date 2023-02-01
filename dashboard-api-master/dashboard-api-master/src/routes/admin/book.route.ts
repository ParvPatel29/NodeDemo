import { NextFunction, Request, Response, Router } from 'express'
import { bookController } from '../../controllers/admin'
import { adminValidator } from '../../validators'

// Validation Middleware(ErrorValidation)
import validationErrorMiddleware from '../../util/validationError'
import { fileUploadMiddleware } from '../../middleware/common'
import { verifyToken } from '../../middleware/common/token.middleware'

const route = Router()

const { bookValidator } = adminValidator

const {
  createBook,
  updateBook,
  updateBookStatus,
  getAllBooks,
  getBookById,
  deleteBook,
} = bookController

route.use('/', (req: Request, res: Response, next: NextFunction): void => {
  req.table_name = 'kt_book'
  return next()
})

// Get All Books
route.get('/', getAllBooks)

// Get Book Details
route.get('/:bk_id', [verifyToken], getBookById)

//Create Book
route.post(
  '/',
  [verifyToken],
  fileUploadMiddleware.fileUpload.fields([
    { name: 'bk_audio', maxCount: 1 },
    { name: 'bk_pdf', maxCount: 1 },
    { name: 'bk_previewVideo', maxCount: 1 },
    { name: 'bk_epub', maxCount: 1 },
    { name: 'bk_preview', maxCount: 1 },
  ]),
  bookValidator.createBook,
  validationErrorMiddleware,
  createBook,
)

// Update Book
route.put(
  '/:bk_id',
  [verifyToken],
  fileUploadMiddleware.fileUpload.fields([
    { name: 'bk_audio', maxCount: 1 },
    { name: 'bk_pdf', maxCount: 1 },
    { name: 'bk_previewVideo', maxCount: 1 },
    { name: 'bk_epub', maxCount: 1 },
    { name: 'bk_preview', maxCount: 1 },
  ]),
  bookValidator.updateBook,
  validationErrorMiddleware,
  updateBook,
)

// Update Book Status
route.put('/:bk_id/:bk_status', [verifyToken], updateBookStatus)

// Delete Book
route.delete('/:bk_id', [verifyToken], deleteBook)

export default route
