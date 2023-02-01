import { FindOptions } from 'sequelize'
import { UpdateOptions, DestroyOptions } from 'sequelize/types'

import dbClient from '../index'

import {
  kt_GESOfficeStaff as GESOfficeStaff,
  kt_GESOfficeStaffAttributes as GESOfficeStaffAttributes,
  kt_GESOfficeStaffCreationAttributes as GESOfficeStaffCreationAttributes,
} from '../model/init-models'

// Get All GES-OfficeStaffs
export const getAllGESOfficeStaff = async (
  options: FindOptions<GESOfficeStaff>,
): Promise<GESOfficeStaff[] | []> => {
  const gesOfficeStaffs = await GESOfficeStaff.findAll(options)
  console.log(gesOfficeStaffs)
  return gesOfficeStaffs
}

// Create a New GES-OfficeStaff
export const createGESOfficeStaff = async (
  data: GESOfficeStaffCreationAttributes,
): Promise<GESOfficeStaff> => {
  const transaction = await dbClient.transaction()
  try {
    const gesOfficeStaff = await GESOfficeStaff.create(data, {
      transaction,
    })
    await transaction.commit()
    return gesOfficeStaff
  } catch (error) {
    await transaction.rollback()
    throw error
  }
}

// Get one GES-OfficeStaff
export const getGESOfficeStaff = async (
  options: FindOptions<GESOfficeStaff>,
): Promise<GESOfficeStaff | null> => {
  try {
    const gesOfficeStaff = await GESOfficeStaff.findOne(options)
    return gesOfficeStaff
  } catch (error) {
    throw error
  }
}

// Update GES-OfficeStaff
export const updateGESOfficeStaff = async (
  options: UpdateOptions<GESOfficeStaffAttributes>,
  data: Partial<GESOfficeStaff>,
): Promise<[affectedCount: number, affectedRows: GESOfficeStaff[]]> => {
  const transaction = await dbClient.transaction()
  try {
    let updatedData = await GESOfficeStaff.update(data, {
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

// Delete GES-OfficeStaff
export const deleteGESOfficeStaff = async (
  options: DestroyOptions<GESOfficeStaff>,
): Promise<number> => {
  const transaction = await dbClient.transaction()
  try {
    let deletedStaff = await GESOfficeStaff.destroy(options)
    await transaction.commit()
    return deletedStaff
  } catch (error) {
    await transaction.rollback()
    throw error
  }
}
