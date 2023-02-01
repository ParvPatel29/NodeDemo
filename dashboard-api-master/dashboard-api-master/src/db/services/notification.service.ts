import { FindOptions } from 'sequelize'
import { UpdateOptions, DestroyOptions } from 'sequelize/types'
import dbClient from '../index'
import {
  kt_notificationAttributes as NotificationAttributes,
  kt_notificationCreationAttributes as NotificationCreationAttributes,
  kt_notification as Notification,
} from '../model/init-models'

// Get All Notificaiton
export const getAllNotificaiton = async (
  options: FindOptions<Notification>,
): Promise<Notification[] | []> => {
  const team = await Notification.findAll(options)
  return team
}

// Create a Notificaiton
export const createNotificaiton = async (
  data: NotificationCreationAttributes,
): Promise<Notification> => {
  const transaction = await dbClient.transaction()
  try {
    const kt_Notification = await Notification.create(data, { transaction })
    await transaction.commit()
    return kt_Notification
  } catch (error) {
    await transaction.rollback()
    throw error
  }
}

// Get one Notification
export const getNotification = async (
  options: FindOptions<Notification>,
): Promise<Notification | null> => {
  try {
    const kt_Notification = await Notification.findOne(options)
    return kt_Notification
  } catch (error) {
    throw error
  }
}

// update a Notification
export const updateNotification = async (
  options: UpdateOptions<NotificationAttributes>,
  data: Partial<Notification>,
): Promise<[affectedCount: number, affectedRows: Notification[]]> => {
  const transaction = await dbClient.transaction()
  try {
    let updatedData = await Notification.update(data, {
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

// delete Notification
export const deleteNotification = async (
  options: DestroyOptions<Notification>,
): Promise<number> => {
  const transaction = await dbClient.transaction()
  try {
    let deletedCnt = await Notification.destroy(options)
    await transaction.commit()
    return deletedCnt
  } catch (error) {
    await transaction.rollback()
    throw error
  }
}
