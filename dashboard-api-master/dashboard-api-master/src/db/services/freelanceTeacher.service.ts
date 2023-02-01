import { FindOptions } from 'sequelize'
import { UpdateOptions, DestroyOptions } from 'sequelize/types'

import dbClient from '../index'

import {
  kt_freelancerTeacher as FreelanceTeacher,
  kt_freelancerTeacherAttributes as FreelanceTeacherAttributes,
  kt_freelancerTeacherCreationAttributes as FreelanceTeacherCreationAttributes,
} from '../model/init-models'

// Get All Freelance-Teachers
export const getAllFreelanceTeachers = async (
  options: FindOptions<FreelanceTeacher>,
): Promise<FreelanceTeacher[] | []> => {
  const freelanceTeachers = await FreelanceTeacher.findAll(options)
  return freelanceTeachers
}

// Create a New Freelance-Teacher
export const createFreelanceTeacher = async (
  data: FreelanceTeacherCreationAttributes,
): Promise<FreelanceTeacher> => {
  const transaction = await dbClient.transaction()
  try {
    const freelanceTeacher = await FreelanceTeacher.create(data, {
      transaction,
    })
    await transaction.commit()
    return freelanceTeacher
  } catch (error) {
    await transaction.rollback()
    throw error
  }
}

// Get one Freelance-Teacher
export const getFreelanceTeacher = async (
  options: FindOptions<FreelanceTeacher>,
): Promise<FreelanceTeacher | null> => {
  try {
    const freelanceTeacher = await FreelanceTeacher.findOne(options)
    return freelanceTeacher
  } catch (error) {
    throw error
  }
}

// Update Freelance-Teacher
export const updateFreelanceTeacher = async (
  options: UpdateOptions<FreelanceTeacherAttributes>,
  data: Partial<FreelanceTeacher>,
): Promise<[affectedCount: number, affectedRows: FreelanceTeacher[]]> => {
  const transaction = await dbClient.transaction()
  try {
    let updatedData = await FreelanceTeacher.update(data, {
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

// Delete Freelance-Teacher
export const deleteFreelanceTeacher = async (
  options: DestroyOptions<FreelanceTeacher>,
): Promise<number> => {
  const transaction = await dbClient.transaction()
  try {
    let deletedCnt = await FreelanceTeacher.destroy(options)
    await transaction.commit()
    return deletedCnt
  } catch (error) {
    await transaction.rollback()
    throw error
  }
}
