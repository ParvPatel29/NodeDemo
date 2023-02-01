import { NextFunction, Request, Response, Router } from 'express'
import { contentTeamController } from '../../controllers/admin'
import { adminValidator } from '../../validators'

// Validation Middleware(ErrorValidation)
import validationErrorMiddleware from '../../util/validationError'
import { fileUploadMiddleware } from '../../middleware/common'

const route = Router()

const { contentTeamValidator } = adminValidator

const {
  createContentTeamMember,
  getAllContentTeamMember,
  getContentTeamMemberById,
  updateContentTeamMember,
  updateContentTeamMemberStatus,
  deleteContentTeamMember,
} = contentTeamController

route.use('/', (req: Request, res: Response, next: NextFunction): void => {
  req.table_name = 'kt_contentTeam'
  return next()
})

// Get All Content Team Members
route.get('/', getAllContentTeamMember)

// Get Content Team Member By ID
route.get('/:ct_id', getContentTeamMemberById)

//Create Content Team Member
route.post(
  '/',
  fileUploadMiddleware.fileUpload.fields([
    { name: 'ct_profilePic', maxCount: 1 },
    { name: 'ct_degreeCertificate', maxCount: 1 },
  ]),
  contentTeamValidator.createContentTeamMember,
  validationErrorMiddleware,
  createContentTeamMember,
)

// Update Content Team Member
route.put(
  '/:ct_id',
  fileUploadMiddleware.fileUpload.fields([
    { name: 'ct_profilePic', maxCount: 1 },
    { name: 'ct_degreeCertificate', maxCount: 1 },
  ]),
  contentTeamValidator.updateContentTeamMember,
  validationErrorMiddleware,
  updateContentTeamMember,
)

// Update Content Team Member Status
route.put('/:ct_id/:ct_status', updateContentTeamMemberStatus)

// Delete Content Team Member
route.delete('/:ct_id', deleteContentTeamMember)

export default route
