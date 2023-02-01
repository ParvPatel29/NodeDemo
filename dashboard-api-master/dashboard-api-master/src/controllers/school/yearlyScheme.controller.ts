import { Request, Response } from 'express'
import { Op } from 'sequelize'
import path from 'path'

import { termlySchemeService, yearlySchemeService } from '../../db/services'
import {
  internalServerErrorResponse,
  notFoundResponse,
  successResponse,
} from '../../util/apiResponse'
import { encryptPassword } from '../../util/encryptPassword'
import { INTEGER } from 'sequelize'
import { kt_school as School } from '../../db/model/kt_school'


// Get list YearlyScheme
export const getAllYearlyScheme = async (req: Request, res: Response) => {
  try {
    const yearlyScheme: any = await yearlySchemeService.getAllYearlyScheme({
      order: [['ysc_id', 'ASC']],
      include: {
        model: School,
        as: 'ysc_school',
        attributes: ['sc_id', 'sc_schoolName', 'sc_schoolId'],
      },
    })

    return successResponse(res, {
      message: 'YearlyScheme List',
      data: {
        yearlyScheme,
      },
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Create YearlyScheme
export const createYearlyScheme = async (req: Request, res: Response) => {
  try {
    let body = req.body

    const yearlyScheme = await yearlySchemeService.createYearlyScheme(body)

    return successResponse(res, {
      message: 'YearlyScheme added Successfully',
      data: {
        yearlyScheme,
      },
    })
  } catch (error: any) {
    console.log('yearlyschemeerror',error)
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Get YearlyScheme
export const getYearlySchemeById = async (req: Request, res: Response) => {
  try {
    let { ysc_id } = req.params
    const yearlyScheme = await yearlySchemeService.getYearlyScheme({
      where: {
        ysc_id,
      },
      include: {
        model: School,
        as: 'ysc_school',
        attributes: ['sc_id', 'sc_schoolName', 'sc_schoolId'],
      },
    })

    return successResponse(res, {
      message: 'YearlyScheme Details founded',
      data: {
        yearlyScheme,
      },
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Update a YearlyScheme
export const updateYearlyScheme = async (req: Request, res: Response) => {
  try {
    let ysc_id = req.params.ysc_id as unknown as number
    let body = req.body

    const yearlyScheme = await yearlySchemeService.updateYearlyScheme(
      {
        where: {
          ysc_id,
        },
      },
      body,
    )

    return successResponse(res, {
      message: 'YearlyScheme Updated Successfully',
      data: {
        yearlyScheme,
      },
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Delete YearlyScheme
export const deleteYearlyScheme = async (req: Request, res: Response) => {
  try {
    let { ysc_id } = req.params

    await yearlySchemeService.deleteYearlyScheme({
      where: {
        ysc_id,
      },
    })

    return successResponse(res, {
      message: 'YearlyScheme Deleted Successfully',
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}
