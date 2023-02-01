import { Router } from 'express'
import { contentCategoryController } from '../../controllers/admin'
import { adminValidator } from '../../validators'

// Validation Middleware(ErrorValidation)
import validationErrorMiddleware from '../../util/validationError'

const route = Router()

const { contentCategoryValidator } = adminValidator
const {
  createContentCategories,
  getAllMainCategories,
  deleteCategories,
  getAllCategories,
  getAllSubCategories,
  getAllTopics,
} = contentCategoryController

//Create category
route.post(
  '/',
  contentCategoryValidator.createContentCategory,
  validationErrorMiddleware,
  createContentCategories,
)

// Get All mainCategory
route.get('/mainCategories', getAllMainCategories)

// Get All category
route.get('/categories', getAllCategories)

// Get All subCategory
route.get('/subCategories', getAllSubCategories)

// Get All topic
route.get('/topics', getAllTopics)

// Delete category
route.delete('/:cc_id', deleteCategories)

export default route
