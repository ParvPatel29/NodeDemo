import { FindOptions } from 'sequelize'
import { UpdateOptions, DestroyOptions } from 'sequelize/types'

// Data-Base Config(Connection)
import dbClient from '../index'

// Auth Model And Auth Attributes
import {
  kt_authAttributes as AuthAttributes,
  kt_authCreationAttributes as AuthCreationAttributes,
  kt_auth as Auth,
} from '../model/init-models'

// Create a New Auth
export const createToken = async (
  data: AuthCreationAttributes,
): Promise<Auth> => {
  const transaction = await dbClient.transaction()
  try {
    const auth = await Auth.create(data, { transaction })
    await transaction.commit()
    return auth
  } catch (error) {
    await transaction.rollback()
    throw error
  }
}

// Get Auth
export const getToken = async (
  options: FindOptions<Auth>,
): Promise<Auth | null> => {
  try {
    const auth = await Auth.findOne(options)
    return auth
  } catch (error) {
    throw error
  }
}

// Get All Token
export const getAllToken = async (
  options: FindOptions<Auth>,
): Promise<Auth[] | []> => {
  const auth = await Auth.findAll(options)
  return auth
}

// update a Token
export const updateToken = async (
  options: UpdateOptions<AuthAttributes>,
  data: Partial<Auth>,
): Promise<[affectedCount: number, affectedRows: Auth[]]> => {
  const transaction = await dbClient.transaction()
  try {
    let updatedData = await Auth.update(data, {
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

// Delete Token
export const deleteToken = async (
  options: DestroyOptions<Auth>,
): Promise<number> => {
  const transaction = await dbClient.transaction()
  try {
    let deletedToken = await Auth.destroy(options)
    await transaction.commit()
    return deletedToken
  } catch (error) {
    await transaction.rollback()
    throw error
  }
}
