import { Request, Response } from 'express'
import path from 'path'
import { contentTeamService } from '../../db/services'
import {
  internalServerErrorResponse,
  successResponse,
} from '../../util/apiResponse'
import { setEmptyFieldsToNull } from '../../util/common'
import { encryptPassword } from '../../util/encryptPassword'
import { generatePassword } from '../../util/generatePassword'

// Get list of all conten team member
export const getAllContentTeamMember = async (req: Request, res: Response) => {
  try {
    const contentTeamMembers = await contentTeamService.getAllContentTeamMember(
      {
        attributes: {
          exclude: ['ct_password'],
        },
        order: [['ct_id', 'ASC']],
      },
    )

    return successResponse(res, {
      message: 'Content Team Member List',
      data: {
        contentTeamMembers,
      },
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Get conten team member by id
export const getContentTeamMemberById = async (req: Request, res: Response) => {
  try {
    let { ct_id } = req.params
    const contentTeamMember = await contentTeamService.getContentTeamMember({
      where: {
        ct_id,
      },
      attributes: {
        exclude: ['ct_password'],
      },
    })

    return successResponse(res, {
      message: 'Content Team Member Details',
      data: {
        contentTeamMember,
      },
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Create a new conten team member
export const createContentTeamMember = async (req: Request, res: Response) => {
  try {
    let body = req.body
    let files = req.files as {
      [fieldname: string]: Express.Multer.File[]
    }

    // upload file
    body['ct_profilePic'] = path.join(
      (req.table_name || 'common') as string,
      'ct_profilePic',
      files?.['ct_profilePic']?.[0]?.filename,
    )
    body['ct_degreeCertificate'] = path.join(
      (req.table_name || 'common') as string,
      'ct_degreeCertificate',
      files?.['ct_degreeCertificate']?.[0]?.filename,
    )

    // create encryptPassword
    body.ct_password = await encryptPassword(generatePassword())

    // change empty fields to null-value
    setEmptyFieldsToNull(body)
    console.log(body)
    const contentTeamMember = await contentTeamService.createContentTeamMember(
      body,
    )

    return successResponse(res, {
      message: 'Content Team Member added Successfully',
      data: {
        contentTeamMember,
      },
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Update a conten team member
export const updateContentTeamMember = async (req: Request, res: Response) => {
  try {
    let ct_id = req.params.ct_id as unknown as number
    let body = req.body
    let files = req.files as {
      [fieldname: string]: Express.Multer.File[]
    }

    //update  file
    body['ct_profilePic'] = files?.['ct_profilePic']?.[0]?.filename
      ? path.join(
          (req.table_name || 'common') as string,
          'ct_profilePic',
          files?.['ct_profilePic']?.[0]?.filename,
        )
      : body['ct_profilePic_old']
    body['ct_degreeCertificate'] = files?.['ct_degreeCertificate']?.[0]
      ?.filename
      ? path.join(
          (req.table_name || 'common') as string,
          'ct_degreeCertificate',
          files?.['ct_degreeCertificate']?.[0]?.filename,
        )
      : body['ct_degreeCertificate_old']

    body.ct_password = await encryptPassword(generatePassword())

    // change empty fields to null-value
    setEmptyFieldsToNull(body)

    const contentTeamMember = await contentTeamService.updateContentTeamMember(
      {
        where: {
          ct_id,
        },
      },
      body,
    )

    return successResponse(res, {
      message: 'Content Team Member Updated Successfully',
      data: {
        contentTeamMember,
      },
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Update a conten team member status
export const updateContentTeamMemberStatus = async (
  req: Request,
  res: Response,
) => {
  try {
    let ct_id = req.params.ct_id as unknown as number
    let ct_status = req.params.ct_status as unknown as boolean

    const contentTeamMember = await contentTeamService.updateContentTeamMember(
      {
        where: {
          ct_id,
        },
      },
      {
        ct_status,
      },
    )

    return successResponse(res, {
      message: 'Content Team Member Status Updated Successfully',
      data: {
        contentTeamMember,
      },
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Delete a conten team member
export const deleteContentTeamMember = async (req: Request, res: Response) => {
  try {
    let { ct_id } = req.params

    await contentTeamService.deleteContentTeamMember({
      where: {
        ct_id,
      },
    })

    return successResponse(res, {
      message: 'Content Team Member Deleted Successfully',
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}
