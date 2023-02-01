import { Request, Response } from 'express'
import { kt_classRoom as classRoom } from '../../db/model/kt_classRoom'
import {
  studentService,
  classRoomService,
  studentAttendanceService,
} from '../../db/services'
import {
  internalServerErrorResponse,
  successResponse,
  notFoundResponse,
} from '../../util/apiResponse'
import path from 'path'
import { encryptPassword } from '../../util/encryptPassword'
import { setEmptyFieldsToNull, studentAttendance } from '../../util/common'

export const getAllStudentsFromSchool = async (req: Request, res: Response) => {
  try {
    const { sc_id }: any = req.body

    let students = await studentService.getAllStudents({
      where: { st_schoolId: sc_id },
      attributes: {
        exclude: ['st_password'],
      },
      order: [['st_id', 'ASC']],
      include: {
        model: classRoom,
        as: 'st_classRoom',
        attributes: ['cr_id', 'cr_class', 'cr_division'],
      },
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

// Get list of all student
export const getAllStudents = async (req: Request, res: Response) => {
  try {
    const { id }: any = req.token

    let students = await studentService.getAllStudents({
      where: { st_schoolId: id },
      attributes: {
        exclude: ['st_password'],
      },
      order: [['st_id', 'ASC']],
      include: {
        model: classRoom,
        as: 'st_classRoom',
        attributes: ['cr_id', 'cr_class', 'cr_division'],
      },
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

// Get list of all student from
export const getAllStudentsByTeacher = async (req: Request, res: Response) => {
  try {
    let { tc_classRoomId, sc_id }: any = req.body

    tc_classRoomId = JSON.parse(tc_classRoomId)
    console.log('tc_classRoomId : ', tc_classRoomId)
    console.log('sc_id : ', sc_id)

    let students = await studentService.getAllStudents({
      where: { st_schoolId: sc_id, st_classRoomId: tc_classRoomId },
      attributes: {
        exclude: ['st_password'],
      },
      order: [['st_id', 'ASC']],
      include: {
        model: classRoom,
        as: 'st_classRoom',
        attributes: ['cr_id', 'cr_class', 'cr_division'],
      },
    })

    return successResponse(res, {
      message: 'Student List',
      data: { students },
    })
  } catch (error: any) {
    console.log('error in tea : ', error)
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Get student by id
export const getStudentById = async (req: Request, res: Response) => {
  try {
    let { st_id } = req.params
    const { sc_id }: any = req.body

    const student = await studentService.getStudent({
      where: { st_id, st_schoolId: sc_id },
      attributes: {
        exclude: ['st_password'],
      },
      include: {
        model: classRoom,
        as: 'st_classRoom',
        attributes: ['cr_id', 'cr_class', 'cr_division'],
      },
    })

    if (!student) {
      return notFoundResponse(res, {
        message: 'Invalid Student Id',
      })
    }

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

    const { sc_id }: any = req.body
    const data1: any = req.token

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
    body.st_schoolId = sc_id

    //  change empty fields to null-value
    setEmptyFieldsToNull(body)

    // check ClassRoom Id and schoolId
    // if (body.st_classRoomId) {
    //   const classRoom = await classRoomService.getAllClassRooms({
    //     where: { cr_id: body.st_classRoomId, cr_schoolId: id },
    //   })

    //   if (!classRoom.length) {
    //     return notFoundResponse(res, { message: 'Invalid ClassRoom Id' })
    //   }
    // }

    const student = await studentService.createStudent(body)

    // create studentAttendance Row
    await studentAttendance(student, res)

    return successResponse(res, {
      message: 'Student added Successfully',
      data: {
        student,
      },
    })
  } catch (error: any) {
    console.log('studenterror', error)
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
    const { sc_id }: any = req.body

    //update file
    body['st_profilePic'] = files?.['st_profilePic']?.[0]?.filename
      ? path.join(
          (req.table_name || 'common') as string,
          'st_profilePic',
          files?.['st_profilePic']?.[0]?.filename,
        )
      : body['st_profilePic_old']

    if (body.st_password) {
      body.st_password = encryptPassword(body.st_password)
    }

    //  change empty fields to null-value
    setEmptyFieldsToNull(body)

    const student = await studentService.updateStudent(
      {
        where: { st_id, st_schoolId: sc_id },
      },
      body,
    )

    if (student[0] === 0) {
      return notFoundResponse(res, { message: 'Invalid Student Id' })
    }

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
      data: student,
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
    const { sc_id }: any = req.body

    const deleteStudent = await studentService.deleteStudent({
      where: { st_id, st_schoolId: sc_id },
    })

    if (deleteStudent === 0) {
      return notFoundResponse(res, {
        message: 'Invalid ClassRoom Id',
      })
    }

    return successResponse(res, {
      message: 'Student Deleted Successfully',
      data: { deleteStudent },
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}
