import { FindOptions } from 'sequelize'
import { UpdateOptions, DestroyOptions } from 'sequelize/types'
import dbClient from '../index'
import {
  kt_studentAttendanceAttributes as StudentAttendanceAttributes,
  kt_studentAttendanceCreationAttributes as StudentAttendanceCreationAttributes,
  kt_studentAttendance as StudentAttendance,
} from '../model/init-models'

// Create a New StudentAttendance
export const createStudentAttendance = async (
  data: StudentAttendanceCreationAttributes[],
): Promise<StudentAttendance[]> => {
  const transaction = await dbClient.transaction()
  try {
    const kt_StudentAttendance = await StudentAttendance.bulkCreate(data, {
      transaction,
    })
    await transaction.commit()
    return kt_StudentAttendance
  } catch (error) {
    await transaction.rollback()
    throw error
  }
}

export const createStudentAttendanceFromStudent = async (
  data: StudentAttendanceCreationAttributes,
): Promise<StudentAttendance> => {
  const transaction = await dbClient.transaction()
  try {
    const kt_StudentAttendance = await StudentAttendance.create(data, {
      transaction,
    })
    await transaction.commit()
    return kt_StudentAttendance
  } catch (error) {
    await transaction.rollback()
    throw error
  }
}

// Get one studentAttendance
export const getStudentAttendance = async (
  options: FindOptions<StudentAttendance>,
): Promise<StudentAttendance | null> => {
  try {
    const kt_student = await StudentAttendance.findOne(options)
    return kt_student
  } catch (error) {
    throw error
  }
}

export const updateStudentAttendance = async (
  options: UpdateOptions<StudentAttendanceAttributes>,
  data: Partial<StudentAttendance>,
): Promise<[affectedCount: number, affectedRows: StudentAttendance[]]> => {
  const transaction = await dbClient.transaction()
  try {
    let updatedData = await StudentAttendance.update(data, {
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

// Get All StudentAttendance
export const getAllStudentAttendances = async (
  options: FindOptions<StudentAttendance>,
): Promise<StudentAttendance[] | []> => {
  const team = await StudentAttendance.findAll(options)
  return team
}

// delete StudentAttendance
export const deleteStudentAttendance = async (
  options: DestroyOptions<StudentAttendance>,
): Promise<number> => {
  const transaction = await dbClient.transaction()
  try {
    let deletedCnt = await StudentAttendance.destroy(options)
    await transaction.commit()
    return deletedCnt
  } catch (error) {
    await transaction.rollback()
    throw error
  }
}

// Count StudentAttendance
export const countStudentAttendance = async (
  options: FindOptions<StudentAttendance>,
): Promise<StudentAttendance | number> => {
  const tudentAttendance = await StudentAttendance.count(options)
  return tudentAttendance
}
