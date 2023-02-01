import { FindOptions } from 'sequelize'
import { UpdateOptions, DestroyOptions } from 'sequelize/types'

import dbClient from '../index'

import {
  kt_examTimeTable as ExamTimeTable,
  kt_examTimeTableAttributes as ExamTimeTableAttributes,
  kt_examTimeTableCreationAttributes as ExamTimeTableCreationAttributes,
} from '../model/init-models'

// Get All ExamTimeTable
export const getAllExamTimeTable = async (
  options: FindOptions<ExamTimeTable>,
): Promise<ExamTimeTable[] | []> => {
  const examTimeTable = await ExamTimeTable.findAll(options)
  return examTimeTable
}

// Create a New ExamTimeTable
export const createExamTimeTable = async (
  data: ExamTimeTableCreationAttributes,
): Promise<ExamTimeTable> => {
  const transaction = await dbClient.transaction()
  try {
    const examTimeTable = await ExamTimeTable.create(data, {
      transaction,
    })
    await transaction.commit()
    return examTimeTable
  } catch (error) {
    await transaction.rollback()
    throw error
  }
}

// Get one ExamTimeTable
export const getExamTimeTable = async (
  options: FindOptions<ExamTimeTable>,
): Promise<ExamTimeTable | null> => {
  try {
    const examTimeTable = await ExamTimeTable.findOne(options)
    return examTimeTable
  } catch (error) {
    throw error
  }
}

// Update ExamTimeTable
export const updateExamTimeTable = async (
  options: UpdateOptions<ExamTimeTableAttributes>,
  data: Partial<ExamTimeTable>,
): Promise<[affectedCount: number, affectedRows: ExamTimeTable[]]> => {
  const transaction = await dbClient.transaction()
  try {
    let updatedData = await ExamTimeTable.update(data, {
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

// Delete ExamTimeTable
export const deleteExamTimeTable = async (
  options: DestroyOptions<ExamTimeTable>,
): Promise<number> => {
  const transaction = await dbClient.transaction()
  try {
    let deletedCnt = await ExamTimeTable.destroy(options)
    await transaction.commit()
    return deletedCnt
  } catch (error) {
    await transaction.rollback()
    throw error
  }
}
