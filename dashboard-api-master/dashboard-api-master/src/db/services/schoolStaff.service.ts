import { FindOptions } from 'sequelize'
import { UpdateOptions, DestroyOptions } from 'sequelize/types'

import dbClient from '../index'

import {
  kt_schoolStaff as SchoolStaff,
  kt_schoolStaffAttributes as SchoolStaffAttributes,
  kt_schoolStaffCreationAttributes as SchoolStaffCreationAttributes,
} from '../model/init-models'

// Get All School-staffs
export const getAllSchoolStaff = async (
  options: FindOptions<SchoolStaff>,
): Promise<SchoolStaff[] | []> => {
  const schoolStaffs = await SchoolStaff.findAll(options)
  return schoolStaffs
}

// Create a New School-staff
export const createSchoolStaff = async (
  data: SchoolStaffCreationAttributes,
): Promise<SchoolStaff> => {
  const transaction = await dbClient.transaction()
  try {
    const schoolStaff = await SchoolStaff.create(data, {
      transaction,
    })
    await transaction.commit()
    return schoolStaff
  } catch (error) {
    await transaction.rollback()
    throw error
  }
}

// Get one School-staff
export const getSchoolStaff = async (
  options: FindOptions<SchoolStaff>,
): Promise<SchoolStaff | null> => {
  try {
    const schoolStaff = await SchoolStaff.findOne(options)
    return schoolStaff
  } catch (error) {
    throw error
  }
}

// Update School-staff
export const updateSchoolStaff = async (
  options: UpdateOptions<SchoolStaffAttributes>,
  data: Partial<SchoolStaff>,
): Promise<[affectedCount: number, affectedRows: SchoolStaff[]]> => {
  const transaction = await dbClient.transaction()
  try {
    let updatedData = await SchoolStaff.update(data, {
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

// Delete School-staff
export const deleteSchoolStaff = async (
  options: DestroyOptions<SchoolStaff>,
): Promise<number> => {
  const transaction = await dbClient.transaction()
  try {
    let deletedCnt = await SchoolStaff.destroy(options)
    await transaction.commit()
    return deletedCnt
  } catch (error) {
    await transaction.rollback()
    throw error
  }
}

// Count SchoolStaff
export const countSchoolStaff = async (
  options: FindOptions<SchoolStaff>,
): Promise<SchoolStaff | number> => {
  const schoolStaff = await SchoolStaff.count(options)
  return schoolStaff
}
