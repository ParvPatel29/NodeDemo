import { FindOptions } from 'sequelize'
import { UpdateOptions, DestroyOptions } from 'sequelize/types'

import dbClient from '../index'

import {
  kt_questionBank as QuestionBank,
  kt_questionBankAttributes as QuestionBankAttributes,
  kt_questionBankCreationAttributes as QuestionBankCreationAttributes,
} from '../model/init-models'

// Get All Questions
export const getAllQuestion = async (
  options: FindOptions<QuestionBank>,
): Promise<QuestionBank[] | []> => {
  const question = await QuestionBank.findAll(options)
  return question
}

// Create a New Question
export const createQuestion = async (
  data: QuestionBankCreationAttributes,
): Promise<QuestionBank> => {
  const transaction = await dbClient.transaction()
  try {
    const question = await QuestionBank.create(data, {
      transaction,
    })
    await transaction.commit()
    return question
  } catch (error) {
    await transaction.rollback()
    throw error
  }
}

// Get one Question
export const getQuestion = async (
  options: FindOptions<QuestionBank>,
): Promise<QuestionBank | null> => {
  try {
    const question = await QuestionBank.findOne(options)
    return question
  } catch (error) {
    throw error
  }
}

// Update Question
export const updateQuestion = async (
  options: UpdateOptions<QuestionBankAttributes>,
  data: Partial<QuestionBank>,
): Promise<[affectedCount: number, affectedRows: QuestionBank[]]> => {
  const transaction = await dbClient.transaction()
  try {
    let updatedQuestion = await QuestionBank.update(data, {
      ...options,
      transaction,
      returning: true,
    })

    await transaction.commit()
    return updatedQuestion
  } catch (error) {
    await transaction.rollback()
    throw error
  }
}

// Delete Question
export const deleteQuestion = async (
  options: DestroyOptions<QuestionBank>,
): Promise<number> => {
  const transaction = await dbClient.transaction()
  try {
    let deleteQuestion = await QuestionBank.destroy(options)
    await transaction.commit()
    return deleteQuestion
  } catch (error) {
    await transaction.rollback()
    throw error
  }
}
