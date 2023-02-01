import { adminTeamService, authService, schoolService } from '../../db/services'
import { Request, Response } from 'express'

// Response Handler
import {
  internalServerErrorResponse,
  notFoundResponse,
  successResponse,
  unauthorizedResponse,
} from '../../util/apiResponse'
import md5 from 'md5'
import { Op } from 'sequelize'
import axios from 'axios'
import { CREATE_ROOM } from '../../helper/urlHelper'
import { basicAuthOfEnableX } from '../../helper/authHelper'

// Create Room
export const createRoom = async (body: Request) => {
  try {
    let { ls_title, ls_desc, ls_date, ls_time }: any = body

    let dateWithTime = `${ls_date} ${ls_time}:00`
    let roomData = {
      name: ls_title,
      owner_ref: 'xyz',
      settings: {
        description: ls_title,
        mode: 'lecture',
        scheduled: false,
        adhoc: false, 
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

    let res: any = await axios.post(CREATE_ROOM, roomData, basicAuthOfEnableX)

    return res
  } catch (error: any) {
    console.log('error', error)
  }
}

export const generateRoomToken = async (req: Request ,res: Response) => {
  try {
    let { roomId }: any = req.params
    // console.log('roomId1',roomId)
    let data = {
      "name": "John Doe",
      "role": "participant",
      "user_ref": "XXXXX"
    }
    
    let response: any = await axios.post(
      `${CREATE_ROOM}/${roomId}/tokens`,
      data,
      basicAuthOfEnableX,
    )
    if(response.data){
      return res.status(200).json({
        status: true,
        data : response.data
      })
    }
    return res.status(200).json({
      status: false,
      data : 'Something went wrong'
    })
  } catch (error: any) {
    console.log('error', error)
  }
}
