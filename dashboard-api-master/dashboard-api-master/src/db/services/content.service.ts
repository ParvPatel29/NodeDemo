import { FindOptions } from 'sequelize'
import { UpdateOptions, DestroyOptions } from 'sequelize/types'

import dbClient from '../index'

import {
  kt_contentManagement as ContentManagement,
  kt_contentManagementAttributes as ContentManagementAttributes,
  kt_contentManagementCreationAttributes as ContentManagementCreationAttributes,
} from '../model/init-models'

// Get All Contents
export const getAllContent = async (
  options: FindOptions<ContentManagement>,
): Promise<ContentManagement[] | []> => {
  const contents = await ContentManagement.findAll(options)
  return contents
}

// Create a New Content
export const createContent = async (
  data: ContentManagementCreationAttributes,
): Promise<ContentManagement> => {
  const transaction = await dbClient.transaction()
  try {
    const content = await ContentManagement.create(data, {
      transaction,
    })
    await transaction.commit()
    return content
  } catch (error) {
    await transaction.rollback()
    throw error
  }
}

// Get one Content
export const getContent = async (
  options: FindOptions<ContentManagement>,
): Promise<ContentManagement | null> => {
  try {
    const content = await ContentManagement.findOne(options)
    return content
  } catch (error) {
    throw error
  }
}

// Update Content
export const updateContent = async (
  options: UpdateOptions<ContentManagementAttributes>,
  data: Partial<ContentManagement>,
): Promise<[affectedCount: number, affectedRows: ContentManagement[]]> => {
  const transaction = await dbClient.transaction()
  try {
    let updatedData = await ContentManagement.update(data, {
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

// Delete Content
export const deleteContent = async (
  options: DestroyOptions<ContentManagement>,
): Promise<number> => {
  const transaction = await dbClient.transaction()
  try {
    let deletedCnt = await ContentManagement.destroy(options)
    await transaction.commit()
    return deletedCnt
  } catch (error) {
    await transaction.rollback()
    throw error
  }
}
