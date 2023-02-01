import { FindOptions } from 'sequelize'
import { UpdateOptions, DestroyOptions } from 'sequelize/types'
import dbClient from '../index'
import {
  kt_genreAttributes as GenreAttributes,
  kt_genreCreationAttributes as GenreCreationAttributes,
  kt_genre as Genre,
} from '../model/init-models'
import {
  kt_trainingParticipants as TrainingParticipants,
  kt_trainingParticipantsCreationAttributes as TrainingParticipantsCreationAttributes,
  kt_trainingParticipantsAttributes as TrainingParticipantsAttributes,
} from '../model/init-models'

// Create a New TrainingParticipants
export const createTrainingParticipants = async (
  data: TrainingParticipantsCreationAttributes,
): Promise<TrainingParticipants> => {
  const transaction = await dbClient.transaction()
  try {
    const trainingParticipants = await TrainingParticipants.create(data, { transaction })
    await transaction.commit()
    return trainingParticipants
  } catch (error) {
    await transaction.rollback()
    throw error
  }
}

// Get one TrainingParticipants
export const getTrainingParticipants = async (
  options: FindOptions<TrainingParticipants>,
): Promise<TrainingParticipants | null> => {
  try {
    const trainingParticipants = await TrainingParticipants.findOne(options)
    return trainingParticipants
  } catch (error) {
    throw error
  }
}

export const updateTrainingParticipants = async (
  options: UpdateOptions<TrainingParticipantsAttributes>,
  data: Partial<TrainingParticipants>,
): Promise<[affectedCount: number, affectedRows: TrainingParticipants[]]> => {
  const transaction = await dbClient.transaction()
  try {
    let updatedData = await TrainingParticipants.update(data, {
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

// Get All TrainingParticipants
export const getAllTrainingParticipants = async (
  options: FindOptions<TrainingParticipants>,
): Promise<TrainingParticipants[] | []> => {
  const team = await TrainingParticipants.findAll(options)
  return team
}

// delete TrainingParticipants
export const deleteTrainingParticipants = async (
  options: DestroyOptions<TrainingParticipants>,
): Promise<number> => {
  const transaction = await dbClient.transaction()
  try {
    let deletedGenre = await TrainingParticipants.destroy(options)
    await transaction.commit()
    return deletedGenre
  } catch (error) {
    await transaction.rollback()
    throw error
  }
}
