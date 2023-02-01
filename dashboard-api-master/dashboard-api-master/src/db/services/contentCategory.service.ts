import { FindOptions } from 'sequelize'
import { UpdateOptions, DestroyOptions } from 'sequelize/types'

// Data-Base Config(Connection)
import dbClient from '../index'

// ContentCategory Model And ContentCategory Attributes
import {
  kt_contentCategoryAttributes as ContentCategoryAttributes,
  kt_contentCategoryCreationAttributes as ContentCategoryCreationAttributes,
  kt_contentCategory as ContentCategory,
} from '../model/init-models'

// Create a New ContentCategory
export const createContentCategory = async (
  data: ContentCategoryCreationAttributes,
): Promise<ContentCategory> => {
  const transaction = await dbClient.transaction()
  try {
    const contentCategory = await ContentCategory.create(data, { transaction })
    await transaction.commit()
    return contentCategory
  } catch (error) {
    await transaction.rollback()
    throw error
  }
}

// Get ContentCategory
export const getContentCategory = async (
  options: FindOptions<ContentCategory>,
): Promise<ContentCategory | null> => {
  try {
    const contentCategory = await ContentCategory.findOne(options)
    return contentCategory
  } catch (error) {
    throw error
  }
}

// Get All ContentCategorys
export const getAllContentCategory = async (
  options: FindOptions<ContentCategory>,
): Promise<ContentCategory[] | []> => {
  const team = await ContentCategory.findAll(options)
  return team
}

// Delete ContentCategory
export const deleteContentCategory = async (
  options: DestroyOptions<ContentCategory>,
): Promise<number> => {
  const transaction = await dbClient.transaction()
  try {
    let deletedCnt = await ContentCategory.destroy(options)
    await transaction.commit()
    return deletedCnt
  } catch (error) {
    await transaction.rollback()
    throw error
  }
}
