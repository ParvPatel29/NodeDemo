import { FindOptions } from 'sequelize'
import { UpdateOptions, DestroyOptions } from 'sequelize/types'
import dbClient from '../index'
import {
  kt_assignmentAttributes as AssignmentAttributes,
  kt_assignmentCreationAttributes as AssignmentCreationAttributes,
  kt_assignment as Assignment,
} from '../model/init-models'

// Create a New Assignment
export const createAssignment = async (
  data: AssignmentCreationAttributes,
): Promise<Assignment> => {
  const transaction = await dbClient.transaction()
  try {
    const kt_assignment = await Assignment.create(data, { transaction })
    await transaction.commit()
    return kt_assignment
  } catch (error) {
    await transaction.rollback()
    throw error
  }
}

// Get one Assignment
export const getAssignment = async (
  options: FindOptions<Assignment>,
): Promise<Assignment | null> => {
  try {
    const kt_assignment = await Assignment.findOne(options)
    return kt_assignment
  } catch (error) {
    throw error
  }
}

export const updateAssignment = async (
  options: UpdateOptions<AssignmentAttributes>,
  data: Partial<Assignment>,
): Promise<[affectedCount: number, affectedRows: Assignment[]]> => {
  const transaction = await dbClient.transaction()
  try {
    let updatedData:any = await Assignment.update(data, {
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

// Get All Assignment
export const getAllAssignment = async (
  options: FindOptions<Assignment>,
): Promise<Assignment[] | []> => {
  const team = await Assignment.findAll(options)
  return team
}

// delete Assignment
export const deleteAssignment = async (
  options: DestroyOptions<Assignment>,
): Promise<number> => {
  const transaction = await dbClient.transaction()
  try {
    let deletedCnt = await Assignment.destroy(options)
    await transaction.commit()
    return deletedCnt
  } catch (error) {
    await transaction.rollback()
    throw error
  }
}

// Count Assignment
export const countAssignment = async (
  options: FindOptions<Assignment>,
): Promise<Assignment | number> => {
  const assignment = await Assignment.count(options)
  return assignment
}
