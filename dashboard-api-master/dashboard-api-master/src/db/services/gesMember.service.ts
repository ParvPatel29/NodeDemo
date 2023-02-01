import { FindOptions } from 'sequelize'
import { UpdateOptions, DestroyOptions } from 'sequelize/types'

import dbClient from '../index'

import {
  kt_GESMember as GESMember,
  kt_GESMemberAttributes as GESMemberAttributes,
  kt_GESMemberCreationAttributes as GESMemberCreationAttributes,
} from '../model/init-models'

// Get All GES-Members
export const getAllGESMembers = async (
  options: FindOptions<GESMember>,
): Promise<GESMember[] | []> => {
  const gesMembers = await GESMember.findAll(options)
  return gesMembers
}

// Create a New GES-Member
export const createGESMember = async (
  data: GESMemberCreationAttributes,
): Promise<GESMember> => {
  const transaction = await dbClient.transaction()
  try {
    const gesMember = await GESMember.create(data, {
      transaction,
    })
    await transaction.commit()
    return gesMember
  } catch (error) {
    await transaction.rollback()
    throw error
  }
}

// Get one GES-Member
export const getGESMember = async (
  options: FindOptions<GESMember>,
): Promise<GESMember | null> => {
  try {
    const gesMember = await GESMember.findOne(options)
    return gesMember
  } catch (error) {
    throw error
  }
}

// Update GES-Member
export const updateGESMember = async (
  options: UpdateOptions<GESMemberAttributes>,
  data: Partial<GESMember>,
): Promise<[affectedCount: number, affectedRows: GESMember[]]> => {
  const transaction = await dbClient.transaction()
  try {
    let updatedData = await GESMember.update(data, {
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

// Delete GES-Member
export const deleteGESMember = async (
  options: DestroyOptions<GESMember>,
): Promise<number> => {
  const transaction = await dbClient.transaction()
  try {
    let deletedCnt = await GESMember.destroy(options)
    await transaction.commit()
    return deletedCnt
  } catch (error) {
    await transaction.rollback()
    throw error
  }
}
