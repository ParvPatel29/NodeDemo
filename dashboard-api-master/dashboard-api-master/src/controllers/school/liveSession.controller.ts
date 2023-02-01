import { Request, Response } from 'express'
import { Op } from 'sequelize'
import path from 'path'

import {
  studentService,
  notificationService,
  liveSessionService,
} from '../../db/services'
import {
  internalServerErrorResponse,
  notFoundResponse,
  successResponse,
} from '../../util/apiResponse'
import { encryptPassword } from '../../util/encryptPassword'
import { INTEGER } from 'sequelize'
import axios from 'axios'
import { CREATE_ROOM } from '../../helper/urlHelper'
import { basicAuthOfEnableX } from '../../helper/authHelper'
import { createRoom } from './enableX.controller'

// Get list Live Session
export const getAllLiveSessionByTeacher = async (req: Request, res: Response) => {
  const { tc_id }: any = req.query
  try {
    const liveSession: any = await liveSessionService.getAllLiveSession({
      where: {
        tc_id: tc_id,
      },
    })

    return successResponse(res, {
      message: 'liveSession List',
      data: {
        liveSession,
      },
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}
// Get All LiveSession Without teacher
export const getAllLiveSession = async (req: Request, res: Response) => {
  try {
    const liveSession: any = await liveSessionService.getAllLiveSession({})

    return successResponse(res, {
      message: 'liveSession List',
      data: {
        liveSession,
      },
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Create Live Session
export const createLiveSession = async (req: Request, res: Response) => {
  try {
    let body = req.body
    let files = req.files as {
      [fieldname: string]: Express.Multer.File[]
    }
    
    let {ls_title,ls_desc,ls_date,ls_time} = req.body

    let dateWithTime = `${ls_date} ${ls_time}:00`

    let roomData = {
      name:ls_title,
      owner_ref: 'xyz',
      settings: {
        description: ls_desc,
        mode: 'group',
        scheduled: false,
        adhoc: false,
        duration: 200,
        moderators: '1',
        participants: '5',
        auto_recording: false,
        quality: 'SD',
      },
      sip: {
        enabled: false,
      },
      data: {
        custom_key: '',
      },
    }

    let responseOfRoom:any = await createRoom(body)
    // let responseOfRoom = await axios.post(CREATE_ROOM, roomData, basicAuthOfEnableX)
    let roomId = responseOfRoom.data.room.room_id;

    body['ls_roomURL'] = roomId ? roomId : ''
    // upload file
    body['ls_image'] =
      files?.['ls_image'] &&
      path.join(
        (req.table_name || 'common') as string,
        'ls_image',
        files?.['ls_image']?.[0]?.filename,
      )
    const liveSession = await liveSessionService.createLiveSession(body)

    return successResponse(res, {
      message: 'Live Session added Successfully',
      data: {
        liveSession,
      },
    })
  } catch (error: any) {
    console.log('errorcreatelivesessoin', error)
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Get Live Sessoin
export const getLiveSessionById = async (req: Request, res: Response) => {
  try {
    let { ls_id } = req.params
    const liveSession = await liveSessionService.getLiveSession({
      where: {
        ls_id,
      },
    })

    return successResponse(res, {
      message: 'Live Session Details founded',
      data: {
        liveSession,
      },
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Update a Live Session
export const updateLiveSession = async (req: Request, res: Response) => {
  try {
    let ls_id = req.params.ls_id as unknown as number
    let body = req.body

    let files = req.files as {
      [fieldname: string]: Express.Multer.File[]
    }

    // update file
    body['ls_image'] = files?.['ls_image']?.[0]?.filename
      ? path.join(
          (req.table_name || 'common') as string,
          'ls_image',
          files?.['ls_image']?.[0]?.filename,
        )
      : body['ls_image_old']

    const liveSession = await liveSessionService.updateLiveSession(
      {
        where: {
          ls_id,
        },
      },
      body,
    )

    return successResponse(res, {
      message: 'Live Session Updated Successfully',
      data: {
        liveSession,
      },
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Delete Live Session
export const deleteLiveSession = async (req: Request, res: Response) => {
  try {
    let { ls_id } = req.params

    await liveSessionService.deleteLiveSession({
      where: {
        ls_id,
      },
    })

    return successResponse(res, {
      message: 'Live Session Deleted Successfully',
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}
