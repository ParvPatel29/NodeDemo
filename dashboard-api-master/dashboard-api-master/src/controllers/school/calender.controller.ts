import { Request, Response } from 'express'
import { Op } from 'sequelize'
import { calenderService } from '../../db/services'
import {
  internalServerErrorResponse,
  notFoundResponse,
  successResponse,
} from '../../util/apiResponse'
import { encryptPassword } from '../../util/encryptPassword'

// Get list of all student
export const getAllEventCalenders = async (req: Request, res: Response) => {
  const currentYear = new Date().getFullYear()
  const nextYear = new Date().getFullYear() + 1

  const date1 = `${currentYear}-01-01 18:23:10.148726+05:30`
  const date2 = `${nextYear}-01-01 18:23:10.148726+05:30`
  try {
    const events = await calenderService.getAllEventCalenders({
      where: {
        ec_createdAt: {
          [Op.between]: [date1, date2],
        },
      },
    })

    return successResponse(res, {
      message: 'Event Calender List',
      data: {
        events,
      },
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Create Event Calender
export const createCalender = async (req: Request, res: Response) => {
  try {
    let eventDate = [];
    let ecBulkData:any = []
    if(req.body.ec_eventDate){
      eventDate = JSON.parse(req.body.ec_eventDate)
    }

    let {ec_schoolId,ec_class,ec_eventtype,ec_eventTitle} = req.body
    
    eventDate && eventDate.map((date:any) => {
      ecBulkData.push({
        ec_schoolId : ec_schoolId,
        ec_class : ec_class,
        ec_eventtype : ec_eventtype,
        ec_eventDate : date,
        ec_eventTitle : ec_eventTitle
      })
    })
    const eventCalender = await calenderService.createCalender(ecBulkData)

    return successResponse(res, {
      message: 'eventCalender added Successfully',
      data: {
        eventCalender,
      },
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Get Calender
export const getCalenderById = async (req: Request, res: Response) => {
  try {
    let { ec_id } = req.params
    const calender = await calenderService.getCalender({
      where: {
        ec_id,
      },
    })

    return successResponse(res, {
      message: 'Calender Details founded',
      data: {
        calender,
      },
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Update a Calender
export const updateCalender = async (req: Request, res: Response) => {
  try {
    let ec_id = req.params.ec_id as unknown as number
    let body = req.body
    const Calender = await calenderService.updateCalender(
      {
        where: {
          ec_id,
        },
      },
      body,
    )

    return successResponse(res, {
      message: 'Calender Updated Successfully',
      data: {
        Calender,
      },
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}

// Delete a Event Calender
export const deleteCalender = async (req: Request, res: Response) => {
  try {
    let { ec_id } = req.params

    await calenderService.deleteCalender({
      where: {
        ec_id,
      },
    })

    return successResponse(res, {
      message: 'Event calender Deleted Successfully',
    })
  } catch (error: any) {
    return internalServerErrorResponse(res, {
      error: error,
    })
  }
}
