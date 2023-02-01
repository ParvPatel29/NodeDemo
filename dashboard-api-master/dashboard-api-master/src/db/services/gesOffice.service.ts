import { FindOptions } from 'sequelize'
import { UpdateOptions, DestroyOptions } from 'sequelize/types'

import dbClient from '../index'

import {
  kt_GESOffice as GESOffice,
  kt_GESOfficeAttributes as GESOfficeAttributes,
  kt_GESOfficeCreationAttributes as GESOfficeCreationAttributes,
} from '../model/init-models'

// Get All GES-Offices
export const getAllGESOffices = async (
  options: FindOptions<GESOffice>,
): Promise<GESOffice[] | []> => {
  const gesOffices = await GESOffice.findAll(options)
  return gesOffices
}

// Create a New GES-Office
export const createGESOffice = async (
  data: GESOfficeCreationAttributes,
): Promise<GESOffice> => {
  const transaction = await dbClient.transaction()
  try {
    const gesOffice = await GESOffice.create(data, {
      transaction,
    })
    await transaction.commit()
    return gesOffice
  } catch (error) {
    await transaction.rollback()
    throw error
  }
}

// Get one GES-Office
export const getGESOffice = async (
  options: FindOptions<GESOffice>,
): Promise<GESOffice | null> => {
  try {
    const gesOffice = await GESOffice.findOne(options)
    return gesOffice
  } catch (error) {
    throw error
  }
}

// Update GES-Office
export const updateGESOffice = async (
  options: UpdateOptions<GESOfficeAttributes>,
  data: Partial<GESOffice>,
): Promise<[affectedCount: number, affectedRows: GESOffice[]]> => {
  const transaction = await dbClient.transaction()
  try {
    let updatedData = await GESOffice.update(data, {
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

// Delete GES-Office
export const deleteGESOffice = async (
  options: DestroyOptions<GESOffice>,
): Promise<number> => {
  const transaction = await dbClient.transaction()
  try {
    let deletedCnt = await GESOffice.destroy(options)
    await transaction.commit()
    return deletedCnt
  } catch (error) {
    await transaction.rollback()
    throw error
  }
}
