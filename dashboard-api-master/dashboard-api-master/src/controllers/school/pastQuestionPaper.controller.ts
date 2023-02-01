import { Request, Response } from 'express'
import { Op } from 'sequelize'
import path from 'path'

import { pastQuestionPaperService } from '../../db/services'
import {
  internalServerErrorResponse,
  notFoundResponse,
  successResponse,
} from '../../util/apiResponse'
import { kt_pastPaper as PastPaper } from '../../db/model/kt_pastPaper'
import { encryptPassword } from '../../util/encryptPassword'
import { INTEGER } from 'sequelize'
import axios from 'axios'
import { CREATE_ROOM } from '../../helper/urlHelper'
import { basicAuthOfEnableX } from '../../helper/authHelper'
import { createRoom } from './enableX.controller'
import { kt_assignment as Assignment } from '../../db/model/init-models'

// Get All PastQuestionPaper Without Teacher
export const getAllPastQuestionPaper = async (req: Request, res: Response) => {
  try {
    const pastQuestionPaper: any =
      await pastQuestionPaperService.getAllPastQuestionPaper({
        include: {
          model: PastPaper,
          as: 'pq_pastPaper',
          attributes: ['pp_id', 'pp_year', 'pp_body', 'pp_title'],
        },
      })

    return successResponse(res, {
      message: 'Past Question Paper Paper List',
      data: {
        pastQuestionPaper,
      },
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Create PastQuestionPaper
export const createPastQuestionPaper = async (req: Request, res: Response) => {
  try {
    let body = req.body

    let files = req.files as {
      [fieldname: string]: Express.Multer.File[]
    }
    let { pq_correctAns } = body

    pq_correctAns = pq_correctAns.split(',')
    body['pq_correctAns'] = pq_correctAns

    // upload file
    body['pq_image'] =
      files?.['pq_image'] &&
      path.join(
        (req.table_name || 'common') as string,
        'pq_image',
        files?.['pq_image']?.[0]?.filename,
      )

    const pastQuestionPaper =
      await pastQuestionPaperService.createPastQuestionPaper(body)
    return successResponse(res, {
      message: 'Past Question Paper added Successfully',
      data: {
        pastQuestionPaper,
      },
    })
  } catch (error: any) {
    console.log('errorcreatelivesessoin', error)
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Get Past Question Paper
export const getPastQuestionPaper = async (req: Request, res: Response) => {
  try {
    let { pq_id } = req.params
    const pastQuestionPaper =
      await pastQuestionPaperService.getPastQuestionPaper({
        where: {
          pq_id,
        },
      })

    return successResponse(res, {
      message: 'Past Question Paper Details founded',
      data: {
        pastQuestionPaper,
      },
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Update a PastQuestionPaper
export const updatePastQuestionPaper = async (req: Request, res: Response) => {
  try {
    let pq_id = req.params.pq_id as unknown as number
    let body = req.body
    let { pq_correctAns } = body
    let files = req.files as {
      [fieldname: string]: Express.Multer.File[]
    }

    pq_correctAns = pq_correctAns.split(',')
    body['pq_correctAns'] = pq_correctAns

    // upload file
    body['pq_image'] =
      files?.['pq_image'] &&
      path.join(
        (req.table_name || 'common') as string,
        'pq_image',
        files?.['pq_image']?.[0]?.filename,
      )

    const pastQuestionPaper =
      await pastQuestionPaperService.updatePastQuestionPaper(
        {
          where: {
            pq_id,
          },
        },
        body,
      )

    return successResponse(res, {
      message: 'Past Question Paper Updated Successfully',
      data: {
        pastQuestionPaper,
      },
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Delete Past Question Paper
export const deletePastQuestionPaper = async (req: Request, res: Response) => {
  try {
    let { pq_id } = req.params

    await pastQuestionPaperService.deletePastQuestionPaper({
      where: {
        pq_id,
      },
    })

    return successResponse(res, {
      message: 'Past Question Paper Deleted Successfully',
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}
