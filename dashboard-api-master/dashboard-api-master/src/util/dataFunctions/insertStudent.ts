import { readJsonFile } from './convertCsvToJson'
import { Request, Response } from 'express'
import {
  internalServerErrorResponse,
  notFoundResponse,
  successResponse,
} from '../apiResponse'
import { schoolService, studentService } from '../../db/services'
import { kt_studentCreationAttributes as StudentCreationAttributes } from '../../db/model/kt_student'
import { encryptPassword } from '../encryptPassword'
import { generatePassword } from '../generatePassword'
import { separateString } from '../common'

export const insertStudent = async (req: Request, res: Response) => {
  try {
    const studentListFromCSV = await readJsonFile('student.csv')

    // Processing an list as per DB  Requirements
    let existStudentList: string[] = []
    let createStudentList: string | any[] = []

    for (let index = 0; index < studentListFromCSV.length; index++) {
      const student = studentListFromCSV[index]

      // combination of firstName and secondName
      const studentFullName = `${student['First Name']} ${student['Second Name']}`
      const parentFullName = `${student["Parent's/Guardian  First Name"]} ${student["Parent's/Guardian  Second Name"]}`

      // check the student is already exist in database
      const isStudentExist = await studentService.getStudent({
        where: { st_studentId: student['Student Index Number'] },
      })

      // find schoolId by name of school
      const isSchool = await schoolService.getSchool({
        where: { sc_schoolName: student['Name of School'] },
      })

      if (isStudentExist) {
        existStudentList.push(studentFullName)
      } else {
        if (!isSchool) {
          return notFoundResponse(res, { message: 'School Not found' })
        } else {
          const studentObj: StudentCreationAttributes = {
            st_schoolId: isSchool?.sc_id as number,
            st_classRoomId:
              student['Class'] == ''
                ? null
                : (parseInt(student['Class']) as any),
            st_email:
              student['GES Student email Address'] === ''
                ? null
                : (student['GES Student email Address'] as any),
            st_altEmail:
              student['Other email Address'] === ''
                ? null
                : (student['Other email Address'] as string | any),
            st_parentName: parentFullName as string,
            st_fullName: studentFullName as string,
            st_parentEmail:
              student['Parents/Guardian email Address'] === ''
                ? null
                : (student['Parents/Guardian email Address'] as string | any),
            st_phoneNumber:
              student['Contact Number'] === ''
                ? null
                : student['Contact Number'].length === 12
                ? 0 +
                  (separateString(student['Contact Number'], 3) as string | any)
                : (separateString(student['Contact Number'], 3) as
                    | string
                    | any),
            st_areaOfStudy:
              student['Area of Study'] === ''
                ? null
                : (student['Area of Study'] as string | any),
            st_curricularActivities:
              student['Curricular Activities'] === ''
                ? null
                : (student['Curricular Activities'] as string | any),
            st_address:
              student['address'] === ''
                ? null
                : (student['address'] as String | any),
            st_profilePic:
              student['profilePic'] === ''
                ? null
                : (student['profilePic'] as string | any),
            st_password: encryptPassword(generatePassword()) as string,
            st_region: (student['Region'] === 'N/A'
              ? null
              : student['Region']) as string,
            st_district: (student['District'] === 'N/A'
              ? null
              : student['District']) as string,
            st_circuit: (student['Circuit'] === 'N/A'
              ? null
              : student['Circuit']) as string,
            st_studentId: student['Student Index Number'] as string,
            st_countryCode: separateString(student['Contact Number'], 0, 3) as
              | number
              | undefined,
          }
          // create a new student from csv file
          const studentCreated = await studentService.createStudent(studentObj)
          if (studentCreated) {
            createStudentList.push(studentFullName)
          } else {
            existStudentList.push(studentFullName)
          }
        }
      }
    }

    return successResponse(res, {
      message: 'Student Added Successfully',
      data: { createStudentList, existStudentList },
    })
  } catch (error) {
    console.log(error)
    return internalServerErrorResponse(res, {
      message: 'Error in student insertion',
      error,
    })
  }
}
