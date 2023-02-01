import { Request, Response } from 'express'
import { kt_teacher as Teacher } from '../../db/model/kt_teacher'
import { teacherLessonService, teacherService } from '../../db/services'
import {
  internalServerErrorResponse,
  notFoundResponse,
  successResponse,
} from '../../util/apiResponse'

// Get All Lesson
export const getAllTeacherLessons = async (req: Request, res: Response) => {
  try {
    const tl_schoolId = req.token?.id
    const teacherLesson = await teacherLessonService.getAllTeacherLesson({
      where: { tl_schoolId },
      order: [['tl_id', 'ASC']],
      include: {
        model: Teacher,
        as: 'tl_teacher',
        attributes: ['tc_id', 'tc_fullName'],
      },
    })

    return successResponse(res, {
      message: 'Teacherlesson List',
      data: {
        teacherLesson,
      },
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Get one Lesson
export const getTeacherLesson = async (req: Request, res: Response) => {
  try {
    const { tl_id } = req.params
    const { id }: any = req.token

    const teacherLesson = await teacherLessonService.getTeacherLesson({
      where: {
        tl_id,
        tl_schoolId: id,
      },
    })

    if (!teacherLesson)
      return notFoundResponse(res, { message: 'Teacherlesson not founded' })

    return successResponse(res, {
      message: 'Teacherlesson Details',
      data: {
        teacherLesson,
      },
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Creating a New Lesson
export const createTeacherLesson = async (req: Request, res: Response) => {
  try {
    let { body } = req

    const { id }: any = req.token

    body.tl_schoolId = id

    // check Teacher Id and schoolId
    const teacher = await teacherService.getTeacher({
      where: { tc_id: body.tl_teacherId, tc_schoolId: id },
    })

    if (!teacher) {
      return notFoundResponse(res, { message: 'Invalid Teacher Id' })
    }

    await teacherLessonService.createTeacherLesson(body)

    return successResponse(res, {
      message: 'Teacherlesson added Successfully',
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Updating a Lesson
export const updateTeacherLesson = async (req: Request, res: Response) => {
  try {
    let {
      body,
      params: { tl_id },
    } = req

    const { id }: any = req.token

    if (body.tl_teacherId) {
      // check Teacher Id and schoolId
      const teacher = await teacherService.getTeacher({
        where: { tc_id: body.tl_teacherId, tc_schoolId: id },
      })

      if (!teacher) {
        return notFoundResponse(res, { message: 'Invalid Teacher Id' })
      }
    }

    const teacherLesson = await teacherLessonService.updateTeacherLesson(
      {
        where: {
          tl_id,
          tl_schoolId: id,
        },
      },
      body,
    )

    if (teacherLesson[0] === 0) {
      return notFoundResponse(res, { message: 'Invalid Teacherlesson Id' })
    }

    return successResponse(res, {
      message: 'Teacherlesson Updated Successfully',
      data: { teacherLesson },
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Delete a Lesson
export const deleteTeacherLesson = async (req: Request, res: Response) => {
  try {
    const { tl_id } = req.params
    const { id }: any = req.token

    const deleteLesson = await teacherLessonService.deleteTeacherLesson({
      where: {
        tl_id,
        tl_schoolId: id,
      },
    })

    if (deleteLesson === 0) {
      return notFoundResponse(res, {
        message: 'Invalid Teacherlesson Id',
      })
    }

    return successResponse(res, {
      message: 'Teacherlesson Deleted Successfully',
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}
