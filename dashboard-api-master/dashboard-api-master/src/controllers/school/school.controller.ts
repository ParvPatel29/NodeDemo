import { schoolService } from '../../db/services'
import {
  internalServerErrorResponse,
  notFoundResponse,
  successResponse,
} from '../../util/apiResponse'
import { Request, Response } from 'express'
import { encryptPassword } from '../../util/encryptPassword'
import { setEmptyFieldsToNull } from '../../util/common'

// Get one school
export const getSchool = async (req: Request, res: Response) => {
  try {
    const sc_id = req.body?.sc_id
    const school = await schoolService.getSchool({
      where: {
        sc_id,
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

// Updating a school
export const updateSchool = async (req: Request, res: Response) => {
  try {
    const { body } = req

    const sc_id = req.token?.id

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
