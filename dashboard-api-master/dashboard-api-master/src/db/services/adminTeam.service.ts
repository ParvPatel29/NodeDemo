import { FindOptions } from 'sequelize'
import { UpdateOptions, DestroyOptions } from 'sequelize/types'

// Data-Base Config(Connection)
import dbClient from '../index'

// AdminTeam Model And AdminTeam Attributes
import {
  kt_adminTeamAttributes as AdminTeamAttributes,
  kt_adminTeamCreationAttributes as AdminTeamCreationAttributes,
  kt_adminTeam as AdminTeam,
} from '../model/init-models'

// Create a New AdminTeam In Database
export const createAdminTeamMember = async (
  data: AdminTeamCreationAttributes,
): Promise<AdminTeam> => {
  const transaction = await dbClient.transaction()
  try {
    const kt_adminTeam = await AdminTeam.create(data, { transaction })
    await transaction.commit()
    return kt_adminTeam
  } catch (error) {
    await transaction.rollback()
    throw error
  }
}

// Get AdminTeam From Database
export const getAdminTeamMember = async (
  options: FindOptions<AdminTeam>,
): Promise<AdminTeam | null> => {
  try {
    const kt_adminTeam = await AdminTeam.findOne(options)
    return kt_adminTeam
  } catch (error) {
    throw error
  }
}

export const updateAdminTeamMember = async (
  options: UpdateOptions<AdminTeamAttributes>,
  data: Partial<AdminTeam>,
): Promise<[affectedCount: number, affectedRows: AdminTeam[]]> => {
  const transaction = await dbClient.transaction()
  try {
    let updatedData = await AdminTeam.update(data, {
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

// Get All Teams From DB
export const getAllAdminTeamMember = async (
  options: FindOptions<AdminTeam>,
): Promise<AdminTeam[] | []> => {
  const team = await AdminTeam.findAll(options)
  return team
}

export const deleteAdminTeamMember = async (
  options: DestroyOptions<AdminTeam>,
): Promise<number> => {
  const transaction = await dbClient.transaction()
  try {
    let deletedCnt = await AdminTeam.destroy(options)
    await transaction.commit()
    return deletedCnt
  } catch (error) {
    await transaction.rollback()
    throw error
  }
}
