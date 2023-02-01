import { FindOptions } from 'sequelize'
import { UpdateOptions, DestroyOptions } from 'sequelize/types'
import dbClient from '../index'
import {
  kt_bookAttributes as BookAttributes,
  kt_bookCreationAttributes as BookCreationAttributes,
  kt_book as Book,
} from '../model/init-models'

// Create a New Book
export const createBook = async (
  data: BookCreationAttributes,
): Promise<Book> => {
  const transaction = await dbClient.transaction()
  try {
    const kt_Book = await Book.create(data, { transaction })
    await transaction.commit()
    return kt_Book
  } catch (error) {
    await transaction.rollback()
    throw error
  }
}

// Get one Book
export const getBook = async (
  options: FindOptions<Book>,
): Promise<Book | null> => {
  try {
    const kt_Book = await Book.findOne(options)
    return kt_Book
  } catch (error) {
    throw error
  }
}

// update a book
export const updateBook = async (
  options: UpdateOptions<BookAttributes>,
  data: Partial<Book>,
): Promise<[affectedCount: number, affectedRows: Book[]]> => {
  const transaction = await dbClient.transaction()
  try {
    let updatedData = await Book.update(data, {
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

// Get All Books
export const getAllBooks = async (
  options: FindOptions<Book>,
): Promise<Book[] | []> => {
  const team = await Book.findAll(options)
  return team
}

// delete Book
export const deleteBook = async (
  options: DestroyOptions<Book>,
): Promise<number> => {
  const transaction = await dbClient.transaction()
  try {
    let deletedCnt = await Book.destroy(options)
    await transaction.commit()
    return deletedCnt
  } catch (error) {
    await transaction.rollback()
    throw error
  }
}
