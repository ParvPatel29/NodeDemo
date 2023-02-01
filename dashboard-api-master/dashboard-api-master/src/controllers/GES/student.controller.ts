import { Request, Response } from 'express'
import { kt_classRoom as ClassRoom } from '../../db/model/kt_classRoom'
import { kt_school as School } from '../../db/model/kt_school'
import { studentService } from '../../db/services'
import {
  internalServerErrorResponse,
  successResponse,
} from '../../util/apiResponse'

// Get list of all student
export const getAllStudents = async (req: Request, res: Response) => {
  try {
    const { st_schoolId } = req.query

    let where = {}

    st_schoolId ? (where = { ...where, st_schoolId }) : null

    let students = await studentService.getAllStudents({
      where,
      attributes: {
        exclude: ['st_password'],
      },
      order: [['st_id', 'ASC']],
      include: [
        {
          model: ClassRoom,
          as: 'st_classRoom',
          attributes: ['cr_id', 'cr_class', 'cr_division'],
        },
        {
          model: School,
          as: 'st_school',
          attributes: ['sc_id', 'sc_schoolName'],
        },
      ],
    })

    return successResponse(res, {
      message: 'Student List',
      data: { students },
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Get studentDetails
export const getStudentDetails = async (req: Request, res: Response) => {
  try {
    let { st_id } = req.params
    const student = await studentService.getStudent({
      where: {
        st_id,
      },
      attributes: {
        exclude: ['st_password'],
      },
      include: [
        {
          model: ClassRoom,
          as: 'st_classRoom',
          attributes: ['cr_id', 'cr_class', 'cr_division'],
        },
        {
          model: School,
          as: 'st_school',
          attributes: ['sc_id', 'sc_schoolName'],
        },
      ],
    })

    return successResponse(res, {
      message: 'Student Details',
      data: {
        student,
      },
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}
