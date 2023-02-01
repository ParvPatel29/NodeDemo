import { Request, Response } from 'express'
import path from 'path'
import { trainingProgramService } from '../../db/services'
import {
  internalServerErrorResponse,
  successResponse,
} from '../../util/apiResponse'
import { setEmptyFieldsToNull } from '../../util/common'

// Get list of all training-program
export const getAllTrainingPrograms = async (req: Request, res: Response) => {
  try {
    const trainingPrograms =
      await trainingProgramService.getAllTrainingPrograms({
        order: [['tp_id', 'ASC']],
      })
    return successResponse(res, {
      message: 'Training Program List',
      data: {
        trainingPrograms,
      },
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Get training-program by id
export const getTrainingProgramById = async (req: Request, res: Response) => {
  try {
    let { tp_id } = req.params
    const trainingProgram = await trainingProgramService.getTrainingProgram({
      where: {
        tp_id,
      },
    })

    return successResponse(res, {
      message: 'Training Program Details',
      data: {
        trainingProgram,
      },
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Create a new training-program
export const createTrainingProgram = async (req: Request, res: Response) => {
  try {
    let body = req.body
    let files = req.files as {
      [fieldname: string]: Express.Multer.File[]
    }

    let { tp_whoCanAttendTraining } = body

    tp_whoCanAttendTraining = tp_whoCanAttendTraining.split(',')
    body['tp_whoCanAttendTraining'] = tp_whoCanAttendTraining

    // upload file
    body['tp_certificateTemplate'] = path.join(
      (req.table_name || 'common') as string,
      'tp_certificateTemplate',
      files?.['tp_certificateTemplate']?.[0]?.filename,
    )
    body['tp_programImage'] = path.join(
      (req.table_name || 'common') as string,
      'tp_programImage',
      files?.['tp_programImage']?.[0]?.filename,
    )
    // change empty fields to null-value
    setEmptyFieldsToNull(body)

    body.tp_price === null ? (body.tp_price = 0) : body.tp_price
    const trainingProgram = await trainingProgramService.createTrainingProgram(
      body,
    )

    return successResponse(res, {
      message: 'Training Program added Successfully',
      data: {
        trainingProgram,
      },
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Update a training-program
export const updateTrainingProgram = async (req: Request, res: Response) => {
  try {
    let tp_id = req.params.tp_id as unknown as number
    let body = req.body
    let files = req.files as {
      [fieldname: string]: Express.Multer.File[]
    }

    let { tp_whoCanAttendTraining } = body

    tp_whoCanAttendTraining = tp_whoCanAttendTraining.split(',')
    body['tp_whoCanAttendTraining'] = tp_whoCanAttendTraining

    // upload file
    body['tp_certificateTemplate'] = files?.['tp_certificateTemplate']?.[0]
      ?.filename
      ? path.join(
          (req.table_name || 'common') as string,
          'tp_certificateTemplate',
          files?.['tp_certificateTemplate']?.[0]?.filename,
        )
      : body['tp_certificateTemplate_old']

    body['tp_programImage'] = files?.['tp_programImage']?.[0]?.filename
      ? path.join(
          (req.table_name || 'common') as string,
          'tp_programImage',
          files?.['tp_programImage']?.[0]?.filename,
        )
      : body['tp_programImage_old']

    // change empty fields to null-value
    setEmptyFieldsToNull(body)

    body.tp_price === null ? (body.tp_price = 0) : body.tp_price

    const trainingProgram = await trainingProgramService.updateTrainingProgram(
      {
        where: {
          tp_id,
        },
      },
      body,
    )

    return successResponse(res, {
      message: 'Training Program Updated Successfully',
      data: {
        trainingProgram,
      },
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Delete a training-program
export const deleteTrainingProgram = async (req: Request, res: Response) => {
  try {
    let { tp_id } = req.params

    await trainingProgramService.deleteTrainingProgram({
      where: {
        tp_id,
      },
    })

    return successResponse(res, {
      message: 'Training Program Deleted Successfully',
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}
