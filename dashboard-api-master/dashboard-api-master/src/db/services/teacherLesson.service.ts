import { FindOptions } from 'sequelize'
import { UpdateOptions, DestroyOptions } from 'sequelize/types'
import dbClient from '../index'
import {
  kt_teacherLessonAttributes as TeacherLessonAttributes,
  kt_teacherLessonCreationAttributes as TeacherLessonCreationAttributes,
  kt_teacherLesson as TeacherLesson,
} from '../model/init-models'

// Create a New TeacherLesson
export const createTeacherLesson = async (
  data: TeacherLessonCreationAttributes,
): Promise<TeacherLesson> => {
  const transaction = await dbClient.transaction()
  try {
    const kt_TeacherLesson = await TeacherLesson.create(data, { transaction })
    await transaction.commit()
    return kt_TeacherLesson
  } catch (error) {
    await transaction.rollback()
    throw error
  }
}

// Get one TeacherLesson
export const getTeacherLesson = async (
  options: FindOptions<TeacherLesson>,
): Promise<TeacherLesson | null> => {
  try {
    const kt_TeacherLesson = await TeacherLesson.findOne(options)
    return kt_TeacherLesson
  } catch (error) {
    throw error
  }
}

export const updateTeacherLesson = async (
  options: UpdateOptions<TeacherLessonAttributes>,
  data: Partial<TeacherLesson>,
): Promise<[affectedCount: number, affectedRows: TeacherLesson[]]> => {
  const transaction = await dbClient.transaction()
  try {
    let updatedData = await TeacherLesson.update(data, {
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

// Get All TeacherLessons
export const getAllTeacherLesson = async (
  options: FindOptions<TeacherLesson>,
): Promise<TeacherLesson[] | []> => {
  const team = await TeacherLesson.findAll(options)
  return team
}

// delete TeacherLesson
export const deleteTeacherLesson = async (
  options: DestroyOptions<TeacherLesson>,
): Promise<number> => {
  const transaction = await dbClient.transaction()
  try {
    let deleteRemark = await TeacherLesson.destroy(options)
    await transaction.commit()
    return deleteRemark
  } catch (error) {
    await transaction.rollback()
    throw error
  }
}
