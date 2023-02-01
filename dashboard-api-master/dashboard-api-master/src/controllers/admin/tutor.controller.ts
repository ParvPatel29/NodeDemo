import { Request, Response } from 'express'
import { tutorService } from '../../db/services'
import {
  internalServerErrorResponse,
  successResponse,
} from '../../util/apiResponse'

// Get list of all Tutor
export const getAllTutor = async (req: Request, res: Response) => {
  try {
    const tutors = await tutorService.getAllTutor({
      order: [['tu_id', 'ASC']],
    })
    return successResponse(res, {
      message: 'Tutor List',
      data: {
        tutors,
      },
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Get Tutor by id
export const getTutorManagementById = async (req: Request, res: Response) => {
  try {
    let { tu_id } = req.params
    const tutor = await tutorService.getTutor({
      where: {
        tu_id,
      },
    })

    return successResponse(res, {
      message: 'Tutor Details',
      data: {
        tutor,
      },
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Create a new Tutor
export const createTutor = async (req: Request, res: Response) => {
  try {
    let body = req.body

    const tutor = await tutorService.createTutor(body)

    return successResponse(res, {
      message: 'Tutor added Successfully',
      data: {
        tutor,
      },
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Update a Tutor
export const updateTutor = async (req: Request, res: Response) => {
  try {
    let tu_id = req.params.tu_id as unknown as number
    let body = req.body
    const tutor = await tutorService.updateTutor(
      {
        where: {
          tu_id,
        },
      },
      body,
    )

    return successResponse(res, {
      message: 'Tutor Updated Successfully',
      data: {
        tutor,
      },
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Delete a Tutor
export const deleteTutor = async (req: Request, res: Response) => {
  try {
    let { tu_id } = req.params

    await tutorService.deleteTutor({
      where: {
        tu_id,
      },
    })

    return successResponse(res, {
      message: 'Tutor Deleted Successfully',
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}
