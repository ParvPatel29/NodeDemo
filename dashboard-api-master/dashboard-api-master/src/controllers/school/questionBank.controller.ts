import { Request, Response } from 'express'
import { kt_classRoom as ClassRoom } from '../../db/model/kt_classRoom'
import { classRoomService, questionService } from '../../db/services'
import {
  internalServerErrorResponse,
  notFoundResponse,
  successResponse,
} from '../../util/apiResponse'

// Get list of all questions
export const getAllQuestions = async (req: Request, res: Response) => {
  try {
    const { id }: any = req.token
    const questions = await questionService.getAllQuestion({
      where: { qb_schoolId: id },
      order: [['qb_id', 'ASC']],
      include: {
        model: ClassRoom,
        as: 'qb_classRoom',
        attributes: ['cr_id', 'cr_division', 'cr_class'],
      },
    })

    return successResponse(res, {
      message: 'Questions List',
      data: {
        questions,
      },
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Get one question
export const getQuestion = async (req: Request, res: Response) => {
  try {
    const { qb_id } = req.params
    const { id }: any = req.token

    const question = await questionService.getQuestion({
      where: { qb_id, qb_schoolId: id },
      include: {
        model: ClassRoom,
        as: 'qb_classRoom',
        attributes: ['cr_id', 'cr_division', 'cr_class'],
      },
    })

    if (!question)
      return notFoundResponse(res, { message: 'Invalid Question Id' })

    return successResponse(res, {
      message: 'Question Details',
      data: {
        question,
      },
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Creating a New question
export const createQuestion = async (req: Request, res: Response) => {
  try {
    let { body } = req
    const { id }: any = req.token

    body.qb_schoolId = id
    // check classroomid in current schoolId
    const classRoom = await classRoomService.getClassRoom({
      where: { cr_id: body.qb_classRoomId, cr_schoolId: id },
    })

    if (!classRoom) {
      return notFoundResponse(res, { message: 'Invalid ClassRoom Id' })
    }

    const question = await questionService.createQuestion(body)

    return successResponse(res, {
      message: 'Question added Successfully',
      data: { question },
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Updating a question
export const updateQuestion = async (req: Request, res: Response) => {
  try {
    const {
      body,
      params: { qb_id },
    } = req

    const { id }: any = req.token

    // check classroomid in current schoolId
    if (body.qb_classRoomId) {
      const classRoom = await classRoomService.getClassRoom({
        where: { cr_id: body.qb_classRoomId, cr_schoolId: id },
      })

      if (!classRoom) {
        return notFoundResponse(res, { message: 'Invalid ClassRoom Id' })
      }
    }

    const question = await questionService.updateQuestion(
      {
        where: { qb_id, qb_schoolId: id },
      },
      body,
    )

    if (question[0] === 0) {
      return notFoundResponse(res, { message: 'Invalid Question Id' })
    }

    return successResponse(res, {
      message: 'Question Updated Successfully',
      data: { question },
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Delete a question
export const deleteQuestion = async (req: Request, res: Response) => {
  try {
    const { qb_id } = req.params
    const { id }: any = req.token

    const question = await questionService.deleteQuestion({
      where: { qb_id, qb_schoolId: id },
    })

    if (question === 0) {
      return notFoundResponse(res, {
        message: 'Invalid Question Id',
      })
    }

    return successResponse(res, {
      message: 'Question Deleted Successfully',
      data: { question },
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}
