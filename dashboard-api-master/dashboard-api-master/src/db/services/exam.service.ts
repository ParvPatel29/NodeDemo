import { FindOptions } from 'sequelize'
import { UpdateOptions, DestroyOptions } from 'sequelize/types'

import dbClient from '../index'

import {
  kt_exam as Exam,
  kt_examAttributes as ExamAttributes,
  kt_examCreationAttributes as ExamCreationAttributes,
} from '../model/init-models'

// Get All Exam
export const getAllExam = async (
  options: FindOptions<Exam>,
): Promise<Exam[] | []> => {
  const exam = await Exam.findAll(options)
  return exam
}

// Create a New Exam
export const createExam = async (
  data: ExamCreationAttributes,
): Promise<Exam> => {
  const transaction = await dbClient.transaction()
  try {
    const exam = await Exam.create(data, {
      transaction,
    })
    await transaction.commit()
    return exam
  } catch (error) {
    await transaction.rollback()
    throw error
  }
}

// Get one Exam
export const getExam = async (
  options: FindOptions<Exam>,
): Promise<Exam | null> => {
  try {
    const exam = await Exam.findOne(options)
    return exam
  } catch (error) {
    throw error
  }
}

// Update Exam
export const updateExam = async (
  options: UpdateOptions<ExamAttributes>,
  data: Partial<Exam>,
): Promise<[affectedCount: number, affectedRows: Exam[]]> => {
  const transaction = await dbClient.transaction()
  try {
    let updatedData = await Exam.update(data, {
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

// Delete Exam
export const deleteExam = async (
  options: DestroyOptions<Exam>,
): Promise<number> => {
  const transaction = await dbClient.transaction()
  try {
    let deletedCnt = await Exam.destroy(options)
    await transaction.commit()
    return deletedCnt
  } catch (error) {
    await transaction.rollback()
    throw error
  }
}
