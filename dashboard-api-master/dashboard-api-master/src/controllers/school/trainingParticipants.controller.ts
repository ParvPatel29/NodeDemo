import { Request, Response } from 'express'
import { Op } from 'sequelize'
import path, { resolve } from 'path'

import {
  trainingParticipantsService,
  teacherService,
  studentService,
} from '../../db/services'
import {
  internalServerErrorResponse,
  notFoundResponse,
  successResponse,
} from '../../util/apiResponse'
import { kt_trainingProgram as TrainingProgram } from '../../db/model/init-models'
import { encryptPassword } from '../../util/encryptPassword'
import { INTEGER } from 'sequelize'
import { rejects } from 'assert'
import { kt_classRoom as ClassRoom } from '../../db/model/kt_classRoom'
import { kt_school as School } from '../../db/model/kt_school'

// Get list TrainingParticipants
export const getAllTrainingParticipants = async (
  req: Request,
  res: Response,
) => {
  try {
    const trainingParticipants =
      await trainingParticipantsService.getAllTrainingParticipants({
        include: {
          model: TrainingProgram,
          as: 'tps_trainingProgram',
        },
      })

    return successResponse(res, {
      message: 'trainingParticipants List',
      data: {
        trainingParticipants,
      },
    })
  } catch (error: any) {
    console.log('errorgetAllTrainingParticipants', error)
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Create TrainingParticipants
export const createTrainingParticipants = async (
  req: Request,
  res: Response,
) => {
  try {
    let body = req.body
    // let files = req.files as {
    //   [fieldname: string]: Express.Multer.File[]
    // }

    const trainingParticipants =
      await trainingParticipantsService.createTrainingParticipants(body)

    return successResponse(res, {
      message: 'trainingParticipants added Successfully',
      data: {
        trainingParticipants,
      },
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Update a TrainingParticipants
export const updateTrainingParticipants = async (
  req: Request,
  res: Response,
) => {
  try {
    let tps_id = req.params.tps_id as unknown as number
    let body = req.body

    const trainingParticipants =
      await trainingParticipantsService.updateTrainingParticipants(
        {
          where: {
            tps_id,
          },
        },
        body,
      )

    return successResponse(res, {
      message: 'trainingParticipants Updated Successfully',
      data: {
        trainingParticipants,
      },
    })
  } catch (error: any) {
    console.log('errorupdateTrainingParticipants', error)
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Delete Training Participants
export const deleteTrainingParticipants = async (
  req: Request,
  res: Response,
) => {
  try {
    let { tps_id } = req.params

    await trainingParticipantsService.deleteTrainingParticipants({
      where: {
        tps_id,
      },
    })

    return successResponse(res, {
      message: 'Training Participants Deleted Successfully',
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Get Training Participants Detail
export const getUsersByTrainingProgramId = async (
  req: Request,
  res: Response,
) => {
  try {
    let { id } = req.params
    const trainingParticipants =
      await trainingParticipantsService.getAllTrainingParticipants({
        where: {
          tps_tp_id: id,
        },
      })

    let studentIds: any = []
    let teacherIds: any = []
    trainingParticipants &&
      trainingParticipants.map((data) => {
        if (data.tps_userType == 'teachers') {
          teacherIds.push(data.tps_userId)
        } else if (data.tps_userType == 'students') {
          studentIds.push(data.tps_userId)
        }
      })
    const teacherData: any = await teacherService.getAllTeacher({
      where: {
        tc_id: teacherIds,
      },
    })
    const studentData: any = await studentService.getAllStudents({
      where: {
        st_id: studentIds,
      },
    })

    return successResponse(res, {
      message: 'Training Participants Details founded',
      data: {
        teacher: teacherData,
        student: studentData,
      },
    })
  } catch (error: any) {
    console.log('errorgetUsersByTrainingProgramId', error)
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}
// Get Training Participants Detail
export const getTrainingParticipantsById = async (
  req: Request,
  res: Response,
) => {
  try {
    let { tps_id } = req.params
    const trainingParticipants =
      await trainingParticipantsService.getTrainingParticipants({
        where: {
          tps_id,
        },
      })

    return successResponse(res, {
      message: 'Training Participants Details founded',
      data: {
        trainingParticipants,
      },
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}
// Get Training Participants Detail
export const getTrainingParticipantsByTP = async (
  req: Request,
  res: Response,
) => {
  try {
    let { tps_tp_id }: any = req.query
    const trainingParticipants =
      await trainingParticipantsService.getAllTrainingParticipants({
        where: {
          tps_tp_id,
        },
      })

    return successResponse(res, {
      message: 'Training Participant Details founded',
      data: {
        trainingParticipants,
      },
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}
// Get Training Participants Detail
export const getUserDetailsFromTrainingParticipants = async (
  req: Request,
  res: Response,
) => {
  try {
    let { tps_userType, tps_userId }: any = req.query

    let userDetails: any = {}
    if (tps_userType == 'teachers') {
      userDetails = await teacherService.getTeacher({
        where: {
          tc_id: tps_userId,
        },
      })
    } else if (tps_userType == 'students') {
      userDetails = await studentService.getStudent({
        where: { st_id: tps_userId },
        attributes: {
          exclude: ['st_password'],
        },
      })
    }
    return successResponse(res, {
      message: 'User Details founded',
      data: {
        userDetails,
      },
    })
  } catch (error: any) {
    console.log('errorgetUserDetailsFromTrainingParticipants', error)
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Get Training Participants Detail
export const getEnrolledTrainingProgram = async (
  req: Request,
  res: Response,
) => {
  try {
    let { tps_tp_id, tps_userType, tps_userId } = req.body
    const trainingParticipants =
      await trainingParticipantsService.getTrainingParticipants({
        where: [
          {
            tps_tp_id: tps_tp_id,
            tps_userType: tps_userType,
            tps_userId: tps_userId,
          },
        ],
      })
    if (trainingParticipants) {
      return successResponse(res, {
        message: 'Training Participants Details founded',
        data: {
          found: true,
          trainingParticipants,
        },
      })
    }
    return successResponse(res, {
      message: 'Training Participants Details founded',
      data: {
        found: false,
      },
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}
