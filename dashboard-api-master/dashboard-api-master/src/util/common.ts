import { studentAttendanceService } from '../db/services'
import { internalServerErrorResponse } from './apiResponse'
import { Response } from 'express'
import { DateObj, months } from './constants'

// common subString value
export const separateString = (
  val: string,
  firstNumber: number,
  secondNumber?: number,
) => {
  if (firstNumber) {
    const substring = val.slice(firstNumber)
    const finalString = joinString(substring)
    return finalString
  } else if (firstNumber || secondNumber) {
    const substring = val.slice(firstNumber, secondNumber)
    const finalString = joinString(substring)
    return finalString
  }
}

// common Random Array value
export const commonRandomArray = (array: any) => {
  let arrayOfindex: any = Math.floor(Math.random() * array.length)
  const randomArray = array.at(arrayOfindex)
  return randomArray
}

export const setEmptyFieldsToNull = (object: object | any) => {
  Object.keys(object).forEach((key) => {
    if (object[key] === '') {
      object[key] = null
    }
  })
}

// split string convert to join string
export const joinString = (value: string) => {
  let string = value
  let splitVal = string.split(' ')
  let joinString = splitVal.join('')
  return joinString
}
export const studentAttendance = async (student: any, res: Response) => {
  try {
    const d = new Date()
    const month = months[d.getMonth()]
    const year = d.getFullYear()

    const monthYear = month + ', ' + year

    const attendanceObj: any = {
      sa_studentId: student.st_id,
      sa_schoolId: student.st_schoolId,
      sa_attendanceData: [
        {
          MonthYear: monthYear,
          Date: DateObj,
        },
      ],
      monthYear : monthYear
    }

    const res = await studentAttendanceService.createStudentAttendanceFromStudent(attendanceObj)

  } catch (error: any) {
    internalServerErrorResponse(res, { message: error.message })
  }
}
