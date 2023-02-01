import { Request, Response } from 'express'
import path from 'path'
import { kt_classRoom as ClassRoom } from '../../db/model/kt_classRoom'
import { kt_school as School } from '../../db/model/kt_school'
import { studentService } from '../../db/services'
import {
  internalServerErrorResponse,
  successResponse,
} from '../../util/apiResponse'
import { setEmptyFieldsToNull, studentAttendance } from '../../util/common'
import { encryptPassword } from '../../util/encryptPassword'

// Get list of all student
export const getAllStudents = async (req: Request, res: Response) => {
  try {
    let students = await studentService.getAllStudents({
      attributes: {
        exclude: ['st_password'],
      },
      order: [['st_id', 'ASC']],
      include: [
        {
          model: ClassRoom,
          as: 'st_classRoom',
          attributes: ['cr_id', 'cr_class', 'cr_division'],
        },
        {
          model: School,
          as: 'st_school',
          attributes: ['sc_id', 'sc_schoolName'],
        },
      ],
    })

    return successResponse(res, {
      message: 'Student List',
      data: { students },
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Get student by id
export const getStudentById = async (req: Request, res: Response) => {
  try {
    let { st_id } = req.params
    const student = await studentService.getStudent({
      where: {
        st_id,
      },
      attributes: {
        exclude: ['st_password'],
      },
      include: [
        {
          model: ClassRoom,
          as: 'st_classRoom',
          attributes: ['cr_id', 'cr_class', 'cr_division'],
        },
        {
          model: School,
          as: 'st_school',
          attributes: ['sc_id', 'sc_schoolName'],
        },
      ],
    })

    return successResponse(res, {
      message: 'Student Details',
      data: {
        student,
      },
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Create a new student
export const createStudent = async (req: Request, res: Response) => {
  try {
    let body = req.body
    let files = req.files as {
      [fieldname: string]: Express.Multer.File[]
    }

    // upload file
    body['st_profilePic'] =
      files?.['st_profilePic'] &&
      path.join(
        (req.table_name || 'common') as string,
        'st_profilePic',
        files?.['st_profilePic']?.[0]?.filename,
      )

    // create encryptPassword
    body.st_password = encryptPassword(body.st_password)

    //  change empty fields to null-value
    setEmptyFieldsToNull(body)

    const student = await studentService.createStudent(body)

    await studentAttendance(student, res)

    return successResponse(res, {
      message: 'Student added Successfully',
      data: {
        student,
      },
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Update a student
export const updateStudent = async (req: Request, res: Response) => {
  try {
    let st_id = req.params.st_id as unknown as number
    let body = req.body
    let files = req.files as {
      [fieldname: string]: Express.Multer.File[]
    }

    //update file
    body['st_profilePic'] = files?.['st_profilePic']?.[0]?.filename
      ? path.join(
          (req.table_name || 'common') as string,
          'st_profilePic',
          files?.['st_profilePic']?.[0]?.filename,
        )
      : body['st_profilePic_old']

    if (body.st_password) {
      body.st_password = await encryptPassword(body.st_password)
    }

    //  change empty fields to null-value
    setEmptyFieldsToNull(body)

    const student = await studentService.updateStudent(
      {
        where: {
          st_id,
        },
      },
      body,
    )

    return successResponse(res, {
      message: 'Student Updated Successfully',
      data: {
        student,
      },
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Update a student status
export const updateStudentStatus = async (req: Request, res: Response) => {
  try {
    let st_id = req.params.st_id as unknown as number
    let st_status = req.params.st_status as unknown as boolean

    const student = await studentService.updateStudent(
      {
        where: {
          st_id,
        },
      },
      {
        st_status,
      },
    )

    return successResponse(res, {
      message: 'Student Status Updated Successfully',
      data: {
        student,
      },
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Delete a student
export const deleteStudent = async (req: Request, res: Response) => {
  try {
    let { st_id } = req.params

    await studentService.deleteStudent({
      where: {
        st_id,
      },
    })

    return successResponse(res, {
      message: 'Student Deleted Successfully',
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}
