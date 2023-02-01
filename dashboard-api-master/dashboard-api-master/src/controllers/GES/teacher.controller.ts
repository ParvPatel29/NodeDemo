import { Request, Response } from 'express'
import { kt_school as School } from '../../db/model/kt_school'
import { teacherService } from '../../db/services'
import {
  internalServerErrorResponse,
  notFoundResponse,
  successResponse,
} from '../../util/apiResponse'

// Get list of all teachers
export const getAllTeacher = async (req: Request, res: Response) => {
  try {
    const { tc_schoolId } = req.query

    let where = {}

    tc_schoolId ? (where = { ...where, tc_schoolId }) : null

    const teachers = await teacherService.getAllTeacher({
      where,
      order: [['tc_id', 'ASC']],
      include: {
        model: School,
        as: 'tc_school',
        attributes: ['sc_id', 'sc_schoolName'],
      },
      attributes: { exclude: ['tc_password'] },
    })

    return successResponse(res, {
      message: 'Teacher List',
      data: {
        teachers,
      },
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Get one teacherDetails
export const getTeacherDetails = async (req: Request, res: Response) => {
  try {
    const { tc_id } = req.params
    const teacher = await teacherService.getTeacher({
      where: {
        tc_id,
      },
      include: {
        model: School,
        as: 'tc_school',
        attributes: ['sc_id', 'sc_schoolName'],
      },
      attributes: { exclude: ['tc_password'] },
    })

    if (!teacher)
      return notFoundResponse(res, { message: 'Teacher not founded' })

    return successResponse(res, {
      message: 'Teacher Details',
      data: {
        teacher,
      },
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}
