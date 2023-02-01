import { FindOptions } from 'sequelize'
import { UpdateOptions, DestroyOptions } from 'sequelize/types'
import dbClient from '../index'
import {
  kt_teacherAttributes as TeacherAttributes,
  kt_publisherAttributes as PublisherAttributes,
  kt_teacherCreationAttributes as TeacherCreationAttributes,
  kt_teacher as Teacher,
  kt_publisher as Publisher,
} from '../model/init-models'

// Create a New Teacher
export const createTeacher = async (
  data: TeacherCreationAttributes,
): Promise<Teacher> => {
  const transaction = await dbClient.transaction()
  try {
    const kt_teacher = await Teacher.create(data, { transaction })
    await transaction.commit()
    return kt_teacher
  } catch (error) {
    await transaction.rollback()
    throw error
  }
}

// Get one teacher
export const getTeacher = async (
  options: FindOptions<Teacher>,
): Promise<Teacher | null> => {
  try {
    const kt_teacher = await Teacher.findOne(options)
    return kt_teacher
  } catch (error) {
    throw error
  }
}

export const updatePublisher = async (
  options: UpdateOptions<PublisherAttributes>,
  data: Partial<Publisher>,
): Promise<[affectedCount: number, affectedRows: Publisher[]]> => {
  const transaction = await dbClient.transaction()
  try {
    let updatedData:any = await Publisher.update(data, {
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

// Get All Teachers
export const getAllTeacher = async (
  options: FindOptions<Teacher>,
): Promise<Teacher[] | []> => {
  const team = await Teacher.findAll(options)
  return team
}

// delete teacher
export const deleteTeacher = async (
  options: DestroyOptions<Teacher>,
): Promise<number> => {
  const transaction = await dbClient.transaction()
  try {
    let deletedCnt = await Teacher.destroy(options)
    await transaction.commit()
    return deletedCnt
  } catch (error) {
    await transaction.rollback()
    throw error
  }
}

// Count Teacher
export const countTeacher = async (
  options: FindOptions<Teacher>,
): Promise<Teacher | number> => {
  const teacher = await Teacher.count(options)
  return teacher
}
