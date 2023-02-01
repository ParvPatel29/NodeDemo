import { readJsonFile } from './convertCsvToJson'
import { Request, Response } from 'express'
import {
  internalServerErrorResponse,
  notFoundResponse,
  successResponse,
} from '../apiResponse'
import { schoolService, teacherService } from '../../db/services'
import { kt_teacherCreationAttributes as TeacherCreationAttributes } from '../../db/model/kt_teacher'
import { encryptPassword } from '../encryptPassword'
import { generatePassword } from '../generatePassword'
import { separateString } from '../common'
// import { separateString } from '../common'

export const insertTeacher = async (req: Request, res: Response) => {
  try {
    const teacherListFromCSV = await readJsonFile('Teacher.csv')

    // Processing an list as per DB  Requirements
    let teacherExist: string[] = []
    let createdTeacherList: string | any[] = []

    for (let index = 0; index < teacherListFromCSV.length; index++) {
      const teacher = teacherListFromCSV[index]

      // combination of firstName and secondName
      const teacherFullName = `${teacher['First Name']} ${teacher['Second Name']}`

      // check the teacher is already exist in dataBase
      const isTeacherExist = await teacherService.getTeacher({
        where: { tc_email: teacher['GES email Address'] },
      })

      // find schoolId by name of school
      const isSchool = await schoolService.getSchool({
        where: { sc_schoolName: teacher['Name of School'] },
      })

      if (isTeacherExist) {
        teacherExist.push(teacherFullName)
      } else {
        if (!isSchool) {
          return notFoundResponse(res, { message: 'School Not found' })
        } else {
          const teacherObj: TeacherCreationAttributes = {
            tc_schoolId: isSchool?.sc_id as number,
            tc_fullName: teacherFullName as string,
            tc_email:
              teacher['GES email Address'] === ''
                ? null
                : (teacher['GES email Address'] as string | any),
            tc_staffId:
              teacher['Staff ID'] === ''
                ? null
                : (teacher['Staff ID'] as string | any),
            tc_phoneNumber:
              teacher['Contact Number'] === ''
                ? null
                : teacher['Contact Number'].length === 12
                ? 0 +
                  (separateString(teacher['Contact Number'], 3) as string | any)
                : (separateString(teacher['Contact Number'], 3) as
                    | string
                    | any),
            tc_address:
              teacher['address'] === ''
                ? null
                : (teacher['address'] as string | any),
            tc_profilePic:
              teacher['profilePic'] === ''
                ? null
                : (teacher['profilePic'] as string | any),
            tc_degreeCertificate:
              teacher['degreeCertificate'] === ''
                ? null
                : (teacher['degreeCertificate'] as string | any),
            tc_password: encryptPassword(generatePassword()) as string,
            tc_region: (teacher['Region'] === 'N/A'
              ? null
              : teacher['Region']) as string,
            tc_district: (teacher['District'] === 'N/A'
              ? null
              : teacher['District']) as string,
            tc_circuit: (teacher['Circuit'] === 'N/A'
              ? null
              : teacher['Circuit']) as string,
            tc_altEmail:
              teacher['Other email Address'] === ''
                ? null
                : (teacher['Other email Address'] as string | any),
            tc_countryCode: separateString(teacher['Contact Number'], 0, 3) as
              | number
              | undefined,
          }

          // create a new teacher from csv file
          const createTeacher = await teacherService.createTeacher(teacherObj)
          if (createTeacher) {
            createdTeacherList.push(teacherFullName)
          } else {
            teacherExist.push(teacherFullName)
          }
        }
      }
    }

    return successResponse(res, {
      message: 'Teacher Added Successfully',
      data: { createdTeacherList, teacherExist },
    })
  } catch (error) {
    return internalServerErrorResponse(res, {
      message: 'Error in teacher insertion',
      error,
    })
  }
}
