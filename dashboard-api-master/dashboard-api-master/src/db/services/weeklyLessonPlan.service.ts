import { FindOptions } from 'sequelize'
import { UpdateOptions, DestroyOptions } from 'sequelize/types'
import dbClient from '../index'
import {
  kt_weeklyLessonPlan as WeeklyLessonPlan,
  kt_weeklyLessonPlanAttributes as WeeklyLessonPlanAttributes,
  kt_weeklyLessonPlanCreationAttributes as WeeklyLessonPlanCreationAttributes,

} from '../model/init-models'

// Create a New WeeklyLessonPlan
export const createWeeklyLessonPlan = async (
  data: WeeklyLessonPlanCreationAttributes,
): Promise<WeeklyLessonPlan> => {
  const transaction = await dbClient.transaction()
  try {
    const kt_weeklyLessonPlan = await WeeklyLessonPlan.create(data, { transaction })
    await transaction.commit()
    return kt_weeklyLessonPlan
  } catch (error) {
    await transaction.rollback()
    throw error
  }
}

// Get one WeeklyLessonPlan
export const getWeeklyLessonPlan = async (
  options: FindOptions<WeeklyLessonPlan>,
): Promise<WeeklyLessonPlan | null> => {
  try {
    const kt_weeklyLessonPlan = await WeeklyLessonPlan.findOne(options)
    return kt_weeklyLessonPlan
  } catch (error) {
    throw error
  }
}

// Update WeeklyLessonPlan
export const updateWeeklyLessonPlan = async (
  options: UpdateOptions<WeeklyLessonPlanAttributes>,
  data: Partial<WeeklyLessonPlan>,
): Promise<[affectedCount: number, affectedRows: WeeklyLessonPlan[]]> => {
  const transaction = await dbClient.transaction()
  try {
    let updatedData:any = await WeeklyLessonPlan.update(data, {
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

// Get All WeeklyLessonPlan
export const getAllWeeklyLessonPlan = async (
  options: FindOptions<WeeklyLessonPlan>,
): Promise<WeeklyLessonPlan[] | []> => {
  const team = await WeeklyLessonPlan.findAll(options)
  return team
}

// delete WeeklyLessonPlan
export const deleteWeeklyLessonPlan = async (
  options: DestroyOptions<WeeklyLessonPlan>,
): Promise<number> => {
  const transaction = await dbClient.transaction()
  try {
    let deletedCnt = await WeeklyLessonPlan.destroy(options)
    await transaction.commit()
    return deletedCnt
  } catch (error) {
    await transaction.rollback()
    throw error
  }
}

// Count WeeklyLessonPlan
export const countWeeklyLessonPlan = async (
  options: FindOptions<WeeklyLessonPlan>,
): Promise<WeeklyLessonPlan | number> => {
  const weeklyLessonPlan = await WeeklyLessonPlan.count(options)
  return weeklyLessonPlan
}
