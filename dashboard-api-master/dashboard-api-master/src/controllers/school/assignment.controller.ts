import { Request, Response } from 'express'
import { Op } from 'sequelize'
import path from 'path'

import {
  assignmentService
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

// Get list Assignment
export const getAllAssignmentByTeacher = async (req: Request, res: Response) => {
  const { tc_id }: any = req.query
  try {
    const assignment: any = await assignmentService.getAllAssignment({
      where: {
        tc_id,
      },
    })

    return successResponse(res, {
      message: 'Assignment List',
      data: {
        assignment,
      },
    })
  } catch (error: any) {
    console.log('errorgetAllAssignmentByTeacher',error)
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}
// Get All Assignment Without Teacher
export const getAllAssignment = async (req: Request, res: Response) => {
  try {
    const assignment: any = await assignmentService.getAllAssignment({})

    return successResponse(res, {
      message: 'Assignment List',
      data: {
        assignment,
      },
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Create Assignment
export const createAssignment = async (req: Request, res: Response) => {
  try {
    let body = req.body
    const assignment = await assignmentService.createAssignment(body)

    return successResponse(res, {
      message: 'Assignment added Successfully',
      data: {
        assignment,
      },
    })
  } catch (error: any) {
    console.log('errorcreatelivesessoin', error)
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Get Assignment
export const getAssignment = async (req: Request, res: Response) => {
  try {
    let { asn_id } = req.params
    const assignment = await assignmentService.getAssignment({
      where: {
        asn_id,
      },
    })

    return successResponse(res, {
      message: 'Assignment Details founded',
      data: {
        assignment,
      },
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Update a Assignment
export const updateAssignment = async (req: Request, res: Response) => {
  try {
    let asn_id = req.params.asn_id as unknown as number
    let body = req.body
    const assignment = await assignmentService.updateAssignment(
      {
        where: {
          asn_id,
        },
      },
      body,
    )

    return successResponse(res, {
      message: 'Assignment Updated Successfully',
      data: {
        assignment,
      },
    })
  } catch (error: any) {
    console.log('errorupdateAssignment',error)
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Delete Assignment
export const deleteAssignment = async (req: Request, res: Response) => {
  try {
    let { asn_id } = req.params

    await assignmentService.deleteAssignment({
      where: {
        asn_id,
      },
    })

    return successResponse(res, {
      message: 'Assignment Deleted Successfully',
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}
