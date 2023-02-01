import { Request, Response } from 'express'
import sequelize from 'sequelize'
import { Op } from 'sequelize'
import { kt_GESOffice as GESOffice } from '../../db/model/kt_GESOffice'

import {
  areaService,
  gesMemberService,
  schoolService,
  schoolStaffService,
  studentService,
  teacherService,
} from '../../db/services'
import {
  internalServerErrorResponse,
  notFoundResponse,
  successResponse,
} from '../../util/apiResponse'
import { encryptPassword } from '../../util/encryptPassword'

export const countData = async (req: Request, res: Response) => {
  try {
    let { region, district, circuit }: any = req.query

    let where = {}
    let studentQuery = {}
    let schoolQuery = {}

    let whereFilter: any = {}
    let studentFilter: any = {}
    let schoolFilter: any = {}

    region ? (whereFilter.tc_region = region) : ''
    district ? (whereFilter.tc_district = district) : ''
    circuit ? (whereFilter.tc_circuit = circuit) : ''

    region ? (studentFilter.st_region = region) : ''
    district ? (studentFilter.st_district = district) : ''
    circuit ? (studentFilter.st_circuit = circuit) : ''

    region ? (schoolFilter.sc_region = region) : ''
    district ? (schoolFilter.sc_district = district) : ''
    circuit ? (schoolFilter.sc_circuit = circuit) : ''

    where = {
      ...where,
      [Op.and]: whereFilter,
    }

    studentQuery = {
      ...studentQuery,
      [Op.and]: studentFilter,
    }

    schoolQuery = {
      ...schoolQuery,
      [Op.and]: schoolFilter,
    }
    // Total circuit
    const circuits = await areaService.countArea({
      where: { ar_type: 'circuit' },
    })

    // Total Teacher
    const teachers = await teacherService.countTeacher({ where })

    // Total Student
    const students = await studentService.countStudent({
      where: studentQuery,
    })

    const school = await schoolService.getAllSchool({
      where: schoolQuery,
    })

    let nonTeachingStaff: string | any = ''
    for (let i = 0; i < school.length; i++) {
      const schoolData: any = school[i]
      let schoolId = schoolData.sc_id

      const nonTeachingStaffVal = await schoolStaffService.countSchoolStaff({
        where: { ss_schoolId: { [Op.or]: [schoolId] } },
      })
      nonTeachingStaff = nonTeachingStaffVal
    }

    return successResponse(res, {
      message: 'Count Data List',
      data: { circuits, teachers, students, nonTeachingStaff },
    })
  } catch (error: any) {
    internalServerErrorResponse(res, { message: error.message, error })
  }
}

// Get one authority member
export const getGESMember = async (req: Request, res: Response) => {
  try {
    const gm_id = req.token?.id

    const authorityMember = await gesMemberService.getGESMember({
      where: { gm_id },
      attributes: {
        exclude: ['gm_password'],
      },
      include: {
        model: GESOffice,
        as: 'gm_gesOffice',
        attributes: [
          'go_id',
          'go_officeLevel',
          'go_officeTitle',
          'go_region',
          'go_district',
          'go_circuit',
          'go_email',
        ],
      },
    })

    return successResponse(res, {
      message: 'GES Member List',
      data: {
        authorityMember,
      },
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Updating a authority member
export const updateGESMember = async (req: Request, res: Response) => {
  try {
    let { body } = req

    const gm_id = req.token?.id

    if (body.gm_password) {
      body.gm_password = encryptPassword(body.gm_password)
    }

    const member = await gesMemberService.updateGESMember(
      {
        where: {
          gm_id,
        },
      },
      body,
    )

    return successResponse(res, {
      message: 'GES Member Updated Successfully',
      data: {
        member,
      },
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}
