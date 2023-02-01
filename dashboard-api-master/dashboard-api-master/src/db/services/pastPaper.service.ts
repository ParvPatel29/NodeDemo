import { FindOptions } from 'sequelize'
import { UpdateOptions, DestroyOptions } from 'sequelize/types'
import dbClient from '../index'
import {
  kt_pastPaperAttributes as PastPaperAttributes,
  kt_pastPaperCreationAttributes as PastPaperCreationAttributes,
  kt_pastPaper as PastPaper,
} from '../model/init-models'

// Create a New PastPaper
export const createPastPaper = async (
  data: PastPaperCreationAttributes,
): Promise<PastPaper> => {
  const transaction = await dbClient.transaction()
  try {
    const kt_assignment = await PastPaper.create(data, { transaction })
    await transaction.commit()
    return kt_assignment
  } catch (error) {
    await transaction.rollback()
    throw error
  }
}

// Get one PastPaper
export const getPastPaper = async (
  options: FindOptions<PastPaper>,
): Promise<PastPaper | null> => {
  try {
    const kt_pastPaper = await PastPaper.findOne(options)
    return kt_pastPaper
  } catch (error) {
    throw error
  }
}

export const updatePastPaper = async (
  options: UpdateOptions<PastPaperAttributes>,
  data: Partial<PastPaper>,
): Promise<[affectedCount: number, affectedRows: PastPaper[]]> => {
  const transaction = await dbClient.transaction()
  try {
    let updatedData:any = await PastPaper.update(data, {
      ...options,
      transaction,
      returning: true,
    })

    await transaction.commit()
    return updatedData[1]
  } catch (error) {
    await transaction.rollback()
    throw error
  }
}

// Get All PastPaper
export const getAllPastPaper = async (
  options: FindOptions<PastPaper>,
): Promise<PastPaper[] | []> => {
  const team = await PastPaper.findAll(options)
  return team
}

// delete PastPaper
export const deletePastPaper = async (
  options: DestroyOptions<PastPaper>,
): Promise<number> => {
  const transaction = await dbClient.transaction()
  try {
    let deletedCnt = await PastPaper.destroy(options)
    await transaction.commit()
    return deletedCnt
  } catch (error) {
    await transaction.rollback()
    throw error
  }
}

// Count PastPaper
export const countPastPaper = async (
  options: FindOptions<PastPaper>,
): Promise<PastPaper | number> => {
  const pastPaper = await PastPaper.count(options)
  return pastPaper
}
