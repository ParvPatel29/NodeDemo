import { Request, Response } from 'express'
import { Op } from 'sequelize'
import path from 'path'

import { termlySchemeService, weeklyLessonPlanService } from '../../db/services'
import {
  internalServerErrorResponse,
  notFoundResponse,
  successResponse,
} from '../../util/apiResponse'
import { encryptPassword } from '../../util/encryptPassword'
import { INTEGER } from 'sequelize'
import { kt_school as School } from '../../db/model/kt_school'

// Get list WeeklyLessonPlan
export const getAllWeeklyLessonPlan = async (req: Request, res: Response) => {
  try {
    const weeklyLessonPlan: any =
      await weeklyLessonPlanService.getAllWeeklyLessonPlan({
        include: {
          model: School,
          as: 'wlp_school',
          attributes: ['sc_id', 'sc_schoolName', 'sc_schoolId'],
        },
        order: [['wlp_id', 'ASC']],
      })
    return successResponse(res, {
      message: 'WeeklyLessonPlan List',
      data: {
        weeklyLessonPlan,
      },
    })
  } catch (error: any) {
    console.log('errorgetAllWeeklyLessonPlan',error)
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Create WeeklyLessonPlan
export const createWeeklyLessonPlan = async (req: Request, res: Response) => {
  try {
    let body = req.body
    let files = req.files as {
      [fileldname: string]: Express.Multer.File[]
    }
    body['wlp_teachingMaterial'] = files?.['wlp_teachingMaterial']?.[0]?.filename
    ? path.join(
        (req.table_name || 'common') as string,
        'wlp_teachingMaterial',
        files?.['wlp_teachingMaterial']?.[0]?.filename,
      )
    : body['wlp_teachingMaterial_old']

    const weeklyLessonPlan = await weeklyLessonPlanService.createWeeklyLessonPlan(body)

    return successResponse(res, {
      message: 'WeeklyLessonPlan added Successfully',
      data: {
        weeklyLessonPlan,
      },
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Get WeeklyLessonPlan
export const getWeeklyLessonPlanById = async (req: Request, res: Response) => {
  try {
    let { wlp_id } = req.params
    const weeklyLessonPlan = await weeklyLessonPlanService.getWeeklyLessonPlan({
      where: {
        wlp_id,
      },
      include: {
        model: School,
        as: 'wlp_school',
        attributes: ['sc_id', 'sc_schoolName', 'sc_schoolId'],
      },
    })

    return successResponse(res, {
      message: 'WeeklyLessonPlan Details founded',
      data: {
        weeklyLessonPlan,
      },
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Update a WeeklyLessonPlan
export const updateWeeklyLessonPlan = async (req: Request, res: Response) => {
  try {
    let wlp_id = req.params.wlp_id as unknown as number
    let body = req.body
    let files = req.files as {
      [fileldname: string]: Express.Multer.File[]
    }

    body['wlp_teachingMaterial'] = files?.['wlp_teachingMaterial']?.[0]?.filename
    ? path.join(
        (req.table_name || 'common') as string,
        'wlp_teachingMaterial',
        files?.['wlp_teachingMaterial']?.[0]?.filename,
      )
    : body['wlp_teachingMaterial_old']

    const weeklyLessonPlan = await weeklyLessonPlanService.updateWeeklyLessonPlan(
      {
        where: {
          wlp_id,
        },
      },
      body,
    )

    return successResponse(res, {
      message: 'WeeklyLessonPlan Updated Successfully',
      data: {
        weeklyLessonPlan,
      },
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Delete WeeklyLessonPlan
export const deleteWeeklyLessonPlan = async (req: Request, res: Response) => {
  try {
    let { wlp_id } = req.params

    await weeklyLessonPlanService.deleteWeeklyLessonPlan({
      where: {
        wlp_id,
      },
    })

    return successResponse(res, {
      message: 'WeeklyLessonPlan Deleted Successfully',
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}
