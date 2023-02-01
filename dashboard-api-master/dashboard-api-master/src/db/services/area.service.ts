import { FindOptions } from 'sequelize'
import { UpdateOptions, DestroyOptions } from 'sequelize/types'

// Data-Base Config(Connection)
import dbClient from '../index'

// Area Model And Area Attributes
import {
  kt_areaAttributes as AreaAttributes,
  kt_areaCreationAttributes as AreaCreationAttributes,
  kt_area as Area,
} from '../model/init-models'

// Create a New Area
export const createArea = async (
  data: AreaCreationAttributes,
): Promise<Area> => {
  const transaction = await dbClient.transaction()
  try {
    const area = await Area.create(data, { transaction })
    await transaction.commit()
    return area
  } catch (error) {
    await transaction.rollback()
    throw error
  }
}

// Get Area
export const getArea = async (
  options: FindOptions<Area>,
): Promise<Area | null> => {
  try {
    const area = await Area.findOne(options)
    return area
  } catch (error) {
    throw error
  }
}

// Get All Areas
export const getAllArea = async (
  options: FindOptions<Area>,
): Promise<Area[] | []> => {
  const area = await Area.findAll(options)
  return area
}

// Delete Area
export const deleteArea = async (
  options: DestroyOptions<Area>,
): Promise<number> => {
  const transaction = await dbClient.transaction()
  try {
    let deletedCnt = await Area.destroy(options)
    await transaction.commit()
    return deletedCnt
  } catch (error) {
    await transaction.rollback()
    throw error
  }
}

// Bulk Create
export const createBulkArea = async (
  data: AreaCreationAttributes[],
): Promise<Area[]> => {
  const transaction = await dbClient.transaction()
  try {
    const area = await Area.bulkCreate(data, { transaction })
    await transaction.commit()
    return area
  } catch (error) {
    await transaction.rollback()
    throw error
  }
}

export const countArea = async (
  options: FindOptions<Area>,
): Promise<Area[] | number> => {
  const area = await Area.count(options)
  return area
}
