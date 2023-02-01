import { FindOptions } from 'sequelize'
import { UpdateOptions, DestroyOptions } from 'sequelize/types'

import dbClient from '../index'

import {
  kt_trainingProgram as TrainingProgram,
  kt_trainingProgramAttributes as TrainingProgramAttributes,
  kt_trainingProgramCreationAttributes as TrainingProgramCreationAttributes,
} from '../model/init-models'

// Get All Training-Programs
export const getAllTrainingPrograms = async (
  options: FindOptions<TrainingProgram>,
): Promise<TrainingProgram[] | []> => {
  const trainingPrograms = await TrainingProgram.findAll(options)
  return trainingPrograms
}

// Create a New Training-Program
export const createTrainingProgram = async (
  data: TrainingProgramCreationAttributes,
): Promise<TrainingProgram> => {
  const transaction = await dbClient.transaction()
  try {
    const trainingProgram = await TrainingProgram.create(data, {
      transaction,
    })
    await transaction.commit()
    return trainingProgram
  } catch (error) {
    await transaction.rollback()
    throw error
  }
}

// Get one Training-Program
export const getTrainingProgram = async (
  options: FindOptions<TrainingProgram>,
): Promise<TrainingProgram | null> => {
  try {
    const trainingProgram = await TrainingProgram.findOne(options)
    return trainingProgram
  } catch (error) {
    throw error
  }
}

// Update Training-Program
export const updateTrainingProgram = async (
  options: UpdateOptions<TrainingProgramAttributes>,
  data: Partial<TrainingProgram>,
): Promise<[affectedCount: number, affectedRows: TrainingProgram[]]> => {
  const transaction = await dbClient.transaction()
  try {
    let updatedData = await TrainingProgram.update(data, {
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

// Delete Training-Program
export const deleteTrainingProgram = async (
  options: DestroyOptions<TrainingProgram>,
): Promise<number> => {
  const transaction = await dbClient.transaction()
  try {
    let deletedCnt = await TrainingProgram.destroy(options)
    await transaction.commit()
    return deletedCnt
  } catch (error) {
    await transaction.rollback()
    throw error
  }
}
