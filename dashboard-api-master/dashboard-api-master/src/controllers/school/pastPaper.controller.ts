import { Request, Response } from 'express'
import { Op } from 'sequelize'
import path from 'path'

import {
  pastPaperService
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


// Get All Assignment Without Teacher
export const getAllPastPaper = async (req: Request, res: Response) => {
  try {
    const pastPaper: any = await pastPaperService.getAllPastPaper({})

    return successResponse(res, {
      message: 'pastPaper List',
      data: {
        pastPaper,
      },
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Create PastPaper
export const createPastPaper = async (req: Request, res: Response) => {
  try {
    let body = req.body
    const pastPaper = await pastPaperService.createPastPaper(body)

    return successResponse(res, {
      message: 'PastPaper added Successfully',
      data: {
        pastPaper,
      },
    })
  } catch (error: any) {
    console.log('errorcreatelivesessoin', error)
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Get Past Paper
export const getPastPaper = async (req: Request, res: Response) => {
  try {
    let { pp_id } = req.params
    const pastPaper = await pastPaperService.getPastPaper({
      where: {
        pp_id,
      },
    })

    return successResponse(res, {
      message: 'PastPaper Details founded',
      data: {
        pastPaper,
      },
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Update a PastPaper
export const updatePastPaper = async (req: Request, res: Response) => {
  try {
    let pp_id = req.params.pp_id as unknown as number
    let body = req.body
    const pastPaper = await pastPaperService.updatePastPaper(
      {
        where: {
          pp_id,
        },
      },
      body,
    )

    return successResponse(res, {
      message: 'PastPaper Updated Successfully',
      data: {
        pastPaper,
      },
    })
  } catch (error: any) {
    console.log('errorupdateAssignment',error)
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Delete PastPaper
export const deletePastPaper = async (req: Request, res: Response) => {
  try {
    let { pp_id } = req.params

    await pastPaperService.deletePastPaper({
      where: {
        pp_id,
      },
    })

    return successResponse(res, {
      message: 'PastPaper Deleted Successfully',
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}
