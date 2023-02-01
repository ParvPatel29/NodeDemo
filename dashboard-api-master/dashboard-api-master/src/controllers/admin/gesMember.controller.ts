import { Request, Response } from 'express'
import { kt_GESOffice as GESOffice } from '../../db/model/kt_GESOffice'
import { gesMemberService } from '../../db/services'
import {
  internalServerErrorResponse,
  successResponse,
} from '../../util/apiResponse'
import { encryptPassword } from '../../util/encryptPassword'
import { generatePassword } from '../../util/generatePassword'

// Get list of all authority member
export const getAllGESMember = async (req: Request, res: Response) => {
  try {
    const authorityMembers = await gesMemberService.getAllGESMembers({
      order: [['gm_id', 'ASC']],
      attributes: {
        exclude: ['gm_password'],
      },
      include: {
        model: GESOffice,
        as: 'gm_gesOffice',
      },
    })

    return successResponse(res, {
      message: 'GES Member List',
      data: {
        authorityMembers,
      },
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Get one authority member
export const getGESMember = async (req: Request, res: Response) => {
  try {
    const { gm_id } = req.params
    const authorityMembers = await gesMemberService.getGESMember({
      where: { gm_id },
      attributes: {
        exclude: ['gm_password'],
      },
      include: {
        model: GESOffice,
        as: 'gm_gesOffice',
      },
    })

    return successResponse(res, {
      message: 'GES Member List',
      data: {
        authorityMembers,
      },
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Creating a New authority member
export const createGESMember = async (req: Request, res: Response) => {
  try {
    let body = req.body

    body.gm_password = encryptPassword(body.gm_password)

    const member = await gesMemberService.createGESMember(body)

    return successResponse(res, {
      message: 'GES Member added Successfully',
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

// Updating a authority member
export const updateGESMember = async (req: Request, res: Response) => {
  try {
    let {
      body,
      params: { gm_id },
    } = req

    if (body.gm_password) {
      body.gm_password = encryptPassword(body.gm_password)
    }

    const member = await gesMemberService.updateGESMember(
      {
        where: {
          gm_id,
        },
      },
      body,
    )

    return successResponse(res, {
      message: 'GES Member Updated Successfully',
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

// Delete a authority member
export const deleteGESMember = async (req: Request, res: Response) => {
  try {
    let { gm_id } = req.params

    await gesMemberService.deleteGESMember({
      where: {
        gm_id,
      },
    })

    return successResponse(res, {
      message: 'GES Member Deleted Successfully',
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}
