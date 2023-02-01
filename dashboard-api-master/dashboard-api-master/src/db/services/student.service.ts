import { FindOptions } from 'sequelize'
import { UpdateOptions, DestroyOptions } from 'sequelize/types'
import dbClient from '../index'
import {
  kt_studentAttributes as StudentAttributes,
  kt_studentCreationAttributes as StudentCreationAttributes,
  kt_student as Student,
} from '../model/init-models'

// Create a New Student
export const createStudent = async (
  data: StudentCreationAttributes,
): Promise<Student> => {
  const transaction = await dbClient.transaction()
  try {
    const kt_student = await Student.create(data, { transaction })
    await transaction.commit()
    return kt_student
  } catch (error) {
    await transaction.rollback()
    throw error
  }
}

// Get one student
export const getStudent = async (
  options: FindOptions<Student>,
): Promise<Student | null> => {
  try {
    const kt_student = await Student.findOne(options)
    return kt_student
  } catch (error) {
    throw error
  }
}

export const updateStudent = async (
  options: UpdateOptions<StudentAttributes>,
  data: Partial<Student>,
): Promise<[affectedCount: number, affectedRows: Student[]]> => {
  const transaction = await dbClient.transaction()
  try {
    let updatedData = await Student.update(data, {
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

// Get All Students
export const getAllStudents = async (
  options: FindOptions<Student>,
): Promise<Student[] | []> => {
  const team = await Student.findAll(options)
  return team
}

// delete student
export const deleteStudent = async (
  options: DestroyOptions<Student>,
): Promise<number> => {
  const transaction = await dbClient.transaction()
  try {
    let deletedCnt = await Student.destroy(options)
    await transaction.commit()
    return deletedCnt
  } catch (error) {
    await transaction.rollback()
    throw error
  }
}

// Count Student
export const countStudent = async (
  options: FindOptions<Student>,
): Promise<Student | number> => {
  const student = await Student.count(options)
  return student
}
