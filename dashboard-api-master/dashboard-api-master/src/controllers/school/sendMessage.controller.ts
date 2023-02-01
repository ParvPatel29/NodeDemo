import { Request, Response } from 'express'
import path from 'path'

import { sendMessageService } from '../../db/services'
import {
  internalServerErrorResponse,
  notFoundResponse,
  successResponse,
} from '../../util/apiResponse'

// Get All Send Message
export const getAllSendMessage = async (req: Request, res: Response) => {
  try {
    const sendMessage: any = await sendMessageService.getAllSendMessage({})

    return successResponse(res, {
      message: 'sendMessage List',
      data: {
        sendMessage,
      },
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Create Send Message
export const createSendMessage = async (req: Request, res: Response) => {
  try {
    let body = req.body

    body.sm_student = JSON.parse(body.sm_student)
    body.sm_class = body.sm_class == '' ? null : body.sm_class
    
    const sendMessage = await sendMessageService.createSendMessage(body)
    return successResponse(res, {
      message: 'Message added Successfully',
      data: {
        sendMessage,
      },
    })
  } catch (error: any) {
    console.log('error of sendmsg : ', error)
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}
