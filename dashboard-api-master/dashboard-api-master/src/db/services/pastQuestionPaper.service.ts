import { FindOptions } from 'sequelize'
import { UpdateOptions, DestroyOptions } from 'sequelize/types'
import dbClient from '../index'
import {
  kt_pastQuestionPaperAttributes as PastQuestionPaperAttributes,
  kt_pastQuestionPaperCreationAttributes as PastQuestionPaperCreationAttributes,
  kt_pastQuestionPaper as PastQuestionPaper,
} from '../model/init-models'

// Create a New createPastPaperQue
export const createPastQuestionPaper = async (
  data: PastQuestionPaperCreationAttributes,
): Promise<PastQuestionPaper> => {
  const transaction = await dbClient.transaction()
  try {
    const kt_PastQuestionPaperQue = await PastQuestionPaper.create(data, { transaction })
    await transaction.commit()
    return kt_PastQuestionPaperQue
  } catch (error) {
    await transaction.rollback()
    throw error
  }
}

// Get one AssignmentQue
export const getPastQuestionPaper = async (
  options: FindOptions<PastQuestionPaper>,
): Promise<PastQuestionPaper | null> => {
  try {
    const kt_pastQuestionPaper = await PastQuestionPaper.findOne(options)
    return kt_pastQuestionPaper
  } catch (error) {
    throw error
  }
}
// Update Past Question Paper
export const updatePastQuestionPaper = async (
  options: UpdateOptions<PastQuestionPaperAttributes>,
  data: Partial<PastQuestionPaper>,
): Promise<[affectedCount: number, affectedRows: PastQuestionPaper[]]> => {
  const transaction = await dbClient.transaction()
  try {
    let updatedData:any = await PastQuestionPaper.update(data, {
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

// Get All Past Question Paper
export const getAllPastQuestionPaper = async (
  options: FindOptions<PastQuestionPaper>,
): Promise<PastQuestionPaper[] | []> => {
  const team = await PastQuestionPaper.findAll(options)
  return team
}

// delete PastQuestionPaper
export const deletePastQuestionPaper = async (
  options: DestroyOptions<PastQuestionPaper>,
): Promise<number> => {
  const transaction = await dbClient.transaction()
  try {
    let deletedCnt = await PastQuestionPaper.destroy(options)
    await transaction.commit()
    return deletedCnt
  } catch (error) {
    await transaction.rollback()
    throw error
  }
}

// Count PastQuestionPaper
export const countAssignmentQue = async (
  options: FindOptions<PastQuestionPaper>,
): Promise<PastQuestionPaper | number> => {
  const pastQuestionPaper = await PastQuestionPaper.count(options)
  return pastQuestionPaper
}
