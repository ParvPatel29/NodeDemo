import { FindOptions } from 'sequelize'
import { UpdateOptions, DestroyOptions } from 'sequelize/types'
import dbClient from '../index'
import {
  kt_termlySchemeCreationAttributes as TermlySchemeCreationAttributes,
  kt_termlySchemeAttributes as TermlySchemeAttributes,
  kt_termlyScheme as TermlyScheme,
  kt_yearlySchemeCreationAttributes as YearlySchemeCreationAttributes,
  kt_yearlySchemeAttributes as YearlySchemeAttributes,
  kt_yearlyScheme as YearlyScheme

} from '../model/init-models'

// Create a New YearlyScheme
export const createYearlyScheme = async (
  data: YearlySchemeCreationAttributes,
): Promise<YearlyScheme> => {
  const transaction = await dbClient.transaction()
  try {
    const kt_yearlyScheme = await YearlyScheme.create(data, { transaction })
    await transaction.commit()
    return kt_yearlyScheme
  } catch (error) {
    await transaction.rollback()
    throw error
  }
}

// Get one YearlyScheme
export const getYearlyScheme = async (
  options: FindOptions<YearlyScheme>,
): Promise<YearlyScheme | null> => {
  try {
    const kt_yearlyScheme = await YearlyScheme.findOne(options)
    return kt_yearlyScheme
  } catch (error) {
    throw error
  }
}

// Update YearlyScheme
export const updateYearlyScheme = async (
  options: UpdateOptions<YearlySchemeAttributes>,
  data: Partial<YearlyScheme>,
): Promise<[affectedCount: number, affectedRows: YearlyScheme[]]> => {
  const transaction = await dbClient.transaction()
  try {
    let updatedData:any = await YearlyScheme.update(data, {
      ...options,
      transaction,
      returning: true,
    })
    await transaction.commit()
    return updatedData[1]
  } catch (error) {
    await transaction.rollback()
    throw error
  }
}

// Get All YearlyScheme
export const getAllYearlyScheme = async (
  options: FindOptions<YearlyScheme>,
): Promise<YearlyScheme[] | []> => {
  const yearlyScheme = await YearlyScheme.findAll(options)
  return yearlyScheme
}

// delete YearlyScheme
export const deleteYearlyScheme = async (
  options: DestroyOptions<YearlyScheme>,
): Promise<number> => {
  const transaction = await dbClient.transaction()
  try {
    let deletedCnt = await YearlyScheme.destroy(options)
    await transaction.commit()
    return deletedCnt
  } catch (error) {
    await transaction.rollback()
    throw error
  }
}

// Count YearlyScheme
export const countTeacher = async (
  options: FindOptions<YearlyScheme>,
): Promise<YearlyScheme | number> => {
  const yearlyScheme = await YearlyScheme.count(options)
  return yearlyScheme
}
