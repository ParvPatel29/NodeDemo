import { Request, Response } from 'express'
import { schoolService } from '../../db/services'
import {
  internalServerErrorResponse,
  notFoundResponse,
  successResponse,
} from '../../util/apiResponse'
import { setEmptyFieldsToNull } from '../../util/common'
import { encryptPassword } from '../../util/encryptPassword'
import { generatePassword } from '../../util/generatePassword'

// Get list of all schools
export const getAllSchool = async (req: Request, res: Response) => {
  try {
    const schools = await schoolService.getAllSchool({
      order: [['sc_id', 'ASC']],
      attributes: { exclude: ['sc_password'] },
    })

    return successResponse(res, {
      message: 'School List',
      data: {
        schools,
      },
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Creating a New School
export const createSchool = async (req: Request, res: Response) => {
  try {
    let { body } = req

    // create encryptPassword
    body.sc_password = await encryptPassword(body.sc_password)

    //  change empty fields to null-value
    setEmptyFieldsToNull(body)

    const school = await schoolService.createSchool(body)

    return successResponse(res, {
      message: 'School added Successfully',
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

// Updating a school
export const updateSchool = async (req: Request, res: Response) => {
  try {
    const {
      body,
      params: { sc_id },
    } = req

    if (body?.sc_password) {
      body.sc_password = encryptPassword(body.sc_password)
    }

    //  change empty fields to null-value
    setEmptyFieldsToNull(body)

    const school = await schoolService.updateSchool(
      {
        where: {
          sc_id,
        },
      },
      body,
    )

    return successResponse(res, {
      message: 'School Updated Successfully',
      data: { school },
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Delete a school
export const deleteSchool = async (req: Request, res: Response) => {
  try {
    const { sc_id } = req.params

    await schoolService.deleteSchool({
      where: {
        sc_id,
      },
    })

    return successResponse(res, { message: 'School Deleted Successfully' })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Get list of school name
export const getSchoolNameList = async (req: Request, res: Response) => {
  try {
    const schoolList = await schoolService.getAllSchool({
      order: [['sc_id', 'ASC']],
      attributes: ['sc_id', 'sc_schoolName'],
    })

    return successResponse(res, {
      message: 'School List',
      data: {
        schoolList,
      },
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Get one school
export const getSchool = async (req: Request, res: Response) => {
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

// filterSchool By r-d-c value
export const filterSchoolByRegionDistrictCircuit = async (
  req: Request,
  res: Response,
) => {
  try {
    const { sc_region, sc_district, sc_circuit } = req.query

    let where = {}

    sc_region ? (where = { ...where, sc_region }) : null

    sc_district ? (where = { ...where, sc_district }) : null

    sc_circuit ? (where = { ...where, sc_circuit }) : null

    const schools = await schoolService.getAllSchool({
      where,
      order: [['sc_id', 'ASC']],
    })

    return successResponse(res, {
      message: 'School List',
      data: {
        schools,
      },
    })
  } catch (error: any) {
    console.log(error)
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}
