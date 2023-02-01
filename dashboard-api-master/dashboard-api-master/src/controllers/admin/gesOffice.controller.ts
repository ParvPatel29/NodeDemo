import { Request, Response } from 'express'
import { gesOfficeService } from '../../db/services'
import {
  internalServerErrorResponse,
  successResponse,
} from '../../util/apiResponse'
import { setEmptyFieldsToNull } from '../../util/common'

// Get list of all ges office
export const getAllGESOffice = async (req: Request, res: Response) => {
  try {
    const gesOffices = await gesOfficeService.getAllGESOffices({
      order: [['go_id', 'ASC']],
      attributes: {
        exclude: ['go_password'],
      },
    })

    return successResponse(res, {
      message: 'GES Office List',
      data: {
        gesOffices,
      },
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Get one ges office
export const getGESOffice = async (req: Request, res: Response) => {
  try {
    const { go_id } = req.params
    const gesOffice = await gesOfficeService.getGESOffice({
      where: { go_id },
      attributes: {
        exclude: ['go_password'],
      },
    })

    return successResponse(res, {
      message: 'GES Office List',
      data: {
        gesOffice,
      },
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Creating a New ges office
export const createGESOffice = async (req: Request, res: Response) => {
  try {
    let body = req.body

    //  change empty fields to null-value
    setEmptyFieldsToNull(body)

    const office = await gesOfficeService.createGESOffice(body)

    return successResponse(res, {
      message: 'GES Office added Successfully',
      data: {
        office,
      },
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Updating a ges office
export const updateGESOffice = async (req: Request, res: Response) => {
  try {
    let {
      body,
      params: { go_id },
    } = req

    //  change empty fields to null-value
    setEmptyFieldsToNull(body)

    const office = await gesOfficeService.updateGESOffice(
      {
        where: {
          go_id,
        },
      },
      body,
    )

    return successResponse(res, {
      message: 'GES Office Updated Successfully',
      data: {
        office,
      },
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Delete a ges office
export const deleteGESOffice = async (req: Request, res: Response) => {
  try {
    let { go_id } = req.params

    await gesOfficeService.deleteGESOffice({
      where: {
        go_id,
      },
    })

    return successResponse(res, {
      message: 'GES Office Deleted Successfully',
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}
