import { FindOptions } from 'sequelize'
import { UpdateOptions, DestroyOptions } from 'sequelize/types'
import dbClient from '../index'
import {
  kt_genreAttributes as BookGenreAttributes,
  kt_genreCreationAttributes as BookGenreCreationAttributes,
  kt_genre as BookGenre,
} from '../model/init-models'

// Create a New Genre
export const createGenre = async (
  data: BookGenreCreationAttributes,
): Promise<BookGenre> => {
  const transaction = await dbClient.transaction()
  try {
    const kt_BookGenre = await BookGenre.create(data, { transaction })
    await transaction.commit()
    return kt_BookGenre
  } catch (error) {
    await transaction.rollback()
    throw error
  }
}

// Get one Genre
export const getGenre = async (
  options: FindOptions<BookGenre>,
): Promise<BookGenre | null> => {
  try {
    const kt_BookGenre = await BookGenre.findOne(options)
    return kt_BookGenre
  } catch (error) {
    throw error
  }
}

// Update Genre

export const updateGenre = async (
  options: UpdateOptions<BookGenreAttributes>,
  data: Partial<BookGenre>,
): Promise<[affectedCount: number, affectedRows: BookGenre[]]> => {
  const transaction = await dbClient.transaction()
  try {
    let updatedData = await BookGenre.update(data, {
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

// Get All Genres
export const getAllGenres = async (
  options: FindOptions<BookGenre>,
): Promise<BookGenre[] | []> => {
  const team = await BookGenre.findAll(options)
  return team
}

// delete Genre
export const deleteGenre = async (
  options: DestroyOptions<BookGenre>,
): Promise<number> => {
  const transaction = await dbClient.transaction()
  try {
    let deletedCnt = await BookGenre.destroy(options)
    await transaction.commit()
    return deletedCnt
  } catch (error) {
    await transaction.rollback()
    throw error
  }
}
