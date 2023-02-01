import { FindOptions } from 'sequelize'
import { UpdateOptions, DestroyOptions } from 'sequelize/types'
import dbClient from '../index'
import {
  kt_schoolAttributes as SchoolAttributes,
  kt_schoolCreationAttributes as SchoolCreationAttributes,
  kt_school as School,
} from '../model/init-models'

// Create a New School
export const createSchool = async (
  data: SchoolCreationAttributes,
): Promise<School> => {
  const transaction = await dbClient.transaction()
  try {
    const kt_school = await School.create(data, { transaction })
    await transaction.commit()
    return kt_school
  } catch (error) {
    await transaction.rollback()
    throw error
  }
}

// Create a Bulk School
export const createBulkSchool = async (
  data: SchoolCreationAttributes[],
): Promise<School[]> => {
  const transaction = await dbClient.transaction()
  try {
    const kt_school = await School.bulkCreate(data, { transaction })
    await transaction.commit()
    return kt_school
  } catch (error) {
    await transaction.rollback()
    throw error
  }
}

// Get one school
export const getSchool = async (
  options: FindOptions<School>,
): Promise<School | null> => {
  try {
    const kt_school = await School.findOne(options)
    return kt_school
  } catch (error) {
    throw error
  }
}

export const updateSchool = async (
  options: UpdateOptions<SchoolAttributes>,
  data: Partial<School>,
): Promise<[affectedCount: number, affectedRows: School[]]> => {
  const transaction = await dbClient.transaction()
  try {
    let updatedData = await School.update(data, {
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

// Get All Schools
export const getAllSchool = async (
  options: FindOptions<School>,
): Promise<School[] | []> => {
  const school = await School.findAll(options)
  return school
}

// delete school
export const deleteSchool = async (
  options: DestroyOptions<School>,
): Promise<number> => {
  const transaction = await dbClient.transaction()
  try {
    let deletedCnt = await School.destroy(options)
    await transaction.commit()
    return deletedCnt
  } catch (error) {
    await transaction.rollback()
    throw error
  }
}

// Count School
export const countSchool = async (
  options: FindOptions<School>,
): Promise<School | number> => {
  const school = await School.count(options)
  return school
}
