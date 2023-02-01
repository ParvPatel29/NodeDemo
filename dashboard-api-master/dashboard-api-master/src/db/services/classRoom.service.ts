import { FindOptions } from 'sequelize'
import { UpdateOptions, DestroyOptions } from 'sequelize/types'

import dbClient from '../index'

import {
  kt_classRoom as ClassRoom,
  kt_classRoomAttributes as ClassRoomAttributes,
  kt_classRoomCreationAttributes as ClassRoomCreationAttributes,
} from '../model/init-models'

// Get All ClassRooms
export const getAllClassRooms = async (
  options: FindOptions<ClassRoom>,
): Promise<ClassRoom[] | []> => {
  const classRooms = await ClassRoom.findAll(options)
  return classRooms
}

// Create a New ClassRoom
export const createClassRoom = async (
  data: ClassRoomCreationAttributes,
): Promise<ClassRoom> => {
  const transaction = await dbClient.transaction()
  try {
    const classRooms = await ClassRoom.create(data, {
      transaction,
    })
    await transaction.commit()
    return classRooms
  } catch (error) {
    await transaction.rollback()
    throw error
  }
}

// Get one ClassRoom
export const getClassRoom = async (
  options: FindOptions<ClassRoom>,
): Promise<ClassRoom | null> => {
  try {
    const classRooms = await ClassRoom.findOne(options)
    return classRooms
  } catch (error) {
    throw error
  }
}

// Update ClassRoom
export const updateClassRoom = async (
  options: UpdateOptions<ClassRoomAttributes>,
  data: Partial<ClassRoom>,
): Promise<[affectedCount: number, affectedRows: ClassRoom[]]> => {
  const transaction = await dbClient.transaction()
  try {
    let updatedData = await ClassRoom.update(data, {
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

// Delete ClassRoom
export const deleteClassRoom = async (
  options: DestroyOptions<ClassRoom>,
): Promise<number> => {
  const transaction = await dbClient.transaction()
  try {
    let deletedCnt = await ClassRoom.destroy(options)
    await transaction.commit()
    return deletedCnt
  } catch (error) {
    await transaction.rollback()
    throw error
  }
}
