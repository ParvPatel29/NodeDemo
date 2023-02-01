import { FindOptions } from 'sequelize'
import { UpdateOptions, DestroyOptions } from 'sequelize/types'

import dbClient from '../index'

import {
  kt_tutorManagement as TutorManagement,
  kt_tutorManagementAttributes as TutorManagementAttributes,
  kt_tutorManagementCreationAttributes as TutorManagementCreationAttributes,
} from '../model/init-models'

// Get All Tutors
export const getAllTutor = async (
  options: FindOptions<TutorManagement>,
): Promise<TutorManagement[] | []> => {
  const tutors = await TutorManagement.findAll(options)
  return tutors
}

// Create a New Tutor
export const createTutor = async (
  data: TutorManagementCreationAttributes,
): Promise<TutorManagement> => {
  const transaction = await dbClient.transaction()
  try {
    const tutors = await TutorManagement.create(data, {
      transaction,
    })
    await transaction.commit()
    return tutors
  } catch (error) {
    await transaction.rollback()
    throw error
  }
}

// Get one Tutor
export const getTutor = async (
  options: FindOptions<TutorManagement>,
): Promise<TutorManagement | null> => {
  try {
    const tutor = await TutorManagement.findOne(options)
    return tutor
  } catch (error) {
    throw error
  }
}

// Update Tutor
export const updateTutor = async (
  options: UpdateOptions<TutorManagementAttributes>,
  data: Partial<TutorManagement>,
): Promise<[affectedCount: number, affectedRows: TutorManagement[]]> => {
  const transaction = await dbClient.transaction()
  try {
    let updatedData = await TutorManagement.update(data, {
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

// Delete Tutor
export const deleteTutor = async (
  options: DestroyOptions<TutorManagement>,
): Promise<number> => {
  const transaction = await dbClient.transaction()
  try {
    let deletedCnt = await TutorManagement.destroy(options)
    await transaction.commit()
    return deletedCnt
  } catch (error) {
    await transaction.rollback()
    throw error
  }
}
