import { Request, Response } from 'express'
import { Op } from 'sequelize'
import path from 'path'

import { studentService, notificationService } from '../../db/services'
import {
  internalServerErrorResponse,
  notFoundResponse,
  successResponse,
} from '../../util/apiResponse'
import { encryptPassword } from '../../util/encryptPassword'
import { INTEGER } from 'sequelize'

// Get list Notification
export const getAllNotification = async (req: Request, res: Response) => {
  let currentMonth = new Date().getMonth()
  const currentYear = new Date().getFullYear()
  currentMonth += 1

  const date1 = `${currentYear}-${currentMonth}-01 18:23:10.148726+05:30`
  const date2 = `${currentYear}-${currentMonth}-30 18:23:10.148726+05:30`

  let { page, limit } = req.query

  try {
    const offset_value = (Number(page) - 1) * Number(limit)

    const notification: any = await notificationService.getAllNotificaiton({
      where: {
        nt_createdAt: {
          [Op.between]: [date1, date2],
        },
      },
      // offset: offset_value,
      order: [['nt_id', 'ASC']],
    })

    return successResponse(res, {
      message: 'Notification List',
      data: {
        notification,
      },
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Create Notification
export const createNotificaiton = async (req: Request, res: Response) => {
  try {
    let body = req.body
    let files = req.files as {
      [fieldname: string]: Express.Multer.File[]
    }

    // upload file
    body['nt_file'] =
      files?.['nt_file'] &&
      path.join(
        (req.table_name || 'common') as string,
        'nt_file',
        files?.['nt_file']?.[0]?.filename,
      )
    const Notification = await notificationService.createNotificaiton(body)

    return successResponse(res, {
      message: 'Notification added Successfully',
      data: {
        Notification,
      },
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Get Notification
export const getNotificationById = async (req: Request, res: Response) => {
  try {
    let { nt_id } = req.params
    const notification = await notificationService.getNotification({
      where: {
        nt_id,
      },
    })

    return successResponse(res, {
      message: 'Notification Details founded',
      data: {
        notification,
      },
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Update a Notification
export const updateNotification = async (req: Request, res: Response) => {
  try {
    let nt_id = req.params.nt_id as unknown as number
    let body = req.body

    let files = req.files as {
      [fieldname: string]: Express.Multer.File[]
    }

    // update file
    body['nt_file'] = files?.['nt_file']?.[0]?.filename
      ? path.join(
          (req.table_name || 'common') as string,
          'nt_file',
          files?.['nt_file']?.[0]?.filename,
        )
      : body['nt_file_old']

    const Notification = await notificationService.updateNotification(
      {
        where: {
          nt_id,
        },
      },
      body,
    )

    return successResponse(res, {
      message: 'Notification Updated Successfully',
      data: {
        Notification,
      },
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Delete Notification
export const deleteNotification = async (req: Request, res: Response) => {
  try {
    let { nt_id } = req.params

    await notificationService.deleteNotification({
      where: {
        nt_id,
      },
    })

    return successResponse(res, {
      message: 'Notification Deleted Successfully',
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}
