import { Request, Response } from 'express'
import { Op } from 'sequelize'
import path from 'path'

import {
  assignmentService,
  assignmentQuestionsService,
} from '../../db/services'
import {
  internalServerErrorResponse,
  notFoundResponse,
  successResponse,
} from '../../util/apiResponse'
import { encryptPassword } from '../../util/encryptPassword'
import { INTEGER } from 'sequelize'
import axios from 'axios'
import { CREATE_ROOM } from '../../helper/urlHelper'
import { basicAuthOfEnableX } from '../../helper/authHelper'
import { createRoom } from './enableX.controller'
import { kt_assignment as Assignment } from '../../db/model/init-models'

// Get list AssignmentQuestions
export const getAllAssignmentQueByTeacher = async (
  req: Request,
  res: Response,
) => {
  const { tc_id }: any = req.query
  try {
    const assignmentQuestions: any =
      await assignmentQuestionsService.getAllAssignmentQue({
        where: {
          tc_id,
        },
        include: {
          model: Assignment,
          as: 'aq_assignment',
          attributes: ['asn_title', 'asn_id', 'asn_totalMarks', 'asn_duration'],
        },
      })

    return successResponse(res, {
      message: 'AssignmentQuestions List',
      data: {
        assignmentQuestions,
      },
    })
  } catch (error: any) {
    console.log('errorgetAllAssignmentQuestionsByTeacher', error)
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Get list AssignmentQuestions
export const getAllAssignmentQueByAssgn = async (
  req: Request,
  res: Response,
) => {
  const { tc_id,asn_id }: any = req.query
  try {
    const assignmentQuestions: any =
      await assignmentQuestionsService.getAllAssignmentQue({
        where: [{
          tc_id,
          asn_id
        }],
        include: {
          model: Assignment,
          as: 'aq_assignment',
          attributes: ['asn_title', 'asn_id', 'asn_totalMarks', 'asn_duration'],
        },
      })

    return successResponse(res, {
      message: 'AssignmentQuestions List',
      data: {
        assignmentQuestions,
      },
    })
  } catch (error: any) {
    console.log('errorgetAllAssignmentQuestionsByTeacher', error)
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}
// Get All AssignmentQuestions Without Teacher
export const getAllAssignmentQuestions = async (
  req: Request,
  res: Response,
) => {
  try {
    const assignmentQuestions: any =
      await assignmentQuestionsService.getAllAssignmentQue({})

    return successResponse(res, {
      message: 'AssignmentQuestions List',
      data: {
        assignmentQuestions,
      },
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Create AssignmentQuestions
export const createAssignmentQuestions = async (
  req: Request,
  res: Response,
) => {
  try {
    let body = req.body
    console.log('body', body)

    let { aq_correntAns } = body

    aq_correntAns = aq_correntAns.split(',')
    body['aq_correntAns'] = aq_correntAns

    const assignmentQuestions =
      await assignmentQuestionsService.createAssignmentQue(body)
    return successResponse(res, {
      message: 'AssignmentQuestions added Successfully',
      data: {
        assignmentQuestions,
      },
    })
  } catch (error: any) {
    console.log('errorcreatelivesessoin', error)
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Get AssignmentQuestions
export const getAssignmentQuestions = async (req: Request, res: Response) => {
  try {
    let { aq_id } = req.params
    const assignmentQuestions =
      await assignmentQuestionsService.getAssignmentQue({
        where: {
          aq_id,
        },
      })

    return successResponse(res, {
      message: 'AssignmentQuestions Details founded',
      data: {
        assignmentQuestions,
      },
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Update a AssignmentQuestions
export const updateAssignmentQuestions = async (
  req: Request,
  res: Response,
) => {
  try {
    let aq_id = req.params.aq_id as unknown as number
    let body = req.body
    let { aq_correntAns } = body

    aq_correntAns = aq_correntAns.split(',')
    body['aq_correntAns'] = aq_correntAns
    const assignmentQuestions =
      await assignmentQuestionsService.updateAssignmentQue(
        {
          where: {
            aq_id,
          },
        },
        body,
      )

    return successResponse(res, {
      message: 'AssignmentQuestions Updated Successfully',
      data: {
        assignmentQuestions,
      },
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Delete AssignmentQuestions
export const deleteAssignmentQuestions = async (
  req: Request,
  res: Response,
) => {
  try {
    let { aq_id } = req.params

    await assignmentQuestionsService.deleteAssignmentQue({
      where: {
        aq_id,
      },
    })

    return successResponse(res, {
      message: 'AssignmentQuestions Deleted Successfully',
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}