import { Request, Response } from 'express'
import { examService } from '../../db/services'
import {
  internalServerErrorResponse,
  notFoundResponse,
  successResponse,
} from '../../util/apiResponse'

// Get list of all exams
export const getAllExams = async (req: Request, res: Response) => {
  try {
    const { id }: any = req.token

    const exams = await examService.getAllExam({
      where: { ex_schoolId: id },
      order: [['ex_id', 'ASC']],
    })

    return successResponse(res, {
      message: 'Exam List',
      data: {
        exams,
      },
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Get Exam
export const getExam = async (req: Request, res: Response) => {
  try {
    let { ex_id } = req.params

    const { id }: any = req.token

    const exam = await examService.getExam({
      where: { ex_id, ex_schoolId: id },
    })

    if (!exam) {
      return notFoundResponse(res, { message: 'Invalid Exam Id' })
    }

    return successResponse(res, {
      message: 'exam Details',
      data: {
        exam,
      },
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Create a new Exam
export const createExam = async (req: Request, res: Response) => {
  try {
    let body = req.body
    const { id }: any = req.token

    body.ex_schoolId = id

    const Exam = await examService.createExam(body)

    return successResponse(res, {
      message: 'Exam added Successfully',
      data: {
        Exam,
      },
    })
  } catch (error: any) {
    console.log(error)
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Update a Exam
export const updateExam = async (req: Request, res: Response) => {
  try {
    let ex_id = req.params.ex_id as unknown as number
    let body = req.body

    const { id }: any = req.token

    const exam = await examService.updateExam(
      {
        where: { ex_id, ex_schoolId: id },
      },
      body,
    )

    if (exam[0] === 0) {
      return notFoundResponse(res, {
        message: 'Invalid exam Id',
      })
    }

    return successResponse(res, {
      message: 'exam Updated Successfully',
      data: {
        exam,
      },
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Delete a Exam
export const deleteExam = async (req: Request, res: Response) => {
  try {
    let { ex_id } = req.params
    const { id }: any = req.token

    const deleteExam = await examService.deleteExam({
      where: { ex_id, ex_schoolId: id },
    })

    if (deleteExam === 0) {
      return notFoundResponse(res, {
        message: 'Invalid Exam Id',
      })
    }

    return successResponse(res, {
      message: 'Exam Deleted Successfully',
      data: { deleteExam },
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}
