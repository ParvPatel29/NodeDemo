import { FindOptions } from 'sequelize'
import { UpdateOptions, DestroyOptions } from 'sequelize/types'
import dbClient from '../index'
import {
  kt_eventCalenderAttributes as EventCalenderAttributes,
  kt_eventCalenderCreationAttributes as EventCalenderCreationAttributes,
  kt_eventCalender as EventCalender,
} from '../model/init-models'

// Get All Event Calenders
export const getAllEventCalenders = async (
  options: FindOptions<EventCalender>,
): Promise<EventCalender[] | []> => {
  const team = await EventCalender.findAll(options)
  return team
}

// Create Event Calender
export const createCalender = async (
  data: EventCalenderCreationAttributes[],
): Promise<EventCalender[]> => {
  const transaction = await dbClient.transaction()
  try {
    const kt_EventCalender = await EventCalender.bulkCreate(data, { transaction })
    await transaction.commit()
    return kt_EventCalender
  } catch (error) {
    await transaction.rollback()
    throw error
  }
}

// Get one Event Calender
export const getCalender = async (
  options: FindOptions<EventCalender>,
): Promise<EventCalender | null> => {
  try {
    const kt_EventCalender = await EventCalender.findOne(options)
    return kt_EventCalender
  } catch (error) {
    throw error
  }
}

// update a Calender
export const updateCalender = async (
  options: UpdateOptions<EventCalenderAttributes>,
  data: Partial<EventCalender>,
): Promise<[affectedCount: number, affectedRows: EventCalender[]]> => {
  const transaction = await dbClient.transaction()
  try {
    let updatedData = await EventCalender.update(data, {
      ...options,
      transaction,
      returning: true,
    })

    await transaction.commit()
    return updatedData
  } catch (error) {
    await transaction.rollback()
    throw error
  }
}

// delete Event Calender
export const deleteCalender = async (
  options: DestroyOptions<EventCalender>,
): Promise<number> => {
  const transaction = await dbClient.transaction()
  try {
    let deletedCnt = await EventCalender.destroy(options)
    await transaction.commit()
    return deletedCnt
  } catch (error) {
    await transaction.rollback()
    throw error
  }
}
