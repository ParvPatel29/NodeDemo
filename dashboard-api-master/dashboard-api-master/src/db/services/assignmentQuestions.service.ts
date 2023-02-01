import { FindOptions } from 'sequelize'
import { UpdateOptions, DestroyOptions } from 'sequelize/types'
import dbClient from '../index'
import {
  kt_assignmentAttributes as AssignmentAttributes,
  kt_assignmentCreationAttributes as AssignmentCreationAttributes,
  kt_assignment as Assignment,
} from '../model/init-models'
import {
  kt_assignmentQuestionsAttributes as AssignmentQueAttributes,
  kt_assignmentQuestionsCreationAttributes as AssignmentQueCreationAttributes,
  kt_assignmentQuestions as AssignmentQue,
} from '../model/init-models'

// Create a New createAssignmentQue
export const createAssignmentQue = async (
  data: AssignmentQueCreationAttributes,
): Promise<AssignmentQue> => {
  const transaction = await dbClient.transaction()
  try {
    const kt_assignmentQue = await AssignmentQue.create(data, { transaction })
    await transaction.commit()
    return kt_assignmentQue
  } catch (error) {
    await transaction.rollback()
    throw error
  }
}

// Get one AssignmentQue
export const getAssignmentQue = async (
  options: FindOptions<AssignmentQue>,
): Promise<AssignmentQue | null> => {
  try {
    const kt_assignmentQue = await AssignmentQue.findOne(options)
    return kt_assignmentQue
  } catch (error) {
    throw error
  }
}
// Update AssignmentQue
export const updateAssignmentQue = async (
  options: UpdateOptions<AssignmentQueAttributes>,
  data: Partial<AssignmentQue>,
): Promise<[affectedCount: number, affectedRows: AssignmentQue[]]> => {
  const transaction = await dbClient.transaction()
  try {
    let updatedData:any = await AssignmentQue.update(data, {
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

// Get All AssignmentQue
export const getAllAssignmentQue = async (
  options: FindOptions<AssignmentQue>,
): Promise<AssignmentQue[] | []> => {
  const team = await AssignmentQue.findAll(options)
  return team
}

// delete AssignmentQue
export const deleteAssignmentQue = async (
  options: DestroyOptions<AssignmentQue>,
): Promise<number> => {
  const transaction = await dbClient.transaction()
  try {
    let deletedCnt = await AssignmentQue.destroy(options)
    await transaction.commit()
    return deletedCnt
  } catch (error) {
    await transaction.rollback()
    throw error
  }
}

// Count AssignmentQue
export const countAssignmentQue = async (
  options: FindOptions<AssignmentQue>,
): Promise<AssignmentQue | number> => {
  const assignment = await AssignmentQue.count(options)
  return assignment
}
