import { Request, Response } from 'express'
import { kt_student as Student } from '../../db/model/kt_student'
import { kt_teacher as Teacher } from '../../db/model/kt_teacher'
import {
  studentRemarkService,
  studentService,
  teacherService,
} from '../../db/services'
import {
  internalServerErrorResponse,
  notFoundResponse,
  successResponse,
} from '../../util/apiResponse'

// Get All Remark
export const getAllStudentRemarks = async (req: Request, res: Response) => {
  try {
    const sr_schoolId = req.token?.id
    const studentRemark = await studentRemarkService.getAllStudentRemark({
      where: { sr_schoolId },
      order: [['sr_id', 'ASC']],
      include: [
        {
          model: Student,
          as: 'sr_student',
          attributes: ['st_id', 'st_fullName'],
        },
        {
          model: Teacher,
          as: 'sr_teacher',
          attributes: ['tc_id', 'tc_fullName'],
        },
      ],
    })

    return successResponse(res, {
      message: 'Studentremark List',
      data: {
        studentRemark,
      },
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Get one Remark
export const getStudentRemark = async (req: Request, res: Response) => {
  try {
    const { sr_id } = req.params
    const { id }: any = req.token

    const studentRemark = await studentRemarkService.getStudentRemark({
      where: {
        sr_id,
        sr_schoolId: id,
      },
    })

    if (!studentRemark)
      return notFoundResponse(res, { message: 'Studentremark not founded' })

    return successResponse(res, {
      message: 'Studentremark Details',
      data: {
        studentRemark,
      },
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Get one Remark By Student
export const getStudentRemarkByStudent = async (
  req: Request,
  res: Response,
) => {
  try {
    const { st_id }: any = req.query

    const studentRemark = await studentRemarkService.getStudentRemark({
      where: {
        sr_studentId: st_id,
      },
    })

    if (!studentRemark)
      return res.status(200).json({
        status: false,
        message: 'Student Remark Not Found',
        isFound: false,
      })

    return res.status(200).json({
      message: 'Studentremark Details',
      data: {
        studentRemark,
      },
      isFound: true,
    })
  } catch (error: any) {
    console.log('errorgetStudentRemarkByStudent', error)
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Creating a New Remark
export const createStudentRemark = async (req: Request, res: Response) => {
  try {
    let { body } = req

    const { id }: any = req.token

    body.sr_schoolId = id

    // check Teacher Id and schoolId
    const teacher = await teacherService.getTeacher({
      where: { tc_id: body.sr_teacherId, tc_schoolId: id },
    })

    if (!teacher) {
      return notFoundResponse(res, { message: 'Invalid Teacher Id' })
    }

    // check Student Id and schoolId
    const student = await studentService.getAllStudents({
      where: { st_id: body.sr_studentId, st_schoolId: id },
    })

    if (!student.length) {
      return notFoundResponse(res, { message: 'Invalid Student Id' })
    }

    await studentRemarkService.createStudentRemark(body)

    return successResponse(res, {
      message: 'Studentremark added Successfully',
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Creating a New Remark By Student
export const createStudentRemarkByStudent = async (
  req: Request,
  res: Response,
) => {
  try {
    let { body } = req

    const { sc_id }: any = req.query
    body.sr_schoolId =  parseInt(sc_id)

    // check Teacher id and schoolId
    const teacher = await teacherService.getTeacher({
      where: { tc_id: body.sr_teacherId, tc_schoolId: parseInt(sc_id) },
    })

    if (!teacher) {
      return notFoundResponse(res, { message: 'Invalid Teacher Id' })
    }
    await studentRemarkService.createStudentRemark(body)

    return successResponse(res, {
      message: 'Studentremark added Successfully',
    })
  } catch (error: any) {
    console.log('errorcreateStudentRemarkByStudent', error)
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Updating a Remark
export const updateStudentRemark = async (req: Request, res: Response) => {
  try {
    let {
      body,
      params: { sr_id },
    } = req

    const { id }: any = req.token

    if (body.sr_studentId || body.sr_teacherId) {
      // check teacherid in current schoolid
      const teacher = await teacherService.getTeacher({
        where: { tc_id: body.sr_teacherId, tc_schoolId: id },
      })

      if (!teacher) {
        return notFoundResponse(res, { message: 'Invalid Teacher Id' })
      }

      // check studentid in current schoolid
      const student = await studentService.getStudent({
        where: { st_id: body.sr_studentId, st_schoolId: id },
      })

      if (!student) {
        return notFoundResponse(res, { message: 'Invalid Student Id' })
      }
    }

    const studentRemark = await studentRemarkService.updateStudentRemark(
      {
        where: {
          sr_id,
          sr_schoolId: id,
        },
      },
      body,
    )

    if (studentRemark[0] === 0) {
      return notFoundResponse(res, { message: 'Invalid Studentremark Id' })
    }

    return successResponse(res, {
      message: 'Studentremark Updated Successfully',
      data: { studentRemark },
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Updating a Remark By Student
export const updateStudentRemarkByStudent = async (
  req: Request,
  res: Response,
) => {
  try {
    let {
      body,
      params: { sr_id },
    } = req

    const { sc_id }: any = req.query

    if (body.sr_studentId || body.sr_teacherId) {
      // check teacherid in current schoolid
      const teacher = await teacherService.getTeacher({
        where: { tc_id: body.sr_teacherId, tc_schoolId: sc_id },
      })

      if (!teacher) {
        return notFoundResponse(res, { message: 'Invalid Teacher Id' })
      }

      // check studentid in current schoolid
      const student = await studentService.getStudent({
        where: { st_id: body.sr_studentId, st_schoolId: sc_id },
      })

      if (!student) {
        return notFoundResponse(res, { message: 'Invalid Student Id' })
      }
    }

    const studentRemark = await studentRemarkService.updateStudentRemark(
      {
        where: {
          sr_id,
          sr_schoolId: sc_id,
        },
      },
      body,
    )

    if (studentRemark[0] === 0) {
      return notFoundResponse(res, { message: 'Invalid Studentremark Id' })
    }

    return successResponse(res, {
      message: 'Studentremark Updated Successfully',
      data: { studentRemark },
    })
  } catch (error: any) {
    console.log('errorupdateStudentRemarkByStudent',error)
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Delete a Remark
export const deleteStudentRemark = async (req: Request, res: Response) => {
  try {
    const { sr_id } = req.params
    const { id }: any = req.token

    const deleteRemark = await studentRemarkService.deleteStudentRemark({
      where: {
        sr_id,
        sr_schoolId: id,
      },
    })

    if (deleteRemark === 0) {
      return notFoundResponse(res, {
        message: 'Invalid Studentremark Id',
      })
    }

    return successResponse(res, {
      message: 'Studentremark Deleted Successfully',
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}
