import { Request, Response } from 'express'
import { gesOfficeStaffService } from '../../db/services'
import {
  internalServerErrorResponse,
  notFoundResponse,
  successResponse,
} from '../../util/apiResponse'
import { encryptPassword } from '../../util/encryptPassword'
import { generatePassword } from '../../util/generatePassword'

// Get list of all GES-officeStaff
export const getAllGESOfficeStaff = async (req: Request, res: Response) => {
  try {
    const { gs_gesOfficeId }: any = req.query
    const gesOfficeStaffs = await gesOfficeStaffService.getAllGESOfficeStaff({
      where: { gs_gesOfficeId },
      order: [['gs_id', 'ASC']],
      attributes: {
        exclude: ['gs_password'],
      },
    })

    return successResponse(res, {
      message: 'GES OfficeStaff List',
      data: {
        gesOfficeStaffs,
      },
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Get one gesOffice-Staff
export const getGESOfficeStaff = async (req: Request, res: Response) => {
  try {
    const { gs_id } = req.params
    const gesOfficeStaff = await gesOfficeStaffService.getGESOfficeStaff({
      where: { gs_id },
      attributes: {
        exclude: ['gs_password'],
      },
    })

    return successResponse(res, {
      message: 'GES Office List',
      data: {
        gesOfficeStaff,
      },
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Creating a New gesOffice-Staff
export const createGESOfficeStaff = async (req: Request, res: Response) => {
  try {
    let body = req.body

    body.gs_password = encryptPassword(generatePassword())
    const createGesOfficeStaff =
      await gesOfficeStaffService.createGESOfficeStaff(body)

    return successResponse(res, {
      message: 'GES OfficeStaff added Successfully',
      data: {
        createGesOfficeStaff,
      },
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Updating a gesOffice-Staff
export const updateGESOfficeStaff = async (req: Request, res: Response) => {
  try {
    let {
      body,
      params: { gs_id },
    } = req

    const updateGesOfficeStaff =
      await gesOfficeStaffService.updateGESOfficeStaff(
        {
          where: {
            gs_id,
          },
        },
        body,
      )

    return successResponse(res, {
      message: 'GES OfficeStaff Updated Successfully',
      data: {
        updateGesOfficeStaff,
      },
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Delete a gesOffice-Staff
export const deleteGESOfficeStaff = async (req: Request, res: Response) => {
  try {
    let { gs_id } = req.params

    const deleteGesOfficeStaff =
      await gesOfficeStaffService.deleteGESOfficeStaff({
        where: {
          gs_id,
        },
      })

    if (deleteGesOfficeStaff === 0) {
      return notFoundResponse(res, { message: 'Invalid GES-OfficeStaff Id' })
    }

    return successResponse(res, {
      message: 'GES OfficeStaff Deleted Successfully',
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}
