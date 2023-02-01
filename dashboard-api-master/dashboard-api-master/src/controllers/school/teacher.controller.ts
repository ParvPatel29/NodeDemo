import { Request, Response } from 'express'
import path from 'path'

import { authService, teacherService } from '../../db/services'
import {
  internalServerErrorResponse,
  notFoundResponse,
  successResponse,
  unauthorizedResponse,
} from '../../util/apiResponse'
import { setEmptyFieldsToNull } from '../../util/common'
import { encryptPassword } from '../../util/encryptPassword'
import { generatePassword } from '../../util/generatePassword'
import { Op } from 'sequelize'
import { generateToken } from '../../auth/common/generateToken'
import md5 from 'md5'
import { kt_school as School } from '../../db/model/kt_school'
import { kt_classRoom as classRoom } from '../../db/model/kt_classRoom'

// Login Teacher
export const loginTeacher = async (req: Request, res: Response) => {
  try {
    const { userName, password } = req.body

    const teacher = await teacherService.getTeacher({
      where: {
        [Op.or]: {
          tc_email: userName,
          // tc_schoolName: userName,
        },
      },
      include: {
        model: School,
        as: 'tc_school',
        attributes: ['sc_id', 'sc_schoolName'],
      },
    })

    if (teacher?.tc_status === false) {
      return unauthorizedResponse(res, {
        message: 'Invalid teacher Status',
      })
    }

    if (!teacher) {
      return notFoundResponse(res, {
        message: 'Invalid Username',
      })
    }

    if (!(teacher.tc_password === md5(password))) {
      return notFoundResponse(res, {
        message: 'Invalid Password',
      })
    }

    // Generate Token
    let accessToken: any = generateToken({
      id: teacher.tc_id,
      userName: userName,
    })
    // teacherDetails Obj
    const teacherDetails: {
      teacher: object | any
      token: string | any
      sc_id: number
    } = {
      teacher,
      token: accessToken,
      sc_id: teacher.tc_schoolId,
    }
    delete teacherDetails.teacher.dataValues.sc_password

    // addToken in database
    const tokenObj: {
      kn_userId: number
      kn_token: string
      kn_type: string
    } = {
      kn_userId: teacher.tc_id,
      kn_token: accessToken,
      kn_type: 'dash_teacher',
    }

    if (teacher) {
      await authService.createToken(tokenObj)
    }

    return successResponse(res, {
      message: 'Teacher Login Successful',
      data: teacherDetails,
    })
  } catch (error: any) {
    console.log('teacherloginerror', error)
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

export const logoutTeacher = async (req: Request, res: Response) => {
  try {
    const token = req.headers['authorization']?.substr(7)

    await authService.deleteToken({
      where: { kn_token: token, kn_type: 'dash_teacher' },
    })

    return successResponse(res, {
      message: 'You have been logged out successfully',
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}
// Get All Teacher
export const getAllTeacherBySchool = async (req: Request, res: Response) => {
  try {
    // const tc_schoolId = req.token?.id
    const { sc_id }: any = req.query
    const teachers = await teacherService.getAllTeacher({
      where: { tc_schoolId: sc_id, tc_status: true },
      order: [['tc_id', 'ASC']],
      attributes: { exclude: ['tc_password'] },
      // include: {
      //   model: classRoom,
      //   as: 'tc_classRoom',
      //   attributes: ['cr_id', 'cr_class', 'cr_division'],
      // },
    })

    return successResponse(res, {
      message: 'Teacher List',
      data: {
        teachers,
      },
    })
  } catch (error: any) {
    console.log('errorofteacher', error)
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}
// Get All Teacher
export const getAllTeacher = async (req: Request, res: Response) => {
  try {
    const tc_schoolId = req.token?.id
    const teachers = await teacherService.getAllTeacher({
      where: { tc_schoolId, tc_status: true },
      order: [['tc_id', 'ASC']],
      attributes: { exclude: ['tc_password'] },
      // include: {
      //   model: classRoom,
      //   as: 'tc_classRoom',
      //   attributes: ['cr_id', 'cr_class', 'cr_division'],
      // },
    })

    return successResponse(res, {
      message: 'Teacher List',
      data: {
        teachers,
      },
    })
  } catch (error: any) {
    console.log('errorofteacher', error)
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}
// Get One Teacher By School
export const getTeacherBySchool = async (req: Request, res: Response) => {
  try {
    const { tc_id } = req.params

    const { sc_id }: any = req.query

    const teacher = await teacherService.getTeacher({
      where: {
        tc_id,
        tc_schoolId: sc_id,
      },
      attributes: { exclude: ['tc_password'] },
      // include: {
      //   model: classRoom,
      //   as: 'tc_classRoom',
      //   attributes: ['cr_id', 'cr_class', 'cr_division'],
      // },
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
    console.log('errorofteacher', error)
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Get one teacher
export const getTeacher = async (req: Request, res: Response) => {
  try {
    const { tc_id } = req.params
    const { id }: any = req.token
    const teacher = await teacherService.getTeacher({
      where: {
        tc_id,
        tc_schoolId: id,
      },
      attributes: { exclude: ['tc_password'] },
      // include: {
      //   model: classRoom,
      //   as: 'tc_classRoom',
      //   attributes: ['cr_id', 'cr_class', 'cr_division'],
      // },
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
    console.log('errorgetTeacher', error)
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

    const { id }: any = req.token

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
    let data = body['tc_subject']
    let tc_subjects = data.split(',')
    body['tc_subject'] = tc_subjects

    let clId = body['tc_classRoomId']
    let tc_clIds = clId.split(',')
    body['tc_classRoomId'] = tc_clIds
    // create encryptPassword
    body.tc_password = encryptPassword(generatePassword())
    body.tc_schoolId = id

    //  change empty fields to null-value
    setEmptyFieldsToNull(body)

    await teacherService.createTeacher(body)

    return successResponse(res, {
      message: 'Teacher added Successfully',
    })
  } catch (error: any) {
    console.log('errorcreateTeacher', error)
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Updating a teacher
export const updateTeacher = async (req: Request, res: Response) => {
  try {
    let {
      body,
      params: { tc_id },
    } = req
    let files = req.files as {
      [fileldname: string]: Express.Multer.File[]
    }

    const { id }: any = req.token

    // update file
    body['tc_profilePic'] = files?.['tc_profilePic']?.[0]?.filename
      ? path.join(
          (req.table_name || 'common') as string,
          'tc_profilePic',
          files?.['tc_profilePic']?.[0]?.filename,
        )
      : body['tc_profilePic_old']
    body['tc_degreeCertificate'] = files?.['tc_degreeCertificate']?.[0]
      ?.filename
      ? path.join(
          (req.table_name || 'common') as string,
          'tc_degreeCertificate',
          files?.['tc_degreeCertificate']?.[0]?.filename,
        )
      : body['tc_degreeCertificate_old']

    let data = body['tc_subject']
    let tc_subjects = data.split(',')
    body['tc_subject'] = tc_subjects

    let clId = body['tc_classRoomId']
    let tc_clIds = clId.split(',')
    body['tc_classRoomId'] = tc_clIds
    //  change empty fields to null-value
    setEmptyFieldsToNull(body)

    const teacher = await teacherService.updateTeacher(
      {
        where: {
          tc_id,
          tc_schoolId: id,
        },
      },
      body,
    )

    if (teacher[0] === 0) {
      return notFoundResponse(res, { message: 'Invalid Teacher Id' })
    }

    return successResponse(res, {
      message: 'Teacher Updated Successfully',
      data: { teacher },
    })
  } catch (error: any) {
    console.log('errorupdateTeacher', error)
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Updating a teacher By School
export const updateTeacherBySchool = async (req: Request, res: Response) => {
  try {
    let {
      body,
      params: { tc_id },
    } = req

    let { sc_id }: any = req.query
    let files = req.files as {
      [fileldname: string]: Express.Multer.File[]
    }

    // update file
    body['tc_profilePic'] = files?.['tc_profilePic']?.[0]?.filename
      ? path.join(
          (req.table_name || 'common') as string,
          'tc_profilePic',
          files?.['tc_profilePic']?.[0]?.filename,
        )
      : body['tc_profilePic_old']
    body['tc_degreeCertificate'] = files?.['tc_degreeCertificate']?.[0]
      ?.filename
      ? path.join(
          (req.table_name || 'common') as string,
          'tc_degreeCertificate',
          files?.['tc_degreeCertificate']?.[0]?.filename,
        )
      : body['tc_degreeCertificate_old']
    let data = body['tc_subject']
    let tc_subjects = data.split(',')
    body['tc_subject'] = tc_subjects

    let clId = body['tc_classRoomId']
    let tc_clIds = clId.split(',')
    body['tc_classRoomId'] = tc_clIds

    //  change empty fields to null-value
    setEmptyFieldsToNull(body)

    const teacher = await teacherService.updateTeacher(
      {
        where: {
          tc_id,
          tc_schoolId: sc_id,
        },
      },
      body,
    )

    if (teacher[0] === 0) {
      return notFoundResponse(res, { message: 'Invalid Teacher Id' })
    }

    return successResponse(res, {
      message: 'Teacher Updated Successfully',
      data: { teacher },
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
    const { id }: any = req.token

    const deleteTeacher = await teacherService.deleteTeacher({
      where: {
        tc_id,
        tc_schoolId: id,
      },
    })

    if (deleteTeacher === 0) {
      return notFoundResponse(res, {
        message: 'Invalid Teacher Id',
      })
    }

    return successResponse(res, { message: 'Teacher Deleted Successfully' })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}
