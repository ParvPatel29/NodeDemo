import { FindOptions } from 'sequelize'
import { UpdateOptions, DestroyOptions } from 'sequelize/types'
import dbClient from '../index'
import {
  kt_teacherCreationAttributes as TeacherCreationAttributes,
  kt_parentAttributes as ParentAttributes,
  kt_teacher as Teacher,
  kt_parent as Parent,
  kt_termlySchemeCreationAttributes as TermlySchemeCreationAttributes,
  kt_termlySchemeAttributes as TermlySchemeAttributes,
  kt_termlyScheme as TermlyScheme

} from '../model/init-models'

// Create a New TermlyScheme
export const createTermlyScheme = async (
  data: TermlySchemeCreationAttributes,
): Promise<TermlyScheme> => {
  const transaction = await dbClient.transaction()
  try {
    const kt_termlyScheme = await TermlyScheme.create(data, { transaction })
    await transaction.commit()
    return kt_termlyScheme
  } catch (error) {
    await transaction.rollback()
    throw error
  }
}

// Get one Termly Scheme
export const getTermlyScheme = async (
  options: FindOptions<TermlyScheme>,
): Promise<TermlyScheme | null> => {
  try {
    const kt_termlyScheme = await TermlyScheme.findOne(options)
    return kt_termlyScheme
  } catch (error) {
    throw error
  }
}

// Update Termly Scheme
export const updateTermlyScheme = async (
  options: UpdateOptions<TermlySchemeAttributes>,
  data: Partial<TermlyScheme>,
): Promise<[affectedCount: number, affectedRows: TermlyScheme[]]> => {
  const transaction = await dbClient.transaction()
  try {
    let updatedData:any = await TermlyScheme.update(data, {
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

// Get All Termly Scheme
export const getAllTermlyScheme = async (
  options: FindOptions<TermlyScheme>,
): Promise<TermlyScheme[] | []> => {
  const team = await TermlyScheme.findAll(options)
  return team
}

// delete Termly Scheme
export const deleteTermlyScheme = async (
  options: DestroyOptions<TermlyScheme>,
): Promise<number> => {
  const transaction = await dbClient.transaction()
  try {
    let deletedCnt = await TermlyScheme.destroy(options)
    await transaction.commit()
    return deletedCnt
  } catch (error) {
    await transaction.rollback()
    throw error
  }
}

// Count Termly Scheme
export const countTeacher = async (
  options: FindOptions<TermlyScheme>,
): Promise<TermlyScheme | number> => {
  const termlyScheme = await TermlyScheme.count(options)
  return termlyScheme
}
