import { Request, Response } from 'express'
import { Op } from 'sequelize'
import { kt_school as School } from '../../db/model/kt_school'
import { schoolStaffService } from '../../db/services'
import {
  internalServerErrorResponse,
  notFoundResponse,
  successResponse,
} from '../../util/apiResponse'
import { encryptPassword } from '../../util/encryptPassword'
import { generatePassword } from '../../util/generatePassword'

// Get list of all officeStaff
export const getAllOfficeStaff = async (req: Request, res: Response) => {
  try {
    const { id }: any = req.token
    const officeStaffs = await schoolStaffService.getAllSchoolStaff({
      where: { ss_schoolId: id },
      order: [['ss_id', 'ASC']],
      include: {
        model: School,
        as: 'ss_school',
        attributes: ['sc_id', 'sc_schoolName'],
      },
      attributes: { exclude: ['ss_password'] },
    })

    return successResponse(res, {
      message: 'Office Staff List',
      data: {
        officeStaffs,
      },
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Get one officeStaffs
export const getOfficeStaff = async (req: Request, res: Response) => {
  try {
    const { ss_id } = req.params
    const { id }: any = req.token

    const officeStaff = await schoolStaffService.getSchoolStaff({
      where: { ss_id, ss_schoolId: id },
      attributes: { exclude: ['ss_password'] },
      include: {
        model: School,
        as: 'ss_school',
        attributes: ['sc_id', 'sc_schoolName'],
      },
    })

    if (!officeStaff)
      return notFoundResponse(res, { message: 'Invalid Office Staff Id' })

    return successResponse(res, {
      message: 'Office Staff Details',
      data: {
        officeStaff,
      },
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Creating a New OfficeStaff
export const createOfficeStaff = async (req: Request, res: Response) => {
  try {
    let { body } = req
    const { id }: any = req.token
    body.ss_password = encryptPassword(generatePassword())
    body.ss_schoolId = id
    const officeStaff = await schoolStaffService.createSchoolStaff(body)

    return successResponse(res, {
      message: 'Office Staff added Successfully',
      data: { officeStaff },
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Updating a OfficeStaff
export const updateOfficeStaff = async (req: Request, res: Response) => {
  try {
    const {
      body,
      params: { ss_id },
    } = req

    const { id }: any = req.token

    if (body.ss_password) {
      body.ss_password = encryptPassword(body.ss_password)
    }

    const officeStaff = await schoolStaffService.updateSchoolStaff(
      {
        where: { ss_id, ss_schoolId: id },
      },
      body,
    )

    if (officeStaff[0] === 0) {
      return notFoundResponse(res, { message: 'Invalid OfficeStaff Id' })
    }

    return successResponse(res, {
      message: 'Office Staff Updated Successfully',
      data: { officeStaff },
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Delete a officeStaff
export const deleteOfficeStaff = async (req: Request, res: Response) => {
  try {
    const { ss_id } = req.params
    const { id }: any = req.token

    const officeStaff = await schoolStaffService.deleteSchoolStaff({
      where: { ss_id, ss_schoolId: id },
    })

    return successResponse(res, {
      message: 'Office Staff Deleted Successfully',
      data: { officeStaff },
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}
