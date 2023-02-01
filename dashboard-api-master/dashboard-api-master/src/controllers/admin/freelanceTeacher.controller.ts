import { Request, Response } from 'express'
import path from 'path'
import { freelanceTeacherService } from '../../db/services'
import {
  internalServerErrorResponse,
  successResponse,
} from '../../util/apiResponse'
import { setEmptyFieldsToNull } from '../../util/common'
import { encryptPassword } from '../../util/encryptPassword'
import { generatePassword } from '../../util/generatePassword'

// Get list of all freelance-teacher
export const getAllFreelanceTeachers = async (req: Request, res: Response) => {
  try {
    const freelanceTeachers =
      await freelanceTeacherService.getAllFreelanceTeachers({
        attributes: {
          exclude: ['ft_password'],
        },
        order: [['ft_id', 'ASC']],
      })

    return successResponse(res, {
      message: 'Freelance Teacher List',
      data: {
        freelanceTeachers,
      },
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Get freelance-teacher by id
export const getFreelanceTeacherById = async (req: Request, res: Response) => {
  try {
    let { ft_id } = req.params
    const freelanceTeacher = await freelanceTeacherService.getFreelanceTeacher({
      where: {
        ft_id,
      },
      attributes: {
        exclude: ['ft_password'],
      },
    })

    return successResponse(res, {
      message: 'Freelance Teacher Details',
      data: {
        freelanceTeacher,
      },
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Create a new freelance-teacher
export const createFreelanceTeacher = async (req: Request, res: Response) => {
  try {
    let body = req.body
    let files = req.files as {
      [fieldname: string]: Express.Multer.File[]
    }

    // upload file
    body['ft_profilePic'] =
      files?.['ft_profilePic'] &&
      path.join(
        (req.table_name || 'common') as string,
        'ft_profilePic',
        files?.['ft_profilePic']?.[0]?.filename,
      )
    body['ft_degreeCertificate'] =
      files?.['ft_degreeCertificate'] &&
      path.join(
        (req.table_name || 'common') as string,
        'ft_degreeCertificate',
        files?.['ft_degreeCertificate']?.[0]?.filename,
      )

    body.ft_password = await encryptPassword(generatePassword())

    //  change empty fields to null-value
    setEmptyFieldsToNull(body)

    const freelanceTeacher =
      await freelanceTeacherService.createFreelanceTeacher(body)

    return successResponse(res, {
      message: 'Freelance Teacher added Successfully',
      data: {
        freelanceTeacher,
      },
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Update a freelance-teacher
export const updateFreelanceTeacher = async (req: Request, res: Response) => {
  try {
    let ft_id = req.params.ft_id as unknown as number
    let body = req.body

    let files = req.files as {
      [fieldname: string]: Express.Multer.File[]
    }
    //update file
    body['ft_profilePic'] = files?.['ft_profilePic']?.[0]?.filename
      ? path.join(
          (req.table_name || 'common') as string,
          'ft_profilePic',
          files?.['ft_profilePic']?.[0]?.filename,
        )
      : body['ft_profilePic_old']
    body['ft_degreeCertificate'] = files?.['ft_degreeCertificate']?.[0]
      ?.filename
      ? path.join(
          (req.table_name || 'common') as string,
          'ft_degreeCertificate',
          files?.['ft_degreeCertificate']?.[0]?.filename,
        )
      : body['ft_degreeCertificate_old']

    body.ft_password = await encryptPassword(generatePassword())

    //  change empty fields to null-value
    setEmptyFieldsToNull(body)

    const freelanceTeacher =
      await freelanceTeacherService.updateFreelanceTeacher(
        {
          where: {
            ft_id,
          },
        },
        body,
      )

    return successResponse(res, {
      message: 'Freelance Teacher Updated Successfully',
      data: {
        freelanceTeacher,
      },
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Update a freelance-teacher status
export const updateFreelanceTeacherStatus = async (
  req: Request,
  res: Response,
) => {
  try {
    let ft_id = req.params.ft_id as unknown as number
    let ft_status = req.params.ft_status as unknown as boolean

    const freelanceTeacher =
      await freelanceTeacherService.updateFreelanceTeacher(
        {
          where: {
            ft_id,
          },
        },
        {
          ft_status,
        },
      )

    return successResponse(res, {
      message: 'Freelance Teacher Status Updated Successfully',
      data: {
        freelanceTeacher,
      },
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Delete a freelance-teacher
export const deleteFreelanceTeacher = async (req: Request, res: Response) => {
  try {
    let { ft_id } = req.params

    await freelanceTeacherService.deleteFreelanceTeacher({
      where: {
        ft_id,
      },
    })

    return successResponse(res, {
      message: 'Freelance Teacher Deleted Successfully',
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}
