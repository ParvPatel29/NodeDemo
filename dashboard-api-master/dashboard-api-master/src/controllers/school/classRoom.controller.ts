import { Request, Response } from 'express'
import { Op } from 'sequelize'
import { kt_teacher as Teacher } from '../../db/model/kt_teacher'
import { classRoomService } from '../../db/services'
import {
  internalServerErrorResponse,
  notFoundResponse,
  successResponse,
} from '../../util/apiResponse'

// Get list of all classRooms
export const getAllClassRoom = async (req: Request, res: Response) => {
  try {
    const { id }: any = req.token

    const classRooms = await classRoomService.getAllClassRooms({
      where: { cr_schoolId: id },
      order: [['cr_id', 'ASC']],
      include: {
        model: Teacher,
        as: 'cr_classTeacher',
        attributes: ['tc_id', 'tc_fullName'],
      },
    })

    return successResponse(res, {
      message: 'Class-Room List',
      data: {
        classRooms,
      },
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Get list of all classRooms By School
export const getAllClassRoomBySchool = async (req: Request, res: Response) => {
  try {
    const { sc_id }: any = req.body

    const classRooms = await classRoomService.getAllClassRooms({
      where: { cr_schoolId: sc_id },
      order: [['cr_id', 'ASC']],
      include: {
        model: Teacher,
        as: 'cr_classTeacher',
        attributes: ['tc_id', 'tc_fullName'],
      },
    })

    return successResponse(res, {
      message: 'Class-Room List',
      data: {
        classRooms,
      },
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Get ClassRoom
export const getClassRoom = async (req: Request, res: Response) => {
  try {
    let { cr_id } = req.params

    const { id }: any = req.token

    const classRoom = await classRoomService.getClassRoom({
      where: { cr_id, cr_schoolId: id },
      include: {
        model: Teacher,
        as: 'cr_classTeacher',
        attributes: ['tc_id', 'tc_fullName'],
      },
    })

    if (!classRoom) {
      return notFoundResponse(res, { message: 'Invalid ClassRoom Id' })
    }

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
    const { id }: any = req.token

    body.cr_schoolId = id

    const ClassRoom = await classRoomService.createClassRoom(body)

    return successResponse(res, {
      message: 'ClassRoom added Successfully',
      data: {
        ClassRoom,
      },
    })
  } catch (error: any) {
    console.log('errorcreateClassRoom',error)
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

    const { id }: any = req.token

    const classRoom = await classRoomService.updateClassRoom(
      {
        where: { cr_id, cr_schoolId: id },
      },
      body,
    )

    if (classRoom[0] === 0) {
      return notFoundResponse(res, {
        message: 'Invalid ClassRoom Id',
      })
    }

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
    const { id }: any = req.token

    const deleteClassRoom = await classRoomService.deleteClassRoom({
      where: { cr_id, cr_schoolId: id },
    })

    if (deleteClassRoom === 0) {
      return notFoundResponse(res, {
        message: 'Invalid ClassRoom Id',
      })
    }

    return successResponse(res, {
      message: 'ClassRoom Deleted Successfully',
      data: { deleteClassRoom },
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}
