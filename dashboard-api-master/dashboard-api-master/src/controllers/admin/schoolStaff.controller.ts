import { Request, Response } from 'express'
import { kt_school as School } from '../../db/model/kt_school'
import { schoolStaffService } from '../../db/services'
import {
  internalServerErrorResponse,
  notFoundResponse,
  successResponse,
} from '../../util/apiResponse'
import { encryptPassword } from '../../util/encryptPassword'
import { generatePassword } from '../../util/generatePassword'

// Get list of all schoolStaffs
export const getAllSchoolStaff = async (req: Request, res: Response) => {
  try {
    const schoolStaffs = await schoolStaffService.getAllSchoolStaff({
      order: [['ss_id', 'ASC']],
      include: {
        model: School,
        as: 'ss_school',
        attributes: ['sc_id', 'sc_schoolName'],
      },
      attributes: { exclude: ['ss_password'] },
    })

    return successResponse(res, {
      message: 'School Staff List',
      data: {
        schoolStaffs,
      },
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Get one schoolStaff
export const getSchoolStaff = async (req: Request, res: Response) => {
  try {
    const { ss_id } = req.params
    const schoolStaff = await schoolStaffService.getSchoolStaff({
      where: {
        ss_id,
      },
      attributes: { exclude: ['ss_password'] },
      include: {
        model: School,
        as: 'ss_school',
        attributes: ['sc_id', 'sc_schoolName'],
      },
    })

    if (!schoolStaff)
      return notFoundResponse(res, { message: 'School Staff not founded' })

    return successResponse(res, {
      message: 'School Staff Details',
      data: {
        schoolStaff,
      },
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Creating a New schoolStaff
export const createSchoolStaff = async (req: Request, res: Response) => {
  try {
    let { body } = req
    body.ss_password = await encryptPassword(generatePassword())
    await schoolStaffService.createSchoolStaff(body)

    return successResponse(res, {
      message: 'School Staff added Successfully',
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Updating a schoolStaff
export const updateSchoolStaff = async (req: Request, res: Response) => {
  try {
    const {
      body,
      params: { ss_id },
    } = req

    const schoolStaff = await schoolStaffService.updateSchoolStaff(
      {
        where: {
          ss_id,
        },
      },
      body,
    )

    return successResponse(res, {
      message: 'School Staff Updated Successfully',
      data: { schoolStaff },
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Delete a schoolStaff
export const deleteSchoolStaff = async (req: Request, res: Response) => {
  try {
    const { ss_id } = req.params

    await schoolStaffService.deleteSchoolStaff({
      where: {
        ss_id,
      },
    })

    return successResponse(res, {
      message: 'School Staff Deleted Successfully',
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}
