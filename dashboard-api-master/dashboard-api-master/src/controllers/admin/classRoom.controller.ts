import { Request, Response } from 'express'
import { kt_school as School } from '../../db/model/kt_school'
import { classRoomService } from '../../db/services'
import {
  internalServerErrorResponse,
  successResponse,
} from '../../util/apiResponse'

// Get list of all class roms
export const getAllClassRoom = async (req: Request, res: Response) => {
  try {
    const classRooms = await classRoomService.getAllClassRooms({
      order: [['cr_id', 'ASC']],
    })

    let classRoomsList: any = []

    classRooms.forEach((data) => {
      const classRoom = data.cr_class
      const division = data.cr_division
      const classCombination = `${classRoom}-${division}`
      const classObj = {
        value: data.cr_id,
        label: classCombination,
      }
      return classRoomsList.push(classObj)
    })

    return successResponse(res, {
      message: 'Class-Room List',
      data: {
        classRoomsList,
      },
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}
export const filterClassRoomBySchool = async (req: Request, res: Response) => {
  try {
    const { cr_schoolId } = req.query

    let where = {}

    cr_schoolId ? (where = { ...where, cr_schoolId }) : null

    const classRoomData = await classRoomService.getAllClassRooms({
      where,
      order: [['cr_id', 'ASC']],
      include: {
        model: School,
        as: 'cr_school',
      },
    })

    let classRoom: any = []

    classRoomData.forEach((data) => {
      const className = data.cr_class
      const division = data.cr_division
      const classCombination = `${className}-${division}`
      const classObj = {
        value: data.cr_id,
        label: classCombination,
      }
      return classRoom.push(classObj)
    })
    return successResponse(res, {
      message: 'ClassRoom List',
      data: {
        classRoom,
      },
    })
  } catch (error: any) {
    console.log(error)
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Get ClassRoom
export const getClassRoom = async (req: Request, res: Response) => {
  try {
    let { cr_id } = req.params
    const classRoom = await classRoomService.getClassRoom({
      where: {
        cr_id,
      },
    })

    return successResponse(res, {
      message: 'ClassRoom Details',
      data: {
        classRoom,
      },
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Create a new ClassRoom
export const createClassRoom = async (req: Request, res: Response) => {
  try {
    let body = req.body

    const ClassRoom = await classRoomService.createClassRoom(body)

    return successResponse(res, {
      message: 'ClassRoom added Successfully',
      data: {
        ClassRoom,
      },
    })
  } catch (error: any) {
    console.log(error)
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Update a ClassRoom
export const updateClassRoom = async (req: Request, res: Response) => {
  try {
    let cr_id = req.params.cr_id as unknown as number
    let body = req.body

    const classRoom = await classRoomService.updateClassRoom(
      {
        where: {
          cr_id,
        },
      },
      body,
    )

    return successResponse(res, {
      message: 'ClassRoom Updated Successfully',
      data: {
        classRoom,
      },
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Update a Class status
export const updateClassStatus = async (req: Request, res: Response) => {
  try {
    let cr_id = req.params.cr_id as unknown as number
    let cr_status = req.params.cr_status as unknown as boolean

    const classRoom = await classRoomService.updateClassRoom(
      {
        where: {
          cr_id,
        },
      },
      {
        cr_status,
      },
    )

    return successResponse(res, {
      message: 'ClassRoom Status Updated Successfully',
      data: {
        classRoom,
      },
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Delete a Class
export const deleteClassRoom = async (req: Request, res: Response) => {
  try {
    let { cr_id } = req.params

    await classRoomService.deleteClassRoom({
      where: {
        cr_id,
      },
    })

    return successResponse(res, {
      message: 'ClassRoom Deleted Successfully',
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}
