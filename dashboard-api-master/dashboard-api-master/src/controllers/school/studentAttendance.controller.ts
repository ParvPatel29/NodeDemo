import { Request, Response } from 'express'
import sequelize from 'sequelize'
import { Op } from 'sequelize'
import { kt_student as Student } from '../../db/model/kt_student'
import { studentAttendanceService } from '../../db/services'
import {
  internalServerErrorResponse,
  successResponse,
  notFoundResponse,
} from '../../util/apiResponse'
import { setEmptyFieldsToNull } from '../../util/common'

// Get list of all studentAttendance
export const getAllStudentAttendance = async (req: Request, res: Response) => {
  try {
    const { id }: any = req.token
    const { monthYear,sc_id }: any = req.query
    let studentAttendance =
      await studentAttendanceService.getAllStudentAttendances({
        where: [{ sa_schoolId: sc_id, monthYear: monthYear }],
        order: [['sa_id', 'ASC']],
        include: {
          model: Student,
          as: 'sa_student',
          attributes: ['st_id', 'st_fullName'],
        },
      })

    // let studentAttendanceArr: any = []
    // console.log('data111',studentAttendance)
    // for (let i = 0; i < studentAttendance.length; i++) {
    //   const attendanceRecord: any = studentAttendance[i]

    //   const filteredData = attendanceRecord?.sa_attendanceData?.filter(
    //     (item: any) => item.MonthYear === monthYear,
    //   )[0]

    //   studentAttendanceArr.push({
    //     sa_id: attendanceRecord.sa_id,
    //     sa_studentId: attendanceRecord.sa_studentId,
    //     sa_student: attendanceRecord.sa_student,
    //     sa_attendanceData: filteredData === undefined ? [] : filteredData,
    //   })
    // }

    return successResponse(res, {
      message: 'StudentAttendance List',
      data: { attendanceData: studentAttendance },
    })
  } catch (error: any) {
    console.log('errorattendance',error)
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Get studentAttendance by id
export const getStudentAttendanceById = async (req: Request, res: Response) => {
  try {
    let { sa_id } = req.params
    const { id }: any = req.token

    const studentAttendance =
      await studentAttendanceService.getStudentAttendance({
        where: { sa_id, sa_schoolId: id },
        include: {
          model: Student,
          as: 'sa_student',
          attributes: ['st_id', 'st_fullName'],
        },
      })

    if (!studentAttendance) {
      return notFoundResponse(res, {
        message: 'Invalid studentAttendance Id',
      })
    }

    return successResponse(res, {
      message: 'studentAttendance Details',
      data: {
        studentAttendance,
      },
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Create a new studentAttendance
export const createStudentAttendance = async (req: Request, res: Response) => {
  try {
    let data = req.body.attendanceData
    const { id }: any = req.token
    let body = JSON.parse(data)
    //  change empty fields to null-value
    setEmptyFieldsToNull(body)

    const studentAttendance =
      await studentAttendanceService.createStudentAttendance(body)

    return successResponse(res, {
      message: 'StudentAttendance added Successfully',
      data: {
        studentAttendance,
      },
    })
  } catch (error: any) {
    console.log('attenderror', error)
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Update a studentAttendance
export const updateStudentAttendance = async (req: Request, res: Response) => {
  try {
    const currentDate = new Date().getDate()

    const month = new Date().getMonth() + 1

    const year = new Date().getFullYear()
    const monthInString = new Date(year, month)

    const finalMonth = monthInString.toLocaleString('default', {
      month: 'long',
    })
    const finalYear = year

    const monthWithYear = `${finalMonth}, ${finalYear}`

    let data = req.body.attendanceData

    let attendanceData = JSON.parse(data)

    let responseData
    let createBulkData: any = []
    attendanceData.length > 0 &&
      attendanceData.map(async (item: any) => {
        createBulkData.push({
          sa_studentId: item.sa_studentId,
          sa_schoolId: item.sa_schoolId,
          monthYear: monthWithYear,
        })
        responseData = await studentAttendanceService.updateStudentAttendance(
          {
            where: [
              {
                sa_studentId: item.sa_studentId,
                monthYear: item.monthYear,
              },
            ],
          },
          item,
        )
      })

    // add next month data to studentattendance
    if (currentDate == 1) {
      await studentAttendanceService.createStudentAttendance(createBulkData)
    }

    return successResponse(res, {
      message: 'studentAttendance Updated Successfully',
      data: {
        responseData,
      },
    })

    // for (let index = 0; index < body.attendanceData.length; index++) {
    //   const studentData = body.attendanceData[index]
    //   const studentAttendance: any =
    //     await studentAttendanceService.getStudentAttendance({
    //       where: { sa_studentId: studentData.studentId },
    //     })

    //   let filteredData = studentAttendance.sa_attendanceData?.filter(
    //     (data: any) => data.MonthYear !== studentData.MonthYear,
    //   )
    //   const lastIndexofStudentArr =
    //     studentAttendance?.sa_attendanceData.length - 1

    //   let dateObj =
    //     studentAttendance?.sa_attendanceData[lastIndexofStudentArr].Date
    //   const date = studentData.Date
    //   let keys = Object.keys(date)
    //   let values = Object.values(date)
    //   dateObj[keys.toString()] = values.toString() === 'true' ? true : false

    //   filteredData.push({
    //     MonthYear: studentData.MonthYear,
    //     Date: dateObj,
    //   })
    //   const bodyData = {
    //     sa_attendanceData: filteredData,
    //   }
    //   const studentAttendances =
    //     await studentAttendanceService.updateStudentAttendance(
    //       {
    //         where: {
    //           sa_studentId: studentData.studentId,
    //           sa_schoolId: id,
    //         },
    //       },
    //       bodyData,
    //     )
    //   studentAttendanceArr.push(studentAttendances)
    // }
    // return successResponse(res, {
    //   message: 'studentAttendance Updated Successfully',
    //   data: {
    //     studentAttendanceArr,
    //   },
    // })
  } catch (error: any) {
    console.log('error111', error)
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Delete a studentAttendance
export const deleteStudentAttendance = async (req: Request, res: Response) => {
  try {
    let { sa_id } = req.params
    const { id }: any = req.token

    const deleteStudentAttendance =
      await studentAttendanceService.deleteStudentAttendance({
        where: { sa_id, sa_schoolId: id },
      })

    if (deleteStudentAttendance === 0) {
      return notFoundResponse(res, {
        message: 'Invalid ClassRoom Id',
      })
    }

    return successResponse(res, {
      message: 'Attendance Deleted Successfully',
      data: { deleteStudentAttendance },
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}
