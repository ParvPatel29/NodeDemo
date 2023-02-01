import { Request, Response } from 'express'
import path from 'path'
import { kt_school as School } from '../../db/model/kt_school'
import { publisherService, teacherService } from '../../db/services'
import {
  internalServerErrorResponse,
  notFoundResponse,
  successResponse,
} from '../../util/apiResponse'
import { setEmptyFieldsToNull } from '../../util/common'
import { encryptPassword } from '../../util/encryptPassword'
import { generatePassword } from '../../util/generatePassword'

// Get list of all teachers
export const getAllTeacher = async (req: Request, res: Response) => {
  try {
    const teachers = await teacherService.getAllTeacher({
      order: [['tc_id', 'ASC']],
      include: {
        model: School,
        as: 'tc_school',
        attributes: ['sc_id', 'sc_schoolName'],
      },
      attributes: { exclude: ['tc_password'] },
    })

    return successResponse(res, {
      message: 'Teacher List',
      data: {
        teachers,
      },
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Get one teacher
export const getTeacher = async (req: Request, res: Response) => {
  try {
    const { tc_id } = req.params
    const teacher = await teacherService.getTeacher({
      where: {
        tc_id,
      },
      include: {
        model: School,
        as: 'tc_school',
        attributes: ['sc_id', 'sc_schoolName'],
      },
      attributes: { exclude: ['tc_password'] },
    })

    if (!teacher)
      return notFoundResponse(res, { message: 'Teacher not founded' })

    return successResponse(res, {
      message: 'Teacher Details',
      data: {
        teacher,
      },
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Creating a New Teacher
export const createTeacher = async (req: Request, res: Response) => {
  try {
    let { body } = req
    let files = req.files as {
      [fieldname: string]: Express.Multer.File[]
    }

    // upload file
    body['tc_profilePic'] =
      files?.['tc_profilePic'] &&
      path.join(
        (req.table_name || 'common') as string,
        'tc_profilePic',
        files?.['tc_profilePic']?.[0]?.filename,
      )
    body['tc_degreeCertificate'] =
      files?.['tc_degreeCertificate'] &&
      path.join(
        (req.table_name || 'common') as string,
        'tc_degreeCertificate',
        files?.['tc_degreeCertificate']?.[0]?.filename,
      )

    // create encryptPassword
    body.tc_password = await encryptPassword(generatePassword())

    //  change empty fields to null-value
    setEmptyFieldsToNull(body)

    await teacherService.createTeacher(body)

    return successResponse(res, {
      message: 'Teacher added Successfully',
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Updating a Publisher
export const updatePublisher = async (req: Request, res: Response) => {
  try {
    let {
      body,
      params: { pb_id },
    } = req
    let files = req.files as {
      [fileldname: string]: Express.Multer.File[]
    }

    // update file
    body['pb_profilePic'] = files?.['pb_profilePic']?.[0]?.filename
      ? path.join(
          (req.table_name || 'common') as string,
          'pb_profilePic',
          files?.['pb_profilePic']?.[0]?.filename,
        )
      : body['pb_profilePic_old']

      let formData = {
        pb_fullName : req.body.fullName,
        pb_email : req.body.email,
        pb_phoneNumber : req.body.phoneNumber,
        pb_profilePic : req.body.pb_profilePic,
      }

    //  change empty fields to null-value
    setEmptyFieldsToNull(body)

    const publisher = await publisherService.updatePublisher(
      {
        where: {
          pb_id,
        },
      },
      formData,
    )

    return successResponse(res, {
      message: 'Publisher Updated Successfully',
      data: { publisher },
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Delete a teacher
export const deleteTeacher = async (req: Request, res: Response) => {
  try {
    const { tc_id } = req.params

    await teacherService.deleteTeacher({
      where: {
        tc_id,
      },
    })

    return successResponse(res, { message: 'Teacher Deleted Successfully' })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}
