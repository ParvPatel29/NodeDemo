import { Request, Response } from 'express'
import { adminTeamService } from '../../db/services'
import {
  internalServerErrorResponse,
  successResponse,
} from '../../util/apiResponse'
import { encryptPassword } from '../../util/encryptPassword'

// Get list of all team
export const getAllAdminTeamMember = async (req: Request, res: Response) => {
  try {
    const teamMembers = await adminTeamService.getAllAdminTeamMember({
      order: [['at_id', 'ASC']],
      attributes: {
        exclude: ['at_password'],
      },
    })

    return successResponse(res, {
      message: 'Team Member List',
      data: {
        teamMembers,
      },
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Creating a New User
export const createAdminTeamMember = async (req: Request, res: Response) => {
  try {
    let body = req.body
    body.at_password = await encryptPassword(body.at_password)

    const member = await adminTeamService.createAdminTeamMember(body)

    return successResponse(res, {
      message: 'Team Member added Successfully',
      data: {
        member,
      },
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Updating a team-member
export const updateAdminTeamMember = async (req: Request, res: Response) => {
  try {
    let {
      body,
      params: { at_id },
    } = req

    if (body?.at_password) {
      body.at_password = encryptPassword(body.at_password)
    }

    const member = await adminTeamService.updateAdminTeamMember(
      {
        where: {
          at_id,
        },
      },
      body,
    )

    return successResponse(res, {
      message: 'Team Member Updated Successfully',
      data: {
        member,
      },
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Delete a team-member
export const deleteAdminTeamMember = async (req: Request, res: Response) => {
  try {
    let { at_id } = req.params

    await adminTeamService.deleteAdminTeamMember({
      where: {
        at_id,
      },
    })

    return successResponse(res, {
      message: 'Team Member Deleted Successfully',
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}
