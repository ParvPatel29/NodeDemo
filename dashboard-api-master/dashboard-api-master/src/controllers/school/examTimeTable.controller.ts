import { Request, Response } from 'express'
import {
  classRoomService,
  examService,
  examTitmeTableService,
} from '../../db/services'
import path from 'path'

import {
  internalServerErrorResponse,
  notFoundResponse,
  successResponse,
} from '../../util/apiResponse'
import { setEmptyFieldsToNull } from '../../util/common'
import { kt_exam as Exam } from '../../db/model/kt_exam'
import { kt_classRoom as Class } from '../../db/model/kt_classRoom'

// Get list of all ExamTimeTable
export const getAllExamSchedule = async (req: Request, res: Response) => {
  try {
    const { id }: any = req.token

    const examSchedule = await examTitmeTableService.getAllExamTimeTable({
      where: { et_schoolId: id },
      order: [['et_id', 'ASC']],
      include: [
        {
          model: Exam,
          as: 'et_exam',
          attributes: ['ex_id', 'ex_examTitle'],
        },
        // {
        //   model: Class,
        //   as: 'et_class',
        //   attributes: ['cr_id', 'cr_division', 'cr_class'],
        // },
      ],
    })

    return successResponse(res, {
      message: 'ExamTimeTable List',
      data: {
        examSchedule,
      },
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Get ExamTimeTable
export const getExamSchedule = async (req: Request, res: Response) => {
  try {
    let { et_id } = req.params

    const { id }: any = req.token

    const examSchedule = await examTitmeTableService.getExamTimeTable({
      where: { et_id, et_schoolId: id },
    })

    if (!examSchedule) {
      return notFoundResponse(res, { message: 'Invalid ExamTimeTable Id' })
    }

    return successResponse(res, {
      message: 'ExamTimeTable Details',
      data: {
        examSchedule,
      },
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Create a new ExamTimeTable
export const createExamSchedule = async (req: Request, res: Response) => {
  try {
    let body = req.body
    let files = req.files as {
      [fieldname: string]: Express.Multer.File[]
    }
    const { id }: any = req.token

    // upload Exam Paper
    body['et_oldExamPaper'] =
      files?.['et_oldExamPaper'] &&
      path.join(
        (req.table_name || 'common') as string,
        'et_oldExamPaper',
        files?.['et_oldExamPaper']?.[0]?.filename,
      )

    body.et_schoolId = id

    // check ClassRoom Id and schoolId
    // if (body.et_classId) {
    //   const classRoom = await classRoomService.getAllClassRooms({
    //     where: { cr_id: body.et_classId, cr_schoolId: id },
    //   })

    //   if (!classRoom.length) {
    //     return notFoundResponse(res, { message: 'Invalid ClassRoom Id' })
    //   }
    // }

    // check Exam Id and schoolId
    if (body.et_examId) {
      const exam = await examService.getAllExam({
        where: { ex_id: body.et_examId, ex_schoolId: id },
      })

      if (!exam.length) {
        return notFoundResponse(res, { message: 'Invalid Exam Id' })
      }
    }

    //  change empty fields to null-value
    setEmptyFieldsToNull(body)

    const examSchedule = await examTitmeTableService.createExamTimeTable(body)

    return successResponse(res, {
      message: 'ExamTimeTable added Successfully',
      data: {
        examSchedule,
      },
    })
  } catch (error: any) {
    console.log(error)
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Update a ExamTimeTable
export const updateExamSchedule = async (req: Request, res: Response) => {
  try {
    let et_id = req.params.et_id as unknown as number
    let body = req.body
    let files = req.files as {
      [fieldname: string]: Express.Multer.File[]
    }
    const { id }: any = req.token

    //update Exam Paper
    body['et_oldExamPaper'] = files?.['et_oldExamPaper']?.[0]?.filename
      ? path.join(
          (req.table_name || 'common') as string,
          'et_oldExamPaper',
          files?.['et_oldExamPaper']?.[0]?.filename,
        )
      : body['et_oldExamPaper_old']

    // check ClassRoom Id and schoolId
    // if (body.et_classId) {
    //   const classRoom = await classRoomService.getAllClassRooms({
    //     where: { cr_id: body.et_classId, cr_schoolId: id },
    //   })

    //   if (!classRoom.length) {
    //     return notFoundResponse(res, { message: 'Invalid ClassRoom Id' })
    //   }
    // }

    // check Exam Id and schoolId
    if (body.et_examId) {
      const exam = await examService.getAllExam({
        where: { ex_id: body.et_examId, ex_schoolId: id },
      })

      if (!exam.length) {
        return notFoundResponse(res, { message: 'Invalid Exam Id' })
      }
    }

    //  change empty fields to null-value
    setEmptyFieldsToNull(body)

    const examSchedule = await examTitmeTableService.updateExamTimeTable(
      {
        where: { et_id, et_schoolId: id },
      },
      body,
    )

    if (examSchedule[0] === 0) {
      return notFoundResponse(res, {
        message: 'Invalid ExamTimeTable Id',
      })
    }

    return successResponse(res, {
      message: 'ExamTimeTable Updated Successfully',
      data: {
        examSchedule,
      },
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Delete a ExamTimeTable
export const deleteExamSchedule = async (req: Request, res: Response) => {
  try {
    let { et_id } = req.params
    const { id }: any = req.token

    const deleteExamSchedule = await examTitmeTableService.deleteExamTimeTable({
      where: { et_id, et_schoolId: id },
    })

    if (deleteExamSchedule === 0) {
      return notFoundResponse(res, {
        message: 'Invalid ExamTimeTable Id',
      })
    }

    return successResponse(res, {
      message: 'ExamTimeTable Deleted Successfully',
      data: { deleteExamSchedule },
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}
