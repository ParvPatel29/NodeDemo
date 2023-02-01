import { FindOptions } from 'sequelize'
import { UpdateOptions, DestroyOptions } from 'sequelize/types'
import dbClient from '../index'
import {
  kt_studentsRemarkAttributes as StudentRemarkAttributes,
  kt_studentsRemarkCreationAttributes as StudentRemarkCreationAttributes,
  kt_studentsRemark as StudentRemark,
} from '../model/init-models'

// Create a New StudentRemark
export const createStudentRemark = async (
  data: StudentRemarkCreationAttributes,
): Promise<StudentRemark> => {
  const transaction = await dbClient.transaction()
  try {
    const kt_StudentRemark = await StudentRemark.create(data, { transaction })
    await transaction.commit()
    return kt_StudentRemark
  } catch (error) {
    await transaction.rollback()
    throw error
  }
}

// Get one StudentRemark
export const getStudentRemark = async (
  options: FindOptions<StudentRemark>,
): Promise<StudentRemark | null> => {
  try {
    const kt_StudentRemark = await StudentRemark.findOne(options)
    return kt_StudentRemark
  } catch (error) {
    throw error
  }
}

export const updateStudentRemark = async (
  options: UpdateOptions<StudentRemarkAttributes>,
  data: Partial<StudentRemark>,
): Promise<[affectedCount: number, affectedRows: StudentRemark[]]> => {
  const transaction = await dbClient.transaction()
  try {
    let updatedData = await StudentRemark.update(data, {
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

// Get All StudentRemarks
export const getAllStudentRemark = async (
  options: FindOptions<StudentRemark>,
): Promise<StudentRemark[] | []> => {
  const team = await StudentRemark.findAll(options)
  return team
}

// delete StudentRemark
export const deleteStudentRemark = async (
  options: DestroyOptions<StudentRemark>,
): Promise<number> => {
  const transaction = await dbClient.transaction()
  try {
    let deleteRemark = await StudentRemark.destroy(options)
    await transaction.commit()
    return deleteRemark
  } catch (error) {
    await transaction.rollback()
    throw error
  }
}
