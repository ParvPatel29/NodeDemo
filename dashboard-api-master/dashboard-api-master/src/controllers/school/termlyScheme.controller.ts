import { Request, Response } from 'express'
import { Op } from 'sequelize'
import path from 'path'

import { termlySchemeService } from '../../db/services'
import {
  internalServerErrorResponse,
  notFoundResponse,
  successResponse,
} from '../../util/apiResponse'
import { encryptPassword } from '../../util/encryptPassword'
import { INTEGER } from 'sequelize'
import { kt_school as School } from '../../db/model/kt_school'

// Get list TermlyScheme
export const getAllTermlyScheme = async (req: Request, res: Response) => {
  // let currentMonth = new Date().getMonth()
  // const currentYear = new Date().getFullYear()
  // currentMonth += 1

  // const date1 = `${currentYear}-${currentMonth}-01 18:23:10.148726+05:30`
  // const date2 = `${currentYear}-${currentMonth}-30 18:23:10.148726+05:30`

  // let { page, limit } = req.query

  try {
    
    const termlyScheme: any = await termlySchemeService.getAllTermlyScheme({
     
      include: {
        model: School,
        as: 'tsc_school',
        attributes: ['sc_id', 'sc_schoolName', 'sc_schoolId'],
      },
      order: [['tsc_id', 'ASC']],
    })
    return successResponse(res, {
      message: 'TermlyScheme List',
      data: {
        termlyScheme,
      },
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Create TermlyScheme
export const createTermlyScheme = async (req: Request, res: Response) => {
  try {
    let body = req.body
      
    const termlyScheme = await termlySchemeService.createTermlyScheme(body)

    return successResponse(res, {
      message: 'TermlyScheme added Successfully',
      data: {
        termlyScheme,
      },
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Get TermlyScheme
export const getTermlySchemeById = async (req: Request, res: Response) => {
  try {
    let { tsc_id } = req.params
    const termlyScheme = await termlySchemeService.getTermlyScheme({
      where: {
        tsc_id,
      },
      include: {
        model: School,
        as: 'tsc_school',
        attributes: ['sc_id', 'sc_schoolName', 'sc_schoolId'],
      },
    })

    return successResponse(res, {
      message: 'TermlyScheme Details founded',
      data: {
        termlyScheme,
      },
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Update a TermlyScheme
export const updateTermlyScheme = async (req: Request, res: Response) => {
  try {
    let tsc_id = req.params.tsc_id as unknown as number
    let body = req.body

    const termlyScheme = await termlySchemeService.updateTermlyScheme(
      {
        where: {
          tsc_id,
        },
      },
      body,
    )

    return successResponse(res, {
      message: 'TermlyScheme Updated Successfully',
      data: {
        termlyScheme,
      },
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Delete TermlyScheme
export const deleteTermlyScheme = async (req: Request, res: Response) => {
  try {
    let { tsc_id } = req.params

    await termlySchemeService.deleteTermlyScheme({
      where: {
        tsc_id,
      },
    })

    return successResponse(res, {
      message: 'TermlyScheme Deleted Successfully',
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}
