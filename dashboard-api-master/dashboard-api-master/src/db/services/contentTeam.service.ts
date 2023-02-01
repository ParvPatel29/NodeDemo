import { FindOptions } from 'sequelize'
import { UpdateOptions, DestroyOptions } from 'sequelize/types'

// Data-Base Config(Connection)
import dbClient from '../index'

// ContentTeam Model And ContentTeam Attributes
import {
  kt_contentTeamAttributes as ContentTeamAttributes,
  kt_contentTeamCreationAttributes as ContentTeamCreationAttributes,
  kt_contentTeam as ContentTeam,
} from '../model/init-models'

// Create a New ContentTeam In Database
export const createContentTeamMember = async (
  data: ContentTeamCreationAttributes,
): Promise<ContentTeam> => {
  const transaction = await dbClient.transaction()
  try {
    const kt_contentTeam = await ContentTeam.create(data, { transaction })
    await transaction.commit()
    return kt_contentTeam
  } catch (error) {
    await transaction.rollback()
    throw error
  }
}

// Get ContentTeam From Database
export const getContentTeamMember = async (
  options: FindOptions<ContentTeam>,
): Promise<ContentTeam | null> => {
  try {
    const kt_contentTeam = await ContentTeam.findOne(options)
    return kt_contentTeam
  } catch (error) {
    throw error
  }
}

export const updateContentTeamMember = async (
  options: UpdateOptions<ContentTeamAttributes>,
  data: Partial<ContentTeam>,
): Promise<[affectedCount: number, affectedRows: ContentTeam[]]> => {
  const transaction = await dbClient.transaction()
  try {
    let updatedData = await ContentTeam.update(data, {
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

// Get All TeamMember From DB
export const getAllContentTeamMember = async (
  options: FindOptions<ContentTeam>,
): Promise<ContentTeam[] | []> => {
  const teamMember = await ContentTeam.findAll(options)
  return teamMember
}

export const deleteContentTeamMember = async (
  options: DestroyOptions<ContentTeam>,
): Promise<number> => {
  const transaction = await dbClient.transaction()
  try {
    let deletedCnt = await ContentTeam.destroy(options)
    await transaction.commit()
    return deletedCnt
  } catch (error) {
    await transaction.rollback()
    throw error
  }
}
