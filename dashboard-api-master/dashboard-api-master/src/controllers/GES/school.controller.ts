import { Request, Response } from 'express'
import { kt_school } from '../../db/model/kt_school'
import {
  areaService,
  schoolService,
  studentService,
  teacherService,
} from '../../db/services'
import {
  internalServerErrorResponse,
  notFoundResponse,
  successResponse,
} from '../../util/apiResponse'

// Get list of all schools
export const getAllSchool = async (req: Request, res: Response) => {
  try {
    const { ar_id }: any = req.query

    const area = await areaService.getAllArea({ where: { ar_id }, raw: true })

    let areaTitle: string = ''
    let schoolArray = []

    area.map((area) => {
      areaTitle = area.ar_title
    })

    const schools = await schoolService.getAllSchool({
      where: { sc_circuit: areaTitle },
      order: [['sc_id', 'ASC']],
      attributes: { exclude: ['sc_password'] },
    })

    for (let index = 0; index < schools.length; index++) {
      let school: any = schools[index]
      let schoolId = school.sc_id

      // Count Number Of students
      let numberOfStudents = await studentService.countStudent({
        where: { st_schoolId: schoolId },
      })
      // Count Number Of Teachers
      let numberOfTeacher = await teacherService.countTeacher({
        where: { tc_schoolId: schoolId },
      })

      // number of teacher and student
      schoolId
        ? ((school.dataValues.sc_students = numberOfStudents),
          (school.dataValues.sc_teachers = numberOfTeacher))
        : ((school.dataValues.sc_students = 'numberOfStudents'),
          (school.dataValues.sc_teachers = 'numberOfTeacher'))
    }

    return successResponse(res, {
      message: 'School List',
      data: { schools },
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Get  schoolDetails
export const getSchoolDetails = async (req: Request, res: Response) => {
  try {
    const { sc_id } = req.params
    const school = await schoolService.getSchool({
      where: {
        sc_id: sc_id,
      },
      attributes: { exclude: ['sc_password'] },
    })

    if (!school) return notFoundResponse(res, { message: 'School Not founded' })

    return successResponse(res, {
      message: 'School Details',
      data: {
        school,
      },
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}
